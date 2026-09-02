import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { IComplaint_RecOfMon_RetrenchmentCompDetail, IComplaint_RecOfMon_SettlementDetail } from 'src/app/samadhaan/samadhaan-typed-modelts';

@Component({
  selector: 'app-retrenchment-compensation-details',
  standalone: false,
  templateUrl: './retrenchment-compensation-details.component.html',
  styleUrl: './retrenchment-compensation-details.component.css',
})
export class RetrenchmentCompensationDetailsComponent {
  @Input() retrenchmentDetailApiData :  GenericFormModel<IComplaint_RecOfMon_RetrenchmentCompDetail>
  @Output() retrenchmentDetailDataEvent = new EventEmitter<any>();

   constructor(private fb : FormBuilder){}

    ngOnChanges(changes : SimpleChanges){
    
    if(this.retrenchmentDetailApiData.formModel){
    const formData = { ...this.retrenchmentDetailApiData.formModel};
    Object.keys(formData).forEach(key => {
    if (formData[key] && typeof formData[key] === 'string' && formData[key].includes('T')) {
    formData[key] = formData[key].split('T')[0];
      }
    });
    this.Input_Form.patchValue(formData)
    this.retrenchmentDetailApiData?.formModel ? this.Input_Form.controls.toDoActivityModeType.patchValue(2) : '';
    }
    }
     ngOnInit(): void {
    this.Input_Form.valueChanges.subscribe(value => {
    // if (this.Input_Form.valid) {
      this.retrenchmentDetailDataEvent.emit(value);
    // } else {
    //   this.retrenchmentDetailDataEvent.emit(null);
    // }
    });
  }

    Input_Form : TForm<IComplaint_RecOfMon_RetrenchmentCompDetail> = this.fb.group({
    id : [0, Validators.required],
    dateOfJoining: ['', Validators.required],
    dateOfRetrenchmentOrClosure: ['', Validators.required],
    totalLengthOfServiceDays: ['', Validators.required],
    compensationAmountDue: ['', Validators.required],
    compensationDueFromDate: ['', Validators.required],
    appRefId: [''],
    projectSiteVersion: [1, Validators.required],
    toDoActivityModeType: [1, Validators.required],
    applicationPurposeType : [0, Validators.required],
    rootActivityRefId: ['defaultValue'],
    toDoActivityCategoryType: [2023, Validators.required]
    })as TForm<IComplaint_RecOfMon_RetrenchmentCompDetail>;

    public isFormValid(): boolean {
    return this.Input_Form.valid;
    }

}
