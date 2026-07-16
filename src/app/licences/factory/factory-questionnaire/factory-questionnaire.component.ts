import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericFormModel, GenericListModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { IFactory_TemporaryLicenceDetailsViewModel, IFactory_Questionnaire, IOfficerDetailsByRoleNameViewModel } from '../../licences-typed-models';
import { PrincipalApprovalData, PrincipalApproval_RBA_DetailsViewModel } from 'src/app/building-plan-hud/building-plan-hud-typed-models';
import { GenericResponseTemplateModel, GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonService } from 'src/app/common/common.service';
import { ProjectSite } from 'src/app/project-site/project-site-typed-module';

@Component({
    selector: 'app-factory-questionnaire',
    templateUrl: './factory-questionnaire.component.html',
    styleUrls: ['./factory-questionnaire.component.css'],
    standalone: false
})
export class FactoryQuestionnaireComponent implements OnInit {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  submitted:boolean=false;
  public paramInfo:any;
  public parmamEncodedinfo:string;
  defaultReturnPath: string = environment.thirdPartyIntegrationConfigs.investPunjab.defaultReturnPath;
  checkboxFlag: any=false;
  public applicationPurposeType: any;
  public temporaryLicenceDetails: any;
  public projectSite: ProjectSite;
  constructor(private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    public commonOpsService: CommonOpsService,
    private router: Router,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    public common:CommonService) { }

  Input_Form: TForm<IFactory_Questionnaire> = this.fb.group({
    questionnaireDetailId: [0, Validators.required],

    isUnderRightToBusinessAct: ['', Validators.required],
    dateOfPrincipalApproval : ['', Validators.required],
    projectIdentificationNo: ['', [Validators.required, Validators.maxLength(100)]],
    appIdRightToBusinessAct: ['', [Validators.required, Validators.maxLength(100)]],
    isRBAVerified:[false, Validators.required],

    isTempRegistered: ['', Validators.required],
    tempRegistrationNumber: ['', Validators.required],
    isTempRegistrationVerified: [false, Validators.required],

    isBuildingPlanApproved: ['', Validators.required],
    buildingPlanDofNumber: ['', Validators.required],
    isBuildingPlanVerified: [false, Validators.required],

    isStabilityApproved: ['', Validators.required],
    stabilityPlanDofNumber: ['', Validators.required],
    isStabilityPlanVerified: [false, Validators.required],
    competentPersonUserId: ['', Validators.required],

    appRefId: [0, Validators.required],
    projectSiteRefId:[0, Validators.required],
    applicationPurposeType: ['', Validators.required],
    iPin : [0, Validators.required],
    investPunjab_AppId : [0, Validators.required],
    projectSiteVersion:[0, Validators.required]

  }) as TForm<IFactory_Questionnaire>;
  get formControls() { return this.Input_Form.controls; }
  rightToBussinessApprovalDetails: PrincipalApprovalData;
  temporaryLicenceDetailsViewModel: IFactory_TemporaryLicenceDetailsViewModel;
  buildingPlanApprovalCertificateFile: string='';
  buildingPlanStabilityApprovalCertificateFile: string='';
  competenPersonList: IOfficerDetailsByRoleNameViewModel[];
  hasSubmitClicked: boolean = false;
  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.route.queryParams
      .subscribe(params => {
        this.parmamEncodedinfo=params.info;
        this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info)=>{
          this.paramInfo = info;
          this.applicationPurposeType = this.paramInfo.applicationPurposeType;
          this.appHttpRequestHandlerService.httpGet({ projectSiteId: this.paramInfo?.projectSiteRefId, appRefId : 0, projectSiteVersion: this.paramInfo?.projectSiteVersion }, "ProjectSite", "getProjectsitesByProfileSiteId").pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: GenericFormModel<ProjectSite>) => { 
            this.projectSite = data.formModel;
              this.appHttpRequestHandlerService.httpGet({ }, "FactoryLicence", "getCompetentPersonDetails").pipe(takeUntil(this.ngUnsubscribe))
              .subscribe((resp: GenericListModel<IOfficerDetailsByRoleNameViewModel>) => { 
                this.competenPersonList = resp.listData;
              });
          });
          if(this.paramInfo.appRefId>0){
            this.onSubmit();
          }});
      });
  }
  tempRegChange(){
    this.Input_Form.controls.isTempRegistrationVerified.patchValue(false);
    if(this.Input_Form.controls.isTempRegistered.value){
      this.Input_Form.controls.tempRegistrationNumber.patchValue('');
    }
    else{
      this.Input_Form.controls.tempRegistrationNumber.patchValue('NA');
    }
  }
  buildingPlanApprovedChange(){
    this.Input_Form.controls.isBuildingPlanVerified.patchValue(false);
    if(this.Input_Form.controls.isBuildingPlanApproved.value == 1){
      this.Input_Form.controls.buildingPlanDofNumber.patchValue('');
    }
    else{
      this.Input_Form.controls.buildingPlanDofNumber.patchValue('NA');
      this.Input_Form.controls.isBuildingPlanVerified.patchValue(true);
    }
  }

  stabilityApprovedChange(){
    if(this.Input_Form.controls.isStabilityApproved.value == 0){
      this.Input_Form.controls.stabilityPlanDofNumber.patchValue('NA');
      this.Input_Form.controls.competentPersonUserId.patchValue('');
      this.Input_Form.controls.isStabilityPlanVerified.patchValue(true);
    }
    else if(this.Input_Form.controls.isStabilityApproved.value == 1){
      this.Input_Form.controls.stabilityPlanDofNumber.patchValue('');
      this.Input_Form.controls.competentPersonUserId.patchValue('NA');
      this.Input_Form.controls.isStabilityPlanVerified.patchValue(false);
    }
    else if(this.Input_Form.controls.isStabilityApproved.value == 2){
      this.Input_Form.controls.stabilityPlanDofNumber.patchValue('NA');
      this.Input_Form.controls.competentPersonUserId.patchValue('NA');
      this.Input_Form.controls.isStabilityPlanVerified.patchValue(true);
    }
  }
  onSubmit(): void {
    this.submitted=true;
    // *ngIf="( Input_Form.controls.isTempRegistered.value && Input_Form.controls.isTempRegistered.value == 0) || (Input_Form.controls.isStabilityApproved.value == 1  && Input_Form.controls.isStabilityApproved.value)"

    if(
      (this.Input_Form.controls.isUnderRightToBusinessAct.value == 1 && !this.Input_Form.controls.isRBAVerified.value) ||
      (this.Input_Form.controls.isTempRegistered.value == 1 && !this.Input_Form.controls.isTempRegistrationVerified.value) || 
      (this.Input_Form.controls.isBuildingPlanApproved.value == 1 && !this.Input_Form.controls.isBuildingPlanVerified.value) ||
      (this.Input_Form.controls.isStabilityApproved.value == 1 && !this.Input_Form.controls.isStabilityPlanVerified.value) ||
      (this.Input_Form.controls.isStabilityApproved.value == 0 && (this.Input_Form.controls.competentPersonUserId.value=='' || this.Input_Form.controls.competentPersonUserId.value=='NA'))){
    }
    else{
      this.Input_Form.controls.projectSiteRefId.patchValue(this.paramInfo?.projectSiteRefId);
      this.Input_Form.controls.iPin.patchValue(this.paramInfo?.iPin);
      this.Input_Form.controls.investPunjab_AppId.patchValue(this.paramInfo?.investPunjab_AppId);
      this.Input_Form.controls.applicationPurposeType.patchValue(this.paramInfo?.applicationPurposeType);
      this.Input_Form.controls.appRefId.patchValue(this.paramInfo?.isEntityKeysToKeepSame ? this.paramInfo?.appRefId: 0);
      this.Input_Form.controls.questionnaireDetailId.patchValue(0);
      this.Input_Form.controls.projectSiteVersion.patchValue(this.paramInfo?.projectSiteVersion);
      if(this.Input_Form.valid){
        this.hasSubmitClicked=true;
        this.appHttpRequestHandlerService.httpPost(this.Input_Form.getRawValue(), "pbsamadhannetcoreapi.Models.Licence_Factory_QuestionnaireDetail", "FactoryLicence", "addupdate_questionnairedetails").pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: GenericServiceResultTemplate) => {
              this.router.navigate(['/licence/addupdatefactorygeneraldetail'],{queryParams: { info: this.commonOpsService.encodeQueryParamsInBase64({
                identityKey: data.applicationInitiateResponse.entityKeyId, 
                appRefId: data.applicationInitiateResponse.appId, 
                applicationType: 6, 
                projectSiteRefId: this.paramInfo?.projectSiteRefId, 
                applicationPurposeType: this.paramInfo?.applicationPurposeType,
                investPunjab_AppId: this.paramInfo?.investPunjab_AppId,
                iPin: this.paramInfo?.iPin,
                projectSiteVersion: this.paramInfo?.projectSiteVersion
              }
              )}});
        });
      }
    }
  }

  checkBoxFlagChanged(){
  }

  findTempRegistrationDetails(tempRegistrationNumber){
    if(tempRegistrationNumber != '' && tempRegistrationNumber != undefined){
      this.appHttpRequestHandlerService.httpGet({ tempRegistrationNumber: tempRegistrationNumber }, "FactoryLicence", "getFactoryTemporaryLicenseDetails").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericResponseTemplateModel<IFactory_TemporaryLicenceDetailsViewModel>) => {
        this.temporaryLicenceDetailsViewModel = data.responseDataModel;
        if(data.responseDataModel != null){
          this.Input_Form.controls.isTempRegistrationVerified.patchValue(true);
          this.temporaryLicenceDetails = data.responseDataModel;
        }
        else  {
          this.temporaryLicenceDetailsViewModel=null;
          this.Input_Form.controls.isTempRegistrationVerified.patchValue(false);
          Swal.fire({
            icon: 'warning',
            text: 'Temporary registration number is not verified. Please check and try again..!',
          })
        }
      });
    }
  }

  findDOFNoDetails(buildingPlanDofNumber){
    if(buildingPlanDofNumber != '' && buildingPlanDofNumber != undefined){
      this.appHttpRequestHandlerService.httpGet({ dofNumber: buildingPlanDofNumber }, "FactoryLicence", "getBuidingPlanDetails").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericResponseTemplateModel<string>) => {
        this.buildingPlanApprovalCertificateFile = data.responseDataModel;
        if(data.responseDataModel != null){
          if(!this.buildingPlanApprovalCertificateFile.includes('.pdf',0)){
            this.buildingPlanApprovalCertificateFile = this.buildingPlanApprovalCertificateFile.concat('.pdf');
          }
          this.Input_Form.controls.buildingPlanDofNumber.disable({onlySelf:true, emitEvent: false}); 
          this.Input_Form.controls.isBuildingPlanVerified.patchValue(true);
        }
        else  {
          this.buildingPlanApprovalCertificateFile='';
          this.Input_Form.controls.isBuildingPlanVerified.patchValue(false);
          Swal.fire({
            icon: 'warning',
            text: 'Building plan approval detail is not verified. Please check and try again..!',
          })
        }
      });
    }
  }

  findStabilityDOFNoDetails(stabilityPlanDofNumber){
    if(stabilityPlanDofNumber != '' && stabilityPlanDofNumber != undefined){
      this.appHttpRequestHandlerService.httpGet({ dofNumber: stabilityPlanDofNumber }, "FactoryLicence", "getBuidingPlanDetails").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericResponseTemplateModel<string>) => {
        this.buildingPlanStabilityApprovalCertificateFile = data.responseDataModel;
        if(data.responseDataModel != null){
          if(!this.buildingPlanStabilityApprovalCertificateFile.includes('.pdf',0)){
            this.buildingPlanStabilityApprovalCertificateFile = this.buildingPlanStabilityApprovalCertificateFile.concat('.pdf');
          }
          this.Input_Form.controls.stabilityPlanDofNumber.disable({onlySelf:true, emitEvent: false}); 
          this.Input_Form.controls.isStabilityPlanVerified.patchValue(true);
        }
        else  {
          this.buildingPlanStabilityApprovalCertificateFile='';
          this.Input_Form.controls.isStabilityPlanVerified.patchValue(false);
          Swal.fire({
            icon: 'warning',
            text: 'Building plan stability approval detail is not verified. Please check and try again..!',
          })
        }
      });
    }
  }

  findPrincipalApprovalDetails(projectIdentificationNo, appIdRightToBusinessAct){
    this.Input_Form.controls.dateOfPrincipalApproval.patchValue('');
    this.Input_Form.controls.isRBAVerified.patchValue(false);

    // this.Input_Form.controls.buildingCost.patchValue('');
    // this.Input_Form.controls.projectPurpose.patchValue('');
    if(projectIdentificationNo!='' && appIdRightToBusinessAct!=''){
      this.appHttpRequestHandlerService.httpGet({ iPin: projectIdentificationNo, appId :  appIdRightToBusinessAct }, "BuildingPlanHUD", "getPrincipalApprovalUnderRBA").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericResponseTemplateModel<PrincipalApproval_RBA_DetailsViewModel>) => { 
        if(data.responseDataModel.success == true){
          this.rightToBussinessApprovalDetails = data.responseDataModel.data[0];
          this.Input_Form.patchValue({
            dateOfPrincipalApproval : data.responseDataModel.data[0].approvaldate,
            isRBAVerified: true
          });

          this.Input_Form.controls.projectIdentificationNo.disable({onlySelf:true, emitEvent: false}); 
          this.Input_Form.controls.appIdRightToBusinessAct.disable({onlySelf:true, emitEvent: false}); 
          // this.Input_Form.controls.buildingCost.markAsTouched();
          this.findPrincipalApprovalDate(data.responseDataModel.data[0].approvaldate);

          Swal.fire({
            icon: 'success',
            text: 'In-principal approval under right to business rules are verified successfully..!',
          })
        }
        else if(data.responseDataModel.success == false) {
          Swal.fire({
            icon: 'warning',
            text: 'Project Identification number (RBA) & Application ID-RBA is not verified. Please check and try again..!',
          })
        }
      });
    }
  }

  findPrincipalApprovalDate(dateOfPrincipalApproval){
    if(dateOfPrincipalApproval)
    var newDate = new Date(dateOfPrincipalApproval);
    var timeDiff = Math.abs(Date.now() - newDate.getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
    if(age >= 3){
      Swal.fire({
        icon: 'warning',
        text: 'The permission you have availed under the Right To Business Act for Principal Approval is expired, because its validity only for 3 years..!',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
        }).then((result) => {
          if (result.isConfirmed) {
            document.location.reload();

          }
      })
    }
  }

  resetRbaVerification(){
    this.Input_Form.controls.projectIdentificationNo.patchValue('');
    this.Input_Form.controls.appIdRightToBusinessAct.patchValue('');
    this.Input_Form.controls.dateOfPrincipalApproval.patchValue('');
    this.Input_Form.controls.isRBAVerified.patchValue(false);
    this.Input_Form.controls.projectIdentificationNo.disable({onlySelf:false, emitEvent: true}); 
          this.Input_Form.controls.appIdRightToBusinessAct.disable({onlySelf:false, emitEvent: true}); 
  }
  onPrincipalApprovalChange(isUnderRightToBusinessAct){
    
    this.resetFormProps(['isUnderRightToBusinessAct','buildingPlanHUDId','appRefId','projectSiteRefId','applicationPurposeType','iPin','principalApproval_RBA_Details', 'projectSiteVersion']);
    if(isUnderRightToBusinessAct == 0){
      this.Input_Form.controls.projectIdentificationNo.patchValue('NA');
      this.Input_Form.controls.appIdRightToBusinessAct.patchValue('NA');
      this.Input_Form.controls.dateOfPrincipalApproval.patchValue('NA');
      this.Input_Form.controls.isRBAVerified.patchValue(true);
    }
    else {
      this.Input_Form.controls.projectIdentificationNo.patchValue('220859603');
      this.Input_Form.controls.appIdRightToBusinessAct.patchValue('2208133015');
      this.Input_Form.controls.dateOfPrincipalApproval.patchValue('');
      this.Input_Form.controls.isRBAVerified.patchValue(false);
    }
  }

  resetFormProps(propsNotToBeReset){
    for (var control in this.Input_Form.controls) {
      if(!propsNotToBeReset.includes(control)){
        this.Input_Form.controls[control].patchValue('');
      }
    }
  }
}
