import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { AuthService } from '../auth.service';
import { CommonService } from 'src/app/common/common.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ILoginResponseDetailViewModel, ILoginResponseViewModel } from 'src/app/user-manager/user-manager-typed.module';
import { environment } from 'src/environments/environment';
import { GetRedirectUrlViewModel } from 'src/app/dashboard/dashboard-typed-models';
import { GenericFormModel } from 'src/app/generic-implementation/generic-form-builder.type';
import { GlobalStateManagerService } from 'src/app/shared/global-state-manager-service';

@Component({
    selector: 'app-login-from-partner-portal',
    templateUrl: './login-from-partner-portal.component.html',
    styleUrls: ['./login-from-partner-portal.component.css'],
    standalone: false
})
export class LoginFromPartnerPortalComponent implements OnInit {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
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
              let encodedString = params.msg.toString().replace(' ','+');
              console.log(encodedString)
              this.appHttpRequestHandlerService.httpGet( { msg: encodedString }, "ThirdPartyIntegrations", "validateLoginFromPartnerPortal").pipe(takeUntil(this.ngUnsubscribe))
              .subscribe((loginResp: ILoginResponseViewModel) => {
                let decryptedLoginResp = this.commonOpsService.lowercaseKeysDeep(JSON.parse(this.commonOpsService.decryptUsingAES256(loginResp.encryptedResp, 
                  environment.xhrEncryptionConfigs.tokenEncyptionSecretKey,
                  environment.xhrEncryptionConfigs.tokenEncyptionSecretIV))) as ILoginResponseDetailViewModel;
              if(!decryptedLoginResp.hasError){
                   //localStorage.setItem("BearerToken",decryptedLoginResp.token);
                    this.globalStateManagerService.setTokenJwtValue(decryptedLoginResp.token);
                    this.globalStateManagerService.setTokenEncryptedKeyValue(decryptedLoginResp.encryptionKey)
                    this.globalStateManagerService.setTokenIVKeyValue(decryptedLoginResp.iVKey)
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
                  else{
                    Swal.fire({
                      icon: 'warning',
                      title: decryptedLoginResp.errorDesc,
                      confirmButtonText: 'Login'
                    }).then((result) => {
                      if (result.isConfirmed) {
                        this.router.navigate(['']);
                      }
                    });  
                  }
                });
              // .subscribe((data) => { 
              //     console.log(data, '>>>>')
              //     Swal.fire({
              //         icon: 'warning',
              //         title: data.responseDataModel,
              //         confirmButtonText: 'Login'
              //       }).then((result) => {
              //         if (result.isConfirmed) {
              //           this.router.navigate(['']);
              //         }
              //       });  
              // });
            }
        });
    }
  
    ngOnInit(): void {}

}