import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { CommonService } from 'src/app/common/common.service';
import { IDataTableParamsViewModel, IMPR_Factory_DashboardViewModel } from 'src/app/dashboard/dashboard-typed-models';
import { GenericResponseTemplateModel } from 'src/app/generic-implementation/generic-service-result-template';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
@Component({
    selector: 'app-mpr-factory',
    templateUrl: './mpr-factory.component.html',
    styleUrls: ['./mpr-factory.component.css'],
    standalone: false
})
export class MprFactoryComponent implements OnInit {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  dataItem: any = [];
  pdfPath: any = [];
  iframeUrl: SafeResourceUrl;
  iframeLoaded: boolean = false;
  isLocalStorageSet: boolean = false;
  mprList : IMPR_Factory_DashboardViewModel[]=[];
  totalRecords: number = 0;
  totalPages: number = 0;
  fakeArray = new Array(0);
  public selRecordHeadCode: string  ='1';
  public selApplicationType:number=1;
  public sortColumn:string="Year";
  public roleName :any;
  searchText: string = '';
  yearwise:number = 0;
  monthwise:number = 0;
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

  if (sessionStorage.getItem('year') === null) 
  {
    this.yearwise = 0;
    this.monthwise = 0 ;
  }
  else
  {
    this.monthwise = JSON.parse(sessionStorage.getItem('month') || '{}');
    this.yearwise = JSON.parse(sessionStorage.getItem('year') || '{}');
    sessionStorage.clear();
  } 
  this.loadDashboadData(parseInt( this.selRecordHeadCode), this.selApplicationType, this.sortColumn);
  }
  ngAfterViewInit() {
    this.loadDashboadData(parseInt( this.selRecordHeadCode), this.selApplicationType, this.sortColumn);
  }
  loadDashboadData(dashboardRecordsHeaderType: number, applicationType: number, sortColumn: string){
    this.roleName = this.authService.getUserJwtDecodedInfo().RoleName;
    let parms = { 
      id: this.authService.getUserJwtDecodedInfo().UserId,  
      searchCode: this.dataTableParams.searchCode, 
      pageNo: this.dataTableParams.pageNo, 
      pageSize : this.dataTableParams.pageSize, 
      sortColumn : sortColumn, 
      sortOrder : this.dataTableParams.sortOrder,
      filterArray : this.dataTableParams.filterArray,
      month : this.monthwise,
      year : this.yearwise,   
    };
    this.appHttpRequestHandlerService.httpGet(parms, "Dashboard", "Load_Mpr_Factory_Data").pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: GenericResponseTemplateModel<IMPR_Factory_DashboardViewModel[]>)=>{
      this.mprList = data.responseDataModel;
      if (this.mprList.length > 0) {
        this.totalRecords = this.mprList[0].maxRows;
        this.calcTotalPages();
      }
      else {
        this.totalRecords = 0;
      }
    });
  }

  openEditForm(id: number, isReadOnly: boolean) {
     this.officerDetails = this.mprList.find(item => item.id === id);
    if(id == 0)
    {
       this.officerDetails = this.mprList.find(item => item.submittedBy_UserRefId === this.authService.getUserJwtDecodedInfo().UserId);
    }
    if (this.officerDetails) {
      this.officerName = this.officerDetails.fullName || "";
      this.officerDesignation = this.officerDetails.roleDesc || "";
      this.officerCircleName = this.officerDetails.factoryCircleName || "";

      var encodedQueryParms = this.commonOpsService.encodeQueryParamsInBase64({
        id: id,
        isReadOnly: isReadOnly,
        officerName: this.officerName,
        officerCircleName: this.officerCircleName,
        desc: this.officerDesignation
      });
      
    } 
    sessionStorage.setItem('month', JSON.stringify(this.monthwise));
    sessionStorage.setItem('year', JSON.stringify(this.yearwise));
    this.router.navigate(['/department-level-forms/mpr-factory-wing'], { queryParams: { info: encodedQueryParms } });
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
    this.loadDashboadData(parseInt( this.selRecordHeadCode), this.selApplicationType, this.sortColumn);
  }

  calcTotalPages() {
    this.totalPages = Math.ceil(this.totalRecords / this.dataTableParams.pageSize);
    this.fakeArray = Array(this.totalPages);
  }

  onChangeYear(event) {
    this.yearwise = event.target.value;
    this.loadDashboadData(parseInt( this.selRecordHeadCode), this.selApplicationType, this.sortColumn);
  }
  
  onChangeMonth(event) {
    this.monthwise = event.target.value;
    this.loadDashboadData(parseInt( this.selRecordHeadCode), this.selApplicationType, this.sortColumn);
  }

    sortByColName(colName: string){
    if(colName == this.sortColumn){
      this.dataTableParams.sortOrder = (this.dataTableParams.sortOrder == '1' ? '2' : '1');
    }
    else{
      this.dataTableParams.sortOrder = '1';
    }
    this.sortColumn = colName;
    this.loadDashboadData(parseInt( this.selRecordHeadCode), this.selApplicationType, this.sortColumn);
  }
  
}
