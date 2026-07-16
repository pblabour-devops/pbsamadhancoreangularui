import { Component, OnInit, TRANSLATIONS } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { ILock_InspectionViewModel, Inspection_LockInfo } from '../Inspections-typed-models';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/common/common.service';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { AuthService } from 'src/app/auth/auth.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GenericFormModel } from 'src/app/generic-implementation/generic-form-builder.type';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-inspection-operational-status',
    templateUrl: './inspection-operational-status.component.html',
    styleUrls: ['./inspection-operational-status.component.css'],
    standalone: false
})
export class InspectionOperationalStatusComponent implements OnInit {
  public isTempClosedShown: boolean = false;
  hasSubmitClicked: boolean = false;
  public parmamEncodedinfo:string;
  public paramInfo:any;
  public Input_Form: UntypedFormGroup;
  //public roleName : any;
  public licenceNo : string;
  public isLocked : any;
  public roleName : string;
  public factoryExistingType : any;
  public isEligibleToFill : boolean = false;
  private ngUnsubscribe = new Subject<void>();
  constructor(private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    public commonOpsService: CommonOpsService,
    public common: CommonService,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    public authService: AuthService,
    private modalService: NgbModal,
    private router: Router,) { 
      this.Input_Form = this.fb.group({
        userRefId: [this.authService.getUserJwtDecodedInfo().UserId, Validators.required],
        inspectionRefId : [0,Validators.required],
        inspectionFactoryExistenceType : ['',Validators.required],
        inspectionDate : ['', Validators.required],
        inspectionEstablishmentType: ['', Validators.required], 
        factoryDeRegistrationNo: ['NA', Validators.required],
        remarks: ['NA', Validators.required],
        mobileNo: ['N/A', Validators.required],
        email: ['N/A', Validators.required],
        isLegacy: [true, Validators.required],
        appId: [0, Validators.required]
      }) as TForm<ILock_InspectionViewModel>;
    }

  ngOnInit() {
   
  }
  ngAfterViewInit() {

    this.route.queryParams
      .subscribe(params => {
        this.parmamEncodedinfo = params.info;
        this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info) => {
          this.paramInfo = info;
          console.log(this.paramInfo,'as')
          this.licenceNo = this.paramInfo.licenceNumber;
          this.isLocked =  this.paramInfo.isLocked;

          if(this.authService.getUserJwtDecodedInfo().RoleName == "ALLC") 
            {
            this.roleName = "LBIN";
          }
          else {
            this.roleName = this.authService.getUserJwtDecodedInfo().RoleName;
          }
          
          if (this.paramInfo.isLocked ===1){  
          this.appHttpRequestHandlerService.httpGet({inspectionRefId : this.paramInfo.inspectionRefId,roleName : this.roleName}, "Inspection", "getInspectionOperationalStatus").pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((data) => {
              data.responseDataModel;
              this.getContactDetails();
              this.Input_Form.patchValue(data.responseDataModel)
              this.factoryExistingType = data.responseDataModel.inspectionFactoryExistenceType;
              this.Input_Form.disable();

            });
          }
          else{
            this.getContactDetails();
          }
        });
      });
  }

  getContactDetails(){
    console.log(this.paramInfo.appId,'app')
    console.log(this.paramInfo.isLegacy,'isLegacy')
    this.appHttpRequestHandlerService.httpGet({appId : this.paramInfo.appId,isLegacy: this.paramInfo.isLegacy}, "Inspection", "get_ContactDetails").pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((data) => {
              var contactDetails =  data.responseDataModel;
              this.Input_Form.controls.email.patchValue(contactDetails.alternateEmail)
              this.Input_Form.controls.mobileNo.patchValue(contactDetails.alternateMobileNo)
            });
  }
  isTempClosedChange(event: any) {
    if(event.target.value == 'true'){
      this.isTempClosedShown = true;
    }
    else{
      this.isTempClosedShown = false;
      this.isEligibleToFill = true;
    }
  }
  onSubmit() : void {
    this.hasSubmitClicked = true;
    this.Input_Form.controls.inspectionRefId.patchValue(this.paramInfo.inspectionRefId)
    this.Input_Form.controls.isLegacy.patchValue(this.paramInfo.isLegacy)
    this.Input_Form.controls.appId.patchValue(this.paramInfo.appId)
    if (this.Input_Form.valid) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false,
        willOpen: () => {
          // Access the modal dialog element and set its z-index
          const modalDialog = document.querySelector('.swal2-popup') as HTMLElement;
          if (modalDialog) {
            modalDialog.style.zIndex = '99999999999';
          }
        }
      });
  
      swalWithBootstrapButtons.fire({
        title: 'Are you sure you want to lock this inspection?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Lock!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.appHttpRequestHandlerService.httpPost(this.Input_Form.value, "pbsamadhannetcoreapi.ViewModels.Inpection_LockViewModel", "Inspection", "lock_Inspection")
            .subscribe(
              (data: GenericServiceResultTemplate) => {
                // Show success message
                swalWithBootstrapButtons.fire('Submitted!', 'Your changes have been submitted.', 'success');
                this.modalService.dismissAll();
                var encryptedParms=this.commonOpsService.encodeQueryParamsInBase64(
                  {
                    randomizationRefId: this.paramInfo.randomizationRefId, 
                    month: this.paramInfo.month, 
                    year: this.paramInfo.year,
                    factoryRefId: this.paramInfo.factoryRefId
                  });
                  this.router.navigate(['/inspection/inspection-dashboard'], { queryParams: {info: encryptedParms}})
              },
              (error) => {
                console.error('Error submitting form:', error);
              }
            );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
       
        }
      });
    } else {
      // Mark form as submitted to show validation errors
      this.Input_Form.markAllAsTouched();
    }
  }

  onFillingInspectionClick(){
    this.hasSubmitClicked = true;
    if(this.Input_Form.controls.email.value != null || this.Input_Form.controls.mobileNo.value != null ){
      this.appHttpRequestHandlerService.httpPost({email: this.Input_Form.controls.email.value,mobileNo: this.Input_Form.controls.mobileNo.value,appId: this.paramInfo.appId,isLegacy: this.paramInfo.isLegacy},"pbsamadhannetcoreapi.ViewModels.UpdateAlternateContactDetailsViewModel", "Inspection", "update_ContactDetails")
      .subscribe(
        (data: GenericServiceResultTemplate) => {
          // Show success message
          this.modalService.dismissAll();
          var encryptedParms=this.commonOpsService.encodeQueryParamsInBase64(
            {
              randomizationRefId: this.paramInfo.randomizationRefId, 
              month: this.paramInfo.month, 
              year: this.paramInfo.year,
              factoryRefId: this.paramInfo.factoryRefId
            });
            if(this.authService.getUserJwtDecodedInfo().RoleName=="LBIN"){
              this.router.navigate(['/inspection/labour-part-i-general-detail'],{ queryParams:{info: this.parmamEncodedinfo}});
            }
            else{
              this.router.navigate(['/inspection/part-i-general-detail'],{ queryParams:{info: this.parmamEncodedinfo}});
            }
        },
        (error) => {
          console.error('Error submitting form:', error);
        }
      );
    }
    else {
      if(this.authService.getUserJwtDecodedInfo().RoleName=="LBIN"){
        this.router.navigate(['/inspection/labour-part-i-general-detail'],{ queryParams:{info: this.parmamEncodedinfo}});
      }
      else{
        this.router.navigate(['/inspection/part-i-general-detail'],{ queryParams:{info: this.parmamEncodedinfo}});
      }
    }
  }

  navigatePage(){
    this.appHttpRequestHandlerService.httpGet({inspectionRefId: this.paramInfo.inspectionId}, "Inspection", "get_Inspections_FactoryPerformaStepStatus").pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: any) => {
      const hasCompleted = data.responseDataModel.some((item: { isCompleted: number }) => item.isCompleted === 1);
      if( this.paramInfo.isLocked == 1 && this.factoryExistingType === 1){
        var encryptedParms = this.commonOpsService.encodeQueryParamsInBase64(
          { 
            inspectionRefId:this.paramInfo.inspectionRefId, 
            randomizationRefId: this.paramInfo.randomizationId,
            month: this.paramInfo.month,
            year: this.paramInfo.year,
            factoryRefId: this.paramInfo.factoryRefId,
            establishmentName:this.paramInfo.establishmentName,
            licenceNumber: this.paramInfo.licenceNumber,
            isLocked : this.paramInfo.isLocked
          });
          if(this.authService.getUserJwtDecodedInfo().RoleName=="ADRF" || this.authService.getUserJwtDecodedInfo().RoleName=="DDRF" ){
            this.router.navigate(['/inspection/part-i-general-detail'],{ queryParams: { info: encryptedParms } });
          }
          else{
            this.router.navigate(['/inspection/labour-part-i-general-detail'],{ queryParams: { info: encryptedParms } });
            
          }
      }
    
    });
  }

  downloadInspection(inspectionId,inpectionType) {
    this.appHttpRequestHandlerService.httpGet({ inspectionRefId : inspectionId,inspectiontype : inpectionType}, "PdfOprations", "generateInspectionPdf")
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
}
