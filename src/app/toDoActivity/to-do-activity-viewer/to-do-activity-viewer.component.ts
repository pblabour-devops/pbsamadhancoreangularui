import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericResponseTemplateModel } from 'src/app/generic-implementation/generic-service-result-template';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { IToDoActivityLogViewModel, IToDoActivityWiseStepViewModel, IToDoUserWiseActivityViewModel } from '../to-do-activity.typed.models';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IDataTableParamsViewModel } from 'src/app/dashboard/dashboard-typed-models';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-to-do-activity-viewer',
    templateUrl: './to-do-activity-viewer.component.html',
    styleUrls: ['./to-do-activity-viewer.component.css'],
    standalone: false
})
export class ToDoActivityViewerComponent implements OnInit {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  activityLogs: IToDoUserWiseActivityViewModel[] = [];
  // userWiseActivities: IToDoUserWiseActivityViewModel[]=[];
  currentSelUserRefId = '';
  activityWiseData: IToDoActivityLogViewModel[] = [];
  stepsWiseData: IToDoActivityWiseStepViewModel[] = [];
  activityFailedMessage: string = '';
 

  @ViewChild("stepsViewerModal") stepsViewerModal: TemplateRef<any>;
  @ViewChild("failedMessageViewerModal") failedMessageViewerModal: TemplateRef<any>;
  failedMessageViewerModalRef: NgbModalRef;

   dataTableParams: IDataTableParamsViewModel = {
        searchCode: '',
        pageNo: 1,
        pageSize: 10,
        sortColumn: 'RootActivityRefId',
        sortOrder: '2',
        filterArray:'1,2,3'
      };
      totalRecords: number = 0;
      totalPages: number = 0;
      fakeArray = new Array(0);
      searchText: string='';
    constructor(private appHttpRequestHandlerService: AppHttpRequestHandlerService, private modalService: NgbModal,
      private authService: AuthService
    ) { }

  ngOnInit() {
      const roleName = this.authService.getUserJwtDecodedInfo().RoleName;

      // Check if modal already shown in this session
      const popupShown = sessionStorage.getItem('whatsNewShown');
      if (popupShown) {
        console.log('Popup already shown this session — skipping');
        return;
      }

      this.appHttpRequestHandlerService.httpGet(
        { roleName },
        'CommonApis',
        'getWhatsNewInPortal'
      )
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (data: any) => {
          if (data?.responseDataModel?.length > 0) {
            // const modalRef = this.modalService.open(WhatsNewComponent, {});
            // modalRef.componentInstance.whatsNewData = data.responseDataModel;

            // // Set flag to prevent reopening this session
            // sessionStorage.setItem('whatsNewShown', 'true');
          } else {
            console.log('No data found — modal will not open');
          }
        },
        error: err => {
          console.error('Error fetching What’s New data:', err);
        }
      });
  }

  ngAfterViewInit(){
    this.loadDashboadData();
  }


loadDashboadData(){
  let userRefId = 'd9a8d08f-7ca9-4e96-aa2f-69c5dba0496d'
    let parms = { 
      rootActivityRefIds: '1736247006',

      searchCode: this.dataTableParams.searchCode, 
      pageNo: this.dataTableParams.pageNo, 
      pageSize : this.dataTableParams.pageSize, 
      sortColumn : this.dataTableParams.sortColumn, 
      sortOrder : this.dataTableParams.sortOrder,
      filterArray : this.dataTableParams.filterArray
    };
    // if (this.currentSelUserRefId != userRefId) {
      this.currentSelUserRefId = userRefId;
      this.appHttpRequestHandlerService.httpGet(parms, "ToDoManager", "getActivitiesByRootActivityId").pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data: GenericResponseTemplateModel<IToDoActivityLogViewModel[]>) => {
          this.activityWiseData = data.responseDataModel;
          if (this.activityWiseData.length > 0) {
            this.totalRecords = this.activityWiseData[0].maxRows;
            this.calcTotalPages();
          }
          else {
            this.totalRecords = 0;
          }

        });
    // }
    // else {
    //   this.currentSelUserRefId = '';
    // }
  }




  onClickUserWiseRow(rootActivityRefIds: string, userRefId: string) {
    if (this.currentSelUserRefId != userRefId) {
      this.currentSelUserRefId = userRefId;
      this.appHttpRequestHandlerService.httpGet({ rootActivityRefIds: rootActivityRefIds }, "ToDoManager", "getActivitiesByRootActivityId").pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data: GenericResponseTemplateModel<IToDoActivityLogViewModel[]>) => {
          this.activityWiseData = data.responseDataModel;
        });
    }
    else {
      this.currentSelUserRefId = '';
    }
  }
  onClickActivityRow(rootActivityRefId: string) {
    this.appHttpRequestHandlerService.httpGet({ rootActivityRefId: rootActivityRefId }, "ToDoManager", "getActivitiesWiseSteps").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericResponseTemplateModel<IToDoActivityWiseStepViewModel[]>) => {
        this.modalService.open(this.stepsViewerModal, { windowClass: 'my-class', size: 'lg', scrollable: true, backdrop: 'static', keyboard: false });
        this.stepsWiseData = data.responseDataModel;
      });

  }
  onClickViewFailedMessage(toDoSerialOrderCount: number) {
    this.activityFailedMessage = this.stepsWiseData.filter(x => x.toDoSerialOrderCount == toDoSerialOrderCount)[0].activityFailedMessage;
    this.failedMessageViewerModalRef = this.modalService.open(this.failedMessageViewerModal, { windowClass: 'error-message', size: 'md', scrollable: true, backdrop: 'static', keyboard: false });
  }
  onClickCloseFailedMessageModal() {
    this.failedMessageViewerModalRef.close();
  }
  onClickCloseStepsViewerModal() {
    this.modalService.dismissAll();
  }
  


  calcTotalPages() {
    this.totalPages = Math.ceil(this.totalRecords / this.dataTableParams.pageSize);
    this.fakeArray = Array(this.totalPages);
  }
  onChangeSortOrder(event) {
    this.dataTableParams.sortOrder = event.target.value;

    this.loadDashboadData();
  }
  onChangePageSize(event) {
    this.dataTableParams.pageNo = 1;
    this.dataTableParams.pageSize = event.target.value;
    this.loadDashboadData();
  }

  onChangePageNumber(event) {
    //console.log(event.target.value)
    this.dataTableParams.pageNo = event.target.value;
    this.loadDashboadData();
  }
  onClickNextPage() {
    if (this.dataTableParams.pageNo < this.totalPages) {
      this.dataTableParams.pageNo = this.dataTableParams.pageNo + 1;
      this.loadDashboadData();
    }
  }
  onClickPrevPage() {
    if (this.dataTableParams.pageNo > 1) {
      this.dataTableParams.pageNo = this.dataTableParams.pageNo - 1;
      this.loadDashboadData();
    }
  }
  onClickSearchBar(){
    this.searchByKeyword((<HTMLInputElement>document.getElementById('searchKeyword')).value);
  }
  searchByKeyword(keyword: string) {
    this.dataTableParams.searchCode = keyword.trim();
    this.loadDashboadData();
  }

  sortByColName(colName: string){
    if(colName == this.dataTableParams.sortColumn){
      this.dataTableParams.sortOrder = (this.dataTableParams.sortOrder == '1' ? '2' : '1');
    }
    else{
      this.dataTableParams.sortOrder = '1';
    }
    this.dataTableParams.sortColumn = colName;
    this.loadDashboadData();
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
  // save() {
  //   this.appHttpRequestHandlerService.httpPost(
  //     {
  //       shopLicenceId: 144956,
  //       isHavingEmployee: 1,
  //       appRefId:278932,


  //       investPunjab_AppId: 2501381106,
  //       iPin: 240713817,
  //       applicationPurposeType: 1,
  //       applicationType: 6,
  //       projectSiteRefId: 137746,
  //       projectSiteVersion:1,
  //       toDoActivityModeType: 2,
  //       rootActivityRefId: "12331212124554",
  //       toDoActivityCategoryType: 6001
  //     }, "pbsamadhannetcoreapi.ViewModels.EmployeeDetailViewModel", "Crud", "CreateUpdate").pipe(takeUntil(this.ngUnsubscribe))
  //     .subscribe((data: any) => {

  //     });
  // }
  getUserDetailPart(userFullDetail: string, partCode: string){
    var partIndex =0;
    if(partCode == 'userName'){
      partIndex =0;
    }
    else if(partCode == 'roleName'){
      partIndex =1;
    }
    else if(partCode == 'fullName'){
      partIndex =2;
    }
    else if(partCode == 'mobile'){
      partIndex =3;
    }
    else if(partCode == 'email'){
      partIndex =4;
    }
    if(userFullDetail == null){
      return "";
    }
    return userFullDetail.split('~')[partIndex];
  }
  onFilterChange(event){
    this.dataTableParams.filterArray = event.target.value == 0 ? '1,2,3' : event.target.value == 1 ? '2,3' : '1';
    this.loadDashboadData();
  }
}
