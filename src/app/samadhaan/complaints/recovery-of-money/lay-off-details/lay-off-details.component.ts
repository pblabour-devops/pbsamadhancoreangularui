import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { IComplaint_RecOfMon_LayOffDetail, IComplaint_RecOfMon_LayOffCompDetail, IComplaint_RecOfMon_SettlementDetail } from 'src/app/samadhaan/samadhaan-typed-modelts';

@Component({
  selector: 'app-lay-off-details',
  standalone: false,
  templateUrl: './lay-off-details.component.html',
  styleUrl: './lay-off-details.component.css',
})
export class LayOffDetailsComponent {
  @Input() layOffDetailApiData :  GenericFormModel<IComplaint_RecOfMon_LayOffDetail>
  @Input() layOffCompDetailApiData :  GenericFormModel<IComplaint_RecOfMon_LayOffCompDetail[]>

  @Output() layOffDetailDataEvent = new EventEmitter<any>();

    constructor(private fb : FormBuilder){}

    

     ngOnChanges(changes : any){
      if(changes.layOffDetailApiData){
      const data = this.layOffDetailApiData?.formModel
      if(data){
          Object.keys(data).forEach(key => {
        if (data[key] && typeof data[key] === 'string' && data[key].includes('T')) {
          data[key] = data[key].split('T')[0];
        }
      });
      this.Input_Form.patchValue(data);
      this.layOffDetailApiData?.formModel ? this.Input_Form.controls.toDoActivityModeType.patchValue(2) : '';
      }
      } else if(changes.layOffCompDetailApiData){
      const details = this.layOffCompDetailApiData.formModel;
      if(details){
      const formArray = this.Input_Form.get('complaint_RecOfMon_LayOffCompDetail') as FormArray;
      formArray.clear();
      details.forEach(detail =>{
      Object.keys(detail).forEach(key => {
        if (detail[key] && typeof detail[key] === 'string' && detail[key].includes('T')) {
          detail[key] = detail[key].split('T')[0];
        }
      });
        this.addMore(detail)
      })
      }
    }
      }

    ngOnInit(){
         this.Input_Form.valueChanges.subscribe(value => {
    // if (this.Input_Form.valid) {
      this.layOffDetailDataEvent.emit(value);
    // } else {
    //   this.layOffDetailDataEvent.emit(null);
    // }
    });
      this.addMore();
    }


    Input_Form: TForm<IComplaint_RecOfMon_LayOffDetail> = this.fb.group(
    {
      id: [0, Validators.required],
      dateOfJoining: ['', Validators.required],
      dateOfLayOff: ['', Validators.required],
      details: [''],
      complaint_RecOfMon_LayOffCompDetail: this.fb.array([]),
      applicationPurposeType : [0, Validators.required],
      projectSiteVersion: [1, Validators.required],
      toDoActivityModeType: [1, Validators.required],
      rootActivityRefId: [''],
      toDoActivityCategoryType: [2024, Validators.required],
      appRefId : [0, Validators.required]
    }
  ) as TForm<IComplaint_RecOfMon_LayOffDetail>;

   get complaint_RecOfMon_LayOffCompDetail(): FormArray {
    return this.Input_Form.get('complaint_RecOfMon_LayOffCompDetail') as FormArray;
  }

    createComplaintDetail(data?: IComplaint_RecOfMon_LayOffCompDetail): FormGroup {
      return this.fb.group({
        id: [data?.id || 0],
        layOffFromDate: [data?.layOffFromDate || '', Validators.required],
        layOffToDate: [data?.layOffToDate || '', Validators.required],
        compensationAmount: [data?.compensationAmount || '', Validators.required],
        compensationDueFromDate: [data?.compensationDueFromDate || '', Validators.required],
        toDoActivityModeType: [data ? 2 : 1, Validators.required],
        rootActivityRefId: [''],
        toDoActivityCategoryType: [2025, Validators.required],
        appRefId: [0],
        applicationPurposeType: [0, Validators.required],
        projectSiteVersion: [1, Validators.required],
      });
    }

    addMore(data? : any): void {
      this.complaint_RecOfMon_LayOffCompDetail.push(this.createComplaintDetail(data));
    }

    removeRow(index: number): void {
    this.complaint_RecOfMon_LayOffCompDetail.removeAt(index);
  }

  public isFormValid(): boolean {
    return this.Input_Form.valid;
    }


}
