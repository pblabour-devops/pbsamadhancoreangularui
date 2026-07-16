import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { CommonService } from 'src/app/common/common.service';
import { GenericFormModel } from 'src/app/generic-implementation/generic-form-builder.type';
import { GenericResponseTemplateModel } from 'src/app/generic-implementation/generic-service-result-template';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { OfficialDashboardContentViewModel, RecordTypeMenuCountViewModel, RecordsTypeListViewModel, IDataTableParamsViewModel, IDeemed_ProcessFilesLog, IAppActionTimeLineDefinations, IDeemed_All_Act_ProcessFilesLog } from '../dashboard-typed-models';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-officials',
    templateUrl: './officials.component.html',
    styleUrls: ['./officials.component.css'],
    standalone: false
})
export class OfficialsComponent implements OnInit {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  public recordTypeApplicationTypeCount:RecordTypeMenuCountViewModel[];
  public selectedRecordTypeApplicationTypeCount:RecordTypeMenuCountViewModel[];
  public recordTypeMenuCount:RecordTypeMenuCountViewModel[]=[];
  public recordsTypeList : RecordsTypeListViewModel[];
  public selRecordHeadCode: string  ='1';
  public selApplicationType:number=1;
  applicationLogs: any[];
  public publicAppRefNum: string;
  public applicationListAlso :  number;
  public paramInfo:any;
  public parmamEncodedinfo:string;
  public pageTitle: string;
  public selAppRefId: number=0;
  public isForVerification : boolean;
  public totalHrs: number=0;
  public iconsList:any=[
    {
      headCode:'1',
      icon: 'icon-inbox',
      color: 'text-danger',
      // badgeColor: 'badge-danger', 
    },
    {
      headCode:'2',
      icon: 'icon-navigation',
      color: 'text-success',
    },
    {
      headCode:'3',
      icon: 'feather icon-check-circle',
      color: 'text-success',
      badgeColor: 'badge-success'
    },
    {
      headCode:'4',
      icon: 'feather icon-scissors',
      color: 'text-danger',
      badgeColor: 'badge-danger'
    }
  ];
  pdfPath: any = [];
  distinctApplicationTypes: any[]=[];
  originalUrl: string='';
  selectedPageNo: number=1;
  selectedPageSize: number=10;
  headercode: number;
  totalTimeRemaining: string='';
  constructor(private route: ActivatedRoute, 
    private router: Router,
    private activeRoute: ActivatedRoute,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,  
    private common:CommonService,  
    private modalService: NgbModal,
    public commonOpsService: CommonOpsService,
    private authService: AuthService) { }

    dataTableParams: IDataTableParamsViewModel = {
      searchCode: '',
      pageNo: 1,
      pageSize: 10,
      sortColumn: '',
      sortOrder: '2',
      filterArray:''
    };
    totalRecords: number = 0;
    totalPages: number = 0;
    fakeArray = new Array(0);
    searchText: string='';
    deemedDetail: IDeemed_ProcessFilesLog;
    deemedAllActDetail: any;
    timeLineDetail : IAppActionTimeLineDefinations[]=[];
    maxDaysAllowedForRaiseFee:number=5;
  
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

            // Set flag to prevent reopening this session
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



  ngAfterViewInit() {
    this.route.queryParams
    .subscribe(params => {
      this.originalUrl=params.info;
      this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info)=>{
        this.paramInfo = info;
        this.selRecordHeadCode =  this.paramInfo?.headCode==undefined ? "1": this.paramInfo?.headCode;
        this.selApplicationType= this.paramInfo?.applicationType==undefined ? "0": this.paramInfo?.applicationType;
        if(params.rdtp){
          this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.rdtp, (rdtpInfo)=>{
            this.dataTableParams = rdtpInfo;
            (<HTMLInputElement>document.getElementById('searchKeyword')).value=this.dataTableParams.searchCode;
            this.searchText=this.dataTableParams.searchCode;
            this.selectedPageNo = this.dataTableParams.pageNo;
            this.selectedPageSize = this.dataTableParams.pageSize;
            this.onRecordTypeItemClick(this.selRecordHeadCode, this.selApplicationType);
          });
        }
        else{
          this.onRecordTypeItemClick(this.selRecordHeadCode, this.selApplicationType);
        }
      });
    });
  }
  loadDashboadData(dashboardRecordsHeaderType: number, applicationType: number){
    this.recordTypeMenuCount=[];

    let parms = { 
      id: this.authService.getUserJwtDecodedInfo().UserId,  
      dashboardRecordsHeaderType: dashboardRecordsHeaderType, 
      applicationType: applicationType, 
      applicationListAlso: true, 

      searchCode: this.dataTableParams.searchCode, 
      pageNo: this.dataTableParams.pageNo, 
      pageSize : this.dataTableParams.pageSize, 
      sortColumn : 'ActionDate', 
      sortOrder : this.dataTableParams.sortOrder,
      filterArray : this.dataTableParams.filterArray
    };
    this.headercode =parms.dashboardRecordsHeaderType;
    this.appHttpRequestHandlerService.httpGet(parms, "Dashboard", "loadOfficialsDashboard").pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: GenericFormModel<OfficialDashboardContentViewModel>)=>{
      //this.distinctApplicationTypes = [...new Set(this.recordTypeApplicationTypeCount.map(item => item.applicationType))];
      this.selApplicationType = data.formModel.applicationType;
      this.recordTypeApplicationTypeCount=data.formModel.recordTypeMenuCount;
      this.getApplicationsTypeFromCountList();
      if(this.recordTypeApplicationTypeCount.length>0){
        var headCode=this.recordTypeApplicationTypeCount[0].headCode;

        this.recordTypeMenuCount.push(
          {
            applicationType: this.recordTypeApplicationTypeCount[0].applicationType, 
            headCode: this.recordTypeApplicationTypeCount[0].headCode, 
            recordCount: this.recordTypeApplicationTypeCount.filter(x => x.headCode == headCode).reduce((sum, item)=> sum + item.recordCount,0), 
            recordHead: this.recordTypeApplicationTypeCount[0].recordHead,
            applicationTypeDesc: this.recordTypeApplicationTypeCount[0].applicationTypeDesc,
            applicationTypeShortDesc: this.recordTypeApplicationTypeCount[0].applicationTypeShortDesc
          });

        this.recordTypeApplicationTypeCount.forEach(item => {
          if(item.headCode!=headCode){
           this.recordTypeMenuCount.push(
             {applicationType: item.applicationType, 
              headCode: item.headCode, 
              recordCount: this.recordTypeApplicationTypeCount.filter(x => x.headCode == item.headCode).reduce((sum, item)=> sum + item.recordCount,0), 
              recordHead: item.recordHead,
              applicationTypeDesc : item.applicationTypeDesc,
              applicationTypeShortDesc : item.applicationTypeShortDesc
            });
              headCode= item.headCode;
          }
        });
        if(applicationType==0){
          if(this.recordTypeApplicationTypeCount.length>0 ){
            this.selApplicationType = this.recordTypeApplicationTypeCount[0].applicationType;
          }
        }
        else{
          this.selApplicationType = applicationType;
        }

        this.pageTitle = this.recordTypeMenuCount.filter(x=>x.headCode==this.selRecordHeadCode)[0].recordHead;

      }
      this.recordsTypeList = data.formModel.recordsTypeList;
      this.recordsTypeList = data.formModel.recordsTypeList;
      if (this.recordsTypeList.length > 0) {
        this.totalRecords = this.recordsTypeList[0].maxRows;
        this.calcTotalPages();
      }
      else {
        this.totalRecords = 0;
      }


    });
  }


  getIcon(headCode): string{
    var icon = this.iconsList.filter(x => x.headCode == headCode)[0].icon
    return icon;
  }
  getColor(headCode): string{
    var color = this.iconsList.filter(x => x.headCode == headCode)[0].color
    return color;
  }
  getBadge(headCode): string{
    var badgeColor = this.iconsList.filter(x => x.headCode == headCode)[0].badgeColor
    return badgeColor;
  }
  getApplicationsTypeFromCountList():void{
    this.selectedRecordTypeApplicationTypeCount = this.recordTypeApplicationTypeCount.filter(x => x.headCode == this.selRecordHeadCode)
  }
  onRecordTypeItemClick(headCode:string, selApplicationType){
    this.selRecordHeadCode=headCode;
    //this.dataTableParams.pageNo = 1;
    //this.selApplicationType=0;
    this.loadDashboadData(parseInt(headCode), selApplicationType);
  }
  onAppTypeOptionClick(applicationType:number){
    this.selApplicationType=applicationType;
    this.loadDashboadData(parseInt( this.selRecordHeadCode), applicationType);
  }

  onProcessClick(applicationRefId, projectSiteRefId, applicationType, actionCode, actionTakenByRoleName,projectSiteVersion, actionWindowType,applicationActionLogId, isTimeLineFlow){
    // //if(applicationType==5 && ((actionCode==103 && actionTakenByRoleName=='ARHQ') || (actionCode==400 && actionTakenByRoleName=='JDRF'))){
    // if(actionWindowType=='RAISE_FEE'){
    //   var encodedQueryParms= this.commonOpsService.encodeQueryParamsInBase64({appRefId: applicationRefId, projectSiteRefId: projectSiteRefId, applicationType : applicationType, identityKey : 10009, isForVerification : false, projectSiteVersion : projectSiteVersion })
    //   this.router.navigate(['/payments/buildingplanhudraisfee'],{ queryParams:{info: encodedQueryParms}});
    // }

    if(actionWindowType == 'RAISE_FEE') {
      var encodedQueryParms = this.commonOpsService.encodeQueryParamsInBase64({
          appRefId: applicationRefId,
          projectSiteRefId: projectSiteRefId,
          applicationType: applicationType,
          identityKey: 10009,
          isForVerification: false,
          projectSiteVersion: projectSiteVersion,
          isTimeLineFlow : isTimeLineFlow
      });
      if (applicationType == 5) {
          this.router.navigate(['/payments/buildingplanhudraisfee'], { queryParams: { info: encodedQueryParms } });
      } else if (applicationType == 71 || applicationType == 72 || applicationType == 73) {
          this.router.navigate(['/payments/app-raise-fee'], { queryParams: { info: encodedQueryParms } });
      }
    }

    //else if(applicationType==5 && actionCode==6 && actionTakenByRoleName=='INDL'){
    else if(actionWindowType=='ACTION'){
      var encodedQueryParms= this.commonOpsService.encodeQueryParamsInBase64({ appRefId: applicationRefId, projectSiteRefId: projectSiteRefId, applicationType : applicationType, actionCode: actionCode, allowTakeAction: 1, projectSiteVersion : projectSiteVersion, applicationActionLogId : applicationActionLogId, isTimeLineFlow : isTimeLineFlow});
      //this.router.navigate(['/payments/buildingplanhudraisfee'],{ queryParams:{info: encodedQueryParms}});
      //this.router.navigate(['/applicationProcess/actionWindow'], { queryParams: { appRefId: applicationRefId, projectSiteRefId: projectSiteRefId, applicationType : applicationType, actionCode: actionCode, allowTakeAction: 1} })
      var enodedDataTableParams = this.commonOpsService.encodeQueryParamsInBase64(this.dataTableParams);
      this.router.navigate(['/applicationProcess/actionWindow'],{ queryParams:{info: encodedQueryParms, rurl: this.originalUrl, rdtp: enodedDataTableParams}});
    }
    else if(actionWindowType=='VERIFY_FEE'){
      var encodedQueryParms= this.commonOpsService.encodeQueryParamsInBase64({appRefId: applicationRefId, projectSiteRefId: projectSiteRefId, applicationType : applicationType, identityKey : 10009, isForVerification : true, projectSiteVersion : projectSiteVersion })
      this.router.navigate(['/payments/buildingplanhudraisfee'],{ queryParams:{info: encodedQueryParms}});
    }
    // else{
    //   this.router.navigate(['/applicationProcess/actionWindow'], { queryParams: { appRefId: applicationRefId, projectSiteRefId: projectSiteRefId, applicationType : applicationType, actionCode: actionCode, allowTakeAction: 1} })
    // }
  }
  onShowAppDetailClick(applicationRefId, projectSiteRefId, applicationType, actionCode, actionTakenByRoleName, projectSiteVersion){

    var encodedQueryParms= this.commonOpsService.encodeQueryParamsInBase64({ appRefId: applicationRefId, projectSiteRefId: projectSiteRefId, applicationType : applicationType, actionCode: actionCode, allowTakeAction: 0, projectSiteVersion : projectSiteVersion});
    this.router.navigate(['/applicationProcess/actionWindow'],{ queryParams:{info: encodedQueryParms}});
    //this.router.navigate(['/applicationProcess/actionWindow'], { queryParams: { appRefId: applicationRefId, projectSiteRefId: projectSiteRefId, applicationType : applicationType, actionCode: actionCode, allowTakeAction: 0} })
  }

  openScrollableContent(longContent, applicationRefId) {
    this.selAppRefId = applicationRefId;
    this.appHttpRequestHandlerService.httpGet({ appRefId: applicationRefId }, "Dashboard", "getapplicationslogs").pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data) => { 
            this.applicationLogs = data.listData;
            this.publicAppRefNum= data.listData[0].applicationRefNumber;
    this.modalService.open(longContent, { scrollable: true });
    })
  }
  openPreviewClearenceContent(longContent, publicAppRefNum, applicationType) {
    var dirName='';
    if(applicationType==6){ // SHOP
      dirName="AppForm_SHOP_LICENCE/";
    }
    else if(applicationType==5){ // BP HUD
      dirName="AppForm_BUILDING_PLAN_HUD/";
    }
    else if(applicationType==70){ // FACT
      dirName="AppForm_FACTORY_LICENCE/";
    }
    else if(applicationType==61){ // Night Shift (Shop)
      dirName="AppForm_WOMEN_NIGHT_SHIFT_SHOP/";
    }
    else if(applicationType==62){ // Night Shift (Factory)
      dirName="AppForm_WOMEN_NIGHT_SHIFT_FACTORY/";
    }
    else if(applicationType==71){ // Proposed
      dirName="AppForm_BUILDING_PLAN_PROPOSED/";
    }
    else if(applicationType==72){ // Existing
      dirName="AppForm_BUILDING_PLAN_EXISTING/";
    }
    else if(applicationType==73){ // Addition & Amendment
      dirName="AppForm_BUILDING_PLAN_ADDITION_AMENDMENT/";
    }
    else if(applicationType==39){ // ISM PE
      dirName="AppForm_ISM/";
    }
    else if(applicationType==37){ // CL Principal Employer
      dirName="AppForm_PRINCIPAL_EMPLOYER/";
    }
    else if(applicationType==38){ // Contract Labour
      dirName="AppForm_CONTRACT_LABOUR/";
    }
    else if(applicationType==36){ // Motor Transport
      dirName="AppForm_MOTOR_TRANSPORT/";
    }
    else if(applicationType==35){ // BOCW
      dirName="AppForm_BOCW_ESTABLISHMENT_ACT/";
    }
    else if(applicationType==81){ // PSIEC
      dirName="AppForm_BUILDING_PLAN_PSIEC/";
    }
    this.pdfPath = environment.pbLabourDefaultRoot + 'License/'+ dirName + publicAppRefNum + '.pdf';
    this.modalService.open(longContent, { scrollable: true, backdrop: 'static', keyboard: false });
  }
  dismissAllModals(){
    this.modalService.dismissAll();
  }
  onApplicationNumClick(identityKey, applicationRefId, applicationType, projectSiteRefId){
    if(applicationType==1){
      this.router.navigate(['/establishment/detail'], { queryParams: {info: this.commonOpsService.encodeQueryParamsInBase64({identityKey: identityKey, appRefId: applicationRefId, applicationType: applicationType, projectSiteRefId: projectSiteRefId})}});
    }
    else if(applicationType==5){
      this.router.navigate(['/building-plan-hud/detail'], { queryParams: {info: this.commonOpsService.encodeQueryParamsInBase64({identityKey: identityKey, appRefId: applicationRefId, applicationType: applicationType, projectSiteRefId: projectSiteRefId})}});
    }
  }

  // getArticleList() {
  //   //this.dataTableParams.userId = this.userId;
  //   this.appHttpRequestHandlerService.httpGet(this.dataTableParams, "Dashboard", "loadOfficialsDashboard").pipe(takeUntil(this.ngUnsubscribe))
  //     .subscribe((data: GenericResponseTemplateModel<IArticle[]>) => {
  //       this.articleList = data.responseDataModel;
  //       if (this.articleList.length > 0) {
  //         this.totalRecords = this.articleList[0].maxRows;
  //         this.calcTotalPages();
  //       }
  //       else {
  //         this.totalRecords = 0;
  //       }
  //     });
  // }
  calcTotalPages() {
    this.totalPages = Math.ceil(this.totalRecords / this.dataTableParams.pageSize);
    this.fakeArray = Array(this.totalPages);
  }
  onChangeSortOrder(event) {
    this.dataTableParams.sortOrder = event.target.value;

    this.loadDashboadData(parseInt( this.selRecordHeadCode), this.selApplicationType);
  }
  onChangePageSize(event) {
    this.dataTableParams.pageNo = 1;
    this.dataTableParams.pageSize = event.target.value;
    this.loadDashboadData(parseInt( this.selRecordHeadCode), this.selApplicationType);
  }

  onChangePageNumber(event) {
    this.dataTableParams.pageNo = event.target.value;
    this.loadDashboadData(parseInt( this.selRecordHeadCode), this.selApplicationType);
  }
  onClickNextPage() {
    if (this.dataTableParams.pageNo < this.totalPages) {
      this.dataTableParams.pageNo = this.dataTableParams.pageNo + 1;
      this.loadDashboadData(parseInt( this.selRecordHeadCode), this.selApplicationType);
    }
  }
  onClickPrevPage() {
    if (this.dataTableParams.pageNo > 1) {
      this.dataTableParams.pageNo = this.dataTableParams.pageNo - 1;
      this.loadDashboadData(parseInt( this.selRecordHeadCode), this.selApplicationType);
    }
  }
  onClickSearchBar(){
    this.searchByKeyword((<HTMLInputElement>document.getElementById('searchKeyword')).value);
  }
  searchByKeyword(keyword: string) {
    this.dataTableParams.searchCode = keyword.trim();
    this.loadDashboadData(parseInt( this.selRecordHeadCode), this.selApplicationType);
  }

  sortByColName(colName: string){
    if(colName == this.dataTableParams.sortColumn){
      this.dataTableParams.sortOrder = (this.dataTableParams.sortOrder == '1' ? '2' : '1');
    }
    else{
      this.dataTableParams.sortOrder = '1';
    }
    this.dataTableParams.sortColumn = colName;
    this.loadDashboadData(parseInt( this.selRecordHeadCode), this.selApplicationType);
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

  openPreviewDeemedContent(longContent, id: number){
    this.appHttpRequestHandlerService.httpGet({ id: id }, "Dashboard", "getDeemedCalculationDetail").pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: GenericResponseTemplateModel<IDeemed_ProcessFilesLog>) => { 
      this.deemedDetail=data.responseDataModel;
      this.modalService.open(longContent, { scrollable: true, backdrop: 'static', keyboard: true, size:'md'});
    })
  }

   openPreviewAllActDeemedContent(longContent, id: number){
    this.appHttpRequestHandlerService.httpGet({ id: id }, "Dashboard", "getDeemedAllActCalculationDetail").pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data) => { 
      this.deemedAllActDetail=data.listData[0];
      this.modalService.open(longContent, { scrollable: true, backdrop: 'static', keyboard: true, size:'md'});
    })
  }


  convertHoursToDaysHours(totalHours: number): string {
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;
  return `${days}.${hours}`;
}


  getCurrentApplicationTypeDesc(){
    return this.selectedRecordTypeApplicationTypeCount?.filter(x=>x.applicationType == this.selApplicationType)[0]?.applicationTypeDesc;
  }

  openTimeLineDetails(longContent, applicationActionLogId: number){
    this.appHttpRequestHandlerService.httpGet({ applicationActionLogId: applicationActionLogId }, "Dashboard", "getTimeLinesDetail").pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: GenericResponseTemplateModel<IAppActionTimeLineDefinations[]>) => { 
      this.timeLineDetail=data.responseDataModel;
      const unique = [...new Set(this.timeLineDetail.map(item => item.allowedAppActionType))]; // [ 'A', 'B']
      this.timeLineDetail = this.timeLineDetail.filter(x=>x.allowedAppActionType == unique[0]);
      const totalMins = this.timeLineDetail.reduce((sum, current) => sum + current.minutes, 0);
      const totalhrs = this.timeLineDetail.reduce((sum, current) => sum + current.hours, 0);
      this.totalHrs = totalhrs +(totalMins>0 ? totalMins/60 : 0);

      this.modalService.open(longContent, { scrollable: true, backdrop: 'static', keyboard: true, size:'md'});
    })
  }
  getDateDiffrenceInDays(fromDate:string): number{
    var date1:any = new Date(fromDate);
    var date2:any = new Date();
    var diffDays:any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
    return diffDays;
  }
  replaceTimeNames(originalText: string, index: number): string{
    return originalText.split('-')[index];
    
  }

  isDeemedTimeExpired(): boolean {
    const totalTime = Number(this.deemedAllActDetail?.deemedInTime.split('-')[0]);
    const maxDeemedTime = Number(this.deemedAllActDetail?.maxDeemedTime.split('-')[0]);
    return totalTime < maxDeemedTime;
  }
  openReports() {
  // route or open modal
  var encodedQueryParms= this.commonOpsService.encodeQueryParamsInBase64({ applicationTypes: [...new Set(this.recordTypeApplicationTypeCount.map(x => x.applicationType))].join(',') });
  console.log(encodedQueryParms);
  this.router.navigate(['dashboard/myReports'],{ queryParams:{info: encodedQueryParms}});
}
}
