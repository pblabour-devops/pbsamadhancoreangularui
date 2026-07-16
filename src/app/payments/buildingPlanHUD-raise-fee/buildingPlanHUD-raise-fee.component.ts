import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FeeCalculatorInfoParmsViewModel, IRaiseFeeParms } from '../payments-typed-models';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { GenericResponseTemplateModel, GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Establishment_GeneralDetail } from 'src/app/establishment/establishment-typed-models';
import { ApplicationProcess, IRecordActionResponseViewModel } from 'src/app/applicationProcess/applicationProcess-typed-module';
import { AuthService } from 'src/app/auth/auth.service';
import { IAppPaymentEDCAuthority, IBuildingPlanHUD_RTB_Mapping } from 'src/app/building-plan-hud/building-plan-hud-typed-models';
@Component({
    selector: 'buildingPlanHUD-RaisedFee',
    templateUrl: './buildingPlanHUD-raise-fee.component.html',
    styleUrls: ['./buildingPlanHUD-raise-fee.component.css'],
    standalone: false
})
export class BuildingPlanHUD_Raise_FeeComponent implements OnInit {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  public raiseFeeParms: IRaiseFeeParms;
  public netFeeCalculated: number=0;
  public entityPrimaryid : number;
  public applicationType: number;
  public appRefId : number;
  public appFormStepsList: any[];
  public parmamEncodedinfo:string;
  public paramInfo:any;
  public feesUnderRTB: any[]=[];
  public eDCAuthorities:  IAppPaymentEDCAuthority[]=[];
  public eDCAuthority:  IAppPaymentEDCAuthority;
  public selectedEdcAuthority: any='';
  public remarks: string="NA";
  public ipAddress : string;
  public latitude : string;
  public longitude : string;
  errCode = 0;
  isLocationOn: boolean=false;
  public isTimeLineFlow : boolean;

  constructor(private fb: UntypedFormBuilder,
    private common:CommonService,
    private route: ActivatedRoute, 
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private router: Router,
    public commonOpsService: CommonOpsService,
    private authService: AuthService) 
    { }
  
  ngOnInit(): void { }
  ngAfterViewInit() {
    this.route.queryParams
      .subscribe(params => {
        this.parmamEncodedinfo=params.info;
        this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info)=>{
          this.paramInfo = info
          // console.log(this.paramInfo = info)
          this.appRefId = this.paramInfo.appRefId;
          this.entityPrimaryid = this.paramInfo.identityKey;
          this.applicationType = this.paramInfo.applicationType;
          this.isTimeLineFlow = this.paramInfo.isTimeLineFlow;
          let endpointApi="getBuildingPlanHUDRaiseFee";
         
          if(this.paramInfo.isForVerification){
            endpointApi="verifyBuildingPlanHUDRaiseFee";
          }

          this.appHttpRequestHandlerService.httpGet({ appRefId: this.appRefId, applicationType: this.applicationType, paymentBatchCounter: 0}, "BuildingPlanHUD", endpointApi).pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((data: GenericFormModel<IRaiseFeeParms>) => { 

              

              this.appHttpRequestHandlerService.httpGet({ appRefId: this.paramInfo.appRefId }, "ThirdPartyIntegrations", "getInPrincipalApprovalDetails").pipe(takeUntil(this.ngUnsubscribe))
                .subscribe((data: GenericResponseTemplateModel<IBuildingPlanHUD_RTB_Mapping>) => { 
                  if(data.responseDataModel && data.responseDataModel.responseJson && data.responseDataModel.responseJson.length>0){
                    //console.log(JSON.parse(data.responseDataModel.responseJson).data[0].bifurcation_info);
                    JSON.parse(data.responseDataModel.responseJson).data[0].bifurcation_info.forEach(element => {
                      this.feesUnderRTB.push(JSON.parse(element))
                    });
                  }
                })

                this.appHttpRequestHandlerService.httpGet({ id: 0 }, "PaymentManager", "getPaymentEDCAuthorities").pipe(takeUntil(this.ngUnsubscribe))
                  .subscribe((data: GenericResponseTemplateModel<IAppPaymentEDCAuthority[]>) => { 
                    this.eDCAuthorities = data.responseDataModel;
                    if(this.paramInfo.isForVerification){
                      this.eDCAuthority = this.eDCAuthorities
                      .filter(x=>x.nonTreasuryCode == this.raiseFeeParms.feeCalculatorInfoParms
                        .filter(x=>x.feeHeaderId==22)[0].nonTreasuryCode)[0];
                        //(<HTMLSelectElement>document.getElementById('edcAuthoritySelector')).setAttribute('value', this.raiseFeeParms.feeCalculatorInfoParms.filter(x=>x.feeHeaderId==22)[0].nonTreasuryCode);
                        this.selectedEdcAuthority = this.raiseFeeParms.feeCalculatorInfoParms.filter(x=>x.feeHeaderId==22)[0].nonTreasuryCode;
                        //console.log('%%%', this.raiseFeeParms.feeCalculatorInfoParms.filter(x=>x.feeHeaderId==22)[0].nonTreasuryCode)

                    }
                })

              //console.log(data)
              //this.raiseFeeParms={isForVerification:false, } .feeCalculatorInfoParms = data.formModel;
              //this.genericFormModel.formModel.feeCalculatorInfoParms=[]; 
              this.raiseFeeParms = data.formModel; 
              // console.log(this.raiseFeeParms)

             // this.genericFormModel.formModel = this.genericFormModel.formModel.map(x=>x.isForVerification=this.paramInfo.isForVerification);

              if(this.raiseFeeParms!=null && this.raiseFeeParms!=undefined && this.raiseFeeParms.feeCalculatorInfoParms!=null && this.raiseFeeParms.feeCalculatorInfoParms!=undefined && this.raiseFeeParms.feeCalculatorInfoParms.length!=0){
                var index:number =0;
                this.raiseFeeParms.feeCalculatorInfoParms.forEach((e:any, index: number) => {
                  // this.raiseFeeParms[index].paymentBatchCounter=0;
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


     // Fetch the current location
     const location = this.common.getCurrentLocation().then((x: any) => {
        this.latitude = x.latitude;
        this.longitude = x.longitude;
        this.common.getIpCliente().subscribe((y: any)=>{
        this.ipAddress = y.ip;
      });
        this.errCode = 0;
        this.isLocationOn=true;
      }).catch((ex: any) => {
        this.errCode = 1;
        this.isLocationOn=false;
    });
  }

  onSubmit(){
    // this.raiseFeeParms.remarks = this.remarks;
    // this.raiseFeeParms.isForVerification = this.paramInfo.isForVerification;
    // this.appHttpRequestHandlerService.httpPost(this.raiseFeeParms, "BuildingPlanHUD", "addUpdate_BuildingPlanHUDRaiseFee").pipe(takeUntil(this.ngUnsubscribe))
    // .subscribe((data: GenericResponseTemplateModel<ApplicationProcess>) => {
    //   if(!data.hasError){
    //     data.responseDataModel.userId=this.authService.getUserJwtDecodedInfo().UserId;
    //     this.appHttpRequestHandlerService.httpPost(data.responseDataModel, "ProcessApplication", "addprocessapplicationdetails").pipe(takeUntil(this.ngUnsubscribe))
    //     .subscribe((data: GenericResponseTemplateModel<IRecordActionResponseViewModel>) => {
    //       this.router.navigate(['/dashboard/officials']) .then(() => {
    //         window.location.reload();
    //       });
    //     });
    //   }
    // });

    this.raiseFeeParms.remarks = this.remarks;
    this.raiseFeeParms.isForVerification = this.paramInfo.isForVerification;
    this.raiseFeeParms.isTimeLineFlow = this.paramInfo.isTimeLineFlow;
    this.appHttpRequestHandlerService.httpPost(this.raiseFeeParms, "pbsamadhannetcoreapi.ViewModels.RaiseFeeParmsViewModel", "BuildingPlanHUD", "addUpdate_BuildingPlanHUDRaiseFee").pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: GenericResponseTemplateModel<ApplicationProcess>) => {
      if(!data.hasError){
        data.responseDataModel.userId=this.authService.getUserJwtDecodedInfo().UserId;
        data.responseDataModel.ipAddress = this.ipAddress;
        data.responseDataModel.latitude = this.latitude;
        data.responseDataModel.longitude = this.longitude;
        this.appHttpRequestHandlerService.httpPost(data.responseDataModel, "pbsamadhannetcoreapi.ViewModels.ApplicationActionViewModel", "ProcessApplication", "addprocessapplicationdetails").pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((actionResp: GenericResponseTemplateModel<IRecordActionResponseViewModel>) => {
          this.appHttpRequestHandlerService.httpPost(
              {
                appRefId:this.appRefId, 
                paymentBatchCounter: data.responseDataModel.paymentBatchCounter, 
                applicationActionLogId: actionResp.responseDataModel.applicationActionLogId }, "pbsamadhannetcoreapi.ViewModels.UpdateActionLogInRaisedFeeParmsViewModel", "BuildingPlanHUD", "updateActionLogIdInRaisedFee").pipe(takeUntil(this.ngUnsubscribe))
                .subscribe((actionResp1: GenericResponseTemplateModel<IRecordActionResponseViewModel>) => {
                this.router.navigate(['/dashboard/officials']).then(() => {
                  window.location.reload();
                });
            });
        });
      }
    });
  }

  setFeeInHeader(event, feeHeaderId){
    let targatedFeeHeaderIdIndex = this.raiseFeeParms.feeCalculatorInfoParms.findIndex(x=>x.feeHeaderId==feeHeaderId)
    if(targatedFeeHeaderIdIndex>=0){
      this.raiseFeeParms.feeCalculatorInfoParms[targatedFeeHeaderIdIndex].amountCalculated = Number(event.target.value);
    }
    this.netFeeCalculated=0;
    this.raiseFeeParms.feeCalculatorInfoParms.forEach((e:any,index) => {
      this.netFeeCalculated = this.netFeeCalculated + Number(e.amountCalculated);
    });
  }

  getPaymentTypeHeads(feeCalculatorInfoParms: FeeCalculatorInfoParmsViewModel[], isTreasuryType: boolean){
    return feeCalculatorInfoParms?.filter(x=>x.isTreasuryPayment == isTreasuryType);
  }

  getAuthorityFullDetail(event){
    let index = this.raiseFeeParms.feeCalculatorInfoParms.findIndex(x=>x.feeHeaderId==22);
    if(event.target.value!=''){
      this.eDCAuthority = this.eDCAuthorities.filter(x=>x.nonTreasuryCode == event.target.value)[0];
      this.raiseFeeParms.feeCalculatorInfoParms[index].nonTreasuryCode  = event.target.value;
    }
    else{
      this.raiseFeeParms.feeCalculatorInfoParms[index].nonTreasuryCode  = event.target.value;
    }
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
