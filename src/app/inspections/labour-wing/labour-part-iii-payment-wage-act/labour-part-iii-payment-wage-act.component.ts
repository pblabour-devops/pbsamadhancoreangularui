import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Inspection_Form_Labour_III_PaymentWagesAct } from '../../Inspections-typed-models';
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


@Component({
    selector: 'app-labour-part-iii-payment-wage-act',
    templateUrl: './labour-part-iii-payment-wage-act.component.html',
    styleUrls: ['./labour-part-iii-payment-wage-act.component.css'],
    standalone: false
})
export class LabourPartIiiPaymentWageActComponent implements OnInit {
  @Input() jsonData: any;
  Input_Form: TForm<Inspection_Form_Labour_III_PaymentWagesAct>;
  private ngUnsubscribe = new Subject<void>();
  genericFormData: GenericFormModel<Inspection_Form_Labour_III_PaymentWagesAct>;
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
      sec_4_IsWagesPeriodFixed: ['-1'],
      sec_4_IsWagesPeriodFixed_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_5_IsWagesPaid_OnTime_As_Per_Section_5: ['-1'],
      sec_5_IsWagesPaid_OnTime_As_Per_Section_5_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_6_IsWages_Paid_As_Prescribed: ['-1'],
      sec_6_IsWages_Paid_As_Prescribed_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_7_IsDeductionMade: ['-1'],
      sec_7_IsDeductionMade_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_8_IsFine_Imposed_For_Acts_And_Omissions: ['-1'],
      sec_8_IsFine_Imposed_For_Acts_And_Omissions_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_8_IsNotice_Of_Acts_And_Omissions_Displayed: ['-1'],
      sec_8_IsNotice_Of_Acts_And_Omissions_Displayed_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_8_IsFine_Imposed_After_Giving_Opportunity: ['-1'],
      sec_8_IsFine_Imposed_After_Giving_Opportunity_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_8_Is_Fine_Amount_As_Per_Sub_Sec_8_4_And_8_5: ['-1'],
      sec_8_Is_Fine_Amount_As_Per_Sub_Sec_8_4_And_8_5_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_8_Is_Fine_Recovered_As_Per_Sub_Sec_8_6: ['-1'],
      sec_8_Is_Fine_Recovered_As_Per_Sub_Sec_8_6_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_9_To_13_IsDeductions_Made_AsPerSection: ['-1'],
      sec_9_To_13_IsDeductions_Made_AsPerSection_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_13_A_IsPrescribed_Register_Maintained: ['-1'],
      sec_13_A_IsPrescribed_Register_Maintained_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_13_A_IsRegister_Preserved_For_Three_Years: ['-1'],
      sec_13_A_IsRegister_Preserved_For_Three_Years_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_25_IsNotices_Under_section_Displayed: ['-1'],
      sec_25_IsNotices_Under_section_Displayed_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_4_IsWagesPeriodFixed_ViolationExist: ['0'],
      sec_5_IsWagesPaid_OnTime_As_Per_Section_5_ViolationExist: ['0'],
      sec_6_IsWages_Paid_As_Prescribed_ViolationExist: ['0'],
      sec_7_IsDeductionMade_ViolationExist: ['0'],
      sec_8_IsFine_Imposed_For_Acts_And_Omissions_ViolationExist: ['0'],
      sec_8_IsNotice_Of_Acts_And_Omissions_Displayed_ViolationExist: ['0'],
      sec_8_IsFine_Imposed_After_Giving_Opportunity_ViolationExist: ['0'],
      sec_8_Is_Fine_Amount_As_Per_Sub_Sec_8_4_And_8_5_ViolationExist: ['0'],
      sec_8_Is_Fine_Recovered_As_Per_Sub_Sec_8_6_ViolationExist: ['0'],
      sec_9_To_13_IsDeductions_Made_AsPerSection_ViolationExist: ['0'],
      sec_13_A_IsPrescribed_Register_Maintained_ViolationExist: ['0'],
      sec_13_A_IsRegister_Preserved_For_Three_Years_ViolationExist: ['0'],
      sec_25_IsNotices_Under_section_Displayed_ViolationExist: ['0'],

      inspectionRefId: [null, Validators.required],
    }, {}) as TForm<Inspection_Form_Labour_III_PaymentWagesAct>;
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
    this.appHttpRequestHandlerService.httpGet({ id:this.paramInfo.inspectionRefId}, "Inspection", "getForm_Labour_Part_III_PaymentWagesAct").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericFormModel<Inspection_Form_Labour_III_PaymentWagesAct>) => {
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
      this.appHttpRequestHandlerService.httpPost(this.Input_Form.value, "pbsamadhannetcoreapi.Models.Inspection_Form_Labour_III_PaymentWagesAct", "Inspection", "addUpdateForm_Labour_Part_III_PaymentWagesAct")
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