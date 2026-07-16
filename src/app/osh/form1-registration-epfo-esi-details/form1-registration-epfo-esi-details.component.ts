import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { IOSH_Form_1_Registration_EPFO_ESIC_Detail } from '../osh-code-typed-models';
import { ICRUD_CreateUpdateOperationResponse } from 'src/app/typed-model/crud-typed-models';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
    selector: 'app-form1-registration-epfo-esi-details',
    templateUrl: './form1-registration-epfo-esi-details.component.html',
    styleUrls: ['./form1-registration-epfo-esi-details.component.css'],
    standalone: false
})
export class Form1RegistrationEpfoEsiDetailsComponent implements OnInit {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  public appFormStepsList: any[];
  public paramInfo:any;
  public parmamEncodedinfo:string;
  genericFormData: GenericFormModel<IOSH_Form_1_Registration_EPFO_ESIC_Detail>;
  constructor(private route: ActivatedRoute,
              private fb: UntypedFormBuilder, 
              private appHttpRequestHandlerService: AppHttpRequestHandlerService,
              private router: Router, 
              public commonOpsService: CommonOpsService) { }
  public projectSiteRefId : any;
  public appRefId : any;
  public projectSiteVersion : any;
  Input_Form: TForm<IOSH_Form_1_Registration_EPFO_ESIC_Detail> = this.fb.group({
    id: [0, Validators.required],
    dateOnWhich10OrMorePersonEmployed: ['', Validators.required],
    dateOnWhich20OrMorePersonEmployed: ['', Validators.required],
    employeesVoluntaryRegistrationDate: ['', Validators.required],
    dPIIT_StartupRegistrationNumber: ['', [Validators.required, Validators.maxLength(50)]],
    dPIIT_StartupRegistrationDate: [''],
    dateOfCommencement: ['', Validators.required],
    esic_NatureOfWork: ['', Validators.required],
    esic_SubCategory_NatureOfWork: ['', Validators.required],
    esic_BranchOffice: ['', Validators.required],
    esic_InspectionDivision: ['', Validators.required],
    appRefId: [0, Validators.required],
    projectSiteRefId:[0, Validators.required],
    applicationType: [101, Validators.required],
    applicationPurposeType: [1, Validators.required],
    iPin : [0, Validators.required],
    investPunjab_AppId : [0, Validators.required],
    factoryCircleRefId : [1, [Validators.required]],
    projectSiteVersion:[0, Validators.required],
    toDoActivityModeType: [1, Validators.required],
    rootActivityRefId: ['', Validators.required],
    toDoActivityCategoryType: [1016, Validators.required],
  }) as TForm<IOSH_Form_1_Registration_EPFO_ESIC_Detail>;
  get formControls() { return this.Input_Form.controls; }

   ngOnInit(): void {}
    ngAfterViewInit() {
      this.route.queryParams
        .subscribe(params => {
          this.parmamEncodedinfo=params.info;
          this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info)=>{
            this.paramInfo = info;
            this.Input_Form.controls.appRefId.patchValue(this.paramInfo?.appRefId);
            this.appRefId = this.paramInfo.appRefId;
            this.appHttpRequestHandlerService.httpGet({ id: this.paramInfo?.appRefId }, "OSH_Form_1_Registration", "getForm1RegistrationEpfoAndEsicDetail").pipe(takeUntil(this.ngUnsubscribe))
              .subscribe((data: GenericFormModel<IOSH_Form_1_Registration_EPFO_ESIC_Detail>) => {
                this.genericFormData = data;
                this.appFormStepsList = data.appFormStepsList;
                if (data.formModel) {
                  const formData: any = { ...data.formModel };
                  // Convert datetime to yyyy-MM-dd for date inputs
                  Object.keys(formData).forEach(key => {
                    if (formData[key] && typeof formData[key] === 'string' && formData[key].includes('T')) {
                      formData[key] = formData[key].split('T')[0];
                    }
                  });
                  this.Input_Form.patchValue(formData);
                }
              });
          });
        });
    }
    
  onSubmit(): void {
    this.Input_Form.controls.projectSiteRefId.patchValue(this.paramInfo?.projectSiteRefId);
    this.Input_Form.controls.applicationPurposeType.patchValue(this.paramInfo?.applicationPurposeType);
    this.Input_Form.controls.iPin.patchValue(this.paramInfo?.iPin);
    this.Input_Form.controls.investPunjab_AppId.patchValue(this.paramInfo?.investPunjab_AppId);
    this.Input_Form.controls.projectSiteVersion.patchValue(this.paramInfo?.projectSiteVersion);
    this.Input_Form.controls.factoryCircleRefId.patchValue(1); // Static FactoryCircleRefId
    this.Input_Form.controls.toDoActivityModeType.patchValue(1);
    this.Input_Form.controls.rootActivityRefId.patchValue('');
    this.Input_Form.controls.toDoActivityCategoryType.patchValue(1016);
    this.Input_Form.controls.id.patchValue(0);
    this.appHttpRequestHandlerService.httpPost(this.Input_Form.value, "pbsamadhannetcoreapi.Models.OSH_Form_1_Registration_EPFO_ESIC_Detail", "Crud", "CreateUpdate").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: ICRUD_CreateUpdateOperationResponse) => {
        this.router.navigate([this.appFormStepsList.find(x=>x.stepCode=='EPFO').uiNextPageComponentPath],{queryParams: { info: this.commonOpsService.encodeQueryParamsInBase64( {
          identityKey: data.entityKeyId, 
          appRefId: data.appId, 
          applicationType: 101, 
          projectSiteRefId: this.paramInfo?.projectSiteRefId,
          applicationPurposeType: this.paramInfo?.applicationPurposeType,
          investPunjab_AppId: this.paramInfo?.investPunjab_AppId,
          iPin: this.paramInfo?.iPin,
          projectSiteVersion: this.projectSiteVersion
        })}});
    });
  }
}
