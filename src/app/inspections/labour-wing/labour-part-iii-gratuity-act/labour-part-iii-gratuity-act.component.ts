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
import { Inspection_Form_Labour_III_GratuityAct } from '../../Inspections-typed-models';


@Component({
    selector: 'app-labour-part-iii-gratuity-act',
    templateUrl: './labour-part-iii-gratuity-act.component.html',
    styleUrls: ['./labour-part-iii-gratuity-act.component.css'],
    standalone: false
})
export class LabourPartIiiGratuityActComponent implements OnInit {
  @Input() jsonData: any;
  Input_Form: TForm<Inspection_Form_Labour_III_GratuityAct>;
  private ngUnsubscribe = new Subject<void>();
  genericFormData: GenericFormModel<Inspection_Form_Labour_III_GratuityAct>;
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
      rule_3_Is_Notice_In_Form_A_Given : ['-1'],
      rule_3_Is_Notice_In_Form_A_Given_Remarks : ['N/A', [Validators.required,Validators.maxLength(1000)]],
      rule_4_Is_Notice_Displayed : ['-1'],
      rule_4_Is_Notice_Displayed_Remarks : ['N/A', [Validators.required,Validators.maxLength(1000)]],
      rule_5_Is_Notice_In_Form_D_E_Given : ['-1'],
      rule_5_Is_Notice_In_Form_D_E_Given_Remarks : ['N/A', [Validators.required,Validators.maxLength(1000)]],
      rule_6_Rule_6_Is_Nominee_Filled_By_Employee_In_Form_F : ['-1'],
      rule_6_Rule_6_Is_Nominee_Filled_By_Employee_In_Form_F_Remarks : ['N/A', [Validators.required,Validators.maxLength(1000)]],
      rule_8_Is_Notice_In_Form_L_M_Endorsed_To_Authority : ['-1'],
      rule_8_Is_Notice_In_Form_L_M_Endorsed_To_Authority_Remarks : ['N/A', [Validators.required,Validators.maxLength(1000)]],
      rule_20_Is_Notice_In_Form_U_Displayed: ['-1'],
      rule_20_Is_Notice_In_Form_U_Displayed_Remarks : ['N/A', [Validators.required,Validators.maxLength(1000)]],
      rule_3_Is_Notice_In_Form_A_Given_ViolationExist : ['0'],
      rule_4_Is_Notice_Displayed_ViolationExist : ['0'],
      rule_5_Is_Notice_In_Form_D_E_Given_ViolationExist : ['0'],
      rule_6_Rule_6_Is_Nominee_Filled_By_Employee_In_Form_F_ViolationExist : ['0'],
      rule_8_Is_Notice_In_Form_L_M_Endorsed_To_Authority_ViolationExist : ['0'],
      rule_20_Is_Notice_In_Form_U_Displayed_ViolationExist: ['0'],
      inspectionRefId: [null, Validators.required],
    }, {}) as TForm<Inspection_Form_Labour_III_GratuityAct>;
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
    this.appHttpRequestHandlerService.httpGet({ id:this.paramInfo.inspectionRefId}, "Inspection", "getForm_Labour_Part_III_GratuityAct").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericFormModel<Inspection_Form_Labour_III_GratuityAct>) => {
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
      this.appHttpRequestHandlerService.httpPost(this.Input_Form.value, "pbsamadhannetcoreapi.Models.Inspection_Form_Labour_III_GratuityAct", "Inspection", "addUpdateForm_Labour_Part_III_GratuityAct")
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
