import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { ManageUsersComponent } from "./manage-users/manage-users.component";
import { AuthGuard } from "../auth/auth-guard";
import { RegistrationComponent } from "./registration/registration.component";

const appRoutes: Routes=[
    { path:'', component: LoginComponent },
    { path:'Login', component: LoginComponent },
    { path:'53E594B0-6967-4122-B876-0BF9854F1ED1', component: ManageUsersComponent, canActivate:[AuthGuard], 
        data:{allowedRoles:['LB1N','HELPDESK'], notAllowedRoles:[] }},
    { path:'UserRegistration', component: RegistrationComponent }
];

@NgModule({
   imports:[
       RouterModule.forChild(appRoutes)
   ],
   exports:[RouterModule]
})
export class UserManagerRoutingModule{}