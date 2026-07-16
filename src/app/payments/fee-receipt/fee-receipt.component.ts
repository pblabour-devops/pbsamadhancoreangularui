import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-fee-receipt',
    templateUrl: './fee-receipt.component.html',
    styleUrls: ['./fee-receipt.component.css'],
    standalone: false
})
export class FeeReceiptComponent implements OnInit {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  defaultReturnPath: string = environment.thirdPartyIntegrationConfigs.investPunjab.defaultReturnPath;
  currentDate = new Date();
  receiptData: any;
  ipin: any;
  constructor(private route: ActivatedRoute, private appHttpRequestHandlerService: AppHttpRequestHandlerService) { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.route.queryParams
      .subscribe(params => {
        this.ipin = params.ipin;
        this.appHttpRequestHandlerService.httpGet({ investPunjabIPin: params.ipin, investPunjabAppId: params.serviceid ,appRefId : params.appRefId}, "PaymentManager", "GenerateFeeReceipt").pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: any) => { 
            this.receiptData=data.responseDataModel;
            // console.log(data)
            // if(data.responseDataModel.appRefId==0){
            //   window.location.href = 'https://pblabour.gov.in/wbapp/bfreceipt/receipt?ipin='+params.ipin+'&serviceid='+params.serviceid+'&ServiceCode='+ params.ServiceCode;
            // }
          }
        );
      });
  }
  downloadPdf() {
    html2canvas(document.getElementById('feeReceiptSection')).then(canvas => {
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
  // public homeButtonClick(){
  //   document.location.href = this.defaultReturnPath;
  //   //this.router.navigate(['/dashboard/applicantdashboard']), { queryParams: {info: this.commonOpsService.encodeQueryParamsInBase64({ projectSiteRefId: 40007 })}};
  // }


  homeButtonClick() {
    if(this.ipin > 0){
      localStorage.clear();
      document.location.href = this.defaultReturnPath;
    }
 }
 
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
