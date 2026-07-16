import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonService } from 'src/app/common/common.service';
import { AppFileUploadInfoViewModel, GenericFormModel, IAppFeeDetail, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { GenericResponseTemplateModel, GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { ApplicationProcessService } from '../applicationProcess-service';
import { AppActionTime_MutualProcessFlag, ApplicationProcess, ILatestCircleInfoViewModel, IPSIECUserDetails, IRecordActionResponseViewModel, IVerifyAppCircleVersionRespViewModel, ProjectSite, RoleWiseAllowedActionCode } from '../applicationProcess-typed-module';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
@Component({
    selector: 'app-process-application-window',
    templateUrl: './process-application-window.component.html',
    styleUrls: ['./process-application-window.component.css'],
    standalone: false
})
export class ProcessApplicationWindowComponent implements OnInit {
  genericFormData: GenericFormModel<ApplicationProcess>;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  public selMenuCode: string = 'NOTINGS';
  actionList: RoleWiseAllowedActionCode[] = [];
  usersList: any = [];
  public appRefId: number;
  public projectSiteId: number;
  public roleName : any;
  notingLogs: any = [];
  projectSiteData: any = [];
  pdfPath: any = [];
  isChecklistBasedScrutiny: boolean = environment.scrutinyConfigs.isChecklistBasedScrutiny;
  areAllAgreed: boolean = true;
  public checkListForm: any;
  public projectSiteRefId: number;
  public applicationType: number;
  public currentActionCode: number;
  appFilesInfo: AppFileUploadInfoViewModel[];
  isDocumentUploadOption: boolean = false;
  isOptional: boolean = true;
  allowTakeAction: number=0;
  dofNumber : any;
  public paramInfo:any;
  applicationSpecificData: any;
  totalSum: number;
  public circleInfoData: IVerifyAppCircleVersionRespViewModel={isAlreadyUpdated: false,latestCircles:[]};
  principalEmployerApprovalExtraInputsToBeShown:boolean=false;
  contractLabourApprovalExtraInputsToBeShown:boolean=false;
  errCode = 0;
  @ViewChild("locationWarningModal") locationWarningModal: TemplateRef<any>;
  public projectSiteVersion: any;
  rurl: string='';
  rdtp: string='';
  public isTimeLineFlow : boolean = false;
  public applicationActionLogId : number;
  public openMutualProcesses: AppActionTime_MutualProcessFlag[]=[];
	public pSIECBalanceFeeInputsToBeShown:boolean=false;
  public isPreCheckPassed: boolean=true;

  public pSIECUserDetails : any;
  public selectedSdoAndEoDetails : any;

  constructor(private fb: UntypedFormBuilder,
    private applicationProcessService: ApplicationProcessService,
    private route: ActivatedRoute,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private common: CommonService,
    private modalService: NgbModal,
    public authService: AuthService,
    public commonOpsService: CommonOpsService) { }

  //initialization of form
  ProcessApplication_Form: TForm<ApplicationProcess> = this.fb.group({
    appActionType: ['', Validators.required],
    receiver_UserRefId: ['', Validators.required],
    remarks: ['', Validators.required],
    appRefId: ['', Validators.required],
    pdfNameGUID: ['NA', Validators.required],
    publicAppRefNum: [''],
    userId: ['', Validators.required],

    isDocumentUploaded: [false, Validators.required],
    appDocumentRefId: [0, Validators.required],

    factoryHazardousCategoryType: [0, Validators.required],
    factorySectionCategoryType: [0, Validators.required],
    factorySessionCategoryType: [0, Validators.required],
    factoryCategoryType: [0, Validators.required],
    labourCircleRefId: [0, Validators.required],
    districtLgdRefId: [0, Validators.required],

    raisedFeeReason : ['NA', Validators.required],
    raisedFeeAmount : [0, [Validators.required, Validators.min(1), Validators.max(999999999999)]],
    securityRaisedFeeAmount : [1, [Validators.required, Validators.min(1), Validators.max(999999999999)]],

    existingWorkers_MaxDuringYear : ['', Validators.required],
    existingPowerKW_Installed : ['', Validators.required],
    workers_MaxDuringYear : ['', Validators.required],
    powerKW_Installed : ['', Validators.required],

    psiecCessAmount : [1, [Validators.required, Validators.min(1), Validators.max(999999999999)]],
    psiecProcessingFeeAmount : [1, [Validators.required, Validators.min(1), Validators.max(999999999999)]],

    ipAddress : ['', Validators.required],
    latitude : ['', Validators.required],
    longitude : ['', Validators.required],
    applicationActionLogId : [0, Validators.required],
    previousActionType : [0, Validators.required],
    
  }) as TForm<ApplicationProcess>;
  UserId: string;
  submitted = false;

  get formControls() { return this.ProcessApplication_Form.controls; }

  upgradeCircle_Form: TForm<ILatestCircleInfoViewModel> = this.fb.group({
    circleId: ['', Validators.required],
    circleType: ['', Validators.required],
    circleName: ['', Validators.required],
    juridcitionArea: ['', Validators.required],
    officerName: ['', Validators.required],
    roleDesc: [''],
    userId: ['', Validators.required],
    userProfileId: [false, Validators.required],
    roleId: ['', Validators.required],
    appRefId: ['', Validators.required],
    projectSiteRefId: ['', Validators.required],
    sender_UserRefId: [this.authService.getUserJwtDecodedInfo().UserId.toString(), Validators.required],
    sender_UserProfileRefId: [this.authService.getUserJwtDecodedInfo().UserProfileId.toString(), Validators.required],
  }) as TForm<ILatestCircleInfoViewModel>;
  

 PSIEC_Officers_Form = this.fb.group({
  sdoName: [null, [Validators.required]],
  eoName: [null, [Validators.required]]
});

  factoryApprovalExtraInputsToBeShown:boolean=false;
  factoryApprovalBalanceFeeInputsToBeShown:boolean=false;
  isLocationOn: boolean=false;
  ngOnInit(): void {
    this.UserId = this.authService.getUserJwtDecodedInfo().UserId.toString();
    this.route.queryParams
      .subscribe(params => {
        this.rurl = params.rurl;
        this.rdtp = params.rdtp;
        this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info)=>{
        this.paramInfo = info;
        this.appRefId = this.paramInfo?.appRefId;
        this.projectSiteRefId = this.paramInfo?.projectSiteRefId;
        this.applicationType = this.paramInfo?.applicationType;
        this.currentActionCode = this.paramInfo?.actionCode;
        this.allowTakeAction =  this.paramInfo?.allowTakeAction;
        this.projectSiteVersion = this.paramInfo?.projectSiteVersion;
        this.isTimeLineFlow = this.paramInfo.isTimeLineFlow;
        this.applicationActionLogId  = this.paramInfo.applicationActionLogId;
        this.appHttpRequestHandlerService.httpGet({ projectSiteRefId: this.projectSiteRefId,  roleCode: this.authService.getUserJwtDecodedInfo().RoleCode, applicationType: this.applicationType }, "CircleManager", "verifyAppCircleVersionUpdate").pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((circleInfoResp: GenericResponseTemplateModel<IVerifyAppCircleVersionRespViewModel>) => {
            this.circleInfoData = circleInfoResp.responseDataModel;
            if(this.circleInfoData.isAlreadyUpdated){
              this.ProcessApplication_Form.patchValue({ appRefId: this.appRefId });
              this.ProcessApplication_Form.patchValue({ projectSiteRefId: this.projectSiteRefId })
              this.ProcessApplication_Form.patchValue({ applicationType: this.paramInfo?.applicationType })
              if(this.isTimeLineFlow && this.applicationType !=6){
                this.appHttpRequestHandlerService.httpGet({ appRefId : this.appRefId, userRefId : this.authService.getUserJwtDecodedInfo().UserId}, "ProcessApplication", "getTimeLineOpenMutualAction").pipe(takeUntil(this.ngUnsubscribe))
                  .subscribe((mutualProcessData: GenericFormModel<AppActionTime_MutualProcessFlag[]>) => {
                    this.openMutualProcesses = mutualProcessData.formModel;
                    if(mutualProcessData.formModel.length==0){
                      this.appHttpRequestHandlerService.httpGet({ appActionLogRefId :  this.paramInfo?.applicationActionLogId, userRefId : this.authService.getUserJwtDecodedInfo().UserId, appRefId : this.appRefId}, "ProcessApplication", "getTimeLineWiseAllowedAction").pipe(takeUntil(this.ngUnsubscribe))
                      .subscribe((data1: GenericFormModel<RoleWiseAllowedActionCode[]>) => {
                      this.actionList = data1.formModel
                    });
                    }
                });
              }
              else{
                this.appHttpRequestHandlerService.httpGet({ id: this.authService.getUserJwtDecodedInfo().UserId, currentActionCode: this.currentActionCode, applicationType: this.applicationType }, "ProcessApplication", "getprocessapplicationdetail").pipe(takeUntil(this.ngUnsubscribe))
                .subscribe((data1: GenericFormModel<RoleWiseAllowedActionCode[]>) => {
                  this.actionList = data1.formModel
                  this.appHttpRequestHandlerService.httpGet({ id: this.authService.getUserJwtDecodedInfo().UserId, appRefId: this.appRefId }, "ProcessApplication", "getApplicationNotingLogs").pipe(takeUntil(this.ngUnsubscribe))
                  .subscribe((data3: GenericFormModel<ApplicationProcess>) => {
                    this.notingLogs = data3.formModel
                  });
                });  
              }
            }
          });
          this.checkListForm = this.fb.group({
            checkListNodes: this.fb.array([])
          });
          this.ProcessApplication_Form.controls.userId.patchValue(this.authService.getUserJwtDecodedInfo().UserId);
      
          this.dofNumber = "DOFPB" + this.projectSiteRefId.toString().padStart(8, "0");
          this.roleName = this.authService.getUserJwtDecodedInfo().RoleName;
        });
      });

     // Fetch the current location
     const location = this.common.getCurrentLocation().then((x: any) => {
      this.ProcessApplication_Form.controls.ipAddress.patchValue(x.latitude);
      this.ProcessApplication_Form.controls.latitude.patchValue(x.latitude);
      this.ProcessApplication_Form.controls.longitude.patchValue(x.longitude);
      this.common.getIpCliente().subscribe((y: any)=>{
        this.ProcessApplication_Form.controls.ipAddress.patchValue(y.ip);
      });
      this.errCode = 0;
      this.isLocationOn=true;
      }).catch((ex: any) => {
      this.errCode = 1;
      this.isLocationOn=false;
  });
  


  }

  public onChangeActionDropDown(PsiecOfficerModal,appActionType) {
    this.isPreCheckPassed= true;
    if(appActionType == 200 && this.applicationType==70){
      this.factoryApprovalExtraInputsToBeShown=true;
      this.ProcessApplication_Form.controls.factoryHazardousCategoryType.patchValue('');
      this.ProcessApplication_Form.controls.factorySectionCategoryType.patchValue('');
      this.ProcessApplication_Form.controls.factorySessionCategoryType.patchValue('');
      this.ProcessApplication_Form.controls.labourCircleRefId.patchValue('');
      this.ProcessApplication_Form.controls.districtLgdRefId.patchValue('');
      this.ProcessApplication_Form.controls.factoryCategoryType.patchValue('');
      this.ProcessApplication_Form.controls.securityRaisedFeeAmount.patchValue(1);
    }
    else  if(appActionType == 402 && (this.applicationType==37 || this.applicationType==39)){
      this.principalEmployerApprovalExtraInputsToBeShown=true;
       this.contractLabourApprovalExtraInputsToBeShown=false;
      this.ProcessApplication_Form.controls.raisedFeeReason.patchValue('');
      this.ProcessApplication_Form.controls.raisedFeeAmount.patchValue('');
      this.ProcessApplication_Form.controls.existingWorkers_MaxDuringYear.patchValue(0);
      this.ProcessApplication_Form.controls.existingPowerKW_Installed.patchValue(0);
      this.ProcessApplication_Form.controls.workers_MaxDuringYear.patchValue(0);
      this.ProcessApplication_Form.controls.powerKW_Installed.patchValue(0);
      this.ProcessApplication_Form.controls.securityRaisedFeeAmount.patchValue(1);
    }
    else  if(appActionType == 402 &&  (this.applicationType==38 || this.applicationType==40)){
      this.contractLabourApprovalExtraInputsToBeShown=true;
       this.principalEmployerApprovalExtraInputsToBeShown=false;
      this.ProcessApplication_Form.controls.raisedFeeReason.patchValue('');
      this.ProcessApplication_Form.controls.raisedFeeAmount.patchValue(0);
      this.ProcessApplication_Form.controls.existingWorkers_MaxDuringYear.patchValue(0);
      this.ProcessApplication_Form.controls.existingPowerKW_Installed.patchValue(0);
      this.ProcessApplication_Form.controls.workers_MaxDuringYear.patchValue(0);
      this.ProcessApplication_Form.controls.powerKW_Installed.patchValue(0);
      this.ProcessApplication_Form.controls.securityRaisedFeeAmount.patchValue(0);
    }
    else{
      this.principalEmployerApprovalExtraInputsToBeShown=false;
      this.factoryApprovalExtraInputsToBeShown=false;
      this.ProcessApplication_Form.controls.factoryHazardousCategoryType.patchValue(0);
      this.ProcessApplication_Form.controls.factorySectionCategoryType.patchValue(0);
      this.ProcessApplication_Form.controls.factorySessionCategoryType.patchValue(0);
      this.ProcessApplication_Form.controls.labourCircleRefId.patchValue(0);
      this.ProcessApplication_Form.controls.districtLgdRefId.patchValue(0);
      this.ProcessApplication_Form.controls.factoryCategoryType.patchValue(0);
      this.ProcessApplication_Form.controls.securityRaisedFeeAmount.patchValue(1);
    }

    if(appActionType == 402 && this.applicationType==70){
      // Get application specific data
      this.appHttpRequestHandlerService.httpGet({ appRefId: this.appRefId, applicationType : this.applicationType }, "ProcessApplication", "getApplicationSpecificData").pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data: GenericResponseTemplateModel<ApplicationProcess>) => {
          this.applicationSpecificData = data.responseDataModel;
          this.ProcessApplication_Form.patchValue({
            existingWorkers_MaxDuringYear: this.applicationSpecificData?.factoryLicenceSpecificData?.existingWorkers_MaxDuringYear,
            existingPowerKW_Installed: this.applicationSpecificData?.factoryLicenceSpecificData?.existingPowerKW_Installed
          });
      });

      this.factoryApprovalBalanceFeeInputsToBeShown=true;
      this.ProcessApplication_Form.controls.raisedFeeReason.patchValue('');
      this.ProcessApplication_Form.controls.raisedFeeAmount.patchValue('');
      this.ProcessApplication_Form.controls.existingWorkers_MaxDuringYear.patchValue('');
      this.ProcessApplication_Form.controls.existingPowerKW_Installed.patchValue('');
      this.ProcessApplication_Form.controls.workers_MaxDuringYear.patchValue('');
      this.ProcessApplication_Form.controls.powerKW_Installed.patchValue('');
    }
    else{
      this.factoryApprovalBalanceFeeInputsToBeShown=false;
      this.ProcessApplication_Form.controls.raisedFeeReason.patchValue('NA');
      this.ProcessApplication_Form.controls.raisedFeeAmount.patchValue(1);
      this.ProcessApplication_Form.controls.existingWorkers_MaxDuringYear.patchValue(0);
      this.ProcessApplication_Form.controls.existingPowerKW_Installed.patchValue(0);
      this.ProcessApplication_Form.controls.workers_MaxDuringYear.patchValue(0);
      this.ProcessApplication_Form.controls.powerKW_Installed.patchValue(0);
    }

    if(appActionType == 400 && this.applicationType==81){
      this.pSIECBalanceFeeInputsToBeShown=true;
      this.ProcessApplication_Form.controls.psiecCessAmount.patchValue('');
      this.ProcessApplication_Form.controls.psiecProcessingFeeAmount.patchValue('');
    }
    else if(appActionType == 412 && this.applicationType==81){
      this.appHttpRequestHandlerService.httpGet({ appRefId: this.appRefId }, "PaymentManager", "getAppFeeDetails").pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data: GenericResponseTemplateModel<IAppFeeDetail[]>) => {
          this.pSIECBalanceFeeInputsToBeShown=true;
          this.ProcessApplication_Form.controls.psiecCessAmount.patchValue(data.responseDataModel.filter(x=>x.feeHeaderRefId == 48)[0].amount);
          this.ProcessApplication_Form.controls.psiecProcessingFeeAmount.patchValue(data.responseDataModel.filter(x=>x.feeHeaderRefId == 39)[0].amount);
      });
    }
    else{
      this.pSIECBalanceFeeInputsToBeShown=false;
      this.ProcessApplication_Form.controls.psiecCessAmount.patchValue(1);
      this.ProcessApplication_Form.controls.psiecProcessingFeeAmount.patchValue(1);
    }


    // Model Popup trigger when JDM sent to SDO & EO
    if(this.authService.getUserJwtDecodedInfo().RoleName == "JDM" && this.applicationType == 81 && appActionType ==103) 
    {
       this.appHttpRequestHandlerService.httpGet({ sdo : 'sdo', eo : 'eo' }, "Licence_BuildingPlan_PSIEC", "getSdoAndEoDetails").pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data: GenericResponseTemplateModel<IPSIECUserDetails>) => {
          this.pSIECUserDetails = data.responseDataModel;
        });

        this.modalService.open(PsiecOfficerModal, { scrollable: true });
        var userListElements =document.getElementsByClassName('userListClass') as HTMLCollectionOf<HTMLElement>;
        for (let i = 0; i < userListElements.length; i++) {
          userListElements[i].style.display = 'none';
        }
        
        document.getElementById('psiecUser').style.display= 'Block';
    }

    this.ProcessApplication_Form.controls.receiver_UserRefId.patchValue('');
    this.usersList = [];
    this.isDocumentUploadOption = false;
    if (appActionType) {
      let foundActionDetail = this.actionList.filter(x => x.allowedActionCode == appActionType);
      if (foundActionDetail) {
        this.isDocumentUploadOption = foundActionDetail[0].isDocumentUploadOption;
        this.appHttpRequestHandlerService.httpGet({ id: this.authService.getUserJwtDecodedInfo().UserId, actionCode: appActionType, appRefId: this.appRefId, applicationType: this.applicationType, precheckCode : this.actionList.filter(x=>x.allowedActionCode == appActionType)[0].precheckCode}, "ProcessApplication", "getuserbyactioncode").pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: GenericResponseTemplateModel<any>) => {
            this.isPreCheckPassed =data.responseDataModel.isPreCheckPassed;
            this.usersList = data.responseDataModel.processApplicationUsers;
          });
      }
    }
  }
  onCircleOptionChange(circleData: any){
    this.ProcessApplication_Form.controls.labourCircleRefId.patchValue(circleData.labourCircleId);
  }
  onAlertModelYesClick() {
    this.modalService.dismissAll();
    this.saveActionTaken();
  }
  onModelNoClick() {
    this.modalService.dismissAll();
  }
  onSubmit(takeActionAlertModal): void {
    this.submitted = true;
    var isAllUploaded: Boolean = true;
    this.ProcessApplication_Form.controls.appDocumentRefId.patchValue(0);
    this.ProcessApplication_Form.controls.isDocumentUploaded.patchValue(false);

    if (this.ProcessApplication_Form.controls.appActionType.value) {
      let foundActionDetail = this.actionList.filter(x => x.allowedActionCode == this.ProcessApplication_Form.controls.appActionType.value);
      this.isDocumentUploadOption = foundActionDetail[0].isDocumentUploadOption;
      this.isOptional = foundActionDetail[0].isOptional;

      if (this.isDocumentUploadOption && !this.isOptional) {
        var input: any = document.getElementById(foundActionDetail[0].docRefId.toString());
        if (input.files.length == 0) {
          isAllUploaded = false;
          document.getElementById(
            'docName_' + foundActionDetail[0].docRefId.toString()
          ).className = 'text-danger';
        } else {
          document.getElementById(
            'docName_' + foundActionDetail[0].docRefId.toString()
          ).className = '';
        }
      }
      if (this.isDocumentUploadOption){
        var appDocRefId = (<HTMLInputElement>document.getElementById("appDocId_"+foundActionDetail[0].docRefId.toString())).value;
        if(Number(appDocRefId)>0){
        this.ProcessApplication_Form.controls.isDocumentUploaded.patchValue(true);
        }
        this.ProcessApplication_Form.controls.appDocumentRefId.patchValue(Number(appDocRefId));
      }
    }
    
    if (this.ProcessApplication_Form.valid && isAllUploaded) {
      if(this.ProcessApplication_Form.controls.appActionType.value !=5){
        this.modalService.open(takeActionAlertModal, { size: 'sm', scrollable: true, backdrop: 'static', keyboard: false });
      }
      else{
        Swal.fire({
          icon: 'warning',
          text: 'Approval certificate performa is not available..!',
        });
      }
    }
  }
  saveActionTaken() {
    const location = this.common.getCurrentLocation().then((x: any) => {
      this.ProcessApplication_Form.controls.latitude.patchValue(x.latitude);
      this.ProcessApplication_Form.controls.longitude.patchValue(x.longitude);
      this.ProcessApplication_Form.controls.applicationActionLogId.patchValue(this.paramInfo?.applicationActionLogId);
      this.ProcessApplication_Form.controls.previousActionType.patchValue(this.currentActionCode);


      this.errCode = 0;
      this.isLocationOn=true;
      this.common.getIpCliente().subscribe((y: any)=>{
        this.ProcessApplication_Form.controls.ipAddress.patchValue(y.ip);
        this.appHttpRequestHandlerService.httpPost(this.ProcessApplication_Form.value,"pbsamadhannetcoreapi.ViewModels.ApplicationActionViewModel", "ProcessApplication", "addprocessapplicationdetails").pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((data: GenericResponseTemplateModel<IRecordActionResponseViewModel>) => {
              this.router.navigate(['/dashboard/officials'],{ queryParams:{info: this.rurl, rdtp: this.rdtp}}) .then(() => {
              window.location.reload();
          });
        });
        //this.router.navigate(['/dashboard/officials'],{ queryParams:{info: this.rurl, rdtp: this.rdtp}}).then(() => {window.location.reload();});
      })
      }).catch((ex: any) => {
      this.errCode = 1;
      this.isLocationOn=false;
      this.modalService.open(this.locationWarningModal, { size: 'sm', scrollable: true, backdrop: 'static', keyboard: false });
    });
  }
  onGoBack(){
    this.router.navigate(['/dashboard/officials'],{ queryParams:{info: this.rurl, rdtp: this.rdtp}});
  }

  onGoHome(){
    this.router.navigate(['/dashboard/officials']);
  }
  
  deleteTempCreatedLicense() {
    this.modalService.dismissAll();
    this.appHttpRequestHandlerService.httpPost(this.ProcessApplication_Form.value, "pbsamadhannetcoreapi.ViewModels.ApplicationActionViewModel", "ProcessApplication", "deleteTempCreatedLicense").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericServiceResultTemplate) => {
        this.modalService.dismissAll();
        //this.router.navigate(['/dashboard/officials']);
      });
  }

  onSelectMenuItem(menuCode) {
    this.selMenuCode = menuCode;
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  openScrollableContent(longContent) {
    this.appHttpRequestHandlerService.httpGet({ appRefId: this.appRefId, applicationType: this.applicationType }, "PdfOprations", "generatecertificate").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data) => {
        if (!data.hasException) {
          this.pdfPath = environment.pbLabourDefaultRoot + 'TempFiles/' + data.pdfNameGUID;
          if(String(this.pdfPath).indexOf('.pdf')<=0){
            this.pdfPath = this.pdfPath + '.pdf';
          }

          this.ProcessApplication_Form.controls.pdfNameGUID.patchValue(data.pdfNameGUID);
          //this.ProcessApplication_Form.value.patchValue({pdfNameGUID: 'NA'});
          this.modalService.open(longContent, { scrollable: true, backdrop: 'static', keyboard: false });
        }
      })
  }
  
  onApproveClick() {
    this.modalService.dismissAll();
    this.saveActionTaken();
  }

  onaddCheckListToFormEvent(nodeInfo: any) {
    (<UntypedFormArray>this.checkListForm.get('checkListNodes')).push(this.fb.group({
      fieldName: [nodeInfo.nodeName, Validators.required],
      isVerified: ['', Validators.required],
      remarks: ['', Validators.required],
      isDocument: [nodeInfo.isDocument, Validators.required]
    }));
  }
  onChangeChecklistNodeEvent(nodeUpdatedValueInfo: any) {
    this.ProcessApplication_Form.controls.checkListFormJson.patchValue(JSON.stringify(this.checkListForm.value));
    var nodeName = nodeUpdatedValueInfo.nodeName_controlName.split('_')[0];
    var controlName = nodeUpdatedValueInfo.nodeName_controlName.split('_')[1];
    var checklistNodes = <UntypedFormArray>this.checkListForm.get('checkListNodes');
    checklistNodes.controls.map(x => {
      if (x.value.fieldName == nodeName) {
        x.patchValue({ [controlName]: nodeUpdatedValueInfo.value });
        if (controlName == 'isVerified') {
          x.patchValue({ remarks: nodeUpdatedValueInfo.value == 'true' ? 'NA' : '' });
        }
      }
    });
    this.areAllAgreed = true;
    checklistNodes.controls.forEach(formArray => {
      if (this.areAllAgreed == true) {
        this.areAllAgreed = (<UntypedFormGroup>formArray).controls.isVerified.value == 'true' ? true : false;
      }
    });
    var optionsLength = (<HTMLSelectElement>document.getElementById('appActionType')).options.length;
    for (var i = 0; i < optionsLength; i++) {
      var optionValue = (<HTMLSelectElement>document.getElementById('appActionType')).options.item(i).value;
      (<HTMLSelectElement>document.getElementById('appActionType')).options.item(i).hidden = true;

      if (this.areAllAgreed && (optionValue == '101' || optionValue == '200')) {
        (<HTMLSelectElement>document.getElementById('appActionType')).options.item(i).hidden = false;
      }
      else if (!this.areAllAgreed && (optionValue == '100' || optionValue == '102' || optionValue == '404' || optionValue == '400')) {
        (<HTMLSelectElement>document.getElementById('appActionType')).options.item(i).hidden = false;
      }
    }
  }

  upgradeApplicationCircle(circleId: number){
    this.upgradeCircle_Form.patchValue(this.circleInfoData.latestCircles.filter(x=>x.circleId==circleId)[0]);
    this.upgradeCircle_Form.controls.appRefId.patchValue(this.appRefId);
    this.upgradeCircle_Form.controls.projectSiteRefId.patchValue(this.projectSiteRefId);
    this.upgradeCircle_Form.controls.sender_UserRefId.patchValue(this.authService.getUserJwtDecodedInfo().UserId.toString());
    this.upgradeCircle_Form.controls.sender_UserProfileRefId.patchValue(this.authService.getUserJwtDecodedInfo().UserProfileId.toString());

  }

  submitUpgradeCircle(){
    this.appHttpRequestHandlerService.httpPost(this.upgradeCircle_Form.value, "pbsamadhannetcoreapi.ViewModels.LatestCircleInfoViewModel", "ProcessApplication", "upgradeApplicationCircle").pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: GenericResponseTemplateModel<IRecordActionResponseViewModel>) => {
      this.router.navigate(['/dashboard/officials']) .then(() => {
        window.location.reload();
      });;
    });
  }
  previewDocument(longContent, fileName) {
    this.pdfPath = environment.pbLabourDefaultRoot + 'AppFiles/' + fileName.trim();
    this.modalService.open(longContent, { scrollable: true, backdrop: 'static', keyboard: false });
  }
  closePreviewModal(){
    this.modalService.dismissAll();
  }

 SubmitPsiecOfficer(): void {
  if (this.PSIEC_Officers_Form.valid) {
    const formData = this.PSIEC_Officers_Form.value;
    const selectedSDO = formData.sdoName;
    const selectedEO = formData.eoName;
    const payload = {
      sdo: {
        officerName: selectedSDO.officerName,
        designation: selectedSDO.designation,
        userRefId: selectedSDO.userRefId
      },
      eo: {
        officerName: selectedEO.officerName,
        designation: selectedEO.designation,
        userRefId: selectedEO.userRefId
      }
    };
    this.ProcessApplication_Form.controls.receiver_UserRefId.patchValue(payload.eo.userRefId + '_' + payload.sdo.userRefId);
    this.selectedSdoAndEoDetails = "This application goes to the officer : " + payload.eo.officerName + ' ' + '(' + payload.eo.designation + ')' + ' ' + '&' + ' ' + payload.sdo.officerName + ' ' + '(' + payload.sdo.designation + ')';
    this.closePreviewModal();
  }
}

  onEditPsiecOfficerClick(PsiecOfficerModal){
    this.pSIECUserDetails
    this.modalService.open(PsiecOfficerModal, { scrollable: true });
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
}