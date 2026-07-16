import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { ApplicationActionViewModel, IServiceGatewayResponseViewModel } from '../../third-party-integration-typed.models';
import { AuthService } from 'src/app/auth/auth.service';
import { CommonService } from 'src/app/common/common.service';
import { environment } from 'src/environments/environment';
import { GenericResponseTemplateModel } from 'src/app/generic-implementation/generic-service-result-template';
import Swal from 'sweetalert2';
import { GlobalStateManagerService } from 'src/app/shared/global-state-manager-service';
@Component({
    selector: 'app-service-gateway',
    templateUrl: './service-gateway.component.html',
    styleUrls: ['./service-gateway.component.css'],
    standalone: false
})
export class ServiceGatewayComponent implements OnInit {
  hasEmptyRequestStr:boolean=false;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  defaultReturnPath: string = environment.thirdPartyIntegrationConfigs.investPunjab.defaultReturnPath;
  investPunjabReturnPath : string = environment.thirdPartyIntegrationConfigs.investPunjab.investPunjabReturnPath;
  serviceGatewayResponse: IServiceGatewayResponseViewModel;
  isLicenseVerified: boolean=false;
  existingLicenceNo : string ="";
  routerValue: any;
  routerParms: any;
  encodedQueryParms: any;
  isStatusDiffreceShow: boolean=false;
  actionPublicName: string='';
  appActionType=0;
  actionRemarks: string ='';

  constructor(private route: ActivatedRoute,
              private appHttpRequestHandlerService: AppHttpRequestHandlerService,
              public commonOpsService: CommonOpsService,
              private authService: AuthService,
              private router: Router,
              private common:CommonService,
              private globalStateManagerService: GlobalStateManagerService) { 
      this.route.queryParams
      .subscribe(params => {
          if(params.msg && params.msg.length>0){
            this.appHttpRequestHandlerService.httpGet( { msg: params.msg }, "ThirdPartyIntegrations", "ServiceGateway").pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((data: IServiceGatewayResponseViewModel) => { 
              this.serviceGatewayResponse=data;
              if(data.hasLessParameters){
                var encodedQueryParms= this.commonOpsService.encodeQueryParamsInBase64({errorCode: 402, message:'Invalid request parameters', returnUrl:this.defaultReturnPath});
                this.router.navigate(['/service-gateway-error'],{ queryParams:{info: encodedQueryParms}});
              }
              else if(data.hasException){
                var encodedQueryParms= this.commonOpsService.encodeQueryParamsInBase64({errorCode: 502, message: data.exceptionMessage, returnUrl:this.defaultReturnPath});
                this.router.navigate(['/service-gateway-error'],{ queryParams:{info: encodedQueryParms}});
              }
              else{
                if(data.isRequestToLegacyApp){
                  window.location.href = data.legacyAppUrl+params.msg;
                }
                else if(data.canApply){
                  if(data.isOtpVerificationRequired){
                    
                  }
                  else{
                    this.setTokenAndSendUserToHomePage(data); 
                  }
                }
                else if(!data.canApply && data.hasOpenedTickets){
                  
                }
                else if (data.requestDeniedReason && data.requestDeniedReason.includes('This service has already been applied/approved')) {
                  Swal.fire({
                      title: 'Sorry, you are not allowed to proceed further..!',
                      text: 'Reason: ' + data.requestDeniedReason,
                      icon: 'warning',
                      confirmButtonColor: '#229954',
                      confirmButtonText: 'Sync Status'
                  }).then((result) => {
                      if (result.isConfirmed) {
                          //this.updateStatus(appId, applicationType, appActionType);
                          this.updateStatus(data.nativeAppId, data.serviceCode, 1);
                          document.location.href = this.investPunjabReturnPath;
                      }
                  });
                }
                else{
                  Swal.fire({
                    title: 'Sorry, you are not allowed to proceed further..!',
                    text: 'Reason: ' +  data.requestDeniedReason,
                    icon: 'warning',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Back to home page!'
                  }).then((result) => {
                    document.location.href = this.investPunjabReturnPath;
                  })
                }
              }
            });
          }
          else{
            this.hasEmptyRequestStr=true;
          }
      });
  }

  ngOnInit(): void {}

  setTokenAndSendUserToHomePage(data: IServiceGatewayResponseViewModel){
    //localStorage.setItem("BearerToken",data.symmetricKey);
    this.globalStateManagerService.setTokenJwtValue(data.symmetricKey);
    this.globalStateManagerService.setTokenEncryptedKeyValue(data.encryptionKey)
    this.globalStateManagerService.setTokenIVKeyValue(data.ivKey)

    this.initiateHomePage(data);
  }

  initiateHomePage(data: IServiceGatewayResponseViewModel){
    debugger;
    let serviceCode: number = 0;
    let categoryTypeId: number = data.categoryTypeId;
    let applicationPurposeType: number = 0;
    if(data.serviceCode==63){ // Buildig Plan HUD
      serviceCode= 5;
      applicationPurposeType=1;
    }
    else if(data.serviceCode ==5){ // Shop Fresh 
      serviceCode= 6;
      applicationPurposeType=1;
    }
    else if(data.serviceCode ==15){ // Shop Amendment 
      serviceCode= 6;
      applicationPurposeType=3;
    }
    else if(data.serviceCode ==35){ // BOCW Fresh 
      serviceCode= 35;
      applicationPurposeType=1;
    }
    else if(data.serviceCode == 6){ // Factory Fresh 
      serviceCode= 70;
      applicationPurposeType=1;
    }
    else if(data.serviceCode == 7){ // Factory Renewal
      serviceCode= 70;
      applicationPurposeType=2;
    }
    else if(data.serviceCode == 8){ // Factory Amendment
      serviceCode= 70;
      applicationPurposeType=3;
    }
    else if(data.serviceCode ==61){ // WOMEN_NIGHT_SHIFT_SHOP 
      serviceCode= 61;
      applicationPurposeType=1;
    }
    else if(data.serviceCode ==76){ // BP_DECLARATION_STABILITY_CERTIFICATE 
      serviceCode= 76;
      applicationPurposeType=1;
    }
    else if(data.serviceCode ==62){ // WOMEN_NIGHT_SHIFT_FACTORY
      serviceCode= 62;
      applicationPurposeType=1;
    }

    else if(data.serviceCode ==71){ // Praposed Building Plan 
      serviceCode= 71;
      applicationPurposeType=1;
    }
    else if(data.serviceCode ==72){ // Existing Building Plan 
      serviceCode= 72;
      applicationPurposeType=1;
    }
    else if(data.serviceCode ==73){ // Addition/Amendment Building Plan 
      serviceCode= 73;
      applicationPurposeType=1;
    }
    else if(data.serviceCode ==17){ // ISM PE Rigistration
      serviceCode= 39;
      applicationPurposeType=1;
    }
    else if(data.serviceCode ==18){ // ISM PE Amendment
      serviceCode= 39;
      applicationPurposeType=3;
    }
    else if(data.serviceCode ==3){ // Principal Employer Fresh 
      serviceCode= 37;
      applicationPurposeType=1;
    }
    else if(data.serviceCode ==11){ // Principal Employer Amendment 
      serviceCode= 37;
      applicationPurposeType=3;
    }
    else if(data.serviceCode ==4){ // Contract Labour  Fresh
      serviceCode= 38;
      applicationPurposeType=1;
    }
    else if(data.serviceCode ==12){ // Contract Renewel 
      serviceCode= 38;
      applicationPurposeType=2;
    }
    else if(data.serviceCode ==13){ // Contract Amendment 
      serviceCode= 38;
      applicationPurposeType=3;
    }
    else if(data.serviceCode ==36){ // BOCW Amendment 
      serviceCode= 35;
      applicationPurposeType=3;
    }
    else if(data.serviceCode==81){ // Buildig Plan HUD
      serviceCode= 81;
      applicationPurposeType=1;
    }
     else if(data.serviceCode ==19){ //ISM Contract Labour  Fresh
      serviceCode= 40;
      applicationPurposeType=1;
    }
    else if(data.serviceCode ==20){ //ISM Contract Renewel 
      serviceCode= 40;
      applicationPurposeType=2;
    }
    else if(data.serviceCode ==21){ //ISM Contract Amendment 
      serviceCode= 40;
      applicationPurposeType=3;
    }
    else if(data.serviceCode==74){ // Buildig Plan Factory
      serviceCode= 74;
      applicationPurposeType=1;
    }
    else if(data.serviceCode==81){ // PSIEC
      serviceCode= 81;
      applicationPurposeType=1;
    }
    if(data.serviceCode==101){ // OSH-Form-1-Registration
      serviceCode= 101;
      applicationPurposeType=1;
    }
    else if(data.serviceCode==1001){ // Labour Services
      serviceCode= 1001;
    }

    if(this.authService.getUserJwtDecodedInfo().RoleCode=='INDL'){
      if(data.serviceCode==1001){ 
        this.encodedQueryParms= this.commonOpsService.encodeQueryParamsInBase64(
              {
                loginType: 'IP',
                iPin : data.iPin,
              });// Labour Services
        this.router.navigate(['/project/sites'],{ queryParams:{info: this.encodedQueryParms}});
      }
      else{
        this.appHttpRequestHandlerService.httpGet({ appRefId: data.nativeAppId, applicationType :  serviceCode}, "CommonApis", "getApplicationStatusByAppRefId").pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data1: GenericResponseTemplateModel<ApplicationActionViewModel>) => {
          if(!data1.hasError){
            this.encodedQueryParms= this.commonOpsService.encodeQueryParamsInBase64(
              {
                identityKey: 0, 
                appRefId: (data.nativeAppId == null || data.nativeAppId==undefined) ? 0 : data.nativeAppId, 
                applicationType: serviceCode, 
                projectSiteRefId: data.projectSiteRefId, 
                establishmentRefId: 0, 
                applicationPurposeType: applicationPurposeType,
                iPin : data.iPin,
                investPunjab_AppId : data.investPunjab_AppId,
                isStepperHidden: data.categoryTypeId==5 ? true : false,
                appActionType: data1.responseDataModel!=null ? data1?.responseDataModel?.appActionType : 0,
                isEntityKeysToKeepSame: data.isEntityKeysToKeepSame,
                licenceNo: data.licenceNo,
                serviceCode: serviceCode,
                categoryTypeId: categoryTypeId,
                nativeAppId: data.nativeAppId,

                toDoActivityModeType : data.toDoActivityModeType,
                rootActivityRefId : data.rootActivityRefId,
                toDoActivityCategoryType : data.toDoActivityCategoryType,
                projectSiteVersion: data.projectSiteVersion
              });
      
            if(data1.responseDataModel!=null){
              this.appActionType = data1?.responseDataModel?.appActionType;
            }

            if(categoryTypeId==2 || categoryTypeId==3 || categoryTypeId==4){ // DP / OR / ED
              if(!this.isSameStatusOfRequest(categoryTypeId, this.appActionType)){
                this.isStatusDiffreceShow=true;
                this.routerValue = this.getRouteValue(serviceCode,this.getMappingOfCategoryWithActionCodeType(this.appActionType), this.appActionType, data.nativeAppId, applicationPurposeType,data.toDoActivityModeType);
                this.actionPublicName = data1.responseDataModel.actionPublicName;

                this.actionRemarks = data1.responseDataModel.remarks;
              }
              else{
                 console.log(1,'1');
                //this.router.navigate([this.getRouteValue(serviceCode,categoryTypeId,this.appActionType, data.nativeAppId, applicationPurposeType)],{ queryParams:{info: encodedQueryParms}});
                this.router.navigate([this.getRouteValue(serviceCode,categoryTypeId,this.appActionType, data.nativeAppId, applicationPurposeType,data.toDoActivityModeType)],{ queryParams:{info: this.encodedQueryParms}});
              }
            }
            else{
              //this.router.navigate([this.getRouteValue(serviceCode,categoryTypeId, this.appActionType, data.nativeAppId, applicationPurposeType)],{ queryParams:{info: encodedQueryParms}});
              console.log(2,'2');
              this.router.navigate([this.getRouteValue(serviceCode,categoryTypeId, this.appActionType, data.nativeAppId, applicationPurposeType,data.toDoActivityModeType)],{ queryParams:{info: this.encodedQueryParms}});
            }
          }
        });
      }
      }  
  }

  navigateToFoundRoute(){
    this.router.navigate([this.routerValue],{ queryParams:{info: this.encodedQueryParms}});
  }
  getMappingOfCategoryWithActionCodeType(appActionType){
    if(appActionType==404){
      return 3;
    }
    else if(appActionType==401){
      return 2;
    }
    return appActionType;
  }

  getRouteValue(serviceCode, categoryTypeId, appActionType, nativeAppRefId, applicationPurposeType,toDoActivityModeType){
    return 'e09e3443-c982-4095-bc0f-5f484b96c8fa-aea4de0b-7bc1-4009-a62d-669d8bd5a973';
    if(serviceCode == 5){ 
      if(categoryTypeId==1){ // FT
          return '/building-plan-hud/questionnaire';
      }
      else if(categoryTypeId==3 || categoryTypeId==4){ // OR / ED
          return '/building-plan-hud/addupdategeneraldetail';
      }
      else if(categoryTypeId==5){ // VW
          return '/building-plan-hud/detail';
      }
      else if(categoryTypeId==2){
        
        if(appActionType == 401){ // raised payment 
          return '/payments/buildingplanhud_makeraisedfee';
        
        }
        else if(appActionType == 2){ //processing fee
          return '/payments/pending-transactions';
        }
      }
    }
    else if(serviceCode == 6){
      if(categoryTypeId==1 || categoryTypeId==3 || categoryTypeId==4){ // FT
        return '/licence/shop';
      }
      else if(categoryTypeId == 5){
        return '/licence/shopdetail';
      }
    }
    else if(serviceCode== 15){
      return '/licence/shop';
    }
    else if(serviceCode== 35){
      return '/licence/bocw-act';
    }
    else if(serviceCode == 71 || serviceCode == 72 || serviceCode == 73 || serviceCode == 74 || serviceCode == 75){
      if(categoryTypeId==1){ // FT
        return '/licence/questionnaire';
      }
      else if(categoryTypeId==3 || categoryTypeId==4){ // FT
        return '/licence/addupdatebuildingplangeneraldetail';
      }
      else if(categoryTypeId == 5){
        return '/licence/buildingplanfactorydetail';
      }
    }
    else if(serviceCode == 70){ // Factory Licence
      // if((categoryTypeId==1 && applicationPurposeType==1) || (categoryTypeId == 4 && applicationPurposeType==1)){ // FT && REG || ED && REG
      if((categoryTypeId==1 && applicationPurposeType==1)){ // FT && REG || ED && REG
        return '/licence/addupdatefactorygeneraldetail';
      }
      else if(categoryTypeId == 3 || categoryTypeId == 4 || applicationPurposeType==2 || applicationPurposeType==3 ){ // OR || ED || REN || AMD
        return '/licence/addupdatefactorygeneraldetail';
      }
      else if(categoryTypeId == 5){
        return '/licence/factorylicencedetail';
      }

      else if(categoryTypeId==2){ // DP
        return '/payments/pending-transactions';
      }
    }
    else if(serviceCode == 61){ // WOMEN_NIGHT_SHIFT_SHOP 
      if(categoryTypeId==1 || categoryTypeId==3 || categoryTypeId==4){ // FT
        return '/licence/WomenInNightShift';
      }
      else if(categoryTypeId == 5){
        return '/licence/WomenInNightShiftFormDetail';
      }
    }
    else if(serviceCode == 76){ // BP_DECLARATION_STABILITY_CERTIFICATE 
      if(categoryTypeId==1 || categoryTypeId==3 || categoryTypeId==4){ // FT
        return '/licence/declarationstabilitycertificate';
      }
      else if(categoryTypeId == 5){
        return '/licence/declarationstabilitycertificateFormDetail';
      }
    }
    else if(serviceCode == 62){ // WOMEN_NIGHT_SHIFT_FACTORY
      if(categoryTypeId==1 || categoryTypeId==3 || categoryTypeId==4){ // FT
        return '/licence/factoryWomenInNightShift';
      }
      else if(categoryTypeId == 5){
        return '/licence/factoryWomenInNightShiftFormDetail';
      }
      else if(serviceCode == 1001){ 
        return '/project/sites';
    }
    }
    return '';
  }

  isSameStatusOfRequest(categoryTypeId, appActionType): boolean{
    if(categoryTypeId==2 && (appActionType==2 || appActionType==401)){
      return true;
    }
    else if(categoryTypeId==3 && appActionType==404){
      return true;
    }
    else if(categoryTypeId==4 && appActionType==1){
      return true;
    }
    else if(categoryTypeId==3 && appActionType==402){
      return true;
    }
    return false;
  }

  moveToHomepage(){
    document.location.href = this.investPunjabReturnPath;
  }
  
  verifyLicenseNo(){
    this.appHttpRequestHandlerService.httpGet({ licenceSnapshot: btoa(this.existingLicenceNo) }, "ThirdPartyIntegrations", "verifyOldLicence").pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: IServiceGatewayResponseViewModel) => { 
   
    this.isLicenseVerified=true;
    });
  }
  
  verifyOtp(){
    this.setTokenAndSendUserToHomePage(this.serviceGatewayResponse);
  }

  updateStatus(appId, applicationType, appActionType){
  this.appHttpRequestHandlerService.httpGet({appId: appId, applicationType: applicationType, appActionType: appActionType}, "Admin", "ShareStaus").pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: GenericResponseTemplateModel<string>) => {
    });
  }

}
