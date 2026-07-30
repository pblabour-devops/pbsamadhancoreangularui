import { Component, ElementRef, HostListener } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import Swal from 'sweetalert2';
import { IComplaint_RecoveryOfMoneyUnderIRCode, MoneyDueReasonType } from '../../samadhaan-typed-modelts';

@Component({
  selector: 'app-recover-of-money',
  standalone: false,
  templateUrl: './recover-of-money.component.html',
  styleUrl: './recover-of-money.component.css',
})
export class RecoverOfMoneyComponent {
 protected ngUnsubscribe: Subject<void> = new Subject<void>();

  public appFormStepsList: any[] = [];
  public paramInfo: any;
  public parmamEncodedinfo: string;

  genericFormData: GenericFormModel<IComplaint_RecoveryOfMoneyUnderIRCode>;

  // Options for the multi-select checkbox dropdown (bound to MoneyDueReasons flags enum)
  moneyDueReasonOptions :any
  isDropdownOpen = false;

  constructor(
    private fb: UntypedFormBuilder,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    public commonOpsService: CommonOpsService,
    private elementRef: ElementRef
  ) {}

  Input_Form: TForm<IComplaint_RecoveryOfMoneyUnderIRCode> = this.fb.group({
    id: [0, Validators.required],

    dateOfDemandNoticeServed: ['', Validators.required],
    moneyDueReasons: [0, [Validators.required, Validators.min(1)]],

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
    rootActivityRefId: ['defaultValue', Validators.required],
    toDoActivityCategoryType: [1017, Validators.required],
  }) as TForm<IComplaint_RecoveryOfMoneyUnderIRCode>;

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
          .httpGet({ id: this.paramInfo?.appRefId }, 'Complaints', 'getComplaintRecoveryOfMoneyUnderIRCode')
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: GenericFormModel<IComplaint_RecoveryOfMoneyUnderIRCode>) => {
            this.genericFormData = data;
            this.appFormStepsList = data.appFormStepsList;
              this.moneyDueReasonOptions = data.enumTemplateLists?.find(x => x.selectListTypeCode === 'MoneyDueReasonTypeEnum')?.selectListItems ?? [];


            if (data.formModel) {
              this.Input_Form.patchValue(data.formModel);
            }
          });
      });
    });
  }

  // ---------- Multi-select checkbox dropdown (bitmask) helpers ----------

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  isReasonSelected(value: number): boolean {
    const current = this.formControls.moneyDueReasons.value || 0;
    return (current & value) === value;
  }

  toggleReason(value: number): void {
    let current = this.formControls.moneyDueReasons.value || 0;

    if (this.isReasonSelected(value)) {
      current &= ~value; // remove flag
    } else {
      current |= value; // add flag
    }

    this.formControls.moneyDueReasons.setValue(current);
    this.formControls.moneyDueReasons.markAsTouched();
  }

  get selectedReasonsLabel(): string {
    const current = this.formControls.moneyDueReasons.value || 0;

    if (current === 0) {
      return 'Select';
    }

    const selectedLabels = this.moneyDueReasonOptions
      .filter((opt) => (current & opt.value) === opt.value)
      .map((opt) => opt.text);

    return selectedLabels.length ? selectedLabels.join(', ') : 'Select';
  }

  @HostListener('document:click', ['$event'])
  onOutsideClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }

  // ---------- Action handlers ----------

  resetForm() {
    this.Input_Form.reset({ moneyDueReasons: 0 });
    this.Input_Form.patchValue({ id: 0, appRefId: this.paramInfo?.appRefId });
  }

  onSaveDraft(): void {
// Call save-draft API service here
  }

  onBack(): void {
}

  onPreview(): void {
    if (this.Input_Form.invalid) {
      this.Input_Form.markAllAsTouched();
      return;
    }

    const payload = {
      ...this.Input_Form.value,
      projectSiteRefId: this.paramInfo?.projectSiteRefId,
      applicationPurposeType: this.paramInfo?.applicationPurposeType,
      iPin: this.paramInfo?.iPin,
      investPunjab_AppId: this.paramInfo?.investPunjab_AppId,
      projectSiteVersion: this.paramInfo?.projectSiteVersion,
      factoryCircleRefId: 1,
      toDoActivityModeType: 1,
      rootActivityRefId: 'defaultValue',
      toDoActivityCategoryType: 1017,
    };

    this.appHttpRequestHandlerService
      .httpPost(
        payload,
        'pbsamadhannetcoreapi.Models.Complaint_RecoveryOfMoneyUnderIRCode',
        'Crud',
        'CreateUpdate'
      )
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Saved Successfully!',
            timer: 1500,
            showConfirmButton: false,
          });

          this.router.navigate(
            [this.appFormStepsList.find((x) => x.stepCode == 'REC')?.uiNextPageComponentPath],
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
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error saving details',
          });
        },
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
