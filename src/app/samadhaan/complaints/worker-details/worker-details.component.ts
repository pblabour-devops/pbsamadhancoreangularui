import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TForm, GenericFormModel } from 'src/app/generic-implementation/generic-form-builder.type';
import { ProjectSite } from 'src/app/project-site/project-site-typed-module';
import { applicationTypeEnum } from 'src/app/shared.data';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { ICRUD_CreateUpdateOperationResponse } from 'src/app/typed-model/crud-typed-models';
import { WorkerFormModel } from '../../../dashboard/dashboard-typed-models';

@Component({
  selector: 'app-worker-details',
  templateUrl: './worker-details.component.html',
  styleUrl: './worker-details.component.css',
  standalone : false
})
export class WorkerDetailsComponent {
 genderOptions = ['Male', 'Female', 'Other'];
  maritalStatusOptions = ['Single', 'Married', 'Divorced', 'Widowed'];

  countryOptions = ['India'];

  isEmailVerified: boolean = false;
  ngUnsubscribe = new Subject<void>();
  allDistricts: any = [];
  paramInfo : any
  appFormStepsList : any

  constructor(
  private fb: FormBuilder, 
  private route : ActivatedRoute, 
  public commonOpsService : CommonOpsService,
  private appHttpRequestHandlerService : AppHttpRequestHandlerService,
  private router : Router ) {}

  Input_Form : TForm<WorkerFormModel> = this.fb.group({
    id : [0, Validators.required],
    name: ['', Validators.required],
    gender: ['', Validators.required],
    designation: ['', Validators.required],
    maritalStatus: ['', Validators.required],
    mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    email: ['', [Validators.email]],
    permanentAddress: ['', Validators.required],
    permanentCountry: ['India', Validators.required],
    permanentState: ['', Validators.required],
    permanentDistrictRefId: ['', Validators.required],
    permanentPincode: ['', Validators.required],
    sameAsAbove: [''],
    correspondenceAddress: ['', Validators.required],
    correspondenceCountry: ['India', Validators.required],
    correspondenceState: ['', Validators.required],
    correspondenceDistrictRefId: ['', Validators.required],
    correspondencePincode: ['', Validators.required],
    appRefId: [0, Validators.required],
    projectSiteRefId: [0, Validators.required],
    applicationType: [applicationTypeEnum.SAMADHAN_COMPLAINTS, Validators.required],
    applicationPurposeType: [0, Validators.required],
    iPin: [0, Validators.required],
    investPunjab_AppId: [0, Validators.required],
    factoryCircleRefId: [1, Validators.required],
    projectSiteVersion: [0, Validators.required],
    toDoActivityModeType: [1, Validators.required],
    rootActivityRefId: ['defaultValue', Validators.required],
    toDoActivityCategoryType: [1017, Validators.required]
    })as TForm<WorkerFormModel>;

  ngOnInit(): void {
    // Watch for checkbox changes
    this.Input_Form.get('sameAsAbove')?.valueChanges.subscribe((checked: boolean) => {
      this.toggleCorrespondenceAddress(checked);
    });

    // Initialize on load
    this.toggleCorrespondenceAddress(this.Input_Form.get('sameAsAbove')?.value);
  }

  ngAfterViewInit(){
    this.getDistricts();
    this.route.queryParams
      .subscribe(params => {
        this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info) => {
          this.paramInfo = info;
          this.appHttpRequestHandlerService.httpGet({id : this.paramInfo.appRefId , projectSiteId: 0}, "Complaints", "getWorkerDetails").pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((data: GenericFormModel<any>) => {
              this.appFormStepsList = data.appFormStepsList;
                if (data.formModel.id > 0) {
                 const formData = data.formModel;
                Object.keys(formData).forEach(key => {
                  if (
                    formData[key] &&
                    typeof formData[key] === 'string' &&
                    formData[key].includes('T')
                  ) {
                    formData[key] = formData[key].split('T')[0];
                  }
                });

                this.Input_Form.patchValue(formData);
                this.Input_Form.patchValue({ toDoActivityModeType: 2});
                this.Input_Form.patchValue({rootActivityRefId : 'defaultValue'});
              }
            });
        });
      });
  }

 getDistricts(): void {
  this.appHttpRequestHandlerService.httpGet(null, "CommonApis", "getalldistrict")
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: GenericFormModel<any>) => {
      this.allDistricts = data.formModel.filter(
        district => district.stateRefId === 3
      );
    });
}

  toggleCorrespondenceAddress(checked: boolean): void {
  const permanentAddress = this.Input_Form.get('permanentAddress')?.value;
  const permanentCountry = this.Input_Form.get('permanentCountry')?.value;
  const permanentState = this.Input_Form.get('permanentState')?.value;
  const permanentDistrict = this.Input_Form.get('permanentDistrictRefId')?.value;
  const permanentPincode = this.Input_Form.get('permanentPincode')?.value;

  const correspondenceAddress = this.Input_Form.get('correspondenceAddress');
  const correspondenceCountry = this.Input_Form.get('correspondenceCountry');
  const correspondenceState = this.Input_Form.get('correspondenceState');
  const correspondenceDistrict = this.Input_Form.get('correspondenceDistrictRefId');
  const correspondencePincode = this.Input_Form.get('correspondencePincode');

  if (checked) {
    correspondenceAddress?.setValue(permanentAddress, { emitEvent: false });
    correspondenceCountry?.setValue(permanentCountry, { emitEvent: false });
    correspondenceState?.setValue(permanentState, { emitEvent: false });
    correspondenceDistrict?.setValue(permanentDistrict, { emitEvent: false });
    correspondencePincode?.setValue(permanentPincode, { emitEvent: false });

    // correspondenceAddress?.disable({ emitEvent: false });
    // correspondenceCountry?.disable({ emitEvent: false });
    // correspondenceState?.disable({ emitEvent: false });
    // correspondenceDistrict?.disable({ emitEvent: false });
    // correspondencePincode?.disable({ emitEvent: false });
  } else {
    // correspondenceAddress?.enable({ emitEvent: false });
    // correspondenceCountry?.enable({ emitEvent: false });
    // correspondenceState?.enable({ emitEvent: false });
    // correspondenceDistrict?.enable({ emitEvent: false });
    // correspondencePincode?.enable({ emitEvent: false });
  }

}

  verifyEmail(): void {
    const emailControl = this.Input_Form.get('email');
    if (emailControl?.valid && emailControl.value) {
      // Simulate email verification (replace with actual API call)
      this.isEmailVerified = true;                   
    }
  }

  onReset(): void {
    this.Input_Form.reset({
      permanentAddress: {
        country: 'India'
      },
      correspondenceAddress: {
        country: 'India'
      },
      sameAsAbove: true
    });
    this.isEmailVerified = false;
  }

  onSaveDraft(): void {
    console.log('Saved as Draft:', this.Input_Form.value);
  }

  onSubmit(): void {
    if (this.Input_Form.valid) {
        this.Input_Form.controls.applicationPurposeType.patchValue(0);
        // this.Input_Form.controls.iPin.patchValue(0);
        // this.Input_Form.controls.investPunjab_AppId.patchValue(0);
        this.Input_Form.controls.projectSiteVersion.patchValue(1);
        // this.Input_Form.controls..patchValue(1); // Static FactoryCircleRefId
        this.Input_Form.controls.rootActivityRefId.patchValue('Default');
        this.Input_Form.controls.toDoActivityCategoryType.patchValue(1);
        this.Input_Form.controls.applicationType.patchValue(100001);
        // this.Input_Form.controls.projectSiteRefId.patchValue(388263); // static 
        this.appHttpRequestHandlerService.httpPost(this.Input_Form.value, "pbsamadhannetcoreapi.Models.WorkerDetail", "Crud", "CreateUpdate").pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: ICRUD_CreateUpdateOperationResponse) => {
          // if(this.Input_Form.value.appRefId !=0){
            this.navigateToNextStep(data);
          // } else {
          // this.mapCategories(data);
          // }
            // this.router.navigate([this.appFormStepsList.find(x=>x.stepCode=='EPFO').uiNextPageComponentPath],{queryParams: { info: this.commonOpsService.encodeQueryParamsInBase64( {
            //   identityKey: data.entityKeyId, 
            //   appRefId: data.appId, 
            //   applicationType: 101, 
            //   projectSiteRefId: this.paramInfo?.projectSiteRefId,
            //   applicationPurposeType: this.paramInfo?.applicationPurposeType,
            //   investPunjab_AppId: this.paramInfo?.investPunjab_AppId,
            //   iPin: this.paramInfo?.iPin,
            //   projectSiteVersion: this.projectSiteVersion
            // })}});
        });
    } else {
      this.Input_Form.markAllAsTouched();
      Object.keys(this.Input_Form.controls).forEach(key => {
    const control = this.Input_Form.get(key);

    if (control?.invalid) {
      console.log(`Field: ${key}`);
      console.log('Value:', control.value);
      console.log('Errors:', control.errors);
    }
  });
    }
  }

  mapCategories(regFormRspData : ICRUD_CreateUpdateOperationResponse) {
  const issueIds = this.paramInfo.selectedIssues.split(',').map((x: string) => Number(x.trim()));

  issueIds.forEach((issueId: number) => {
    this.appHttpRequestHandlerService.httpPost(  {
    appRefId: regFormRspData.appId,
    complaintsCategoryRefId: issueId
  },
  "pbsamadhannetcoreapi.Models.AppComplaintTypeMapping","Complaints","createAppComplaintTypeMapping")
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: ICRUD_CreateUpdateOperationResponse) => {
      console.log(`Issue ${issueId} mapped successfully`);
      if(!data.hasExceptions){
      this.navigateToNextStep(regFormRspData);
      }
    }); 

  });
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
