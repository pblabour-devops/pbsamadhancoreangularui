import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppFormStepsInfo, GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { IComplaint_EmployerDetail, IComplaint_WorkplaceDetail, IComplaint_EstablishmentDetail } from 'src/app/samadhaan/samadhaan-typed-modelts';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { ICRUD_CreateUpdateOperationResponse } from 'src/app/typed-model/crud-typed-models';
import Swal from 'sweetalert2';
import { EstablishmentDetailsComponent } from '../establishment-details/establishment-details.component';
import { WorkplaceDetailsComponent } from '../workplace-details/workplace-details.component';

@Component({
  selector: 'app-employer-details',
  standalone: false,
  templateUrl: './employer-details.component.html',
  styleUrl: './employer-details.component.css',
})
export class EmployerDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(WorkplaceDetailsComponent)
  WorkplaceDetailsComponent: WorkplaceDetailsComponent;
  @ViewChild(EstablishmentDetailsComponent)
  EstablishmentDetailsComponent: EstablishmentDetailsComponent;
  public appFormStepsList: any[];
  paramInfo: any
  ngUnsubscribe = new Subject<void>();
  allDistricts: any[] = [];
  public parmamEncodedinfo: string;
  genericFormData: GenericFormModel<IComplaint_EmployerDetail>;
  establishments: any[] = []
  employerList: IComplaint_EmployerDetail[] = [];
  workPlaceDetailData: IComplaint_WorkplaceDetail
  establishmentDetailData: IComplaint_EstablishmentDetail

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public commonOpsService: CommonOpsService,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService) { }

  ngOnInit(): void { }

  Input_Form: TForm<IComplaint_EmployerDetail> = this.fb.group({
    id: [0, Validators.required],
    appRefId: [0, Validators.required],
    isEngagedThroughContractor: [true, Validators.required],
    isEstablishmentCentralGovernment: [true, Validators.required],
    establishmentType: [''],
    employerORContractorNameAndDesignation: ['', [Validators.required, Validators.maxLength(300)]],
    employerORContractorAddress: ['', [Validators.required, Validators.maxLength(500)]],
    state: ['', Validators.required],
    districtRefId: ['', Validators.required],
    pinCode: ['', [Validators.required, Validators.maxLength(10)]],
    mobileNumber: ['', [Validators.required, Validators.maxLength(10)]],
    email: ['', [Validators.email, Validators.maxLength(200)]],
    applicationPurposeType: [1, Validators.required],
    applicationType: [101, Validators.required],
    projectSiteVersion: [0, Validators.required],
    toDoActivityModeType: [1, Validators.required],
    toDoActivityCategoryType: [1017, Validators.required],
    rootActivityRefId: ['defaultValue', Validators.required],
  }) as TForm<IComplaint_EmployerDetail>;

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
            console.log('employer data', data);
            this.genericFormData = data;
            this.appFormStepsList = data.appFormStepsList;
            this.establishments = data.enumTemplateLists.find(e => e.selectListTypeCode == 'SamadhaanEstablishmentTypeEnum').selectListItems
            if (data.formModel && Array.isArray(data.formModel)) {
              this.employerList = [];
              data.formModel.forEach((item: any) => {
                const formData = { ...item };
                Object.keys(formData).forEach(key => {
                  if (
                    formData[key] &&
                    typeof formData[key] === 'string' &&
                    formData[key].includes('T')
                  ) {
                    formData[key] = formData[key].split('T')[0];
                  }
                });
                this.Input_Form.patchValue(formData);
                this.Input_Form.patchValue({ toDoActivityModeType: 2 });
                this.Input_Form.patchValue({ rootActivityRefId: 'defaultValue' });
                this.addEmployer();
              });
            }
          });
      });
    });

    this.getDistricts();
  }

  addEmployer() {
    this.Input_Form.patchValue({
      appRefId: this.paramInfo?.appRefId,
      applicationType: 100001,
      applicationPurposeType: 0,
      projectSiteVersion: 1,
      rootActivityRefId: 'defaultValue',
      toDoActivityCategoryType: 2001,
    });

    if (this.Input_Form.valid) {

      this.employerList.push({ ...this.Input_Form.value });


      this.Input_Form.reset({
        id: 0,
        isEngagedThroughContractor: true,
        isEstablishmentCentralGovernment: true,
        appRefId: this.paramInfo?.appRefId,
        applicationType: 100001,
        applicationPurposeType: 0,
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

  getDistricts(): void {
    this.appHttpRequestHandlerService.httpGet(null, "CommonApis", "getalldistrict")
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericFormModel<any>) => {
        this.allDistricts = data.formModel.filter(
          district => district.stateRefId === 3
        );
      });
  }



  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  resetForm() {
    this.Input_Form.reset({
      isEngagedThroughContractor: true,
    });
    this.Input_Form.patchValue({ id: 0, appRefId: this.paramInfo?.appRefId });
  }

  deleteEmployer(index: number) {
    this.employerList.splice(index, 1);
  }


  // new

  workPlaceDetailDataEventListener(data: IComplaint_WorkplaceDetail) {
    this.workPlaceDetailData = data;
  }

  establishmentDetailDataEventListener(data: IComplaint_EstablishmentDetail) {
    this.establishmentDetailData = data;
  }

  onSubmit(): void {

    if (!this.WorkplaceDetailsComponent?.isFormValid()) {
      Swal.fire({ icon: 'warning', text: 'Please fill Workplace detail completely.' });
      return;
    }

    if (!this.EstablishmentDetailsComponent?.isFormValid()) {
      Swal.fire({ icon: 'warning', text: 'Please fill Establishment detail completely.' });
      return;
    }
    if (this.employerList.length > 0) {
      // ---------- Step 1: Save Workplace Detail (ONCE) ----------
      this.workPlaceDetailData.appRefId = this.paramInfo?.appRefId;
      this.workPlaceDetailData.applicationPurposeType = 0;
      this.workPlaceDetailData.projectSiteVersion = 1;
      this.workPlaceDetailData.rootActivityRefId = 'defaultValue';
      this.workPlaceDetailData.toDoActivityCategoryType = 2002;
      this.workPlaceDetailData.applicationType = 100001;

      this.appHttpRequestHandlerService
        .httpPost(this.workPlaceDetailData, "pbsamadhannetcoreapi.Models.Complaint_WorkplaceDetail", "Crud", "CreateUpdate")
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((workplaceRspData: ICRUD_CreateUpdateOperationResponse) => {

          // ---------- Step 2: Save Establishment Detail (ONCE) ----------
          this.establishmentDetailData.appRefId = this.paramInfo?.appRefId;
          this.establishmentDetailData.applicationPurposeType = 0;
          this.establishmentDetailData.projectSiteVersion = 1;
          this.establishmentDetailData.rootActivityRefId = 'defaultValue';
          this.establishmentDetailData.toDoActivityCategoryType = 2003;
          this.establishmentDetailData.applicationType = 100001;

          this.appHttpRequestHandlerService
            .httpPost(this.establishmentDetailData, "pbsamadhannetcoreapi.Models.Complaint_EstablishmentDetail", "Crud", "CreateUpdate")
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((establishmentRspData: ICRUD_CreateUpdateOperationResponse) => {

              // ---------- Step 3: Save ALL Employer/Contractor records LAST ----------
              if (!this.employerList || this.employerList.length === 0) {
                this.navigateToNextStep(establishmentRspData);
                return;
              }

              const employerSaveRequests$ = this.employerList.map((element) =>
                this.appHttpRequestHandlerService.httpPost(
                  element,
                  "pbsamadhannetcoreapi.Models.Complaint_EmployerORContractorDetail",
                  "Crud",
                  "CreateUpdate"
                )
              );

              // Wait for ALL employer/contractor saves (however many there are) to complete
              forkJoin(employerSaveRequests$)
                .pipe(takeUntil(this.ngUnsubscribe))
                .subscribe((empFormRspDataArray: any) => {
                  // ✅ All employer/contractor records saved successfully — navigate ONCE
                  this.navigateToNextStep(establishmentRspData);
                });
            });
        });
    } else {
      Swal.fire({ icon: 'warning', text: 'Please add at least one Employer/Contractor detail.' });
    }
  }

  private navigateToNextStep(rspData: ICRUD_CreateUpdateOperationResponse): void {
    this.router.navigate(
      [this.appFormStepsList.find((x) => x.stepCode == 'EED')?.uiNextPageComponentPath],
      {
        queryParams: {
          info: this.commonOpsService.encodeQueryParamsInBase64({
            identityKey: rspData.entityKeyId,
            appRefId: this.paramInfo?.appRefId,
            applicationType: 100001,
            applicationPurposeType: this.paramInfo?.applicationPurposeType,
            projectSiteVersion: this.paramInfo?.projectSiteVersion,
          }),
        },
      }
    );
  }

  // end
}
