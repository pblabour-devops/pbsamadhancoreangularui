import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { IOSH_Form_1_Registration_PrincipalEmployerDetail } from '../osh-code-typed-models';
import { ActivatedRoute, Router } from '@angular/router';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProjectSite } from 'src/app/project-site/project-site-typed-module';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-form1-registration-principal-employer-details',
    templateUrl: './form1-registration-principal-employer-details.component.html',
    styleUrls: ['./form1-registration-principal-employer-details.component.css'],
    standalone: false
})
export class Form1RegistrationPrincipalEmployerDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  districtRefId: 0;
  allDistricts: any = [];
  allTehsil: any = [];
  public appFormStepsList: any[];
  public paramInfo: any;
  public parmamEncodedinfo: string;
  employerList: IOSH_Form_1_Registration_PrincipalEmployerDetail[] = [];
  genericFormData: GenericFormModel<IOSH_Form_1_Registration_PrincipalEmployerDetail>;

  public projectSiteRefId: any;
  public appRefId: any;
  public projectSiteVersion: any;

  constructor(
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private router: Router,
    public commonOpsService: CommonOpsService
  ) { }

  Input_Form: TForm<IOSH_Form_1_Registration_PrincipalEmployerDetail> = this.fb.group({
    id: [0, Validators.required],
    principalEmployerName: ['', [Validators.required, Validators.maxLength(100)]],
    designation: ['', [Validators.required, Validators.maxLength(100)]],
    department: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    mobileNo: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/), Validators.maxLength(10)]],
    premiseName: ['', [Validators.required, Validators.maxLength(500)]],
    subLocality_OR_Street_OR_ColonyName: ['', [Validators.required, Validators.maxLength(500)]],
    locality_OR_Landmark: ['', [Validators.required, Validators.maxLength(500)]],
    villageOrTown: ['', [Validators.required, Validators.maxLength(100)]],
    state: ['', Validators.required],
    tehsilRefId: ['', Validators.required],
    districtRefId: ['', Validators.required],
    pinCode: ['', [Validators.required, Validators.maxLength(6)]],

    // Additional required fields
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
    toDoActivityCategoryType: [1018, Validators.required]

  }) as TForm<IOSH_Form_1_Registration_PrincipalEmployerDetail>;

  get formControls() { return this.Input_Form.controls; }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.route.queryParams.subscribe(params => {
      this.parmamEncodedinfo = params.info;
      this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info) => {
        this.paramInfo = info;
        this.projectSiteRefId = this.paramInfo?.projectSiteRefId;
        this.appRefId = this.paramInfo?.appRefId;
        this.projectSiteVersion = this.paramInfo?.projectSiteVersion;

        this.Input_Form.patchValue({
          id: 0,
          appRefId: this.paramInfo?.appRefId,
          projectSiteRefId: this.paramInfo?.projectSiteRefId,
          applicationType: 101,
          applicationPurposeType: this.paramInfo?.applicationPurposeType,
          iPin: this.paramInfo?.iPin,
          investPunjab_AppId: this.paramInfo?.investPunjab_AppId,
          projectSiteVersion: this.paramInfo?.projectSiteVersion,
          factoryCircleRefId: 1,
          toDoActivityModeType: 1,
          rootActivityRefId: 'defaultValue',
          toDoActivityCategoryType: 1018
        });

        this.appHttpRequestHandlerService
          .httpGet({ id: this.paramInfo?.appRefId }, "OSH_Form_1_Registration", "getForm1RegistrationPrincipalEmployerDetail")
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: GenericFormModel<IOSH_Form_1_Registration_PrincipalEmployerDetail>) => {
            this.genericFormData = data;
            this.appFormStepsList = data.appFormStepsList;
            if (data.formModel) {
              this.Input_Form.patchValue(data.formModel);
            }
          });
      });
    });

    this.appHttpRequestHandlerService
      .httpGet(null, "CommonApis", "getalldistrict")
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericFormModel<ProjectSite>) => {
        this.allDistricts = data.formModel;
      });
  }

  public getTehsilsByDistrictRefId(districtRefId) {
    this.districtRefId = districtRefId;
    this.appHttpRequestHandlerService
      .httpGet({ id: districtRefId }, "CommonApis", "gettehsilsbydistrictrefid")
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data) => { this.allTehsil = data; });
  }

  addEmployer() {
    const newEmployer = {
      ...this.Input_Form.value,
      projectSiteRefId: this.paramInfo?.projectSiteRefId,
      applicationType: 101,
      applicationPurposeType: this.paramInfo?.applicationPurposeType,
      iPin: this.paramInfo?.iPin,
      investPunjab_AppId: this.paramInfo?.investPunjab_AppId,
      factoryCircleRefId: 1,
      projectSiteVersion: this.paramInfo?.projectSiteVersion,
      toDoActivityModeType: 1,
      rootActivityRefId: 'defaultValue',
      toDoActivityCategoryType: 1018
    };
    this.employerList.push(newEmployer);
    this.Input_Form.reset();
    Swal.fire({
      icon: 'success',
      title: 'Saved Successfully!',
      text: 'Principal Employer data has been added successfully!',
      confirmButtonColor: '#3085d6',
      timer: 2000,
      showConfirmButton: false
    });
  }

  deleteEmployer(index: number) {
    this.employerList.splice(index, 1);
  }

  resetForm() {
    this.Input_Form.reset();
  }

  onSubmit(): void {
    if (this.employerList.length === 0) {
      Swal.fire({ icon: 'error', title: 'Please add at least one principal employer' });
      return;
    }

    const updatedEmployers = this.employerList.map(emp => ({
      ...emp,
      projectSiteRefId: this.paramInfo?.projectSiteRefId,
      applicationType: 101,
      applicationPurposeType: this.paramInfo?.applicationPurposeType,
      iPin: this.paramInfo?.iPin,
      investPunjab_AppId: this.paramInfo?.investPunjab_AppId,
      factoryCircleRefId: 1,
      projectSiteVersion: this.paramInfo?.projectSiteVersion,
      toDoActivityModeType: 1,
      rootActivityRefId: 'defaultValue',
      toDoActivityCategoryType: 1018
    }));

    this.saveEmployersSequentially(updatedEmployers, 0);
  }

  private saveEmployersSequentially(list: any[], index: number) {
    if (index >= list.length) {
      Swal.fire({
        icon: 'success',
        title: 'All Principal Employers Saved Successfully!',
        timer: 1500,
        showConfirmButton: false
      });

      this.router.navigate(
        [this.appFormStepsList.find(x => x.stepCode == 'CON').uiNextPageComponentPath],
        {
          queryParams: {
            info: this.commonOpsService.encodeQueryParamsInBase64({
              identityKey: list[list.length - 1].id,
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
        list[index],"pbsamadhannetcoreapi.Models.OSH_Form_1_Registration_PrincipalEmployerDetail","Crud", "CreateUpdate").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: () => this.saveEmployersSequentially(list, index + 1),
        error: () => Swal.fire({
          icon: 'error',
          title: 'Error saving principal employer at position ' + (index + 1)
        })
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}