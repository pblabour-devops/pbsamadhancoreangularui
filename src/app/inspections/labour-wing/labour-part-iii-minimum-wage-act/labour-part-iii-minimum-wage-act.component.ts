import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonService } from 'src/app/common/common.service';
import { TForm, GenericFormModel } from 'src/app/generic-implementation/generic-form-builder.type';
import { GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { Inspection_Form_Labour_III_MinimumWageAct } from '../../Inspections-typed-models';


@Component({
    selector: 'app-labour-part-iii-minimum-wage-act',
    templateUrl: './labour-part-iii-minimum-wage-act.component.html',
    styleUrls: ['./labour-part-iii-minimum-wage-act.component.css'],
    standalone: false
})
export class LabourPartIiiMinimumWageActComponent implements OnInit {
  @Input() jsonData: any;
  Input_Form: TForm<Inspection_Form_Labour_III_MinimumWageAct>;
  private ngUnsubscribe = new Subject<void>();
  genericFormData: GenericFormModel<Inspection_Form_Labour_III_MinimumWageAct>;
  submitted: boolean = false;
  hasSubmitClicked: boolean = false;
  defaultValue:"N/A";
  characterCounts: { [key: string]: number } = {};
  controlMaxLengthNames: { [key: string]: number } = {};
  public parmamEncodedinfo:string;
  public paramInfo:any;
  public hasViolationFound : string;
  constructor(
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    public commonOpsService: CommonOpsService,
    public common: CommonService,
    private fb: UntypedFormBuilder,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.Input_Form = this.fb.group({
      id: [0,Validators.required],
      sec_12_IsWagesPaid_ToAll_FixedByGovernment_UnderSection_5: ['-1'],
      sec_12_IsWagesPaid_ToAll_FixedByGovernment_UnderSection_5_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_13_IsAllEmployeeWorking_AsFixedHoursBy_AppropriateGovernment: ['-1'],
      sec_13_IsAllEmployeeWorking_AsFixedHoursBy_AppropriateGovernment_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_13_IsRest_Given_ToEvery_Employee: ['-1'],
      sec_13_IsRest_Given_ToEvery_Employee_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_13_IsPayment_Overtime_Given: ['-1'],
      sec_13_IsPayment_Overtime_Given_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_15_IsWagesPaid_ForLessWorkingDays_AsPerSection_15: ['-1'],
      sec_15_IsWagesPaid_ForLessWorkingDays_AsPerSection_15_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      rule_21_IsTimeAndConditions_OfPayment_Complied: ['-1'],
      rule_21_IsTimeAndConditions_OfPayment_Complied_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      rule_21_IsDeductionMade_AsPrescribed: ['-1'],
      rule_21_IsDeductionMade_AsPrescribed_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      rule_21_Upon_EmployerOrAuthorized_Representative: ['-1'],
      rule_21_Upon_EmployerOrAuthorized_Representative_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      rule_21_IsMusterRoll_Form_V_Maintained: ['-1'],
      rule_21_IsMusterRoll_Form_V_Maintained_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      rule_26_B_IsRegistered_Preserved_For_Three_Years: ['-1'],
      rule_26_B_IsRegistered_Preserved_For_Three_Years_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      rule_26_C_IsRegistered_Produced_While_Inspection: ['-1'],
      rule_26_C_IsRegistered_Produced_While_Inspection_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_12_IsWagesPaid_ToAll_FixedByGovernment_UnderSection_5_ViolationExist: ['0'],
      sec_13_IsAllEmployeeWorking_AsFixedHoursBy_AppropriateGovernment_ViolationExist: ['0'],
      sec_13_IsRest_Given_ToEvery_Employee_ViolationExist: ['0'],
      sec_13_IsPayment_Overtime_Given_ViolationExist: ['0'],
      sec_15_IsWagesPaid_ForLessWorkingDays_AsPerSection_15_ViolationExist: ['0'],
      rule_21_IsTimeAndConditions_OfPayment_Complied_ViolationExist: ['0'],
      rule_21_IsDeductionMade_AsPrescribed_ViolationExist: ['0'],
      rule_21_Upon_EmployerOrAuthorized_Representative_ViolationExist: ['0'],
      rule_21_IsMusterRoll_Form_V_Maintained_ViolationExist: ['0'],
      rule_26_B_IsRegistered_Preserved_For_Three_Years_ViolationExist: ['0'],
      rule_26_C_IsRegistered_Produced_While_Inspection_ViolationExist: ['0'],
      inspectionRefId: [null, Validators.required],
    }, {}) as TForm<Inspection_Form_Labour_III_MinimumWageAct>;
  }
  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      this.parmamEncodedinfo=params.info;
      this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info)=>{
      this.paramInfo = info;
      });
    });
  }

  ngAfterViewInit() {
    this.hasViolationFound = 'Any Violation Found?'
    this.appHttpRequestHandlerService.httpGet({ id:this.paramInfo.inspectionRefId}, "Inspection", "getForm_Labour_Part_III_MinimumWagesAct").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericFormModel<Inspection_Form_Labour_III_MinimumWageAct>) => {
        this.Input_Form.patchValue(data.formModel);
        this.updateCharacterCountsForTextareaControls();

        if(this.paramInfo.isLocked == 1)
          {
            this.Input_Form.disable();
          }
    });
  }

  saveAndNext(e){
    this.submitted = true;
    this.Input_Form.controls.inspectionRefId.patchValue(this.paramInfo.inspectionRefId);
    if (this.Input_Form.valid) {
      this.appHttpRequestHandlerService.httpPost(this.Input_Form.value, "pbsamadhannetcoreapi.Models.Inspection_Form_Labour_III_MinimumWageAct", "Inspection", "addUpdateForm_Labour_Part_III_MinimumWagesAct")
        .subscribe((data: GenericServiceResultTemplate) => {
          // this.inspectionsPerformaStepersComponent.moveToNextStep();
        });
    }
  }

  fillDefaultValueInRemarks(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (!inputElement.value || inputElement.value.trim() === '' || inputElement.value === '-') {
      inputElement.value = 'N/A';
      this.Input_Form.get(inputElement.getAttribute('formControlName')!)?.patchValue('N/A');
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getCharacterCount(controlName: string): number {
    return this.characterCounts[controlName] ?? 0;
  }

  updateCharacterCount(controlName: string, maxLength: number): void {
    const control = this.Input_Form.get(controlName);
    if (control) {
      const value = control.value || '';
      this.characterCounts[controlName] = value.length;
      this.controlMaxLengthNames[controlName] = maxLength;
    }
  }

  private updateCharacterCountsForTextareaControls(): void {
    Object.keys(this.Input_Form.controls).forEach(controlName => {
      const control = this.Input_Form.get(controlName);
      if (control && control instanceof UntypedFormControl && control.value && typeof control.value === 'string') {
        if (control.value.trim() !== '') {
          this.updateCharacterCount(controlName, 1000);
        }
      }
    });
  }
}