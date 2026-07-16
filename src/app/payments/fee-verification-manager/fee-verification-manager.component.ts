import { Component, Input, OnInit, Output, EventEmitter  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
@Component({
    selector: 'app-fee-verification-manager',
    templateUrl: './fee-verification-manager.component.html',
    styleUrls: ['./fee-verification-manager.component.css'],
    standalone: false
})
export class FeeVerificationManagerComponent implements OnInit {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  @Input() appRefId : number;
  @Output() paymentOptionsEvent = new EventEmitter<any>();
  public appFeeTransactions: any[];
  public isFeeReVelidationOptionShown:boolean=false;
  public isMakePaymentOptionShown:boolean=false;
  public reValidatePaymentTransactions: any[];
  public reValidatePaymentTransactionsIds: number[]=[];
  constructor(private route: ActivatedRoute, private appHttpRequestHandlerService: AppHttpRequestHandlerService) { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.route.queryParams
      .subscribe(params => {
        this.appHttpRequestHandlerService.httpGet({ appRefId: this.appRefId }, "PaymentManager", "getAllAppFeeTransactions").pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: any) => { 
            this.appFeeTransactions = data.formModel; 
             if(this.appFeeTransactions.length==0 || (this.appFeeTransactions.filter(x => x.isWebRequestCycleCompleted == false).length == 0 && 
            this.appFeeTransactions.filter(x => x.transactionFinalStatusType == 1).length == 0 && this.appFeeTransactions.filter(x => x.transactionFinalStatusType == 3).length == 0
            )){
              //No tried & All completed & No Successfull & No Pending
              this.isMakePaymentOptionShown=true;
              this.isFeeReVelidationOptionShown=false;
            }
            else if(this.appFeeTransactions.filter(x => x.isWebRequestCycleCompleted == false).length > 0 && (
                  this.appFeeTransactions.filter(x => x.transactionFinalStatusType == 1).length == 0 || this.appFeeTransactions.filter(x => x.transactionFinalStatusType == 3).length > 0
                  )) {
              //Incomplete & Not Successful & Pending
              this.isMakePaymentOptionShown=false;
              this.isFeeReVelidationOptionShown=true;

              this.reValidatePaymentTransactions = this.appFeeTransactions.filter(x => 
                  x.isWebRequestCycleCompleted == false 
                || x.transactionFinalStatusType == 3 
                || x.transactionFinalStatusType == 2);
                this.reValidatePaymentTransactions.forEach(transaction => {
                  this.reValidatePaymentTransactionsIds.push(transaction?.appFeeTransactionId)
                });
            }
            this.paymentOptionsEvent.emit({
              isMakePaymentOptionShown : this.isMakePaymentOptionShown,
              isFeeReVelidationOptionShown : this.isFeeReVelidationOptionShown,
              reValidatePaymentTransactionsIds: this.reValidatePaymentTransactionsIds
            });
          }
        );
      });
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
