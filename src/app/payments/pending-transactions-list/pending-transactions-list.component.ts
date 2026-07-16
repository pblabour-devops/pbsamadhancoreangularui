import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericFormModel } from 'src/app/generic-implementation/generic-form-builder.type';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { environment } from 'src/environments/environment';
@Component({
    selector: 'app-pending-transactions-list',
    templateUrl: './pending-transactions-list.component.html',
    styleUrls: ['./pending-transactions-list.component.css'],
    standalone: false
})
export class PendingTransactionsListComponent implements OnInit {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  public appFeeTransactions: any[];
  public parmamEncodedinfo: string;
  public paramInfo: any;
  public appRefId : number;
  constructor(private route: ActivatedRoute, private appHttpRequestHandlerService: AppHttpRequestHandlerService,public commonOpsService: CommonOpsService,private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.route.queryParams
      .subscribe(params => {
        this.parmamEncodedinfo = params.info;
        this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info) => {
        this.paramInfo = info
        this.appRefId = this.paramInfo.appRefId;
        this.appHttpRequestHandlerService.httpGet({ appRefId: this.appRefId }, "PaymentManager", "getAllAppFeeTransactions").pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: GenericFormModel<any>) => { 
            this.appFeeTransactions = data.formModel;
            if(data.formModel.length==0){
              this.router.navigate(['/payments/appfeecalculator'],{ queryParams:{info: this.parmamEncodedinfo}});
            }
            // else if(data.formModel.filter(x=> x.transactionFinalStatusType == 1).length>=0){
            //     console.log('Already Made a successfull Payment')
            //     //Kindly wait your status sync to invest punjab
            // }
          }
        );
      });
    })
  }
  onLogoutClick(){
    localStorage.clear();
    window.location.href= environment.thirdPartyIntegrationConfigs.investPunjab.investPunjabReturnPath;
  }
}
