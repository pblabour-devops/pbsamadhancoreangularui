import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { IComplaint_RecOfMon_RetrenchmentCompDetail } from 'src/app/samadhaan/samadhaan-typed-modelts';

@Component({
  selector: 'app-retrenchment-compensation-details',
  standalone: false,
  templateUrl: './retrenchment-compensation-details.component.html',
  styleUrl: './retrenchment-compensation-details.component.css',
})
export class RetrenchmentCompensationDetailsComponent {

   constructor(private fb : FormBuilder){}

    Input_Form : TForm<IComplaint_RecOfMon_RetrenchmentCompDetail> = this.fb.group({
    id : [0, Validators.required],
    dateOfJoining: ['', Validators.required],
    dateOfRetrenchmentOrClosure: ['', Validators.required],
    totalLengthOfServiceDays: ['', Validators.required],
    compensationAmountDue: ['', Validators.required],
    compensationDueFromDate: ['', Validators.required],
    appRefId: ['', Validators.required],
    projectSiteVersion: [1, Validators.required],
    toDoActivityModeType: [1, Validators.required],
    applicationPurposeType : [0, Validators.required],
    rootActivityRefId: ['defaultValue', Validators.required],
    toDoActivityCategoryType: [1017, Validators.required]
    })as TForm<IComplaint_RecOfMon_RetrenchmentCompDetail>;

}
