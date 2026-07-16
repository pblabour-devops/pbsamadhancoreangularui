import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AppHttpRequestHandlerService } from '../app-http-request-handler.service';
import { takeUntil } from 'rxjs/operators';
import { ALCCircleManagerViewModel, CircleManagerViewModel, GenericFormModel } from 'src/app/generic-implementation/generic-form-builder.type';

@Component({
    selector: 'app-alc-circle-selection',
    templateUrl: './alc-circle-selection.component.html',
    styleUrls: ['./alc-circle-selection.component.css'],
    standalone: false
})
export class AlcCircleSelectionComponent implements OnInit {
  @Input() districRefId : number;
  @Input() selectedALCCircleId: number=0;
  @Input() isReadOnly: boolean;
  alcCircleData: any;
  @Output() circleOptionsEvent = new EventEmitter<any>();
  public isALCCircleShown:boolean=false;

  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  constructor(private route: ActivatedRoute, 
    private appHttpRequestHandlerService: AppHttpRequestHandlerService, 
    private router: Router) { }
  ngOnInit(): void {
    // this.loadCircles();
  }
  ngOnChanges(){
    this.loadCircles();
  }
  loadCircles(){
    if(this.districRefId!=undefined){
    this.appHttpRequestHandlerService.httpGet({ districtRefId: this.districRefId }, "CircleManager", "getAlcCircleByDistricRefId").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericFormModel<ALCCircleManagerViewModel>) => { 
        this.initViewData(data);
      });
    }
  }
  setALCCircle(alcCircleId: number){
    this.selectedALCCircleId = alcCircleId;
    this.circleOptionsEvent.emit({
      alcCircleId : alcCircleId
    });
  }

  initViewData(genericFormData: GenericFormModel<ALCCircleManagerViewModel>) {
    this.alcCircleData = genericFormData.formModel;
  }
}
