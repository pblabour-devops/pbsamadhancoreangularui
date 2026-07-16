import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { ProjectSite } from 'src/app/project-site/project-site-typed-module';
import { IComplaint_EmployerDetail } from 'src/app/samadhaan/samadhaan-typed-modelts';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employer-contractor-details',
  templateUrl: './employer-contractor-details.component.html',
  styleUrl: './employer-contractor-details.component.css',
  standalone : false
})
export class EmployerContractorDetailsComponent {
@Output() employerOrContractorDetailDataEvent= new EventEmitter<any>();
 protected ngUnsubscribe: Subject<void> = new Subject<void>();

  allDistricts: any[] = [];
  public appFormStepsList: any[] = [];
  public paramInfo: any;
  public parmamEncodedinfo: string;

  employerList: IComplaint_EmployerDetail[] = [];
  genericFormData: GenericFormModel<IComplaint_EmployerDetail>;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private router: Router,
    public commonOpsService: CommonOpsService
  ) {}

  Input_Form: TForm<IComplaint_EmployerDetail> = this.fb.group({
    id: [0, Validators.required],
    appRefId: [0, Validators.required],
    isEngagedThroughContractor: [true, Validators.required],
    employerORContractorNameAndDesignation: ['', [Validators.required, Validators.maxLength(300)]],
    employerORContractorAddress: ['', [Validators.required, Validators.maxLength(500)]],
    state: ['', Validators.required],
    districtRefId: ['', Validators.required],
    pinCode: ['', [Validators.required, Validators.maxLength(10)]],
    mobileNumber: ['', [Validators.required, Validators.maxLength(10)]],
    email: ['', [Validators.email, Validators.maxLength(200)]],
    projectSiteRefId: [0, Validators.required],
    applicationPurposeType: [1, Validators.required],
    applicationType: [101, Validators.required],
    iPin: [0, Validators.required],
    investPunjab_AppId: [0, Validators.required],
    factoryCircleRefId: [1, Validators.required],
    projectSiteVersion: [0, Validators.required],
    toDoActivityModeType: [1, Validators.required],
    toDoActivityCategoryType: [1017, Validators.required],
    rootActivityRefId: ['defaultValue', Validators.required],
  }) as TForm<IComplaint_EmployerDetail>;

  // Supporting document uploads (separate from Input_Form — file inputs aren't reactive-form-bindable)

  get formControls() {
    return this.Input_Form.controls;
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.route.queryParams.subscribe((params) => {
      this.parmamEncodedinfo = params.info;

      this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info) => {
        this.paramInfo = info;
        this.Input_Form.controls.appRefId.patchValue(this.paramInfo?.appRefId);

        this.appHttpRequestHandlerService
          .httpGet({ id: this.paramInfo?.appRefId }, 'Complaints', 'getEmployerOrContractorDetails')
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: GenericFormModel<IComplaint_EmployerDetail>) => {
            this.genericFormData = data;
            this.appFormStepsList = data.appFormStepsList;
            if (data.formModel) {
              // this.Input_Form.patchValue(data.formModel);
            }
          });
      });
    });

    this.appHttpRequestHandlerService
      .httpGet(null, 'CommonApis', 'getalldistrict')
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericFormModel<ProjectSite>) => {
        this.allDistricts = data.formModel as any;
      });
  }

  // ---------- Supporting Documents (FormArray) ----------



  removeDocument(index: number): void {

  }


  // ---------- Add / Delete / Reset ----------

  addEmployer() {
    this.Input_Form.patchValue({
      appRefId: this.paramInfo?.appRefId,
      projectSiteRefId: 388263,
      applicationType: 100001,
      applicationPurposeType: 0,
      iPin: 0,
      investPunjab_AppId: 0,
      factoryCircleRefId: 1,
      projectSiteVersion: 1,
      toDoActivityModeType: 1,
      rootActivityRefId: 'defaultValue',
      toDoActivityCategoryType: 2001,
    });

    if (this.Input_Form.valid) {

    this.employerList.push({ ...this.Input_Form.value });

    this.employerOrContractorDetailDataEvent.emit(this.employerList)

    this.Input_Form.reset({
      id: 0,
      isEngagedThroughContractor: true,
      appRefId: this.paramInfo?.appRefId,
      projectSiteRefId: 0,
      applicationType: 100001,
      applicationPurposeType: 0,
      iPin: 0,
      investPunjab_AppId: 0,
      factoryCircleRefId: 1,
      projectSiteVersion: 1,
      toDoActivityModeType: 1,
      rootActivityRefId: 'defaultValue',
      toDoActivityCategoryType: 2001,
    });
  } else {
    this.Input_Form.markAllAsTouched();

     Object.keys(this.Input_Form.controls).forEach(key => {
      const control = this.Input_Form.get(key);

      if (control?.invalid) {
        console.log(`${key} is invalid`, {
          value: control.value,
          errors: control.errors
        });
      }
    });
  }

  }

  deleteEmployer(index: number) {
    this.employerList.splice(index, 1);
  }

  resetForm() {
    this.Input_Form.reset({
      isEngagedThroughContractor: true,
    });
    this.Input_Form.patchValue({ id: 0, appRefId: this.paramInfo?.appRefId });
  }

  // ---------- Submit ----------

  onSubmit(): void {
    debugger;
    if (this.employerList.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Please add at least one employer/contractor',
      });
      return;
    }

    const updatedEmployers = this.employerList.map((emp) => ({
      ...emp
    }));

    this.saveEmployersSequentially(updatedEmployers, 0);
  }

  private saveEmployersSequentially(list: any[], index: number) {
   debugger;
    if (index >= list.length) {
      Swal.fire({
        icon: 'success',
        title: 'All Employer/Contractor Details Saved Successfully!',
        timer: 1500,
        showConfirmButton: false,
      });

      this.router.navigate(
        [this.appFormStepsList.find((x) => x.stepCode == 'EMP')?.uiNextPageComponentPath],
        {
          queryParams: {
            info: this.commonOpsService.encodeQueryParamsInBase64({
              appRefId: this.paramInfo?.appRefId,
              applicationType: 101,
              projectSiteRefId: this.paramInfo?.projectSiteRefId,
              applicationPurposeType: this.paramInfo?.applicationPurposeType,
              investPunjab_AppId: this.paramInfo?.investPunjab_AppId,
              iPin: this.paramInfo?.iPin,
              projectSiteVersion: this.paramInfo?.projectSiteVersion,
            }),
          },
        }
      );
      return;
    }

    this.appHttpRequestHandlerService.httpPost(list[index],'pbsamadhannetcoreapi.Models.Complaint_EmployerORContractorDetail','Crud','CreateUpdate')
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: () => this.saveEmployersSequentially(list, index + 1),
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error saving employer/contractor at position ' + (index + 1),
          });
        },
      });
  }
}
