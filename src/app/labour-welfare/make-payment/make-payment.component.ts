import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/common/common.service';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { CommonOpsService } from '../../shared/common-ops-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';
import { LoginTypeModel } from 'src/app/auth/auth-typed-models';
import { FormBuilder, Validators } from '@angular/forms';
import { TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { LWBMasterDetails } from '../labour-welfare-typed-module';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-make-payment',
imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './make-payment.component.html',
  styleUrl: './make-payment.component.css',
})
export class MakePaymentComponent {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
    public factoryDetails =[];
  public paramInfo: any;
  public parmamEncodedinfo: string;
  public licenceNumber: string;
  public empDetails: any;
constructor(private route: ActivatedRoute,
      private router: Router,
      private activeRoute: ActivatedRoute,
      private appHttpRequestHandlerService: AppHttpRequestHandlerService,
      private common: CommonService,
      public commonOpsService: CommonOpsService,
      private modalService: NgbModal,
      private httpClient: HttpClient,
    public authService: AuthService,
  private fb: FormBuilder,) { }
Input_Form: TForm<LWBMasterDetails> = this.fb.group({
    id: [0, Validators.required],
  serviceType: [1, Validators.required],
  financialYear: ['', Validators.required],
  timeSlot: ['', Validators.required],
  licenceNumber: ['', Validators.required],
  projectSiteRefId: ['', Validators.required],
  docId: ['', Validators.required],
  appDocId: ['', Validators.required],
  remarks: ['']
})as TForm<LWBMasterDetails>;
  get formControls() { return this.Input_Form.controls; }
     ngOnInit(): void {
      //document.location.href = environment.thirdPartyIntegrationConfigs.investPunjab.investPunjabReturnPath;
      this.activeRoute.queryParams.subscribe(params => {
        this.parmamEncodedinfo = params.info;
        this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info) => {
          this.paramInfo = info;
          this.licenceNumber = this.paramInfo.licenceNumber;
          console.log(this.paramInfo,'this.paramInfo');
          this.appHttpRequestHandlerService
                .httpGet(
                  { fundMasterRefId: this.paramInfo?.lwbId},'LWBCommunication','getLWBUnpaidWagesPaymentEmployeeDetails').pipe(takeUntil(this.ngUnsubscribe)).subscribe(
                    (data: any) => {
                      this.empDetails = data?.formModel;
                    }
                  
                );

      });
   });
}
   ngAfterViewInit(){
       this.appHttpRequestHandlerService
                  .httpGet(
                    { licenceNumber: this.licenceNumber},'Dashboard','getEstablishmentAndUserDetailsByLicenceNumber').pipe(takeUntil(this.ngUnsubscribe)).subscribe(
                      (data: any) => {
                      if (data?.responseDataModel!= null) {
                        this.factoryDetails = [data.responseDataModel];
                        console.log(this.factoryDetails,'factory details');
                      } else {
                        this.factoryDetails = [];
                      }
                    }
                  );
  
  }
   onSubmit() {
     const totalAmount = this.getTotalAmount();
    this.router.navigate( ['/payments/appfeepaymentinitiateterminal'],
      {
        queryParams: {
          info: this.commonOpsService.encodeQueryParamsInBase64({
            appRefId: this.paramInfo?.appId ,
            applicationType: 1001,
            netFeeCalculated: totalAmount,
            paymentBatchCounter : 1,
            paymentPartCounter : 1
          })
        }
      }
    );
   }

   public backToDashboard(){
     this.router.navigate( ['/dashboard/applicantdashboard'],
      {
        queryParams: {
          info: this.commonOpsService.encodeQueryParamsInBase64({
            projectSiteRefId: this.paramInfo?.projectSiteRefId,
            projectSiteVersion: this.paramInfo?.projectSiteVersion,
            loginType: 'IP',
            iPin: this.paramInfo?.investPunjab_Ipin
          })
        }
      }
    );
  }
  getTotalAmount(): number {
  return this.empDetails.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );
}
}
