import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { CommonService } from 'src/app/common/common.service';
import { GenericResponseTemplateModel } from 'src/app/generic-implementation/generic-service-result-template';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { environment } from 'src/environments/environment';
import { IStabiltyAcknoweldgementReceiptViewModel } from '../../third-party-integration-typed.models';

@Component({
    selector: 'app-download-approval',
    templateUrl: './download-approval.component.html',
    styleUrls: ['./download-approval.component.css'],
    standalone: false
})
export class DownloadApprovalComponent implements OnInit {
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
        this.appHttpRequestHandlerService.httpGet({ msg: data }, "ThirdPartyIntegrations", "downloadApproval").pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data: GenericResponseTemplateModel<IStabiltyAcknoweldgementReceiptViewModel>) => { 
          this.receiptResponse=data.responseDataModel;
        });
      }
    });
   }

  ngOnInit(): void {
  }

  backToInvestPunjab(){
    window.location.href = environment.thirdPartyIntegrationConfigs.investPunjab.investPunjabReturnPath;
  }

  goToLink(fileurl: string){
    return fileurl;
  }
}
