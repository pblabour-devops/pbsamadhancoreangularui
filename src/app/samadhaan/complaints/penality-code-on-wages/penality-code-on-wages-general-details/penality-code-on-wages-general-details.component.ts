import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TForm, GenericFormModel } from 'src/app/generic-implementation/generic-form-builder.type';
import { IComplaint_PenaltyCodeOnWagesOffence, IComplaint_PenaltyImpositionCodeOnWage } from 'src/app/samadhaan/samadhaan-typed-modelts';
import { applicationTypeEnum, categoryTypeEnum } from 'src/app/shared.data';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { PenalityCodeOnWagesOffenceComponent } from '../penality-code-on-wages-offence/penality-code-on-wages-offence.component';
import Swal from 'sweetalert2';
import { ICRUD_CreateUpdateOperationResponse } from 'src/app/typed-model/crud-typed-models';

@Component({
  selector: 'app-penality-code-on-wages-general-details',
  standalone: false,
  templateUrl: './penality-code-on-wages-general-details.component.html',
  styleUrl: './penality-code-on-wages-general-details.component.css',
})
export class PenalityCodeOnWagesGeneralDetailsComponent {
  @ViewChild(PenalityCodeOnWagesOffenceComponent)
  PenalityCodeOnWagesOffenceComponent: PenalityCodeOnWagesOffenceComponent;
   penalityOffenceList : IComplaint_PenaltyCodeOnWagesOffence[] = [];
   isEmployerPaidLessAmountType :any[]
   ClaimApplicationRefId : any[]
   appFormStepsList : any[]
   paramInfo : any;
   ngUnsubscribe = new Subject<void>();
   
   constructor(
    private fb:FormBuilder, 
    private route : ActivatedRoute,
    private commonOpsService : CommonOpsService,
    private appHttpRequestHandlerService : AppHttpRequestHandlerService,
    private router : Router
    ){}
   
   Input_Form: TForm<IComplaint_PenaltyImpositionCodeOnWage> = this.fb.group({
    id: [0, Validators.required],
    appRefId: [0, Validators.required],
    isEmployerPaidLessAmountType: [1, Validators.required],
    ClaimApplicationRefId: ['', Validators.required],
    FinalOrderDate: ['', Validators.required],
    ApplicationFilingDate: ['', Validators.required],
    applicationType: [applicationTypeEnum.SAMADHAN_COMPLAINTS,Validators.required],
    applicationPurposeType: [0,Validators.required],
    projectSiteVersion: [1,Validators.required],
    toDoActivityModeType: [1,Validators.required],
    rootActivityRefId: [''],
    toDoActivityCategoryType: [categoryTypeEnum.INDIVIDUAL_COMPLAINT_PENALITY_CODE_ON_WAGES,Validators.required]
  }) as TForm<IComplaint_PenaltyImpositionCodeOnWage>;

  ngAfterViewInit(){
    this.route.queryParams.subscribe(params => {
        this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info) => {
          this.paramInfo = info;
            this.appHttpRequestHandlerService.httpGet({id : this.paramInfo.appRefId}, "Complaints", "getComplaintPenaltyImpositionCodeOnWageDetail").pipe(takeUntil(this.ngUnsubscribe))
                .subscribe((data: GenericFormModel<IComplaint_PenaltyImpositionCodeOnWage>) => {
                  this.isEmployerPaidLessAmountType = data.enumTemplateLists.find(e => e.selectListTypeCode == 'YesNoEnum').selectListItems;
                  this.appFormStepsList = data.appFormStepsList;
                  if(data.formModel){
                    this.Input_Form.patchValue(data.formModel);
                    this.Input_Form.controls.toDoActivityModeType.patchValue(2);
                  }
                })
                this.getPenaltyCodeOnWagesOffenceList();
        });
      });
  }

  getPenaltyCodeOnWagesOffenceList(){
  this.appHttpRequestHandlerService.httpGet({id : this.paramInfo.appRefId}, "Complaints", "getComplaint_PenaltyCodeOnWagesOffenceDetail").pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data: GenericFormModel<IComplaint_PenaltyCodeOnWagesOffence[]>) => {
          if(data.formModel){
            this.penalityOffenceList = data.formModel;
          }
        })
  }

   onSubmit(){
     if (this.Input_Form.valid) {
         if(this.Input_Form.value.isEmployerPaidLessAmountType){
         this.Input_Form.controls.appRefId.patchValue(this.paramInfo.appRefId);
         this.Input_Form.controls.applicationPurposeType.patchValue(this.paramInfo.applicationPurposeType);
         this.Input_Form.controls.projectSiteVersion.patchValue(this.paramInfo.projectSiteVersion);
         this.Input_Form.controls.rootActivityRefId.patchValue(this.paramInfo.rootActivityRefId);
         this.Input_Form.controls.toDoActivityCategoryType.patchValue(categoryTypeEnum.INDIVIDUAL_COMPLAINT_PENALITY_CODE_ON_WAGES);
         this.Input_Form.controls.applicationType.patchValue(this.paramInfo.applicationType);
          this.appHttpRequestHandlerService.httpPost(this.Input_Form.value, "pbsamadhannetcoreapi.Models.Complaint_PenaltyImpositionCodeOnWage", "Crud", "CreateUpdate").pipe(takeUntil(this.ngUnsubscribe))
                  .subscribe((data: ICRUD_CreateUpdateOperationResponse) => {
                    this.navigateToNextStep(data);
                });

         } else {
           this.Input_Form.markAllAsTouched();
           Object.keys(this.Input_Form.controls).forEach(key => {
             const control = this.Input_Form.get(key);
         
             if (control?.invalid) {
               
          }
           });
         }
        } else {
          if(this.PenalityCodeOnWagesOffenceComponent.offenceList.length > 0){
            this.PenalityCodeOnWagesOffenceComponent.offenceList.forEach((offence, index) => {
            offence.appRefId = this.paramInfo.appRefId;
            offence.applicationPurposeType = this.paramInfo.applicationPurposeType;
            offence.projectSiteVersion = this.paramInfo.projectSiteVersion;
            offence.rootActivityRefId = this.paramInfo.rootActivityRefId;
            offence.toDoActivityCategoryType = categoryTypeEnum.INDIVIDUAL_COMPLAINT_PENALITY_CODE_ON_WAGES_OFFENCE;
            offence.applicationType = this.paramInfo.applicationType;
                        console.log('Offence List:', this.PenalityCodeOnWagesOffenceComponent.offenceList);
               this.appHttpRequestHandlerService.httpPost(offence, "pbsamadhannetcoreapi.Models.Complaint_PenaltyCodeOnWagesOffence", "Crud", "CreateUpdate").pipe(takeUntil(this.ngUnsubscribe))
                  .subscribe((data: ICRUD_CreateUpdateOperationResponse) => {
                    this.navigateToNextStep(data);
                });
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Please add at least one offence before submitting the form.',
            });
          }
        }
    }

   navigateToNextStep(regFormRspData : ICRUD_CreateUpdateOperationResponse){
    this.router.navigate([this.appFormStepsList.find(x=>x.stepCode=='WD').uiNextPageComponentPath],{queryParams: { info: this.commonOpsService.encodeQueryParamsInBase64( 
      { 
        identityKey: regFormRspData.entityKeyId,
        appRefId: regFormRspData.appId,
        applicationType: 100001,
        applicationPurposeType: 0,
        projectSiteVersion: 1,
      })
    }});
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
