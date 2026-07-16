import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { CommonService } from 'src/app/common/common.service';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { ProjectSite } from 'src/app/project-site/project-site-typed-module';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { LoginTypeModel } from '../auth-typed-models';
import { Subject } from 'rxjs';
import { AuthService } from '../auth.service';
import { GlobalStateManagerService } from 'src/app/shared/global-state-manager-service';

@Component({
    selector: 'app-direct-login',
    templateUrl: './direct-login.component.html',
    styleUrls: ['./direct-login.component.css'],
    standalone: false
})
export class DirectLoginComponent implements OnInit {
  public parmamEncodedinfo:string;

  constructor(
    private fb: UntypedFormBuilder, 
    private authService: AuthService,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private router: Router,
    private common:CommonService,
    private route: ActivatedRoute,
    private globalStateManagerService: GlobalStateManagerService
    ){
      //localStorage.removeItem("BearerToken");
      this.globalStateManagerService.setTokenJwtValue(null);
    }
  ngOnInit(): void {
    this.isloginError=false;
    //this.common.setNavStatus(false);
  }

    loginForm: TForm<LoginTypeModel> = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      recaptcha: ['abc',Validators.required], 
      userid:    ['', Validators.required],
      tokenConnectionId : ['']
    }) as TForm<LoginTypeModel>; 
    protected ngUnsubscribe: Subject<void> = new Subject<void>();
    public isloginError:boolean=false;
    public queryParms:any;

  ngAfterViewInit() {
    this.route.queryParams
      .subscribe(params => {
        this.queryParms = params;
        //localStorage.removeItem("BearerToken");
        this.globalStateManagerService.setTokenJwtValue(null);
        //localStorage.removeItem('bb4d2a40-0814-4e70-8dbd-c48327e2f33f');
        this.isloginError=false;
        this.loginForm.controls.userName.patchValue(params.msg);
        this.loginForm.controls.password.patchValue('805dda7a-59e3-46a5-ae0c-ffb2312f1f958817d567-8807-43d8-8449-69ae0174494f');
        this.loginForm.controls.userid.patchValue(params.userid);
        // "5810BA8C-E5FE-4BF5-AABE-CF354CD10F81"
        this.appHttpRequestHandlerService.httpPost(this.loginForm.value,"pbsamadhannetcoreapi.ViewModels.LoginViewModel", "Auth","EF61B022-EADF-4921-AA51-9F7AF16A1F7B").pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data:any)=>{
          console.log('JKJKJKJKJKJK',data);
          if(data==null){
            this.authService.logout(true);
          }

          else if((<any>data).isAvailable){
            //this.setTokenAndSendUserToHomePage((<any>data).token); 
            this.globalStateManagerService.setTokenJwtValue((<any>data).token.token)
            this.globalStateManagerService.setTokenEncryptedKeyValue((<any>data).token.encryptionKey)
            this.globalStateManagerService.setTokenIVKeyValue((<any>data).token.ivKey)
            this.initiateHomePage(); 
            //localStorage.setItem('bb4d2a40-0814-4e70-8dbd-c48327e2f33f', params.msg);
          }
          else{
            this.isloginError=true;
            setTimeout(() => {
            this.authService.logout(true);  
            }, 3000);
          }
        });
      });
  }

  setTokenAndSendUserToHomePage(token:string){
    //localStorage.setItem("BearerToken",token);
    //this.globalStateManagerService.setTokenJwtValue(token)
    //this.initiateHomePage();
  }
  initiateHomePage(){
    this.router.navigate(['/e09e3443-c982-4095-bc0f-5f484b96c8fa-aea4de0b-7bc1-4009-a62d-669d8bd5a973'],{queryParams: this.queryParms});

    // if(this.authService.getUserJwtDecodedInfo().RoleCode=='INDL'){
    //   this.router.navigate(['/project/sites']);
    // } else if(this.authService.getUserJwtDecodedInfo().RoleCode == 'DLHF'
    //           || this.authService.getUserJwtDecodedInfo().RoleCode == 'DDRF'
    //           || this.authService.getUserJwtDecodedInfo().RoleCode == 'ADRF'
    //           || this.authService.getUserJwtDecodedInfo().RoleCode == 'ALLC'
    //           || this.authService.getUserJwtDecodedInfo().RoleCode == 'LBIN'
    //           || this.authService.getUserJwtDecodedInfo().RoleCode == 'DLHL'
    //           || this.authService.getUserJwtDecodedInfo().RoleCode == 'ALLC'
    //           || this.authService.getUserJwtDecodedInfo().RoleCode == 'DLBP'
    //           || this.authService.getUserJwtDecodedInfo().RoleCode == 'JDRF'
    //           || this.authService.getUserJwtDecodedInfo().RoleCode == 'ADDF'
    //           || this.authService.getUserJwtDecodedInfo().RoleCode == 'LBCR'
    //           || this.authService.getUserJwtDecodedInfo().RoleCode == 'DTP'
    //           || this.authService.getUserJwtDecodedInfo().RoleCode == 'ATP'
    //           || this.authService.getUserJwtDecodedInfo().RoleCode == 'ARHQ'){
    //   this.router.navigate(['/dashboard/officials']);
    // }
    // else if(this.authService.getUserJwtDecodedInfo().RoleCode == 'PSLD' || this.authService.getUserJwtDecodedInfo().RoleCode=='CEOIP'){
    //   this.router.navigate(['/dashboard/servicewise']); 
    // }
    // else if(this.authService.getUserJwtDecodedInfo().RoleCode=='DLHA'){ // Dealing-hand Account
    //   this.router.navigate(['/dashboard/appfeedetails']);
    // }
    // else if(this.authService.getUserJwtDecodedInfo().RoleCode == 'SUPTGEN' ){
    //   this.router.navigate(['/department-level-forms/epfoDetails']); 
    // }
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
 } 
}

