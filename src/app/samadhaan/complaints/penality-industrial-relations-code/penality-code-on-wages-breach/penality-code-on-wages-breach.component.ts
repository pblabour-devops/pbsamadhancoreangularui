import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TForm, GenericFormModel } from 'src/app/generic-implementation/generic-form-builder.type';
import { IComplaint_OtherStandingOrderContraventionIRCode, IComplaint_PenaltyImpositionIndustrialRelationCode, IComplaint_StandingOrderContraventionIRCode } from 'src/app/samadhaan/samadhaan-typed-modelts';
import { applicationTypeEnum, categoryTypeEnum } from 'src/app/shared.data';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { ICRUD_CreateUpdateOperationResponse } from 'src/app/typed-model/crud-typed-models';
import { ContraventionIrCodeComponent } from '../contravention-ir-code/contravention-ir-code.component';
import { OtherContraventionIrCodeComponent } from '../other-contravention-ir-code/other-contravention-ir-code.component';

@Component({
  selector: 'app-penality-code-on-wages-breach',
  templateUrl: './penality-code-on-wages-breach.component.html',
  styleUrl: './penality-code-on-wages-breach.component.css',
  standalone:false
})
export class PenalityCodeOnWagesBreachComponent {
  @ViewChild(ContraventionIrCodeComponent) ContraventionIrCodeComponent!: ContraventionIrCodeComponent;
  @ViewChild(OtherContraventionIrCodeComponent) OtherContraventionIrCodeComponent!: OtherContraventionIrCodeComponent;
  contraventionIrCodeData : IComplaint_StandingOrderContraventionIRCode[]
  otherContraventionIrCodeData : IComplaint_OtherStandingOrderContraventionIRCode[]
  breachSectionType : any[]
  appFormStepsList : any[]
  specifyUnfairLabourPracticeTypes : any[]
  unfairLabourPracticeType : any[]
  allUnfairLabourPracticeType : any[]
  unfairLabourPracticeSubCategoryType : any[]
  allUnfairLabourPracticeSubCategoryType : any[]
  paramInfo : any
  ngUnsubscribe = new Subject<void>();
  
  constructor(private fb : FormBuilder, 
  private route : ActivatedRoute,
  private commonOpsService : CommonOpsService,
  private appHttpRequestHandlerService : AppHttpRequestHandlerService,
  private router : Router){}

  Input_Form: TForm<IComplaint_PenaltyImpositionIndustrialRelationCode> = this.fb.group({
    id: [0, Validators.required],
    appRefId: [0, Validators.required],
    breachSectionType: ['', Validators.required],
    isSection70Breach_WagesInLieuOfNotice: [false],
    isSection70Breach_RetrenchmentCompensation: [false],
    isSection70Breach_RetrenchmentNoticeToGovt: [false],
    specifyUnfairLabourPracticePartyType: [null],
    unfairLabourPracticeType: [null],
    unfairLabourPracticeSubCategoryType: [null],
    isBreachOfSection30: [false],
    isBreachOfSection35: [false],
    applicationType: [applicationTypeEnum.SAMADHAN_COMPLAINTS,Validators.required],
    applicationPurposeType: [0,Validators.required],
    projectSiteVersion: [1,Validators.required],
    toDoActivityModeType: [1,Validators.required],
    rootActivityRefId: [''],
    toDoActivityCategoryType: [2029,Validators.required]
  }) as TForm<IComplaint_PenaltyImpositionIndustrialRelationCode>;

  ngOnInit(){
    this.Input_Form.controls.specifyUnfairLabourPracticePartyType.valueChanges.subscribe(() =>{
    const value = this.Input_Form.get('specifyUnfairLabourPracticePartyType')?.value;

    if (value == 1) {
      this.unfairLabourPracticeType = this.allUnfairLabourPracticeType.filter(x => x.value >= 1 && x.value <= 16);

    } else if (value == 2) {
      this.unfairLabourPracticeType = this.allUnfairLabourPracticeType.filter(x => x.value >= 17);
    }
    })
  }

   ngAfterViewInit(){
        this.route.queryParams
          .subscribe(params => {
            this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info) => {
              this.paramInfo = info;
              
              this.getPenalityCodeOnWagesData();
              this.getContraventionIrCodeData();
              this.getOtherContraventionIrCodeData();
            });
          });
      }
  
  getPenalityCodeOnWagesData(){
    this.appHttpRequestHandlerService.httpGet({id : this.paramInfo.appRefId}, "Complaints", "getPenaltyImpositionIndustrialRelationCodeDetail").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericFormModel<IComplaint_PenaltyImpositionIndustrialRelationCode>) => {
        this.breachSectionType = data.enumTemplateLists.find(e => e.selectListTypeCode == 'PenaltyBreachSectionEnum').selectListItems
        this.specifyUnfairLabourPracticeTypes = data.enumTemplateLists.find(e => e.selectListTypeCode == 'SpecifyUnfairLabourPracticeTypeEnum').selectListItems
        this.allUnfairLabourPracticeType = data.enumTemplateLists.find(e => e.selectListTypeCode == 'UnfairLabourPracticeTypeEnum').selectListItems
        this.allUnfairLabourPracticeSubCategoryType = data.enumTemplateLists.find(e => e.selectListTypeCode == 'UnfairLabourPracticeSubCategoryTypeEnum').selectListItems

        this.appFormStepsList = data.appFormStepsList;
          if (data.formModel) {
          const formData = data.formModel;
          this.Input_Form.patchValue(formData);
          this.Input_Form.patchValue({ toDoActivityModeType: 2});
          this.Input_Form.patchValue({rootActivityRefId : 'defaultValue'});
        }
      });
  }

  getContraventionIrCodeData(){
      this.appHttpRequestHandlerService.httpGet({id : this.paramInfo.appRefId}, "Complaints", "getComplaintStandingOrderContraventionIRCodeDetail").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericFormModel<IComplaint_StandingOrderContraventionIRCode[]>) => {
            if(data.formModel && data.formModel.length > 0){
            this.contraventionIrCodeData = data.formModel
            }
      })
  }

  getOtherContraventionIrCodeData(){
     this.appHttpRequestHandlerService.httpGet({id : this.paramInfo.appRefId}, "Complaints", "getComplaintOtherContraventionProvisionIRCodeDetail").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericFormModel<IComplaint_OtherStandingOrderContraventionIRCode[]>) => {
        if(data.formModel && data.formModel.length > 0){
            this.otherContraventionIrCodeData = data.formModel
            }
      })
  }

  onSubmit(){
   if (this.Input_Form.valid) {
       this.Input_Form.controls.appRefId.patchValue(this.paramInfo.appRefId);
       this.Input_Form.controls.applicationPurposeType.patchValue(this.paramInfo.applicationPurposeType);
       this.Input_Form.controls.projectSiteVersion.patchValue(this.paramInfo.projectSiteVersion);
       this.Input_Form.controls.rootActivityRefId.patchValue(this.paramInfo.rootActivityRefId);
       this.Input_Form.controls.toDoActivityCategoryType.patchValue(categoryTypeEnum.INDIVIDUAL_COMPLAINT_PENALTY_IMPOSITION_INDUSTRIAL_RELATION_CODE);
       this.Input_Form.controls.applicationType.patchValue(this.paramInfo.applicationType);
       this.appHttpRequestHandlerService
           .httpPost(this.Input_Form.value,'pbsamadhannetcoreapi.Models.Complaint_PenaltyImpositionIndustrialRelationCode','Crud','CreateUpdate')
           .pipe(takeUntil(this.ngUnsubscribe))
           .subscribe((data: ICRUD_CreateUpdateOperationResponse) => {
             if(this.ContraventionIrCodeComponent.contraventionList.length > 0){
              this.ContraventionIrCodeComponent.contraventionList.forEach(contraventionData =>{
                contraventionData.appRefId = this.paramInfo.appRefId
                contraventionData.applicationPurposeType = this.paramInfo.applicationPurposeType
                contraventionData.projectSiteVersion = this.paramInfo.projectSiteVersion
                contraventionData.rootActivityRefId = this.paramInfo.rootActivityRefId
                contraventionData.toDoActivityCategoryType = categoryTypeEnum.INDIVIDUAL_COMPLAINT_STANDINGORDERCONTRAVENTIONIRCODE
                contraventionData.applicationType = this.paramInfo.applicationType
                this.appHttpRequestHandlerService.httpPost(contraventionData,'pbsamadhannetcoreapi.Models.Complaint_StandingOrderContraventionIRCode','Crud','CreateUpdate').pipe(takeUntil(this.ngUnsubscribe))
                .subscribe((data: ICRUD_CreateUpdateOperationResponse) => {
                  if(this.OtherContraventionIrCodeComponent.otherContraventionList.length > 0){
                this.OtherContraventionIrCodeComponent.otherContraventionList.forEach(otherContraventionData =>{
                otherContraventionData.appRefId = this.paramInfo.appRefId
                otherContraventionData.applicationPurposeType = this.paramInfo.applicationPurposeType
                otherContraventionData.projectSiteVersion = this.paramInfo.projectSiteVersion
                otherContraventionData.rootActivityRefId = this.paramInfo.rootActivityRefId
                otherContraventionData.toDoActivityCategoryType = categoryTypeEnum.INDIVIDUAL_COMPLAINT_STANDINGORDEROTHERCONTRAVENTIONIRCODE
                otherContraventionData.applicationType = this.paramInfo.applicationType
                this.appHttpRequestHandlerService.httpPost(otherContraventionData,'pbsamadhannetcoreapi.Models.Complaint_OtherContraventionProvisionIRCode','Crud','CreateUpdate').pipe(takeUntil(this.ngUnsubscribe))
                .subscribe((data: ICRUD_CreateUpdateOperationResponse) => {
                       this.navigateToNextStep(data)
                })
                })
                }
               })
              })
             }
           });
       } else {
         this.Input_Form.markAllAsTouched();
         Object.keys(this.Input_Form.controls).forEach(key => {
           const control = this.Input_Form.get(key);
       
           if (control?.invalid) {
             
   }
         });
       }
  }


  navigateToNextStep(data : ICRUD_CreateUpdateOperationResponse){
    this.router.navigate(
      [this.appFormStepsList.find(x => x.stepCode === 'PCOW')?.uiNextPageComponentPath],
      {
        queryParams: {
          info: this.commonOpsService.encodeQueryParamsInBase64({
            identityKey: data.entityKeyId,
            appRefId:this.paramInfo.appRefId,
            applicationType: this.paramInfo.applicationType,
            applicationPurposeType: this.paramInfo?.applicationPurposeType,
            projectSiteVersion: this.paramInfo?.projectSiteVersion,
          }),
        },
      }
    );
  }

  onChange(){
    
  }


onUnfairLabourChange(){
  const specifyUnfairLabourPracticeType = this.Input_Form.get('specifyUnfairLabourPracticePartyType')?.value;
  const unfairLabourPracticeType = this.Input_Form.get('unfairLabourPracticeType')?.value;

  if(specifyUnfairLabourPracticeType == 1 && unfairLabourPracticeType == 1){
    this.unfairLabourPracticeSubCategoryType = this.allUnfairLabourPracticeSubCategoryType.filter(x => x.value >=1 && x.value<=3)
  } else if(specifyUnfairLabourPracticeType == 1 && unfairLabourPracticeType == 2){
    this.unfairLabourPracticeSubCategoryType = this.allUnfairLabourPracticeSubCategoryType.filter(x => x.value >=4 && x.value<=5)
  } else if(specifyUnfairLabourPracticeType == 1 && unfairLabourPracticeType == 4){
    this.unfairLabourPracticeSubCategoryType = this.allUnfairLabourPracticeSubCategoryType.filter(x => x.value >=6 && x.value<=11)
  } else if(specifyUnfairLabourPracticeType == 1 && unfairLabourPracticeType == 5){
    this.unfairLabourPracticeSubCategoryType = this.allUnfairLabourPracticeSubCategoryType.filter(x => x.value >=12 && x.value<=18)
  } else if(specifyUnfairLabourPracticeType == 2 && unfairLabourPracticeType == 18){
    this.unfairLabourPracticeSubCategoryType = this.allUnfairLabourPracticeSubCategoryType.filter(x => x.value >=19 && x.value<=20)
  } 
}
  
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
