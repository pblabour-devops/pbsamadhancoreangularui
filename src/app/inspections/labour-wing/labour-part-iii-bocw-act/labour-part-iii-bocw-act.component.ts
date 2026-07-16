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
import { Inspection_Form_Labour_III_BOCW_Act } from '../../Inspections-typed-models';


@Component({
    selector: 'app-labour-part-iii-bocw-act',
    templateUrl: './labour-part-iii-bocw-act.component.html',
    styleUrls: ['./labour-part-iii-bocw-act.component.css'],
    standalone: false
})
export class LabourPartIiiBocwActComponent implements OnInit {
  @Input() jsonData: any;
  Input_Form: TForm<Inspection_Form_Labour_III_BOCW_Act>;
  private ngUnsubscribe = new Subject<void>();
  genericFormData: GenericFormModel<Inspection_Form_Labour_III_BOCW_Act>;
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
      is_Construction_Establishment_Registered_Under_Act: ['-1'],
      is_Construction_Establishment_Registered_Under_Act_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      is_Engaged_Workers_Registered_Under_Act: ['-1'],
      is_Engaged_Workers_Registered_Under_Act_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      is_Employer_Submitted_Commencement_Completion_Notice: ['-1'],
      is_Employer_Submitted_Commencement_Completion_Notice_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      is_Employer_Submitted_Form_I_Within_30Days_Commencement_Of_Work: ['-1'],
      is_Employer_Submitted_Form_I_Within_30Days_Commencement_Of_Work_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      is_One_Percent_Cess_Being_Paid_Of_Total_Cost: ['-1'],
      is_One_Percent_Cess_Being_Paid_Of_Total_Cost_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      is_Establishment_Maintained_Muster_Roll_In_Form_XVI: ['-1'],
      is_Establishment_Maintained_Muster_Roll_In_Form_XVI_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      is_Establishment_Maintained_Wages_Register_In_Form_XVII: ['-1'],
      is_Establishment_Maintained_Wages_Register_In_Form_XVII_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      is_Establishment_Maintained_Overtime_Register_In_Form_XXII: ['-1'],
      is_Establishment_Maintained_Overtime_Register_In_Form_XXII_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      is_Employer_Provide_Working_Conditions_To_Workers: ['-1'],
      is_Employer_Provide_Working_Conditions_To_Workers_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      is_Employer_Submitted_Annual_Return: ['-1'],
      is_Employer_Submitted_Annual_Return_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      is_Employer_Ensured_Safety_Measures: ['-1'],
      is_Employer_Ensured_Safety_Measures_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      is_Any_Nature_Of_Violation_Found: ['-1'],
      is_Any_Nature_Of_Violation_Found_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      is_Construction_Establishment_Registered_Under_Act_ViolationExist :['0'],
      is_Engaged_Workers_Registered_Under_Act_ViolationExist : ['0'],
      is_Employer_Submitted_Commencement_Completion_Notice_ViolationExist : ['0'],
      is_Employer_Submitted_Form_I_Within_30Days_Commencement_Of_Work_ViolationExist : ['0'],
      is_One_Percent_Cess_Being_Paid_Of_Total_Cost_ViolationExist : ['0'],
      is_Establishment_Maintained_Muster_Roll_In_Form_XVI_ViolationExist: ['0'],
      is_Establishment_Maintained_Wages_Register_In_Form_XVII_ViolationExist: ['0'],
      is_Establishment_Maintained_Overtime_Register_In_Form_XXII_ViolationExist: ['0'],
      is_Employer_Provide_Working_Conditions_To_Workers_ViolationExist: ['0'],
      is_Employer_Submitted_Annual_Return_ViolationExist: ['0'],
      is_Employer_Ensured_Safety_Measures_ViolationExist:['0'],
      is_Any_Nature_Of_Violation_Found_ViolationExist: ['0'],
      inspectionRefId: [null, Validators.required],
    }, {}) as TForm<Inspection_Form_Labour_III_BOCW_Act>;
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
    this.appHttpRequestHandlerService.httpGet({ id:this.paramInfo.inspectionRefId}, "Inspection", "getForm_Labour_Part_III_BOCW_Act").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericFormModel<Inspection_Form_Labour_III_BOCW_Act>) => {
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
      this.appHttpRequestHandlerService.httpPost(this.Input_Form.value, "pbsamadhannetcoreapi.Models.Inspection_Form_Labour_III_BOCW_Act", "Inspection", "addUpdateForm_Labour_Part_III_BOCW_Act")
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