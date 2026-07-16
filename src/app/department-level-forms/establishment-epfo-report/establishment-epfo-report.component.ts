
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IDataTableParamsViewModel, IPSLDashboardMajorCountRequestParms } from 'src/app/dashboard/dashboard-typed-models';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { AuthService } from 'src/app/auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { Establishment_EPFO_Logs, Establishment_EPFO_Report } from '../department-level-forms-typed-models';
import { environment } from 'src/environments/environment';


@Component({
    selector: 'app-establishment-epfo-report',
    templateUrl: './establishment-epfo-report.component.html',
    styleUrls: ['./establishment-epfo-report.component.css'],
    standalone: false
})
export class EstablishmentEpfoReportComponent implements OnInit {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  public recordsTypeList: Establishment_EPFO_Report[] = [];
  public processedData: any = { summary: [], services: [] }; 
  dataTableParams: IDataTableParamsViewModel = {
    searchCode: '',
    pageNo: 1,
    pageSize: 10,
    sortColumn: '',
    sortOrder: '1',
    filterArray:''
  };
  totalRecords: number = 0;
  totalPages: number = 0;
  fakeArray = new Array(0);
  searchText: string='';
  public selRecordHeadCode: string  ='8';
  public selApplicationType:number=76;
  today: Date = new Date();
  myForm: UntypedFormGroup;
  pdfPath: any = [];

  Input_Form: TForm<IPSLDashboardMajorCountRequestParms> = this.fb.group({
    fromDate: [new Date().toISOString().slice(0, 10), Validators.required],
    toDate: [new Date().toISOString().slice(0, 10), Validators.required]
  }) as TForm<IPSLDashboardMajorCountRequestParms>;
  dateInput: any;
  Data: Establishment_EPFO_Logs[] = [];Id: any;
  EstablishmentEPFOLogsId: any;
;

  constructor
  (
    private fb: UntypedFormBuilder, 
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private authService: AuthService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      establishmentId: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(15)]],
    });
    this.loadDashboadData();
  }

  onSubmit(){
  }

  loadDashboadData(){
    let parms = {
      fromdate: this.Input_Form.controls.fromDate.value,
      todate:this.Input_Form.controls.toDate.value,
      id: this.authService.getUserJwtDecodedInfo().UserId,
      searchCode: this.dataTableParams.searchCode,
      pageNo: this.dataTableParams.pageNo,
      pageSize : this.dataTableParams.pageSize,
      sortColumn : 'PublicAppRefNum',
      sortOrder : this.dataTableParams.sortOrder,
      filterArray : this.dataTableParams.filterArray
    };

    this.appHttpRequestHandlerService.httpGet(parms, "Miscellaneous", "getEstablishmentEPFOReport").pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: any) => {
      this.recordsTypeList=data.responseDataModel;
      if (this.recordsTypeList.length > 0) {
        this.totalRecords = this.recordsTypeList[0].maxRows;
        this.calcTotalPages();
      }
      else {
        this.totalRecords = 0;
      }

    });
  }

  calcTotalPages() {
    this.totalPages = Math.ceil(this.totalRecords / this.dataTableParams.pageSize);
    this.fakeArray = Array(this.totalPages);
  }

  onModelNoClick() {
    this.modalService.dismissAll();
  }


  searchKeyUp(event){
    this.searchText =(<HTMLInputElement>document.getElementById('searchKeyword')).value;
    if(((event.keyCode==8 || event.keyCode==46) && event.target.value.trim().length==0)){
      this.onClickSearchBar()
    }
  }

  onClickSearchBar(){
    this.searchByKeyword((<HTMLInputElement>document.getElementById('searchKeyword')).value);
  }

  searchByKeyword(keyword: string) {
    this.dataTableParams.searchCode = keyword.trim();
    this.loadDashboadData();
  }

  clearSearch(){
    (<HTMLInputElement>document.getElementById('searchKeyword')).value='';
    this.searchText='';
      this.onClickSearchBar()
  }

  onChangePageSize(event) {
    this.dataTableParams.pageNo = 1;
    this.dataTableParams.pageSize = event.target.value;
    this.loadDashboadData();
  }

  onChangePageNumber(event) {
    this.dataTableParams.pageNo = event.target.value;
    this.loadDashboadData();
  }

  searchPressed(event){
    if(event.keyCode==13){
      this.onClickSearchBar()
    }
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
          sender_UserRefId : this.authService.getUserJwtDecodedInfo().UserId.toString(),
          senderProfileRefId : this.authService.getUserJwtDecodedInfo().UserProfileId.toString(),
          senderRoleId : this.authService.getUserJwtDecodedInfo().RoleCode,
          establishmentEPFOLogsId: 0,
          establishmentRefId: this.Id,
          hasSent: 1,
          sentRemarks: remarksValue,
          sentDate: this.dateInput,
        };
        this.appHttpRequestHandlerService.httpPost(params,"pbsamadhannetcoreapi.Models.Establishment_EPFO_Logs", "Miscellaneous", "updateEstablishmentEPFORemarks").pipe(takeUntil(this.ngUnsubscribe))
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

AddRemarks(takeActionAlertModal,establishmentId,establishmentEPFOLogsId) {
this.modalService.open(takeActionAlertModal, { size: 'lg', scrollable: true, backdrop: 'static', keyboard: false });
this.Id = establishmentId;
this.EstablishmentEPFOLogsId = establishmentEPFOLogsId;
}

ViewRemarks(viewRemarksAlertModal,establishmentId) {
  this.appHttpRequestHandlerService.httpGet({ establishmentRefId: establishmentId }, "Miscellaneous", "getEstablishmentEpfoLogDetailbyId")
  .pipe(takeUntil(this.ngUnsubscribe))
  .subscribe((data: any) => {
    this.Data = data.responseDataModel;
  });
this.modalService.open(viewRemarksAlertModal, { size: 'lg', scrollable: true, backdrop: 'static', keyboard: false });
}

dismissAllModals(){
  this.modalService.dismissAll();
}


openPreviewNoticeContent(longContent, establishmentId,establishmentEPFOLogsId) {
  this.pdfPath = environment.pbLabourDefaultRoot + 'License/AppForm_Notice/' + establishmentId + establishmentEPFOLogsId + '.pdf';
  this.modalService.open(longContent, { scrollable: true, backdrop: 'static', keyboard: false });
}

}