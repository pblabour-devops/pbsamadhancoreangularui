import { Component, OnInit } from '@angular/core';
import { Validators, UntypedFormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApplicationFeeDetailsViewModel } from 'src/app/dashboard/dashboard-typed-models';
import { TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { GenericResponseTemplateModel } from 'src/app/generic-implementation/generic-service-result-template';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { ISearchTransactionByAppRefId, GetAdminDashboardDetailsViewModel } from '../admin-type-models';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
    selector: 'app-fee-verification-manager',
    templateUrl: './fee-verification-manager.component.html',
    styleUrls: ['./fee-verification-manager.component.css'],
    standalone: false
})
export class FeeVerificationManagerComponent implements OnInit {
protected ngUnsubscribe: Subject<void> = new Subject<void>();

  Input_Form: TForm<ISearchTransactionByAppRefId> = this.fb.group({
    appRefId: ['', Validators.required]
  }) as TForm<ISearchTransactionByAppRefId>;

  isSubmitted: boolean = false;
  paymentStatus: any;
  appRefId: number;
  get formControls() { return this.Input_Form.controls; }
  public paymentDetails : any;

  constructor(
    private fb: UntypedFormBuilder,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.isSubmitted = true;
    if (this.Input_Form.valid) {
      const appRefId = Number(this.Input_Form.controls.appRefId.value); 
      this.appHttpRequestHandlerService.httpGet({ appRefId: appRefId },"Admin","searchTransactionByAppRefId").pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(data => {
          this.paymentDetails = data.responseDataModel;
          console.log(this.paymentDetails,'paymentdetail')
        });
    }
  }

  reset() {
    this.isSubmitted = false;
    this.Input_Form.patchValue({ appRefId: '' });
  }

  onVerifyButtonClick(appRefId,uniquePaymentGatewayTransactionId,paymentTreasuryType){
    this.appHttpRequestHandlerService.httpGet({ appRefId: appRefId, uniquePaymentGatewayTransactionId : uniquePaymentGatewayTransactionId, paymentTreasuryType: paymentTreasuryType }, "Admin", "verifyTransactionByAppRefId").pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data: GenericResponseTemplateModel<string>) => {
         Swal.fire({
                    icon: 'success',
                    text: 'Payment Verification Response Success',
         });
         this.appHttpRequestHandlerService.httpGet({ appRefId: data.responseDataModel },"Admin","searchTransactionByAppRefId").pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(data => {
          this.paymentDetails = data.responseDataModel;
        });
    });
  }

  getTreasurySrNo(currentIndex: number): number {
    return this.paymentDetails
      .slice(0, currentIndex + 1)
      .filter(p => p.paymentTreasuryType === 1).length;
  }
  getNonTreasurySrNo(currentIndex: number): number {
    return this.paymentDetails
      .slice(0, currentIndex + 1)
      .filter(p => p.paymentTreasuryType === 2).length;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onTimeLineButtonClick(appRefId: number)
  {
    this.appRefId = appRefId;
      this.appHttpRequestHandlerService.httpGet({ appRefId: appRefId}, "ThirdPartyIntegrations", "seedTimelineWiseAction").pipe(takeUntil(this.ngUnsubscribe))
              .subscribe((data: GenericResponseTemplateModel<string>) => {
                if(data.hasError == true)
                {
                    Swal.fire({
                          icon: 'success',
                          text: 'Time Line Action Seed Succesfully',
                    });
                    this.appHttpRequestHandlerService.httpGet({ appRefId: this.appRefId },"Admin","searchTransactionByAppRefId").pipe(takeUntil(this.ngUnsubscribe))
                    .subscribe(data => {
                      this.paymentDetails = data.responseDataModel;
                    });
                }
                
              
     });
  }

  onShareStatusButtonClick(appRefId: number)
  {
      this.appRefId = appRefId;
      this.appHttpRequestHandlerService.httpGet({ appRefId: appRefId}, "Admin", "updateActionLogs").pipe(takeUntil(this.ngUnsubscribe))
              .subscribe((data: GenericResponseTemplateModel<string>) => {
                if(data.hasError == false)
                {
                    Swal.fire({
                          icon: 'success',
                          text: 'Insert Application Action Logs Succesfully',
                    });

                    this.appHttpRequestHandlerService.httpGet({ appRefId: this.appRefId },"Admin","searchTransactionByAppRefId").pipe(takeUntil(this.ngUnsubscribe))
                      .subscribe(data => {
                        this.paymentDetails = data.responseDataModel;
                      });
                }
              
     });
  }
}
