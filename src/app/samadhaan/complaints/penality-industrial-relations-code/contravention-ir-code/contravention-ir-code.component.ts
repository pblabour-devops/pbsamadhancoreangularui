import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { IComplaint_PenaltyImpositionIndustrialRelationCode, IComplaint_StandingOrderContraventionIRCode } from 'src/app/samadhaan/samadhaan-typed-modelts';
import { applicationTypeEnum, categoryTypeEnum } from 'src/app/shared.data';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contravention-ir-code',
  templateUrl: './contravention-ir-code.component.html',
  styleUrl: './contravention-ir-code.component.css',
  standalone : false
})
export class ContraventionIrCodeComponent {
@Input() contraventionIrCodeData : IComplaint_StandingOrderContraventionIRCode[]
contraventionList : any[] = []
paramInfo : any

 constructor(private fb : FormBuilder, private route : ActivatedRoute, private commonOpsService : CommonOpsService){}
    Input_Form: TForm<IComplaint_StandingOrderContraventionIRCode> = this.fb.group({
    id : [0, Validators.required],
    standingOrderContravention : ['', Validators.required],
    standingOrderClause : ['', Validators.required],
    appRefId: [0, Validators.required],
    applicationType: [applicationTypeEnum.SAMADHAN_COMPLAINTS, Validators.required],
    applicationPurposeType: [1, Validators.required],
    projectSiteVersion: [1, Validators.required],
    toDoActivityModeType: [1, Validators.required],
    rootActivityRefId: ['defaultValue'],
    toDoActivityCategoryType: [categoryTypeEnum.INDIVIDUAL_COMPLAINT_STANDINGORDERCONTRAVENTIONIRCODE, Validators.required],
  }) as TForm<IComplaint_StandingOrderContraventionIRCode>;

  get formControls() {
    return this.Input_Form.controls;
  }

  ngOnChanges(changes : SimpleChanges){
  if(this.contraventionIrCodeData && this.contraventionIrCodeData.length > 0){
  this.contraventionIrCodeData.forEach(contraventionData =>{
    this.Input_Form.patchValue(contraventionData);
    this.Input_Form.controls.toDoActivityModeType.patchValue(2);
    this.addContravention();
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
                    //   
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

addContravention() {
  if(this.Input_Form.valid){
   const contravention = {
      ...this.Input_Form.value,
      appRefId: this.paramInfo.appRefId,
      applicationType: this.paramInfo.applicationType,
      applicationPurposeType: this.paramInfo?.applicationPurposeType,
      projectSiteVersion: this.paramInfo?.projectSiteVersion,
      toDoActivityCategoryType: categoryTypeEnum.INDIVIDUAL_COMPLAINT_STANDINGORDERCONTRAVENTIONIRCODE
    };
    this.contraventionList.push(contravention);

    this.Input_Form.reset({ 
    id : 0,
    appRefId : this.paramInfo?.appRefId,
    applicationPurposeType : this.paramInfo?.applicationPurposeType,
    applicationType : this.paramInfo.applicationType,
    projectSiteVersion : this.paramInfo?.projectSiteVersion,
    toDoActivityModeType : 1,
    rootActivityRefId : '',
    toDoActivityCategoryType : categoryTypeEnum.INDIVIDUAL_COMPLAINT_STANDINGORDERCONTRAVENTIONIRCODE
    });

  Swal.fire({
    icon: 'success',
    title: 'Saved Successfully!',
    timer: 1500,
    showConfirmButton: false
    });
  } else{
    this.Input_Form.markAllAsTouched();
  }
  }
  deleteEmployer(index: number) {
    this.contraventionList.splice(index, 1);
  }
  resetForm() {
    this.Input_Form.reset();
    this.Input_Form.patchValue({id: 0,appRefId: this.paramInfo?.appRefId});
  }

}
