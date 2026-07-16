import { Component, OnInit } from '@angular/core';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { SignalrService } from 'src/app/signalr-service';
import { AuthService } from '../../auth/auth.service';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { ILoginResponseDetailViewModel, ILoginResponseViewModel, IResetPasswordResponseDetailViewModel, IResetPasswordResponseViewModel, ISetNewPasswordResponseDetailViewModel, ISetNewPasswordResponseViewModel } from '../user-manager-typed.module';
import Swal from 'sweetalert2/dist/sweetalert2.js';
// import * as forge from 'node-forge';
import { RsaPublicKeyService } from 'src/app/common/rsa-public-key-service';
import { HttpClient } from '@microsoft/signalr';
import { GenericFormModel } from 'src/app/generic-implementation/generic-form-builder.type';
import { GetRedirectUrlViewModel } from 'src/app/dashboard/dashboard-typed-models';
import { GlobalStateManagerService } from 'src/app/shared/global-state-manager-service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: false
})
export class LoginComponent implements OnInit {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  dynamicFormFields=[];
  dynamicForm: any;
  post_targatedModel: string ="pbsamadhannetcoreapi.ViewModels.DynamicFormViewModel";
  post_controller: string = "Auth";
  post_actionMethod: string = "login";
  connectionId: string;
  captchaImg: string='';
  
  hasErrorInLogin: boolean= false;
  loginErrorMsg:string = '';
  screenType: string='LOGIN';
  loginResp: ILoginResponseViewModel;
  resetPasswordResp: IResetPasswordResponseViewModel;
  pageMode: string = 'LOGIN';
  loginRespId: string="";
  constructor(private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    public commonOpsService: CommonOpsService,
    public authService: AuthService,
    public signalrService: SignalrService,
    private router: Router,
    private route: ActivatedRoute,
    private rsaPublicKeyService: RsaPublicKeyService,
    private globalStateManagerService: GlobalStateManagerService) {
    this.authService.logout(false); 

    this.route.queryParams
      .subscribe(params => {
        if(params.data){
        }
        else{
          this.initiateForm();
        }
      });
   }
 
  ngOnInit(): void {}
  ngAfterViewInit(){}
  initiateForm(){
    this.dynamicFormFields =[
        {
          key:'',
          isClientSideEncryption: false,
          keyCode:'Username',
          value: '',
          isHidden: false,
          type: 'text',
          captionText: 'User Name',
          isValid: true,
          validationErrorText: 'Please enter username..!' 
        },
        {
          key:'',
          isClientSideEncryption: true,
          keyCode:'Password',
          value: '',
          isHidden: false,
          type: 'password',
          captionText: 'Password',
          isValid: true,
          validationErrorText: 'Please enter password..!' 
        },
        {
          key:'',
          isClientSideEncryption: false,
          keyCode:'OriginalCaptcha',
          value: '',
          isHidden: false,
          type: 'hidden',
          captionText: '',
          isValid: true,
          validationErrorText: '' 
        },
        {
          key:'',
          isClientSideEncryption: false,
          keyCode:'EnteredCaptcha',
          value: '',
          isHidden: false,
          type: 'text',
          captionText: 'Captcha',
          isValid: true,
          validationErrorText: 'Please enter captcha..!' 
        },
        {
          key:'',
          isClientSideEncryption: false,
          keyCode:'EnteredOTP',
          value: '',
          isHidden: false,
          type: 'text',
          captionText: 'Enter OTP',
          isValid: true,
          validationErrorText: 'Please enter OTP..!' 
        },
        {
          key:'',
          isClientSideEncryption: true,
          keyCode:'Password_1',
          value: '',
          isHidden: false,
          type: 'password',
          captionText: 'Password',
          isValid: true,
          validationErrorText: 'Please enter password..!' 
        },
        {
          key:'',
          isClientSideEncryption: true,
          keyCode:'Password_2',
          value: '',
          isHidden: false,
          type: 'password',
          captionText: 'Confirm Password',
          isValid: true,
          validationErrorText: 'Please re-enter password..!' 
        },
        {
          key:'',
          isClientSideEncryption: false,
          keyCode:'LoginResponseId',
          value: '',
          isHidden: true,
          type: 'text',
          captionText: '',
          isValid: true,
          validationErrorText: '' 
        }


      ]
      // this.signalrService.connection
      //   .invoke('GetConnectionId').then(connectionId=>{
          
          this.dynamicForm ={formCreatedOn:'', dynamicFormFields:[], clientId_OnCreation: this.commonOpsService.generateGuid(), clientId_OnSubmission:''};
          let currDateStemp = new Date();
          this.dynamicForm.formCreatedOn= currDateStemp.getFullYear()
            +'-'+ 
          this.strPreFixPading((currDateStemp.getMonth()+1),2) 
            +'-'+ 
          this.strPreFixPading(currDateStemp.getDate(),2)
            +'-'+ 
          this.strPreFixPading(currDateStemp.getHours(),2)
            +'-'+
          this.strPreFixPading(currDateStemp.getMinutes(),2);
          this.dynamicFormFields.forEach(element => {
            element.key=this.commonOpsService.generateGuid();
            this.dynamicForm.dynamicFormFields.push(element);
          });

          this.getCaptchaCode();
        // })
        // .catch(error => {
        //   console.log(`SignalrDemoHub.FirstEndpointOfSignalRService() error: ${error}`);
        //   alert('SignalrDemoHub.FirstEndpointOfSignalRService() error!, see console for details.');
        // }
      //);
  }
  validateForm(fieldsToBeValidate: string): boolean{
    let isAllValid: boolean = true;
    this.dynamicForm.dynamicFormFields.filter(x=> fieldsToBeValidate.split(',').includes(x.keyCode)).forEach(element => {
      if(element.value.trim()==''){
        
        this.commonOpsService.updateKeyValueOfJsonObject(this.dynamicForm.dynamicFormFields, 'key', 'isValid', element.key, false);
        isAllValid = false;
      }
      else{
        this.commonOpsService.updateKeyValueOfJsonObject(this.dynamicForm.dynamicFormFields, 'key', 'isValid', element.key, true);
      }
    });
    return isAllValid;
  }

  onLoginSubmit(){
    this.hasErrorInLogin= false;
    this.loginErrorMsg='';
    if(this.validateForm('Username,Password,OriginalCaptcha,EnteredCaptcha')){
    this.appHttpRequestHandlerService
    .httpPost(this.dynamicForm, this.post_targatedModel, this.post_controller, this.post_actionMethod)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((loginResp: ILoginResponseViewModel) => {
      this.loginResp = loginResp;
       let decryptedLoginResp = this.commonOpsService.lowercaseKeysDeep(JSON.parse(this.commonOpsService.decryptUsingAES256(loginResp.encryptedResp, 
        environment.xhrEncryptionConfigs.loginResponseEncryptionKey,
        environment.xhrEncryptionConfigs.loginResponseEncryptionIVKey))) as ILoginResponseDetailViewModel;
        console.log('decryptedLoginResp', decryptedLoginResp);  
        this.loginRespId=decryptedLoginResp.responseId;
        this.commonOpsService.updateKeyValueOfJsonObject(this.dynamicForm.dynamicFormFields, 'keyCode', 'value', 'EnteredCaptcha', '');
        if(!decryptedLoginResp.hasError){
          if(decryptedLoginResp.isMobileOtpVerificationReq){
            this.commonOpsService.updateKeyValueOfJsonObject(this.dynamicForm.dynamicFormFields, 'key', 'value', 'LoginResponseId', decryptedLoginResp.responseId);
            this.switchScreen('OTP');
          }
          else{
            //localStorage.setItem("BearerToken",decryptedLoginResp.token);
            //localStorage.setItem("BearerToken",decryptedLoginResp.token);
            this.globalStateManagerService.setTokenJwtValue(decryptedLoginResp.token)
            this.globalStateManagerService.setTokenEncryptedKeyValue(decryptedLoginResp.encryptionKey)
            this.globalStateManagerService.setTokenIVKeyValue(decryptedLoginResp.iVKey)
            //this.commonOpsService.initiateHomePage(this.authService.getUserJwtDecodedInfo().RoleCode);

            var resp = this.commonOpsService.initiateHomePage(this.authService.getUserJwtDecodedInfo().RoleCode);
            if(!resp.isExternalLink){
            this.router.navigate([resp.pageLink]);
            }
            else if(resp.isExternalLink){ 
            this.appHttpRequestHandlerService.httpGet({ role: this.authService.getUserJwtDecodedInfo().RoleCode , type: resp.portalType} , "ThirdPartyIntegrations", "redirectToOtherPortel").pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((data: GenericFormModel<GetRedirectUrlViewModel>) => {
                window.location.href = data.formModel.redirectUrl;
              });
            }
          }
        }
        else{
          this.hasErrorInLogin= true;
          this.loginErrorMsg=decryptedLoginResp.errorDesc + '('+ decryptedLoginResp.errorCode +')';
          this.getCaptchaCode();
          if(decryptedLoginResp.errorCode=='ERR-Password_Expired'){
            Swal.fire({
                title: 'Password Expired..!',
                text: `Your password has expired for security reasons. Please reset your password to continue.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, want to reset my password!',
                cancelButtonText: 'No, may be later.!',
                confirmButtonColor: '#28a745'
              }).then((result) => {
                if (result.isConfirmed) {
                  this.switchScreen('FORGOT');
                  }
              });
          }
        }
      });
    }
  }

  onResetPasswordSubmit(){
    this.hasErrorInLogin= false;
    this.loginErrorMsg='';
    if(this.validateForm('Username,OriginalCaptcha,EnteredCaptcha')){
    this.appHttpRequestHandlerService
    .httpPost(this.dynamicForm, this.post_targatedModel, this.post_controller, 'resetpassword')
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((resp: IResetPasswordResponseViewModel) => {
      this.resetPasswordResp = resp;
      
       let decryptedResp = this.commonOpsService.lowercaseKeysDeep(JSON.parse(this.commonOpsService.decryptUsingAES256(resp.encryptedResp, 
        environment.xhrEncryptionConfigs.loginResponseEncryptionKey,
        environment.xhrEncryptionConfigs.loginResponseEncryptionIVKey))) as IResetPasswordResponseDetailViewModel;
        this.loginRespId=decryptedResp.responseId;
        this.commonOpsService.updateKeyValueOfJsonObject(this.dynamicForm.dynamicFormFields, 'keyCode', 'value', 'EnteredCaptcha', '');
      if(!decryptedResp.hasError){
        if(decryptedResp.isMobileOtpVerificationReq){
          this.switchScreen('OTP');
        }
      }
      else{
        this.hasErrorInLogin= true;
        this.loginErrorMsg=decryptedResp.errorDesc + '('+ decryptedResp.errorCode +')';
        this.getCaptchaCode();
      }
      });
    }
  }

  onSetNewPasswordSubmit(){
    this.hasErrorInLogin= false;
    this.loginErrorMsg='';
    let password_1 = this.dynamicFormFields.filter(x=>x.keyCode =='Password_1')[0].value;
    let password_2 = this.dynamicFormFields.filter(x=>x.keyCode =='Password_2')[0].value;
    if(password_1!=password_2){
      this.hasErrorInLogin= true;
      this.loginErrorMsg= 'Passwords are not matched..!';
    }
    else if(this.validateForm('Password_1,Password_2,OriginalCaptcha,EnteredCaptcha')){
    this.appHttpRequestHandlerService
    .httpPost(this.dynamicForm, this.post_targatedModel, this.post_controller, 'setNewPassword')
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((resp: ISetNewPasswordResponseViewModel) => {
      this.resetPasswordResp = resp;
       let decryptedResp = this.commonOpsService.lowercaseKeysDeep(JSON.parse(this.commonOpsService.decryptUsingAES256(resp.encryptedResp, 
        environment.xhrEncryptionConfigs.loginResponseEncryptionKey,
        environment.xhrEncryptionConfigs.loginResponseEncryptionIVKey))) as ISetNewPasswordResponseDetailViewModel;
      if(!decryptedResp.hasError){
        this.switchScreen('NEWPASSWORD_SUCCESS');
      }
      else{
        this.hasErrorInLogin= true;
        this.loginErrorMsg=decryptedResp.errorDesc + '('+ decryptedResp.errorCode +')';
        this.getCaptchaCode();
      }
      });
    }
  }

  getFormField(keyCode: string): any[]{
    return this.dynamicFormFields.filter(x=>x.keyCode==keyCode);        
  }
  getMatchOtpCode(){
    if(this.validateForm('EnteredOTP')){
      let encryptedData: string ='';
      if(this.pageMode =='LOGIN'){
        encryptedData = this.loginResp.encryptedResp; 
      }
      else if(this.pageMode ='FORGOT'){
        encryptedData = this.resetPasswordResp.encryptedResp; 
      }
      let decryptedLoginResp = this.commonOpsService.lowercaseKeysDeep(JSON.parse(this.commonOpsService.decryptUsingAES256(encryptedData, 
                environment.xhrEncryptionConfigs.loginResponseEncryptionKey,
                environment.xhrEncryptionConfigs.loginResponseEncryptionIVKey))) as ILoginResponseDetailViewModel;

      let enteredOTP = this.dynamicForm.dynamicFormFields.filter(x=>x.keyCode == 'EnteredOTP')[0].value;
      let userName = this.dynamicForm.dynamicFormFields.filter(x=>x.keyCode == 'Username')[0].value;
      this.appHttpRequestHandlerService
          .httpGet({mobile: decryptedLoginResp.mobileNoToBeSentOtp, enteredOTP: enteredOTP, userName: userName, emailVerificationType: this.pageMode =='FORGOT' ? 'RST_PSWD':'', loginResponseId: this.loginRespId}, 'NotificationManager', 'validateMobileOTP')
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: any) => {
        
      let otpResp = this.commonOpsService.lowercaseKeysDeep(JSON.parse(this.commonOpsService.decryptUsingAES256(data.otpVerifyResp, 
        environment.xhrEncryptionConfigs.loginResponseEncryptionKey,
        environment.xhrEncryptionConfigs.loginResponseEncryptionIVKey)))
          if(otpResp.isOtpMatched && decryptedLoginResp.mobileNoToBeSentOtp == otpResp.mobile && otpResp.enteredOtp == enteredOTP){
            if(this.pageMode =='LOGIN'){
              //localStorage.setItem("BearerToken",decryptedLoginResp.token);
              this.globalStateManagerService.setTokenJwtValue(decryptedLoginResp.token)
              this.globalStateManagerService.setTokenEncryptedKeyValue(decryptedLoginResp.encryptionKey)
              this.globalStateManagerService.setTokenIVKeyValue(decryptedLoginResp.iVKey)
              //this.commonOpsService.initiateHomePage(this.authService.getUserJwtDecodedInfo().RoleCode);
            var resp = this.commonOpsService.initiateHomePage(this.authService.getUserJwtDecodedInfo().RoleCode);
            if(!resp.isExternalLink){
            this.router.navigate([resp.pageLink]);
            }
            else if(resp.isExternalLink){ 
                this.appHttpRequestHandlerService.httpGet({ role: this.authService.getUserJwtDecodedInfo().RoleCode , type :resp.portalType} , "ThirdPartyIntegrations", "redirectToOtherPortel").pipe(takeUntil(this.ngUnsubscribe))
                .subscribe((data: GenericFormModel<GetRedirectUrlViewModel>) => {
                    window.location.href = data.formModel.redirectUrl;
                });
              }
            }
            else if(this.pageMode ='FORGOT'){
              this.switchScreen('NEWPASSWORD');
            }
          }  
          else{
            Swal.fire({ icon: 'warning', text: 'Invalid OTP entered..!'});
          }
        });
    }
  }
  getCaptchaCode(){
      this.appHttpRequestHandlerService
          .httpGet({parms:'nodata'}, 'Auth', 'getCaptchaImage')
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: any) => {
            let captchaKeyId = this.dynamicForm.dynamicFormFields.filter(x=>x.keyCode == 'OriginalCaptcha')[0].key
            this.commonOpsService.updateKeyValueOfJsonObject(this.dynamicForm.dynamicFormFields, 'key', 'value', captchaKeyId, data.responseDataModel.captchaCode);
            this.captchaImg = JSON.parse(data.responseDataModel.captchaImg);
        });
  }
  switchScreen(screenType: string){
    this.screenType=screenType;
    this.commonOpsService.updateKeyValueOfJsonObject(this.dynamicForm.dynamicFormFields, 'keyCode', 'value', 'EnteredCaptcha', '');
    this.loginErrorMsg='';
    this.getCaptchaCode();
    if(screenType=='LOGIN'){
      this.initiateForm();
      this.pageMode ='LOGIN';
      this.authService.logout(false); 
    }
    if(screenType=='FORGOT'){
      this.pageMode ='RESETPASSWORD';
      this.authService.logout(false); 
    }
    else if(this.screenType=='NEWPASSWORD'){
      this.commonOpsService.updateKeyValueOfJsonObject(this.dynamicForm.dynamicFormFields, 'keyCode', 'value', 'Password_1', '');
      this.commonOpsService.updateKeyValueOfJsonObject(this.dynamicForm.dynamicFormFields, 'keyCode', 'value', 'Password_2', '');
    }
  }

  redirectToRegistration(){
    this.router.navigate(['/UserRegistration']);
  }

  getMashedMobileNo(){
    let decryptedLoginResp : any;
      if(this.pageMode =='LOGIN'){
        decryptedLoginResp = this.commonOpsService.lowercaseKeysDeep(JSON.parse(this.commonOpsService.decryptUsingAES256(this.loginResp.encryptedResp, 
          environment.xhrEncryptionConfigs.loginResponseEncryptionKey,
          environment.xhrEncryptionConfigs.loginResponseEncryptionIVKey))) as ILoginResponseDetailViewModel;
      }
      else if(this.pageMode =='RESETPASSWORD'){
        decryptedLoginResp = this.commonOpsService.lowercaseKeysDeep(JSON.parse(this.commonOpsService.decryptUsingAES256(this.resetPasswordResp.encryptedResp, 
          environment.xhrEncryptionConfigs.loginResponseEncryptionKey,
          environment.xhrEncryptionConfigs.loginResponseEncryptionIVKey))) as IResetPasswordResponseDetailViewModel;
      }
    return '+91-XXX-XXX-'+ decryptedLoginResp.mobileNoToBeSentOtp.substring(6);
  }
  onFormFieldChange(isClientSideEncryption: boolean, event: any): void{
    let updatedValue=event.target.value.trim();
    if(updatedValue.trim().length>0){
      if(isClientSideEncryption){
        updatedValue = this.commonOpsService.encryptUsingAES256(event.target.value, environment.xhrEncryptionConfigs.loginResponseEncryptionKey, environment.xhrEncryptionConfigs.loginResponseEncryptionIVKey);
          this.commonOpsService.updateKeyValueOfJsonObject(this.dynamicForm.dynamicFormFields, 'key', 'value', event.target.id, updatedValue +'|'+this.dynamicForm.clientId_OnCreation);
      }
      else{
        this.commonOpsService.updateKeyValueOfJsonObject(this.dynamicForm.dynamicFormFields, 'key', 'value', event.target.id, updatedValue);
      }
    }
    this.validateForm(this.dynamicFormFields.filter(x=>x.key==event.target.id)[0].keyCode);
  }
  onFocus(event: any){
    event.target.value='';
    this.commonOpsService.updateKeyValueOfJsonObject(this.dynamicForm.dynamicFormFields, 'key', 'value', event.target.id, '');
  }
  onKeyDown(event: any){
    if(event.key=='Enter'){
      this.onFormFieldChange(this.dynamicFormFields.filter(x=>x.key==event.target.id)[0].isClientSideEncryption, event);
      if(this.screenType=='LOGIN'){
        this.onLoginSubmit();
      }
      else if(this.screenType=='FORGOT'){
        this.onResetPasswordSubmit();
      }
      else if(this.screenType=='NEWPASSWORD'){
        this.onSetNewPasswordSubmit();
      }
      else if(this.screenType=='OTP'){
        this.getMatchOtpCode();
      }
    }
  }
  getInputType(key): string{
    return this.dynamicForm.dynamicFormFields.filter(x=>x.key == key)[0].type;
  }
  
  
  strPreFixPading(num, size) {
    let s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }
  

}
