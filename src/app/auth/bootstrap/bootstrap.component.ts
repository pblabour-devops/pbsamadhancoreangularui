import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonService } from 'src/app/common/common.service';
import { GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { AuthService } from '../auth.service';
import { data, post } from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonOpsService } from 'src/app/shared/common-ops-service';

@Component({
    selector: 'app-bootstrap',
    templateUrl: './bootstrap.component.html',
    styleUrls: ['./bootstrap.component.css'],
    standalone: false
})
export class BootstrapComponent implements OnInit, AfterViewInit {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  canProceedFlag = 0;
  errCode = 0;
  public parmamEncodedinfo: string;
  public paramInfo: any;
  constructor(
    private common: CommonService,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    public commonOpsService: CommonOpsService
  ) { }

  ngOnInit(): void { }

  async ngAfterViewInit(): Promise<void> {
    this.route.queryParams.subscribe(params => {
      if(params['cc5fbfac557c46d9b3b2288465dd2f0e']){
        //this.checkLocationAndIp((data: any)=>{
          this.initiateHomePage();
        //})
      }
      else{
        this.parmamEncodedinfo = params.info;
        this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, async (info) => {
          this.paramInfo = info;
          //this.checkLocationAndIp((data: any)=>{
            this.router.navigate([this.getRouteValue(this.paramInfo.serviceCode,this.paramInfo.categoryTypeId, this.paramInfo.appActionType, this.paramInfo.nativeAppId, this.paramInfo.applicationPurposeType ,this.paramInfo.toDoActivityModeType)],{ queryParams:{info: this.parmamEncodedinfo}});
          //})
        });
      }
    });
  }
  
  initiateHomePage(){
    if(this.authService.getUserJwtDecodedInfo().RoleCode == 'DLHF'
              || this.authService.getUserJwtDecodedInfo().RoleCode == 'DDRF'
              || this.authService.getUserJwtDecodedInfo().RoleCode == 'ADRF'
              || this.authService.getUserJwtDecodedInfo().RoleCode == 'ALLC'
              || this.authService.getUserJwtDecodedInfo().RoleCode == 'LBIN'
              || this.authService.getUserJwtDecodedInfo().RoleCode == 'DLHL'
              || this.authService.getUserJwtDecodedInfo().RoleCode == 'ALLC'
              || this.authService.getUserJwtDecodedInfo().RoleCode == 'DLBP'
              || this.authService.getUserJwtDecodedInfo().RoleCode == 'JDRF'
              || this.authService.getUserJwtDecodedInfo().RoleCode == 'ADDF'
              || this.authService.getUserJwtDecodedInfo().RoleCode == 'LBCR'
              || this.authService.getUserJwtDecodedInfo().RoleCode == 'DTP'
              || this.authService.getUserJwtDecodedInfo().RoleCode == 'ATP'
              || this.authService.getUserJwtDecodedInfo().RoleCode == 'JDM'
              || this.authService.getUserJwtDecodedInfo().RoleCode == 'SDO'
              || this.authService.getUserJwtDecodedInfo().RoleCode == 'EO'
              || this.authService.getUserJwtDecodedInfo().RoleCode == 'CGM'
              || this.authService.getUserJwtDecodedInfo().RoleCode == 'ATP_PSIEC'
              || this.authService.getUserJwtDecodedInfo().RoleCode == 'DRFT'
              || this.authService.getUserJwtDecodedInfo().RoleCode == 'JDRF_PSIEC'
              || this.authService.getUserJwtDecodedInfo().RoleCode == 'DL_PSIEC'
              || this.authService.getUserJwtDecodedInfo().RoleCode == 'DLTU'
              || this.authService.getUserJwtDecodedInfo().RoleCode == 'SOTU'
              || this.authService.getUserJwtDecodedInfo().RoleCode == 'SPTU'
              || this.authService.getUserJwtDecodedInfo().RoleCode == 'ADLC'
              || this.authService.getUserJwtDecodedInfo().RoleCode == 'DHLP'
              || this.authService.getUserJwtDecodedInfo().RoleCode == 'DHF_BP_HQ'
              || this.authService.getUserJwtDecodedInfo().RoleCode == 'HELPDESK'
              || this.authService.getUserJwtDecodedInfo().RoleCode == 'WBAO'
              || this.authService.getUserJwtDecodedInfo().RoleCode == 'WBDC'
              || this.authService.getUserJwtDecodedInfo().RoleCode == 'ACFA'
              || this.authService.getUserJwtDecodedInfo().RoleCode == 'LBCR' 
              || this.authService.getUserJwtDecodedInfo().RoleCode == 'WBCH'){
      this.router.navigate(['/dashboard/officials']);
    }
    else if(this.authService.getUserJwtDecodedInfo().RoleCode == 'PSLD' || this.authService.getUserJwtDecodedInfo().RoleCode=='CEOIP'|| this.authService.getUserJwtDecodedInfo().RoleCode == 'SOMPR'
    || this.authService.getUserJwtDecodedInfo().RoleCode == 'DLFI1'
    || this.authService.getUserJwtDecodedInfo().RoleCode == 'DLFI2'
    || this.authService.getUserJwtDecodedInfo().RoleCode == 'DLFI3'
    || this.authService.getUserJwtDecodedInfo().RoleCode == 'DLFI4'
    || this.authService.getUserJwtDecodedInfo().RoleCode == 'PMGR'){
      this.router.navigate(['/dashboard/servicewise']); 
    }
    else if(this.authService.getUserJwtDecodedInfo().RoleCode=='DLHA'){ // Dealing-hand Account
      this.router.navigate(['/dashboard/appfeedetails']);
    }
    else if(this.authService.getUserJwtDecodedInfo().RoleCode == 'SUPTGEN' ){
      this.router.navigate(['/department-level-forms/epfoDetails']); 
    }
    else if(this.authService.getUserJwtDecodedInfo().RoleCode == 'LBMR' ){
      this.router.navigate(['/dashboard/lbrMinister']); 
    }
    else if(this.authService.getUserJwtDecodedInfo().RoleCode == 'INDL' ){
      this.router.navigate(['/project/sites']);
    }
    else if(this.authService.getUserJwtDecodedInfo().RoleCode == 'MPRC' ){
      this.router.navigate(['/dashboard/mpr_factories']);
    }
  }



  
  getRouteValue(serviceCode, categoryTypeId, appActionType, nativeAppRefId, applicationPurposeType,toDoActivityModeType) {
    console.log(serviceCode, 'serviceCode>>>')
    if (serviceCode == 5) {
      if (categoryTypeId == 1) { // FT
        return '/building-plan-hud/questionnaire';
      }
      else if (categoryTypeId == 3 || categoryTypeId == 4) { // OR / ED
        return '/building-plan-hud/addupdategeneraldetail';
      }
      else if (categoryTypeId == 5) { // VW
        return '/building-plan-hud/detail';
      }
      else if (categoryTypeId == 2) {

        if (appActionType == 401 || appActionType == 215) { // raised payment 
          return '/payments/buildingplanhud_makeraisedfee';
        }
        else if (appActionType == 2) { //processing fee
          return '/payments/appfeecalculator';
        }
      }
    }
    else if (serviceCode == 6) {
      if (categoryTypeId == 1 || categoryTypeId == 3 || categoryTypeId == 4) { // FT
        return '/licence/shop';
      }
      else if (categoryTypeId == 5) {
        return '/licence/shopdetail';
      }
    }
    else if (serviceCode == 15) {
      return '/licence/shop';
    }

    else if (serviceCode == 35) { // BOCW
      if ((categoryTypeId  == 1)) { // FT && REG || ED && REG
        return '/licence/bocw-act';
      }
      else if (categoryTypeId == 3 || categoryTypeId == 4) { // OR || ED || REN || AMD
        return '/licence/bocw-act';
      }
      else if (categoryTypeId == 5) {
        return '/licence/bocwactdetail';
      }
      else if (categoryTypeId == 2) { // DP
        return '/payments/appfeecalculator';
      }
    }
    else if (serviceCode == 70) { // Factory Licence
      // if((categoryTypeId==1 && applicationPurposeType==1) || (categoryTypeId == 4 && applicationPurposeType==1)){ // FT && REG || ED && REG
      if (categoryTypeId == 2) { // DP
        return '/payments/appfeecalculator';
      }
      else if ((categoryTypeId == 1 && applicationPurposeType == 1)) { // FT && REG || ED && REG
        return '/licence/addupdatefactorygeneraldetail';
      }
      else if ((categoryTypeId == 3 || categoryTypeId == 4 || applicationPurposeType == 2 || applicationPurposeType == 3)  && toDoActivityModeType != 7) { // OR || ED || REN || AMD
        return '/licence/addupdatefactorygeneraldetail';
      }
      else if (categoryTypeId == 5) {
        return '/licence/factorylicencedetail';
      }

      else if (categoryTypeId == 2) { // DP
        return '/payments/appfeecalculator';
      }
       else if (categoryTypeId == 3 && toDoActivityModeType == 7) { // OB With Balance Fee
        return '/payments/appfeecalculator';
      }
    }
    else if (serviceCode == 61) { // WOMEN_NIGHT_SHIFT_SHOP 
      if (categoryTypeId == 1 || categoryTypeId == 3 || categoryTypeId == 4) { // FT
        return '/licence/WomenInNightShift';
      }
      else if (categoryTypeId == 5) {
        return '/licence/WomenInNightShiftFormDetail';
      }
    }
    else if (serviceCode == 76) { // BP_DECLARATION_STABILITY_CERTIFICATE 
      if (categoryTypeId == 1 || categoryTypeId == 3 || categoryTypeId == 4) { // FT
        return '/licence/declarationstabilitycertificate';
      }
      else if (categoryTypeId == 5) {
        return '/licence/declarationstabilitycertificateFormDetail';
      }
    }
    else if (serviceCode == 62) { // WOMEN_NIGHT_SHIFT_FACTORY
      if (categoryTypeId == 1 || categoryTypeId == 3 || categoryTypeId == 4) { // FT
        return '/licence/factoryWomenInNightShift';
      }
      else if (categoryTypeId == 5) {
        return '/licence/factoryWomenInNightShiftFormDetail';
      }
    }

    else if (serviceCode == 71) {
      if ((categoryTypeId == 1 && applicationPurposeType == 1)) { // FT && REG || ED && REG
        return '/licence/addupdateproposedbuildingplangeneraldetail';
      }
      else if (categoryTypeId == 3 || categoryTypeId == 4 || applicationPurposeType == 2 || applicationPurposeType == 3) { // OR || ED || REN || AMD
        return '/licence/addupdateproposedbuildingplangeneraldetail';
      }
      else if (categoryTypeId == 5) {
        return '/licence/proposedbuildingplandetail';
      }

      else if (categoryTypeId == 2) { // DP
        return '/payments/app-make-raised-fee';
      }
    }
    else if (serviceCode == 72) { // Existing Building Plan
      if ((categoryTypeId == 1 && applicationPurposeType == 1)) { // FT && REG || ED && REG
        return '/licence/addupdateexistingbuildingplangeneraldetail';
      }
      else if (categoryTypeId == 3 || categoryTypeId == 4 || applicationPurposeType == 2 || applicationPurposeType == 3) { // OR || ED || REN || AMD
        return '/licence/addupdateexistingbuildingplangeneraldetail';
      }
      else if (categoryTypeId == 5) {
        return '/licence/existingbuildingplandetail';
      }

      else if (categoryTypeId == 2) { // DP
        return '/payments/app-make-raised-fee';
      }
    }
    else if (serviceCode == 73) { // Addition/Amendment Building Plan
      if ((categoryTypeId == 1 && applicationPurposeType == 1)) { // FT && REG || ED && REG
        return '/licence/addupdateadditionamendmentgeneraldetail';
      }
      else if (categoryTypeId == 3 || categoryTypeId == 4 || applicationPurposeType == 2 || applicationPurposeType == 3) { // OR || ED || REN || AMD
        return '/licence/addupdateadditionamendmentgeneraldetail';
      }
      else if (categoryTypeId == 5) {
        return '/licence/additionamendmentbuildingplandetail';
      }

      else if (categoryTypeId == 2) { // DP
        return '/payments/app-make-raised-fee';
      }
    }
    else if (serviceCode == 39) { // ISM Principal Employer
      if ((categoryTypeId  == 1)) { // FT && REG || ED && REG
        return '/licence/ismprincipalemployergeneraldetail';
      }
      else if ((categoryTypeId == 3 || categoryTypeId == 4)  && toDoActivityModeType != 7) { // OR || ED || REN || AMD
        return '/licence/ismprincipalemployergeneraldetail';
      }
      else if (categoryTypeId == 5) {
        return '/licence/ismdetail';
      }
      else if (categoryTypeId == 2) { // DP
        return '/payments/appfeecalculator';
      }
       else if (categoryTypeId == 3 && toDoActivityModeType == 7) { // OB With Balance Fee
        return '/payments/appfeecalculator';
      }
    }
    else if (serviceCode == 37) { // Principal Employer
      if ((categoryTypeId  == 1)) { // FT && REG || ED && REG
        return '/licence/contractLabourPrincipalEmployer';
      }
      else if ((categoryTypeId == 3 || categoryTypeId == 4)  && toDoActivityModeType != 7) { // OR || ED || REN || AMD
        return '/licence/contractLabourPrincipalEmployer';
      }
      else if (categoryTypeId == 5) {
        return '/licence/contractlabourPEDetail';
      }
      else if (categoryTypeId == 2) { // DP
        return '/payments/appfeecalculator';
      }
      else if (categoryTypeId == 3 && toDoActivityModeType == 7) { // OB With Balance Fee
        return '/payments/appfeecalculator';
      }
    }
    else if (serviceCode == 38) { // Contract Labour
      if ((categoryTypeId  == 1)) { // FT && REG || ED && REG
        return '/licence/contractlabourgeneraldetail';
      }
      else if ((categoryTypeId == 3 || categoryTypeId == 4) && toDoActivityModeType != 7) { // OR || ED || REN || AMD
        return '/licence/contractlabourgeneraldetail';
      }
      else if (categoryTypeId == 5) {
        return '/licence/contractlabourDetail';
      }
      else if (categoryTypeId == 2) { // DP
        return '/payments/appfeecalculator';
      }
      else if (categoryTypeId == 3 && toDoActivityModeType == 7) { // OB With Balance Fee
        return '/payments/appfeecalculator';
      }
    }
    else if (serviceCode == 81) {
      if (categoryTypeId == 1) { // FT
        return '/licence/psiecquestionnaire';
      }
      else if (categoryTypeId == 3 || categoryTypeId == 4) { // OR / ED
        return '/licence/addupdatepsiecgeneraldetail';
      }
      else if (categoryTypeId == 5) { // VW
        return '/licence/psiecbuildingplandetail';
      }
      else if (categoryTypeId == 2) {
        return '/payments/app-make-raised-fee';
      }
    }
    else if (serviceCode == 40) { // ISM Contract Labour
      if ((categoryTypeId  == 1)) { // FT && REG || ED && REG
        return '/licence/ismcontractlabourgeneraldetail';
      }
      else if ((categoryTypeId == 3 || categoryTypeId == 4)  && toDoActivityModeType != 7) { // OR || ED || REN || AMD
        return '/licence/ismcontractlabourgeneraldetail';
      }
      else if (categoryTypeId == 5) {
        return '/licence/ismcontractlabourDetail';
      }
      else if (categoryTypeId == 2) { // DP
        return '/payments/appfeecalculator';
      }
       else if (categoryTypeId == 3 && toDoActivityModeType == 7) { // OB With Balance Fee
        return '/payments/appfeecalculator';
      }
    }
    else if (serviceCode == 74) {
      if (categoryTypeId == 1) { // FT
        return '/licence/building-plan-type-selection';
      }
    }
    else if (serviceCode == 101) {
      if (categoryTypeId == 1) { // FT
        return '/oshForm/form-1-registration';
      }
      else if (categoryTypeId == 3 || categoryTypeId == 4) { // OR / ED
        return '/oshForm/form-1-registration';
      }
      else if (categoryTypeId == 5) { // VW
        return '/licence/psiecbuildingplandetail';
      }
      else if (categoryTypeId == 2) {
        return '/payments/app-make-raised-fee';
      }
    }
    else if (serviceCode == 1001) {
        return '/project/sites';
      
    }
    return '';
  }

  pageReloadClick(){
    window.location.reload();
  }

  // async checkLocationAndIp(callback: any){
  //   try {
  //     const ip = await new Promise((resolve) => {
  //       this.common.getIpCliente().subscribe((y: any) => resolve(y.ip));
  //     });

  //     const location = await this.common.getCurrentLocation().then((x: any)=>{
  //       const params = {
  //         userId: this.authService.getUserJwtDecodedInfo().UserId,
  //         username: this.authService.getUserJwtDecodedInfo().UserName,
  //         profileId: this.authService.getUserJwtDecodedInfo().UserProfileId,
  //         profileName: this.authService.getUserJwtDecodedInfo().FullName,
  //         loginTime: '9999-12-31',
  //         loginStatus: true,
  //         ipAddress: ip,
  //         method: "Post",
  //         Route: "CommonApis/createActivityLogs",
  //         requestBody: "NA",
  //         createdOn: new Date(),
  //         latitude: x.latitude,
  //         longitude: x.longitude
  //       };
  //       this.appHttpRequestHandlerService.httpGet(params, "CommonApis", "createActivityLogs").pipe(takeUntil(this.ngUnsubscribe))
  //       .subscribe((data: GenericServiceResultTemplate) => {
  //         this.canProceedFlag=1;
  //         callback();
  //       })
  //     }).catch((ex: any) => {
  //       this.canProceedFlag=2;
  //       this.errCode = ex.code;
  //     });

  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // }


}
