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
import { Inspection_Form_Labour_III_ChildAndAdolescentLabourAct } from '../../Inspections-typed-models';


@Component({
    selector: 'app-labour-part-iii-child-adolescent-labour-act',
    templateUrl: './labour-part-iii-child-adolescent-labour-act.component.html',
    styleUrls: ['./labour-part-iii-child-adolescent-labour-act.component.css'],
    standalone: false
})
export class LabourPartIiiChildAdolescentLabourActComponent implements OnInit {
  @Input() jsonData: any;
  Input_Form: TForm<Inspection_Form_Labour_III_ChildAndAdolescentLabourAct>;
  private ngUnsubscribe = new Subject<void>();
  genericFormData: GenericFormModel<Inspection_Form_Labour_III_ChildAndAdolescentLabourAct>;
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
      sec_3_AnyChild_Found_Working: ['-1'],
      sec_3_AnyChild_Found_Working_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_3_A_AnyAdolescent_Found_Working: ['-1'],
      sec_3_A_AnyAdolescent_Found_Working_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_7_IsRestGiven_To_Adolescent: ['-1'],
      sec_7_IsRestGiven_To_Adolescent_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_7_IsWorkPeriod_NotMoreThen_6_Hours: ['-1'],
      sec_7_IsWorkPeriod_NotMoreThen_6_Hours_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_7_IsAny_Adolescent_Work_Between_7_PM_To_8_AM: ['-1'],
      sec_7_IsAny_Adolescent_Work_Between_7_PM_To_8_AM_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_7_IsAny_Adolescent_Working_Overtime: ['-1'],
      sec_7_IsAny_Adolescent_Working_Overtime_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_8_Is_Weekly_Holidays_Given_To_Adolescent: ['-1'],
      sec_8_Is_Weekly_Holidays_Given_To_Adolescent_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_8_Is_Notice_Of_Weekly_Holidays_Given_To_Adolescent: ['-1'],
      sec_8_Is_Notice_Of_Weekly_Holidays_Given_To_Adolescent_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_8_Is_Notice_Altered_Within_3_months: ['-1'],
      sec_8_Is_Notice_Altered_Within_3_months_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_9_Is_Notice_Sent_To_Inspector: ['-1'],
      sec_9_Is_Notice_Sent_To_Inspector_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_11_Is_Prescribed_Register_Maintained: ['-1'],
      sec_11_Is_Prescribed_Register_Maintained_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_12_Is_NoticeOfAbstract_Section_3A_And_14_displayed: ['-1'],
      sec_12_Is_NoticeOfAbstract_Section_3A_And_14_displayed_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_3_AnyChild_Found_Working_ViolationExist: ['0'],
      sec_3_A_AnyAdolescent_Found_Working_ViolationExist: ['0'],
      sec_7_IsRestGiven_To_Adolescent_ViolationExist: ['0'],
      sec_7_IsWorkPeriod_NotMoreThen_6_Hours_ViolationExist: ['0'],
      sec_7_IsAny_Adolescent_Work_Between_7_PM_To_8_AM_ViolationExist: ['0'],
      sec_7_IsAny_Adolescent_Working_Overtime_ViolationExist: ['0'],
      sec_8_Is_Weekly_Holidays_Given_To_Adolescent_ViolationExist: ['0'],
      sec_8_Is_Notice_Of_Weekly_Holidays_Given_To_Adolescent_ViolationExist: ['0'],
      sec_8_Is_Notice_Altered_Within_3_months_ViolationExist: ['0'],
      sec_9_Is_Notice_Sent_To_Inspector_ViolationExist: ['0'],
      sec_11_Is_Prescribed_Register_Maintained_ViolationExist: ['0'],
      sec_12_Is_NoticeOfAbstract_Section_3A_And_14_displayed_ViolationExist: ['0'],

      inspectionRefId: [null, Validators.required],
    }, {}) as TForm<Inspection_Form_Labour_III_ChildAndAdolescentLabourAct>;
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
    this.appHttpRequestHandlerService.httpGet({ id:this.paramInfo.inspectionRefId}, "Inspection", "getForm_Labour_Part_III_ChildAndAdolescentLabourAct").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericFormModel<Inspection_Form_Labour_III_ChildAndAdolescentLabourAct>) => {
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
      this.appHttpRequestHandlerService.httpPost(this.Input_Form.value, "pbsamadhannetcoreapi.Models.Inspection_Form_Labour_III_ChildAndAdolescentLabourAct", "Inspection", "addUpdateForm_Labour_Part_III_ChildAndAdolescentLabourAct")
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
