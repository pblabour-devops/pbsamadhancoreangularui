import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { CommonLicence_ContractorDetail } from '../commonLicence-typed-models';

@Component({
    selector: 'app-add-update-contractor-detail',
    templateUrl: './add-update-contractor-detail.component.html',
    styleUrls: ['./add-update-contractor-detail.component.css'],
    standalone: false
})
export class AddUpdateContractorDetailComponent implements OnInit {
  genericFormData: GenericFormModel<CommonLicence_ContractorDetail>;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  public businessTypeEnum: any = [];
  public appFormStepsList: any[];
  public tehsilsList:any;
  public paramInfo:any;
  public parmamEncodedinfo:string;

  constructor(private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    public commonOpsService: CommonOpsService) { }

  //initialization of form
  CommonLicence_ContractorDetail_Form: TForm<CommonLicence_ContractorDetail> = this.fb.group({
    commonLicence_ContractorDetailId : [0, Validators.required],
    natureOfWorkContractLabour : ['', Validators.required],
    numberOfContractLabourToBeEmployed: ['', Validators.required],
    dateOfCommencementOfEachContractWorkUnderEachContractor : ['', Validators.required],
    dateOfTerminationOfEmployementUnderEachContractor : ['', Validators.required],
    commonLicenceRefId: [0, Validators.required],
  }) as TForm<CommonLicence_ContractorDetail>;

  ngOnInit(): void {
    this.CommonLicence_ContractorDetail_Form.valueChanges.subscribe(value => {
     this.CommonLicence_ContractorDetail_Form.updateValueAndValidity();
    });
  }

  ngAfterViewInit() {
    this.route.queryParams
    .subscribe(params => {
      this.parmamEncodedinfo=params.info;
      this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info)=>{
        this.paramInfo = info;
        if (this.paramInfo.identityKey != 0) {
          this.CommonLicence_ContractorDetail_Form.patchValue({ commonLicenceRefId: this.paramInfo.identityKey });
          this.appHttpRequestHandlerService.httpGet({ id: this.paramInfo.identityKey }, "CommonLicence", "getcontractordetail").pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: GenericFormModel<CommonLicence_ContractorDetail>) => {
            this.initFormData(data);
          });
        }});
    });
  }

  initFormData(genericFormData: GenericFormModel<CommonLicence_ContractorDetail>) {
    this.genericFormData = genericFormData;
    this.appFormStepsList = this.genericFormData.appFormStepsList;
    if (genericFormData.formModel != null && genericFormData.formModel.commonLicenceRefId != 0) {
      this.CommonLicence_ContractorDetail_Form.patchValue(genericFormData.formModel);
      this.tehsilsList= this.filterListTemplate('Comm_Tehsils');
    }
  }
  onSubmit(): void {
    this.appHttpRequestHandlerService.httpPost(this.CommonLicence_ContractorDetail_Form.value, "pbsamadhannetcoreapi.Models.CommonLicence_ContractorDetail", "CommonLicence", "addupdate_contractordetails").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericServiceResultTemplate) => {
        this.router.navigate([this.appFormStepsList.find(x=>x.stepCode=='CD').uiNextPageComponentPath],{queryParams: { info: this.parmamEncodedinfo }});
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

  public getTehsilsByDistrictRefId(districtRefId, targetTehsilCtrlName){
    this.CommonLicence_ContractorDetail_Form.controls.employer_TehsilRefId.patchValue('');
    if(districtRefId!=''){
      this.appHttpRequestHandlerService.httpGet({ id: districtRefId }, "CommonApis", "gettehsilsbydistrictrefid").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data) => { 
        this.tehsilsList = data; 
      });
    }
  }
  
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
