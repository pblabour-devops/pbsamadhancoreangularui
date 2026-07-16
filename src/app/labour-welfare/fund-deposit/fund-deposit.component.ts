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
  selector: 'app-fund-deposit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './fund-deposit.component.html',
  styleUrl: './fund-deposit.component.css',
})
export class FundDepositComponent {
protected ngUnsubscribe: Subject<void> = new Subject<void>();
  public factoryDetails =[];
  public paramInfo: any;
  public parmamEncodedinfo: string;
  public licenceNumber: string;
  files: File | null = null;
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
          console.log(info,'okkkkkkk');
          this.appHttpRequestHandlerService
                .httpGet(
                  { id: this.paramInfo?.lwbId},'LWBCommunication','getLWBDetails').pipe(takeUntil(this.ngUnsubscribe)).subscribe(
                    (data: any) => {
                      console.log(data,'lwb details');
                    if (data?.formModel!= null) {
                      console.log(data?.formModel,'factory details');
                       this.Input_Form.patchValue({
              //registrationDate_Json: new Date(this.temporaryLicenceDetailsViewModel.registrationDate),
                          serviceType: this.paramInfo?.serviceType,
                          financialYear: data?.formModel.year,
                          timeSlot: data?.formModel.lwbSlabType,
                          licenceNumber: data?.formModel.licenceNo,
                          projectSiteRefId: this.paramInfo?.projectSiteRefId,
            });
                        this.Input_Form.controls.licenceNumber.disable();
                        this.Input_Form.controls.projectSiteRefId.disable();
                        this.Input_Form.controls.serviceType.disable();
                        this.Input_Form.controls.financialYear.disable();
                        this.Input_Form.controls.timeSlot.disable();  
                    } else {
                    }
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
onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.files = input.files[0];
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files.length) {
      this.files = event.dataTransfer.files[0];
    }
  }
 onSubmit() {

  var appDocId = 0;

  this.Input_Form.controls.projectSiteRefId.patchValue(this.paramInfo?.projectSiteRefId);
  this.Input_Form.controls.serviceType.patchValue(this.paramInfo?.serviceType);
  this.Input_Form.controls.licenceNumber.patchValue(this.paramInfo?.licenceNumber);
  this.Input_Form.controls.appDocId.patchValue(appDocId);
  this.Input_Form.controls.docId.patchValue(60053);
  this.Input_Form.controls.id.patchValue(this.paramInfo?.lwbId);
  console.log(this.Input_Form.valid,'form value');
  if (this.Input_Form.valid) {

    const formData = new FormData();

    formData.append(
      'requestData',
      JSON.stringify(this.Input_Form.getRawValue())
    );

    if (this.files) {
      formData.append(
        'files',
        this.files,
        this.files.name
      );
    }
  const uploadReq = new HttpRequest(
          'POST',
          environment.pbLabourDefaultApiRoot + 'LWBCommunication/insertLWBMaster',
          formData

        );
        this.httpClient.request(uploadReq).subscribe((response: any) => {
          console.log(response,'response after upload');
  if (response.body.hasException === false && response.body.exceptions === null) {
    setTimeout(() => {
    this.router.navigate(
      ['/dashboard/applicantdashboard'],
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
  }, 1000); 
    // this.router.navigate(['/dashboard/applicantdashboard'], { queryParams: {info: this.commonOpsService.encodeQueryParamsInBase64({ projectSiteRefId: this.paramInfo?.projectSiteRefId, projectSiteVersion:this.paramInfo?.projectSiteVersion, loginType : 'IP' , iPin : this.paramInfo?.investPunjab_Ipin }) } });
  }
  else{

    Swal.fire({
  icon: 'error',
  title: 'CSV Validation Failed',
  html: response.body.exceptions.Message.replace(/\n/g, '<br>')
});
  }
});

  }
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

  verifySlotAndLicenceNumber(): void {

  const financialYear = this.Input_Form.get('financialYear')?.value;
  const timeSlot = this.Input_Form.get('timeSlot')?.value;
  const licenceNumber = this.paramInfo?.licenceNumber;
console.log(financialYear, timeSlot, licenceNumber, 'verify slot and licence number');
  if (financialYear && timeSlot && licenceNumber) {

    this.appHttpRequestHandlerService
      .httpGet(
        {
          financialYear: financialYear,
          timeSlot: timeSlot,
          licenceNumber: licenceNumber
        },
        'LWBCommunication',
        'VerifySlotAndLicenceNumber'
      )
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response: any) => {
        console.log(response, 'verify slot and licence number response');
        if (response?.formModel> 0) {

          Swal.fire({
            icon: 'warning',
            title: 'This Financial Year & Slot has already been submitted/In-Process for this Licence Number.',
            text: 'Please choose a different Financial Year or Slot.'
          });

          // Optional
          this.Input_Form.get('timeSlot')?.reset();
          this.Input_Form.get('financialYear')?.reset();
        }

      });
  }
}

verifySelection(): void {

  const financialYear = this.Input_Form.get('financialYear')?.value;
  const timeSlot = this.Input_Form.get('timeSlot')?.value;
console.log(financialYear, timeSlot, 'verify selection');
  if (financialYear && timeSlot) {
    this.verifySlotAndLicenceNumber();
  }
}
}