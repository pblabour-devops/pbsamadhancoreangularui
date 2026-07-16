import { Component, OnInit } from '@angular/core';
import {CommonService} from '../../common/common.service'
import * as $ from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';
import { AppHttpRequestHandlerService } from '../app-http-request-handler.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonOpsService } from '../common-ops-service';
import { GetRedirectUrlViewModel, OfficialDashboardContentViewModel, RecordsTypeListViewModel, RecordTypeMenuCountViewModel } from 'src/app/dashboard/dashboard-typed-models';
import { GenericFormModel } from 'src/app/generic-implementation/generic-form-builder.type';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { each } from 'jquery';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { color } from 'html2canvas/dist/types/css/types/color';
@Component({
    selector: 'app-side-nav-bar',
    templateUrl: './side-nav-bar.component.html',
    styleUrls: ['./side-nav-bar.component.css'],
    standalone: false
})
export class SideNavBarComponent implements OnInit {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  public recordTypeApplicationTypeCount:RecordTypeMenuCountViewModel[];
  public selectedRecordTypeApplicationTypeCount:RecordTypeMenuCountViewModel[];
  public recordTypeMenuCount:RecordTypeMenuCountViewModel[]=[];
  public recordsTypeList : RecordsTypeListViewModel[];
  public selRecordHeadCode: string  ='1';
  public selApplicationType:number=0;
  applicationLogs: any[];
  public publicAppRefNum: string;
  public applicationListAlso :  number;
  roleName: string='';
  isNavOpen: boolean = true;
  public iconsList:any=[
    {
      headCode:'1',
      icon: 'icon-inbox',
      color: 'text-danger',
    },
    {
      headCode:'2',
      icon: 'icon-navigation',
      color: 'text-success',
    },
    {
      headCode:'3',
      icon: 'icon-activity',
      color: 'text-warning',
    },
    {
      headCode:'4',
      icon: 'feather icon-check-circle',
      color: 'text-success',
      badgeColor: 'badge-success'
    },
    {
      headCode:'5',
      icon: 'feather icon-scissors',
      color: 'text-danger',
      badgeColor: 'badge-danger'
    },
    {
      headCode:'6',
      icon: 'feather icon-zap',
      color: 'text-danger',
      badgeColor: 'badge-danger'
    },
    {
      headCode:'7',
      icon: 'feather icon-eye',
      color: 'text-danger',
      badgeColor: 'badge-danger'
    },
  ];
  distinctHeadCodes:any[]=[];
  distinctApplicationTypes: any[]=[];
  //private expandedItem: string | null = null;
  isMenuItemExpanded:boolean = true;
  isMenuItemDashboardExpanded:boolean = true;
  isMenuItemEPFOExpanded:boolean = false;
  constructor(public CS: CommonService,private route: ActivatedRoute,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private common:CommonService,
    private modalService: NgbModal,
    public commonOpsService: CommonOpsService,
    public authService : AuthService) { }

  ngOnInit(): void {
    this.isNavOpen = this.CS.getNavBarState();
    this.CS.navBarState$obs
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((state: boolean) => {
        this.isNavOpen = state;
      });
    if(this.authService.getUserJwtDecodedInfo().RoleName==undefined || this.authService.getUserJwtDecodedInfo().RoleName==null){
      this.roleName = '';
  }
  else {
    this.roleName = this.authService.getUserJwtDecodedInfo().RoleName;
  }
  if("INDL,LB1N,DEVTEAM,HELPDESK,ACFA,WBCH,WBDH,WBAO,WBDC,TRN_RPT".indexOf(this.roleName)==-1)
    this.loadDashboadData(1, this.selApplicationType);
  }

    ngAfterViewInit() {
    
  }
  loadDashboadData(dashboardRecordsHeaderType: number, applicationType: number){
    this.recordTypeMenuCount=[];
    this.appHttpRequestHandlerService.httpGet({ id: this.authService.getUserJwtDecodedInfo().UserId,  dashboardRecordsHeaderType: dashboardRecordsHeaderType, applicationType: applicationType, applicationListAlso: false}, "Dashboard", "loadOfficialsDashboard").pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: GenericFormModel<OfficialDashboardContentViewModel>)=>{
      //console.log(data)
      this.recordTypeApplicationTypeCount=data.formModel.recordTypeMenuCount;
      this.distinctHeadCodes = [...new Set(this.recordTypeApplicationTypeCount.map(item => item.headCode))];
      this.distinctApplicationTypes = [...new Set(this.recordTypeApplicationTypeCount.map(item => item.applicationType))];
      this.selApplicationType = data.formModel.applicationType;


// console.log("'"+this.distinctHeadCodes[0]+"_"+this.distinctApplicationTypes[0]+"'"  )
//       document.getElementById("'"+this.distinctHeadCodes[0]+"_"+this.distinctApplicationTypes[0]+"'").click();




      // this.getApplicationsTypeFromCountList();
      // if(this.recordTypeApplicationTypeCount.length>0){
      //   var headCode=this.recordTypeApplicationTypeCount[0].headCode;
      //   this.recordTypeMenuCount.push(
      //   {
      //       applicationType: this.recordTypeApplicationTypeCount[0].applicationType,
      //       headCode: this.recordTypeApplicationTypeCount[0].headCode,
      //       recordCount: this.recordTypeApplicationTypeCount.filter(x => x.headCode == headCode).reduce((sum, item)=> sum + item.recordCount,0),
      //       recordHead: this.recordTypeApplicationTypeCount[0].recordHead,
      //       applicationTypeDesc: this.recordTypeApplicationTypeCount[0].applicationTypeDesc
      //   });
      //   this.recordTypeApplicationTypeCount.forEach(item => {
      //     if(item.headCode!=headCode){
      //      this.recordTypeMenuCount.push(
      //        {applicationType: item.applicationType,
      //         headCode: item.headCode,
      //         recordCount: this.recordTypeApplicationTypeCount.filter(x => x.headCode == item.headCode).reduce((sum, item)=> sum + item.recordCount,0),
      //         recordHead: item.recordHead,
      //         applicationTypeDesc : item.applicationTypeDesc
      //       });
      //         headCode= item.headCode;
      //     }
      //   });
      // }
      // this.recordsTypeList = data.formModel.recordsTypeList;
    });
  }
  isCollapsed=()=>{
    if(this.CS.getNavBarState()==true){
      return "pcoded-navbar menupos-fixed menu-light navbar-collapsed";
    }else{
      return "pcoded-navbar menupos-fixed menu-light";
    }
  }

  togleMenuItem(menuItemId){
    document.getElementById(menuItemId)
    if(!$('#'+menuItemId).hasClass('pcoded-trigger')){
      $('#'+menuItemId).children(".pcoded-submenu").slideDown()
      $('#'+menuItemId).addClass("pcoded-trigger");
    }
    else{
      $('#'+menuItemId).removeClass("pcoded-trigger");
      $('#'+menuItemId).children(".pcoded-submenu").slideUp();
    }
  }

  getRecordHead(headCode){
    return this.recordTypeApplicationTypeCount.filter(x=>x.headCode == headCode)[0].recordHead;
  }
  getApplicationTypeDesc(applicationType){
    return this.recordTypeApplicationTypeCount.filter(x=>x.applicationType == applicationType)[0].applicationTypeDesc;
  }
  getApplicationTypeShortDesc(applicationType){
    return this.recordTypeApplicationTypeCount.filter(x=>x.applicationType == applicationType)[0].applicationTypeShortDesc;
  }
  
  getTotalApplicationTypeWiseCount(applicationType){
    return this.recordTypeApplicationTypeCount.filter(x=>x.applicationType == applicationType).reduce((sum, item) => sum + item.recordCount, 0);
  }
  getTotalHeadWiseCount(headCode, applicationType){
    return this.recordTypeApplicationTypeCount.filter(x=>x.headCode == headCode && x.applicationType == applicationType).reduce((sum, item) => sum + item.recordCount, 0);
  }
  getServicesList(headCode){
    return this.recordTypeApplicationTypeCount.filter(x=>x.headCode == headCode);
  }
  getApplicationsTypeFromCountList():void{
    this.selectedRecordTypeApplicationTypeCount = this.recordTypeApplicationTypeCount.filter(x => x.headCode == this.selRecordHeadCode)
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
  onRecordTypeItemClick(event, headCode:string, applicationType: number){
    //console.log(applicationType)
    this.selRecordHeadCode=headCode;
    this.selApplicationType=applicationType;

    var encodedQueryParms= this.commonOpsService.encodeQueryParamsInBase64({headCode: headCode, applicationType: applicationType})
    this.router.navigate(['/dashboard/officials'],{ queryParams:{info: encodedQueryParms}});
    this.loadDashboadData(parseInt(headCode), this.selApplicationType);
    event.stopPropagation();
  }

  onBackToSystem_O_Click(roleName: string) {
    if(roleName!='INDL'){
      let sys_O_UserDetails = localStorage.getItem('bb4d2a40-0814-4e70-8dbd-c48327e2f33f');
      localStorage.clear();
      window.location.href= environment.thirdPartyIntegrationConfigs.sys_o_urls.backToSys_O_Url + sys_O_UserDetails.replace(/ /g, '+');
    }
    else{
      localStorage.clear();
      window.location.href= environment.thirdPartyIntegrationConfigs.investPunjab.investPunjabReturnPath;
    }
 }
 
//  -----Redirect to Another Portel----
 OnJumpToAnotherPortel(roleName: string , type: string) {
    this.appHttpRequestHandlerService.httpGet({ role: roleName , type :type} , "ThirdPartyIntegrations", "redirectToOtherPortel").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericFormModel<GetRedirectUrlViewModel>) => {
        window.location.href = data.formModel.redirectUrl;
    });
}

 onBackClick() {
    this.router.navigate(['/dashboard/majorcountreport'])
  }
  onFactActClick() {
    this.router.navigate(['/dashboard/majorcountreportfactory'])
  }
  onShopActClick() {
    this.router.navigate(['/dashboard/majorcountreportshop'])
  }

  onOtherActClearenceClick() {
    this.router.navigate(['/dashboard/otheractclearances'])
  }
  onFormHClick(){
    this.router.navigate(['/dashboard/formH'])
  }

  onFactoryBacklogClick(){
    this.router.navigate(['/dashboard/factorybacklog'])
  }
  onInspectionClick(){
    this.router.navigate(['/inspection/randomization'])
  }
  onSubmissionOfStabilityClick() {
    this.router.navigate(['/dashboard/declarationStabilityApplications'])
  }

  onMprFactoryClick() {
    this.router.navigate(['/dashboard/mpr_factories'])
  }

  onDashboardActWiseClick(){
    this.router.navigate(['/dashboard/servicewise'])
  }
  onEPFOInboxClick(){
    this.router.navigate(['/department-level-forms/epfoDetails'])
  }

  onEPFOSentClick(){
    this.router.navigate(['/department-level-forms/epfoReport'])
  }
  onEsamikshaClick(){
    this.router.navigate(['/dashboard/esamiksha_data'])
  }
  onPendencyCountClick(){
    this.router.navigate(['/dashboard/pendencycount'])
  }

  onreactivateCountClick(){
    this.router.navigate(['/dashboard/reactivate-application'])
  }
  onStatusManagerClick(){
   this.router.navigate(['/Admin/status-manager'])
  }

  onDeemedReportClick(){
    this.router.navigate(['/dashboard/deemed-report'])
  }
   onEmpanelledPersonDetailsClick(){
    this.router.navigate(['/Admin/add-empanelled-person'])
  }

  onRandomizationInitializationClick(){
    this.router.navigate(['/inspection/randomization-initialization'])
  }

   onAddWhatsNewClick(){
    this.router.navigate(['/Admin/add-whats-new'])
  }

   onStepBackRTBClick(){
    this.router.navigate(['/Admin/step-back-rtb-fee'])
  }

  onPWBContributionClick(){
    this.router.navigate(['/dashboard/pwb-contribution'])
  }

  establishmentWisePaymentDetailClick(){
    this.router.navigate(['/payments/establishment-wise-payment-details'])
  }
  //  onMprLabourClick(){
  //   this.router.navigate(['/dashboard/mpr-lbr']) 
  // }
  // onMprALCClick(){
  //   this.router.navigate(['/dashboard/mpr-alc']) 
  // }
  

  toggleCollapse(applicationType: number): void {
    if(this.selApplicationType == applicationType && this.isMenuItemExpanded==true){
      this.isMenuItemExpanded = false;
    }
    else{
      this.selApplicationType = applicationType
      this.isMenuItemExpanded = true;
    }
    this.isMenuItemDashboardExpanded = this.isMenuItemEPFOExpanded= false;
  }

  toggleDashboardMenuCollapse(): void {
    this.isMenuItemDashboardExpanded = !this.isMenuItemDashboardExpanded;
    this.isMenuItemExpanded = this.isMenuItemEPFOExpanded= false;
  }
  toggleEPFOMenuCollapse(): void {
    this.isMenuItemEPFOExpanded = !this.isMenuItemEPFOExpanded;
    this.isMenuItemDashboardExpanded = this.isMenuItemExpanded= false;



  }
  
  // isExpanded(applicationType: number): boolean {
  //   return this.selApplicationType == applicationType;
  // }


  // Add this method in your component class
getStatusClass(status: string): string {
  switch (status) {
      case 'Inbox':
          return 'status-inbox';
      case 'In-Process':
          return 'status-in-process';
      case 'Approved':
          return 'status-approved';
      case 'Rejected':
          return 'status-rejected';
      case 'Deemed':
          return 'status-deemed';
      default:
          return '';
  }
}

  onFileApplicationClick(){
    this.router.navigate(['/dashboard/file-application'])
  }

  
  onTrackApplicationClick(){
    this.router.navigate(['/dashboard/track-application'])
  }

  onDraftApplicationClick(){
    this.router.navigate(['/dashboard/draft-application'])
  }

  onHelpClick(){
    this.router.navigate(['/dashboard/help'])
  }

  onDashboardClick(){
    this.router.navigate(['/dashboard/applicantdashboard'])
  }
}