import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { IComplaint_RecOfMon_AwardDetail } from 'src/app/samadhaan/samadhaan-typed-modelts';

@Component({
  selector: 'app-award-details',
  standalone: false,
  templateUrl: './award-details.component.html',
  styleUrl: './award-details.component.css',
})
export class AwardDetailsComponent {
  constructor(private fb : FormBuilder){}

   Input_Form : TForm<IComplaint_RecOfMon_AwardDetail> = this.fb.group({
    id : [0, Validators.required],
    partiesName: ['', Validators.required],
    cGITOrArbitratorName: ['', Validators.required],
    awardNumber: ['', Validators.required],
    awardDate: ['', Validators.required],
    awardTerms: ['', Validators.required],
    amountDueFromDate: ['', Validators.required],
    appRefId: ['', Validators.required],
    projectSiteVersion: [1, Validators.required],
    toDoActivityModeType: [1, Validators.required],
    applicationPurposeType : [0, Validators.required],
    rootActivityRefId: ['defaultValue', Validators.required],
    toDoActivityCategoryType: [1017, Validators.required]
    })as TForm<IComplaint_RecOfMon_AwardDetail>;

}
