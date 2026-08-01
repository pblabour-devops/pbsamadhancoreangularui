import { Component } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { IComplaint_RecOfMon_LayOffDetail, IComplaint_RecOfMon_LayOffCompDetail } from 'src/app/samadhaan/samadhaan-typed-modelts';

@Component({
  selector: 'app-lay-off-details',
  standalone: false,
  templateUrl: './lay-off-details.component.html',
  styleUrl: './lay-off-details.component.css',
})
export class LayOffDetailsComponent {

    constructor(private fb : FormBuilder){}

    ngOnInit(){
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
      toDoActivityCategoryType: [0, Validators.required],
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
        toDoActivityCategoryType: [0, Validators.required],
        appRefId: [0, Validators.required],
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


}
