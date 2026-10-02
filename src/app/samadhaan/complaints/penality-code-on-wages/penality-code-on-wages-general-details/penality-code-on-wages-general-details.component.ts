import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TForm, GenericFormModel } from 'src/app/generic-implementation/generic-form-builder.type';
import { IComplaint_PenaltyImpositionCodeOnWage } from 'src/app/samadhaan/samadhaan-typed-modelts';
import { applicationTypeEnum, categoryTypeEnum } from 'src/app/shared.data';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';

@Component({
  selector: 'app-penality-code-on-wages-general-details',
  standalone: false,
  templateUrl: './penality-code-on-wages-general-details.component.html',
  styleUrl: './penality-code-on-wages-general-details.component.css',
})
export class PenalityCodeOnWagesGeneralDetailsComponent {

   isEmployerPaidLessAmountType :any[]
   ClaimApplicationRefId : any[]
   appFormStepsList : any[]
   paramInfo : any;
   ngUnsubscribe = new Subject<void>();
   
   constructor(
    private fb:FormBuilder, 
    private route : ActivatedRoute,
    private commonOpsService : CommonOpsService,
    private appHttpRequestHandlerService : AppHttpRequestHandlerService){}
   
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
        });
      });
  }

   onSubmit(){
     if (this.Input_Form.valid) {
         this.Input_Form.controls.appRefId.patchValue(this.paramInfo.appRefId);
         this.Input_Form.controls.applicationPurposeType.patchValue(this.paramInfo.applicationPurposeType);
         this.Input_Form.controls.projectSiteVersion.patchValue(this.paramInfo.projectSiteVersion);
         this.Input_Form.controls.rootActivityRefId.patchValue(this.paramInfo.rootActivityRefId);
         this.Input_Form.controls.toDoActivityCategoryType.patchValue(categoryTypeEnum.INDIVIDUAL_COMPLAINT_PENALTY_IMPOSITION_INDUSTRIAL_RELATION_CODE);
         this.Input_Form.controls.applicationType.patchValue(this.paramInfo.applicationType);

         } else {
           this.Input_Form.markAllAsTouched();
           Object.keys(this.Input_Form.controls).forEach(key => {
             const control = this.Input_Form.get(key);
         
             if (control?.invalid) {
               
     }
           });
         }
    }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
