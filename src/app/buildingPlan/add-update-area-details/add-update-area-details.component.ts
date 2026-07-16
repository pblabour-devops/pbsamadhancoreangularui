import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { BuildingPlanService } from '../buildingPlan-service';
import { BuildingPlan_AreaDetail } from '../buildingPlan-typed-models';

@Component({
    selector: 'app-add-update-area-details',
    templateUrl: './add-update-area-details.component.html',
    styleUrls: ['./add-update-area-details.component.css'],
    standalone: false
})
export class AddUpdateAreaDetailsComponent implements OnInit {
  [x: string]: any;
  appFormStepsList: any;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  constructor(private fb: UntypedFormBuilder,
    private establishmentService: BuildingPlanService,
    private route: ActivatedRoute,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    public commonOpsService: CommonOpsService) { }

  BuildingPlan_AreaDetail_Form: TForm<BuildingPlan_AreaDetail> = this.fb.group({
   buildingPlan_AreaDetailId : [0,Validators.required],
   numberOfRooms : [0,Validators.required],
   lengthOfRoom_X_Axis : [0,Validators.required],
   breadthOfRoom_Y_Axis : [0,Validators.required],
   maximum_Z_Axis_Height : [0,Validators.required], 
   minimum_Z_Axis_Height : [0,Validators.required],
   area : [0,Validators.required], 
   areaOccupiedByMachine : [0,Validators.required],
   volume : [0,Validators.required],
   breathingSpace  : ['', Validators.required],
   ventilation : ['', Validators.required],
   lightingLevel : ['', Validators.required],
   maximumCapicityOfRoom : [0,Validators.required],
   numberOfPersonsToEmployedInRoom : ['', Validators.required],
   purposeOfRoom  : ['', Validators.required],
   constructionPeriod : ['', Validators.required],
   remarks : ['', Validators.required],
   buildingPlanRefId : [0, Validators.required],

  }) as TForm<BuildingPlan_AreaDetail>; 

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.route.queryParams
    .subscribe(params => {
      this.parmamEncodedinfo=params.info;
      this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info)=>{
        this.paramInfo = info;
        if (this.paramInfo.identityKey != 0) {
          this.BuildingPlan_AreaDetail_Form.patchValue({ buildingPlanRefId: this.paramInfo.identityKey });
          this.appHttpRequestHandlerService.httpGet({ id: this.paramInfo.identityKey }, "BuildingPlan", "getBuildingPlanAreaDetail").pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: GenericFormModel<BuildingPlan_AreaDetail>) => {
            this.initFormData(data);
          });

        }});
    });
  }

  initFormData(genericFormData: GenericFormModel<BuildingPlan_AreaDetail>) {
    this.genericFormData = genericFormData;
    this.appFormStepsList = this.genericFormData.appFormStepsList;
    this.detailData = genericFormData.formModel;
    if (genericFormData.formModel != null && genericFormData.formModel.buildingPlanRefId != 0) {
      this.BuildingPlan_AreaDetail_Form.patchValue(genericFormData.formModel);
    }
  }

  onSubmit(): void {
    this.appHttpRequestHandlerService.httpPost(this.BuildingPlan_AreaDetail_Form.value, "pbsamadhannetcoreapi.Models.BuildingPlan_AreaDetail", "BuildingPlan", "addupdateBuildingPlanAreaDetail").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericServiceResultTemplate) => {
        this.getInitialData(this.paramInfo.projectSiteRefId);
        this.BuildingPlan_AreaDetail_Form.reset();
        this.BuildingPlan_AreaDetail_Form.patchValue({ buildingPlanRefId:  this.paramInfo.identityKey, buildingPlan_AreaDetailId:0 });
      });
  }

  nextPage(){
    this.router.navigate([this.appFormStepsList.find(x=>x.stepCode=='AD').uiNextPageComponentPath],{queryParams: { info: this.parmamEncodedinfo }});
  }
  
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
 } 
}
