import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericFormModel } from 'src/app/generic-implementation/generic-form-builder.type';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { IApplicationRaiseFeeDetail } from '../payments-typed-models';

@Component({
    selector: 'app-app-raised-fee-details',
    templateUrl: './app-raised-fee-details.component.html',
    styleUrls: ['./app-raised-fee-details.component.css'],
    standalone: false
})
export class AppRaisedFeeDetailsComponent implements OnInit {
  @Input() appRefId: number;
  @Input() applicationType: number;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  public raisedFeeList: IApplicationRaiseFeeDetail[] = [];
  public feeHeadersSortOrder: number[] = [19,39,48];
  public distinctPaymentBatches: number[]=[];
  public allPaymentData: IApplicationRaiseFeeDetail[]=[];
  public netFeeCalculated: number=0;
  constructor(private fb: UntypedFormBuilder,
    private route: ActivatedRoute, 
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private router: Router) 
    { }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.appHttpRequestHandlerService.httpGet({ appRefId: this.appRefId, paymentBatchCounter: -1}, "PaymentManager", "getRaisedFeeList").pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: GenericFormModel<IApplicationRaiseFeeDetail[]>) => { 
      this.allPaymentData=data.formModel;
      this.distinctPaymentBatches = [...new Set(data.formModel.map(item => item.paymentBatchCounter))];
    })
  }
  getBatchwisePayments(pbc){
    this.netFeeCalculated = 0;
    this.raisedFeeList=[];

    

    this.feeHeadersSortOrder.forEach(feeHeadId => {
      this.allPaymentData.filter(x => x.feeHeaderRefId == feeHeadId && x.paymentBatchCounter == pbc).forEach(pd=>{
        this.raisedFeeList.push(pd);
      })
    });
    
    this.raisedFeeList.forEach((element, index, array) => {
      this.netFeeCalculated = Number(this.netFeeCalculated) + Number(element?.amountPayable);
    });
    //console.log('raisedFeeList:', this.raisedFeeList);
    return this.raisedFeeList;
  }
}