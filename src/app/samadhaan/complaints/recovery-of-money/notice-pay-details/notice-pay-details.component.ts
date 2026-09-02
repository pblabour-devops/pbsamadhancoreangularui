import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { IComplaint_RecOfMon_NoticePayDetail, IComplaint_RecOfMon_SettlementDetail } from 'src/app/samadhaan/samadhaan-typed-modelts';

@Component({
  selector: 'app-notice-pay-details',
  standalone: false,
  templateUrl: './notice-pay-details.component.html',
  styleUrl: './notice-pay-details.component.css',
})
export class NoticePayDetailsComponent {
  @Input() noticePayApiData :  GenericFormModel<IComplaint_RecOfMon_NoticePayDetail>

  @Output() noticePayDetailDataEvent = new EventEmitter<any>();
   public noticePeriodOptions:any[]
   
    constructor(private fb : FormBuilder){}

     ngOnChanges(changes : SimpleChanges){
    
    this.noticePeriodOptions = this.noticePayApiData.enumTemplateLists.find(e => e.selectListTypeCode == "NoticePayPeriodTypeEnum").selectListItems;
    if(this.noticePayApiData.formModel){
    const formData = { ...this.noticePayApiData.formModel};
    Object.keys(formData).forEach(key => {
    if (formData[key] && typeof formData[key] === 'string' && formData[key].includes('T')) {
    formData[key] = formData[key].split('T')[0];
      }
    });
    this.Input_Form.patchValue(formData)
    this.noticePayApiData?.formModel ? this.Input_Form.controls.toDoActivityModeType.patchValue(2) : '';
    }
    }

      ngOnInit(): void {
    this.Input_Form.valueChanges.subscribe(value => {
    // if (this.Input_Form.valid) {
      this.noticePayDetailDataEvent.emit(value);
    // } else {
    //   this.noticePayDetailDataEvent.emit(null);
    // }
    });
  }

    Input_Form : TForm<IComplaint_RecOfMon_NoticePayDetail> = this.fb.group({
    id : [0, Validators.required],
    dateOfJoining: ['', Validators.required],
    dateOfTermination: ['', Validators.required],
    noticePayPeriodType: ['', Validators.required],
    amountDue: ['', Validators.required],
    amountDueFromDate: ['', Validators.required],
    appRefId: [''],
    projectSiteVersion: [1, Validators.required],
    toDoActivityModeType: [1, Validators.required],
    applicationPurposeType : [0, Validators.required],
    rootActivityRefId: ['defaultValue'],
    toDoActivityCategoryType: [2022, Validators.required]
    })as TForm<IComplaint_RecOfMon_NoticePayDetail>;

    public isFormValid(): boolean {
    return this.Input_Form.valid;
    }
}
