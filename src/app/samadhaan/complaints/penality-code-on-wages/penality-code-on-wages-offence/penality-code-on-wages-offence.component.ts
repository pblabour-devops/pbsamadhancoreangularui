import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { IComplaint_PenaltyCodeOnWagesOffence } from 'src/app/samadhaan/samadhaan-typed-modelts';
import { applicationTypeEnum, categoryTypeEnum } from 'src/app/shared.data';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-penality-code-on-wages-offence',
  standalone: false,
  templateUrl: './penality-code-on-wages-offence.component.html',
  styleUrl: './penality-code-on-wages-offence.component.css',
})
export class PenalityCodeOnWagesOffenceComponent {
  @Input() penalityOffenceList: IComplaint_PenaltyCodeOnWagesOffence[] = [];
  paramInfo: any;
  offenceList : any[] =[];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private commonOpsService: CommonOpsService) { }

  Input_Form: TForm<IComplaint_PenaltyCodeOnWagesOffence> = this.fb.group({
    id: [0, Validators.required],
    appRefId: [0, Validators.required],
    applicationType: [applicationTypeEnum.SAMADHAN_COMPLAINTS, Validators.required],
    sectionRule : ['', Validators.required],
    offence : ['', Validators.required],
    applicationPurposeType: [0, Validators.required],
    projectSiteVersion: [1, Validators.required],
    toDoActivityModeType: [1, Validators.required],
    rootActivityRefId: [''],
    toDoActivityCategoryType: [categoryTypeEnum.INDIVIDUAL_COMPLAINT_PENALITY_CODE_ON_WAGES, Validators.required],
  }) as TForm<IComplaint_PenaltyCodeOnWagesOffence>;

  ngOnChanges(){
    if(this.penalityOffenceList && this.penalityOffenceList.length > 0){
                          debugger; 
      this.offenceList = [];
      this.penalityOffenceList.forEach(offence => {
      const formData = { ...offence };
      this.Input_Form.patchValue(formData);
      this.Input_Form.patchValue({ toDoActivityModeType: 2});
      this.Input_Form.patchValue({rootActivityRefId : 'defaultValue'});
      this.addOffence();
      })
  }}

  ngOnInit() {
    this.Input_Form.valueChanges.subscribe((value) => {
      console.log('Form Value Changed:', value);
    });
  }

  ngAfterViewInit() {
    this.route.queryParams
      .subscribe(params => {
        this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info) => {
          this.paramInfo = info;

          this.Input_Form.patchValue({
            appRefId: this.paramInfo?.appRefId,
            applicationType: this.paramInfo?.applicationType,
            applicationPurposeType: this.paramInfo?.applicationPurposeType,
            projectSiteVersion: this.paramInfo?.projectSiteVersion
          });

        });
      });
  }

  deleteOffence(index :number){
    this.offenceList.splice(index, 1);
  }

  addOffence(){
    if(this.Input_Form.valid){
   const newEmployer = {
      ...this.Input_Form.value,
      appRefId: this.paramInfo.appRefId,
      applicationType: applicationTypeEnum.SAMADHAN_COMPLAINTS,
      applicationPurposeType: this.paramInfo?.applicationPurposeType,
      projectSiteVersion: this.paramInfo?.projectSiteVersion,
      rootActivityRefId: 'defaultValue',
      toDoActivityCategoryType: categoryTypeEnum.INDIVIDUAL_COMPLAINT_PENALITY_CODE_ON_WAGES_OFFENCE
    };
    this.offenceList.push(newEmployer);

    this.Input_Form.reset({ 
    id : 0,
    appRefId : this.paramInfo?.appRefId,
    applicationPurposeType : this.paramInfo?.applicationPurposeType,
    applicationType : applicationTypeEnum.SAMADHAN_COMPLAINTS,
    projectSiteVersion : this.paramInfo?.projectSiteVersion,
    toDoActivityModeType : 1,
    rootActivityRefId : 'defaultValue',
    toDoActivityCategoryType : categoryTypeEnum.INDIVIDUAL_COMPLAINT_PENALITY_CODE_ON_WAGES_OFFENCE
    });

  Swal.fire({
    icon: 'success',
    title: 'Saved Successfully!',
    timer: 1500,
    showConfirmButton: false
    });
  } else{
     Object.keys(this.Input_Form.controls).forEach(key => {
      const control = this.Input_Form.get(key);

      if (control?.invalid) {
        console.log('Invalid field:', key);
        console.log('Value:', control.value);
        console.log('Errors:', control.errors);
      }
    });
    this.Input_Form.markAllAsTouched();
  }
  }



}
