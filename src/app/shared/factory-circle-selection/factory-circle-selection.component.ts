import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CircleManagerViewModel, GenericFormModel } from 'src/app/generic-implementation/generic-form-builder.type';
import { AppHttpRequestHandlerService } from '../app-http-request-handler.service';
import { CommonService } from 'src/app/common/common.service';

@Component({
    selector: 'app-factory-circle-selection',
    templateUrl: './factory-circle-selection.component.html',
    styleUrls: ['./factory-circle-selection.component.css'],
    standalone: false
})
export class FactoryCircleSelectionComponent implements OnInit {
  @Input() districRefId : number;
  @Input() selectedFactoryCircleId: number=0;
  @Input() selectedLabourCircleId: number=0;
  @Input() isReadOnly: boolean;
  public factoryCircleData: any;
  @Output() circleOptionsEvent = new EventEmitter<any>();
  public isFactoryCircleShown:boolean=false;

  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  constructor(private route: ActivatedRoute, private appHttpRequestHandlerService: AppHttpRequestHandlerService, private router: Router) { }
  ngOnInit(): void {
    // this.loadCircles();
  }
  ngOnChanges(){
    this.loadCircles();
  }
  loadCircles(){
    if(this.districRefId!=undefined){
    this.appHttpRequestHandlerService.httpGet({ districtRefId: this.districRefId }, "CircleManager", "getFactoryCircleByDistricRefId").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericFormModel<CircleManagerViewModel>) => { 
        this.initViewData(data);
      });
    }
  }
  setFactoryCircle(factoryCircleId: number){
    this.selectedFactoryCircleId = factoryCircleId;
    this.circleOptionsEvent.emit({
      factoryCircleId : factoryCircleId
    });
  }

  initViewData(genericFormData: GenericFormModel<CircleManagerViewModel>) {
    this.factoryCircleData = genericFormData.formModel;
  }
}
