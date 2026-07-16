import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericResponseTemplateModel } from 'src/app/generic-implementation/generic-service-result-template';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
//import { Inspection_Randomization } from '../../Inspections-typed-models';
import { Router } from '@angular/router';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { IDataTableParamsViewModel } from 'src/app/dashboard/dashboard-typed-models';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-randomization-dashboard',
    templateUrl: './randomization-dashboard.component.html',
    styleUrls: ['./randomization-dashboard.component.css'],
    standalone: false
})
export class RandomizationDashboardComponent implements OnInit {

  private ngUnsubscribe = new Subject<void>();
  public randomizationList : any;
  constructor(
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private router: Router,
    public commonOpsService: CommonOpsService,
    public authService: AuthService
  ) { }


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
  ngOnInit(): void {}

  ngAfterViewInit() {
    
    this.appHttpRequestHandlerService.httpGet({id: 0,
      searchCode: this.dataTableParams.searchCode,
      pageNo: this.dataTableParams.pageNo,
      pageSize: this.dataTableParams.pageSize,
      sortColumn: 'Month',
      sortOrder: this.dataTableParams.sortOrder,
      filterArray: this.dataTableParams.filterArray
    }, "Inspection", "getInspection_Randomization").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data) => {
        this.randomizationList = data.responseDataModel;
        if (this.randomizationList.length > 0) {
          this.totalRecords = this.randomizationList[0].maxRows;
          this.calcTotalPages();
        }
        else {
          this.totalRecords = 0;
        }
    });
  }

  getMonthName(monthNumber: number): string {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    return monthNames[monthNumber - 1];
  }

  editRandomizationInspection(id,isLocked, month, year, factoryRefId,timestemp,pending): void{
    var encryptedParms=this.commonOpsService.encodeQueryParamsInBase64(
      {
        randomizationRefId: id, 
        month: month, 
        year: year,
        factoryRefId: factoryRefId,
        timestemp : timestemp
      });
    if(isLocked === 1 && pending === 0)
    {
      this.router.navigate(['/inspection/inspection-dashboard'], { queryParams: {info: encryptedParms}});
    }
    else{
      this.router.navigate(['/inspection/inspection-confirmation'], { queryParams: {info: encryptedParms}});
    }

  }
  openInspectionDashboard(id,isLocked, month, year, factoryRefId): void{
    var encryptedParms=this.commonOpsService.encodeQueryParamsInBase64(
      {
        randomizationRefId: id, 
        month: month, 
        year: year,
        factoryRefId: factoryRefId
      });
      this.router.navigate(['/inspection/inspection-dashboard'], { queryParams: {info: encryptedParms}});
  }
calcTotalPages() {
    this.totalPages = Math.ceil(this.totalRecords / this.dataTableParams.pageSize);
    this.fakeArray = Array(this.totalPages);
  }
  onChangeSortOrder(event) {
    this.dataTableParams.sortOrder = event.target.value;

    this.onClickSearch();
  }
  onChangePageSize(event) {
    this.dataTableParams.pageNo = 1;
    this.dataTableParams.pageSize = event.target.value;
    this.onClickSearch();
  }

  onChangePageNumber(event) {
    this.dataTableParams.pageNo = event.target.value;
    this.onClickSearch();
  }
  onClickNextPage() {
    if (this.dataTableParams.pageNo < this.totalPages) {
      this.dataTableParams.pageNo = this.dataTableParams.pageNo + 1;
      this.onClickSearch();
    }
  }
  onClickPrevPage() {
    if (this.dataTableParams.pageNo > 1) {
      this.dataTableParams.pageNo = this.dataTableParams.pageNo - 1;
      this.onClickSearch();
    }
  }
  onClickSearchBar() {
    this.searchByKeyword((<HTMLInputElement>document.getElementById('searchKeyword')).value);
  }
  searchByKeyword(keyword: string) {
    this.dataTableParams.pageNo = 1;
    this.dataTableParams.searchCode = keyword.trim();
    this.onClickSearch();
  }
  sortByColName(colName: string) {
    if (colName == this.dataTableParams.sortColumn) {
      this.dataTableParams.sortOrder = (this.dataTableParams.sortOrder == '1' ? '2' : '1');
    }
    else {
      this.dataTableParams.sortOrder = '1';
    }
    this.dataTableParams.sortColumn = colName;
    this.onClickSearch();
  }
  searchPressed(event) {
    if (event.keyCode == 13) {
      this.onClickSearchBar()
    }
  }
  searchKeyUp(event) {
    this.searchText = (<HTMLInputElement>document.getElementById('searchKeyword')).value;
    if (((event.keyCode == 8 || event.keyCode == 46) && event.target.value.trim().length == 0)) {
      this.onClickSearchBar()
    }
  }
  clearSearch() {
    (<HTMLInputElement>document.getElementById('searchKeyword')).value = '';
    this.searchText = '';
    this.onClickSearchBar()
  }

  onClickSearch() {
    this.appHttpRequestHandlerService.httpGet({id: 0,
      searchCode: this.dataTableParams.searchCode,
      pageNo: this.dataTableParams.pageNo,
      pageSize: this.dataTableParams.pageSize,
      sortColumn: 'Month',
      sortOrder: this.dataTableParams.sortOrder,
      filterArray: this.dataTableParams.filterArray
    }, "Inspection", "getInspection_Randomization").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data) => {
        this.randomizationList = data.responseDataModel;
        if (this.randomizationList.length > 0) {
          this.totalRecords = this.randomizationList[0].maxRows;
          this.calcTotalPages();
        }
        else {
          this.totalRecords = 0;
        }
    });
  }
}
