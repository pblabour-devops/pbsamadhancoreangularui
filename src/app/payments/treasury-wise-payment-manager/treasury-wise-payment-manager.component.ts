import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { takeUntil, timeout } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { GenericFormModel } from 'src/app/generic-implementation/generic-form-builder.type';
import { IAppPaymentPartsDetailViewModel, IBuildingPlanHUDPaymentDetail } from '../payments-typed-models';
import { GenericResponseTemplateModel } from 'src/app/generic-implementation/generic-service-result-template';

@Component({
    selector: 'app-treasury-wise-payment-manager',
    templateUrl: './treasury-wise-payment-manager.component.html',
    styleUrls: ['./treasury-wise-payment-manager.component.css'],
    standalone: false
})
export class TreasuryWisePaymentManagerComponent implements OnInit {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  public parmamEncodedinfo:string;
  public paramInfo:any;
  public paymentPartDetail: IAppPaymentPartsDetailViewModel;
  public appRefId : any;
  public feeHeadersSortOrder: number[] = [19, 22, 27, 20, 28, 21, 23, 24, 25, 26,29,39];
  public raisedFeeList: IBuildingPlanHUDPaymentDetail[] = [];
  public netFeeCalculated: number = 0;
  constructor(private route: ActivatedRoute,
    public commonOpsService: CommonOpsService,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private router: Router) { }

  ngOnInit(): void {}
  ngAfterViewInit() {
    this.route.queryParams
    .subscribe(params => {
      this.parmamEncodedinfo=params.info;
      this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info)=>{
      this.paramInfo = info;
      this.appRefId = this.paramInfo.appRefId;
        this.appHttpRequestHandlerService.httpGet({ appRefId: this.paramInfo.appRefId, paymentBatchCounter : this.paramInfo.paymentBatchCounter }, "PaymentManager", "getPaymentParts").pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data: GenericResponseTemplateModel<IAppPaymentPartsDetailViewModel>) => { 
          this.paymentPartDetail=data.responseDataModel;
            this.appHttpRequestHandlerService.httpGet({ appRefId: this.appRefId, paymentBatchCounter: 0 },this.paramInfo.applicationType == 5 ? "BuildingPlanHUD" : "PaymentManager","getRaisedFeeList")
            .subscribe((data: GenericFormModel<IBuildingPlanHUDPaymentDetail[]>) => {
              this.feeHeadersSortOrder.forEach(feeHeadId => {
                this.raisedFeeList.push(data.formModel.filter(x => x.feeHeaderRefId == feeHeadId)[0])
                this.getNetFeePayable();
              });
            });
        });
      });
    });
  }
  getPartDetail(paymentPartCounter: number){
    return this.paymentPartDetail.appFeeDetails.filter(x=>x.paymentPartCounter == paymentPartCounter);
  }
  getPaymentHeadTitle(feeHeaderRefId: number){
    return this.paymentPartDetail.appFeeDetails.filter(x=>x.feeHeaderRefId == feeHeaderRefId)[0].feesHeader?.feeHeaderTitle;
  }
  // getPaymentPartTotal(paymentPartCounter: number){
  //   return this.paymentPartDetail.appFeeDetails.filter(x=>x.paymentPartCounter == paymentPartCounter).map(o => o.amount).reduce((a,b) => a + b)
  // }

  getPaymentPartTotal(paymentPartCounter: number){
    if(this.paymentPartDetail.appFeeDetails.filter(x=>x.paymentPartCounter == paymentPartCounter).length>0){
      return this.paymentPartDetail.appFeeDetails.filter(x=>x.paymentPartCounter == paymentPartCounter).map(o => o.amount).reduce((a,b) => a + b)
    }
    return 0;
  }
  
  sendToMakePaymentPage(paymentPartCounter: number){
    this.router.navigate(['/payments/appfeepaymentinitiateterminal'], { queryParams: { info:  this.commonOpsService.encodeQueryParamsInBase64( {appRefId: this.paramInfo.appRefId, applicationType: this.paramInfo.applicationType, netFeeCalculated:  this.paymentPartDetail.appFeeDetails.filter(x=>x.paymentPartCounter == paymentPartCounter).map(o => o.amount).reduce((a,b) => a + b),   paymentPartCounter: paymentPartCounter, paymentBatchCounter : this.paramInfo.paymentBatchCounter})}});
  }
  getNetFeePayable() {
    this.netFeeCalculated = this.raisedFeeList.filter(x=>x!=undefined ).reduce((sum, item) => sum + item?.amountPayable, 0);
  }
}
