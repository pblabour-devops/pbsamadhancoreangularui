import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { IOSH_Form_1_Registration_EmployerDetail } from '../osh-code-typed-models';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectSite } from 'src/app/project-site/project-site-typed-module';
import { takeUntil } from 'rxjs/operators';
import { forkJoin, Subject } from 'rxjs';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { ICRUD_CreateUpdateOperationResponse } from 'src/app/typed-model/crud-typed-models';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-form1-registration-employer-details',
    templateUrl: './form1-registration-employer-details.component.html',
    styleUrls: ['./form1-registration-employer-details.component.css'],
    standalone: false
})
export class Form1RegistrationEmployerDetailsComponent implements OnInit, AfterViewInit {

  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  districtRefId: 0;
  allDistricts: any = [];
  allTehsil: any = [];
  public appFormStepsList: any[] = [];
  public paramInfo: any;
  public parmamEncodedinfo: string;
  employerList: IOSH_Form_1_Registration_EmployerDetail[] = [];
  genericFormData: GenericFormModel<IOSH_Form_1_Registration_EmployerDetail>;

  constructor(
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private router: Router,
    public commonOpsService: CommonOpsService
  ) { }

  public projectSiteRefId: any;
  public appRefId: any;
  public projectSiteVersion: any;

  Input_Form: TForm<IOSH_Form_1_Registration_EmployerDetail> = this.fb.group({
  id: [0, Validators.required],
  employerType: ['', Validators.required],
  employerName: ['', [Validators.required, Validators.maxLength(100)]],
  designation: ['', [Validators.required, Validators.maxLength(100)]],
  fatherOrHusbandName: ['', [Validators.required, Validators.maxLength(100)]],
  email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
  mobileNo: ['', [Validators.required, Validators.maxLength(10)]],
  premiseName: ['', [Validators.required, Validators.maxLength(500)]],
  subLocality_OR_Street_OR_ColonyName: ['', [Validators.required, Validators.maxLength(500)]],
  locality_OR_Landmark: ['', [Validators.required, Validators.maxLength(500)]],
  villageOrTown: ['', [Validators.required, Validators.maxLength(100)]],
  state: ['', Validators.required],
  tehsilRefId: ['', Validators.required],
  districtRefId: ['', Validators.required],
  pinCode: ['', [Validators.required, Validators.maxLength(6)]],
  appRefId: [0, Validators.required],
  projectSiteRefId: [0, Validators.required],
  applicationType: [101, Validators.required],
  applicationPurposeType: [1, Validators.required],
  iPin: [0, Validators.required],
  investPunjab_AppId: [0, Validators.required],
  factoryCircleRefId: [1, Validators.required],
  projectSiteVersion: [0, Validators.required],
  toDoActivityModeType: [1, Validators.required],
  rootActivityRefId: ['defaultValue', Validators.required],
  toDoActivityCategoryType: [1017, Validators.required],
}) as TForm<IOSH_Form_1_Registration_EmployerDetail>;

  get formControls() { return this.Input_Form.controls; }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.route.queryParams.subscribe(params => {
      this.parmamEncodedinfo = params.info;
      this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info) => {
        this.paramInfo = info;
        this.Input_Form.controls.appRefId.patchValue(this.paramInfo?.appRefId);
        this.appHttpRequestHandlerService.httpGet(
          { id: this.paramInfo?.appRefId },"OSH_Form_1_Registration","getForm1RegistrationEmployerDetail").pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: GenericFormModel<IOSH_Form_1_Registration_EmployerDetail>) => {
            this.genericFormData = data;
            this.appFormStepsList = data.appFormStepsList;
            if (data.formModel) {
              this.Input_Form.patchValue(data.formModel);
            }
          });
      });
    });

    this.appHttpRequestHandlerService.httpGet(null,"CommonApis","getalldistrict").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericFormModel<ProjectSite>) => {
        this.allDistricts = data.formModel;
      });
  }

  public getTehsilsByDistrictRefId(districtRefId, targetTehsilCtrlName) {
    this.districtRefId = districtRefId;
    this.appHttpRequestHandlerService.httpGet({ id: districtRefId },"CommonApis","gettehsilsbydistrictrefid").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data) => {
        this.allTehsil = data;
      });
  }

  addEmployer() {
  this.Input_Form.patchValue({
    appRefId: this.paramInfo?.appRefId,
    projectSiteRefId: 0,
    applicationType: 101,
    applicationPurposeType: 1,
    iPin: 0,
    investPunjab_AppId: 0,
    factoryCircleRefId: 1,
    projectSiteVersion: 0,
    toDoActivityModeType: 1,
    rootActivityRefId: 'defaultValue',
    toDoActivityCategoryType: 1017
  });

  if (this.Input_Form.invalid) {
    this.Input_Form.markAllAsTouched();
    return;
  }

  this.employerList.push({ ...this.Input_Form.value });
  this.Input_Form.reset({
    id: 0,
    appRefId: this.paramInfo?.appRefId,
    projectSiteRefId: 0,
    applicationType: 101,
    applicationPurposeType: 1,
    iPin: 0,
    investPunjab_AppId: 0,
    factoryCircleRefId: 1,
    projectSiteVersion: 0,
    toDoActivityModeType: 1,
    rootActivityRefId: '',
    toDoActivityCategoryType: 1017
  });

  Swal.fire({
    icon: 'success',
    title: 'Saved Successfully!',
    timer: 1500,
    showConfirmButton: false
    });
  }
  deleteEmployer(index: number) {
    this.employerList.splice(index, 1);
  }
  resetForm() {
    this.Input_Form.reset();
    this.Input_Form.patchValue({id: 0,appRefId: this.paramInfo?.appRefId});
  }

  onSubmit(): void {
  if (this.employerList.length === 0) {
    Swal.fire({
      icon: 'error',
      title: 'Please add at least one employer'
    });
    return;
  }

  const updatedEmployers = this.employerList.map(emp => ({
    ...emp,
    projectSiteRefId: this.paramInfo?.projectSiteRefId,
    applicationPurposeType: this.paramInfo?.applicationPurposeType,
    iPin: this.paramInfo?.iPin,
    investPunjab_AppId: this.paramInfo?.investPunjab_AppId,
    projectSiteVersion: this.paramInfo?.projectSiteVersion,
    factoryCircleRefId: 1,
    toDoActivityModeType: 1,
    rootActivityRefId: '',
    toDoActivityCategoryType: 1017
  }));
  this.saveEmployersSequentially(updatedEmployers, 0);
}

private saveEmployersSequentially(list: any[], index: number) {
  if (index >= list.length) {
    Swal.fire({
      icon: 'success',
      title: 'All Employers Saved Successfully!',
      timer: 1500,
      showConfirmButton: false
    });

    this.router.navigate(
      [this.appFormStepsList.find(x => x.stepCode == 'EMP').uiNextPageComponentPath],
      {
        queryParams: {
          info: this.commonOpsService.encodeQueryParamsInBase64({
            appRefId: this.paramInfo?.appRefId,
            applicationType: 101,
            projectSiteRefId: this.paramInfo?.projectSiteRefId,
            applicationPurposeType: this.paramInfo?.applicationPurposeType,
            investPunjab_AppId: this.paramInfo?.investPunjab_AppId,
            iPin: this.paramInfo?.iPin,
            projectSiteVersion: this.paramInfo?.projectSiteVersion
          })
        }
      }
    );
    return;
  }

  this.appHttpRequestHandlerService
    .httpPost(
      list[index],"pbsamadhannetcoreapi.Models.OSH_Form_1_Registration_EmployerDetail","Crud","CreateUpdate").pipe(takeUntil(this.ngUnsubscribe))
        .subscribe({
            next: () => this.saveEmployersSequentially(list, index + 1),
            error: () => {
              Swal.fire({
                icon: 'error',
                title: 'Error saving employer at position ' + (index + 1)
              });
            }
      });
  }

}