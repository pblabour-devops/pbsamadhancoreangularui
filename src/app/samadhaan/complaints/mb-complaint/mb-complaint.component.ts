import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import Swal from 'sweetalert2';
import { IComplaint_MaternityBenefitComplaint } from '../../samadhaan-typed-modelts';

@Component({
  selector: 'app-mb-complaint',
  standalone: false,
  templateUrl: './mb-complaint.component.html',
  styleUrl: './mb-complaint.component.css',
})
export class MbComplaintComponent {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();

  public appFormStepsList: any[] = [];
  public paramInfo: any;
  public parmamEncodedinfo: string;

  genericFormData: GenericFormModel<IComplaint_MaternityBenefitComplaint>;

  yesNoOptions = [
    { id: true, text: 'Yes' },
    { id: false, text: 'No' },
  ];

  // NEW: Options for the conditional radio buttons
  applicableOptions : any
  constructor(
    private fb: UntypedFormBuilder,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    public commonOpsService: CommonOpsService
  ) {}

  Input_Form: TForm<IComplaint_MaternityBenefitComplaint> = this.fb.group(
    {
      id: [0, Validators.required],

      isDischargedOrDismissedDueToAbsence: ['', Validators.required],

      // NEW: Conditional field - no static validator, handled dynamically
      applicableOption: [null],

      maternityBenefitAmountDue: [0, [Validators.required, Validators.min(0)]],
      medicalBonusMaternityAmountDue: [0, [Validators.required, Validators.min(0)]],
      wagesForMaternityLeaveAmountDue: [0, [Validators.required, Validators.min(0)]],

      // application context (NotMapped)
      appRefId: [0, Validators.required],
      projectSiteRefId: [0, Validators.required],
      applicationType: [100001, Validators.required],
      applicationPurposeType: [1, Validators.required],
      iPin: [0, Validators.required],
      investPunjab_AppId: [0, Validators.required],
      factoryCircleRefId: [1, Validators.required],
      projectSiteVersion: [0, Validators.required],
      toDoActivityModeType: [1, Validators.required],
      rootActivityRefId: ['defaultValue', Validators.required],
      toDoActivityCategoryType: [1017, Validators.required],
    }
  ) as TForm<IComplaint_MaternityBenefitComplaint>;

  get formControls() {
    return this.Input_Form.controls;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.route.queryParams.subscribe((params) => {
      this.parmamEncodedinfo = params.info;

      this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info) => {
        this.paramInfo = info;
        console.log('info', this.paramInfo)
        this.Input_Form.controls.appRefId.patchValue(this.paramInfo?.appRefId);

        this.appHttpRequestHandlerService
          .httpGet({ id: this.paramInfo?.appRefId }, 'Complaints', 'getMaternityBenefitsComplaintDetails')
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: GenericFormModel<IComplaint_MaternityBenefitComplaint>) => {
            this.applicableOptions = data.enumTemplateLists.find(e => e.selectListTypeCode === 'MaternityDischargeOptionEnum').selectListItems
            this.genericFormData = data;
            this.appFormStepsList = data.appFormStepsList;

            if (data.formModel) {
              this.Input_Form.patchValue(data.formModel);
              // Ensure conditional validator state is set correctly after patch
              this.onDischargeStatusChange();
            }
          });
      });
    });
  }

  /**
   * NEW: Handles dynamic validation for applicableOption
   * based on isDischargedOrDismissedDueToAbsence value.
   */
  onDischargeStatusChange(): void {
    const isDischarged = this.formControls.isDischargedOrDismissedDueToAbsence.value;
    const applicableOptionControl = this.formControls.applicableOption;

    const isYes = isDischarged === true || isDischarged === 'true';

    if (isYes) {
      applicableOptionControl.setValidators([Validators.required]);
    } else {
      applicableOptionControl.clearValidators();
      applicableOptionControl.setValue(null);
    }
    applicableOptionControl.updateValueAndValidity();
  }

  resetForm() {
    this.Input_Form.reset({
      maternityBenefitAmountDue: 0,
      medicalBonusMaternityAmountDue: 0,
      wagesForMaternityLeaveAmountDue: 0,
      applicableOption: null,
    });
    this.Input_Form.patchValue({ id: 0, appRefId: this.paramInfo?.appRefId });
    this.formControls.applicableOption.clearValidators();
    this.formControls.applicableOption.updateValueAndValidity();
  }

  onSaveDraft(): void {
    console.log('Saved as Draft:', this.Input_Form.value);
    // Call save-draft API service here
  }

  onBack(): void {
    console.log('Navigate back to previous tab');
  }

  onSubmit(): void {
    if (this.Input_Form.valid) {

    this.Input_Form.controls.applicationPurposeType.patchValue(this.paramInfo?.applicationPurposeType);
    this.Input_Form.controls.iPin.patchValue(this.paramInfo?.iPin);
    this.Input_Form.controls.investPunjab_AppId.patchValue(this.paramInfo?.appRefId);
    this.Input_Form.controls.projectSiteVersion.patchValue(this.paramInfo?.projectSiteVersion);
    this.Input_Form.controls.projectSiteRefId.patchValue(this.paramInfo?.projectSiteRefId); // static 
    this.Input_Form.controls.factoryCircleRefId.patchValue(1); // Static FactoryCircleRefId
    this.Input_Form.controls.toDoActivityModeType.patchValue(1);
    this.Input_Form.controls.rootActivityRefId.patchValue('Default');
    this.Input_Form.controls.toDoActivityCategoryType.patchValue(2006);
    this.Input_Form.controls.id.patchValue(0);
    console.log('input form', this.Input_Form.value);

    this.appHttpRequestHandlerService
      .httpPost(this.Input_Form.value,'pbsamadhannetcoreapi.Models.Complaint_MaternityBenefitComplaint','Crud','CreateUpdate').pipe(takeUntil(this.ngUnsubscribe)).subscribe({
        next: () => {
          this.router.navigate(
            [this.appFormStepsList.find((x) => x.stepCode == 'GRA')?.uiNextPageComponentPath],
            {
              queryParams: {
                info: this.commonOpsService.encodeQueryParamsInBase64({
                  appRefId: this.paramInfo?.appRefId,
                  applicationType: this.paramInfo.applicationType,
                  projectSiteRefId: this.paramInfo?.projectSiteRefId,
                  applicationPurposeType: this.paramInfo?.applicationPurposeType,
                  investPunjab_AppId: this.paramInfo?.investPunjab_AppId,
                  iPin: this.paramInfo?.iPin,
                  projectSiteVersion: this.paramInfo?.projectSiteVersion,
                }),
              },
            }
          );
        }
      });
    } else {
      this.Input_Form.markAllAsTouched();
      Object.keys(this.Input_Form.controls).forEach(key => {
        const control = this.Input_Form.get(key);
    
        if (control?.invalid) {
          console.log(`${key} is invalid`, control.errors);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
