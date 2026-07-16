import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { GenericFormModel, TForm } from '../generic-implementation/generic-form-builder.type';
import { country, ProfileFormViewModel } from '../typed-model/profile-form-model.type';
import { CaptchaResultViewModel, LoginTypeModel } from './auth-typed-models';
import { AuthService } from './auth.service';
import {CommonService} from '../common/common.service'
import { RecaptchaComponent } from 'ng-recaptcha';
import {Md5} from 'ts-md5/dist/md5';
declare var require: any;
const shajs = require('sha.js');
import * as CryptoJS from 'crypto-js';
import { AppHttpRequestHandlerService } from '../shared/app-http-request-handler.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { SignalrService } from './../signalr-service';
import { GenericResponseTemplateModel } from '../generic-implementation/generic-service-result-template';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { CommonOpsService } from '../shared/common-ops-service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { GlobalStateManagerService } from '../shared/global-state-manager-service';
@Component({
    selector: 'app-root',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })
  export class LoginComponent {
    //public isCaptchaValidated: boolean = false; //for self loading
    @ViewChild(RecaptchaComponent) captcha: RecaptchaComponent;
    protected ngUnsubscribe: Subject<void> = new Subject<void>();
    public isloginError:boolean=false;
    signalRConnectionId: string;
    QrScanLoginServerResponse: string;
    captchadata: CaptchaResultViewModel;
    imageUrl: any;
    captchajson: any;
    constructor(
      private fb: FormBuilder, 
      private authService: AuthService,
      private appHttpRequestHandlerService: AppHttpRequestHandlerService,
      private router: Router,
      private common:CommonService,
      public signalrService: SignalrService,
      public commonOpsService: CommonOpsService,
      public s:DomSanitizer,
      private globalStateManagerService: GlobalStateManagerService
      ){
        //localStorage.removeItem("BearerToken");
        this.globalStateManagerService.setTokenJwtValue(null)
      }

    loginForm: TForm<LoginTypeModel> = this.fb.group({
        userName: ['', Validators.required],
        password: ['', Validators.required],
        recaptcha: ['abc',Validators.required], 
        tokenConnectionId : ['']
      }) as TForm<LoginTypeModel>; 

    ngOnInIt(){
  
      this.isloginError=false;
      
      //this.common.setNavStatus(false);
      
    }
    ngAfterViewInit(){
      this.signalrService.signalRConnectionId.subscribe((signalRConnectionId: string) => {
      this.signalRConnectionId = signalRConnectionId;

      this.loginForm.controls.tokenConnectionId.patchValue(this.signalRConnectionId);
      });
      
      // this.signalrService.connection
      //   .invoke('FirstEndpointOfSignalRService')
      //   .catch(error => {
      //     console.log(`SignalrDemoHub.FirstEndpointOfSignalRService() error: ${error}`);
      //     alert('SignalrDemoHub.FirstEndpointOfSignalRService() error!, see console for details.');
      //   }
      // );
      this.signalrService.QrScanLoginServerResponse.subscribe((QrScanLoginServerResponse: string) => {
        this.QrScanLoginServerResponse = QrScanLoginServerResponse;
        if(QrScanLoginServerResponse!=null){
          this.setTokenAndSendUserToHomePage(QrScanLoginServerResponse);
        }
      });



      if (navigator.geolocation) {
        const options = { timeout: 60000 };
        navigator.geolocation.getCurrentPosition((position => {
          // console.log(position.coords.latitude, position.coords.longitude);
        }), (err => {
          if (err.code === 1) {
            alert('Error: Access is denied!');
          } else if (err.code === 2) {
            alert('Error: Position is unavailable!');
          }
        }), options);
      } else {
        alert('Sorry, browser does not support geolocation!');
      }


      // const position: any =  this.common.getCurrentLocation().then((x)=>{
      //   console.log(x)
      // })
    }

    
    onSubmit():void {
      //localStorage.removeItem("BearerToken");
      this.globalStateManagerService.setTokenJwtValue(null);
      this.isloginError=false;
      this.appHttpRequestHandlerService.httpPost(this.loginForm.value,"pbsamadhannetcoreapi.ViewModels.LoginViewModel", "Auth","login").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: string)=>{
        if((<any>data).isAvailable){
        this.setTokenAndSendUserToHomePage((<any>data).token);  
        }
        else{
          this.isloginError=true;
        }
      });
    }




    setTokenAndSendUserToHomePage(token:string){
      //localStorage.setItem("BearerToken",token);
      this.globalStateManagerService.setTokenJwtValue(token);
      this.initiateHomePage();
    }

    onPasswordFocusIn(){
      this.loginForm.controls.password.patchValue('');
    }
    onPasswordFocusOut(){
      if(this.loginForm.controls.password.value.trim().length>0){
      this.loginForm.controls.password.patchValue(shajs('sha256').update(Md5.hashStr(this.loginForm.controls.password.value)).digest('hex'));
      }
    }
    initiateHomePage(){
      if(this.authService.getUserJwtDecodedInfo().RoleCode=='INDL')
      {
      this.router.navigate(['/project/sites']);
      } 
      else if(this.authService.getUserJwtDecodedInfo().RoleCode == 'DLHF'
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
                // || this.authService.getUserJwtDecodedInfo().RoleCode == 'DLHA'
                || this.authService.getUserJwtDecodedInfo().RoleCode == 'ARHQ'
                || this.authService.getUserJwtDecodedInfo().RoleCode == 'ADLW'
                || this.authService.getUserJwtDecodedInfo().RoleCode == 'JDM'
                || this.authService.getUserJwtDecodedInfo().RoleCode == 'SDO'
                || this.authService.getUserJwtDecodedInfo().RoleCode == 'EO'
                || this.authService.getUserJwtDecodedInfo().RoleCode == 'CGM'
                || this.authService.getUserJwtDecodedInfo().RoleCode == 'ATP_PSIEC'
                || this.authService.getUserJwtDecodedInfo().RoleCode == 'DRFT'
                || this.authService.getUserJwtDecodedInfo().RoleCode == 'JDRF_PSIEC'
                || this.authService.getUserJwtDecodedInfo().RoleCode == 'DL_PSIEC'
                || this.authService.getUserJwtDecodedInfo().RoleCode == 'DPLC'
                || this.authService.getUserJwtDecodedInfo().RoleCode == 'DLTU'
                || this.authService.getUserJwtDecodedInfo().RoleCode == 'SOTU'
                || this.authService.getUserJwtDecodedInfo().RoleCode == 'SPTU'
                || this.authService.getUserJwtDecodedInfo().RoleCode == 'ADLC'
                || this.authService.getUserJwtDecodedInfo().RoleCode == 'DHF_RPT'
                || this.authService.getUserJwtDecodedInfo().RoleCode == 'DHF_BP_HQ'
                || this.authService.getUserJwtDecodedInfo().RoleCode == 'HELPDESK')
      {
      this.router.navigate(['/dashboard/officials']);
      }
      else if(this.authService.getUserJwtDecodedInfo().RoleCode=='ADMIN_TECH_SPRT')
      {
        this.router.navigate(['/Admin/status-manager']);
      } 
     
      else if(this.authService.getUserJwtDecodedInfo().RoleCode=='PSLD' || this.authService.getUserJwtDecodedInfo().RoleCode=='CEOIP'|| this.authService.getUserJwtDecodedInfo().RoleCode == 'MPRM'
      || this.authService.getUserJwtDecodedInfo().RoleCode == 'DLFI' || this.authService.getUserJwtDecodedInfo().RoleCode == 'PMGR'
      )
      {
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
      else if(this.authService.getUserJwtDecodedInfo().RoleCode == 'LB1N' ){
        this.router.navigate(['/to-do/activity-viewer']); 
      }
      else if(this.authService.getUserJwtDecodedInfo().RoleCode == 'MPRC' ){
        this.router.navigate(['/dashboard/mpr_factories']); 
      }
      else if(this.authService.getUserJwtDecodedInfo().RoleCode == 'TRN_RPT'){
        this.router.navigate(['/dashboard/transperancy_data']);
} 
    }
    ngOnDestroy() {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
   } 
  }


  //Site key: 6LfdUSUdAAAAAANqQpDylwK5JCg-jOX9_i-RPtEa
  //Secter key: 6LfdUSUdAAAAAJdmebb0Qv5E9eKA5ERHZ-k42K5O