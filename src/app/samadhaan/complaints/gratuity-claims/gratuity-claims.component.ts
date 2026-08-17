import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { IComplaint_GratuityClaim } from '../../samadhaan-typed-modelts';
import { ICRUD_CreateUpdateOperationResponse } from 'src/app/typed-model/crud-typed-models';

@Component({
  selector: 'app-gratuity-claims',
  standalone: false,
  templateUrl: './gratuity-claims.component.html',
  styleUrl: './gratuity-claims.component.css',
})
export class GratuityClaimsComponent {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();

  public appFormStepsList: any[] = [];
  public paramInfo: any;
  public parmamEncodedinfo: string;

  genericFormData: GenericFormModel<IComplaint_GratuityClaim>;

  basisOfClaimOptions :any

  maritalStatusOptions:any

  yesNoOptions = [
    { id: true, text: 'Yes' },
    { id: false, text: 'No' },
  ];

  constructor(
    private fb: UntypedFormBuilder,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    public commonOpsService: CommonOpsService
  ) {}

  Input_Form: TForm<IComplaint_GratuityClaim> = this.fb.group({
    id: [0, Validators.required],

    // Claim Information
    basisOfClaimType: ['', Validators.required],
    employmentStartDate: [''],
    employmentEndDate: [''],
    yearsOfContinuousService: ['', Validators.required],
    isApplicationMadeToEmployer: ['', Validators.required],
    disputeDetails: ['', Validators.maxLength(2000)],

    // Annexure
    applicantNameAndAddress: ['', [Validators.required, Validators.maxLength(500)]],
    claimBasisDescription: ['', [Validators.required, Validators.maxLength(500)]],
    employeeNameAndAddress: ['', [Validators.required, Validators.maxLength(500)]],
    maritalStatus: ['', Validators.required],
    employerNameAndAddress: ['', [Validators.required, Validators.maxLength(500)]],
    department: ['', Validators.maxLength(300)],
    employeePost: ['', Validators.maxLength(300)],
    appointmentDate: [''],
    terminationDate: [''],
    terminationReason: ['', Validators.maxLength(500)],
    totalServicePeriod: ['', Validators.required],
    lastDrawnWages: ['', [Validators.required]],
    nominationNumber: ['', Validators.maxLength(200)],
    nominationRecordingDate: [''],
    totalGratuityPayable: [''],
    gratuityPercentagePayable: [''],
    gratuityAmountClaimed: ['', [Validators.required]],
    claimDate: ['', Validators.required],
    place: ['', [Validators.required, Validators.maxLength(300)]],

    // application context (NotMapped)
    appRefId: [0, Validators.required],
    projectSiteRefId: [0, Validators.required],
    applicationType: [101, Validators.required],
    applicationPurposeType: [1, Validators.required],
    iPin: [0, Validators.required],
    investPunjab_AppId: [0, Validators.required],
    factoryCircleRefId: [1, Validators.required],
    projectSiteVersion: [0, Validators.required],
    toDoActivityModeType: [1, Validators.required],
    rootActivityRefId: ['defaultValue'],
    toDoActivityCategoryType: [2005, Validators.required],
  }) as TForm<IComplaint_GratuityClaim>;

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
          .httpGet({ id: this.paramInfo?.appRefId }, 'Complaints', 'getGratuityClaimDetails')
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: GenericFormModel<IComplaint_GratuityClaim>) => {
            this.genericFormData = data;
            this.appFormStepsList = data.appFormStepsList;
            this.basisOfClaimOptions = data.enumTemplateLists
            ?.find(x => x.selectListTypeCode === 'GratuityClaimBasisTypeEnum')
            ?.selectListItems ?? [];
        
          this.maritalStatusOptions = data.enumTemplateLists
            ?.find(x => x.selectListTypeCode === 'MaritalStatusTypeEnum')
            ?.selectListItems ?? [];

            if (data.formModel) {
               const formData = data.formModel;
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
                this.Input_Form.patchValue({ toDoActivityModeType: 2});
                this.Input_Form.patchValue({rootActivityRefId : 'defaultValue'});
                this.calculateContinuousService();
                this.calculateTotalServicePeriod();
            }
          });
      });
    });

    // Recalculate derived fields whenever start/end dates change
    this.formControls.employmentStartDate.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => this.calculateContinuousService());

    this.formControls.employmentEndDate.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => this.calculateContinuousService());

    this.formControls.appointmentDate.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => this.calculateTotalServicePeriod());

    this.formControls.terminationDate.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => this.calculateTotalServicePeriod());
  }

  private calculateContinuousService(): void {
    const startDateValue = this.formControls.employmentStartDate.value;
    const endDateValue = this.formControls.employmentEndDate.value;

    if (!startDateValue || !endDateValue) {
      this.formControls.yearsOfContinuousService.setValue('', { emitEvent: false });
      return;
    }

    const startDate = new Date(startDateValue);
    const endDate = new Date(endDateValue);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()) || startDate > endDate) {
      this.formControls.yearsOfContinuousService.setValue('', { emitEvent: false });
      return;
    }

    const yearDifference = endDate.getFullYear() - startDate.getFullYear();
    const monthDifference = endDate.getMonth() - startDate.getMonth();
    const dayDifference = endDate.getDate() - startDate.getDate();

    const completedYears =
      monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)
        ? yearDifference - 1
        : yearDifference;

    this.formControls.yearsOfContinuousService.setValue(completedYears, { emitEvent: false });
  }

  private calculateTotalServicePeriod(): void {
    const appointment = this.formControls.appointmentDate.value;
    const termination = this.formControls.terminationDate.value;

    if (appointment && termination) {
      const days = Math.round(
        (new Date(termination).getTime() - new Date(appointment).getTime()) / (1000 * 60 * 60 * 24)
      );
      this.formControls.totalServicePeriod.setValue(`${days} days`, { emitEvent: false });
    }
  }

  resetForm() {
    this.Input_Form.reset();
    this.Input_Form.patchValue({ id: 0, appRefId: this.paramInfo?.appRefId });
  }

  onSaveDraft(): void {
// Call save-draft API service here
  }

  onBack(): void {
}

  onSubmit(): void {
    if (this.Input_Form.valid) {

    this.Input_Form.controls.applicationPurposeType.patchValue(0);
    this.Input_Form.controls.projectSiteVersion.patchValue(1);
    this.Input_Form.controls.rootActivityRefId.patchValue('Default');
    this.Input_Form.controls.toDoActivityCategoryType.patchValue(2005);
    this.Input_Form.controls.applicationType.patchValue(100001);
    this.appHttpRequestHandlerService
        .httpPost(
          this.Input_Form.value,
          'pbsamadhannetcoreapi.Models.Complaint_GratuityClaim',
          'Crud',
          'CreateUpdate'
        )
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data: ICRUD_CreateUpdateOperationResponse) => {
          this.router.navigate(
            [this.appFormStepsList.find(x => x.stepCode === 'GC')?.uiNextPageComponentPath],
            {
              queryParams: {
                info: this.commonOpsService.encodeQueryParamsInBase64({
                  identityKey: data.entityKeyId,
                  appRefId:this.paramInfo.appRefId,
                  applicationType: 100001,
                  applicationPurposeType: this.paramInfo?.applicationPurposeType,
                  projectSiteVersion: this.paramInfo?.projectSiteVersion,
                }),
              },
            }
          );
        });
    } else {
      this.Input_Form.markAllAsTouched();
      Object.keys(this.Input_Form.controls).forEach(key => {
        const control = this.Input_Form.get(key);
    
        if (control?.invalid) {
          
}
      });
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
