import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { GenericFormModel, TForm } from '../../generic-implementation/generic-form-builder.type';
import { Building_Plan_Hud_GeneralDetail, PrincipalApprovalData, PrincipalApproval_RBA_DetailsViewModel } from '../building-plan-hud-typed-models';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericResponseTemplateModel, GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonService } from 'src/app/common/common.service';
import { ProjectSite } from 'src/app/project-site/project-site-typed-module';
import { CommonOpsService } from '../../shared/common-ops-service';
import { DecimalPipe, formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-add-update-building-plan-hud-general-detail',
    templateUrl: './add-update-building-plan-hud-general-detail.component.html',
    styleUrls: ['./add-update-building-plan-hud-general-detail.component.css'],
    standalone: false
})
export class AddUpdateBuildingPlanHudGeneralDetailComponent implements OnInit {
  genericFormData: GenericFormModel<Building_Plan_Hud_GeneralDetail>;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();

  public applicationTypeEnum: any = [];
  public applicationPurposeTypeEnum: any = [];
  public buidingPlanHUDApprovalTypeEnum: any = [];
  public buildingTypeEnum: any = [];
  public inspectionTypeEnum: any = [];
  public projectTypeEnum : any = [];
  public appFormStepsList: any[];
  public industryTypeEnum: any = [];
  public projectSite: ProjectSite;
  public tehsilsList:any;
  public paramInfo:any;
  public parmamEncodedinfo:string;
  getInitialData: any;
  public acre : any;
  submitted:boolean=false;
  public principalApprovalDetails : PrincipalApprovalData;
  public currentDate : any;
  windowScrolled = false;
  public competentPersonList:any;
  public empaneledArchitectsList:any;
  public empaneledEngineersList:any;
  public buildingPlanApprovalAuthorityTypeEnum : any = [];
  selectedOption: string = '';

  defaultReturnPath: string = environment.thirdPartyIntegrationConfigs.investPunjab.defaultReturnPath;
  hasSubmitClicked: boolean = false;
  public projectSiteRefId : any;
  public appRefId : any;
  public projectSiteVersion : any;
  public isEditAllowed : boolean;
  districtRefId : any;
  
  constructor(private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService, 
    private cdr: ChangeDetectorRef,
    private router: Router,
    private common:CommonService,
    public commonOpsService: CommonOpsService,
    private modalService: NgbModal) { }

    Input_Form: TForm<Building_Plan_Hud_GeneralDetail> = this.fb.group({
    buildingPlanHUDId: [0, Validators.required],
    isUnderRightToBusinessAct: ['', Validators.required],
    hadbustNumber : [''],
    dateOfPrincipalApproval : ['', Validators.required],
    projectIdentificationNo: ['', [Validators.required, Validators.maxLength(100)]],
    appIdRightToBusinessAct: ['', [Validators.required, Validators.maxLength(100)]],
    buidingPlanHUDApprovalType: ['', Validators.required],
    buildingType: ['', Validators.required],
    isBuildingHeightMoreThen15Meter: ['', Validators.required],
    inspectionType: ['', Validators.required],
    plotAreaSqFt: ['', [Validators.required, Validators.min(1), Validators.max(999999999999)]],

    plotAreaAcres: ['', Validators.required],
    projectPurpose : ['', Validators.required],
    projectType: ['', Validators.required],
    buildingCost: ['', [Validators.required, Validators.min(1), Validators.max(9999999999)]],
    
    appRefId: [0, Validators.required],
    projectSiteRefId:[0, Validators.required],
    applicationPurposeType: [1, Validators.required],
    iPin : [0, Validators.required],
    investPunjab_AppId : [0, Validators.required],
    isGasOrFuelPipeLinePassWithin150Meter: ['', Validators.required],
    isHistoricalSiteIsLocatedWithin100Meter: ['', Validators.required],
    coveredAreaSqFt : ['', [Validators.required, Validators.min(1), Validators.max(999999999999)]],
    industryType: ['', Validators.required],
    
    ownerName : ['', Validators.required],
    ownerContactNo : ['', [Validators.required, Validators.maxLength(10)]],
    ownerEmail : ['', Validators.required],

    competentPersonUserRefId : [''],
    competentPersonName : ['', Validators.required],
    competentPersonContactNo : ['', [Validators.required, Validators.maxLength(10)]],
    competentPersonEmail : ['', Validators.required],

    architectUserRefId : [''],
    architectName : ['', Validators.required],
    architectContactNo : ['', [Validators.required, Validators.maxLength(10)]],
    architectEmail : ['', Validators.required],

    engineerUserRefId : [''],
    engineerName : ['', Validators.required],
    engineerContactNo : ['', [Validators.required, Validators.maxLength(10)]],
    engineerEmail : ['', Validators.required],

    buildingPlanApprovalAuthorityType : ['', Validators.required],

    principalApproval_RBA_Details : [null],
    projectSiteVersion:[0, Validators.required]
  }) as TForm<Building_Plan_Hud_GeneralDetail>;
  get formControls() { return this.Input_Form.controls; }

  ngOnInit(): void { 
    window.addEventListener('scroll', () => {
      this.windowScrolled = window.pageYOffset !== 0;
    });
  }
  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
  ngAfterViewInit() {
    this.route.queryParams
      .subscribe(params => {
        this.parmamEncodedinfo=params.info;
        this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info)=>{
        this.paramInfo = info;
          // this.Input_Form.controls.projectSiteRefId.patchValue(this.paramInfo?.projectSiteRefId);
          // this.Input_Form.controls.applicationPurposeType.patchValue(this.paramInfo?.applicationPurposeType);
          // this.Input_Form.controls.iPin.patchValue(this.paramInfo?.iPin);
          
          // this.appHttpRequestHandlerService.httpGet({ projectSiteId: this.paramInfo?.projectSiteRefId, appRefId : this.Input_Form.controls.appRefId.value, projectSiteVersion : this.paramInfo?.projectSiteVersion }, "ProjectSite", "getProjectsitesByProfileSiteId").pipe(takeUntil(this.ngUnsubscribe))
          //   .subscribe((data: GenericFormModel<ProjectSite>) => { 
          //     this.projectSite = data.formModel;
          //     this.appHttpRequestHandlerService.httpGet({ id: this.paramInfo?.appRefId }, "BuildingPlanHUD", "getgeneraldetail").pipe(takeUntil(this.ngUnsubscribe))
          //       .subscribe((data: GenericFormModel<Building_Plan_Hud_GeneralDetail>) => { this.initFormData(data)
          //         this.competentPersonList = data.formModel;
          //         this.empaneledArchitectsList = data.formModel;
          //         this.empaneledEngineersList = data.formModel;
          //         if(data.formModel.isUnderRightToBusinessAct == 0 && this.paramInfo.appActionType == 404){
          //           this.Input_Form.get('isUnderRightToBusinessAct').disable({onlySelf:true});
          //         }
          //       });
          //   });

        this.projectSiteRefId = this.paramInfo.projectSiteRefId;
        this.appRefId = this.paramInfo.appRefId;
        this.projectSiteVersion = this.paramInfo.projectSiteVersion;
        this.appHttpRequestHandlerService.httpGet({ id: this.paramInfo?.appRefId }, "BuildingPlanHUD", "getgeneraldetail").pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: GenericFormModel<Building_Plan_Hud_GeneralDetail>) => { this.initFormData(data)
            this.competentPersonList = data.formModel;
            this.empaneledArchitectsList = data.formModel;
            this.empaneledEngineersList = data.formModel;
            this.isEditAllowed = data.isEditAllowed;
            if(data.formModel.isUnderRightToBusinessAct == 0 && this.paramInfo.appActionType == 404){
              this.Input_Form.get('isUnderRightToBusinessAct').disable({onlySelf:true});
            }
        });
      });
    });
  }

  initFormData(genericFormData: GenericFormModel<Building_Plan_Hud_GeneralDetail>) {
    this.genericFormData = genericFormData;
    this.buidingPlanHUDApprovalTypeEnum = this.genericFormData.enumTemplateLists.filter(x => x.selectListTypeCode == 'BuidingPlanHUDApprovalTypeEnum')[0].selectListItems;
    this.industryTypeEnum = this.genericFormData.enumTemplateLists.filter(x => x.selectListTypeCode == 'IndustryColorCodeByPPCBTypeEnum')[0].selectListItems;
    this.buildingTypeEnum = this.genericFormData.enumTemplateLists.filter(x => x.selectListTypeCode == 'BuildingTypeEnum')[0].selectListItems;
    this.inspectionTypeEnum = this.genericFormData.enumTemplateLists.filter(x => x.selectListTypeCode == 'InspectionTypeEnum')[0].selectListItems;
    this.projectTypeEnum = this.genericFormData.enumTemplateLists.filter(x => x.selectListTypeCode == 'ProjectTypeEnum')[0].selectListItems;
    this.buildingPlanApprovalAuthorityTypeEnum = this.genericFormData.enumTemplateLists.filter(x => x.selectListTypeCode == 'BuildingPlanApprovalAuthorityTypeEnum')[0].selectListItems;
    this.appFormStepsList = this.genericFormData.appFormStepsList;

    // this.Input_Form.controls.projectSiteRefId.patchValue(this.paramInfo?.projectSiteRefId);
    // this.Input_Form.controls.applicationPurposeType.patchValue(this.paramInfo?.applicationPurposeType);
    // this.Input_Form.controls.iPin.patchValue(this.paramInfo?.iPin);
    // this.Input_Form.controls.investPunjab_AppId.patchValue(this.paramInfo?.investPunjab_AppId);

    if (genericFormData.formModel != null && genericFormData.formModel.buildingPlanHUDId != 0) {
      this.Input_Form.patchValue(genericFormData.formModel);
      this.tehsilsList= this.filterListTemplate('Comm_Tehsils');
    }

    if(genericFormData.formModel.appRefId>0){
      //console.log('abc',genericFormData.formModel.appRefId)
      if(genericFormData.formModel.isUnderRightToBusinessAct ==1){
        this.disableFormControls(true, 3);
      }
      else{
        this.disableFormControls(false,1);
      }
    }

    if(genericFormData.formModel.appRefId>0 && this.paramInfo?.appActionType==404){
      //console.log('xyz',genericFormData.formModel.appRefId, this.paramInfo?.appActionType)
      if(genericFormData.formModel.isUnderRightToBusinessAct ==1){
        this.disableFormControls(true, 4);
      }
      else{
        this.disableFormControls(true,5);
      }
    }
  }

  onSubmit(): void {
    this.Input_Form.controls.projectSiteRefId.patchValue(this.paramInfo?.projectSiteRefId);
    this.Input_Form.controls.applicationPurposeType.patchValue(this.paramInfo?.applicationPurposeType);
    this.Input_Form.controls.iPin.patchValue(this.paramInfo?.iPin);
    this.Input_Form.controls.investPunjab_AppId.patchValue(this.paramInfo?.investPunjab_AppId);
    this.Input_Form.controls.projectSiteVersion.patchValue(this.paramInfo?.projectSiteVersion);
    this.submitted=true;
    var inputForm = this.Input_Form.getRawValue();
    if(this.Input_Form.valid){
    this.hasSubmitClicked=true;
    this.appHttpRequestHandlerService.httpPost(inputForm, "pbsamadhannetcoreapi.Models.BuildingPlanHUD_GeneralDetail", "BuildingPlanHUD", "addupdate_generaldetails").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericServiceResultTemplate) => {
           this.router.navigate([this.appFormStepsList.find(x=>x.stepCode=='GD').uiNextPageComponentPath],{queryParams: { info: this.commonOpsService.encodeQueryParamsInBase64( 
            { identityKey: data.applicationInitiateResponse.entityKeyId, 
              appRefId: data.applicationInitiateResponse.appId, 
              applicationType: 5, 
              projectSiteRefId: this.paramInfo?.projectSiteRefId,
              projectSiteVersion: this.paramInfo?.projectSiteVersion,
            })}});
      });
    }
  }
  filterListTemplate(listTypeCode) {
    var itemsList = this.genericFormData?.listTemplateLists.filter(object => {
      return object['listTypeCode'] == listTypeCode;
      });
      if(itemsList!=undefined &&   itemsList.length>0){
        return itemsList[0].listItems;
      } 
    return null;
  }
  
  public getTehsilsByDistrictRefId(districtRefId, targetTehsilCtrlName){
    this.Input_Form.controls.comm_TehsilRefId.patchValue('');
    if(districtRefId!=''){
      this.appHttpRequestHandlerService.httpGet({ id: districtRefId }, "CommonApis", "gettehsilsbydistrictrefid").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data) => { 
        this.tehsilsList = data; 
      });
    }
  }
  
  updateNicCode(event){
    this.Input_Form.controls.nationalIndustrialClassificationCode.patchValue(JSON.stringify(event));
  }
  btnHomeClick(){
    document.location.href = this.defaultReturnPath;
 }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getSqFtInAcres(){
    this.acre = this.Input_Form.controls.plotAreaSqFt.value/43560; 
    this.Input_Form.controls.plotAreaAcres.patchValue(this.acre); 
    return this.Input_Form.controls.plotAreaAcres.value;
  }

  onPrincipalApprovalChange(isUnderRightToBusinessAct){
    
    this.resetFormProps(['isUnderRightToBusinessAct','buildingPlanHUDId','appRefId','projectSiteRefId','applicationPurposeType','iPin','principalApproval_RBA_Details','projectSiteVersion']);
    if(isUnderRightToBusinessAct == 0){
      this.Input_Form.controls.projectIdentificationNo.patchValue('NA');
      this.Input_Form.controls.appIdRightToBusinessAct.patchValue('NA');
      this.Input_Form.controls.dateOfPrincipalApproval.patchValue('NA');
      this.disableFormControls(false,1);
    }
    else {
      this.Input_Form.controls.projectIdentificationNo.patchValue('');
      this.Input_Form.controls.appIdRightToBusinessAct.patchValue('');
      this.Input_Form.controls.dateOfPrincipalApproval.patchValue('');
      this.disableFormControls(true,2);
    }
  }

  findPrincipalApprovalDetails(projectIdentificationNo, appIdRightToBusinessAct){
    this.Input_Form.controls.dateOfPrincipalApproval.patchValue('');
    this.Input_Form.controls.buildingCost.patchValue('');
    this.Input_Form.controls.projectPurpose.patchValue('');
    if(projectIdentificationNo!='' && appIdRightToBusinessAct!=''){
      //this.disableFormControls(true, 2);
      
      this.appHttpRequestHandlerService.httpGet({ iPin: projectIdentificationNo, appId :  appIdRightToBusinessAct }, "BuildingPlanHUD", "getPrincipalApprovalUnderRBA").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericResponseTemplateModel<PrincipalApproval_RBA_DetailsViewModel>) => { 
        this.Input_Form.controls.principalApproval_RBA_Details.patchValue(data.responseDataModel);
        // this.disableFormControls(true, 2);
        //console.log(data.responseDataModel)


        if(data.responseDataModel.success == true){
          this.Input_Form.patchValue({
            projectPurpose: data.responseDataModel.data[0].projectpurpose,
            buildingCost : data.responseDataModel.data[0].buildingcost * 100000,
            plotAreaAcres : data.responseDataModel.data[0].landarea,   
            dateOfPrincipalApproval : data.responseDataModel.data[0].approvaldate
          });
          this.Input_Form.controls.buildingCost.markAsTouched();
          this.disableFormControls(true, 3);

          this.findPrincipalApprovalDate(data.responseDataModel.data[0].approvaldate);

          Swal.fire({
            icon: 'success',
            text: 'In-principal approval under right to business rules are verified successfully..!',
          })

        }
        else if(data.responseDataModel.success == false) {
          // this.Input_Form.patchValue({
          //   projectPurpose:'',
          //   buildingCost : '',
          //   plotAreaAcres : '',   
          //   dateOfPrincipalApproval : '',
          // });
          // this.disableFormControls(true, 3);

          Swal.fire({
            icon: 'warning',
            //title: 'Error...',
            text: 'Project Identification No-RBA & Application ID-RBA is not verified. Please check and try again..!',
          })
        }
        
        // if(data.formModel.data[0] != null){
        //   this.principalApprovalDetails = data.formModel.data[0];
        //   console.log(this.principalApprovalDetails)
        //   this.Input_Form.controls.responseJson.patchValue(this.principalApprovalDetails);
        //   setTimeout(function () {
        //     Swal.close()
        //   }, 3000)
        // }else{
        //   setTimeout(function () {
        //     Swal.close();
        //     Swal.fire({  
        //       showClass: {
        //         popup: 'animate__animated animate__fadeInDown'
        //       },
        //       hideClass: {
        //         popup: 'animate__animated animate__fadeOutUp'
        //       }, 
        //       icon: 'error',  
        //       text: 'Error while fetching In-Principal Approvals details. Please try again later..! ', 
        //       showConfirmButton: false,  
        //       timer: 3000  
        //     });  
        //   }, 3000)}
      });
    }
  }

  disableFormControls(isDisable, disableType){
    for (var control in this.Input_Form.controls) {
      this.Input_Form.controls[control].enable();
    }
    if(disableType==1){
      var controlsToBeDisables=['hadbustNumber','dateOfPrincipalApproval','projectIdentificationNo','buidingPlanHUDApprovalType','buildingType','projectIdentificationNo',
      'appIdRightToBusinessAct','isBuildingHeightMoreThen15Meter','isGasOrFuelPipeLinePassWithin150Meter','isHistoricalSiteIsLocatedWithin100Meter','inspectionType','plotAreaSqFt','plotAreaAcres', 'projectPurpose','projectType', 'buildingCost','coveredAreaSqFt'];
    }

    else if(disableType==2){
      var controlsToBeDisables=['hadbustNumber','dateOfPrincipalApproval','buidingPlanHUDApprovalType','buildingType',
      'isBuildingHeightMoreThen15Meter','isGasOrFuelPipeLinePassWithin150Meter','isHistoricalSiteIsLocatedWithin100Meter','inspectionType','plotAreaSqFt','plotAreaAcres', 'projectPurpose','projectType', 'buildingCost','coveredAreaSqFt'];
    }

    else if(disableType==3){
      var controlsToBeDisables=['projectPurpose','buildingCost', 'dateOfPrincipalApproval'];
    }
    else if(disableType==4){
      var controlsToBeDisables=['isUnderRightToBusinessAct', 'projectPurpose','buildingCost', 'dateOfPrincipalApproval', 'projectIdentificationNo', 'appIdRightToBusinessAct'];
    }
    else if(disableType==5){
      var controlsToBeDisables=['isUnderRightToBusinessAct', 'dateOfPrincipalApproval', 'projectIdentificationNo', 'appIdRightToBusinessAct'];
    }
      for (var control in this.Input_Form.controls) {
        if(controlsToBeDisables.includes(control)){
          if(isDisable){
            this.Input_Form.controls[control].disable();
          }
          else{
            this.Input_Form.controls[control].enable();
          }
        }
      }
  }

  findPrincipalApprovalDate(dateOfPrincipalApproval){
    if(dateOfPrincipalApproval)
    var newDate = new Date(dateOfPrincipalApproval);
    var timeDiff = Math.abs(Date.now() - newDate.getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
    //console.log(age)
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

  resetFormProps(propsNotToBeReset){
    for (var control in this.Input_Form.controls) {
      if(!propsNotToBeReset.includes(control)){
        this.Input_Form.controls[control].patchValue('');
      }
    }
  }
  getCompetentPersonDetailsByName(competentPersonUserRefId){
    this.Input_Form.controls.competentPersonName.patchValue(this.competentPersonList?.competentPersonList.find(x=> x.id == competentPersonUserRefId.value).officerFullName);
    this.Input_Form.controls.competentPersonEmail.patchValue(this.competentPersonList?.competentPersonList.find(x=> x.id == competentPersonUserRefId.value).email);
    this.Input_Form.controls.competentPersonContactNo.patchValue(this.competentPersonList?.competentPersonList.find(x=> x.id == competentPersonUserRefId.value).contactNo);
  }
  getArchitectDetailsByName(architectUserRefId){
    this.Input_Form.controls.architectName.patchValue(this.empaneledArchitectsList?.empaneledArchitectsList.find(x=> x.id == architectUserRefId.value).officerFullName);
    this.Input_Form.controls.architectContactNo.patchValue(this.empaneledArchitectsList?.empaneledArchitectsList.find(x=> x.id == architectUserRefId.value).contactNo);
    this.Input_Form.controls.architectEmail.patchValue(this.empaneledArchitectsList?.empaneledArchitectsList.find(x=> x.id == architectUserRefId.value).email);
  }
  getEngineersDetailsByName(engineerUserRefId){
    this.Input_Form.controls.engineerName.patchValue(this.empaneledEngineersList?.empaneledEngineersList.find(x=> x.id == engineerUserRefId.value).officerFullName);
    this.Input_Form.controls.engineerContactNo.patchValue(this.empaneledEngineersList?.empaneledEngineersList.find(x=> x.id == engineerUserRefId.value).contactNo);
    this.Input_Form.controls.engineerEmail.patchValue(this.empaneledEngineersList?.empaneledEngineersList.find(x=> x.id == engineerUserRefId.value).email);
  }

  onBuildingPlanAuthorityTypeChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedOption = target.value;
  
    // Determine the values to be set
    const notAvailable = 'Not Available';
    const defaultValue = '';
    const defaultUserRefId = '7373F1CB-D53F-4E52-8D99-CE927DF9ACF2';
    const defaultContactNo = 9999999999;
  
    // Update the form controls based on the selected option
    if (this.selectedOption === '1') {
      // If 'Competent Person' is selected
      this.Input_Form.patchValue({
        architectUserRefId: defaultUserRefId,
        architectName: notAvailable,
        architectContactNo: defaultContactNo,
        architectEmail: notAvailable,
        engineerUserRefId: defaultUserRefId,
        engineerName: notAvailable,
        engineerContactNo: defaultContactNo,
        engineerEmail: notAvailable,
      });
    } else if (this.selectedOption === '2') {
      // If 'Architect' is selected
      this.Input_Form.patchValue({
        competentPersonUserRefId: defaultUserRefId,
        competentPersonName: notAvailable,
        competentPersonContactNo: defaultContactNo,
        competentPersonEmail: notAvailable,
        engineerUserRefId: defaultUserRefId,
        engineerName: notAvailable,
        engineerContactNo: defaultContactNo,
        engineerEmail: notAvailable,
      });
    } else if (this.selectedOption === '3') {
      // If 'Engineer' is selected
      this.Input_Form.patchValue({
        competentPersonUserRefId: defaultUserRefId,
        competentPersonName: notAvailable,
        competentPersonContactNo: defaultContactNo,
        competentPersonEmail: notAvailable,
        architectUserRefId: defaultUserRefId,
        architectName: notAvailable,
        architectContactNo: defaultContactNo,
        architectEmail: notAvailable,
      });
    }
  }
  
  onDistrictRefIdChanged(districtRefId: any): void {
    this.districtRefId = districtRefId;
  }
}
