import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { takeUntil, timeout } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FeeCalculatorInfoParmsViewModel, IBuildingPlanHUDPaymentDetail, IBuildingPlanHUDPaymentDetailViewModal } from '../payments-typed-models';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { GenericResponseTemplateModel, GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Establishment_GeneralDetail } from 'src/app/establishment/establishment-typed-models';
import { ApplicationProcess, IRecordActionResponseViewModel } from 'src/app/applicationProcess/applicationProcess-typed-module';
import { AuthService } from 'src/app/auth/auth.service';
import Swal from 'sweetalert2';
import { IBuildingPlanHUD_RTB_Mapping } from 'src/app/building-plan-hud/building-plan-hud-typed-models';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'buildingPlanHUD-MakeRaisedFee',
    templateUrl: './buildingPlanHUD-make-raised-fees.component.html',
    styleUrls: ['./buildingPlanHUD-make-raised-fees.component.css'],
    standalone: false
})
export class BuildingPlanHUD_MakeRaisedFeeComponent implements OnInit {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  public genericFormModel: GenericFormModel<FeeCalculatorInfoParmsViewModel[]>;
  public netFeeCalculated: number = 0;
  public entityPrimaryid: number;
  public applicationType: number;
  public appRefId: number;
  public appFormStepsList: any[];
  public parmamEncodedinfo: string;
  public paramInfo: any;
  public raisedFeeList: IBuildingPlanHUDPaymentDetail[] = [];
  public paymentBatchCounter: number = 0;
  isDocumentUploadOption: boolean = false;
  isOptional: boolean = false;
  userId: string;
  isSubmited: boolean = false;
  public feesUnderRTB: any[] = [];
  public feeHeadersSortOrder: number[] = [19, 22, 27, 20, 28, 21, 23, 24, 25, 26,29];
  public actionTaken: boolean=false;
  public pageCode: number=0;
  reqData: IBuildingPlanHUDPaymentDetailViewModal = {
    buildingPlanHUDPaymentDetailList: [],
    appDocRefId: 0
  };
  errCode = 0;
  isLocationOn: boolean=false;
  public ipAddress : string;
  public latitude : string;
  public longitude : string;

  constructor(private fb: UntypedFormBuilder,
    private common: CommonService,
    private route: ActivatedRoute,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private router: Router,
    public commonOpsService: CommonOpsService,
    private authService: AuthService,
    private modalService: NgbModal) { }
  ngOnInit(): void {
    this.userId = this.authService.getUserJwtDecodedInfo().UserId.toString();
  }
  ngAfterViewInit() {

    this.route.queryParams
    .subscribe(params => {
      this.parmamEncodedinfo = params.info;
      this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info) => {
        this.paramInfo = info
        this.appRefId = this.paramInfo.appRefId;
        this.entityPrimaryid = this.paramInfo.identityKey;
        this.applicationType = this.paramInfo.applicationType;
        this.appHttpRequestHandlerService.httpGet({ appRefId: this.appRefId, paymentBatchCounter: 0 }, "BuildingPlanHUD", "getRaisedFeeList").pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data: GenericFormModel<IBuildingPlanHUDPaymentDetail[]>) => {
          this.feeHeadersSortOrder.forEach(feeHeadId => {
            this.raisedFeeList.push(data.formModel.filter(x => x.feeHeaderRefId == feeHeadId)[0])
          });
          this.paymentBatchCounter = this.raisedFeeList[0].paymentBatchCounter;
          this.appHttpRequestHandlerService.httpGet({ appRefId: this.appRefId }, "ThirdPartyIntegrations", "getRaisedFeePaymentPageCode").pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: GenericResponseTemplateModel<number>) => { 
            this.pageCode=data.responseDataModel;
            if(data.responseDataModel==1){
              this.getNetFeePayable();
              this.appHttpRequestHandlerService.httpGet({ appRefId: this.paramInfo.appRefId }, "ThirdPartyIntegrations", "getInPrincipalApprovalDetails").pipe(takeUntil(this.ngUnsubscribe))
                .subscribe((data: GenericResponseTemplateModel<IBuildingPlanHUD_RTB_Mapping>) => {
                  if (data.responseDataModel && data.responseDataModel.responseJson && data.responseDataModel.responseJson.length > 0) {
                    //console.log(JSON.parse(data.responseDataModel.responseJson).data[0].bifurcation_info);
                    JSON.parse(data.responseDataModel.responseJson).data[0].bifurcation_info.forEach(element => {
                      this.feesUnderRTB.push(JSON.parse(element))
                    });
                    // console.log(this.feesUnderRTB)
                  }
                })
                this.showAttachementOption();
            }
            else{
              var encodedQueryParms= this.commonOpsService.encodeQueryParamsInBase64(
                {
                  paymentBatchCounter: this.paymentBatchCounter, 
                  appRefId: this.appRefId,
                  applicationType: this.applicationType
                });
              this.router.navigate(['/payments/TreasuryWisePaymentManager'],{ queryParams:{info: encodedQueryParms}});
            }
          });
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
  onSubmitToDepartment(takeActionAlertModal){
    this.modalService.open(takeActionAlertModal, { size: 'sm', scrollable: true, backdrop: 'static', keyboard: false });
  }
  onAlertModelYesClick() {
    this.modalService.dismissAll();
    this.onSubmit(false);
  }
  onModelNoClick() {
    this.modalService.dismissAll();
  }
  onSubmit(isPaymentRequired: boolean) {
    this.isSubmited = true;
    this.showAttachementOption()
    let canSubmit = true;
    if (this.isDocumentUploadOption && !this.isOptional) {
      var input: any = document.getElementById('10002');
      if (input == null || input.files.length == 0) {
        canSubmit = false;
      }
    }
    // else if (this.raisedFeeList.filter(x =>
    //   (x.feeHeaderRefId == 19 && x.amountAlreadyPaid != x.amountRaised)
    //   || (x.feeHeaderRefId == 22 && x.amountAlreadyPaid != x.amountRaised
    //     || (x.feeHeaderRefId == 27 && x.amountAlreadyPaid != x.amountRaised))).length > 0) {
    //   canSubmit = false;
    //   Swal.fire({
    //     icon: 'warning',
    //     html: 'Under payment section-I, Already paid fee can not be less then fee raised by the officer.<br> Kindly update & upload the payment receipt proof and try again..! <br><br> ਭੁਗਤਾਨ ਸੈਕਸ਼ਨ-I ਦੇ ਤਹਿਤ, ਪਹਿਲਾਂ ਹੀ ਅਦਾ ਕੀਤੀ ਗਈ ਫੀਸ ਅਧਿਕਾਰੀ ਦੁਆਰਾ ਦੱਸੀ ਗਈ ਫੀਸ ਤੋਂ ਘੱਟ ਨਹੀਂ ਹੋ ਸਕਦੀ।<br> ਕਿਰਪਾ ਕਰਕੇ ਭੁਗਤਾਨ ਦੀ ਰਸੀਦ ਦੇ ਸਬੂਤ ਨੂੰ ਅੱਪਲੋਡ ਕਰੋ ਅਤੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।',
    //   })
    // }
    var documentCtrl: any = document.getElementById('appDocId_10002');

    if (canSubmit) {
      this.actionTaken=true;
      this.reqData.buildingPlanHUDPaymentDetailList = this.raisedFeeList;
      this.reqData.appDocRefId = documentCtrl != null ? documentCtrl.value : 0;
      this.appHttpRequestHandlerService.httpPost(this.reqData, "pbsamadhannetcoreapi.ViewModels.BuildingPlanHUDPaymentDetailViewModal", "BuildingPlanHUD", "update_RaisedFeeDetail").pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data: GenericResponseTemplateModel<boolean>) => {
          if (!data.hasError && data.responseDataModel) {
            var feeCalculatorInfoParms: FeeCalculatorInfoParmsViewModel[] = [];
            this.raisedFeeList.forEach(element => {
              feeCalculatorInfoParms.push({
                amountCalculated: element.amountPayable,
                appRefId: this.appRefId,
                description: element.description,
                feeHeaderId: element.feeHeaderRefId,
                feeHeaderTitle: element.feesHeader.feeHeaderTitle,
                isDeduductible: false,
                paymentBatchCounter: this.paymentBatchCounter,
                paymentDetailId: element.paymentDetailId,
                hasDedicatedTreasuryCode: element.hasDedicatedTreasuryCode,
                dedicatedTreasurCode: element.dedicatedTreasurCode,
                dedicatedDDOCode: element.dedicatedDDOCode,
                isTreasuryPayment: false,
                nonTreasuryCode: ''
              });
            });
          }

          if (isPaymentRequired) {
            this.appHttpRequestHandlerService.httpPost(feeCalculatorInfoParms, "List<pbsamadhannetcoreapi.ViewModels.FeeCalculatorInfoParmsViewModel>", "PaymentManager", "logApplicationFeeHeaders").pipe(takeUntil(this.ngUnsubscribe))
              .subscribe((data: GenericResponseTemplateModel<number>) => {
                if (!data.hasError) {
                  // this.router.navigate(['/payments/appfeepaymentinitiateterminal'], { queryParams: { info:  this.commonOpsService.encodeQueryParamsInBase64( {appRefId: this.appRefId, applicationType: this.applicationType, netFeeCalculated: this.netFeeCalculated})}});
                  this.router.navigate(['/payments/TreasuryWisePaymentManager'], { queryParams: { info: this.commonOpsService.encodeQueryParamsInBase64({ appRefId: this.appRefId, applicationType: this.applicationType, netFeeCalculated: this.netFeeCalculated, paymentBatchCounter: data.responseDataModel }) } });
                }
              });
          }
          else {
            var processAppParms: ApplicationProcess = {
              appActionType: 9,
              appDocumentRefId: documentCtrl.value,
              appRefId: this.appRefId,
              attachmentName: '',
              checkListFormJson: "",
              isDocumentUploaded: true,
              pdfNameGUID: "",
              publicAppRefNum: "",
              receiver_UserRefId: "C29E5FD2-8FB9-49AC-BCF1-7E06769FAAD9", //ADDF
              remarks: "Raised Fee Paid Ofline (BuildingPlan-HUD)",
              userId: this.authService.getUserJwtDecodedInfo().UserId.toString(),
              paymentBatchCounter:0,
              factoryHazardousCategoryType: 0,
              factorySectionCategoryType: 0,
              factorySessionCategoryType: 0,
              factoryCategoryType: 0,
              districtLgdRefId:0,
              labourCircleRefId:0,
              raisedFeeReason: 'NA',
              raisedFeeAmount: 0,
              securityRaisedFeeAmount: 0,

              existingWorkers_MaxDuringYear : 0,
              existingPowerKW_Installed : 0,
              workers_MaxDuringYear : 0,
              powerKW_Installed : 0,

              psiecCessAmount : 0,
              psiecProcessingFeeAmount : 0,

              ipAddress : this.ipAddress,
              latitude : this.latitude,
              longitude : this.longitude,
              previousActionType: 0
            }
            this.appHttpRequestHandlerService.httpPost(processAppParms, "pbsamadhannetcoreapi.ViewModels.ApplicationActionViewModel", "ProcessApplication", "recordOfflineRaiseFeeAction").pipe(takeUntil(this.ngUnsubscribe))
              .subscribe((data: GenericResponseTemplateModel<IRecordActionResponseViewModel>) => {
                localStorage.clear();
                window.location.href = environment.thirdPartyIntegrationConfigs.investPunjab.investPunjabReturnPath;
            });
          }
        });
    }
  }

  setFeeInHeader(event, feeHeaderId) {
    let targatedFeeHeaderIdIndex = this.raisedFeeList.findIndex(x => x.feeHeaderRefId == feeHeaderId)
    if (targatedFeeHeaderIdIndex >= 0) {
      this.raisedFeeList[targatedFeeHeaderIdIndex].amountAlreadyPaid = Number(event.target.value);
      this.raisedFeeList[targatedFeeHeaderIdIndex].amountPayable = this.raisedFeeList[targatedFeeHeaderIdIndex].amountRaised - this.raisedFeeList[targatedFeeHeaderIdIndex].amountAlreadyPaid;
      this.getNetFeePayable();
    }
  }
  getNetFeePayable() {
    this.netFeeCalculated = this.raisedFeeList.reduce((sum, item) => sum + item?.amountPayable, 0);
  }
  onAlreadyFeePaidChange(e, i, feeHeaderRefId) {
    if (e.target.value > this.raisedFeeList[i].amountRaised) {
      Swal.fire({
        icon: 'warning',
        text: 'Already paid amount cannot be greater than raised amount!',
      })
      this.raisedFeeList[i].amountAlreadyPaid = 0;
      setTimeout(() => {
        this.setFeeInHeader(e, feeHeaderRefId);
      }, 500);

      //e.target.value=0;
    }
    this.showAttachementOption()
  }


  showAttachementOption() {
    if (this.raisedFeeList.some(x => x?.amountAlreadyPaid > 0)) {
      this.isDocumentUploadOption = true;
      this.isOptional = false;
    }
    else {
      this.isDocumentUploadOption = false;
      this.isOptional = true;
    }
  }


  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
