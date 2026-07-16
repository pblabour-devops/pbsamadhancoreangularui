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
import { Inspection_Form_Labour_III_Observations } from '../../Inspections-typed-models';


@Component({
    selector: 'app-labour-part-iii-observations',
    templateUrl: './labour-part-iii-observations.component.html',
    styleUrls: ['./labour-part-iii-observations.component.css'],
    standalone: false
})
export class LabourPartIiiObservationsComponent implements OnInit {
  @Input() jsonData: any;
  Input_Form: TForm<Inspection_Form_Labour_III_Observations>;
  private ngUnsubscribe = new Subject<void>();
  genericFormData: GenericFormModel<Inspection_Form_Labour_III_Observations>;
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
      is_Spread_Over_Being_Observed_During_Rest : ['-1'],
      is_Spread_Over_Being_Observed_During_Rest_Remarks : ['N/A', [Validators.required,Validators.maxLength(1000)]],
      is_Any_Child_Employee_Found : ['-1'],
      is_Any_Child_Employee_Found_Remarks : ['N/A', [Validators.required,Validators.maxLength(1000)]],
      is_Working_Hours_Adhered_For_Women_Young_Person : ['-1'],
      is_Working_Hours_Adhered_For_Women_Young_Person_Remarks : ['N/A', [Validators.required,Validators.maxLength(1000)]],
      is_Opening_Closing_Hours_Observed : ['-1'],
      is_Opening_Closing_Hours_Observed_Remarks : ['N/A', [Validators.required,Validators.maxLength(1000)]],
      is_Weekly_Holiday_Provided : ['-1'],
      is_Weekly_Holiday_Provided_Remarks : ['N/A', [Validators.required,Validators.maxLength(1000)]],
      is_Overtime_Paid_For_Holiday_Work: ['-1'],
      is_Overtime_Paid_For_Holiday_Work_Remarks : ['N/A', [Validators.required,Validators.maxLength(1000)]],
      any_Deduction_Of_Wages: ['-1'],
      any_Deduction_Of_Wages_Remarks : ['N/A', [Validators.required,Validators.maxLength(1000)]],
      any_Fine_Imposed_For_Damage_Loss: ['-1'],
      any_Fine_Imposed_For_Damage_Loss_Remarks : ['N/A', [Validators.required,Validators.maxLength(1000)]],
      is_Fine_Realized_Utilized_As_Per_Gov_Guidline: ['-1'],
      is_Fine_Realized_Utilized_As_Per_Gov_Guidline_Remarks : ['N/A', [Validators.required,Validators.maxLength(1000)]],
      is_Leaves_Given_To_Employees: ['-1'],
      is_Leaves_Given_To_Employees_Remarks : ['N/A', [Validators.required,Validators.maxLength(1000)]],
      is_Cleanliness: ['-1'],
      is_Cleanliness_Remarks : ['N/A', [Validators.required,Validators.maxLength(1000)]],
      is_There_Ventilation_And_Lighting: ['-1'],
      is_There_Ventilation_And_Lighting_Remarks : ['N/A', [Validators.required,Validators.maxLength(1000)]],
      is_There_Drinking_Water_Facility: ['-1'],
      is_There_Drinking_Water_Facility_Remarks : ['N/A', [Validators.required,Validators.maxLength(1000)]],
      any_Precaution_Against_Fire: ['-1'],
      any_Precaution_Against_Fire_Remarks : ['N/A', [Validators.required,Validators.maxLength(1000)]],
      is_Spread_Over_Being_Observed_During_Rest_ViolationExist : ['0'],
      is_Any_Child_Employee_Found_ViolationExist : ['0'],
      is_Working_Hours_Adhered_For_Women_Young_Person_ViolationExist : ['0'],
      is_Opening_Closing_Hours_Observed_ViolationExist : ['0'],
      is_Weekly_Holiday_Provided_ViolationExist : ['0'],
      is_Overtime_Paid_For_Holiday_Work_ViolationExist: ['0'],
      any_Deduction_Of_Wages_ViolationExist: ['0'],
      any_Fine_Imposed_For_Damage_Loss_ViolationExist: ['0'],
      is_Fine_Realized_Utilized_As_Per_Gov_Guidline_ViolationExist: ['0'],
      is_Leaves_Given_To_Employees_ViolationExist: ['0'],
      is_Cleanliness_ViolationExist: ['0'],
      is_There_Ventilation_And_Lighting_ViolationExist: ['0'],
      is_There_Drinking_Water_Facility_ViolationExist: ['0'],
      any_Precaution_Against_Fire_ViolationExist: ['0'],
      
      inspectionRefId: [null, Validators.required],
    }, {}) as TForm<Inspection_Form_Labour_III_Observations>;
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
    this.appHttpRequestHandlerService.httpGet({ id:this.paramInfo.inspectionRefId}, "Inspection", "getForm_Labour_Part_III_Observations").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericFormModel<Inspection_Form_Labour_III_Observations>) => {
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
      this.appHttpRequestHandlerService.httpPost(this.Input_Form.value, "pbsamadhannetcoreapi.Models.Inspection_Form_Labour_III_Observations", "Inspection", "addUpdateForm_Labour_Part_III_Observations")
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