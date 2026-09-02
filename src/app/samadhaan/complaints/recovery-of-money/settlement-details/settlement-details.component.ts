import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { IComplaint_RecOfMon_SettlementDetail } from 'src/app/samadhaan/samadhaan-typed-modelts';
import { SettlementTypeEnum } from 'src/app/shared.data';

@Component({
  selector: 'app-settlement-details',
  standalone: false,
  templateUrl: './settlement-details.component.html',
  styleUrl: './settlement-details.component.css',
})
export class SettlementDetailsComponent implements OnInit {
  @Output() settlementDetailDataEvent  = new EventEmitter<any>();
  @Input() settlementDetailsApiData :  GenericFormModel<IComplaint_RecOfMon_SettlementDetail>
  settlementTypeOptions: any[]
  SettlementTypeEnum = SettlementTypeEnum;
  constructor(private fb : FormBuilder){}

  
    ngOnChanges(changes : SimpleChanges){
    
    this.settlementTypeOptions = this.settlementDetailsApiData.enumTemplateLists.find(e => e.selectListTypeCode == "SettlementTypeEnum").selectListItems;
    
    if(this.settlementDetailsApiData.formModel){
    const formData = { ...this.settlementDetailsApiData.formModel};
    Object.keys(formData).forEach(key => {
    if (formData[key] && typeof formData[key] === 'string' && formData[key].includes('T')) {
    formData[key] = formData[key].split('T')[0];
      }
    });
    this.Input_Form.patchValue(formData)
    this.settlementDetailsApiData?.formModel ? this.Input_Form.controls.toDoActivityModeType.patchValue(2) : '';
    }
    }

  ngOnInit(): void {
     this.Input_Form.valueChanges.subscribe(value => {
    // if (this.Input_Form.valid) {
      this.settlementDetailDataEvent.emit(value);
    // } else {
    //   this.settlementDetailDataEvent.emit(null);
    // }
    });
  }

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
    appRefId: [''],
    projectSiteVersion: [1, Validators.required],
    toDoActivityModeType: [1, Validators.required],
    applicationPurposeType : [0, Validators.required],
    rootActivityRefId: ['defaultValue'],
    toDoActivityCategoryType: [2020, Validators.required]
    })as TForm<IComplaint_RecOfMon_SettlementDetail>;

    public isFormValid(): boolean {
    return this.Input_Form.valid;
    }

}
