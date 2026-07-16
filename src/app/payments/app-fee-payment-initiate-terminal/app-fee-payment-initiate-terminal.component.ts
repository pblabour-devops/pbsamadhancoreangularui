import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonService } from 'src/app/common/common.service';
import { GenericFormModel } from 'src/app/generic-implementation/generic-form-builder.type';
import { GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { environment } from 'src/environments/environment';
import { AppFeePaymentInitiateTerminalInfoViewModel } from '../payments-typed-models';

@Component({
    selector: 'app-app-fee-payment-initiate-terminal',
    templateUrl: './app-fee-payment-initiate-terminal.component.html',
    styleUrls: ['./app-fee-payment-initiate-terminal.component.css'],
    standalone: false
})
export class AppFeePaymentInitiateTerminalComponent implements OnInit {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  public appFeeConfigDetails: AppFeePaymentInitiateTerminalInfoViewModel;
  public netFeeCalculated: number=0;
  public appRefId: number;
  public applicationType:number;
  public paymentOptions: any;
  public parmamEncodedinfo:string;
  public paramInfo:any;
  currentDate = new Date();
  constructor(private common:CommonService,
    private route: ActivatedRoute, 
    private appHttpRequestHandlerService: AppHttpRequestHandlerService, 
    private httpClient: HttpClient,
    public commonOpsService: CommonOpsService,
    private router: Router) { }

  ngOnInit(): void { 
    this.route.queryParams
      .subscribe(params => {
        this.parmamEncodedinfo=params.info;
        this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info)=>{
          this.paramInfo = info;
          this.appRefId = this.paramInfo.appRefId;
          this.applicationType = this.paramInfo.applicationType;
          this.netFeeCalculated = this.paramInfo.netFeeCalculated;
          this.appHttpRequestHandlerService.httpGet({ appRefId: this.appRefId, applicationType: this.applicationType, netFeeCalculated: this.netFeeCalculated, paymentPartCounter : this.paramInfo.paymentPartCounter, paymentBatchCounter: this.paramInfo.paymentBatchCounter }, "PaymentManager", "prepare_app_fee_payment_initiate_terminal_info").pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((data: GenericFormModel<AppFeePaymentInitiateTerminalInfoViewModel>) => { 
              this.appFeeConfigDetails = data.formModel;
              this.appFeeConfigDetails.paymentBatchCounter = this.paramInfo.paymentBatchCounter;
              this.appFeeConfigDetails.paymentPartCounter = this.paramInfo.paymentPartCounter;
            });
        });
      });
  }
  ngAfterViewInit() {}

  logPaymentTransactionAndTriggerMakePayment(){
    // this.httpClient.post(environment.pbLabourDefaultApiRoot+ "PaymentManager/logAppFeeTransaction",this.appFeeConfigDetails)
    //   .subscribe(data=>{
    //     if(!(<GenericServiceResultTemplate>data).hasException){
    //       document.getElementById('makePaymentSubmitButton').click();
    //     }
    //   });
    this.appHttpRequestHandlerService.httpPost(this.appFeeConfigDetails, "pbsamadhannetcoreapi.ViewModels.AppFeePaymentInitiateTerminalInfoViewModel", "PaymentManager", "logAppFeeTransaction").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericServiceResultTemplate) => {
      if(!data.hasException){
          document.getElementById('makePaymentSubmitButton').click();
      }
    });
  }
  onPaymentOptionChange(paymentOptions: any){
    this.paymentOptions = paymentOptions;
  }
  onReverificationPaymentClick(){
    this.appHttpRequestHandlerService.httpGet({ appFeeTransactionIds: this.paymentOptions?.reValidatePaymentTransactionsIds }, "PaymentManager", "verifyAlreadyMadePayments").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericFormModel<AppFeePaymentInitiateTerminalInfoViewModel>) => { 
        this.appFeeConfigDetails = data.formModel; 
      }
    );
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  btnHomeClick(){
    this.router.navigate(['/project/sites']);
  }
}
