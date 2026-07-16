import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericResponseTemplateModel, GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/auth.service';
import { GenericFormModel } from 'src/app/generic-implementation/generic-form-builder.type';
import Swal from 'sweetalert2';
import { Establishment_EPFO_Logs, IEstablishment_EPFO } from '../department-level-forms-typed-models';
import { PdfService } from '../pdf.service';
import { environment } from 'src/environments/environment';



@Component({
    selector: 'app-establishment-epfo',
    templateUrl: './establishment-epfo.component.html',
    styleUrls: ['./establishment-epfo.component.css'],
    standalone: false
})
export class EstablishmentEpfoComponent implements OnInit {
  @ViewChild('specificDiv') specificDiv: ElementRef;
  @ViewChild('pdfViewer') pdfViewer!: ElementRef;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  responseData: any;
  genericFormData: GenericFormModel<Establishment_EPFO_Logs>;
  isSyncClicked: boolean;
  isSubmitted: boolean;
  myForm: UntypedFormGroup;
  EstablishmentDataNotFound: boolean = false;
  blobUrl: any;
  pdfSrc: any;
  today: Date = new Date();
  Data: Establishment_EPFO_Logs[] = []; 
  dateInput: any;
  pdfPath: any = [];

  @ViewChild('specificDiv', { static: false }) pdfContent: ElementRef;
  pdfNameGUID: any;
  establishmentEPFOLogsRefId: any;
  constructor
  (
    private fb: UntypedFormBuilder,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private pdfService: PdfService
  ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      establishmentId: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(15)]],
      establishmentName: [],
      establishmentAddress1: [],
      establishmentAddress2: [],
      city: [],
      district: [],
      pinCode: [],
      coverDate: [],
      establishmentStatus: [],
      establishmentType: [],
      industry_GRP_Id: [],
      industry_Code: [],
      dSC: [],
    });
  }
  ViewLogs() {
    const id = this.myForm.get('establishmentId').value;
    this.appHttpRequestHandlerService.httpGet({ establishmentId: id }, "Miscellaneous", "getEstablishmentEpfoById")
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericResponseTemplateModel<IEstablishment_EPFO>) => {
        this.responseData = data.responseDataModel;
        if (this.responseData == null) {
          this.EstablishmentDataNotFound = true;
        }
        else {
          this.EstablishmentDataNotFound = false;
        }
      });
  }
  
  onSubmit() {
  }



  generatePDF(epfoId,longContent) {
    const params = {
      sender_UserRefId: this.authService.getUserJwtDecodedInfo().UserId.toString(),
      senderProfileRefId: this.authService.getUserJwtDecodedInfo().UserProfileId.toString(),
      senderRoleId: this.authService.getUserJwtDecodedInfo().RoleCode,
      establishmentEPFOLogsId: 0,
      establishmentRefId: epfoId,
      hasSent: 0,
      sentRemarks: "NA",
      sentDate: this.today,
      pdfNameGUID : "NA",
    };
    this.appHttpRequestHandlerService.httpPost(params,"pbsamadhannetcoreapi.Models.Establishment_EPFO_Logs", "PdfOprations", "generateepfonotice").pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data) => {
      if (!data.hasException) {
        this.pdfPath = environment.pbLabourDefaultRoot + 'TempFiles/' + data.pdfNameGUID + '.pdf';
        this.pdfNameGUID = data.pdfNameGUID;
        this.establishmentEPFOLogsRefId = data.establishmentEPFOLogsRefId
        this.modalService.open(longContent, { scrollable: true, backdrop: 'static', keyboard: false });
      }
    })
  }


   
  onModelNoClick() {
    this.modalService.dismissAll();
  }


  onAlertModelYesClick(remarksValue: string) {
    if (remarksValue == null || remarksValue == '') {
      Swal.fire({
        icon: 'warning',
        text: 'Remarks are mandatory to add.',
      })
    }
    else {
      this.saveActionTaken(remarksValue);
    }
  }

  deleteTempCreatedLicense() {
    this.modalService.dismissAll();
  }


  takeAction(takeActionAlertModal) {
    const id = this.myForm.get('establishmentId').value;
    this.appHttpRequestHandlerService.httpGet({ establishmentRefId: id }, "Miscellaneous", "getEstablishmentEpfoLogDetailbyId")
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: any) => {
        this.Data = data.responseDataModel;
      });
    this.modalService.open(takeActionAlertModal, { size: 'lg', scrollable: true, backdrop: 'static', keyboard: false });
  }

  saveActionTaken(remarksValue) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    })
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.modalService.dismissAll();

        const params = {
          sender_UserRefId: this.authService.getUserJwtDecodedInfo().UserId.toString(),
          senderProfileRefId: this.authService.getUserJwtDecodedInfo().UserProfileId.toString(),
          senderRoleId: this.authService.getUserJwtDecodedInfo().RoleCode,
          establishmentEPFOLogsId: this.establishmentEPFOLogsRefId,
          establishmentRefId: this.myForm.get('establishmentId').value,
          hasSent: 1,
          sentRemarks: remarksValue,
          sentDate: this.dateInput,
          pdfNameGUID : this.pdfNameGUID,
        };

        this.appHttpRequestHandlerService.httpPost(params,"pbsamadhannetcoreapi.Models.Establishment_EPFO_Logs", "Miscellaneous", "updateEstablishmentEPFODataLogs").pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: GenericServiceResultTemplate) => {
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          });
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your have cancelled the operation',
          'error'
        )
      }
    })
  }
}