import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import {  IComplaint_MinimumWagesNotPaid } from 'src/app/samadhaan/samadhaan-typed-modelts';
import { CommonOpsService } from 'src/app/shared/common-ops-service';

@Component({
  selector: 'app-minimum-wages-not-paid',
  standalone: false,
  templateUrl: './minimum-wages-not-paid.component.html',
  styleUrl: './minimum-wages-not-paid.component.css',
})
export class MinimumWagesNotPaidComponent {
  @Output() minimumWagesDataEvent  = new EventEmitter<IComplaint_MinimumWagesNotPaid>();
  @Input() minimumWagesApiData :any
  @Input() minimumWagesPeriodApiData : any
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  public appFormStepsList: any[] = [];
  public paramInfo: any;
  public parmamEncodedinfo: string;
  genericFormData: GenericFormModel<IComplaint_MinimumWagesNotPaid>;
  applicableOptions : any

  constructor(
    private fb: FormBuilder,
    public commonOpsService: CommonOpsService
  ) {}

  Input_Form: TForm<IComplaint_MinimumWagesNotPaid> = this.fb.group(
    {
      id: [0, Validators.required],
      totalReliefSought: ['', Validators.required],
      compensationSought: ['', Validators.required],
      detailAboutTheClaim: [''],
      Complaint_MinimumWagesNotPaidDetails: this.fb.array([]),
      projectSiteRefId : [0, Validators.required],
      applicationPurposeType : [0, Validators.required],
      iPin: [0, Validators.required],
      investPunjab_AppId: [0, Validators.required],
      projectSiteVersion: [1, Validators.required],
      toDoActivityModeType: [1, Validators.required],
      rootActivityRefId: [''],
      toDoActivityCategoryType: [0, Validators.required],
      appRefId : [0, Validators.required]
    }
  ) as TForm<IComplaint_MinimumWagesNotPaid>;

  get formControls() {
    return this.Input_Form.controls;
  }

  ngOnChanges(changes : any){
    if(changes.minimumWagesApiData){
    this.Input_Form.patchValue(this.minimumWagesApiData?.formModel)
    this.Input_Form.controls.toDoActivityModeType.patchValue(2);
    } else if(changes.minimumWagesPeriodApiData){
    const details = this.minimumWagesPeriodApiData.formModel;
    Object.keys(details).forEach(key => {
      if (details[key] && typeof details[key] === 'string' && details[key].includes('T')) {
        details[key] = details[key].split('T')[0];
      }
    });
    const formArray = this.Input_Form.get('Complaint_MinimumWagesNotPaidDetails') as FormArray;
    formArray.clear();
    this.addMore(details)
    }
  }

  ngOnInit(){
    this.addMore();
      this.Input_Form.valueChanges.subscribe(value => {
      this.minimumWagesDataEvent.emit(value);
    });
  }

  get complaintDetails(): FormArray {
    return this.Input_Form.get('Complaint_MinimumWagesNotPaidDetails') as FormArray;
  }

  createComplaintDetail(data?:any): FormGroup {
    return this.fb.group({
      id: [data?.id || 0],
      fromDate: [data?.fromDate || '', Validators.required],
      toDate: [data?.toDate || '', Validators.required],
      amount: [data?.amount || '', [Validators.required, Validators.min(0.01)]],
      projectSiteVersion: [1, Validators.required],
      toDoActivityModeType: [data ? 2 : 1, Validators.required],
      rootActivityRefId: [''],
    });
  }

  addMore(data? : any): void {
    this.complaintDetails.push(this.createComplaintDetail(data));
  }

  public isFormValid(): boolean {
    return this.Input_Form.valid;
}


  removeRow(index: number): void {
    this.complaintDetails.removeAt(index);
  }
}
