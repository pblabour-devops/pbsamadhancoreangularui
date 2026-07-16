import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonService } from 'src/app/common/common.service';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { ProjectSite } from '../project-site-typed-module';
import { GenericResponseTemplateModel, GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { data } from 'jquery';
import { LoginTypeModel } from 'src/app/auth/auth-typed-models';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-project-ste-dashboard',
    templateUrl: './project-site-dashboard.component.html',
    styleUrls: ['./project-site-dashboard.component.css'],
    standalone: false
})
export class ProjectSiteDashboardComponent implements OnInit {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  closeResult = '';
  projectSites: ProjectSite[];
  public redirectTokenWelfareBoard: string = '';
    public paramInfo: any;
  public parmamEncodedinfo: string;
 public loginType: string = null;
 public isLicenseExist: any =0;
 public factoryDetails =[];
 public userName: string = null;
 public investPunjabIpin: string = null;
 public investPunjab_Ipin : string = null;
 public maskedPhoneNumber : any;
public isAlreadyMerged: boolean = false;
public loginResponseId : any;
 
   otpSent = false;

  constructor(private modalService: NgbModal,
     private appHttpRequestHandlerService: AppHttpRequestHandlerService,
      private router: Router,
        private common:CommonService,
         public commonOpsService: CommonOpsService,
        private route: ActivatedRoute,
      private fb: UntypedFormBuilder,
      public authService: AuthService) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.parmamEncodedinfo = params.info;
        this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info) => {
          this.paramInfo = info;
          console.log(this.paramInfo,'this.paramInfo');
          this.loginType = this.paramInfo.loginType;
          this.investPunjab_Ipin = this.paramInfo.iPin;

        });
      });
    // document.location.href = environment.thirdPartyIntegrationConfigs.investPunjab.investPunjabReturnPath;
    this.appHttpRequestHandlerService.httpGet(null, "ProjectSite", "getcurrentuserallprojectsites").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: any)=>{
        this.projectSites = data.formModel

      }
        );
  }
  
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  public viewSiteServices(projectSiteId:number,projectSiteVersion:number){
    console.log(this.paramInfo.loginType,'this.paramInfo.loginType');
     this.router.navigate(['/dashboard/applicantdashboard'], { queryParams: {info: this.commonOpsService.encodeQueryParamsInBase64({ projectSiteRefId: projectSiteId, projectSiteVersion:projectSiteVersion, loginType : this.paramInfo.loginType , iPin : this.investPunjab_Ipin }) } });
  }

  
  public AddNewProjectSite(){
    if(this.projectSites.length>=10){
      Swal.fire({
        icon: 'warning',
        title: 'Exceed Project Profile Limit',
        html:'You have already exceeded the limit of making project profiles. <br>' +
              'You can create maximum no of 10 project profiles per login account.',
      });
    }
    else{
      this.router.navigate(['/project/addNewSites']);
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
 } 
 
 MenuButtonClick(){
  this.router.navigate(['/project/sites']);
}
openMergeTemplate(template: any) {
  this.modalService.open(template);
}

 onLicenceNoSearchClick(licenceNoInput: string) {
    this.appHttpRequestHandlerService
      .httpGet(
        { licenceNumber: licenceNoInput},'Dashboard','getEstablishmentAndUserDetailsByLicenceNumber').pipe(takeUntil(this.ngUnsubscribe)).subscribe(
          (data: any) => {
          if (data?.responseDataModel!= null) {
            this.factoryDetails = [data.responseDataModel];
              this.userName = data.responseDataModel.userName;
              this.investPunjabIpin = data.responseDataModel.investPunjab_Ipin;
              this.isAlreadyMerged = data.responseDataModel.isAlreadyMerged;
              
              this.isLicenseExist = 1;
              this.maskedPhoneNumber = data.responseDataModel.mobileNo ? data.responseDataModel.mobileNo.replace(/.(?=.{5})/g, '*') : null;
          } else {
            this.factoryDetails = [];
            this.isLicenseExist = 2;
          }
        }
      );
  }
  dismissAllModals() {
  this.modalService.dismissAll();

  // Reset all variables
  this.isLicenseExist = false;
  this.factoryDetails = [];
  this.investPunjabIpin = '';
  this.userName = null;
  this.otpSent = false;
  this.isAlreadyMerged = false;
}

openOtpModal(step: number) {
        if (step === 1) {
          //this.isMapLicence = true;
        }
      }

      sendOtp(licenceNumber?: string) {
        this.otpSent = true;
        this.appHttpRequestHandlerService.httpGet({ userId : this.factoryDetails[0].id, userName : this.authService.getUserJwtDecodedInfo()?.UserName, licenceNumber : licenceNumber}, "Dashboard", "send_otp").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: any) => {
        if(data?.responseDataModel != null)
        {
          this.loginResponseId = data?.responseDataModel;
        }
    })
  }

      cancelOtp() {
        //this.isMapLicence = false;
        this.otpSent = false;
      }

      getOtp(): string {
        return (
          this.submitForm.value.otp1 +
          this.submitForm.value.otp2 +
          this.submitForm.value.otp3 +
          this.submitForm.value.otp4 
        );
      }

      submitOtp(): void {
  if (!this.submitForm.valid) return;

  const otp = this.getOtp();
  const factory = this.factoryDetails?.[0];

  if (!factory) {
    console.error('Factory details not available');
    return;
  }

  this.appHttpRequestHandlerService
    .httpGet(
      {
        mobile: factory.mobileNo,
        enteredOTP: otp,
        userName: factory.userName,
        emailVerificationType: '',
        loginResponseId :this.loginResponseId
      },
      'NotificationManager',
      'validateMobileOTP'
    )
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe({
      next: (data: any) => {
        try {
          const decrypted = this.commonOpsService.decryptUsingAES256(
            data.otpVerifyResp,
            environment.xhrEncryptionConfigs.loginResponseEncryptionKey,
            environment.xhrEncryptionConfigs.loginResponseEncryptionIVKey
          );

          const otpResp = this.commonOpsService.lowercaseKeysDeep(JSON.parse(decrypted));
            console.log(otpResp)
          const isValid =
            otpResp.isOtpMatched &&
            factory.mobileNo === otpResp.mobile &&
            otpResp.enteredOtp === otp;
          // const isValid = true;
          if (isValid) {
           const requestData = {
        oldAppId: factory.appId,
        oldUserId: factory.userId,
        oldUserName: factory.userName,
        newUserId: this.authService.getUserJwtDecodedInfo().UserId,
        newuserName: this.authService.getUserJwtDecodedInfo().UserName,
        newInvestpunjabIpin: this.investPunjab_Ipin,
        licenceNumber: factory.licenceNumber,
        projectSiteRefId: this.paramInfo?.projectSiteRefId
      };
             this.appHttpRequestHandlerService
              .httpPost(
                requestData,
                'pbsamadhannetcoreapi.ViewModels.MergeLicenceWithUserRequestViewModel',
                'Dashboard',
                'mergeLicenceWithExistingUser'
              )
              .pipe(takeUntil(this.ngUnsubscribe))
              .subscribe({
                next: () => {
                  Swal.fire('Success!', 'OTP verified and status updated.', 'success');
                },
                error: (err) => {
                  console.error(err);
                  Swal.fire('Error!', 'Something went wrong while updating.', 'error');
                }
              });
              this.modalService.dismissAll();

          } else {
             
            Swal.fire('Error', 'Incorrect OTP entered.', 'error');
          }

        } catch (error) {
          console.error('Decryption/Parsing error:', error);
          Swal.fire('Error', 'Invalid server response.', 'error');
        }
      },
      error: (err) => {
        console.error(err);
        Swal.fire('Error', 'OTP validation failed.', 'error');
      }
    });
}

      resendOtp() {
        this.otpSent = true;
    //     this.appHttpRequestHandlerService.httpGet({licenceNumber: this.licenceData.mobileNumber, userId : this.licenceData.userId}, "Inspection", "send_otp").pipe(takeUntil(this.ngUnsubscribe))
    //   .subscribe((data: any) => {
    //     console.log(data,'asssasssassa')
    //    this.encrypteddata =  data.responseDataModel
    //       console.log(data,'data')
    // })
  }
    submitForm: TForm<LoginTypeModel> = this.fb.group({
       otp1: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]')]],
  otp2: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]')]],
  otp3: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]')]],
  otp4: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]')]]
    }) as TForm<LoginTypeModel>; 

    mergeLicence(projectSiteId:number,projectSiteVersion:number){
    this.submitOtp();
    this.otpSent = true;
    this.openOtpPopup('otpPopup');
    }

    openOtpPopup(template: any , licenceNumber?: string) {
      this.sendOtp(licenceNumber);
  this.modalService.open(template, {
  centered: true,
  windowClass: 'otp-modal'
});

}


// Auto move to next
onOtpInput(event: any, nextInput: any) {
  const value = event.target.value;

  // Allow only numbers
  value.replace(/[^a-zA-Z0-9]/g, '');

  if (value && nextInput) {
    nextInput.focus();
  }
}

// Backspace -> previous
onOtpKeyDown(event: KeyboardEvent, prevInput: any) {
  if (event.key === 'Backspace' && !(event.target as HTMLInputElement).value && prevInput) {
    prevInput.focus();
  }
}

// Paste full OTP
onOtpPaste(event: ClipboardEvent) {
  const pasteData = event.clipboardData?.getData('text')?.trim();

  if (pasteData && pasteData.length === 4) {
    const otpArray = pasteData.replace(/[^a-zA-Z0-9]/g, '').split('');

    this.submitForm.patchValue({
      otp1: otpArray[0] || '',
      otp2: otpArray[1] || '',
      otp3: otpArray[2] || '',
      otp4: otpArray[3] || ''
    });

    this.submitForm.markAllAsTouched();
    this.submitForm.updateValueAndValidity();

  }

  event.preventDefault();
}
}
