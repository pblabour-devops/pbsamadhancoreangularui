import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/auth.service';
import { CommonService } from 'src/app/common/common.service';
import { TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { licenceNumber } from '../Inspections-typed-models';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { IDataTableParamsViewModel } from 'src/app/dashboard/dashboard-typed-models';
import { environment } from 'src/environments/environment';
import { ApplicationProcess } from 'src/app/applicationProcess/applicationProcess-typed-module';
import { GenericResponseTemplateModel } from 'src/app/generic-implementation/generic-service-result-template';
import { INotingLogs } from 'src/app/dashboard/dashboard-typed-models';
import { LoginTypeModel } from 'src/app/auth/auth-typed-models';
import { data } from 'jquery';

@Component({
    selector: 'app-licencewise-inspection-dashboard',
    templateUrl: './licencewise-inspection-dashboard.component.html',
    styleUrls: ['./licencewise-inspection-dashboard.component.css'],
    standalone: false
})
export class LicencewiseInspectionDashboardComponent implements OnInit {
  public parmamEncodedinfo:string;
  dataItem: any = [];
  public paramInfo:any;
  public inspectionRefId:any;
  public inspectionType:any;
  private ngUnsubscribe = new Subject<void>();
  public inspectionsData : any;
  public notingLogs: any = [];
  factoryInspections: any[] = [];
  labourInspections: any[] = [];
  pdfPath: any = [];
  public licenceData : any;
  httpClient: any;
  public isMapLicence : boolean = false;
  otpSent = false;
  phoneNumber = '9877989911';
  public maskedPhoneNumber : any;
  public encrypteddata : string;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private common: CommonService,
    public commonOpsService: CommonOpsService,
    private fb: UntypedFormBuilder,
    public authService: AuthService,
    private modalService: NgbModal) { }

  ngOnInit()
  {
  }

  InputForm: TForm<licenceNumber> = this.fb.group({
    licenceNumber :  ['', Validators.required]

  }) as TForm<licenceNumber>;
  get inputFormFormControls() { return this.InputForm.controls; }

  submitForm: TForm<LoginTypeModel> = this.fb.group({
      otp1: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      otp2: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      otp3: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      otp4: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
  }) as TForm<LoginTypeModel>; 

  dataTableParams: IDataTableParamsViewModel = {
    searchCode: '',
    pageNo: 1,
    pageSize: 10,
    sortColumn: '',
    sortOrder: '1',
    filterArray: ''
  };
  totalRecords: number = 0;
  totalPages: number = 0;
  fakeArray = new Array(0);
  searchText: string = ''
 
  ngAfterViewInit() {
    this.route.queryParams
      .subscribe(params => {
        this.parmamEncodedinfo = params.info;
        this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info) => {
          this.paramInfo = info;
          this.appHttpRequestHandlerService.httpGet({
            searchCode: this.dataTableParams.searchCode,
            pageNo: this.dataTableParams.pageNo,
            pageSize: this.dataTableParams.pageSize,
            sortColumn: 'Month',
            sortOrder: this.dataTableParams.sortOrder,
            filterArray: this.dataTableParams.filterArray,
            userRefId: this.authService.getUserJwtDecodedInfo().UserId,
            investpunjab_ipin: this.paramInfo.ipin,
            roleName: this.authService.getUserJwtDecodedInfo().RoleName
          }, "Inspection", "get_inspectionsDataByUserId").pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((data) => {
              this.inspectionsData = data.responseDataModel;
              this.factoryInspections = this.inspectionsData.filter(item => item.inspectionType === 1);
              this.labourInspections = this.inspectionsData.filter(item => item.inspectionType === 2);
            });

        });
      });

  }


  mapLicenceNumber(longContent) {
    this.modalService.open(longContent, { scrollable: true, backdrop: 'static', keyboard: true, size:'md'});
    this.resetFormData();
  }
  verifyLicenceNumber() {
    this.licenceData = {}; // Reset previous data
        this.isMapLicence = false;
        this.otpSent = false;
    
        // Simulate API response
        const licenceNumber = this.InputForm.get('licenceNumber')?.value;
    const swalWithBootstrapButtons = Swal.mixin({
      willOpen: () => {
        // Access the modal dialog element and set its z-index
        const modalDialog = document.querySelector('.swal2-popup') as HTMLElement;
        if (modalDialog) {
          modalDialog.style.zIndex = '99999999999';
        }

      }
    });
    
    this.appHttpRequestHandlerService.httpGet({licenceNumber: this.InputForm.controls.licenceNumber.value}, "Inspection", "verifyLicenceNumber").pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: any) => {
      var data =  data.responseDataModel.value
      if(data > 0)
      {
        this.appHttpRequestHandlerService.httpGet({licenceNumber: this.InputForm.controls.licenceNumber.value, userRefId : 'abcd'}, "Inspection", "verifyLicenceNumberWithUser").pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data: any) => {
            this.licenceData = data.responseDataModel
            console.log(this.licenceData,'asas')
             this.maskedPhoneNumber = 'xxxxxx' + this.licenceData?.mobileNumber.slice(-4);
            // if(licenceData.isMatched > 0)
            // {
            //   console.log('okk')
            // }
            // else{
            //   swalWithBootstrapButtons.fire({
            //     title: "Wrong User",
            //     text: `Dear Applicant, the licence Number you entered is not mapped with current user. It is mapped with (${licenceData.userName}).If you want to map this licence with current user, then click on YES button`,
            //     icon: "info",
            //     showClass: {
            //       popup: `
            //         animate__animated
            //         animate__fadeInDown
            //         animate__faster
            //       `
            //     },
            //     hideClass: {
            //       popup: `
            //         animate__animated
            //         animate__fadeOutDown
            //         animate__faster
            //       `
            //     }
            //   });
            //   //swalWithBootstrapButtons.fire('Not Found!', 'Licence Number you entered is mapped with another user.', 'error');
            // }
        })
      }
      else{
        swalWithBootstrapButtons.fire({
          title: "Not Found!",
          text: "Your Licence Number does not exists.",
          icon: "error",
          showClass: {
            popup: `
              animate__animated
              animate__fadeInDown
              animate__faster
            `
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `
          }
        });
      }      
    })
  }

  downloadViolationReport(inspectionId,inpectionType) {
    this.appHttpRequestHandlerService.httpGet({ inspectionRefId : inspectionId,inspectionType : inpectionType}, "PdfOprations", "generateInspectionViolationPdf")
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: any) => {
        var blob = this.base64toBlob(data.pdfContent, "application/pdf");
        let a = document.createElement("a");
        document.body.appendChild(a);
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = String(data.fileNo + ".pdf");
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      }
    )};
  
    public base64toBlob(b64Data, contentType) {
      contentType = contentType || '';
      let sliceSize = 512;
    
      var byteCharacters = atob(b64Data);
      var byteArrays = [];
    
      for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          var slice = byteCharacters.slice(offset, offset + sliceSize);
    
          var byteNumbers = new Array(slice.length);
          for (var i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
          }
          var byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
      }
    
      var blob = new Blob(byteArrays, { type: contentType });
      return blob;
    }

    onFillingInspectionClick(inspectionRefId,inspectionType,licenceNumber,latestAction){
      var encryptedParms=this.commonOpsService.encodeQueryParamsInBase64(
        {
          inspectionRefId: inspectionRefId,
          inspectionType: inspectionType,
          licenceNumber : licenceNumber,
          latestAction : latestAction

        });
    
      this.router.navigate(['/inspection/compliance-manager'],{ queryParams:{info: encryptedParms}});
    (error) => {
      console.error('Error submitting form:', error);
    }
        
      
    }

    viewComplianceLogs(item,inspectionType,longContent) {
      this.dataItem = [];
        this.dataItem = item;
        this.modalService.open(longContent, { scrollable: true });
      this.appHttpRequestHandlerService.httpGet({ inspectionRefId: this.dataItem.inspectionId,
        inspectionType : inspectionType
        }, "Inspection", "getInspectionLogsByInspectionId").pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((data) => { 
               this.notingLogs = data.responseDataModel
      })
    }

    previewDocument(longContent, fileName) {
        this.pdfPath = environment.pbLabourDefaultRoot + 'ComplianceReport/' + fileName.trim();
        this.modalService.open(longContent, { scrollable: true, backdrop: 'static', keyboard: false });
      }
      // verifyLicenceNumber() {
      //   // Reset state and data when verifying again
      //   this.licenceData = {}; // Reset previous data
      //   this.isMapLicence = false;
      //   this.otpSent = false;
    
      //   // Simulate API response
      //   const licenceNumber = this.InputForm.get('licenceNumber')?.value;
      //   if (licenceNumber === 'existingLicence') {
      //     this.licenceData = { userName: 'John Doe' }; // Mocked user data
      //   }
      // }
    
      openOtpModal(step: number) {
        if (step === 1) {
          this.isMapLicence = true;
        }
      }
    
      sendOtp() {
        this.otpSent = true;
        this.appHttpRequestHandlerService.httpGet({mobileNumber: this.licenceData.mobileNumber, userId : this.licenceData.userId, licenceNumber : this.licenceData.licenceNumber, newUserName : this.authService.getUserJwtDecodedInfo().UserName}, "Inspection", "send_otp").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: any) => {
       this.encrypteddata =  data.responseDataModel
    })
  }
    
      cancelOtp() {
        this.isMapLicence = false;
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
        if (this.submitForm.valid) {
          const otp = this.getOtp();
          this.appHttpRequestHandlerService.httpGet({otp : otp,encryptedData : this.encrypteddata, userId : this.authService.getUserJwtDecodedInfo().UserId, licenceNumber : this.licenceData.licenceNumber}, "Inspection", "verify_otp").pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: any) => {
          var isVerified =  data.responseDataModel
          console.log(isVerified,'isverify')
          if(isVerified== true)
          {
            alert('OTP verified successfully.');
            this.ngAfterViewInit();
            this.closePreviewModal();
            
          }
          else
          {
            alert('Incorrect OTP entered.');
          }


        })
        } else {
          alert('Please enter a valid OTP.');
        }
      }

      resendOtp() {
        this.otpSent = true;
        this.appHttpRequestHandlerService.httpGet({licenceNumber: this.licenceData.mobileNumber, userId : this.licenceData.userId}, "Inspection", "send_otp").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: any) => {
        console.log(data,'asssasssassa')
       this.encrypteddata =  data.responseDataModel
          console.log(data,'data')
    })
  }
  closePreviewModal() {
    this.resetFormData();
    this.modalService.dismissAll();
    const modalElement = document.getElementById('mapLicence');
    if (modalElement) {
        modalElement.style.display = 'none'; 
    }
}

resetFormData(): void {
  
    this.submitForm.reset();
    this.encrypteddata = '';
    this.licenceData = { licenceNumber: '' }; 
    this.isMapLicence = false;
    this.otpSent =false
}
backToDashboard(){
  this.router.navigate(['/project/sites']);
}
}
