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
    selector: 'app-login-splash',
    templateUrl: './login-splash.component.html',
    styleUrls: ['./login-splash.component.css'],
    standalone: false
})
export class LoginSplashComponent implements OnInit {
  public parmamEncodedinfo:string;
  public paramInfo: any;
  public isloginError:boolean=false;
    public queryParms:any;
    public rawToken:any;
    public respData : any;
  constructor(private fb: UntypedFormBuilder, 
    private authService: AuthService,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private router: Router,
    private common:CommonService,
    private route: ActivatedRoute,
    public commonOpsService: CommonOpsService,
    private globalStateManagerService: GlobalStateManagerService) { 
      //localStorage.removeItem("BearerToken");
      this.globalStateManagerService.setTokenJwtValue(null);
    }
    loginForm: TForm<LoginTypeModel> = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      recaptcha: ['abc',Validators.required], 
      tokenConnectionId : ['']
    }) as TForm<LoginTypeModel>; 
    protected ngUnsubscribe: Subject<void> = new Subject<void>();
  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.route.queryParams
      .subscribe(params => {
        this.queryParms = params;
        //localStorage.removeItem("BearerToken");
        this.globalStateManagerService.setTokenJwtValue(null);
        localStorage.removeItem('bb4d2a40-0814-4e70-8dbd-c48327e2f33f');
        this.isloginError=false;
        var rawToken = params.msg;
        rawToken = rawToken.replace(/ /gi, '+');
        this.appHttpRequestHandlerService.httpGet({rawToken : rawToken},"Auth","inspection").pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data)=>{
             this.respData = data.responseDataModel;
        this.loginForm.controls.password.patchValue('805dda7a-59e3-46a5-ae0c-ffb2312f1f958817d567-8807-43d8-8449-69ae0174494f');
            this.globalStateManagerService.setTokenEncryptedKeyValue((<any>this.respData).token);
            this.globalStateManagerService.setTokenIVKeyValue((<any>this.respData).encryptionKey);
            this.setTokenAndSendUserToHomePage((<any>this.respData).IVKey);  
            localStorage.setItem('bb4d2a40-0814-4e70-8dbd-c48327e2f33f', rawToken);
        });
      });
  }
  setTokenAndSendUserToHomePage(token:string){
    //localStorage.setItem("BearerToken",token);
    this.globalStateManagerService.setTokenJwtValue(token);
    this.initiateHomePage();
  }
  initiateHomePage(){
    var encryptedParms = this.commonOpsService.encodeQueryParamsInBase64(
      { 
        ipin : this.respData.ipin
      });
  this.router.navigate(['/project/sites'],{ queryParams: { info: encryptedParms } });

    
  }
}
