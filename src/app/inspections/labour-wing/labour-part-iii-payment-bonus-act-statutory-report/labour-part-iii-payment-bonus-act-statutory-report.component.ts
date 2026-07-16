import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Inspection_Form_Labour_III_PaymentBonusAct_Part_B_Attachment, Inspection_Form_Labour_III_PaymentBonusAct_StatutoryReport } from '../../Inspections-typed-models';
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
    selector: 'app-labour-part-iii-payment-bonus-act-statutory-report',
    templateUrl: './labour-part-iii-payment-bonus-act-statutory-report.component.html',
    styleUrls: ['./labour-part-iii-payment-bonus-act-statutory-report.component.css'],
    standalone: false
})
export class LabourPartIiiPaymentBonusActStatutoryReportComponent implements OnInit {
  @Input() jsonData: any;
  Input_Form: TForm<Inspection_Form_Labour_III_PaymentBonusAct_StatutoryReport>;
  private ngUnsubscribe = new Subject<void>();
  genericFormData: GenericFormModel<Inspection_Form_Labour_III_PaymentBonusAct_StatutoryReport>;
  submitted: boolean = false;
  hasSubmitClicked: boolean = false;
  defaultValue:"N/A";
  characterCounts: { [key: string]: number } = {};
  controlMaxLengthNames: { [key: string]: number } = {};
  public parmamEncodedinfo:string;
  public paramInfo:any;
  public attachmentdata: any[] = [];
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
      rule_3_AnyPermission_ToChange_AccountingYear: ['-1'],
      rule_3_AnyPermission_ToChange_AccountingYear_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      rule_4_IsForm_A_Register_Maintained: ['-1'],
      rule_4_IsForm_A_Register_Maintained_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      rule_4_IsForm_B_Register_Maintained: ['-1'],
      rule_4_IsForm_B_Register_Maintained_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      rule_4_IsForm_C_Register_Maintained: ['-1'],
      rule_4_IsForm_C_Register_Maintained_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      rule_5_IsAnnualReturn_Form_D_Submitted: ['-1'],
      rule_5_IsAnnualReturn_Form_D_Submitted_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      rule_3_AnyPermission_ToChange_AccountingYear_ViolationExist: ['0'],
      rule_4_IsForm_A_Register_Maintained_ViolationExist: ['0'],
      rule_4_IsForm_B_Register_Maintained_ViolationExist: ['0'],
      rule_4_IsForm_C_Register_Maintained_ViolationExist: ['0'],
      rule_5_IsAnnualReturn_Form_D_Submitted_ViolationExist: ['0'],
      inspectionRefId: [null, Validators.required],

    }, {}) as TForm<Inspection_Form_Labour_III_PaymentBonusAct_StatutoryReport>;
    
  }

  Attachment_InputForm: TForm<Inspection_Form_Labour_III_PaymentBonusAct_Part_B_Attachment> = this.fb.group({
    accountingYear: [0, Validators.required],
    noOfEmployees : [0, Validators.required],
    noOfEmployeesEligibleForBonus : [0, Validators.required],
    rateOfBonus: [0, [Validators.required]],
    noOfEmployeesWhomeBonusPaid: [0, [Validators.required, Validators.maxLength(10)]],
    noOfEmployeesWhomeBonusNotPaid: [0, [Validators.required, Validators.maxLength(10)]],
    anyAgreementOfBonousBetweenEmployerAndEmployee: ['-1'],
    totalAmountUnpaidAsBonus: [0, Validators.required],
    isEmployerSendUnpaidBonusToEmployeesAddress : ['-1'],
    inspectionRefId: [null, Validators.required],
  }) as TForm<Inspection_Form_Labour_III_PaymentBonusAct_Part_B_Attachment>;
  get attachmentFormControls() { return this.Attachment_InputForm.controls; }

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
    this.appHttpRequestHandlerService.httpGet({ id:this.paramInfo.inspectionRefId}, "Inspection", "getForm_Labour_Part_III_PaymentBonusAct_StatutoryReport").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericFormModel<Inspection_Form_Labour_III_PaymentBonusAct_StatutoryReport>) => {
        this.Input_Form.patchValue(data.formModel);
        this.updateCharacterCountsForTextareaControls();
    });

    this.appHttpRequestHandlerService.httpGet({id: this.paramInfo.inspectionRefId}, "Inspection","getForm_Labour_Part_III_PaymentBonusAct_Part_B").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data1 : GenericFormModel<Inspection_Form_Labour_III_PaymentBonusAct_Part_B_Attachment>) =>{
        this.attachmentdata = Object.values(data1.formModel);
      });

      if(this.paramInfo.isLocked == 1)
        {
          this.Input_Form.disable();
        }
  }

  saveAndNext(e){
    this.submitted = true;
    this.Input_Form.controls.inspectionRefId.patchValue(this.paramInfo.inspectionRefId);
    if (this.Input_Form.valid) {
      this.appHttpRequestHandlerService.httpPost(this.Input_Form.value, "pbsamadhannetcoreapi.Models.Inspection_Form_Labour_III_PaymentBonusAct_StatutoryReport", "Inspection", "addUpdateForm_Labour_Part_III_PaymentBonusAct_StatutoryReport")
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

  openInspectionModal(content) {
    this.closeInspectionModal();
    this.modalService.open(content, { scrollable: true });
  }
  closeInspectionModal() {
    this.modalService.dismissAll();
  }

  onSubmit() : void {
    this.submitted = true;
    this.hasSubmitClicked = true;
    this.Attachment_InputForm.controls.inspectionRefId.patchValue(this.paramInfo.inspectionRefId);
    if(this.Attachment_InputForm.valid){
      this.appHttpRequestHandlerService.httpPost(this.Attachment_InputForm.value, "pbsamadhannetcoreapi.Models.Inspection_Form_Labour_III_PaymentBonusAct_Part_B_Attachment", "Inspection", "addUpdateForm_Labour_Part_III_PaymentBonusAct_Part_B")
        .subscribe((data: GenericServiceResultTemplate) => {
          this.Input_Form.reset();
          this.closeInspectionModal();
          this.ngAfterViewInit();
        });
      this.modalService.dismissAll();
    }
  }

}