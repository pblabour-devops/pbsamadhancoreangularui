import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard';
// import { LoginComponent } from './auth/user-manager/login/login.component';
import { QuickloginComponent } from './auth/quicklogin/quicklogin.component';
import { DyanmicChecklistComponent } from './checklist-based-forms/dyanmic-checklist/dyanmic-checklist.component';
import { RequestErrorComponent } from './third-party-integrations/invest-punjab/request-error/request-error.component';
import { ServiceGatewayComponent } from './third-party-integrations/invest-punjab/service-gateway/service-gateway.component';
import { DirectLoginComponent } from './auth/direct-login/direct-login.component';
import { MobileAppQrcodeRegistrationComponent } from './auth/mobile-app-qrcode-registration/mobile-app-qrcode-registration.component';
import { PrivacyPolicyFormComponent } from './auth/privacy-policy-form/privacy-policy-form.component';
import { StabiltyReceiptComponent } from './third-party-integrations/invest-punjab/stabilty-receipt/stabilty-receipt.component';
import { environment } from 'src/environments/environment';
import { NotFoundPageComponent } from './auth/not-found-page/not-found-page.component';
import { AuthenticationErrorComponent } from './auth/authentication-error/authentication-error.component';
import { BootstrapComponent } from './auth/bootstrap/bootstrap.component';
import { NewTicketMessageComponent } from './misc-components/alert-windows/new-ticket-message/new-ticket-message.component';
import { LoginSplashComponent } from './auth/login-splash/login-splash.component';
import { WithdrawApplicationComponent } from './third-party-integrations/invest-punjab/withdraw-application/withdraw-application.component';
import { DownloadApprovalComponent } from './third-party-integrations/invest-punjab/download-approval/download-approval.component';
import { RegistrationFormComponent } from './golfer-registration/registration-form/registration-form.component';
import { LoginFromPartnerPortalComponent } from './auth/login-from-partner-portal/login-from-partner-portal.component';
const routes: Routes = [

  {path: '', loadChildren:()=>import('./user-manager/user-manager.module')
    .then(mod=>mod.UserManagerModule)
  },
  {path: 'Account', loadChildren:()=>import('./user-manager/user-manager.module')
    .then(mod=>mod.UserManagerModule)
  },

  //{path: environment.defaultLoginRoute ,component:LoginComponent, pathMatch: 'full'},
  {path:"golfer-registration-form", component:RegistrationFormComponent, pathMatch: 'full'},

  {path:"29462D9B-AE8A-466B-A45D-1FD602B3F104",component:DirectLoginComponent, pathMatch: 'full'},
  {path:"quick",component:QuickloginComponent, pathMatch: 'full'},
  {path:"service-gateway",component:ServiceGatewayComponent, pathMatch: 'full'},
  {path:"service-gateway-error",component:RequestErrorComponent, pathMatch: 'full'},
  {path:"mobile-app-qrcode-registration",component:MobileAppQrcodeRegistrationComponent, pathMatch: 'full'},
  {path:"privacy-policy-form",component:PrivacyPolicyFormComponent, pathMatch: 'full'},
  {path:"stabilty-Acknoweldgement-receipt",component:StabiltyReceiptComponent, pathMatch: 'full'},
  {path:"authentication-error",component:AuthenticationErrorComponent, pathMatch: 'full'},
  {path:"e09e3443-c982-4095-bc0f-5f484b96c8fa-aea4de0b-7bc1-4009-a62d-669d8bd5a973",component:BootstrapComponent, pathMatch: 'full'},
  {path:"login-splash",component:LoginSplashComponent, pathMatch: 'full'},
  {path:"withdraw-application", component:WithdrawApplicationComponent, pathMatch: 'full'},
  {path:"download-approval", component:DownloadApprovalComponent, pathMatch: 'full'},
  {path:"login-from-partner-portal",component:LoginFromPartnerPortalComponent, pathMatch: 'full'},
  {
    path:"establishment", loadChildren:()=>import('./establishment/establishment.module')
    .then(mod=>mod.EstablishmentModule), canActivate:[AuthGuard], 
        data:{allowedRoles:['INDL'], notAllowedRoles:['']}
  },
  {
    path:"business", loadChildren:()=>import('./businessEntity/business-entity.module')
    .then(mod=>mod.BusinessEntityModule), canActivate:[AuthGuard], 
        data:{allowedRoles:['INDL'], notAllowedRoles:['']}
  },
  {
    path:"project", loadChildren:()=>import('./project-site/project-site.module')
    .then(mod=>mod.ProjectSiteModule), canActivate:[AuthGuard], 
        data:{allowedRoles:['INDL'], notAllowedRoles:['']}
  },
  {
    path:"dashboard", loadChildren:()=>import('./dashboard/dashboard.module')
    .then(mod=>mod.DashboardModule)
  },
  {
    path:"digitalsignature", loadChildren:()=>import('./digital-signature/digital-signature.module')
    .then(mod=>mod.DigitalSignatureModule), canActivate:[AuthGuard], 
        data:{allowedRoles:['INDL'], notAllowedRoles:['']}
  },
  {
    path:"shared", loadChildren:()=>import('./shared/shared.module')
    .then(mod=>mod.SharedModule)
    // , canActivate:[AuthGuard]
  },
  {
    path:"buildingPlan", loadChildren:()=>import('./buildingPlan/buildingPlan.module')
    .then(mod=>mod.BuildingPlanModule), canActivate:[AuthGuard], 
        data:{allowedRoles:['INDL'], notAllowedRoles:['']}
  },
  {
    path:"payments", loadChildren:()=>import('./payments/payments.module')
    .then(mod=>mod.PaymentsModule)
    // , canActivate:[AuthGuard]
  },
  {
    path:"applicationProcess", loadChildren:()=>import('./applicationProcess/applicationProcess.module')
    .then(mod=>mod.ApplicationProcessModule), canActivate:[AuthGuard], 
        data:{allowedRoles:[], notAllowedRoles:['INDL']}
  },
  {
    path:"mobile_app_device", loadChildren:()=>import('./user-mobile-app-device/user-mobile-app-device.module')
    .then(mod=>mod.UserMobileAppDeviceModule)
  },
  {
    path:"dashboard", loadChildren:()=>import('./dashboard/dashboard.module')
    .then(mod=>mod.DashboardModule)
  },
  {path:"checklistBasedForm",component:DyanmicChecklistComponent, pathMatch: 'full'},

  {
    path:"commonLicence", loadChildren:()=>import('./commonLicence/commonLicence.module')
    .then(mod=>mod.CommonLicenceModule), canActivate:[AuthGuard], 
        data:{allowedRoles:['INDL'], notAllowedRoles:['']}
  },
  {
    path:"building-plan-hud", loadChildren:()=>import('./building-plan-hud/building-plan-hud.module')
    .then(mod=>mod.BuildingPlanHudModule)
  },
  {
    path:"licence", loadChildren:()=>import('./licences/licences.module')
    .then(mod=>mod.LicenceModule)
  },
  {
    path:"Admin", loadChildren:()=>import('./admin/admin.module')
    .then(mod=>mod.AdminModule),canActivate:[AuthGuard], 
        data:{allowedRoles:[], notAllowedRoles:['INDL']}
  },
   {
    path:"inspection", loadChildren:()=>import('./inspections/inspections.module')
    .then(mod=>mod.InspectionsModule), 
    //canActivate:[AuthGuard]
  },
  {
    path:"department-level-forms", loadChildren:()=>import('./department-level-forms/department-level-forms.module')
    .then(mod=>mod.DepartmentLevelFormsModule), //canActivate:[AuthGuard]
  },
  {
    path:"to-do", loadChildren:()=>import('./toDoActivity/to-do-activity.module')
    .then(mod=>mod.ToDoActivityModule), canActivate:[AuthGuard], 
        data:{allowedRoles:[], notAllowedRoles:['INDL']}
  },
  {path:'activity-ticket', component: NewTicketMessageComponent},
  {
    path:"lbr-mpr-implementation", loadChildren:()=>import('./lbr-mpr-implementation/lbr-mpr-implementation.module')
    .then(mod=>mod.LbrMprImplementationModule), canActivate:[AuthGuard], 
        data:{allowedRoles:[], notAllowedRoles:['INDL']}
  },
  {
    path:"alc-mpr-implementation", loadChildren:()=>import('./alc-mpr-implementation/alc-mpr-implementation.module')
    .then(mod=>mod.AlcMprImplementationModule), canActivate:[AuthGuard], 
        data:{allowedRoles:[], notAllowedRoles:['INDL']}
  },
  {
    path:"annual-return-filling", loadChildren:()=>import('./annual-return-filling/annual-return-filling.module')
    .then(mod=>mod.AnnualReturnImplementationModule), canActivate:[AuthGuard], 
        data:{allowedRoles:['INDL'], notAllowedRoles:[]}
  },
  {
    path:"oshForm", loadChildren:()=>import('./osh/osh-code.module')
    .then(mod=>mod.OshCodeModule), canActivate:[AuthGuard], 
        data:{allowedRoles:['INDL'], notAllowedRoles:[]}
  },
  {
    path:"labour-welfare", loadChildren:()=>import('./labour-welfare/labour-welfare.module')
    .then(mod=>mod.LabourWelfareModule), canActivate:[AuthGuard], 
        data:{allowedRoles:['INDL'], notAllowedRoles:[]}
  },

  //#region  for samadhaan
  {
    path:"samadhaan", loadChildren:()=>import('././samadhaan/samadhaan.module')
    .then(mod=>mod.SamadhaanModule), canActivate:[AuthGuard], 
        data:{allowedRoles:['WORKER_INDL'], notAllowedRoles:[]}
  },
  //#endregion

  {path: '**',component:NotFoundPageComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {}