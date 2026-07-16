import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ApplicantDashboardComponent } from "./applicant-dashboard/applicant-dashboard.component";
import { OfficialsComponent } from "./officials/officials.component";
import { MprFactoryComponent } from "./officials/mpr/factory-wing/mpr-factory/mpr-factory.component";
import { AuthGuard } from "../auth/auth-guard";
import { FileApplicationComponent } from "./file-application/file-application.component";
import { TrackApplicationComponent } from "./track-application/track-application.component";
import { HelpComponent } from "./help/help.component";
import { DraftApplicationComponent } from "./draft-application/draft-application.component";
import { WorkerDetailsComponent } from "../samadhaan/complaints/worker-details/worker-details.component";


const appRoutes: Routes=[
    //  { path:'', component: OfficialsComponent, 
    //     canActivate:[AuthGuard], 
    //     data:{allowedRoles:[], notAllowedRoles:['INDL']}
    // },

    { path:'applicantdashboard', component: ApplicantDashboardComponent, canActivate:[AuthGuard], data:{allowedRoles:['WORKER_INDL'], notAllowedRoles:['']}},
    { path:'file-application', component: FileApplicationComponent, canActivate:[AuthGuard], data:{allowedRoles:['WORKER_INDL'], notAllowedRoles:['']}},
    { path:'track-application', component: TrackApplicationComponent, canActivate:[AuthGuard], data:{allowedRoles:['WORKER_INDL'], notAllowedRoles:['']}},
    { path:'draft-application', component: DraftApplicationComponent, canActivate:[AuthGuard], data:{allowedRoles:['WORKER_INDL'], notAllowedRoles:['']}},
    { path:'help', component: HelpComponent, canActivate:[AuthGuard], data:{allowedRoles:['WORKER_INDL'], notAllowedRoles:['']}},
    { path:'worker-details', component: WorkerDetailsComponent, canActivate:[AuthGuard], data:{allowedRoles:['WORKER_INDL'], notAllowedRoles:['']}},
];
@NgModule({
    imports:[
        RouterModule.forChild(appRoutes)
    ],
    exports:[RouterModule]
})
export class ProjectSiteRoutingModule{} 
