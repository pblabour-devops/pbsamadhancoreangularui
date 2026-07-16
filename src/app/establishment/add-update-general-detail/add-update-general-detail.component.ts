import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { GenericFormModel, TForm } from '../../generic-implementation/generic-form-builder.type';
import { Establishment_GeneralDetail } from '../establishment-typed-models';
import { EstablishmentService } from '../establishment-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonService } from 'src/app/common/common.service';
import { ProjectSite } from 'src/app/project-site/project-site-typed-module';
import Swal from 'sweetalert2';
import { CommonOpsService } from '../../shared/common-ops-service';
@Component({
    selector: 'app-add-update-general-detail',
    templateUrl: './add-update-general-detail.component.html',
    styleUrls: ['./add-update-general-detail.component.css'],
    standalone: false
})

export class AddUpdateGeneralDetailComponent implements OnInit {
  genericFormData: GenericFormModel<Establishment_GeneralDetail>;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  public establishmentTypeEnum: any = [];
  public establishmentConstitutionTypeEnum: any = [];
  public establishmentBuildingTypeEnum: any = [];
  public appFormStepsList: any[];
  public projectSite: ProjectSite;
  public tehsilsList:any;
  public paramInfo:any;
  public parmamEncodedinfo:string;
  constructor(private fb: UntypedFormBuilder,
    public establishmentService: EstablishmentService,
    private route: ActivatedRoute,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private common:CommonService,
    public commonOpsService: CommonOpsService) { }
  //initialization of form
  Establishment_GeneralDetail_Form: TForm<Establishment_GeneralDetail> = this.fb.group({
    establishmentId: [0, Validators.required],
    // establishmentName: ['', [Validators.required, Validators.maxLength(100)]],
    // estb_Address: ['', [Validators.required, Validators.maxLength(500)]],
    // estb_VillageOrTown: ['', Validators.required],
    // estb_TehsilRefId: ['266', Validators.required],
    // estb_DistrictRefId: ['608', Validators.required],
    // estb_PinCode: ['', [Validators.required, Validators.maxLength(6)]],
    gstNumber: ['', [Validators.required, Validators.maxLength(15)]],

    comm_Address: ['', Validators.required],
    comm_VillageOrTown: ['', Validators.required],
    comm_TehsilRefId: ['', Validators.required],
    comm_DistrictRefId: ['', Validators.required],
    comm_PinCode: ['', Validators.required],

    establishmentType: ['', Validators.required],
    labourIdentificationNum: ['', Validators.required],
    electricLoadConnectedInKilowatts: ['', [Validators.required, Validators.min(1)]],
    establishmentConstitutionType: ['', Validators.required],
    establishmentBuildingType: ['', Validators.required],
    isEmployingInterStateMigrantWorkers: ['', Validators.required],
    nationalIndustrialClassificationCode: ['', Validators.required],
    appRefId: [0, Validators.required],
    projectSiteRefId:[0, Validators.required],
    applicationPurposeType: [1, Validators.required]
  }) as TForm<Establishment_GeneralDetail>;

  ngOnInit(): void { 
    this.route.queryParams
      .subscribe(params => {
        this.parmamEncodedinfo=params.info;
        this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info)=>{
          this.paramInfo = info;
          this.Establishment_GeneralDetail_Form.controls.projectSiteRefId.patchValue(this.paramInfo?.projectSiteRefId);
          this.Establishment_GeneralDetail_Form.controls.applicationPurposeType.patchValue(this.paramInfo?.applicationPurposeType);
          this.appHttpRequestHandlerService.httpGet({ projectSiteId: this.paramInfo?.projectSiteRefId, appRefId : this.Establishment_GeneralDetail_Form.controls.appRefId.value }, "ProjectSite", "getProjectsitesByProfileSiteId").pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((data: GenericFormModel<ProjectSite>) => { 
              this.projectSite = data.formModel;
              this.appHttpRequestHandlerService.httpGet({ id: this.paramInfo?.identityKey }, "Establishment", "getgeneraldetail").pipe(takeUntil(this.ngUnsubscribe))
                .subscribe((data: GenericFormModel<Establishment_GeneralDetail>) => { this.initFormData(data)}
                );
            }
          );
        });
      });
    //this.cdr.detectChanges();
  }
  ngAfterViewInit() {}

  initFormData(genericFormData: GenericFormModel<Establishment_GeneralDetail>) {
    this.genericFormData = genericFormData;
    this.establishmentTypeEnum = this.genericFormData.enumTemplateLists.filter(x => x.selectListTypeCode == 'EstablishmentTypeEnum')[0].selectListItems;
    this.establishmentConstitutionTypeEnum = this.genericFormData.enumTemplateLists.filter(x => x.selectListTypeCode == 'EstablishmentConstitutionTypeEnum')[0].selectListItems;
    this.establishmentBuildingTypeEnum = this.genericFormData.enumTemplateLists.filter(x => x.selectListTypeCode == 'EstablishmentBuildingTypeEnum')[0].selectListItems;
    this.appFormStepsList = this.genericFormData.appFormStepsList;
    if (genericFormData.formModel != null && genericFormData.formModel.establishmentId != 0) {
      this.Establishment_GeneralDetail_Form.patchValue(genericFormData.formModel);
      this.tehsilsList= this.filterListTemplate('Comm_Tehsils');
    }
  }

  onSubmit(): void {
    this.appHttpRequestHandlerService.httpPost(this.Establishment_GeneralDetail_Form.value, "pbsamadhannetcoreapi.Models.Establishment_GeneralDetail", "Establishment", "addupdate_generaldetails").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericServiceResultTemplate) => {
        this.router.navigate(['/establishment/addupdateemployerdetail'], { queryParams: { info:  this.commonOpsService.encodeQueryParamsInBase64( {identityKey: data.applicationInitiateResponse.entityKeyId, appRefId: data.applicationInitiateResponse.appId, applicationType: 1, projectSiteRefId: this.paramInfo?.projectSiteRefId})}});
      });
  }
  filterListTemplate(listTypeCode) {
    var itemsList = this.genericFormData?.listTemplateLists.filter(object => {
      return object['listTypeCode'] == listTypeCode;
      });
      if(itemsList!=undefined &&   itemsList.length>0){
        return itemsList[0].listItems;
      } 
    return null;
  }
  
  public getTehsilsByDistrictRefId(districtRefId, targetTehsilCtrlName){
    this.Establishment_GeneralDetail_Form.controls.comm_TehsilRefId.patchValue('');
    if(districtRefId!=''){
      this.appHttpRequestHandlerService.httpGet({ id: districtRefId }, "CommonApis", "gettehsilsbydistrictrefid").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data) => { 
        this.tehsilsList = data; 
      });
    }
  }
  public findDuplicateGst(gstNumber){
    this.Establishment_GeneralDetail_Form.controls.gstNumber.patchValue(gstNumber.toUpperCase().trim().replace(/\s/g, ""));
    this.appHttpRequestHandlerService.httpGet({ gstNumber: this.Establishment_GeneralDetail_Form.value.gstNumber, info: this.parmamEncodedinfo }, "Establishment", "findDuplicateGST").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericFormModel<any>) => { 
        if(data.formModel.value!=0){
          Swal.fire({
            icon: 'info',
            title: 'Duplicate PAN number',
            html:'Entered PAN number <b>('+ this.Establishment_GeneralDetail_Form.value.gstNumber +')</b> is already used with some other establishment<br>' +
                  'Please check PAN number and try again',
          });
          this.Establishment_GeneralDetail_Form.controls.gstNumber.reset();
        }
      }
      );

  }
  updateNicCode(event){
    this.Establishment_GeneralDetail_Form.controls.nationalIndustrialClassificationCode.patchValue(JSON.stringify(event));
  }
  btnHomeClick(){
    this.router.navigate(['/project/sites']);
 }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
