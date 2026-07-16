import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FeeCalculatorInfoParmsViewModel } from '../payments-typed-models';
import { GenericFormModel } from 'src/app/generic-implementation/generic-form-builder.type';
import { GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { environment } from 'src/environments/environment';
@Component({
    selector: 'app-appfeecalculator',
    templateUrl: './appfeecalculator.component.html',
    styleUrls: ['./appfeecalculator.component.css'],
    standalone: false
})
export class AppfeecalculatorComponent implements OnInit {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  public genericFormModel: GenericFormModel<FeeCalculatorInfoParmsViewModel[]>;
  public netFeeCalculated: number=0;
  public entityPrimaryid : number;
  public applicationType: number;
  public appRefId : number;
  public appFormStepsList: any[];
  public parmamEncodedinfo:string;
  public paramInfo:any;
  public feeHeaderId : any;

  constructor(private common:CommonService,private route: ActivatedRoute, private appHttpRequestHandlerService: AppHttpRequestHandlerService,private router: Router,public commonOpsService: CommonOpsService) { }

  ngOnInit(): void { }
  ngAfterViewInit() {
    this.route.queryParams
      .subscribe(params => {
        this.parmamEncodedinfo=params.info;
        this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info)=>{
          this.paramInfo = info
          this.appRefId = this.paramInfo.appRefId;
          this.entityPrimaryid = this.paramInfo.identityKey;
          this.applicationType = this.paramInfo.applicationType;
          this.appHttpRequestHandlerService.httpGet({ appRefId: this.appRefId, applicationType: this.applicationType, entityKeyId: this.entityPrimaryid}, "PaymentManager", "fee_calculator").pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((data: GenericFormModel<FeeCalculatorInfoParmsViewModel[]>) => { 
              this.genericFormModel = data; 
              if(this.genericFormModel?.appFormStepsList.length!=0){
                var lockStep = this.genericFormModel?.appFormStepsList.filter(object => {
                  return object['stepCode'] == "LOCK";
                });
                if(lockStep){
                  this.genericFormModel.isLocked =  lockStep[0]?.isFilled;
                }
               if(this.applicationType == 1001){
                this.genericFormModel.isLocked = true;
              }
              }
              
              this.appFormStepsList = data.appFormStepsList;
              this.feeHeaderId = data.formModel[0].feeHeaderId;
              if(this.genericFormModel!=null && this.genericFormModel!=undefined && this.genericFormModel.formModel!=null && this.genericFormModel.formModel!=undefined && this.genericFormModel.formModel.length!=0){
                var index:number =0;
                this.genericFormModel.formModel.forEach((e:any) => {
                  if(e.isDeduductible){
                    this.netFeeCalculated = this.netFeeCalculated - Number(e.amountCalculated);
                  }
                  else{
                    this.netFeeCalculated = this.netFeeCalculated + Number(e.amountCalculated);
                  }
              });
              }
            });
          });
      });
  }
  onSubmit(){
    this.appHttpRequestHandlerService.httpPost(this.genericFormModel.formModel, "List<pbsamadhannetcoreapi.ViewModels.FeeCalculatorInfoParmsViewModel>", "PaymentManager", "logApplicationFeeHeaders").pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: GenericServiceResultTemplate) => {
      if(!data.hasException){
        this.router.navigate(['/payments/appfeepaymentinitiateterminal'], { queryParams: { info:  this.commonOpsService.encodeQueryParamsInBase64( {appRefId: this.appRefId, applicationType: this.applicationType, netFeeCalculated: this.netFeeCalculated,   paymentPartCounter: 1, paymentBatchCounter : this.genericFormModel.formModel[0].paymentBatchCounter})}});
      }
    });
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  btnHomeClick(applicationType) {
      if(applicationType == 36)
      {
        this.router.navigate(['/project/sites']);
      }
      else
      {
        window.location.href= environment.thirdPartyIntegrationConfigs.investPunjab.investPunjabReturnPath;
      }
      
    }
}
