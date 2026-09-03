import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { RsaPublicKeyService } from 'src/app/common/rsa-public-key-service';
import { GetRedirectUrlViewModel } from 'src/app/dashboard/dashboard-typed-models';
import { GenericFormModel } from 'src/app/generic-implementation/generic-form-builder.type';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { IDynamicFormFieldsViewModel, IDynamicFormViewModel } from 'src/app/shared/dynamic-form/dynamic-form-typed.modules';
import { GlobalStateManagerService } from 'src/app/shared/global-state-manager-service';
import { SignalrService } from 'src/app/signalr-service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ILoginResponseViewModel, IResetPasswordResponseViewModel, ILoginResponseDetailViewModel, IResetPasswordResponseDetailViewModel, ISetNewPasswordResponseViewModel, ISetNewPasswordResponseDetailViewModel, IUserRegResponseViewModel, IUserRegResponseDetailViewModel, IOTPRegistrationVerifyRespViewModel, IOTPRegistrationVerifyDetailRespViewModel } from '../user-manager-typed.module';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css'],
    standalone: false
})
export class RegistrationComponent implements OnInit { protected ngUnsubscribe: Subject<void> = new Subject<void>();
  dynamicFormFields: IDynamicFormFieldsViewModel[]=[];
  dynamicForm: IDynamicFormViewModel;
  post_targatedModel: string ="pblabournetcoreapi.ViewModels.DynamicFormViewModel";
  post_controller: string = "Auth";
  post_actionMethod: string = "userRegistration";
  connectionId: string;
  captchaImg: string='';
  
  hasErrorInLogin: boolean= false;
  loginErrorMsg:string = '';
  screenType: any='LOGIN';
  loginResp: ILoginResponseViewModel;
  resetPasswordResp: IResetPasswordResponseViewModel;
  pageMode: string = 'LOGIN';
  
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
          keyCode:'FirstName',
          value: '',
          isHidden: false,
          type: 'text',
          captionText: 'First Name',
          isValid: true,
          validationErrorText: 'Please enter first name..!' 
        },
        {
          key:'',
          isClientSideEncryption: false,
          keyCode:'MiddleName',
          value: '',
          isHidden: false,
          type: 'text',
          captionText: 'Middle Name',
          isValid: true,
          validationErrorText: '' 
        },
        {
          key:'',
          isClientSideEncryption: false,
          keyCode:'LastName',
          value: '',
          isHidden: false,
          type: 'text',
          captionText: 'Last Name',
          isValid: true,
          validationErrorText: 'Please enter last name..!' 
        },
        {
          key:'',
          isClientSideEncryption: false,
          keyCode:'Mobile',
          value: '',
          isHidden: false,
          type: 'text',
          captionText: 'Mobile Number',
          isValid: true,
          validationErrorText: 'Please enter valid mobile no. ..!' 
        },
        {
          key:'',
          isClientSideEncryption: false,
          keyCode:'Email',
          value: '',
          isHidden: false,
          type: 'text',
          captionText: 'Email Address',
          isValid: true,
          validationErrorText: 'Please enter valid email..!' 
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
          keyCode:'EnteredMobileOTP',
          value: '',
          isHidden: false,
          type: 'text',
          captionText: 'Enter mobile OTP',
          isValid: true,
          validationErrorText: 'Please enter OTP..!' 
        },
        {
          key:'',
          isClientSideEncryption: false,
          keyCode:'EnteredEmailOTP',
          value: '',
          isHidden: false,
          type: 'text',
          captionText: 'Enter email OTP',
          isValid: true,
          validationErrorText: 'Please enter OTP..!' 
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

      if(element.keyCode ==  'Email'){
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        isAllValid = emailRegex.test(element.value);
        this.commonOpsService.updateKeyValueOfJsonObject(this.dynamicForm.dynamicFormFields, 'key', 'isValid', element.key, isAllValid);
      }
      else if(element.keyCode ==  'Mobile'){
        const emailRegex = /^[6-9]\d{9}$/;
        isAllValid = emailRegex.test(element.value);
        this.commonOpsService.updateKeyValueOfJsonObject(this.dynamicForm.dynamicFormFields, 'key', 'isValid', element.key, isAllValid);
      }
    });
    return isAllValid;
  }

  onLoginSubmit(){
    this.hasErrorInLogin= false;
    this.loginErrorMsg='';
    if(this.validateForm('FirstName,LastName,Mobile,Email,OriginalCaptcha,EnteredCaptcha')){
    this.appHttpRequestHandlerService
    .httpPost(this.dynamicForm, this.post_targatedModel, this.post_controller, this.post_actionMethod)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((loginResp: IUserRegResponseViewModel) => {
      this.loginResp = loginResp;
       let decryptedResp = this.commonOpsService.lowercaseKeysDeep(JSON.parse(this.commonOpsService.decryptUsingAES256(loginResp.encryptedResp, 
        environment.xhrEncryptionConfigs.tokenEncyptionSecretKey,
        environment.xhrEncryptionConfigs.tokenEncyptionSecretIV))) as IUserRegResponseDetailViewModel;
        this.commonOpsService.updateKeyValueOfJsonObject(this.dynamicForm.dynamicFormFields, 'keyCode', 'value', 'EnteredCaptcha', '');
        if(!decryptedResp.hasError){
            this.switchScreen('OTP');
        }
        else{
          this.hasErrorInLogin= true;
          this.loginErrorMsg=decryptedResp.errorDesc + '('+ decryptedResp.errorCode +')';
          this.getCaptchaCode();
        }
      });
    }
  }
  getFormField(keyCode: string): IDynamicFormFieldsViewModel[]{
    return this.dynamicFormFields.filter(x=>x.keyCode==keyCode);        
  }
  getMatchOtpCode(){
    if(this.validateForm('EnteredMobileOTP,EnteredEmailOTP,EnteredCaptcha')){
      let encryptedData: string ='';
      if(this.pageMode =='LOGIN'){
        encryptedData = this.loginResp.encryptedResp; 
      }
      let decryptedLoginResp = this.commonOpsService.lowercaseKeysDeep(JSON.parse(this.commonOpsService.decryptUsingAES256(encryptedData, 
                environment.xhrEncryptionConfigs.tokenEncyptionSecretKey,
                environment.xhrEncryptionConfigs.tokenEncyptionSecretIV))) as IUserRegResponseDetailViewModel;
      this.appHttpRequestHandlerService
      .httpPost(this.dynamicForm, this.post_targatedModel, 'Auth', 'validateRegistrationOTP')
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((resp: IOTPRegistrationVerifyRespViewModel) => {
        let enteredMobileOTP = this.dynamicForm.dynamicFormFields.filter(x=>x.keyCode == 'EnteredMobileOTP')[0].value;
        let otpResp = this.commonOpsService.lowercaseKeysDeep(JSON.parse(this.commonOpsService.decryptUsingAES256(resp.otpVerifyResp, 
          environment.xhrEncryptionConfigs.tokenEncyptionSecretKey,
          environment.xhrEncryptionConfigs.tokenEncyptionSecretIV))) as IOTPRegistrationVerifyDetailRespViewModel
          if(!otpResp.hasError){
            this.switchScreen('USER_SUCCESS');
          }
          else{
            this.hasErrorInLogin= true;
            this.loginErrorMsg=otpResp.errorDesc;
            this.getCaptchaCode();
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
      console.log(screenType)
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

  getMashedMobileNo(){
    return '+91-' + this.getFormField('Mobile')[0].value;
  }
  getMashedEmail(){
    return this.getFormField('Email')[0].value;
  }
  onFormFieldChange(isClientSideEncryption: boolean, event: any): void{
    let updatedValue=event.target.value.trim();
    if(updatedValue.trim().length>0){
      if(isClientSideEncryption){
        updatedValue = this.commonOpsService.encryptUsingAES256(event.target.value, environment.xhrEncryptionConfigs.xhrEncyptionSecretKey, environment.xhrEncryptionConfigs.xhrEncyptionSecretIV);
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
  redirectToLogin(){
    this.router.navigate(['/']);
  }

}
