import { Component, OnInit } from '@angular/core';
import { Validators, UntypedFormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { GenericResponseTemplateModel, GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import Swal from 'sweetalert2';
import { ISearchTransactionByAppRefId } from '../admin-type-models';

@Component({
    selector: 'app-step-back-rtb-fee',
    templateUrl: './step-back-rtb-fee.component.html',
    styleUrls: ['./step-back-rtb-fee.component.css'],
    standalone: false
})
export class StepBackRtbFeeComponent implements OnInit {
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
      this.appHttpRequestHandlerService.httpGet({ appRefId: appRefId },"Admin","searchAppPaymentPartByAppRefId").pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(data => {
          this.paymentDetails = data.responseDataModel;
        });
    }
  }

  reset() {
    this.isSubmitted = false;
    this.Input_Form.patchValue({ appRefId: '' });
  }

  onTimeLineButtonClick(appRefId: number)
  {
      this.appRefId = appRefId;
      this.appHttpRequestHandlerService.httpGet({ appRefId: appRefId}, "Admin", "unlockedRTBFeeDetails").pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data: GenericServiceResultTemplate) => {
          if (data.hasException == false) {
            Swal.fire({
                icon: 'success',
                text: 'Application unlocked successfully..!',
            }).then(() => {
                window.location.reload();
            });
        }
     });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  
}

