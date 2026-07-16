import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonService } from 'src/app/common/common.service';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { ProjectSite } from 'src/app/project-site/project-site-typed-module';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { BuildingPlanService } from '../buildingPlan-service';
import { BuildingPlan_GeneralDetail } from '../buildingPlan-typed-models';

@Component({
    selector: 'app-add-update-general-detail',
    templateUrl: './add-update-general-detail.component.html',
    styleUrls: ['./add-update-general-detail.component.css'],
    standalone: false
})
export class AddUpdateGeneralDetailComponent implements OnInit {
  genericFormData: GenericFormModel<BuildingPlan_GeneralDetail>;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  public appFormStepsList: any[];
  public projectSite: ProjectSite;
  public tehsilsList: any;
  public paramInfo: any;
  public parmamEncodedinfo: string;

  constructor(private fb: UntypedFormBuilder,
    private buildingPlanService: BuildingPlanService,
    private route: ActivatedRoute,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private common: CommonService,
    public commonOpsService: CommonOpsService) { }

  //initialization of form
  BuildingPlan_GeneralDetail_Form: TForm<BuildingPlan_GeneralDetail> = this.fb.group({

    BuildingPlanId: [0, Validators.required],
    applicantName: ['', Validators.required],
    applicant_Address: ['', Validators.required],
    applicant_VillageOrTown: ['', Validators.required],
    applicant_TehsilRefId: ['', Validators.required],
    applicant_DistrictRefId: ['', Validators.required],
    applicant_PinCode: ['', Validators.required],
    applicantRelationToFactory: ['', Validators.required],
    nameOfFactory: ['', Validators.required],
    khasraNumber: [null, Validators.required],
    wardNumber: [null, Validators.required],
    plotNumber: [null, Validators.required],
    floorNumber: [null, Validators.required],

    appRefId: [0, Validators.required],
    establishmentRefId: ['', Validators.required],
    projectSiteRefId: [0, Validators.required],
    applicationPurposeType: ['', Validators.required]
  }) as TForm<BuildingPlan_GeneralDetail>;

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.parmamEncodedinfo = params.info;
        this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info) => {
          this.paramInfo = info;
          this.appHttpRequestHandlerService.httpGet({ projectSiteId: this.paramInfo?.projectSiteRefId, appRefId : this.BuildingPlan_GeneralDetail_Form.controls.appRefId.value }, "ProjectSite", "getProjectsitesByProfileSiteId").pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((data: GenericFormModel<ProjectSite>) => {
              this.projectSite = data.formModel;
              this.appHttpRequestHandlerService.httpGet({ id: this.paramInfo?.identityKey, projectSiteId: this.paramInfo?.projectSiteRefId }, "BuildingPlan", "getbuildingplandetail").pipe(takeUntil(this.ngUnsubscribe))
                .subscribe((data: GenericFormModel<BuildingPlan_GeneralDetail>) => {
                  this.initFormData(data)
                  this.BuildingPlan_GeneralDetail_Form.controls.projectSiteRefId.patchValue(this.paramInfo?.projectSiteRefId);
                  this.BuildingPlan_GeneralDetail_Form.controls.establishmentRefId.patchValue(this.paramInfo?.establishmentRefId);
                  this.BuildingPlan_GeneralDetail_Form.controls.applicationPurposeType.patchValue(this.paramInfo?.applicationPurposeType);
                });
            });
        });
      });
  }

  ngAfterViewInit() { }

  initFormData(genericFormData: GenericFormModel<BuildingPlan_GeneralDetail>) {
    this.genericFormData = genericFormData;
    this.appFormStepsList = this.genericFormData.appFormStepsList;
    if (genericFormData.formModel != null && genericFormData.formModel.BuildingPlanId != 0) {
      this.BuildingPlan_GeneralDetail_Form.patchValue(genericFormData.formModel);
      this.tehsilsList = this.filterListTemplate('Comm_Tehsils');
    }
  }

  onSubmit(): void {
    this.appHttpRequestHandlerService.httpPost(this.BuildingPlan_GeneralDetail_Form.value, "pbsamadhannetcoreapi.Models.BuildingPlan", "BuildingPlan", "addupdate_buildingplandetail").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericServiceResultTemplate) => {
        this.router.navigate(['/buildingPlan/addupdateareadetail'], { queryParams: { info: this.commonOpsService.encodeQueryParamsInBase64({ identityKey: this.paramInfo?.identityKey, appRefId: data.applicationInitiateResponse.appId, applicationType: 3, projectSiteRefId: this.paramInfo?.projectSiteRefId }) } });
      });
  }
  filterListTemplate(listTypeCode) {
    var itemsList = this.genericFormData?.listTemplateLists.filter(object => {
      return object['listTypeCode'] == listTypeCode;
    });
    if (itemsList != undefined && itemsList.length > 0) {
      return itemsList[0].listItems;
    }
    return null;
  }

  public getTehsilsByDistrictRefId(applicant_DistrictRefId, targetTehsilCtrlName) {
    this.BuildingPlan_GeneralDetail_Form.controls.applicant_TehsilRefId.patchValue('');
    if (applicant_DistrictRefId != '') {
      this.appHttpRequestHandlerService.httpGet({ id: applicant_DistrictRefId }, "CommonApis", "gettehsilsbydistrictrefid").pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data) => {
          this.tehsilsList = data;
        });
    }
  }

  btnHomeClick() {
    this.router.navigate(['/project/sites']);
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
