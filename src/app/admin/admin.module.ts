import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UntypedFormBuilder, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from '@angular/forms'; 
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminRoutingModule } from "./admin.routing.module";
import { BusinessFirstStatusManagerComponent } from './business-first-status-manager/business-first-status-manager.component';
import { SearchApplicationComponent } from './search-application/search-application.component';
import { FeeVerificationManagerComponent } from './fee-verification-manager/fee-verification-manager.component';
import { AddUpdateEmpanelledPersonComponent } from './add-update-empanelled-person/add-update-empanelled-person.component';
import { UserManagementComponent } from "./user-management/user-management.component";
import { AddUpdateWhatsNewComponent } from './add-update-whats-new/add-update-whats-new.component';
import { StepBackRtbFeeComponent } from './step-back-rtb-fee/step-back-rtb-fee.component';
@NgModule({
   imports:[
        RouterModule,
        CommonModule,
        AdminRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        NgbTimepickerModule
    ],
    declarations:[
    BusinessFirstStatusManagerComponent,
    SearchApplicationComponent,
    FeeVerificationManagerComponent,
    AddUpdateEmpanelledPersonComponent,
    UserManagementComponent,
    AddUpdateWhatsNewComponent,
    StepBackRtbFeeComponent
  ],
    providers:[UntypedFormBuilder]
})
export class AdminModule{}