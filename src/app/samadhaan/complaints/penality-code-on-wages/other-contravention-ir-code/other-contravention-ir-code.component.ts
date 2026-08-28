import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { IComplaint_OtherStandingOrderContraventionIRCode } from 'src/app/samadhaan/samadhaan-typed-modelts';
import { applicationTypeEnum, categoryTypeEnum } from 'src/app/shared.data';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-other-contravention-ir-code',
  templateUrl: './other-contravention-ir-code.component.html',
  styleUrl: './other-contravention-ir-code.component.css',
  standalone : false
})
export class OtherContraventionIrCodeComponent {
@Input() otherContraventionIrCodeData : IComplaint_OtherStandingOrderContraventionIRCode[]
otherContraventionList : any[] = []
paramInfo : any

 constructor(private fb : FormBuilder, private route : ActivatedRoute, private commonOpsService : CommonOpsService){}
    Input_Form: TForm<IComplaint_OtherStandingOrderContraventionIRCode> = this.fb.group({
    id : [0, Validators.required],
    otherContraventionSection : ['', Validators.required],
    otherContraventionOffences : ['', Validators.required],
    appRefId: [0, Validators.required],
    applicationType: [applicationTypeEnum.SAMADHAN_COMPLAINTS, Validators.required],
    applicationPurposeType: [1, Validators.required],
    projectSiteVersion: [1, Validators.required],
    toDoActivityModeType: [1, Validators.required],
    rootActivityRefId: ['defaultValue'],
    toDoActivityCategoryType: [categoryTypeEnum.INDIVIDUAL_COMPLAINT_STANDINGORDERCONTRAVENTIONIRCODE, Validators.required],
  }) as TForm<IComplaint_OtherStandingOrderContraventionIRCode>;

  get formControls() {
    return this.Input_Form.controls;
  }

  ngOnChanges(){
    console.log('other contravention ir code', this.otherContraventionIrCodeData);
  if(this.otherContraventionIrCodeData && this.otherContraventionIrCodeData.length > 0){
  this.otherContraventionIrCodeData.forEach(contraventionData =>{
    this.Input_Form.patchValue(contraventionData);
    this.Input_Form.controls.toDoActivityModeType.patchValue(2);
    this.addOtherContravention();
  })
  }
  }

    ngAfterViewInit(){
          this.route.queryParams
            .subscribe(params => {
              this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info) => {
                this.paramInfo = info;
                // this.appHttpRequestHandlerService.httpGet({id : this.paramInfo.appRefId}, "Complaints", "getPenaltyImpositionIndustrialRelationCodeDetail").pipe(takeUntil(this.ngUnsubscribe))
                //   .subscribe((data: GenericFormModel<IComplaint_PenaltyImpositionIndustrialRelationCode>) => {
                    // this.breachSectionType = data.enumTemplateLists.find(e => e.selectListTypeCode == 'PenaltyBreachSectionEnum').selectListItems
                    // this.specifyUnfairLabourPracticeTypes = data.enumTemplateLists.find(e => e.selectListTypeCode == 'SpecifyUnfairLabourPracticeTypeEnum').selectListItems
                    // this.allUnfairLabourPracticeType = data.enumTemplateLists.find(e => e.selectListTypeCode == 'UnfairLabourPracticeTypeEnum').selectListItems
                    // this.allUnfairLabourPracticeSubCategoryType = data.enumTemplateLists.find(e => e.selectListTypeCode == 'UnfairLabourPracticeSubCategoryTypeEnum').selectListItems
  
                    // this.appFormStepsList = data.appFormStepsList;
                    //   console.log("formodle", data.formModel);
                    //   if (data.formModel) {
                    //    const formData = data.formModel;
                    //   this.Input_Form.patchValue(formData);
                    //   this.Input_Form.patchValue({ toDoActivityModeType: 2});
                    //   this.Input_Form.patchValue({rootActivityRefId : 'defaultValue'});
                    // }
                  // });
              });
            });
        }

addOtherContravention() {
  if(this.Input_Form.valid){
   const OtherContravention = {
      ...this.Input_Form.value,
      appRefId: this.paramInfo.appRefId,
      applicationType: this.paramInfo.applicationType,
      applicationPurposeType: this.paramInfo?.applicationPurposeType,
      projectSiteVersion: this.paramInfo?.projectSiteVersion,
      toDoActivityCategoryType: categoryTypeEnum.INDIVIDUAL_COMPLAINT_STANDINGORDEROTHERCONTRAVENTIONIRCODE
    };
    this.otherContraventionList.push(OtherContravention);

    this.Input_Form.reset({ 
    id : 0,
    appRefId : this.paramInfo?.appRefId,
    applicationPurposeType : this.paramInfo?.applicationPurposeType,
    applicationType : this.paramInfo.applicationType,
    projectSiteVersion : this.paramInfo?.projectSiteVersion,
    toDoActivityModeType : 1,
    rootActivityRefId : '',
    toDoActivityCategoryType : categoryTypeEnum.INDIVIDUAL_COMPLAINT_STANDINGORDEROTHERCONTRAVENTIONIRCODE
    });

  Swal.fire({
    icon: 'success',
    title: 'Saved Successfully!',
    timer: 1500,
    showConfirmButton: false
    });
  } else{
    this.Input_Form.markAllAsTouched();
         Object.keys(this.Input_Form.controls).forEach(key => {
           const control = this.Input_Form.get(key);
       
           if (control?.invalid) {
          console.log('Invalid field:', key);
        console.log('Errors:', control.errors);
        console.log('Value:', control.value);
   }
         });
  }
  }
  deleteEmployer(index: number) {
    this.otherContraventionList.splice(index, 1);
  }
  resetForm() {
    this.Input_Form.reset();
    this.Input_Form.patchValue({id: 0,appRefId: this.paramInfo?.appRefId});
  }

}
