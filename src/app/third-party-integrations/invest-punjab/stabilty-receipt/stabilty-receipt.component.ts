import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { CommonService } from 'src/app/common/common.service';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { IStabiltyAcknoweldgementReceiptViewModel } from '../../third-party-integration-typed.models';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericResponseTemplateModel } from 'src/app/generic-implementation/generic-service-result-template';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-stabilty-receipt',
    templateUrl: './stabilty-receipt.component.html',
    styleUrls: ['./stabilty-receipt.component.css'],
    standalone: false
})
export class StabiltyReceiptComponent implements OnInit {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  receiptResponse: any;
  constructor(
    private route: ActivatedRoute,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    public commonOpsService: CommonOpsService,
    private authService: AuthService,
    private router: Router,
    private common:CommonService
  ) {
    this.route.queryParams
    .subscribe(params => {
      if(params.msg && params.msg.length>0){
        let appid = params.msg; 
        appid = appid.replace('.pdf', '');
        appid = appid.replace(/ /g, '+');
        
        let data = this.commonOpsService.decryptUsingAES256(appid, environment.xhrEncryptionConfigs.xhrEncyptionSecretKey, environment.xhrEncryptionConfigs.xhrEncyptionSecretIV);
        this.appHttpRequestHandlerService.httpGet({ msg: data }, "ThirdPartyIntegrations", "getStabiltyAcknoweldgementReceipt").pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data: GenericResponseTemplateModel<IStabiltyAcknoweldgementReceiptViewModel>) => { 
          this.receiptResponse=data.responseDataModel;
        });
      }
    });
   }

  ngOnInit(): void {
  }

  downloadPdf() {
    html2canvas(document.getElementById('acknowledgementReceiptSection')).then(canvas => {
        var imgWidth = 208;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var hightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jsPDF('p', 'mm', 'a4');
        var postition= 0;
        pdf.addImage(contentDataURL, 'PNG', 0, postition, imgWidth, imgHeight)
        pdf.save('AcknowledgementReceipt.pdf');
    });
  }
}
