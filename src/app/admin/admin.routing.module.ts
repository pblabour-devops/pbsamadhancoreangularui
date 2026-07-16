import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BusinessFirstStatusManagerComponent } from "./business-first-status-manager/business-first-status-manager.component";
import { SearchApplicationComponent } from "./search-application/search-application.component";
import { FeeVerificationManagerComponent } from "./fee-verification-manager/fee-verification-manager.component";
import { DeemedApplicationsComponent } from "./deemed-applications/deemed-applications.component";
import { AddUpdateEmpanelledPersonComponent } from "./add-update-empanelled-person/add-update-empanelled-person.component";
import { UserManagementComponent } from "./user-management/user-management.component";
import { DeemedApplicationTimelineReportComponent } from "./deemed-application-timeline-report/deemed-application-timeline-report.component";
import { AddUpdateWhatsNewComponent } from "./add-update-whats-new/add-update-whats-new.component";
import { StepBackRtbFeeComponent } from "./step-back-rtb-fee/step-back-rtb-fee.component";

const appRoutes: Routes=[
    { path:'status-manager', component:BusinessFirstStatusManagerComponent },
    { path:'search-application', component:SearchApplicationComponent },
    { path:'fee-verification-manager', component:FeeVerificationManagerComponent },
    { path:'deemed-applications', component:DeemedApplicationsComponent },
    { path:'add-empanelled-person', component:AddUpdateEmpanelledPersonComponent },
    // { path:'user-management', component:UserManagementComponent },
    { path:'deemed-applications-timeline', component:DeemedApplicationTimelineReportComponent },
    { path:'add-whats-new', component:AddUpdateWhatsNewComponent },
    { path:'step-back-rtb-fee', component:StepBackRtbFeeComponent }
];
@NgModule({
   imports:[
       RouterModule.forChild(appRoutes)
   ],
   exports:[RouterModule]
})
export class AdminRoutingModule{}