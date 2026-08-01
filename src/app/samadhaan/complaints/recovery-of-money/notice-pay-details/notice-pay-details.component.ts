import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { IComplaint_RecOfMon_NoticePayDetail } from 'src/app/samadhaan/samadhaan-typed-modelts';

@Component({
  selector: 'app-notice-pay-details',
  standalone: false,
  templateUrl: './notice-pay-details.component.html',
  styleUrl: './notice-pay-details.component.css',
})
export class NoticePayDetailsComponent {
   public noticePeriodOptions:any[]
   
    constructor(private fb : FormBuilder){}

    Input_Form : TForm<IComplaint_RecOfMon_NoticePayDetail> = this.fb.group({
    id : [0, Validators.required],
    dateOfJoining: ['', Validators.required],
    dateOfTermination: ['', Validators.required],
    noticePayPeriodType: ['', Validators.required],
    amountDue: ['', Validators.required],
    amountDueFromDate: ['', Validators.required],
    appRefId: ['', Validators.required],
    projectSiteVersion: [1, Validators.required],
    toDoActivityModeType: [1, Validators.required],
    applicationPurposeType : [0, Validators.required],
    rootActivityRefId: ['defaultValue', Validators.required],
    toDoActivityCategoryType: [1017, Validators.required]
    })as TForm<IComplaint_RecOfMon_NoticePayDetail>;
}
