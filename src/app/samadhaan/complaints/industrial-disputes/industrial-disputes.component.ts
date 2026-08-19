import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TForm, GenericFormModel } from 'src/app/generic-implementation/generic-form-builder.type';
import { applicationTypeEnum, categoryTypeEnum } from 'src/app/shared.data';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { ICRUD_CreateUpdateOperationResponse } from 'src/app/typed-model/crud-typed-models';
import { IComplaint_IndustrialDispute, IComplaint_IndustrialDisputeReasonMapping, IComplaint_IndustrialDisputeReliefSoughtMapping } from '../../samadhaan-typed-modelts';

@Component({
  selector: 'app-industrial-disputes',
  standalone: false,
  templateUrl: './industrial-disputes.component.html',
  styleUrl: './industrial-disputes.component.css',
})
export class IndustrialDisputesComponent {
  paramInfo : any
    appFormStepsList : any
    ngUnsubscribe = new Subject<void>();
    industrialDisputeTypes : any[]
    industrialDisputeReasonTypes : any[]
    reliefSoughtTypes : any[]
    industrialDisputeReasonArray: number[] =[]
    industrialDisputeReliefSoughtArray: number[] =[]

   constructor(
    private fb: FormBuilder, 
    private route : ActivatedRoute, 
    public commonOpsService : CommonOpsService,
    private appHttpRequestHandlerService : AppHttpRequestHandlerService,
    private router : Router ) {}

      Input_Form : TForm<IComplaint_IndustrialDispute> = this.fb.group({
      id : [0, Validators.required],
      industrialDisputeType: ['1'],
      dateOfAppointment: ['', Validators.required],
      dateOfAction: ['', Validators.required],
      industrialDisputeReasonTypes : ['', Validators.required],
      industrialDisputeReliefSoughtTypes : ['', Validators.required],
      industrialDisputeDetails: ['asdf', Validators.required],
      otherReason: ['', [Validators.required]],
      otherRelief: ['', [Validators.required]],
      remarks: ['asdf', Validators.required],
      appRefId: [0, Validators.required],
      applicationType: [applicationTypeEnum.SAMADHAN_COMPLAINTS, Validators.required],
      applicationPurposeType: [0, Validators.required],
      projectSiteVersion: [1, Validators.required],
      toDoActivityModeType: [1, Validators.required],
      rootActivityRefId: [''],
      toDoActivityCategoryType: [1, Validators.required]
    })as TForm<IComplaint_IndustrialDispute>;

  ngAfterViewInit(){
      this.route.queryParams
        .subscribe(params => {
          this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info) => {
            this.paramInfo = info;
            this.appHttpRequestHandlerService.httpGet({id : this.paramInfo.appRefId}, "Complaints", "getIndustrialDisputeDetail").pipe(takeUntil(this.ngUnsubscribe))
              .subscribe((data: GenericFormModel<IComplaint_IndustrialDispute>) => {
                this.industrialDisputeTypes = data.enumTemplateLists.find(e => e.selectListTypeCode == 'IndustrialDisputeTypeEnum').selectListItems
                this.appFormStepsList = data.appFormStepsList;
                 
                  if (data.formModel) {
                   const formData = data.formModel;
                  this.Input_Form.patchValue(formData);
                  this.Input_Form.patchValue({ toDoActivityModeType: 2});
                  this.Input_Form.patchValue({rootActivityRefId : 'defaultValue'});
                }
              });
          });
          this.getIndustrialDisputeReasons();
          this.getIndustrialDisputeReliefSougths();
        });
    }


    getIndustrialDisputeReasons(){
    this.appHttpRequestHandlerService.httpGet({id : this.paramInfo.appRefId}, "Complaints", "getIndustrialReasonDetail").pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data: GenericFormModel<IComplaint_IndustrialDisputeReasonMapping[]>) => {
                this.industrialDisputeReasonTypes = data.enumTemplateLists.find(e => e.selectListTypeCode == 'IndustrialDisputesReasonTypeEnum').selectListItems

          if(data.formModel && data.formModel.length > 0){
            data.formModel.forEach((value: IComplaint_IndustrialDisputeReasonMapping) => {
              this.industrialDisputeReasonArray.push(value.industrialDisputesReasonType);
            })
          }
          this.Input_Form.controls.industrialDisputeReasonTypes.patchValue(this.industrialDisputeReasonArray);
    })
    }

    getIndustrialDisputeReliefSougths(){
    this.appHttpRequestHandlerService.httpGet({id : this.paramInfo.appRefId}, "Complaints", "getIndustrialReliefSoughtDetail").pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data: GenericFormModel<IComplaint_IndustrialDisputeReliefSoughtMapping[]>) => {
            this.reliefSoughtTypes = data.enumTemplateLists.find(e => e.selectListTypeCode == 'IndustrialDisputesReliefSoughtType').selectListItems

            if(data.formModel && data.formModel.length > 0){
            data.formModel.forEach((value: IComplaint_IndustrialDisputeReliefSoughtMapping) => {
              this.industrialDisputeReliefSoughtArray.push(value.industrialDisputesReliefSoughtType);
            })
          }
          this.Input_Form.controls.industrialDisputeReliefSoughtTypes.patchValue(this.industrialDisputeReliefSoughtArray);
    })
    }
  
    ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

    onSubmit(): void {
      if (this.Input_Form.valid) {
          this.saveIndustrailDisputeReasonDetails();
          return;
          this.saveIndustrailDisputeReliefSoughtDetails()
          this.Input_Form.controls.applicationPurposeType.patchValue(this.paramInfo.applicationPurposeType);
          this.Input_Form.controls.projectSiteVersion.patchValue(this.paramInfo.projectSiteVersion);
          this.Input_Form.controls.rootActivityRefId.patchValue(this.paramInfo.rootActivityRefId);
          this.Input_Form.controls.toDoActivityCategoryType.patchValue(categoryTypeEnum.INDIVIDUAL_COMPLAINT_INDUSTRIAL_DISPUTES);
          this.Input_Form.controls.applicationType.patchValue(this.paramInfo.applicationType);
          console.log('input form value', this.Input_Form.value);
          this.appHttpRequestHandlerService.httpPost(this.Input_Form.value, "pbsamadhannetcoreapi.Models.Complaint_IndustrialDispute", "Crud", "CreateUpdate").pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((data: ICRUD_CreateUpdateOperationResponse) => {
          });
      } else {
          this.Input_Form.markAllAsTouched();
         console.log('input form', this.Input_Form.value);
    console.log('❌ Form is invalid');

    Object.keys(this.Input_Form.controls).forEach(key => {

      const control = this.Input_Form.get(key);

      console.log('Control:', key);
      console.log('Value:', control?.value);
      console.log('Valid:', control?.valid);
      console.log('Errors:', control?.errors);

      if (control?.invalid) {
        console.log('❌ INVALID CONTROL:', key, {
          value: control.value,
          errors: control.errors
        });
      }

    });
  }
}

   saveIndustrailDisputeReasonDetails(){
      const industrialDisputeReasonOptions = this.Input_Form.get('industrialDisputeReasonTypes')?.value as string[];

      industrialDisputeReasonOptions.forEach((value: string) => {
      const data: any = {};
      data.id = 0;
      data.appRefId = this.paramInfo.appRefId;
      data.applicationPurposeType = this.paramInfo.applicationPurposeType;
      data.projectSiteVersion =this.paramInfo.projectSiteVersion
      data.rootActivityRefId  = this.paramInfo.rootActivityRefId;
      data.applicationType = this.paramInfo.applicationType;
      data.toDoActivityCategoryType = categoryTypeEnum.INDIVIDUAL_COMPLAINT_IND_DIS_REASON;
      data.todoActivityModeType = this.industrialDisputeReasonArray.length > 0 ? 2 : 1;
      data.IndustrialDisputesReasonType = Number(value);
      console.log('data', data);
      this.appHttpRequestHandlerService.httpPost(data, "pbsamadhannetcoreapi.Models.Complaint_IndustrialDisputeReasonMapping", "Crud", "CreateUpdate").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: ICRUD_CreateUpdateOperationResponse) => {
       console.log('Money Due Details saved successfully for value:', value);
      });
    })
  }

  saveIndustrailDisputeReliefSoughtDetails(){
     const industrialDisputeReliefSoughtOptions = this.Input_Form.get('industrialDisputeReliefSoughtTypes')?.value as string[];

      industrialDisputeReliefSoughtOptions.forEach((value: string) => {
      const data: any = {};
      data.id = 0;
      data.appRefId = this.paramInfo.appRefId;
      data.applicationPurposeType = this.paramInfo.applicationPurposeType;
      data.projectSiteVersion =this.paramInfo.projectSiteVersion
      data.rootActivityRefId  = '';
      data.applicationType = 100001;
      data.toDoActivityCategoryType = categoryTypeEnum.INDIVIDUAL_COMPLAINT_IND_DIS_REL_SOU;
      data.todoActivityModeType = this.industrialDisputeReliefSoughtArray.length > 0 ? 2 : 1;
      data.IndustrialDisputesReliefSoughtType = Number(value);
      this.appHttpRequestHandlerService.httpPost(data, "pbsamadhannetcoreapi.Models.Complaint_IndustrialDisputeReliefSoughtMapping", "Crud", "CreateUpdate").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: ICRUD_CreateUpdateOperationResponse) => {
       console.log('Money Due Details saved successfully for value:', value);
      });
    })
  }


     navigateToNextStep(regFormRspData : ICRUD_CreateUpdateOperationResponse){
        this.router.navigate([this.appFormStepsList.find(x=>x.stepCode=='AP').uiNextPageComponentPath],{queryParams: { info: this.commonOpsService.encodeQueryParamsInBase64( 
        { 
          identityKey: regFormRspData.entityKeyId,
          appRefId: regFormRspData.appId,
          applicationType: 100001,
          applicationPurposeType: 0,
          projectSiteVersion: 1,
        })
      }});
  }
  
}
