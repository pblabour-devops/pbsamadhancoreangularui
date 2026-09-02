import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { applicationTypeEnum } from 'src/app/shared.data';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { IComplaint_Appeal } from '../../samadhaan-typed-modelts';
import { Subject } from 'rxjs';
import { ICRUD_CreateUpdateOperationResponse } from 'src/app/typed-model/crud-typed-models';

@Component({
  selector: 'app-appeal',
  standalone: false,
  templateUrl: './appeal.component.html',
  styleUrl: './appeal.component.css',
})
export class AppealComponent implements AfterViewInit, OnDestroy{
    paramInfo : any
    appFormStepsList : any
    ngUnsubscribe = new Subject<void>();
    orderNumTypes : any[]
  


   constructor(
    private fb: FormBuilder, 
    private route : ActivatedRoute, 
    public commonOpsService : CommonOpsService,
    private appHttpRequestHandlerService : AppHttpRequestHandlerService,
    private router : Router ) {}

      Input_Form : TForm<IComplaint_Appeal> = this.fb.group({
      id : [0, Validators.required],
      orderNumType: ['1'],
      orderDate: ['', Validators.required],
      nameOfAuthority: ['', Validators.required],
      addressOfAuthority: ['', Validators.required],
      nameOfAppellant: ['', [Validators.required]],
      addressOfAppellant: ['', [Validators.email]],
      nameOfRespondent: ['', Validators.required],
      addressOfRespondent: ['India', Validators.required],
      factsOfCase: ['', Validators.required],
      groundOfAppeal: ['', Validators.required],
      reliefsought: ['', Validators.required],
      remarks: [''],
      appRefId: [0, Validators.required],
      applicationType: [applicationTypeEnum.SAMADHAN_COMPLAINTS, Validators.required],
      applicationPurposeType: [0, Validators.required],
      projectSiteVersion: [1, Validators.required],
      toDoActivityModeType: [1, Validators.required],
      rootActivityRefId: ['defaultValue', Validators.required],
      toDoActivityCategoryType: [1, Validators.required]
    })as TForm<IComplaint_Appeal>;

  ngAfterViewInit(){
      this.route.queryParams
        .subscribe(params => {
          this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info) => {
            this.paramInfo = info;
            this.appHttpRequestHandlerService.httpGet({id : this.paramInfo.appRefId , projectSiteId: 0}, "Complaints", "getAppealDetail").pipe(takeUntil(this.ngUnsubscribe))
              .subscribe((data: GenericFormModel<any>) => {
                this.appFormStepsList = data.appFormStepsList;
                  if (data.formModel.id > 0) {
                   const formData = data.formModel;
                  this.Input_Form.patchValue(formData);
                  this.Input_Form.patchValue({ toDoActivityModeType: 2});
                  this.Input_Form.patchValue({rootActivityRefId : 'defaultValue'});
                }
              });
          });
        });
    }
  
    ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

    onSubmit(): void {
      if (this.Input_Form.valid) {
          this.Input_Form.controls.applicationPurposeType.patchValue(0);
          this.Input_Form.controls.projectSiteVersion.patchValue(1);
          this.Input_Form.controls.rootActivityRefId.patchValue('Default');
          this.Input_Form.controls.toDoActivityCategoryType.patchValue(1);
          this.Input_Form.controls.applicationType.patchValue(100001);
          this.appHttpRequestHandlerService.httpPost(this.Input_Form.value, "pbsamadhannetcoreapi.Models.Complaint_Appeal", "Crud", "CreateUpdate").pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((data: ICRUD_CreateUpdateOperationResponse) => {
              // this.navigateToNextStep(data);
              this.mapCategories(data);
          });
      } else {
          this.Input_Form.markAllAsTouched();


    Object.keys(this.Input_Form.controls).forEach(key => {

      const control = this.Input_Form.get(key);


      if (control?.invalid) {
        console.log('❌ INVALID CONTROL:', key, {
          value: control.value,
          errors: control.errors
        });
      }

    });
  }
}

      mapCategories(regFormRspData : ICRUD_CreateUpdateOperationResponse) {
      const issueIds = this.paramInfo.selectedIssues.split(',').map((x: string) => Number(x.trim()));
    issueIds.forEach((issueId: number) => {this.appHttpRequestHandlerService.httpPost({appRefId: regFormRspData.appId,complaintsCategoryRefId: issueId},"pbsamadhannetcoreapi.Models.AppComplaintTypeMapping","Complaints","createAppComplaintTypeMapping").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: ICRUD_CreateUpdateOperationResponse) => {
        if(!data.hasExceptions){
        this.navigateToNextStep(regFormRspData);
        }
      }); 

  });
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
