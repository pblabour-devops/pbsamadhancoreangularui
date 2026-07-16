import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { CommonService } from 'src/app/common/common.service';
import { GenericFormModel } from 'src/app/generic-implementation/generic-form-builder.type';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { ICRUD_CreateUpdateOperationResponse } from 'src/app/typed-model/crud-typed-models';
import { IApplicationRaiseFeeCalculatorInfoParmsViewModel, IApplicationRaiseFeeParms } from '../payments-typed-models';
import { IRecordActionResponseViewModel } from 'src/app/applicationProcess/applicationProcess-typed-module';
import { GenericResponseTemplateModel } from 'src/app/generic-implementation/generic-service-result-template';

@Component({
    selector: 'app-app-raise-fee',
    templateUrl: './app-raise-fee.component.html',
    styleUrls: ['./app-raise-fee.component.css'],
    standalone: false
})
export class AppRaiseFeeComponent implements OnInit {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  public raiseFeeParms: IApplicationRaiseFeeParms;
  public netFeeCalculated: number = 0;
  public entityPrimaryid: number;
  public applicationType: number;
  public appRefId: number;
  public appFormStepsList: any[];
  public parmamEncodedinfo: string;
  public paramInfo: any;
  public selectedEdcAuthority: any = '';
  public remarks: string = "NA";
  public ipAddress: string;
  public latitude: string;
  public longitude: string;
  errCode = 0;
  isLocationOn: boolean = false;
  public projectSiteRefId : any;
  public projectSiteVersion : any;
  constructor(private fb: UntypedFormBuilder,
    private common: CommonService,
    private route: ActivatedRoute,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private router: Router,
    public commonOpsService: CommonOpsService,
    private authService: AuthService) { }

  ngOnInit(): void { }
  ngAfterViewInit() {
    this.route.queryParams
      .subscribe(params => {
        this.parmamEncodedinfo = params.info;
        this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info) => {
          this.paramInfo = info
          this.appRefId = this.paramInfo.appRefId;
          this.entityPrimaryid = this.paramInfo.identityKey;
          this.applicationType = this.paramInfo.applicationType;
          this.projectSiteRefId = this.paramInfo.projectSiteRefId;
          this.projectSiteVersion = this.paramInfo.projectSiteVersion;
          this.appHttpRequestHandlerService.httpGet({ appRefId: this.appRefId, applicationType: this.applicationType, paymentBatchCounter: 1 }, "PaymentManager", "getApplicationRaiseFee").pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((data: GenericFormModel<IApplicationRaiseFeeParms>) => {
              this.raiseFeeParms = data.formModel;
              if (this.raiseFeeParms != null && this.raiseFeeParms != undefined && this.raiseFeeParms.feeCalculatorInfoParms != null && this.raiseFeeParms.feeCalculatorInfoParms != undefined && this.raiseFeeParms.feeCalculatorInfoParms.length != 0) {
                var index: number = 0;
                this.raiseFeeParms.feeCalculatorInfoParms.forEach((e: any, index: number) => {
                  if (e.isDeduductible) {
                    this.netFeeCalculated = this.netFeeCalculated - Number(e.amountCalculated);
                  }
                  else {
                    this.netFeeCalculated = this.netFeeCalculated + Number(e.amountCalculated);
                  }
                });
              }
            });
        });
      });

      const location = this.common.getCurrentLocation().then((x: any) => {
      this.latitude = x.latitude;
      this.longitude = x.longitude;
      this.common.getIpCliente().subscribe((y: any) => {
        this.ipAddress = y.ip;
      });
      this.errCode = 0;
      this.isLocationOn = true;
    }).catch((ex: any) => {
      this.errCode = 1;
      this.isLocationOn = false;
    });
  }

  onSubmit() {
    this.raiseFeeParms.isForVerification = false;
    this.raiseFeeParms.remarks = this.remarks;
    this.raiseFeeParms.toDoActivityModeType = 5;
    this.raiseFeeParms.rootActivityRefId = Math.floor(new Date().getTime() / 1000).toString();  //this.paramInfo?.rootActivityRefId;
    this.raiseFeeParms.toDoActivityCategoryType = 6;
    this.raiseFeeParms.feeCalculatorInfoParms[0].appRefId = this.paramInfo.appRefId;
    this.raiseFeeParms.projectSiteRefId  = this.paramInfo?.projectSiteRefId,
    this.raiseFeeParms.projectSiteVersion = this.paramInfo?.projectSiteVersion,
    this.raiseFeeParms.applicationType = this.paramInfo?.applicationType;
    this.raiseFeeParms.applicationPurposeType  = 1;
    this.raiseFeeParms.iPin  = 250137916;
    this.raiseFeeParms.investPunjab_AppId  = 2502859717;
    this.raiseFeeParms.appRefId = this.paramInfo.appRefId;
    this.appHttpRequestHandlerService.httpPost(this.raiseFeeParms, "pbsamadhannetcoreapi.ViewModels.ApplicationRaiseFeeParmsViewModel", "Crud", "officerCreateUpdate").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: ICRUD_CreateUpdateOperationResponse) => {
        console.log(data, 'Raise Fee API Response')
        if (!data.hasExceptions) {
          this.appHttpRequestHandlerService.httpPost(
            {
              userId: this.authService.getUserJwtDecodedInfo().UserId,
              ipAddress: this.ipAddress,
              latitude: this.latitude,
              longitude: this.longitude,
              appRefId: data.appId,
              raisedFeeReason : "Fee Raised",
              Receiver_UserRefId : "c75c0092-e0fe-4459-a469-646e311a7be2",
              appActionType : 401,
              remarks : this.remarks
            }, "pbsamadhannetcoreapi.ViewModels.ApplicationActionViewModel", "ProcessApplication", "addprocessapplicationdetails").pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((actionResp: GenericResponseTemplateModel<IRecordActionResponseViewModel>) => {
              this.appHttpRequestHandlerService.httpPost(
                {
                  appRefId: this.appRefId,
                  paymentBatchCounter: 1,
                  applicationActionLogId: actionResp.responseDataModel.applicationActionLogId
                }, "pbsamadhannetcoreapi.ViewModels.UpdateActionLogInRaisedFeeParmsViewModel", "BuildingPlanHUD", "updateActionLogIdInRaisedFee").pipe(takeUntil(this.ngUnsubscribe))
                    .subscribe((actionResp1: GenericResponseTemplateModel<IRecordActionResponseViewModel>) => {
                    this.router.navigate(['/dashboard/officials']).then(() => {
                      window.location.reload();
                    });
                });
            });
        }
      });
  }

  setFeeInHeader(event, feeHeaderId) {
    let targatedFeeHeaderIdIndex = this.raiseFeeParms.feeCalculatorInfoParms.findIndex(x => x.feeHeaderId == feeHeaderId)
    if (targatedFeeHeaderIdIndex >= 0) {
      this.raiseFeeParms.feeCalculatorInfoParms[targatedFeeHeaderIdIndex].amountCalculated = Number(event.target.value);
    }
    this.netFeeCalculated = 0;
    this.raiseFeeParms.feeCalculatorInfoParms.forEach((e: any, index) => {
      this.netFeeCalculated = this.netFeeCalculated + Number(e.amountCalculated);
    });
  }

  getPaymentTypeHeads(feeCalculatorInfoParms: IApplicationRaiseFeeCalculatorInfoParmsViewModel[], isTreasuryType: boolean) {
    return feeCalculatorInfoParms?.filter(x => x.isTreasuryPayment == isTreasuryType);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
