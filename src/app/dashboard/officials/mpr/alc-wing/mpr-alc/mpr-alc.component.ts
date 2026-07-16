import { Component, OnInit, ViewChild } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { AlcMprMainComponent } from "src/app/alc-mpr-implementation/alc-mpr-main/alc-mpr-main.component";
import { stepperJson } from "src/app/AlcMPR/Alc-stepper-List";
import { AuthService } from "src/app/auth/auth.service";
import { CommonService } from "src/app/common/common.service";
import { IDataTableParamsViewModel, IMPR_Alc_DashboardViewModel } from "src/app/dashboard/dashboard-typed-models";
import { GenericResponseTemplateModel } from "src/app/generic-implementation/generic-service-result-template";
import { AppHttpRequestHandlerService } from "src/app/shared/app-http-request-handler.service";
import { CommonOpsService } from "src/app/shared/common-ops-service";
import Swal from "sweetalert2";
@Component({
    selector: 'app-mpr-alc',
    templateUrl: './mpr-alc.component.html',
    styleUrls: ['./mpr-alc.component.css'],
    standalone: false
})
export class MprAlcComponent implements OnInit {

  @ViewChild('mprMainAlcRef') mprMainAlcComp: AlcMprMainComponent;   
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
      dataItem: any = [];
      pdfPath: any = [];
      iframeUrl: SafeResourceUrl;
      iframeLoaded: boolean = false;
      isLocalStorageSet: boolean = false;
      mprList : IMPR_Alc_DashboardViewModel[]=[];
      totalRecords: number = 0;
      totalPages: number = 0;
      fakeArray = new Array(0);
      public roleName :any;
      searchText: string = '';
      yearwise:number = 0;
      monthwise:number = 0;
      searchMonth: number = 0;
      searchYear: number = 0;
      modal:any;
      selectedItem: any = null;
      isPdfVisible=false;
  
  months = [
    { value: 1, name: 'January' }, { value: 2, name: 'February' }, { value: 3, name: 'March' },
    { value: 4, name: 'April' }, { value: 5, name: 'May' }, { value: 6, name: 'June' },
    { value: 7, name: 'July' }, { value: 8, name: 'August' }, { value: 9, name: 'September' },
    { value: 10, name: 'October' }, { value: 11, name: 'November' }, { value: 12, name: 'December' }
  ];
  years = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
  
  
      stepCodes=stepperJson.map(step => step.stepCode);
      dataTableParams: IDataTableParamsViewModel = {
        searchCode: '',
        pageNo: 1,
        pageSize: 10,
        sortColumn: 'Year',
        sortOrder: '1',
        filterArray: ''
      };
    
      public officerName : any;
      public officerDesignation : any;
      public officerCircleName : any;
      public officerDetails : any ;
  
  
      constructor(private route: ActivatedRoute, 
        private router: Router,
        private activeRoute: ActivatedRoute,
        private appHttpRequestHandlerService: AppHttpRequestHandlerService,  
        private common:CommonService,  
        private modalService: NgbModal,
        public commonOpsService: CommonOpsService,
        public authService: AuthService,
        private sanitizer: DomSanitizer,) { }
        
      ngOnInit(): void {
        this.monthwise = 0;  
    this.yearwise = 0;  
    this.searchMonth = 0;
    this.searchYear = 0;
    this.loadDashboadData();
      }
      ngAfterViewInit() {
        this.loadDashboadData();
      }
       loadDashboadData(){
          this.roleName = this.authService.getUserJwtDecodedInfo().RoleName;
          let parms = { 
            id: this.authService.getUserJwtDecodedInfo().UserId,  
            searchCode: this.dataTableParams.searchCode, 
            pageNo: this.dataTableParams.pageNo, 
            pageSize : this.dataTableParams.pageSize, 
            sortColumn : 'Year', 
            sortOrder : this.dataTableParams.sortOrder,
            filterArray : this.dataTableParams.filterArray,
            month : this.searchMonth,
            year : this.searchYear,   
          };
          this.appHttpRequestHandlerService.httpGet(parms, "Dashboard", "Load_Mpr_Alc_Data").pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: GenericResponseTemplateModel<IMPR_Alc_DashboardViewModel[]>)=>{
            this.mprList = data.responseDataModel;
            if (this.mprList.length > 0) {
              this.totalRecords = this.mprList[0].maxRows;
              this.calcTotalPages();
              console.log(this.mprList,'okk')
            }
            else {
              this.totalRecords = 0;
            }
          });
        }
  
  startMprFilling(modal: any) {
    if (this.monthwise === 0 || this.yearwise === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Selection',
        text: 'Please select both month and year.',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      });
      return;
    }
  
    const userId = this.authService.getUserJwtDecodedInfo().UserId;
    const isDuplicate = this.mprList.some(m =>
      m.month == this.monthwise &&
      m.year == this.yearwise &&
      m.submittedBy_UserRefId == userId
    );
  
    if (isDuplicate) {
      Swal.fire({
        icon: 'error',
        title: 'Duplicate Entry',
        text: `MPR already exists for this month and year.`,
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'btn btn-danger'
        },
        buttonsStyling: false
      });
      return;
    }
  
    const profileId = this.authService.getUserJwtDecodedInfo().UserProfileId;
    const params = {
      SubmittedBy_UserRefId: userId,
      month: this.monthwise,
      year: this.yearwise,
      StepCodes: this.stepCodes,
      SubmittedBy_ProfileRefId: profileId
    };
  
    this.appHttpRequestHandlerService.httpPost( params, "pbsamadhannetcoreapi.ViewModels.InsertNullJsonAlc_ViewModel",  "MPR", "insert_null_json_alc")
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: () => {
          modal.close();
          this.router.navigate(['/alc-mpr-implementation/alc-mpr-step-container'], {
            queryParams: { month: this.monthwise, year: this.yearwise }
          });
        }
      });
  }
  
  openEditForm(item: any): void {
    this.router.navigate(['/alc-mpr-implementation/alc-mpr-step-container'], {
      queryParams: {
        id: item.id,                       
        userId: item.submittedBy_UserRefId, 
        month: item.month,
        year: item.year,
        isViewOnly: item.isLocked
   
      }
    });
  }
    
      loadIframe(item,longContent3) {
        localStorage.removeItem('AuthToken');
        sessionStorage.clear();
        this.dataItem = [];
        this.dataItem = item;
          let ViewParms: any = {
            month: this.dataItem.month,
            year: this.dataItem.year,
            usrtype: this.dataItem.legacy_Role,
            mprid: this.dataItem.legacy_MPRId,
            viewuser: 'mpr'
          }
    
          let ViewParms2: any = {
            AppFormID: 0,
            TYPE: 13,
            AppId: 0,
            
          }
          localStorage.setItem('AuthToken', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVU0VSX0lEIjoiNjgyNGJjN2EtMjI1Yy00NTU2LWFiNTMtMTM1YmFlMTcxMzYxIiwiVVNFUl9OQU1FIjoiR2F1cmF2IFB1cmkiLCJST0xFIjoiQVBQUyIsIkxPR0lOX0RUIjoiMTgvMDQvMjAyNCIsIkxPR0lOX1RZUEUiOiJCUCIsIlJFVF9VUkwiOiJhc2RmYXNkZmFjY2EiLCJBUElfUEFUSCI6Imh0dHA6Ly9sb2NhbGhvc3QvIiwiQkFDS19UT19FTEFCX1BBVEgiOiJodHRwczovL3BibGFib3VyLmdvdi5pbi9lTGFib3VyL0FjY291bnQvTG9naW5Gcm9tUFdCUyIsImlhdCI6MTcxNDYyMzg5NiwiZXhwIjoxODcyNDExODk2fQ.qWIwCPUjb8wh6lHkTdlV5WJQmKNoY6I-QLQwz6fIG6Q" );
          sessionStorage.setItem('UserName', this.dataItem.legacy_Username);
          sessionStorage.setItem('ROLE', this.dataItem.legacy_Role);
          sessionStorage.setItem('routePerms_view', JSON.stringify(ViewParms));
          sessionStorage.setItem('UserId', this.dataItem.submittedBy_UserRefId);
          sessionStorage.setItem('routePerms_Dash', JSON.stringify(ViewParms2));
          this.modalService.open(longContent3, { scrollable: true });
      
      
      // Construct the URL with parameters
      let url = `https://pblabour.gov.in/wbapp/MprViewAdf/MprAdfView`;
      
      // Sanitize the URL
      this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.iframeLoaded = true;
      }
    
    
      onChangeSortOrder(event) {
        this.dataTableParams.sortOrder = event.target.value;
    
        this.onClickSearchBar();
      }
      onChangePageSize(event) {
        this.dataTableParams.pageNo = 1;
        this.dataTableParams.pageSize = event.target.value;
        this.onClickSearchBar();
      }
    
      onChangePageNumber(event) {
        this.dataTableParams.pageNo = event.target.value;
        this.onClickSearchBar();
      }
      onClickNextPage() {
        if (this.dataTableParams.pageNo < this.totalPages) {
          this.dataTableParams.pageNo = this.dataTableParams.pageNo + 1;
            this.onClickSearchBar();
        }
      }
      onClickPrevPage() {
        if (this.dataTableParams.pageNo > 1) {
          this.dataTableParams.pageNo = this.dataTableParams.pageNo - 1;
            this.onClickSearchBar();
        }
      }
    
      searchPressed(event){
        if(event.keyCode==13){
          this.onClickSearchBar()
        }
      }
      searchKeyUp(event){
        this.searchText =(<HTMLInputElement>document.getElementById('searchKeyword')).value;
        if(((event.keyCode==8 || event.keyCode==46) && event.target.value.trim().length==0)){
          this.onClickSearchBar()
        }
      }
      clearSearch(){
        (<HTMLInputElement>document.getElementById('searchKeyword')).value='';
        this.searchText='';
          this.onClickSearchBar()
      }
      
      onClickSearchBar() {
        this.searchByKeyword((<HTMLInputElement>document.getElementById('searchKeyword')).value);
      }
      searchByKeyword(keyword: string) {
        this.dataTableParams.searchCode = keyword.trim();
        this.loadDashboadData();
      }
    
      calcTotalPages() {
        this.totalPages = Math.ceil(this.totalRecords / this.dataTableParams.pageSize);
        this.fakeArray = Array(this.totalPages);
      }
    
      onChangeYear(event) {
        this.yearwise = event.target.value;
     
      }
      
      onChangeMonth(event) {
        this.monthwise = event.target.value;
      
      }
      openMonthYearModal(content: any): void {
    this.monthwise = 0;
    this.yearwise = 0;
      this.loadDashboadData();
    this.modalService.open(content);
  }
  generatePdfFromDashboard(item: any): void {
    this.selectedItem = item;
  
  
    setTimeout(() => {
      if (this.mprMainAlcComp) {
        this.mprMainAlcComp.formJson = item.formJson; 
        this.mprMainAlcComp.generatePdfForFormJson(item.monthName, item.year);
      }
    }, 0);
  }
  
  
  
  
  }
  