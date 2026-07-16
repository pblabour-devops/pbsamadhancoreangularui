import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProjectSiteDashboardComponent } from "./project-site-dashboard/project-site-dashboard.component";
import { ProjectSiteFormComponent } from "./project-site-form/project-site-form.component";

const appRoutes: Routes=[
    { path:'sites', component: ProjectSiteDashboardComponent},
    { path:'addNewSites', component: ProjectSiteFormComponent},
];
@NgModule({
    imports:[
        RouterModule.forChild(appRoutes)
    ],
    exports:[RouterModule]
})
export class ProjectSiteRoutingModule{}