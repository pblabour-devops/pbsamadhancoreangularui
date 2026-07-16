import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { IOSH_Form_1_Registration_ContractorDetail } from '../osh-code-typed-models';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProjectSite } from 'src/app/project-site/project-site-typed-module';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-form1-registration-contractors-details',
    templateUrl: './form1-registration-contractors-details.component.html',
    styleUrls: ['./form1-registration-contractors-details.component.css'],
    standalone: false
})
export class Form1RegistrationContractorsDetailsComponent implements OnInit, AfterViewInit, OnDestroy {

  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  districtRefId: any;
  allDistricts: any = [];
  allTehsil: any = [];
  employerList: IOSH_Form_1_Registration_ContractorDetail[] = [];
  public appFormStepsList: any[];
  public paramInfo: any;
  public parmamEncodedinfo: string;
  public projectSiteRefId: any;
  public appRefId: any;
  public projectSiteVersion: any;
  genericFormData: GenericFormModel<IOSH_Form_1_Registration_ContractorDetail>;

  constructor(
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private router: Router,
    public commonOpsService: CommonOpsService
  ) { }

  Input_Form: TForm<IOSH_Form_1_Registration_ContractorDetail> = this.fb.group({
    id: [0, Validators.required],
    isEstablishmentEngagedContractor: [false, Validators.required],
    principalEmployerName: ['', Validators.required],
    contractorName: ['', [Validators.required, Validators.maxLength(100)]],
    nameAndLocationOfWork: ['', Validators.required],
    premiseName: ['', [Validators.required, Validators.maxLength(500)]],
    subLocality_OR_Street_OR_ColonyName: ['', [Validators.required, Validators.maxLength(500)]],
    locality_OR_Landmark: ['', [Validators.required, Validators.maxLength(500)]],
    villageOrTown: ['', [Validators.required, Validators.maxLength(100)]],
    state: ['', Validators.required],
    tehsilRefId: ['', Validators.required],
    districtRefId: ['', Validators.required],
    pinCode: ['', [Validators.required, Validators.maxLength(6)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    mobileNo: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
    panNumber: ['', [Validators.required, Validators.maxLength(15)]],
    nameOnPan: ['', [Validators.required, Validators.maxLength(500)]],
    dateOfBirth: ['', Validators.required],
    maxNoOfContractLabourToBeEmployed: [0, Validators.required],
    dateOfCommencementOfWork: ['', Validators.required],
    dateOfCompletionOfWork: ['', Validators.required],

    // --- Additional required fields for backend ---
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
    toDoActivityCategoryType: [1017, Validators.required]

  }) as TForm<IOSH_Form_1_Registration_ContractorDetail>;

  get formControls() { return this.Input_Form.controls; }

  ngOnInit(): void {
    this.Input_Form.get('isEstablishmentEngagedContractor')?.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((val: boolean) => {
        if (!val) {
          this.Input_Form.reset({ isEstablishmentEngagedContractor: false });
          this.employerList = [];
        }
      });
  }

  ngAfterViewInit(): void {
    this.route.queryParams.subscribe(params => {
      this.parmamEncodedinfo = params.info;
      this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info) => {
        this.paramInfo = info;
        this.projectSiteRefId = this.paramInfo?.projectSiteRefId;
        this.appRefId = this.paramInfo?.appRefId;
        this.projectSiteVersion = this.paramInfo?.projectSiteVersion;

        this.appHttpRequestHandlerService.httpGet({ id: this.paramInfo?.appRefId }, "OSH_Form_1_Registration", "getForm1RegistrationContractorDetail")
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: GenericFormModel<IOSH_Form_1_Registration_ContractorDetail>) => {
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

      this.appHttpRequestHandlerService.httpGet(null, "CommonApis", "getalldistrict")
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data: GenericFormModel<ProjectSite>) => {
          this.allDistricts = data.formModel;
        });
    });
  }

  public getTehsilsByDistrictRefId(districtRefId: any) {
    this.districtRefId = districtRefId;
    this.appHttpRequestHandlerService.httpGet({ id: districtRefId }, "CommonApis", "gettehsilsbydistrictrefid")
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data) => {
        this.allTehsil = data;
      });
  }

  addEmployer() {
    const newContractor = {
      ...this.Input_Form.value,
      projectSiteRefId: this.projectSiteRefId,
      appRefId: this.appRefId,
      applicationType: 101,
      applicationPurposeType: this.paramInfo?.applicationPurposeType,
      iPin: this.paramInfo?.iPin,
      investPunjab_AppId: this.paramInfo?.investPunjab_AppId,
      factoryCircleRefId: 1,
      projectSiteVersion: this.projectSiteVersion,
      toDoActivityModeType: 1,
      rootActivityRefId: 'defaultValue',
      toDoActivityCategoryType: 1017
    };
    this.employerList.push(newContractor);

    this.Input_Form.reset({ isEstablishmentEngagedContractor: true });
    Swal.fire({
      icon: 'success',
      title: 'Saved Successfully!',
      text: 'Contractor data has been added successfully!',
      confirmButtonColor: '#3085d6',
      timer: 2000,
      showConfirmButton: false
    });
  }

  deleteEmployer(index: number) {
    this.employerList.splice(index, 1);
  }

  resetForm() {
    this.Input_Form.reset({ isEstablishmentEngagedContractor: true });
  }

  onSubmit(): void {
    if (!this.Input_Form.get('isEstablishmentEngagedContractor')?.value) return;

    if (this.employerList.length === 0) {
      Swal.fire({ icon: 'error', title: 'Please add at least one contractor' });
      return;
    }

    const updatedList = this.employerList.map(emp => ({
      ...emp,
      projectSiteRefId: this.projectSiteRefId,
      appRefId: this.appRefId,
      applicationType: 101,
      applicationPurposeType: this.paramInfo?.applicationPurposeType,
      iPin: this.paramInfo?.iPin,
      investPunjab_AppId: this.paramInfo?.investPunjab_AppId,
      factoryCircleRefId: 1,
      projectSiteVersion: this.projectSiteVersion,
      toDoActivityModeType: 1,
      rootActivityRefId: 'defaultValue',
      toDoActivityCategoryType: 1017
    }));

    this.saveEmployersSequentially(updatedList, 0);
  }

  private saveEmployersSequentially(list: any[], index: number) {
    if (index >= list.length) {
      Swal.fire({
        icon: 'success',
        title: 'All Contractors Saved Successfully!',
        timer: 1500,
        showConfirmButton: false
      });

      this.router.navigate(
        [this.appFormStepsList.find(x => x.stepCode == 'ED').uiNextPageComponentPath],
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

    this.appHttpRequestHandlerService.httpPost(list[index],
      "pbsamadhannetcoreapi.Models.OSH_Form_1_Registration_ContractorDetail",
      "Crud", "CreateUpdate")
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: () => this.saveEmployersSequentially(list, index + 1),
        error: () => Swal.fire({
          icon: 'error',
          title: 'Error saving contractor at position ' + (index + 1)
        })
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}