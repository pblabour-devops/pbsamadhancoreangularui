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
import { Inspection_Form_Labour_III_IndustrialEmploymentAct } from '../../Inspections-typed-models';


@Component({
    selector: 'app-labour-part-iii-industrial-employment-act',
    templateUrl: './labour-part-iii-industrial-employment-act.component.html',
    styleUrls: ['./labour-part-iii-industrial-employment-act.component.css'],
    standalone: false
})
export class LabourPartIiiIndustrialEmploymentActComponent implements OnInit {
  @Input() jsonData: any;
  Input_Form: TForm<Inspection_Form_Labour_III_IndustrialEmploymentAct>;
  private ngUnsubscribe = new Subject<void>();
  genericFormData: GenericFormModel<Inspection_Form_Labour_III_IndustrialEmploymentAct>;
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
      sec_1_3_Is_Act_Applicable_On_Establishment : ['-1'],
      sec_1_3_Is_Act_Applicable_On_Establishment_Remarks : ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_5_Is_Establishment_Fall_In_Exempted_Category : ['-1'],
      sec_5_Is_Establishment_Fall_In_Exempted_Category_Remarks : ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_5_Is_Establishment_Complying_Provission_Of_Notification : ['-1'],
      sec_5_Is_Establishment_Complying_Provission_Of_Notification_Remarks : ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_5_Is_Standing_Orders_Submitted_By_Certifying_Officer : ['-1'],
      sec_5_Is_Standing_Orders_Submitted_By_Certifying_Officer_Remarks : ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_6_Is_Any_Appeal_Pending_With_Appellate_Authority : ['-1'],
      sec_6_Is_Any_Appeal_Pending_With_Appellate_Authority_Remarks : ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_9_Is_Standing_Order_Posted_By_Employer: ['-1'],
      sec_9_Is_Standing_Order_Posted_By_Employer_Remarks : ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_10_A_Is_Subsistence_Allowance_Given_To_Suspended_Workmen: ['-1'],
      sec_10_A_Is_Subsistence_Allowance_Given_To_Suspended_Workmen_Remarks : ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_1_3_Is_Act_Applicable_On_Establishment_ViolationExist : ['0'],
      sec_5_Is_Establishment_Fall_In_Exempted_Category_ViolationExist : ['0'],
      sec_5_Is_Establishment_Complying_Provission_Of_Notification_ViolationExist : ['0'],
      sec_5_Is_Standing_Orders_Submitted_By_Certifying_Officer_ViolationExist : ['0'],
      sec_6_Is_Any_Appeal_Pending_With_Appellate_Authority_ViolationExist : ['0'],
      sec_9_Is_Standing_Order_Posted_By_Employer_ViolationExist: ['0'],
      sec_10_A_Is_Subsistence_Allowance_Given_To_Suspended_Workmen_ViolationExist: ['0'],
      inspectionRefId: [null, Validators.required],
    }, {}) as TForm<Inspection_Form_Labour_III_IndustrialEmploymentAct>;
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
    this.appHttpRequestHandlerService.httpGet({ id:this.paramInfo.inspectionRefId}, "Inspection", "getForm_Labour_Part_III_IndustrialEmploymentAct").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericFormModel<Inspection_Form_Labour_III_IndustrialEmploymentAct>) => {
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
      this.appHttpRequestHandlerService.httpPost(this.Input_Form.value, "pbsamadhannetcoreapi.Models.Inspection_Form_Labour_III_IndustrialEmploymentAct", "Inspection", "addUpdateForm_Labour_Part_III_IndustrialEmploymentAct")
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
