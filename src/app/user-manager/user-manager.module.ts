import { CommonModule } from "@angular/common";
import { UntypedFormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule, NgbTimepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { SharedModule } from "../shared/shared.module";
import { NgxPaginationModule } from "ngx-pagination";
import { UserManagerRoutingModule } from "./user-manager-routing.module";
import { NgModule } from "@angular/core";
import { LoginComponent } from "../user-manager/login/login.component";
import { RegistrationComponent } from './registration/registration.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';

@NgModule({
   imports:[
        RouterModule,
        CommonModule,
        UserManagerRoutingModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        NgbTimepickerModule,
        NgxPaginationModule,
        
    ],
    declarations:[
        LoginComponent,
        RegistrationComponent,
        ManageUsersComponent

    ],
    providers:[UntypedFormBuilder]
})
export class UserManagerModule{}