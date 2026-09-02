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
import { ICRUD_CreateUpdateOperationResponse } from 'src/app/typed-model/crud-typed-models';

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
      maternityDischargeType: [null],

      maternityBenefitAmountDue: [0, [Validators.required, Validators.min(0)]],
      medicalBonusMaternityAmountDue: [0, [Validators.required, Validators.min(0)]],
      wagesForMaternityLeaveAmountDue: [0, [Validators.required, Validators.min(0)]],

      // application context (NotMapped)
      appRefId: [0, Validators.required],
      applicationType: [100001, Validators.required],
      applicationPurposeType: [0, Validators.required],
      projectSiteVersion: [0, Validators.required],
      toDoActivityModeType: [1, Validators.required],
      rootActivityRefId: ['defaultValue'],
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
        this.Input_Form.controls.appRefId.patchValue(this.paramInfo?.appRefId);

        this.appHttpRequestHandlerService
          .httpGet({ id: this.paramInfo?.appRefId }, 'Complaints', 'getMaternityBenefitsComplaintDetails')
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: GenericFormModel<IComplaint_MaternityBenefitComplaint>) => {
            this.applicableOptions = data.enumTemplateLists.find(e => e.selectListTypeCode === 'MaternityDischargeTypeEnum').selectListItems
            this.genericFormData = data;
            this.appFormStepsList = data.appFormStepsList;
            if (data.formModel) {
              this.Input_Form.patchValue(data.formModel);
              
              this.Input_Form.controls.toDoActivityModeType.patchValue(2);
              
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
    const applicableOptionControl = this.formControls.maternityDischargeType;

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
    this.formControls.maternityDischargeType.clearValidators();
    this.formControls.maternityDischargeType.updateValueAndValidity();
  }

  onSaveDraft(): void {
// Call save-draft API service here
  }

  onBack(): void {
}

  onSubmit(): void {
    
    if (this.Input_Form.valid) {

    this.Input_Form.controls.applicationPurposeType.patchValue(this.paramInfo?.applicationPurposeType);
    this.Input_Form.controls.projectSiteVersion.patchValue(this.paramInfo?.projectSiteVersion);
    this.Input_Form.controls.rootActivityRefId.patchValue('Default');
    this.Input_Form.controls.toDoActivityCategoryType.patchValue(2006);
    this.appHttpRequestHandlerService
  .httpPost(
    this.Input_Form.value,
    'pbsamadhannetcoreapi.Models.Complaint_MaternityBenefitComplaint',
    'Crud',
    'CreateUpdate'
  )
  .pipe(takeUntil(this.ngUnsubscribe))
  .subscribe((data: ICRUD_CreateUpdateOperationResponse) => {
    this.router.navigate(
      [this.appFormStepsList.find(x => x.stepCode === 'MBC')?.uiNextPageComponentPath],
      {
        queryParams: {
          info: this.commonOpsService.encodeQueryParamsInBase64({
            identityKey: data.entityKeyId,
            appRefId: this.paramInfo.appRefId,
            applicationType: 100001,
            applicationPurposeType: 0,
            projectSiteVersion: 1,
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
