import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UntypedFormBuilder, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ProjectSiteDashboardComponent } from "./project-site-dashboard/project-site-dashboard.component";
import { ProjectSiteRoutingModule } from "./project-site.routing.module";
import { ProjectSiteService } from "./project-site.service";
import { ProjectSiteFormComponent } from './project-site-form/project-site-form.component';

@NgModule({
    imports:[
        RouterModule,
        CommonModule,
        ProjectSiteRoutingModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations:[
        ProjectSiteDashboardComponent,
        ProjectSiteFormComponent
    ],
    providers:[UntypedFormBuilder, ProjectSiteService]
})
export class ProjectSiteModule{}