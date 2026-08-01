import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { IComplaint_RecOfMon_SettlementDetail } from 'src/app/samadhaan/samadhaan-typed-modelts';

@Component({
  selector: 'app-settlement-details',
  standalone: false,
  templateUrl: './settlement-details.component.html',
  styleUrl: './settlement-details.component.css',
})
export class SettlementDetailsComponent {


  constructor(private fb : FormBuilder){}

   Input_Form : TForm<IComplaint_RecOfMon_SettlementDetail> = this.fb.group({
    id : [0, Validators.required],
    partiesName: ['', Validators.required],
    settlementDate: ['', Validators.required],
    settlementType: ['', Validators.required],
    conciliationOfficerNameAndDesignation: ['', Validators.required],
    conciliationOfficerAddress: ['', Validators.required],
    moneyDueTerms: ['', Validators.required],
    amountDue: ['', Validators.required],
    amountDueFromDate: ['', Validators.required],
    appRefId: ['', Validators.required],
    projectSiteVersion: [1, Validators.required],
    toDoActivityModeType: [1, Validators.required],
    applicationPurposeType : [0, Validators.required],
    rootActivityRefId: ['defaultValue', Validators.required],
    toDoActivityCategoryType: [1017, Validators.required]
    })as TForm<IComplaint_RecOfMon_SettlementDetail>;

}
