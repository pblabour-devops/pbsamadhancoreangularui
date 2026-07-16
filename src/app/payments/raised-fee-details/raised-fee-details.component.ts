import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { IBuildingPlanHUDPaymentDetail, IRaiseFeeParms } from '../payments-typed-models';
import { GenericFormModel } from 'src/app/generic-implementation/generic-form-builder.type';

@Component({
    selector: 'app-raised-fee-details',
    templateUrl: './raised-fee-details.component.html',
    styleUrls: ['./raised-fee-details.component.css'],
    standalone: false
})
export class RaisedFeeDetailsComponent implements OnInit {
  @Input() appRefId: number;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  public raisedFeeList: IBuildingPlanHUDPaymentDetail[] = [];
  public feeHeadersSortOrder: number[] = [19, 22, 27, 20, 28, 21, 23, 24, 25, 26, 29];
  public distinctPaymentBatches: number[]=[];
  public allPaymentData: IBuildingPlanHUDPaymentDetail[]=[];
  public netFeeCalculated: number=0;
  constructor(private fb: UntypedFormBuilder,
    private route: ActivatedRoute, 
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private router: Router) 
    { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.appHttpRequestHandlerService.httpGet({ appRefId: this.appRefId, paymentBatchCounter: -1}, "BuildingPlanHUD", "getRaisedFeeList").pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: GenericFormModel<IBuildingPlanHUDPaymentDetail[]>) => { 
      this.allPaymentData=data.formModel;
      this.distinctPaymentBatches = [...new Set(data.formModel.map(item => item.paymentBatchCounter))];
    })
  }
  getBatchwisePayments(pbc){
    this.netFeeCalculated = 0;
    this.raisedFeeList=[];
      this.feeHeadersSortOrder.forEach(feeHeadId => {
        this.raisedFeeList.push(this.allPaymentData.filter(x => x.feeHeaderRefId == feeHeadId && x.paymentBatchCounter == pbc)[0])
      });
     
      this.raisedFeeList.forEach((element, index, array) => {
       this.netFeeCalculated = Number(this.netFeeCalculated) + Number(element?.amountPayable);
      });
      //console.log('raisedFeeList:', this.raisedFeeList);
    return this.raisedFeeList;
  }
}