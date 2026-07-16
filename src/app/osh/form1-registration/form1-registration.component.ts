import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonService } from 'src/app/common/common.service';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { ProjectSite } from 'src/app/project-site/project-site-typed-module';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { ICRUD_CreateUpdateOperationResponse } from 'src/app/typed-model/crud-typed-models';
import { environment } from 'src/environments/environment';
import { IOSH_Form_1_Registration, IOSH_Form_1_Registration_BOCW, IOSH_Form_1_Registration_EmployeeDetail, IOSH_Form_1_Registration_Factory, IOSH_Form_1_Registration_MotorTransport } from '../osh-code-typed-models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-form1-registration',
    templateUrl: './form1-registration.component.html',
    styleUrls: ['./form1-registration.component.css'],
    standalone: false
})
export class Form1RegistrationComponent implements OnInit {
  genericFormData: GenericFormModel<IOSH_Form_1_Registration>;
    protected ngUnsubscribe: Subject<void> = new Subject<void>();
    public appFormStepsList: any[];
    public projectSite: ProjectSite;
    public paramInfo:any;
    public parmamEncodedinfo:string;
    getInitialData: any;
    submitted:boolean=false;
    public currentDate : any;
    hasSubmitClicked: boolean = false;
    public ownershipTypeEnum : any = [];
    public osh_EstablishmentTypeEnum : any = [];
    selectedOption: string = '';
    public projectSiteRefId : any;
    public appRefId : any;
    public projectSiteVersion : any;
    public isEditAllowed : boolean;
    districtRefId : any;
    selectedEstablishmentType: string = '';
    allOtherEstablishmentType:any=[];
    empDetailData : IOSH_Form_1_Registration_EmployeeDetail;
    factoryDetailData : IOSH_Form_1_Registration_Factory;
    bocwDetailData : IOSH_Form_1_Registration_BOCW;
    motorTransportDetailData : IOSH_Form_1_Registration_MotorTransport;

  constructor(private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService, 
    private cdr: ChangeDetectorRef,
    private router: Router,
    public common:CommonService,
    public commonOpsService: CommonOpsService,
    private modalService: NgbModal
  ) { }
  ngOnInit(): void {
     this.route.queryParams
      .subscribe(params => {
      this.appHttpRequestHandlerService.httpGet(null, "OSH_Form_1_Registration", "getAllOtherEstablishmentType").pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data: GenericFormModel<ProjectSite>) => { this.allOtherEstablishmentType=data.formModel
          }
        );
    });
  }

  Input_Form: TForm<IOSH_Form_1_Registration> = this.fb.group({
        registrationId: [0, Validators.required],
        ownershipType : [''],
        panNumber : [''],
        nameOnPan : ['', Validators.required],
        dateOfBirth : ['', Validators.required],
        isEstbCarryingAnyHazardousOccupation : ['', Validators.required],
        osh_EstablishmentType : [''],
        establishmentOtherTypeId : ['', Validators.required],
        maximumNoOfWorkersToBeEmployedOnAnyDay : ['', Validators.required],
        doYouWantVoluntaryCoverageForEPFO : ['', Validators.required],
        doYouWantVoluntaryCoverageForESIC : ['', Validators.required],
        nationalIndustrialClassificationCode: ['', [Validators.required, Validators.min(1)]],

        appRefId: [0, Validators.required],
        projectSiteRefId:[0, Validators.required],
        applicationType: [101, Validators.required],
        applicationPurposeType: [1, Validators.required],
        iPin : [0, Validators.required],
        investPunjab_AppId : [0, Validators.required],
        factoryCircleRefId : [1, [Validators.required]],
        projectSiteVersion:[0, Validators.required],
        toDoActivityModeType: [0, Validators.required],
        rootActivityRefId: ['', Validators.required],
        toDoActivityCategoryType: [0, Validators.required],
      }) as TForm<IOSH_Form_1_Registration>;
      get formControls() { return this.Input_Form.controls; }
  
  ngAfterViewInit() {
      this.route.queryParams
        .subscribe(params => {
          this.parmamEncodedinfo=params.info;
          this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info)=>{
          this.paramInfo = info;
          this.projectSiteRefId = this.paramInfo.projectSiteRefId;
          this.appRefId = this.paramInfo.appRefId;
          this.projectSiteVersion = this.paramInfo.projectSiteVersion;
          this.appHttpRequestHandlerService.httpGet({ id: this.paramInfo?.appRefId }, "OSH_Form_1_Registration", "getForm1RegistrationDetail").pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((data: GenericFormModel<IOSH_Form_1_Registration>) => { this.initFormData(data)
              this.isEditAllowed = data.isEditAllowed;
            });
          });
        });
  }

onTypeChange(type: string) {
  this.selectedEstablishmentType = type;
  if (type === 'other') {
    this.Input_Form.controls.osh_EstablishmentType.patchValue(4);
    return;
  }
  const enumIndexMap: { [key: string]: number } = {
    factory: 0,
    bocw: 1,
    motor: 2,
    other: 3,
  };
  const enumIndex = enumIndexMap[type];
  const enumItem = this.osh_EstablishmentTypeEnum[enumIndex];
  if (enumItem) {
    this.Input_Form.controls?.osh_EstablishmentType.patchValue(+enumItem.value);
  }
}
      
  initFormData(genericFormData: GenericFormModel<IOSH_Form_1_Registration>) {
      this.genericFormData = genericFormData;
      this.ownershipTypeEnum = this.genericFormData.enumTemplateLists.filter(x => x.selectListTypeCode == 'OwnershipTypeEnum')[0].selectListItems;
      this.osh_EstablishmentTypeEnum = this.genericFormData.enumTemplateLists.filter(x => x.selectListTypeCode == 'OSH_EstablishmentTypeEnum')[0].selectListItems;
      this.appFormStepsList = this.genericFormData.appFormStepsList;
      this.Input_Form.patchValue(genericFormData.formModel);
      this.Input_Form.controls.projectSiteVersion.patchValue(this.paramInfo?.projectSiteVersion);
      this.Input_Form.controls.applicationType.patchValue(this.paramInfo.applicationType);
      this.Input_Form.controls.toDoActivityModeType.patchValue(this.paramInfo?.toDoActivityModeType);
      this.Input_Form.controls.rootActivityRefId.patchValue(this.paramInfo?.rootActivityRefId);
      this.Input_Form.controls.toDoActivityCategoryType.patchValue(this.paramInfo?.toDoActivityCategoryType);
  }
    
  
  onSubmit() {
    this.Input_Form.controls.projectSiteRefId.patchValue(this.paramInfo?.projectSiteRefId);
    this.Input_Form.controls.applicationPurposeType.patchValue(this.paramInfo?.applicationPurposeType);
    this.Input_Form.controls.iPin.patchValue(this.paramInfo?.iPin);
    this.Input_Form.controls.investPunjab_AppId.patchValue(this.paramInfo?.investPunjab_AppId);
    this.Input_Form.controls.projectSiteVersion.patchValue(this.paramInfo?.projectSiteVersion);
    this.Input_Form.controls.factoryCircleRefId.patchValue(1); // Static FactoryCircleRefId
    this.Input_Form.controls.toDoActivityModeType.patchValue(this.paramInfo?.toDoActivityModeType);
    this.Input_Form.controls.rootActivityRefId.patchValue(this.paramInfo?.rootActivityRefId);
    this.Input_Form.controls.toDoActivityCategoryType.patchValue(this.paramInfo?.toDoActivityCategoryType);
    this.Input_Form.controls.establishmentOtherTypeId.patchValue(1); // This will update if Establishment Type select Other- Then pass the Id from the table
    this.submitted=true;
    if(this.Input_Form.valid){
    this.hasSubmitClicked=true;
    this.appHttpRequestHandlerService.httpPost(this.Input_Form.value, "pbsamadhannetcoreapi.Models.OSH_Form_1_Registration", "Crud", "CreateUpdate").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((regFormRspData: ICRUD_CreateUpdateOperationResponse) => {
        this.empDetailData.appRefId = regFormRspData?.appId;
        this.empDetailData.projectSiteRefId=this.paramInfo?.projectSiteRefId;
        this.empDetailData.applicationPurposeType=this.paramInfo?.applicationPurposeType;
        this.empDetailData.iPin=this.paramInfo?.iPin;
        this.empDetailData.investPunjab_AppId=this.paramInfo?.investPunjab_AppId;
        this.empDetailData.projectSiteVersion=this.paramInfo?.projectSiteVersion;
        this.empDetailData.toDoActivityModeType=this.paramInfo?.toDoActivityModeType;
        this.empDetailData.rootActivityRefId=this.paramInfo?.rootActivityRefId;
        this.empDetailData.toDoActivityCategoryType=1012;
        this.appHttpRequestHandlerService.httpPost(this.empDetailData, "pbsamadhannetcoreapi.Models.OSH_Form_1_Registration_EmployeeDetail", "Crud", "CreateUpdate").pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((empFormRspData: ICRUD_CreateUpdateOperationResponse) => {
            if(this.Input_Form.controls.osh_EstablishmentType.value==1){//Factory for the purpose of contract labour
              this.factoryDetailData.appRefId = regFormRspData?.appId;
              this.factoryDetailData.projectSiteRefId=this.paramInfo?.projectSiteRefId;
              this.factoryDetailData.applicationPurposeType=this.paramInfo?.applicationPurposeType;
              this.factoryDetailData.iPin=this.paramInfo?.iPin;
              this.factoryDetailData.investPunjab_AppId=this.paramInfo?.investPunjab_AppId;
              this.factoryDetailData.projectSiteVersion=this.paramInfo?.projectSiteVersion;
              this.factoryDetailData.toDoActivityModeType=this.paramInfo?.toDoActivityModeType;
              this.factoryDetailData.rootActivityRefId=this.paramInfo?.rootActivityRefId;
              this.factoryDetailData.factoryCircleRefId=1;
              this.factoryDetailData.toDoActivityCategoryType=1013;
              this.appHttpRequestHandlerService.httpPost(this.factoryDetailData, "pbsamadhannetcoreapi.Models.OSH_Form_1_Registration_Factory", "Crud", "CreateUpdate").pipe(takeUntil(this.ngUnsubscribe))
                .subscribe((empFormRspData: ICRUD_CreateUpdateOperationResponse) => {
                  this.navigateToNextStep(regFormRspData);
              });
            }
            else if(this.Input_Form.controls.osh_EstablishmentType.value==2){//Building and Other Construction Work
              this.bocwDetailData.appRefId = regFormRspData?.appId;
              this.bocwDetailData.projectSiteRefId=this.paramInfo?.projectSiteRefId;
              this.bocwDetailData.applicationPurposeType=this.paramInfo?.applicationPurposeType;
              this.bocwDetailData.iPin=this.paramInfo?.iPin;
              this.bocwDetailData.investPunjab_AppId=this.paramInfo?.investPunjab_AppId;
              this.bocwDetailData.projectSiteVersion=this.paramInfo?.projectSiteVersion;
              this.bocwDetailData.toDoActivityModeType=this.paramInfo?.toDoActivityModeType;
              this.bocwDetailData.rootActivityRefId=this.paramInfo?.rootActivityRefId;
              this.bocwDetailData.toDoActivityCategoryType=1014;
                this.appHttpRequestHandlerService.httpPost(this.bocwDetailData, "pbsamadhannetcoreapi.Models.OSH_Form_1_Registration_BOCW", "Crud", "CreateUpdate").pipe(takeUntil(this.ngUnsubscribe))
                  .subscribe((empFormRspData: ICRUD_CreateUpdateOperationResponse) => {
                    this.navigateToNextStep(regFormRspData);
                });
            }
            else if(this.Input_Form.controls.osh_EstablishmentType.value==3){//Motor Transport
                console.log('Motor Transport Post api call')
                this.motorTransportDetailData.appRefId = regFormRspData?.appId;
                this.motorTransportDetailData.projectSiteRefId=this.paramInfo?.projectSiteRefId;
                this.motorTransportDetailData.applicationPurposeType=this.paramInfo?.applicationPurposeType;
                this.motorTransportDetailData.iPin=this.paramInfo?.iPin;
                this.motorTransportDetailData.investPunjab_AppId=this.paramInfo?.investPunjab_AppId;
                this.motorTransportDetailData.projectSiteVersion=this.paramInfo?.projectSiteVersion;
                this.motorTransportDetailData.toDoActivityModeType=this.paramInfo?.toDoActivityModeType;
                this.motorTransportDetailData.rootActivityRefId=this.paramInfo?.rootActivityRefId;
                this.motorTransportDetailData.toDoActivityCategoryType=1015;
                this.appHttpRequestHandlerService.httpPost(this.motorTransportDetailData, "pbsamadhannetcoreapi.Models.OSH_Form_1_Registration_MotorTransportDetail", "Crud", "CreateUpdate").pipe(takeUntil(this.ngUnsubscribe))
                  .subscribe((empFormRspData: ICRUD_CreateUpdateOperationResponse) => {
                    this.navigateToNextStep(regFormRspData);
                });
            }
          });
        });
    }
  }

  navigateToNextStep(regFormRspData: ICRUD_CreateUpdateOperationResponse){
    console.log(this.appFormStepsList, '>>>>')
    this.router.navigate([this.appFormStepsList.find(x=>x.stepCode=='ED').uiNextPageComponentPath],{queryParams: { info: this.commonOpsService.encodeQueryParamsInBase64( 
      { 
        identityKey: regFormRspData.entityKeyId,
        appRefId: regFormRspData.appId,
        applicationType: 101,
        projectSiteRefId: this.paramInfo?.projectSiteRefId,
        applicationPurposeType: this.paramInfo?.applicationPurposeType,
        investPunjab_AppId: this.paramInfo?.investPunjab_AppId,
        iPin: this.paramInfo?.iPin,
        projectSiteVersion: this.paramInfo?.projectSiteVersion,
      })
    }});
  }

  updateNicCode(event){
    this.Input_Form.controls.nationalIndustrialClassificationCode.patchValue(JSON.stringify(event));
  }

  empDetailDataEventListener(data: IOSH_Form_1_Registration_EmployeeDetail){
    this.empDetailData=data;
  }

  bocwDetailDataEventListener(data: IOSH_Form_1_Registration_BOCW){
    this.bocwDetailData=data;
  }

  factoryDetailDataEventListener(data: IOSH_Form_1_Registration_Factory){
    this.factoryDetailData=data;
  }

  motorTransportDetailDataEventListener(data: IOSH_Form_1_Registration_MotorTransport){
    this.motorTransportDetailData=data;
  }

   openScrollableContent(longContent) {
    this.modalService.open(longContent, { scrollable: true });
  }
}
