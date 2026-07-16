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
import { Inspection_Form_Labour_III_MaternityBenefitAct } from '../../Inspections-typed-models';


@Component({
    selector: 'app-labour-part-iii-maternity-benefit-act',
    templateUrl: './labour-part-iii-maternity-benefit-act.component.html',
    styleUrls: ['./labour-part-iii-maternity-benefit-act.component.css'],
    standalone: false
})
export class LabourPartIiiMaternityBenefitActComponent implements OnInit {
  @Input() jsonData: any;
  Input_Form: TForm<Inspection_Form_Labour_III_MaternityBenefitAct>;
  private ngUnsubscribe = new Subject<void>();
  genericFormData: GenericFormModel<Inspection_Form_Labour_III_MaternityBenefitAct>;
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
      sec_8_Rule_6_4_Is_Payment_Of_Medical_Bonus_Paid: ['-1'],
      sec_8_Rule_6_4_Is_Payment_Of_Medical_Bonus_Paid_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_9_Is_Leave_For_Miscarriage_Granted: ['-1'],
      sec_9_Is_Leave_For_Miscarriage_Granted_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_9_A_Is_Leave_with_Wages_Granted_In_Case_Of_tubectomy: ['-1'],
      sec_9_A_Is_Leave_with_Wages_Granted_In_Case_Of_tubectomy_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_10_Role_6_Is_Leave_Granted_For_Illness_Arising_Out_Of_Pregnancy: ['-1'],
      sec_10_Role_6_Is_Leave_Granted_For_Illness_Arising_Out_Of_Pregnancy_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_11_Role_7_Is_Nursing_Breaks_Given_Of_20_Minutes: ['-1'],
      sec_11_Role_7_Is_Nursing_Breaks_Given_Of_20_Minutes_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_11_A_Is_Creche_Facility_Provided: ['-1'],
      sec_11_A_Is_Creche_Facility_Provided_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_12_Is_Any_Dismissal_During_Absence_Of_Pregnancy: ['-1'],
      sec_12_Is_Any_Dismissal_During_Absence_Of_Pregnancy_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_19_Role_15_Is_Act_And_Rules_In_Form_K_Displayed: ['-1'],
      sec_19_Role_15_Is_Act_And_Rules_In_Form_K_Displayed_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_20_Rule_3_IsMusterRoll_Form_A_Maintained: ['-1'],
      sec_20_Rule_3_IsMusterRoll_Form_A_Maintained_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      rule_14_Is_Record_Preserved_For_Three_Years: ['-1'],
      rule_14_Is_Record_Preserved_For_Three_Years_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      rule_16_Is_Annual_Return_Form_L_M_N_O_Submitted: ['-1'],
      rule_16_Is_Annual_Return_Form_L_M_N_O_Submitted_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_8_Rule_6_4_Is_Payment_Of_Medical_Bonus_Paid_ViolationExist: ['0'],
      sec_9_Is_Leave_For_Miscarriage_Granted_ViolationExist: ['0'],
      sec_9_A_Is_Leave_with_Wages_Granted_In_Case_Of_tubectomy_ViolationExist: ['0'],
      sec_10_Role_6_Is_Leave_Granted_For_Illness_Arising_Out_Of_Pregnancy_ViolationExist: ['0'],
      sec_11_Role_7_Is_Nursing_Breaks_Given_Of_20_Minutes_ViolationExist: ['0'],
      sec_11_A_Is_Creche_Facility_Provided_ViolationExist: ['0'],
      sec_12_Is_Any_Dismissal_During_Absence_Of_Pregnancy_ViolationExist: ['0'],
      sec_19_Role_15_Is_Act_And_Rules_In_Form_K_Displayed_ViolationExist: ['0'],
      sec_20_Rule_3_IsMusterRoll_Form_A_Maintained_ViolationExist: ['0'],
      rule_14_Is_Record_Preserved_For_Three_Years_ViolationExist: ['0'],
      rule_16_Is_Annual_Return_Form_L_M_N_O_Submitted_ViolationExist: ['0'],
      inspectionRefId: [null, Validators.required],
    }, {}) as TForm<Inspection_Form_Labour_III_MaternityBenefitAct>;
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
    this.appHttpRequestHandlerService.httpGet({ id:this.paramInfo.inspectionRefId}, "Inspection", "getForm_Labour_Part_III_MaternityBenefitAct").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericFormModel<Inspection_Form_Labour_III_MaternityBenefitAct>) => {
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
      this.appHttpRequestHandlerService.httpPost(this.Input_Form.value, "pbsamadhannetcoreapi.Models.Inspection_Form_Labour_III_MaternityBenefitAct", "Inspection", "addUpdateForm_Labour_Part_III_MaternityBenefitAct")
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