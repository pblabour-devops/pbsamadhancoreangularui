import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { IComplaint_RecOfMon_AwardDetail, IComplaint_RecOfMon_SettlementDetail } from 'src/app/samadhaan/samadhaan-typed-modelts';

@Component({
  selector: 'app-award-details',
  standalone: false,
  templateUrl: './award-details.component.html',
  styleUrl: './award-details.component.css',
})
export class AwardDetailsComponent {
  @Input() awardDetailsApiData :  GenericFormModel<IComplaint_RecOfMon_AwardDetail>
  @Output() awardDetailDataEvent = new EventEmitter<any>();
  constructor(private fb : FormBuilder){}

    ngOnChanges(changes : SimpleChanges){
    console.log('changes', changes );
    if(this.awardDetailsApiData.formModel){
    const formData = { ...this.awardDetailsApiData.formModel};
    Object.keys(formData).forEach(key => {
    if (formData[key] && typeof formData[key] === 'string' && formData[key].includes('T')) {
    formData[key] = formData[key].split('T')[0];
      }
    });
    this.Input_Form.patchValue(formData)
    this.awardDetailsApiData?.formModel ? this.Input_Form.controls.toDoActivityModeType.patchValue(2) : '';
    }
    }

    ngOnInit(): void {
    this.Input_Form.valueChanges.subscribe(value => {
    if (this.Input_Form.valid) {
      this.awardDetailDataEvent.emit(value);
    } else {
      this.awardDetailDataEvent.emit(null);
    }
    });
  }

   Input_Form : TForm<IComplaint_RecOfMon_AwardDetail> = this.fb.group({
    id : [0, Validators.required],
    partiesName: ['', Validators.required],
    cgitOrArbitratorName: ['', Validators.required],
    awardNumber: ['', Validators.required],
    awardDate: ['', Validators.required],
    awardTerms: ['', Validators.required],
    amountDueFromDate: ['', Validators.required],
    appRefId: [''],
    projectSiteVersion: [1, Validators.required],
    toDoActivityModeType: [1, Validators.required],
    applicationPurposeType : [0, Validators.required],
    rootActivityRefId: ['defaultValue'],
    toDoActivityCategoryType: [2021, Validators.required]
    })as TForm<IComplaint_RecOfMon_AwardDetail>;

    public isFormValid(): boolean {
    return this.Input_Form.valid;
    }
}
