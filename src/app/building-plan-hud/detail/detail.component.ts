import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CommonService } from 'src/app/common/common.service';
import { GenericFormModel } from 'src/app/generic-implementation/generic-form-builder.type';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { BuildingPlanHUDViewModel } from '../building-plan-hud-typed-models';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css'],
    standalone: false
})
export class DetailComponent implements OnInit {
  public detailData: any={};
  public appFormStepsList: any[];
  public appRefId:number;
  public entityPrimaryid: number;
  public applicationType: number;
  public paramInfo:any;
  public parmamEncodedinfo:string;
  public profileData:any;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  constructor(private route: ActivatedRoute, 
    private appHttpRequestHandlerService: AppHttpRequestHandlerService, 
    private router: Router,private common:CommonService,
    public commonOpsService: CommonOpsService) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.parmamEncodedinfo=params.info;
        this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info)=>{
        this.paramInfo = info;
        this.entityPrimaryid = this.paramInfo.identityKey;
        this.appRefId = this.paramInfo.appRefId;
        this.applicationType = this.paramInfo.applicationType;
        });
      });
  }

  ngAfterViewInit(): void {

  }

  initViewData(genericFormData: GenericFormModel<BuildingPlanHUDViewModel>) {
    this.detailData = genericFormData.formModel;
    this.appFormStepsList = genericFormData.appFormStepsList;
  }
 
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}