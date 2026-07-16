import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, UntypedFormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonService } from 'src/app/common/common.service';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { ProjectSite } from 'src/app/project-site/project-site-typed-module';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { CommonLicenceService } from '../commonLicence-service';
import { CommonLicence_GeneralDetail } from '../commonLicence-typed-models';

@Component({
    selector: 'app-add-update-general-detail',
    templateUrl: './add-update-general-detail.component.html',
    styleUrls: ['./add-update-general-detail.component.css'],
    standalone: false
})

export class AddUpdateGeneralDetailComponent implements OnInit {

  CommonLicence_GeneralDetail_fb: UntypedFormGroup;

  genericFormData: GenericFormModel<CommonLicence_GeneralDetail>;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  public appFormStepsList: any[];
  public projectSite: ProjectSite;
  public tehsilsList:any;
  public paramInfo:any;
  public projectSiteRefId : number;
  public parmamEncodedinfo:string;
  constructor(private fb: UntypedFormBuilder,
    public establishmentService: CommonLicenceService,
    private route: ActivatedRoute,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private common:CommonService,
    public commonOpsService: CommonOpsService) { 
    }
    
  //initialization of form
  CommonLicence_GeneralDetail_Form: TForm<CommonLicence_GeneralDetail> = this.fb.group({
    commonLicenceId: ['', Validators.required],
    
      IsFactory: [false,Validators.required],
      IsEngagementOfContractor:[false,Validators.required],
      IsBeediAndCigar:[false,Validators.required] ,

    occupierOrPE_Name : ['', Validators.required],
    occupierOrPE_Permanent_Address : ['', Validators.required],
    occupierOrPE_VillageOrTown : ['', Validators.required],
    occupierOrPE_TehsilRefId: ['', Validators.required],
    occupierOrPE_DistrictRefId : ['', Validators.required],
    occupierOrPE_PinCode: ['', Validators.required],
    occupierOrPE_Email : ['', Validators.required],
    occupierOrPE_PhoneNumber : ['', [Validators.required,Validators.maxLength(10)]],

    occupierOrPE_Local_Address : ['', Validators.required],
    occupierOrPE_Local_VillageOrTown : ['', Validators.required],
    occupierOrPE_Local_TehsilRefId : ['', Validators.required],
    occupierOrPE_Local_DistrictRefId : ['', Validators.required],
    occupierOrPE_Local_PinCode : ['', Validators.required],

    owner_Name : ['', Validators.required],
    owner_PartnershipShare : ['', Validators.required],
    owner_Address :  ['', Validators.required],
    owner_VillageOrTown :  ['', Validators.required],
    owner_TehsilRefId : ['', Validators.required],
    owner_DistrictRefId : ['', Validators.required],
    owner_PinCode : ['', Validators.required],

    coreActivity : ['', Validators.required],
    nationalIndustrialClassificationCode : ['', Validators.required],
    totalNoWorkersToBeEmployedInLicence : ['', Validators.required],
    totalNoWorkersToBeEmployedDuringLastYear : ['', Validators.required],
    electricLoadConnectedInKilowatts : ['', Validators.required],
    approvedBuildingPlanNumber : ['', Validators.required],
    approvedBuildingPlanDate : ['', Validators.required],
    stabilityCertificateNumber : ['', Validators.required],
    dateOfStabilityCertificateApproval : ['', Validators.required],
    disposalOfTrade : ['', Validators.required],
    
    appRefId: [0, Validators.required],
    establishmentRefId : ['', Validators.required],
    projectSiteRefId : ['', Validators.required],
    applicationPurposeType : ['', Validators.required]
  }) as TForm<CommonLicence_GeneralDetail>;

  ngOnInit(): void { 
    this.route.queryParams
      .subscribe(params => {
        this.parmamEncodedinfo=params.info;
        this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info)=>{
          this.paramInfo = info;
          this.CommonLicence_GeneralDetail_Form.controls.projectSiteRefId.patchValue(this.paramInfo?.projectSiteRefId);
          this.CommonLicence_GeneralDetail_Form.controls.establishmentRefId.patchValue(this.paramInfo?.establishmentRefId);
          this.CommonLicence_GeneralDetail_Form.controls.commonLicenceId.patchValue(this.paramInfo?.identityKey);
          this.CommonLicence_GeneralDetail_Form.controls.applicationPurposeType.patchValue(this.paramInfo?.applicationPurposeType);
          this.appHttpRequestHandlerService.httpGet({ projectSiteId: this.paramInfo?.projectSiteRefId, appRefId : this.CommonLicence_GeneralDetail_Form.controls.appRefId.value }, "ProjectSite", "getProjectsitesByProfileSiteId").pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((data: GenericFormModel<ProjectSite>) => { 
              this.projectSite = data.formModel;
              this.appHttpRequestHandlerService.httpGet({ id: this.paramInfo?.identityKey, projectSiteRefId : this.paramInfo?.projectSiteRefId }, "CommonLicence", "getgeneraldetail").pipe(takeUntil(this.ngUnsubscribe))
                .subscribe((data: GenericFormModel<CommonLicence_GeneralDetail>) => { this.initFormData(data)}
                );
            });
        });
      });
  }
  ngAfterViewInit() {}

  initFormData(genericFormData: GenericFormModel<CommonLicence_GeneralDetail>) {
    this.genericFormData = genericFormData;
    this.appFormStepsList = this.genericFormData.appFormStepsList;
    if (genericFormData.formModel != null && genericFormData.formModel.commonLicenceId != 0) {
      this.CommonLicence_GeneralDetail_Form.patchValue(genericFormData.formModel);
      this.tehsilsList= this.filterListTemplate('Comm_Tehsils');
    }
  }

  onSubmit(): void {
    this.appHttpRequestHandlerService.httpPost(this.CommonLicence_GeneralDetail_Form.value,"pbsamadhannetcoreapi.Models.CommonLicence_GeneralDetail", "CommonLicence", "addupdate_generaldetails").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericServiceResultTemplate) => {
        this.router.navigate(['/commonLicence/addupdatecontractordetail'], { queryParams: { info:  this.commonOpsService.encodeQueryParamsInBase64( {identityKey: this.paramInfo?.identityKey, appRefId: this.paramInfo.appRefId, applicationType: 4, projectSiteRefId: this.paramInfo?.projectSiteRefId})}});
      });
  }
  filterListTemplate(listTypeCode) {
    var itemsList = this.genericFormData?.listTemplateLists.filter(object => {
      return object['listTypeCode'] == listTypeCode;
      });
      if(itemsList!=undefined && itemsList.length>0){
        return itemsList[0].listItems;
      } 
    return null;
  }
  

  public getTehsilsByDistrictRefId(occupierOrPE_DistrictRefId, targetTehsilCtrlName){
    this.CommonLicence_GeneralDetail_Form.controls.occupierOrPE_TehsilRefId.patchValue('');
    if(occupierOrPE_DistrictRefId!=''){
      this.appHttpRequestHandlerService.httpGet({ id: occupierOrPE_DistrictRefId }, "CommonApis", "gettehsilsbydistrictrefid").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data) => { 
        this.tehsilsList = data; 
      });
    }
  }
  // This Method is used for local Tehsil based on district
  public getLocalTehsilsByDistrictRefId(occupierOrPE_Local_DistrictRefId, targetTehsilCtrlName){
    this.CommonLicence_GeneralDetail_Form.controls.occupierOrPE_Local_TehsilRefId.patchValue('');
    if(occupierOrPE_Local_DistrictRefId!=''){
      this.appHttpRequestHandlerService.httpGet({ id: occupierOrPE_Local_DistrictRefId }, "CommonApis", "gettehsilsbydistrictrefid").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data) => { 
        this.tehsilsList = data; 
      });
    }
  }

// This Method is used for owner Tehsil based on district
  public getOwnerTehsilsByDistrictRefId(owner_DistrictRefId, targetTehsilCtrlName){
    this.CommonLicence_GeneralDetail_Form.controls.owner_TehsilRefId.patchValue('');
    if(owner_DistrictRefId!=''){
      this.appHttpRequestHandlerService.httpGet({ id: owner_DistrictRefId }, "CommonApis", "gettehsilsbydistrictrefid").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data) => { 
        this.tehsilsList = data; 
      });
    }
  }

  // Check Box For applicationPurposeType
  onCheckboxChange(event: any,fc:string,fg?:string) {
    //let subForm=<FormGroup>this.CommonLicence_GeneralDetail_Form.get(fg);
    if (event.target.checked) {
      this.CommonLicence_GeneralDetail_Form.get(fc).setValue(true);
    }else{
      this.CommonLicence_GeneralDetail_Form.get(fc).setValue(false);
    }
  }

  updateNicCode(event){
    this.CommonLicence_GeneralDetail_Form.controls.nationalIndustrialClassificationCode.patchValue(JSON.stringify(event));
  }

  btnHomeClick(){
    this.router.navigate(['/project/sites']);
 }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
