import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BuildingPlanDetailViewModel } from 'src/app/buildingPlan/buildingPlan-typed-models';
import { GenericFormModel } from 'src/app/generic-implementation/generic-form-builder.type';
import { AppHttpRequestHandlerService } from '../app-http-request-handler.service';

@Component({
    selector: 'app-app-circle-selection',
    templateUrl: './app-circle-selection.component.html',
    styleUrls: ['./app-circle-selection.component.css'],
    standalone: false
})
export class AppCircleSelectionComponent implements OnInit {

  public appRefId:number;
  detailData: any;

  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  constructor(private route: ActivatedRoute, private appHttpRequestHandlerService: AppHttpRequestHandlerService, private router: Router) { }
  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.appRefId = params.appRefId;
        this.appHttpRequestHandlerService.httpGet({ id: params.id }, "BuildingPlan", "getdetail").pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: GenericFormModel<BuildingPlanDetailViewModel>) => { 
            this.initViewData(data);
          });
      });
  }
  initViewData(genericFormData: GenericFormModel<BuildingPlanDetailViewModel>) {
    this.detailData = genericFormData.formModel;
  }

}
