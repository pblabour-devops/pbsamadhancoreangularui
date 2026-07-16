import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CommonService } from 'src/app/common/common.service';
import { GenericFormModel } from 'src/app/generic-implementation/generic-form-builder.type';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-app-fee-payment-complete-terminal',
    templateUrl: './app-fee-payment-complete-terminal.component.html',
    styleUrls: ['./app-fee-payment-complete-terminal.component.css'],
    standalone: false
})
export class AppFeePaymentCompleteTerminalComponent implements OnInit {
  public parmamEncodedinfo:string;
  public paramInfo:any;
  public paymentDetails: any=[];
  currentDate = new Date();
  public applicationTypeEnum : any = [];
  public applicationPurposeTypeEnum : any = [];
  public bankTransactionReferenceTypeEnum : any = [];
  public transactionFinalStatusTypeEnum : any = [];
  genericFormData: any;
  defaultReturnPath: string = environment.thirdPartyIntegrationConfigs.investPunjab.defaultReturnPath;
  
  constructor(private router: Router, private common:CommonService,public commonOpsService: CommonOpsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      this.paymentDetails = JSON.parse(atob(params.info));
      // ApplicationTypeEnum
      if(this.paymentDetails.ApplicationType==5){
        this.paymentDetails.ApplicationType = 'Common building plan HUD and Factories application form'
      }
      else if(this.paymentDetails.ApplicationType==1){
        this.paymentDetails.ApplicationType = 'Registration of establishment'
      }
      else if(this.paymentDetails.ApplicationType==70){
        this.paymentDetails.ApplicationType = 'Factory Licence'
      }
      else if(this.paymentDetails.ApplicationType==35){
        this.paymentDetails.ApplicationType = 'Bocw Registration Licence'
      }
      else if(this.paymentDetails.ApplicationType==36){
        this.paymentDetails.ApplicationType = 'Motor Transport Registration Licence'
      }
      else if(this.paymentDetails.ApplicationType==5){
        this.paymentDetails.ApplicationType = 'Combined Proposed Approval of Building Plans (HUD and Factories)'
      }
      else if(this.paymentDetails.ApplicationType==71){
        this.paymentDetails.ApplicationType = 'Approval of Proposed Building Plans'
      }
      else if(this.paymentDetails.ApplicationType==72){
        this.paymentDetails.ApplicationType = 'Approval of Existing Building Plans'
      }
      else if(this.paymentDetails.ApplicationType==73){
        this.paymentDetails.ApplicationType = 'Approval of Existing Building Plans (Addition/Amendment)'
      }

      else if(this.paymentDetails.ApplicationType==1001){
        this.paymentDetails.ApplicationType = 'Labour Services'
      }

       // ApplicationPurposeTypeENUM
      if(this.paymentDetails.ApplicationPurposeType==1){
        this.paymentDetails.ApplicationPurposeType = 'Grant Of Licence'
      }
      else if(this.paymentDetails.ApplicationPurposeType==2){
        this.paymentDetails.ApplicationPurposeType = 'Renewal Of Licence'
      }

      else if(this.paymentDetails.ApplicationPurposeType==4){
        this.paymentDetails.ApplicationPurposeType = 'LWF Contribution'
      }
      else if(this.paymentDetails.ApplicationPurposeType==5){
        this.paymentDetails.ApplicationPurposeType = 'Unpaid Wages'
      }
      // TransactionFinalStatusEnum
      if(this.paymentDetails.TransactionFinalStatus==1){
        this.paymentDetails.TransactionFinalStatus = 'Succeed'
      }
      else{
        this.paymentDetails.TransactionFinalStatus = 'Failed'
      }

      // BankTransactionRefNumberTypeEnum
      if(this.paymentDetails.BankTransactionRefNumberType==1){
        this.paymentDetails.BankTransactionRefNumberType = 'CIN'
      }
      else if(this.paymentDetails.BankTransactionRefNumberType==2){
        this.paymentDetails.BankTransactionRefNumberType = 'GRN'
      }
      else{
        this.paymentDetails.BankTransactionRefNumberType = 'Bank Reference Number'
      }
    });
  }

  public homeButtonClick(){
    document.location.href = this.defaultReturnPath;
    //this.router.navigate(['/dashboard/applicantdashboard']), { queryParams: {info: this.commonOpsService.encodeQueryParamsInBase64({ projectSiteRefId: 40007 })}};
  }

  downloadPdf() {
    html2canvas(document.body).then(canvas => {
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var hightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4');
      var postition= 0;
      pdf.addImage(contentDataURL, 'PNG', 0, postition, imgWidth, imgHeight)
      pdf.save('PaymentReceipt.pdf')
      // paymentDetails.AppRefId
    })
  }
}
