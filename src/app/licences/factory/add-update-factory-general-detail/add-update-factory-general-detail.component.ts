import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { CommonService } from 'src/app/common/common.service';
import { GenericFormModel, GenericListModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { GenericResponseTemplateModel, GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { ProjectSite } from 'src/app/project-site/project-site-typed-module';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { environment } from 'src/environments/environment';
import { Licence_Factory_GeneralDetail } from '../../licences-typed-models';
import { PrincipalApprovalData, PrincipalApproval_RBA_DetailsViewModel } from 'src/app/building-plan-hud/building-plan-hud-typed-models';
import { IFactory_TemporaryLicenceDetailsViewModel, IOfficerDetailsByRoleNameViewModel } from '../../licences-typed-models';
import Swal from 'sweetalert2';
import { data } from 'jquery';
import { ICRUD_CreateUpdateOperationResponse } from 'src/app/typed-model/crud-typed-models';
@Component({
    selector: 'app-add-update-factory-general-detail',
    templateUrl: './add-update-factory-general-detail.component.html',
    styleUrls: ['./add-update-factory-general-detail.component.css'],
    standalone: false
})
export class AddUpdateFactoryGeneralDetailComponent implements OnInit {
  genericFormData: GenericFormModel<Licence_Factory_GeneralDetail>;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();

  public applicationTypeEnum: any = [];
  public applicationPurposeTypeEnum: any = [];
  public buildingTypeEnum: any = [];
  public inspectionTypeEnum: any = [];
  public projectTypeEnum: any = [];
  public appFormStepsList: any[];
  public industryTypeEnum: any = [];
  public projectSite: ProjectSite;
  public tehsilsList: any;
  public paramInfo: any;
  public parmamEncodedinfo: string;
  getInitialData: any;
  public acre: any;
  submitted: boolean = false;
  public currentDate: any;
  windowScrolled = false;
  canFormShown: boolean = false;
  public result: any;
  isReturnAndFundPaid: boolean = false;
  public competentPersonList: any;
  public empaneledEngineersList: any;
  public buildingPlanStabilityAuthorityTypeEnum: any = [];
  selectedOption: any;
  defaultReturnPath: string = environment.thirdPartyIntegrationConfigs.investPunjab.defaultReturnPath;
  hasSubmitClicked: boolean = false;
  public columnsAndAppPurposeType: any[] = [];
  public temporaryLicenceDetails: any;
  todayDate: Date = new Date();
  licenceNumber: any;

  public projectSiteRefId : any;
  public appRefId : any;
  public projectSiteVersion : any;
  public isEditAllowed : boolean;
  districtRefId : any;
  welfareFundYear : any;
  annualReturnYear : any;
  isFundPaid : any;
  isAnnualReturnFilled : any;
  annualReturnlicenceNumber : any;
  constructor(private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    public common: CommonService,
    public commonOpsService: CommonOpsService,
    private modalService: NgbModal) {
    // this.columnsAndAppPurposeType = [
    //     {
    //       colName: 'oldLicenceNo',
    //       appPurposeTypes:[2,3],
    //       defaultValue:"NA"
    //     },
    //     {
    //       colName: 'oldLicenceValidUpTo',
    //       appPurposeTypes:[2,3],
    //       defaultValue:"NA"
    //     },
    //     {
    //       colName: 'oldLicenceTotalEmployees',
    //       appPurposeTypes:[2,3],
    //       defaultValue: 0
    //     },
    //     {
    //       colName: 'oldLicenceFactoryKiloWatt',
    //       appPurposeTypes:[2,3],
    //       defaultValue: 0
    //     },
    //     {
    //       colName: 'registrationDate',
    //       appPurposeTypes:[1],
    //       defaultValue: "NA"
    //     },
    //     {
    //       colName: 'renewalFromDate',
    //       appPurposeTypes:[2],
    //       defaultValue: "NA"
    //     },
    //     {
    //       colName: 'workers_MaxLast12Month',
    //       appPurposeTypes:[2,3],
    //       defaultValue: 0
    //     },
    //     {
    //       colName: 'workers_OrdinarilyEmployed',
    //       appPurposeTypes:[2,3],
    //       defaultValue: 0
    //     },
    //     // {
    //     //   colName: 'competentPersonName',
    //     //   appPurposeTypes:[1],
    //     //   defaultValue: "NA"
    //     // },

    //     {
    //       colName: 'workers_OrdinarilyEmployed',
    //       appPurposeTypes:[2,3],
    //       defaultValue: 0
    //     },
    //   ]
  }

  Input_Form: TForm<Licence_Factory_GeneralDetail> = this.fb.group({
    factoryLicenceId: [0, Validators.required],
    oldLicenceNo: ['', Validators.required],
    oldLicenceValidUpTo: ['', Validators.required],
    oldLicenceTotalEmployees: ['', Validators.required],
    oldLicenceFactoryKiloWatt: ['', Validators.required],
    registrationDate: [''],
    renewalFromDate: [''],
    ammendmentDate: [''],
    ammendmentDate_Json: ['', Validators.required],
    noOfYears: ['', Validators.required],
    manufacturingProcess_Last12Months: ['', Validators.required],
    manufacturingProcess_Next12Months: ['', Validators.required],
    nationalIndustrialClassificationCode: ['', Validators.required],
    mfgProducts_Last12Month: ['', Validators.required],
    workers_MaxDuringYear: ['', Validators.required],
    workers_MaxLast12Month: ['', Validators.required],
    workers_OrdinarilyEmployed: ['', Validators.required],
    powerKW_Installed: ['', Validators.required],
    powerKW_MaxProposed: ['', Validators.required],

    // competentPersonUserRefId : [''],
    // competentPersonName : ['', Validators.required],
    // competentPersonEmail : ['', Validators.required],
    // competentPersonMobile : ['', [Validators.required, Validators.maxLength(10)]],

    isBuildingConstructedBefore29June2018: ['', Validators.required],
    haveYouMadeChangesInBuildingPlan: ['', Validators.required],


    isUnderRightToBusinessAct: ['', Validators.required],
    dateOfPrincipalApproval: ['', Validators.required],
    projectIdentificationNo: ['', [Validators.required, Validators.maxLength(100)]],
    appIdRightToBusinessAct: ['', [Validators.required, Validators.maxLength(100)]],
    isRBAVerified: [false, Validators.required],

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
    projectSiteRefId: [0, Validators.required],
    applicationPurposeType: ['', Validators.required],
    applicationType: [70, Validators.required],
    iPin: [0, Validators.required],
    investPunjab_AppId: [0, Validators.required],

    renewalFromDate_Json: ['', Validators.required],
    registrationDate_Json: ['', Validators.required],
    oldLicenceValidUpTo_Json: ['', Validators.required],

    competentPersonUserRefId: [''],
    competentPersonName: ['', Validators.required],
    competentPersonContactNo: ['', [Validators.required, Validators.maxLength(10)]],
    competentPersonEmail: ['', Validators.required],

    engineerUserRefId: [''],
    engineerName: ['', Validators.required],
    engineerContactNo: ['', [Validators.required, Validators.maxLength(10)]],
    engineerEmail: ['', Validators.required],

    buildingPlanApprovalDate: ['', Validators.required],
    buildingPlanStabilityApprovalDate: ['', Validators.required],

    factoryCircleRefId: ['', [Validators.required, Validators.min(1)]],
    projectSiteVersion:[0, Validators.required],

    toDoActivityModeType: [0, Validators.required],
    rootActivityRefId: ['', Validators.required],
    toDoActivityCategoryType: [0, Validators.required]
  }) as TForm<Licence_Factory_GeneralDetail>;
  get formControls() { return this.Input_Form.controls; }

  rightToBussinessApprovalDetails: PrincipalApprovalData;
  temporaryLicenceDetailsViewModel: IFactory_TemporaryLicenceDetailsViewModel;
  buildingPlanApprovalCertificateFile: string = '';
  buildingPlanStabilityApprovalCertificateFile: string = '';
  competenPersonList: IOfficerDetailsByRoleNameViewModel[];
  doesPrerequisitesFullfilled: boolean = false;
  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      this.windowScrolled = window.pageYOffset !== 0;
    });


    // Call API to check annual return & welfare fund submitted in case of Renewal

    // if(this.Input_Form.controls.applicationPurposeType.value == 2){
    //   this.appHttpRequestHandlerService.httpGet({ licenceNumber : this.Input_Form.controls.oldLicenceNo}, "FactoryLicence", "verifyWelfareFundAndReturn").pipe(takeUntil(this.ngUnsubscribe))
    //     .subscribe((data: GenericResponseTemplateModel<string>) => {
    //       this.result =  data.responseDataModel;
    //       if(this.result.value > 0){
    //         this.isReturnAndFundPaid =true;
    //       }
    //       else{
    //         this.isReturnAndFundPaid = false;
    //         error => {
    //           console.error('Welfare Fund/Annual Return is not valid till date:', error);
    //       }
    //       }
    //   });
    // }
    // else  { // For Fresh Cases & Amendment
    //   this.isReturnAndFundPaid =true;
    // }
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
  ngAfterViewInit() {
    this.columnsAndAppPurposeType = [
      {
        colName: 'oldLicenceNo',
        appPurposeTypes: [2, 3],
        defaultValue: "NA"
      },
      {
        colName: 'oldLicenceValidUpTo_Json',
        appPurposeTypes: [2, 3],
        defaultValue: { year: 1900, month: 1, date: 1 }
      },
      {
        colName: 'oldLicenceTotalEmployees',
        appPurposeTypes: [2, 3],
        defaultValue: 0
      },
      {
        colName: 'oldLicenceFactoryKiloWatt',
        appPurposeTypes: [2, 3],
        defaultValue: 0
      },
      {
        colName: 'registrationDate_Json',
        appPurposeTypes: [1],
        defaultValue: { year: 1900, month: 1, date: 1 }
      },
      {
        colName: 'renewalFromDate_Json',
        appPurposeTypes: [2],
        defaultValue: { year: 1900, month: 1, date: 1 }
      },
      {
        colName: 'ammendmentDate_Json',
        appPurposeTypes: [3],
        defaultValue: { year: 1900, month: 1, date: 1 }
      },
      {
        colName: 'workers_MaxLast12Month',
        appPurposeTypes: [2, 3],
        defaultValue: 0
      },
      {
        colName: 'workers_OrdinarilyEmployed',
        appPurposeTypes: [2, 3],
        defaultValue: 0
      },
      {
        colName: 'workers_OrdinarilyEmployed',
        appPurposeTypes: [2, 3],
        defaultValue: 0
      },

      {
        colName: 'isUnderRightToBusinessAct',
        appPurposeTypes: [1],
        defaultValue: 0
      },
      {
        colName: 'dateOfPrincipalApproval',
        appPurposeTypes: [1],
        defaultValue: "NA"
      },
      {
        colName: 'projectIdentificationNo',
        appPurposeTypes: [1],
        defaultValue: "NA"
      },
      {
        colName: 'appIdRightToBusinessAct',
        appPurposeTypes: [1],
        defaultValue: "NA"
      },
      {
        colName: 'isRBAVerified',
        appPurposeTypes: [1],
        defaultValue: true
      },
      {
        colName: 'isTempRegistered',
        appPurposeTypes: [1],
        defaultValue: 0
      },
      {
        colName: 'tempRegistrationNumber',
        appPurposeTypes: [1],
        defaultValue: "NA"
      },
      {
        colName: 'isTempRegistrationVerified',
        appPurposeTypes: [2],
        defaultValue: true
      },
      {
        colName: 'isBuildingPlanApproved',
        appPurposeTypes: [1],
        defaultValue: 0
      },
      {
        colName: 'buildingPlanDofNumber',
        appPurposeTypes: [1],
        defaultValue: "NA"
      },
      {
        colName: 'isBuildingPlanVerified',
        appPurposeTypes: [1],
        defaultValue: 0
      },
      {
        colName: 'isStabilityApproved',
        appPurposeTypes: [1],
        defaultValue: 0
      },
      {
        colName: 'stabilityPlanDofNumber',
        appPurposeTypes: [1],
        defaultValue: "NA"
      },
      {
        colName: 'isStabilityPlanVerified',
        appPurposeTypes: [1],
        defaultValue: true
      },
      {
        colName: 'competentPersonUserId',
        appPurposeTypes: [1],
        defaultValue: "NA"
      },
    ]
    this.route.queryParams
      .subscribe(params => {
        this.parmamEncodedinfo = params.info;
        this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info) => {
          this.paramInfo = info;
          this.Input_Form.controls.applicationPurposeType.patchValue(this.paramInfo?.applicationPurposeType);
          this.licenceNumber = this.paramInfo.licenceNo;
          this.projectSiteRefId = this.paramInfo.projectSiteRefId;
          this.appRefId = this.paramInfo.appRefId;
          this.projectSiteVersion = this.paramInfo.projectSiteVersion;

          if (this.Input_Form.controls.applicationPurposeType.value == 2) {
            this.verifyAnnualReturnAndWelfare().pipe(takeUntil(this.ngUnsubscribe)).subscribe((data: any) => {
              console.log(data.formModel,'data')
              if((data.formModel.isAnnualReturnSubmitted > 0) && (data.formModel.isWelfareFundSubmitted > 0)){
                this.isReturnAndFundPaid = true;
                this.getGeneralDetail();
              }
              else{
                this.isReturnAndFundPaid = false;
                this.welfareFundYear = data.formModel.welfareFundYear;
                this.annualReturnYear = data.formModel.annualReturnYear;
                this.isFundPaid = data.formModel.isWelfareFundSubmitted;
                this.isAnnualReturnFilled = data.formModel.isAnnualReturnSubmitted;
                this.annualReturnlicenceNumber = data.formModel.licenceNumber;
              }
            });
          }
          else { // For Fresh Cases & Amendment
            this.isReturnAndFundPaid = true;
            this.getGeneralDetail();
          }
        });
      });
  }

  getGeneralDetail() {
    // this.appHttpRequestHandlerService.httpGet({ projectSiteId: this.paramInfo?.projectSiteRefId, appRefId: this.Input_Form.controls.appRefId.value, projectSiteVersion: this.paramInfo?.projectSiteVersion }, "ProjectSite", "getProjectsitesByProfileSiteId").pipe(takeUntil(this.ngUnsubscribe))
    //   .subscribe((data: GenericFormModel<ProjectSite>) => {
    //     this.projectSite = data.formModel;
    //     this.appHttpRequestHandlerService.httpGet({ id: this.paramInfo?.appRefId }, "FactoryLicence", "getgeneraldetail").pipe(takeUntil(this.ngUnsubscribe))
    //       .subscribe((data: GenericFormModel<Licence_Factory_GeneralDetail>) => {
    //         console.log(data.formModel, 'sad')
    //         this.initFormData(data)
    //         this.competentPersonList = data.formModel;
    //         this.empaneledEngineersList = data.formModel;

    //         // Competent Person
    //         this.appHttpRequestHandlerService.httpGet({}, "FactoryLicence", "getCompetentPersonDetails").pipe(takeUntil(this.ngUnsubscribe))
    //           .subscribe((resp: GenericListModel<IOfficerDetailsByRoleNameViewModel>) => {
    //             this.competenPersonList = resp.listData;
    //           });
    //       });
    //   });
  
    this.appHttpRequestHandlerService.httpGet({ id: this.paramInfo?.appRefId }, "FactoryLicence", "getgeneraldetail").pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: GenericFormModel<Licence_Factory_GeneralDetail>) => {
      this.initFormData(data)
      this.competentPersonList = data.formModel;
      this.empaneledEngineersList = data.formModel;
      this.isEditAllowed = data.isEditAllowed;
      this.selectedOption = data.formModel.isStabilityApproved;
      if(data.formModel.competentPersonUserId != null)
      {
        this.formControls.competentPersonUserRefId.patchValue(data.formModel.competentPersonUserId) ;
        this.getCompetentPersonDetailsByName(data.formModel.competentPersonUserId)

      }
      // Competent Person
      this.appHttpRequestHandlerService.httpGet({}, "FactoryLicence", "getCompetentPersonDetails").pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((resp: GenericListModel<IOfficerDetailsByRoleNameViewModel>) => {
          this.competenPersonList = resp.listData;

          
        });
        console.log(this.selectedOption,'option')

        if (data.formModel.isTempRegistrationVerified == true && data.formModel.tempRegistrationNumber != '' && data.formModel.tempRegistrationNumber != undefined)
        {
          this.findTempRegistrationDetails(data.formModel.tempRegistrationNumber);
        }
    });
  }

  initFormData(genericFormData: GenericFormModel<Licence_Factory_GeneralDetail>) {
    this.genericFormData = genericFormData;
    this.appFormStepsList = this.genericFormData.appFormStepsList;
    if (genericFormData.formModel != null && genericFormData.formModel.factoryLicenceId != 0) {
      this.Input_Form.patchValue(genericFormData.formModel);
    }

    if( this.paramInfo?.applicationPurposeType ==1 &&genericFormData.formModel?.isTempRegistrationVerified == true && genericFormData.formModel?.tempRegistrationNumber != '' && genericFormData.formModel?.tempRegistrationNumber != undefined)
    {
      this.Input_Form.controls.noOfYears.disable({ onlySelf: true, emitEvent: false });
            this.Input_Form.controls.registrationDate_Json.disable({ onlySelf: true, emitEvent: false });
            this.Input_Form.controls.oldLicenceValidUpTo_Json.disable({ onlySelf: true, emitEvent: false });
            this.Input_Form.controls.renewalFromDate_Json.disable({ onlySelf: true, emitEvent: false });
            this.Input_Form.controls.ammendmentDate_Json.disable({ onlySelf: true, emitEvent: false });
            this.Input_Form.controls.workers_MaxDuringYear.disable({ onlySelf: true, emitEvent: false });
            this.Input_Form.controls.workers_MaxLast12Month.disable({ onlySelf: true, emitEvent: false });
            this.Input_Form.controls.workers_OrdinarilyEmployed.disable({ onlySelf: true, emitEvent: false });
            this.Input_Form.controls.powerKW_Installed.disable({ onlySelf: true, emitEvent: false });
            this.Input_Form.controls.powerKW_MaxProposed.disable({ onlySelf: true, emitEvent: false });
            this.Input_Form.controls.manufacturingProcess_Last12Months.disable({ onlySelf: true, emitEvent: false });
            this.Input_Form.controls.manufacturingProcess_Next12Months.disable({ onlySelf: true, emitEvent: false });
            this.Input_Form.controls.mfgProducts_Last12Month.disable({ onlySelf: true, emitEvent: false });
    }
    this.Input_Form.controls.projectSiteRefId.patchValue(this.paramInfo?.projectSiteRefId);
    this.Input_Form.controls.applicationPurposeType.patchValue(this.paramInfo?.applicationPurposeType);
    this.Input_Form.controls.applicationType.patchValue(this.paramInfo.applicationType);
    this.Input_Form.controls.iPin.patchValue(this.paramInfo?.iPin);
    this.Input_Form.controls.investPunjab_AppId.patchValue(this.paramInfo?.investPunjab_AppId);

    this.Input_Form.controls.appRefId.patchValue(this.paramInfo?.isEntityKeysToKeepSame ? this.paramInfo?.appRefId : 0);
    this.Input_Form.controls.factoryLicenceId.patchValue(this.paramInfo?.isEntityKeysToKeepSame ? this.Input_Form.controls.factoryLicenceId.value : 0);

    this.Input_Form.controls.factoryCircleRefId.patchValue(genericFormData.formModel.factoryCircleRefId);
    this.Input_Form.controls.projectSiteVersion.patchValue(this.paramInfo?.projectSiteVersion);

    this.Input_Form.controls.toDoActivityModeType.patchValue(this.paramInfo?.toDoActivityModeType);
    this.Input_Form.controls.rootActivityRefId.patchValue(this.paramInfo?.rootActivityRefId);
    this.Input_Form.controls.toDoActivityCategoryType.patchValue(this.paramInfo?.toDoActivityCategoryType);

    var ammendmentDate = new Date(this.Input_Form.controls.ammendmentDate.value)
    if(ammendmentDate){
      this.Input_Form.controls.ammendmentDate_Json.patchValue({
        "year": ammendmentDate.getFullYear(),
        "month": ammendmentDate.getMonth()+ 1,
        "day": ammendmentDate.getDate()
      });
    }
    if (this.paramInfo?.applicationPurposeType == 1) {
      this.buildingPlanStabilityAuthorityTypeEnum = this.genericFormData.enumTemplateLists.filter(x => x.selectListTypeCode == 'BuildingPlanStabilityAuthorityTypeEnum')[0].selectListItems;
    }
    if (this.paramInfo.appActionType == 404 || this.paramInfo.appActionType == 402 || this.paramInfo.appActionType == 407) { //Disbale No of years in objection cases
      this.Input_Form.controls.noOfYears.disable({ onlySelf: true, emitEvent: false });
      this.Input_Form.controls.workers_MaxDuringYear.disable({ onlySelf: true, emitEvent: false });
      this.Input_Form.controls.workers_MaxLast12Month.disable({ onlySelf: true, emitEvent: false });
      this.Input_Form.controls.workers_OrdinarilyEmployed.disable({ onlySelf: true, emitEvent: false });
      this.Input_Form.controls.powerKW_Installed.disable({ onlySelf: true, emitEvent: false });
      this.Input_Form.controls.powerKW_MaxProposed.disable({ onlySelf: true, emitEvent: false });
      this.Input_Form.controls.registrationDate_Json.disable({ onlySelf: true, emitEvent: false });
    }

    if (this.paramInfo?.applicationPurposeType != 1) {
      this.doesPrerequisitesFullfilled = true;
      if (genericFormData.formModel.appRefId > 0) {
        this.Input_Form.controls.oldLicenceNo.patchValue(genericFormData.formModel.oldLicenceNo);
      }
      else {
        this.Input_Form.controls.oldLicenceNo.patchValue(this.paramInfo?.licenceNo);
      }
      this.Input_Form.controls.oldLicenceNo.disable({ emitEvent: false, onlySelf: true });
      //this.Input_Form.controls.oldLicenceValidUpTo.disable({emitEvent: false, onlySelf: true});
      this.Input_Form.controls.oldLicenceValidUpTo_Json.disable({ onlySelf: true, emitEvent: false });
      this.Input_Form.controls.renewalFromDate_Json.disable({ onlySelf: true, emitEvent: false });
      if(this.paramInfo?.applicationPurposeType == 3){
        this.Input_Form.controls.noOfYears.disable({ onlySelf: true, emitEvent: false });
      }
    }
    
    else {
      this.determinePrerequisitesFullfilled();
    }
  }

  determinePrerequisitesFullfilled() {
    if (
      (this.Input_Form.controls.isUnderRightToBusinessAct.value == 1 && !this.Input_Form.controls.isRBAVerified.value) ||
      (this.Input_Form.controls.isTempRegistered.value == 1 && !this.Input_Form.controls.isTempRegistrationVerified.value) ||
      (this.Input_Form.controls.isBuildingPlanApproved.value == 1 && !this.Input_Form.controls.isBuildingPlanVerified.value) ||
      (this.Input_Form.controls.isStabilityApproved.value.toString() == '') ||
      // (this.Input_Form.controls.isStabilityApproved.value == 1 && (this.Input_Form.controls.competentPersonUserRefId.value=='' || this.Input_Form.controls.competentPersonContactNo.value==''  || this.Input_Form.controls.competentPersonEmail.value=='' )) ||
      // (this.Input_Form.controls.isStabilityApproved.value == 2 && (this.Input_Form.controls.stabilityPlanDofNumber.value=='' || this.Input_Form.controls.buildingPlanStabilityApprovalDate.value=='' )) ||
      // (this.Input_Form.controls.isStabilityApproved.value == 3 && (this.Input_Form.controls.engineerName.value=='' || this.Input_Form.controls.engineerContactNo.value== 0  || this.Input_Form.controls.engineerEmail.value=='' )) ||
      (this.Input_Form.controls.isStabilityApproved.value == 4 && !this.Input_Form.controls.isStabilityPlanVerified.value)
      // (this.Input_Form.controls.isStabilityApproved.value == 5 && (this.Input_Form.controls.stabilityPlanDofNumber.value=='' || this.Input_Form.controls.buildingPlanStabilityApprovalDate.value=='' ))


    ) {
      this.doesPrerequisitesFullfilled = false;
    }
    else {
      this.doesPrerequisitesFullfilled = true;
    }
  }

  onSubmit(): void {
    this.Input_Form.controls.projectSiteRefId.patchValue(this.paramInfo?.projectSiteRefId);
    this.Input_Form.controls.applicationPurposeType.patchValue(this.paramInfo?.applicationPurposeType);
    this.Input_Form.controls.applicationType.patchValue(this.paramInfo.applicationType);
    this.Input_Form.controls.iPin.patchValue(this.paramInfo?.iPin);
    this.Input_Form.controls.investPunjab_AppId.patchValue(this.paramInfo?.investPunjab_AppId);
    this.Input_Form.controls.factoryLicenceId.patchValue(this.paramInfo?.isEntityKeysToKeepSame ? this.Input_Form.controls.factoryLicenceId.value : 0);
    this.Input_Form.controls.projectSiteVersion.patchValue(this.paramInfo?.projectSiteVersion);

    this.Input_Form.controls.toDoActivityModeType.patchValue(this.paramInfo?.toDoActivityModeType);
    this.Input_Form.controls.rootActivityRefId.patchValue(this.paramInfo?.rootActivityRefId);
    this.Input_Form.controls.toDoActivityCategoryType.patchValue(this.paramInfo?.toDoActivityCategoryType);

    this.columnsToBeShownHide('isUnderRightToBusinessAct', this.Input_Form.controls.applicationPurposeType.value);
    this.columnsToBeShownHide('dateOfPrincipalApproval', this.Input_Form.controls.applicationPurposeType.value);
    this.columnsToBeShownHide('projectIdentificationNo', this.Input_Form.controls.applicationPurposeType.value);
    this.columnsToBeShownHide('appIdRightToBusinessAct', this.Input_Form.controls.applicationPurposeType.value);
    this.columnsToBeShownHide('isRBAVerified', this.Input_Form.controls.applicationPurposeType.value);
    this.columnsToBeShownHide('isTempRegistered', this.Input_Form.controls.applicationPurposeType.value);
    this.columnsToBeShownHide('tempRegistrationNumber', this.Input_Form.controls.applicationPurposeType.value);
    this.columnsToBeShownHide('isTempRegistrationVerified', this.Input_Form.controls.applicationPurposeType.value);
    this.columnsToBeShownHide('isBuildingPlanApproved', this.Input_Form.controls.applicationPurposeType.value);
    this.columnsToBeShownHide('buildingPlanDofNumber', this.Input_Form.controls.applicationPurposeType.value);
    this.columnsToBeShownHide('isBuildingPlanVerified', this.Input_Form.controls.applicationPurposeType.value);
    this.columnsToBeShownHide('isStabilityApproved', this.Input_Form.controls.applicationPurposeType.value);
    this.columnsToBeShownHide('stabilityPlanDofNumber', this.Input_Form.controls.applicationPurposeType.value);
    this.columnsToBeShownHide('isStabilityPlanVerified', this.Input_Form.controls.applicationPurposeType.value);
    this.columnsToBeShownHide('competentPersonUserId', this.Input_Form.controls.applicationPurposeType.value);

    this.submitted = true;
    if (this.Input_Form.controls.applicationPurposeType.value == 1) {

      this.Input_Form.controls.renewalFromDate.patchValue(new Date());
      this.Input_Form.controls.renewalFromDate_Json.patchValue(this.Input_Form.controls.registrationDate_Json.value);
      this.Input_Form.controls.competentPersonUserId.patchValue(this.Input_Form.controls.competentPersonUserRefId.value);

      this.Input_Form.controls.oldLicenceValidUpTo.patchValue(new Date());
      this.Input_Form.controls.oldLicenceValidUpTo_Json.patchValue(this.Input_Form.controls.registrationDate_Json.value);

      this.Input_Form.controls.ammendmentDate.patchValue(new Date());
      this.Input_Form.controls.ammendmentDate_Json.patchValue(this.Input_Form.controls.registrationDate_Json.value);

      //this.Input_Form.controls.registrationDate.patchValue(new Date());
      if (this.Input_Form.controls.factoryLicenceId.value == undefined || this.Input_Form.controls.factoryLicenceId.value == null || this.Input_Form.controls.factoryLicenceId.value < 1 || this.Input_Form.controls.factoryLicenceId.value.toString() == '') {
        this.Input_Form.controls.factoryLicenceId.patchValue(0);
      }

      if(this.Input_Form.controls.isStabilityApproved.value != 1)
      {
        this.Input_Form.patchValue({
          competentPersonUserRefId: '7373F1CB-D53F-4E52-8D99-CE927DF9ACF2',
          competentPersonName: 'Not Available',
          competentPersonContactNo: 9999999999,
          competentPersonEmail: 'Not Available',
          competentPersonUserId: '7373F1CB-D53F-4E52-8D99-CE927DF9ACF2'
        })
      }

    }
    else if (this.Input_Form.controls.applicationPurposeType.value == 2) {
      this.Input_Form.controls.registrationDate.patchValue(new Date());
      this.Input_Form.controls.registrationDate_Json.patchValue(this.Input_Form.controls.renewalFromDate_Json.value);

      this.Input_Form.controls.ammendmentDate.patchValue(new Date());
      this.Input_Form.controls.ammendmentDate_Json.patchValue(this.Input_Form.controls.renewalFromDate_Json.value);
      this.Input_Form.patchValue({
        competentPersonUserRefId: '7373F1CB-D53F-4E52-8D99-CE927DF9ACF2',
        competentPersonName: 'Not Available',
        competentPersonContactNo: 9999999999,
        competentPersonEmail: 'Not Available',
        engineerName: 'Not Available',
        engineerContactNo: 9999999999,
        engineerEmail: 'Not Available',
        buildingPlanApprovalDate: '1999-01-01',
        buildingPlanStabilityApprovalDate: '1999-01-01',
        competentPersonUserId: '7373F1CB-D53F-4E52-8D99-CE927DF9ACF2'
      })
    }
    else {
      //this.Input_Form.controls.registrationDate.patchValue(new Date());
      this.Input_Form.controls.registrationDate_Json.patchValue(this.Input_Form.controls.oldLicenceValidUpTo_Json.value);
      //this.Input_Form.controls.renewalFromDate.patchValue(new Date());
      this.Input_Form.controls.renewalFromDate_Json.patchValue(this.Input_Form.controls.oldLicenceValidUpTo_Json.value);

      this.Input_Form.controls.ammendmentDate.patchValue(new Date(
        this.Input_Form.controls.ammendmentDate_Json.value.year, 
        this.Input_Form.controls.ammendmentDate_Json.value.month-1, 
        this.Input_Form.controls.ammendmentDate_Json.value.day+1));

      this.Input_Form.patchValue({
        competentPersonUserRefId: '7373F1CB-D53F-4E52-8D99-CE927DF9ACF2',
        competentPersonName: 'Not Available',
        competentPersonContactNo: 9999999999,
        competentPersonEmail: 'Not Available',
        engineerName: 'Not Available',
        engineerContactNo: 9999999999,
        engineerEmail: 'Not Available',
        buildingPlanApprovalDate: '1999-01-01',
        buildingPlanStabilityApprovalDate: '1999-01-01',
        competentPersonUserId: '7373F1CB-D53F-4E52-8D99-CE927DF9ACF2'
      })
    }
    var inputForm = this.Input_Form.getRawValue();
    if (this.Input_Form.valid && !this.validateNicCode()) {
      this.hasSubmitClicked = true;
      this.appHttpRequestHandlerService.httpPost(inputForm, "pbsamadhannetcoreapi.Models.Licence_Factory_GeneralDetail", "Crud", "CreateUpdate").pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data: ICRUD_CreateUpdateOperationResponse) => {
          this.router.navigate([this.appFormStepsList.find(x => x.stepCode == 'GD').uiNextPageComponentPath], {
            queryParams: {
              info: this.commonOpsService.encodeQueryParamsInBase64({
                identityKey: data.entityKeyId,
                appRefId: data.appId,
                applicationType: 70,
                projectSiteRefId: this.paramInfo?.projectSiteRefId,
                applicationPurposeType: this.paramInfo?.applicationPurposeType,
                investPunjab_AppId: this.paramInfo?.investPunjab_AppId,
                iPin: this.paramInfo?.iPin,
                projectSiteVersion: this.paramInfo?.projectSiteVersion,
              }
              )
            }
          });
        });
    }
  }

  filterListTemplate(listTypeCode) {
    var itemsList = this.genericFormData?.listTemplateLists.filter(object => {
      return object['listTypeCode'] == listTypeCode;
    });
    if (itemsList != undefined && itemsList.length > 0) {
      return itemsList[0].listItems;
    }
    return null;
  }
  updateNicCode(event) {
    this.Input_Form.controls.nationalIndustrialClassificationCode.patchValue(JSON.stringify(event));
  }
  btnHomeClick() {
    document.location.href = this.defaultReturnPath;
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  // getCompetentPersonDetailsByName(competentPersonUserRefId){
  //   this.Input_Form.controls.competentPersonName.patchValue(this.competentPersonList?.competentPersonList.find(x=> x.id == competentPersonUserRefId.value).officerFullName);
  //   this.Input_Form.controls.competentPersonEmail.patchValue(this.competentPersonList?.competentPersonList.find(x=> x.id == competentPersonUserRefId.value).email);
  //   this.Input_Form.controls.competentPersonMobile.patchValue(this.competentPersonList?.competentPersonList.find(x=> x.id == competentPersonUserRefId.value).contactNo);
  // }
  columnsToBeShownHide(colName: string, appPurposeType: number) {
    var colInfo = this.columnsAndAppPurposeType?.filter(x => x.colName == colName)[0];
    if (colInfo?.appPurposeTypes?.findIndex(x => x == appPurposeType) >= 0) {
      return 'block';
    }
    else {
      this.Input_Form.controls[colName].patchValue(colInfo?.defaultValue);
      return 'none';
    }
  }

  findPrincipalApprovalDetails(projectIdentificationNo, appIdRightToBusinessAct) {
    this.Input_Form.controls.dateOfPrincipalApproval.patchValue('');
    this.Input_Form.controls.isRBAVerified.patchValue(false);
    if (projectIdentificationNo != '' && appIdRightToBusinessAct != '') {
      this.appHttpRequestHandlerService.httpGet({ iPin: projectIdentificationNo, appId: appIdRightToBusinessAct }, "BuildingPlanHUD", "getPrincipalApprovalUnderRBA").pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data: GenericResponseTemplateModel<PrincipalApproval_RBA_DetailsViewModel>) => {
          this.determinePrerequisitesFullfilled();
          if (data.responseDataModel.success == true) {
            this.rightToBussinessApprovalDetails = data.responseDataModel.data[0];
            this.Input_Form.patchValue({
              dateOfPrincipalApproval: data.responseDataModel.data[0].approvaldate,
              isRBAVerified: true
            });

            this.Input_Form.controls.projectIdentificationNo.disable({ onlySelf: true, emitEvent: false });
            this.Input_Form.controls.appIdRightToBusinessAct.disable({ onlySelf: true, emitEvent: false });
            this.findPrincipalApprovalDate(data.responseDataModel.data[0].approvaldate);

            Swal.fire({
              icon: 'success',
              text: 'In-principal approval under right to business rules are verified successfully..!',
            })
          }
          else if (data.responseDataModel.success == false) {
            Swal.fire({
              icon: 'warning',
              text: 'Project Identification number (RBA) & Application ID-RBA is not verified. Please check and try again..!',
            })
          }
        });
    }
  }

  findPrincipalApprovalDate(dateOfPrincipalApproval) {
    if (dateOfPrincipalApproval)
      var newDate = new Date(dateOfPrincipalApproval);
    var timeDiff = Math.abs(Date.now() - newDate.getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
    if (age >= 3) {
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
    this.determinePrerequisitesFullfilled();
  }

  resetRbaVerification() {
    this.Input_Form.controls.projectIdentificationNo.patchValue('');
    this.Input_Form.controls.appIdRightToBusinessAct.patchValue('');
    this.Input_Form.controls.dateOfPrincipalApproval.patchValue('');
    this.Input_Form.controls.isRBAVerified.patchValue(false);
    this.Input_Form.controls.projectIdentificationNo.disable({ onlySelf: false, emitEvent: true });
    this.Input_Form.controls.appIdRightToBusinessAct.disable({ onlySelf: false, emitEvent: true });
    this.determinePrerequisitesFullfilled();
  }

  onPrincipalApprovalChange(isUnderRightToBusinessAct) {

    this.resetFormProps(['isUnderRightToBusinessAct', 'buildingPlanHUDId', 'appRefId', 'projectSiteRefId', 'applicationPurposeType', 'iPin', 'principalApproval_RBA_Details', 'projectSiteVersion']);
    if (isUnderRightToBusinessAct == 0) {
      this.Input_Form.controls.projectIdentificationNo.patchValue('NA');
      this.Input_Form.controls.appIdRightToBusinessAct.patchValue('NA');
      this.Input_Form.controls.dateOfPrincipalApproval.patchValue('NA');
      this.Input_Form.controls.isRBAVerified.patchValue(true);
    }
    else {
      this.Input_Form.controls.projectIdentificationNo.patchValue('');
      this.Input_Form.controls.appIdRightToBusinessAct.patchValue('');
      this.Input_Form.controls.dateOfPrincipalApproval.patchValue('');
      this.Input_Form.controls.isRBAVerified.patchValue(false);
    }
    this.determinePrerequisitesFullfilled();
  }
  resetFormProps(propsNotToBeReset) {
    for (var control in this.Input_Form.controls) {
      if (!propsNotToBeReset.includes(control)) {
        this.Input_Form.controls[control].patchValue('');
      }
    }
  }

  findTempRegistrationDetails(tempRegistrationNumber) {
    if (tempRegistrationNumber != '' && tempRegistrationNumber != undefined) {
      this.appHttpRequestHandlerService.httpGet({ tempRegistrationNumber: tempRegistrationNumber }, "FactoryLicence", "getFactoryTemporaryLicenseDetails").pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data: GenericResponseTemplateModel<IFactory_TemporaryLicenceDetailsViewModel>) => {
          this.temporaryLicenceDetailsViewModel = data.responseDataModel;
          console.log(data.responseDataModel,'jshn')
          if (data.responseDataModel != null) {
            console.log(data.responseDataModel,'daaaaa')
            this.Input_Form.controls.isTempRegistrationVerified.patchValue(true);
            this.temporaryLicenceDetails = data.responseDataModel;
            var registrationDate = new Date(this.temporaryLicenceDetailsViewModel.registrationDate);

            this.Input_Form.patchValue({
              //registrationDate_Json: new Date(this.temporaryLicenceDetailsViewModel.registrationDate),
              registrationDate_Json: {
                "year": registrationDate.getFullYear(),
                "month": registrationDate.getMonth() + 1,
                "day": registrationDate.getDate()
              },
              oldLicenceValidUpTo_Json: {
                "year": registrationDate.getFullYear(),
                "month": registrationDate.getMonth() + 1,
                "day": registrationDate.getDate()
              },
              noOfYears: this.temporaryLicenceDetailsViewModel.licenceForNoOfYear,
              workers_MaxDuringYear: this.temporaryLicenceDetailsViewModel.maximumNumberEmployeeInYear,
              workers_MaxLast12Month: this.temporaryLicenceDetailsViewModel.maximumNumberEmployeeLastYear,
              workers_OrdinarilyEmployed: this.temporaryLicenceDetailsViewModel.ordinarilyEmployed,
              powerKW_Installed: this.temporaryLicenceDetailsViewModel.installedPower,
              powerKW_MaxProposed: this.temporaryLicenceDetailsViewModel.maximumPowerUsed,
              manufacturingProcess_Last12Months: this.temporaryLicenceDetailsViewModel.manufacturingProcesses,
              manufacturingProcess_Next12Months: this.temporaryLicenceDetailsViewModel.manufacturingProcesses,
              mfgProducts_Last12Month: this.temporaryLicenceDetailsViewModel.manufacturingProcesses,
              factoryLicenceId: 0
            });

            var nicCode = [];
            nicCode.push(this.temporaryLicenceDetailsViewModel.nicCode)
            this.updateNicCode(nicCode);

            //Temp Licence is verified, Then disabled all the controls of form
            this.Input_Form.controls.noOfYears.disable({ onlySelf: true, emitEvent: false });
            this.Input_Form.controls.registrationDate_Json.disable({ onlySelf: true, emitEvent: false });
            this.Input_Form.controls.oldLicenceValidUpTo_Json.disable({ onlySelf: true, emitEvent: false });
            this.Input_Form.controls.renewalFromDate_Json.disable({ onlySelf: true, emitEvent: false });
            this.Input_Form.controls.ammendmentDate_Json.disable({ onlySelf: true, emitEvent: false });
            this.Input_Form.controls.workers_MaxDuringYear.disable({ onlySelf: true, emitEvent: false });
            this.Input_Form.controls.workers_MaxLast12Month.disable({ onlySelf: true, emitEvent: false });
            this.Input_Form.controls.workers_OrdinarilyEmployed.disable({ onlySelf: true, emitEvent: false });
            this.Input_Form.controls.powerKW_Installed.disable({ onlySelf: true, emitEvent: false });
            this.Input_Form.controls.powerKW_MaxProposed.disable({ onlySelf: true, emitEvent: false });
            this.Input_Form.controls.manufacturingProcess_Last12Months.disable({ onlySelf: true, emitEvent: false });
            this.Input_Form.controls.manufacturingProcess_Next12Months.disable({ onlySelf: true, emitEvent: false });
            this.Input_Form.controls.mfgProducts_Last12Month.disable({ onlySelf: true, emitEvent: false });
          }


          else {
            this.temporaryLicenceDetailsViewModel = null;
            this.Input_Form.controls.isTempRegistrationVerified.patchValue(false);
            Swal.fire({
              icon: 'warning',
              text: 'Temporary registration number is not verified. Please check and try again..!',
            })
          }
          this.determinePrerequisitesFullfilled();
        });
    }
  }

  findDOFNoDetails(buildingPlanDofNumber) {
    if (buildingPlanDofNumber != '' && buildingPlanDofNumber != undefined) {
      this.appHttpRequestHandlerService.httpGet({ dofNumber: buildingPlanDofNumber }, "FactoryLicence", "getBuidingPlanDetails").pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data: GenericResponseTemplateModel<string>) => {
          this.buildingPlanApprovalCertificateFile = data.responseDataModel;
          if (data.responseDataModel != null) {
            if (!this.buildingPlanApprovalCertificateFile.includes('.pdf', 0)) {
              this.buildingPlanApprovalCertificateFile = this.buildingPlanApprovalCertificateFile.concat('.pdf');
            }
            this.Input_Form.controls.buildingPlanDofNumber.disable({ onlySelf: true, emitEvent: false });
            this.Input_Form.controls.isBuildingPlanVerified.patchValue(true);
          }
          else {
            this.buildingPlanApprovalCertificateFile = '';
            this.Input_Form.controls.isBuildingPlanVerified.patchValue(false);
            Swal.fire({
              icon: 'warning',
              text: 'Building plan approval detail is not verified. Please check and try again..!',
            })
          }
          this.determinePrerequisitesFullfilled();
        });
    }
  }

  findStabilityDOFNoDetails(stabilityPlanDofNumber) {
    if (stabilityPlanDofNumber != '' && stabilityPlanDofNumber != undefined) {
      this.appHttpRequestHandlerService.httpGet({ dofNumber: stabilityPlanDofNumber }, "FactoryLicence", "getBuidingPlanDetails").pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data: GenericResponseTemplateModel<string>) => {
          this.buildingPlanStabilityApprovalCertificateFile = data.responseDataModel;
          if (data.responseDataModel != null) {
            if (!this.buildingPlanStabilityApprovalCertificateFile.includes('.pdf', 0)) {
              this.buildingPlanStabilityApprovalCertificateFile = this.buildingPlanStabilityApprovalCertificateFile.concat('.pdf');
            }
            this.Input_Form.controls.stabilityPlanDofNumber.disable({ onlySelf: true, emitEvent: false });
            this.Input_Form.controls.isStabilityPlanVerified.patchValue(true);
          }
          else {
            this.buildingPlanStabilityApprovalCertificateFile = '';
            this.Input_Form.controls.isStabilityPlanVerified.patchValue(false);
            Swal.fire({
              icon: 'warning',
              text: 'Building plan stability approval detail is not verified. Please check and try again..!',
            })
          }
          this.determinePrerequisitesFullfilled();
        });
    }
  }
  tempRegChange() {
    this.Input_Form.controls.isTempRegistrationVerified.patchValue(false);
    if (this.Input_Form.controls.isTempRegistered.value == 1) {
      this.Input_Form.controls.tempRegistrationNumber.patchValue('');
    }
    else {
      this.Input_Form.controls.tempRegistrationNumber.patchValue('NA');
      this.Input_Form.controls.noOfYears.patchValue('');
      this.Input_Form.controls.registrationDate_Json.patchValue('');
      this.Input_Form.controls.oldLicenceValidUpTo_Json.patchValue('');
      this.Input_Form.controls.workers_MaxDuringYear.patchValue('');
      this.Input_Form.controls.workers_MaxLast12Month.patchValue('');
      this.Input_Form.controls.workers_OrdinarilyEmployed.patchValue('');
      this.Input_Form.controls.powerKW_Installed.patchValue('');
      this.Input_Form.controls.powerKW_MaxProposed.patchValue('');
      this.Input_Form.controls.manufacturingProcess_Last12Months.patchValue('');
      this.Input_Form.controls.manufacturingProcess_Next12Months.patchValue('');
      this.Input_Form.controls.mfgProducts_Last12Month.patchValue('');
      this.Input_Form.controls.nationalIndustrialClassificationCode.patchValue('');

    }
    this.determinePrerequisitesFullfilled();
  }

  buildingPlanApprovedChange() {
    this.Input_Form.controls.isBuildingPlanVerified.patchValue(false);
    if (this.Input_Form.controls.isBuildingPlanApproved.value == 1) {
      this.Input_Form.controls.buildingPlanDofNumber.patchValue('');
      this.Input_Form.controls.buildingPlanApprovalDate.patchValue('1999-01-01')
    }
    else {
      this.Input_Form.controls.buildingPlanDofNumber.patchValue('NA');
      this.Input_Form.controls.isBuildingPlanVerified.patchValue(true);
    }
    this.determinePrerequisitesFullfilled();
  }
  onSelectCompetentPerson() {
    this.determinePrerequisitesFullfilled();
  }

  stabilityApprovedChange() {
    if (this.Input_Form.controls.isStabilityApproved.value == 1) {
      this.Input_Form.controls.stabilityPlanDofNumber.patchValue('NA');
      this.Input_Form.controls.competentPersonUserId.patchValue(this.Input_Form.controls.competentPersonUserRefId.value);
      this.Input_Form.controls.isStabilityPlanVerified.patchValue(true);
    }
    else if (this.Input_Form.controls.isStabilityApproved.value == 2) {
      this.Input_Form.controls.stabilityPlanDofNumber.patchValue('');
      this.Input_Form.controls.competentPersonUserId.patchValue('NA');
      this.Input_Form.controls.isStabilityPlanVerified.patchValue(true);
    }
    else if (this.Input_Form.controls.isStabilityApproved.value == 3) {
      this.Input_Form.controls.stabilityPlanDofNumber.patchValue('NA');
      this.Input_Form.controls.competentPersonUserId.patchValue('');
      this.Input_Form.controls.isStabilityPlanVerified.patchValue(true);
    }
    else if (this.Input_Form.controls.isStabilityApproved.value == 4) {
      this.Input_Form.controls.stabilityPlanDofNumber.patchValue('');
      this.Input_Form.controls.competentPersonUserId.patchValue('NA');
      this.Input_Form.controls.isStabilityPlanVerified.patchValue(false);
    }
    else if (this.Input_Form.controls.isStabilityApproved.value == 5) {
      this.Input_Form.controls.stabilityPlanDofNumber.patchValue('');
      this.Input_Form.controls.competentPersonUserId.patchValue('NA');
      this.Input_Form.controls.isStabilityPlanVerified.patchValue(true);
    }
    this.determinePrerequisitesFullfilled();
  }

  validateNicCode(): boolean {
    return this.submitted && (this.Input_Form.controls.nationalIndustrialClassificationCode.value == '' || this.Input_Form.controls.nationalIndustrialClassificationCode.value == '[]' || this.Input_Form.controls.nationalIndustrialClassificationCode.value == null);
  }

  onCircleOptionChange(circleData: any) {
    this.Input_Form.controls.factoryCircleRefId.patchValue(circleData.factoryCircleId);
  }

  getCompetentPersonDetailsByName(competentPersonUserRefId) {
    this.Input_Form.controls.competentPersonName.patchValue(this.competentPersonList?.competentPersonList.find(x => x.id == competentPersonUserRefId.value).officerFullName);
    this.Input_Form.controls.competentPersonEmail.patchValue(this.competentPersonList?.competentPersonList.find(x => x.id == competentPersonUserRefId.value).email);
    this.Input_Form.controls.competentPersonContactNo.patchValue(this.competentPersonList?.competentPersonList.find(x => x.id == competentPersonUserRefId.value).contactNo);
    this.Input_Form.controls.competentPersonUserId.patchValue(this.competentPersonList?.competentPersonList.find(x => x.id == competentPersonUserRefId));
  } 
  getEngineersDetailsByName(engineerUserRefId) {
    this.Input_Form.controls.engineerName.patchValue(this.empaneledEngineersList?.empaneledEngineersList.find(x => x.id == engineerUserRefId.value).officerFullName);
    this.Input_Form.controls.engineerContactNo.patchValue(this.empaneledEngineersList?.empaneledEngineersList.find(x => x.id == engineerUserRefId.value).contactNo);
    this.Input_Form.controls.engineerEmail.patchValue(this.empaneledEngineersList?.empaneledEngineersList.find(x => x.id == engineerUserRefId.value).email);
  }

  onBuildingPlanAuthorityTypeChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedOption = target.value;

    // Determine the values to be set
    const notAvailable = 'Not Available';
    const defaultValue = '';
    const defaultUserRefId = '7373F1CB-D53F-4E52-8D99-CE927DF9ACF2';
    const defaultContactNo = 9999999999;
    const defaultDate = '1999-01-01';

    // Update the form controls based on the selected option
    if (this.selectedOption === '1') {
      // If 'Competent Person' is selected
      this.Input_Form.patchValue({
        engineerUserRefId: defaultUserRefId,
        engineerName: notAvailable,
        engineerContactNo: defaultContactNo,
        engineerEmail: notAvailable,
        buildingPlanStabilityApprovalDate: defaultDate,
        isStabilityPlanVerified: 0,
        stabilityPlanDofNumber: 'NA'

      });
    }
    else if (this.selectedOption === '2') {
      // If 'Engineer' is selected
      this.Input_Form.patchValue({
        competentPersonUserRefId: defaultUserRefId,
        competentPersonName: notAvailable,
        competentPersonContactNo: defaultContactNo,
        competentPersonEmail: notAvailable,
        engineerUserRefId: defaultUserRefId,
        engineerName: notAvailable,
        engineerContactNo: defaultContactNo,
        engineerEmail: notAvailable,
        isStabilityPlanVerified: 0
      });
    }
    else if (this.selectedOption === '3') {
      // If 'Engineer' is selected
      this.Input_Form.patchValue({
        competentPersonUserRefId: defaultUserRefId,
        competentPersonName: notAvailable,
        competentPersonContactNo: defaultContactNo,
        competentPersonEmail: notAvailable,
        buildingPlanStabilityApprovalDate: defaultDate,
        isStabilityPlanVerified: 0,
        stabilityPlanDofNumber: 'NA'
      });
    }
    else if (this.selectedOption === '4') {
      // If 'Engineer' is selected
      this.Input_Form.patchValue({
        competentPersonUserRefId: defaultUserRefId,
        competentPersonName: notAvailable,
        competentPersonContactNo: defaultContactNo,
        competentPersonEmail: notAvailable,
        engineerUserRefId: defaultUserRefId,
        engineerName: notAvailable,
        engineerContactNo: defaultContactNo,
        engineerEmail: notAvailable,
        buildingPlanStabilityApprovalDate: defaultDate
      });
    }
    else if (this.selectedOption === '5') {
      // If 'Engineer' is selected
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
    }
    this.determinePrerequisitesFullfilled();
  }

  verifyAnnualReturnAndWelfare(): Observable<any> {
    // Call API to check annual return & welfare fund submitted in case of Renewal
    //if(this.Input_Form.controls.applicationPurposeType.value == 2){
    //console.log(this.licenceNumber,'sdasdsadsa')
    return this.appHttpRequestHandlerService.httpGet({ licenceNumber: this.licenceNumber, appRefId: this.paramInfo?.appRefId }, "FactoryLicence", "verifyWelfareFundAndReturn").pipe();
    //.pipe(takeUntil(this.ngUnsubscribe))
    //   .subscribe((data: GenericFormModel<string>) => {
    //     this.result =  data.formModel;
    //     if(this.result.value > 0){
    //       this.isReturnAndFundPaid =true;
    //     }
    //     else{
    //       this.isReturnAndFundPaid = false;
    //       error => {
    //         console.error('Welfare Fund/Annual Return is not valid till date:', error);
    //     }
    //     }
    // });
    //}
    //else  { // For Fresh Cases & Amendment
    ///this.isReturnAndFundPaid =true;
    //}
  }

  onDistrictRefIdChanged(districtRefId: any): void {
    this.districtRefId = districtRefId;
  }

  calculateLicenceEndDate(startDate: Date, years: any): Date {
    const date = new Date(startDate);
    const numericYears = parseInt(years, 10); // Ensure years is treated as a number
    date.setFullYear(date.getFullYear() + numericYears);
    date.setDate(date.getDate() - 1);
    return date;
  }
  
  calcLicenceValidRange(): string{
    if(this.Input_Form.controls.noOfYears.value>0){
      let noOfYears = this.Input_Form.controls.noOfYears.value;
      if(this.columnsToBeShownHide('registrationDate_Json',this.Input_Form.controls.applicationPurposeType.value) && this.Input_Form.controls.registrationDate.valid){
        return 'Your Licence will be valid from ' + this.Input_Form.controls.registrationDate_Json.value.day + ' '+ this.common.getMonthName(this.Input_Form.controls.registrationDate_Json.value.month) + ' '+ this.Input_Form.controls.registrationDate_Json.value.year
        + ' to ' 
        + '31 December '+ (parseInt(this.Input_Form.controls.registrationDate_Json.value.year) + parseInt((noOfYears-1).toString()));
      }
      else if(this.columnsToBeShownHide('renewalFromDate_Json',this.Input_Form.controls.applicationPurposeType.value) && this.Input_Form.controls.renewalFromDate.valid){
        return 'Your Licence will be valid from ' + this.Input_Form.controls.renewalFromDate_Json.value.day + ' '+ this.common.getMonthName(this.Input_Form.controls.renewalFromDate_Json.value.month) + ' '+ this.Input_Form.controls.renewalFromDate_Json.value.year
        + ' to ' 
        + '31 December '+ (parseInt(this.Input_Form.controls.renewalFromDate_Json.value.year) + parseInt((noOfYears-1).toString()));
      }
      else if(this.columnsToBeShownHide('ammendmentDate_Json',this.Input_Form.controls.applicationPurposeType.value) && this.Input_Form.controls.ammendmentDate.valid){
        return 'Your Licence will be valid from ' + this.Input_Form.controls.ammendmentDate_Json.value.day + ' '+ this.common.getMonthName(this.Input_Form.controls.ammendmentDate_Json.value.month) + ' '+ this.Input_Form.controls.ammendmentDate_Json.value.year
        + ' to ' 
        + '31 December '+ (parseInt(this.Input_Form.controls.ammendmentDate_Json.value.year) + parseInt((noOfYears-1).toString()));
      }
      else{
        return '';    
      }
    }
    return '';
  }
}
