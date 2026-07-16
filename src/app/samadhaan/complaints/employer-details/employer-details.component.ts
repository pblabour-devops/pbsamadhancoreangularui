import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericFormModel } from 'src/app/generic-implementation/generic-form-builder.type';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { IComplaint_EstablishmentDetail, IComplaint_WorkplaceDetail } from '../../samadhaan-typed-modelts';
import { ICRUD_CreateUpdateOperationResponse } from 'src/app/typed-model/crud-typed-models';

@Component({
  selector: 'app-employer-details',
  standalone: false,
  templateUrl: './employer-details.component.html',
  styleUrl: './employer-details.component.css',
})
export class EmployerDetailsComponent implements OnInit, AfterViewInit, OnDestroy {

  Input_Form!: FormGroup;
  appFormStepsList : any

  // Dropdown / radio option sources
  stateOptions = ['Punjab', 'Haryana', 'Delhi', 'Karnataka'];
  districtOptions = ['Ludhiana', 'Amritsar', 'Chandigarh', 'Dharwad'];
  pincodeOptions = ['141001', '143001', '160001', '580023'];

  categoryOptions = ['Skilled', 'Semi-Skilled', 'Unskilled', 'Highly Skilled'];
  wagePeriodOptions = ['Daily', 'Weekly', 'Monthly'];
  yesNoOptions = ['Yes', 'No'];
  paramInfo : any
  ngUnsubscribe = new Subject<void>();
  appId : any

  constructor(
  private fb: FormBuilder,
  private route : ActivatedRoute,
  private router : Router,
  private commonOpsService : CommonOpsService,
  private appHttpRequestHandlerService : AppHttpRequestHandlerService) {}

  ngOnInit(): void {
    this.Input_Form = this.fb.group({

      workingUnderGovt: ['', Validators.required],

      engagedThroughContractor: ['Yes', Validators.required],
      rateOfWages: [''],

      // Contractor / Employer details
      contractorName: ['', Validators.required],
      contractorAddress: ['', Validators.required],
      state: ['', Validators.required],
      district: ['', Validators.required],
      pincode: ['', Validators.required],
      mobileNumber: ['', [Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.email]],

      // Supporting Documents (dynamic list)
      supportingDocuments: this.fb.array([this.createDocumentControl()]),

      // Workplace Details
      workplaceAddress: ['', Validators.required],
      workplaceState: ['', Validators.required],
      workplaceDistrict: ['', Validators.required],
      workplacePincode: ['', Validators.required],

      // Establishment Details (Principal Employer)
      principalEstablishmentName: ['', Validators.required],
      principalEstablishmentAddress: ['', Validators.required],
      principalState: ['', Validators.required],
      principalDistrict: ['', Validators.required],
      principalPincode: ['', Validators.required],
      principalMobileNumber: [''],
      principalEmail: [''],
      stillWorkingSameEmployer: ['No'],
      natureOfWorkPerformed: [''],
      category: [''],
      dateOfStartEmployment: [''],
      dateOfEndEmployment: [''],
      wagePeriod: [''],
      principalRateOfWages: [''],
    });

    this.Input_Form.get('engagedThroughContractor')?.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => this.updateContractorDependentFields());

    this.updateContractorDependentFields();
  }

  get isEngagedThroughContractor(): boolean {
    return this.Input_Form?.get('engagedThroughContractor')?.value === 'Yes';
  }

  private updateContractorDependentFields(): void {
    const isContractor = this.isEngagedThroughContractor;

    const mobileControl = this.Input_Form.get('mobileNumber');
    if (isContractor) {
      mobileControl?.setValidators([Validators.pattern(/^[0-9]{10}$/)]);
    } else {
      mobileControl?.setValidators([Validators.required, Validators.pattern(/^[0-9]{10}$/)]);
    }
    mobileControl?.updateValueAndValidity();

    const principalFields = [
      'principalEstablishmentName',
      'principalEstablishmentAddress',
      'principalState',
      'principalDistrict',
      'principalPincode',
    ];

    principalFields.forEach((field) => {
      const control = this.Input_Form.get(field);
      if (isContractor) {
        control?.setValidators(Validators.required);
      } else {
        control?.clearValidators();
        control?.setValue('');
      }
      control?.updateValueAndValidity();
    });
  }

  ngAfterViewInit(){
  this.route.queryParams
        .subscribe(params => {
          this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info) => {
            this.paramInfo = info;
            this.appId = this.paramInfo.appId;
            console.log('paraminfor', this.paramInfo);
            // this.appHttpRequestHandlerService.httpGet({appRefId : this.paramInfo?.appRefId , projectSiteId: 0}, "Complaints", "getEmployerDetails").pipe(takeUntil(this.ngUnsubscribe))
            //   .subscribe((data: GenericFormModel<any>) => {
            //     this.appFormStepsList = data.appFormStepsList;
            //     // this.projectSite = data.formModel;
            //     // this.appHttpRequestHandlerService.httpGet({ id: this.paramInfo?.identityKey, projectSiteId: this.paramInfo?.projectSiteRefId }, "BuildingPlan", "getbuildingplandetail").pipe(takeUntil(this.ngUnsubscribe))
            //     //   .subscribe((data: GenericFormModel<BuildingPlan_GeneralDetail>) => {
            //     //     this.initFormData(data)
            //     //     this.BuildingPlan_GeneralDetail_Form.controls.projectSiteRefId.patchValue(this.paramInfo?.projectSiteRefId);
            //     //     this.BuildingPlan_GeneralDetail_Form.controls.establishmentRefId.patchValue(this.paramInfo?.establishmentRefId);
            //     //     this.BuildingPlan_GeneralDetail_Form.controls.applicationPurposeType.patchValue(this.paramInfo?.applicationPurposeType);
            //     //   });
            //   });
          });
        });
  }

  // ---------- FormArray helpers for Supporting Documents ----------

  get supportingDocuments(): FormArray {
    return this.Input_Form.get('supportingDocuments') as FormArray;
  }

  createDocumentControl(): FormControl {
    return this.fb.control(null);
  }

  addDocument(): void {
    this.supportingDocuments.push(this.createDocumentControl());
  }

  removeDocument(index: number): void {
    if (this.supportingDocuments.length > 1) {
      this.supportingDocuments.removeAt(index);
    }
  }

  onFileChange(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.supportingDocuments.at(index).setValue(input.files[0]);
    }
  }

  // ---------- Action handlers ----------

  onReset(): void {
    this.Input_Form.reset({
      engagedThroughContractor: 'Yes',
      stillWorkingSameEmployer: 'No',
    });

    this.updateContractorDependentFields();

    // Reset supporting documents back to a single empty control
    while (this.supportingDocuments.length > 1) {
      this.supportingDocuments.removeAt(1);
    }
    this.supportingDocuments.at(0).setValue(null);
  }

  onSaveDraft(): void {
    console.log('Saved as Draft:', this.Input_Form.value);
    // Call save-draft API service here
  }

  onBack(): void {
    console.log('Navigate back to previous tab');
    // Emit event / navigate to Worker Details tab
  }

 

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  // new

  workPlaceDetailData: IComplaint_WorkplaceDetail
  establishmentDetailData : IComplaint_EstablishmentDetail
  employerOrContractorData : any

   employerOrContractorDetailDataEventListener(data: any){
    this.employerOrContractorData=data;
  }

  workPlaceDetailDataEventListener(data: IComplaint_WorkplaceDetail){
    this.workPlaceDetailData=data;
  }

   establishmentDetailDataEventListener(data: IComplaint_EstablishmentDetail ){
    this.establishmentDetailData=data;
  }

   onSubmit(): void {
    this.employerOrContractorData.forEach(element => {
      this.appHttpRequestHandlerService.httpPost(element, "pbsamadhannetcoreapi.Models.Complaint_EmployerORContractorDetail", "Crud", "CreateUpdate").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((empFormRspData: ICRUD_CreateUpdateOperationResponse) => {
    this.workPlaceDetailData.appRefId = this.paramInfo?.appRefId;
    this.workPlaceDetailData.projectSiteRefId=388263;
    this.workPlaceDetailData.applicationPurposeType=0;
    this.workPlaceDetailData.iPin=0;
    this.workPlaceDetailData.investPunjab_AppId=0;
    this.workPlaceDetailData.projectSiteVersion=1;
    this.workPlaceDetailData.rootActivityRefId='defaultValue';
    this.workPlaceDetailData.toDoActivityCategoryType=2002;
    this.workPlaceDetailData.applicationType=100001;
      this.appHttpRequestHandlerService.httpPost(this.workPlaceDetailData, "pbsamadhannetcoreapi.Models.Complaint_WorkplaceDetail", "Crud", "CreateUpdate").pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((empFormRspData: ICRUD_CreateUpdateOperationResponse) => {
    this.establishmentDetailData.appRefId = this.paramInfo?.appRefId;
    this.establishmentDetailData.projectSiteRefId= 388263;
    this.establishmentDetailData.applicationPurposeType=0;
    this.establishmentDetailData.iPin=0;
    this.establishmentDetailData.investPunjab_AppId=0;
    this.establishmentDetailData.projectSiteVersion=1;
    this.establishmentDetailData.rootActivityRefId='defaultValue';
    this.establishmentDetailData.toDoActivityCategoryType=2003;
    this.establishmentDetailData.applicationType=100001;
      this.appHttpRequestHandlerService.httpPost(this.establishmentDetailData, "pbsamadhannetcoreapi.Models.Complaint_EstablishmentDetail", "Crud", "CreateUpdate").pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((empFormRspData: ICRUD_CreateUpdateOperationResponse) => {
          debugger;
          this.router.navigate(
            [this.appFormStepsList.find((x) => x.stepCode == 'EED')?.uiNextPageComponentPath],
            {
              queryParams: {
                info: this.commonOpsService.encodeQueryParamsInBase64({
                  appRefId: empFormRspData?.appId,
                  applicationType: 200001,
                  projectSiteRefId: this.paramInfo?.projectSiteRefId,
                  applicationPurposeType: this.paramInfo?.applicationPurposeType,
                  investPunjab_AppId: this.paramInfo?.investPunjab_AppId,
                  iPin: this.paramInfo?.iPin,
                  projectSiteVersion: this.paramInfo?.projectSiteVersion,
                }),
              },
            }
          );
      });
      });
    })
    });

  }

  formStepperDataEventListener(data:any){
  this.appFormStepsList = data;
  }

  // end
}
