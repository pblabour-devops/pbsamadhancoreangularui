import { APP_INITIALIZER,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule ,UntypedFormBuilder, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {JWT_OPTIONS, JwtModule} from '@auth0/angular-jwt';
import { environment } from './../environments/environment';
import { AuthService } from './auth/auth.service';
import { SharedModule } from './shared/shared.module';
import { AppHttpInterceptor } from './shared/app-http.interceptor';
import { AppHttpRequestHandlerService } from './shared/app-http-request-handler.service';
import { RouterModule} from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import {SignalrService} from './signalr-service';
import { QrCodeModule } from 'ng-qrcode';
import { LoginsliderComponent } from './auth/loginslider/loginslider.component';
import { QuickloginComponent } from './auth/quicklogin/quicklogin.component';
import { ScanflowComponent } from './auth/scanflow/scanflow.component';
import { DyanmicChecklistComponent } from './checklist-based-forms/dyanmic-checklist/dyanmic-checklist.component';
import { ServiceGatewayComponent } from './third-party-integrations/invest-punjab/service-gateway/service-gateway.component';
import { RequestErrorComponent } from './third-party-integrations/invest-punjab/request-error/request-error.component';
import { DirectLoginComponent } from './auth/direct-login/direct-login.component';
import { MobileAppQrcodeRegistrationComponent } from './auth/mobile-app-qrcode-registration/mobile-app-qrcode-registration.component';
import { PrivacyPolicyFormComponent } from './auth/privacy-policy-form/privacy-policy-form.component';
import { StabiltyReceiptComponent } from './third-party-integrations/invest-punjab/stabilty-receipt/stabilty-receipt.component';
import { BootstrapComponent } from './auth/bootstrap/bootstrap.component';
import { NotFoundPageComponent } from './auth/not-found-page/not-found-page.component';
import { AuthenticationErrorComponent } from './auth/authentication-error/authentication-error.component';
import { NewTicketMessageComponent } from './misc-components/alert-windows/new-ticket-message/new-ticket-message.component';
import { LoginSplashComponent } from './auth/login-splash/login-splash.component';
import { WithdrawApplicationComponent } from './third-party-integrations/invest-punjab/withdraw-application/withdraw-application.component';
import { DownloadApprovalComponent } from './third-party-integrations/invest-punjab/download-approval/download-approval.component';
import { CommonModule } from '@angular/common';
import { RegistrationFormComponent } from './golfer-registration/registration-form/registration-form.component';
import { RsaPublicKeyService } from './common/rsa-public-key-service';
import { LoginFromPartnerPortalComponent } from './auth/login-from-partner-portal/login-from-partner-portal.component';
import { UserIdleModule } from 'angular-user-idle';
import { GlobalStateManagerService } from './shared/global-state-manager-service';
import { ResizeDirective } from './custom-directives/resize.directive';
import { DragDirective } from './custom-directives/drag.directive';
// export function authTokenGetter(globalStateManagerService: GlobalStateManagerService){
//   return globalStateManagerService.getJwtTokenValue()
//   //return localStorage.getItem('BearerToken');
// }
export function jwtOptionsFactory(globalStateManagerService: GlobalStateManagerService) {
  return {
    tokenGetter: () => {
      // 2. Call the service method here
      return globalStateManagerService.getTokenJwtValue();
    },
    allowedDomains: environment.allowedDomains,
    disallowedRoutes: [],
  };
}


@NgModule({ declarations: [
        AppComponent,
        LoginsliderComponent,
        QuickloginComponent,
        ScanflowComponent,
        DyanmicChecklistComponent,
        ServiceGatewayComponent,
        RequestErrorComponent,
        DirectLoginComponent,
        MobileAppQrcodeRegistrationComponent,
        PrivacyPolicyFormComponent,
        StabiltyReceiptComponent,
        BootstrapComponent,
        NotFoundPageComponent,
        AuthenticationErrorComponent,
        NewTicketMessageComponent,
        LoginSplashComponent,
        WithdrawApplicationComponent,
        DownloadApprovalComponent,
        RegistrationFormComponent,
        LoginFromPartnerPortalComponent,
        ResizeDirective,
        DragDirective
    ],
    exports: [
        RouterModule
    ],
    bootstrap: [AppComponent], 
    imports: [CommonModule,
        AppRoutingModule,
        BrowserModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule,
        JwtModule.forRoot({
            jwtOptionsProvider: {
                provide: JWT_OPTIONS,
                useFactory: jwtOptionsFactory,
                deps: [GlobalStateManagerService], // Inject service here
            },
            // config:{
            //   tokenGetter:authTokenGetter,
            //   allowedDomains:environment.allowedDomains,
            //   disallowedRoutes:[],
            //   deps:[GlobalStateManagerService]
            // }
        }),
        NgbModule,
        RecaptchaModule,
        RecaptchaFormsModule,
        QrCodeModule,
        FormsModule,
        UserIdleModule.forRoot({ idle: environment.maxIdleTime_seconds, timeout: environment.maxLogoutWaitingTime_seconds, ping: 20 })], providers: [
        UntypedFormBuilder,
        AuthService,
        AppHttpRequestHandlerService,
        { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
        {
            provide: RECAPTCHA_SETTINGS,
            useValue: {
                siteKey: environment.recaptcha.siteKey,
            } as RecaptchaSettings,
        },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule {}