import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/auth.service';
import { GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-labour-confirm-lock',
    templateUrl: './labour-confirm-lock.component.html',
    styleUrls: ['./labour-confirm-lock.component.css'],
    standalone: false
})
export class LabourConfirmLockComponent implements OnInit {
  public queryParms: string;
  public inspectionRefId: number;
  public canLock: boolean=false;
  hasSubmitClicked: boolean = false;
  public Input_Form: UntypedFormGroup;
  public parmamEncodedinfo: string;
  public paramInfo: any;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private commonOpsService: CommonOpsService,
    private fb: UntypedFormBuilder,
    public authService: AuthService,
    private modalService: NgbModal,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService
  ) {
    const today = new Date();
    this.Input_Form = this.fb.group({
      userRefId: [this.authService.getUserJwtDecodedInfo().UserId, Validators.required],
      inspectionRefId: [0, Validators.required],
      inspectionFactoryExistenceType: ['', Validators.required],
      inspectionDate: [today.toISOString().substring(0, 10), Validators.required],  // Initialize with null
      inspectionEstablishmentType: [null, Validators.required],
      factoryDeRegistrationNo: ['NA', Validators.required],
      remarks: ['NA', Validators.required]
    });
   }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      this.queryParms=params.info;
      this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info)=>{
      this.paramInfo = info;
      
      });
    });
  }
  completedStepCountEventListener(event){
    this.canLock = (event.completedCount==event.totalCount);
  }

  onSubmit() : void {
    this.hasSubmitClicked = true
   
    this.Input_Form.patchValue({
      inspectionRefId : this.paramInfo.inspectionRefId,
      inspectionFactoryExistenceType : 1,
      inspectionEstablishmentType : 0,
      factoryDeRegistrationNo : "N/A",
      remarks : "N/A"
    });
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
                    inspectionRefId: this.paramInfo.inspectionRefId, 
                     randomizationRefId: this.paramInfo.randomizationRefId,
                     month: this.paramInfo.month,
                     year: this.paramInfo.year,
                     factoryRefId: this.paramInfo.factoryRefId,
                    // establishmentName:establishmentName,
                    // licenceNumber: licenceNumber
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
}
