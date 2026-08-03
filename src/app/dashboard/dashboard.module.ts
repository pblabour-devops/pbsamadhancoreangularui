import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UntypedFormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ProjectSiteRoutingModule } from "./dashboard.routing.module";
import { DashboardService } from "./dashboard.service";
import { ApplicantDashboardComponent } from './applicant-dashboard/applicant-dashboard.component';
import { OfficialsComponent } from './officials/officials.component';
import { ToRegularCase } from '../pipes/to-regular-case.pipe';
import { SafePipeModule } from "safe-pipe";
import { MprFactoryComponent } from './officials/mpr/factory-wing/mpr-factory/mpr-factory.component';
import { DeemedApplicationsComponent } from "../admin/deemed-applications/deemed-applications.component";
import { DeemedApplicationTimelineReportComponent } from "../admin/deemed-application-timeline-report/deemed-application-timeline-report.component";
import { MprAlcComponent } from "./officials/mpr/alc-wing/mpr-alc/mpr-alc.component";
import { AlcMprImplementationModule } from "../alc-mpr-implementation/alc-mpr-implementation.module";
import { MprLbrComponent } from "./officials/mpr/labour-wing/mpr-lbr/mpr-lbr.component";
import { LbrMprImplementationModule } from "../lbr-mpr-implementation/lbr-mpr-implementation.module";
import { FileApplicationComponent } from "./file-application/file-application.component";
import {TrackApplicationComponent} from "./track-application/track-application.component";
import { DraftApplicationComponent } from "./draft-application/draft-application.component";
import { HelpComponent } from "./help/help.component";
import { WorkerDetailsComponent } from "../samadhaan/complaints/worker-details/worker-details.component";
import { SelfComponent } from './file-application/self/self.component';
import { NomineeComponent } from './file-application/nominee/nominee.component';
import { LegalHeirComponent } from './file-application/legal-heir/legal-heir.component';
import { LegalRepresentativeComponent } from './file-application/legal-representative/legal-representative.component';
import { AuthorizedRepresentativeComponent } from './file-application/authorized-representative/authorized-representative.component';
import { GroupOfWorkersComponent } from './file-application/group-of-workers/group-of-workers.component';
import { DraftComplaintComponent } from './draft-complaint/draft-complaint.component';
import { ListApplicationsComponent } from './list-applications/list-applications.component';
@NgModule({
    imports: [
    RouterModule,
    CommonModule,
    ProjectSiteRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    SafePipeModule,
    FormsModule,
    AlcMprImplementationModule,
    LbrMprImplementationModule,
],
    declarations:[ApplicantDashboardComponent,
                   OfficialsComponent,
                   ToRegularCase,
                   MprFactoryComponent,
                   DeemedApplicationsComponent,
                   DeemedApplicationTimelineReportComponent,
                   MprAlcComponent,
                   MprLbrComponent,
                   FileApplicationComponent,
                   TrackApplicationComponent,
                   DraftApplicationComponent,
                   HelpComponent,
                   WorkerDetailsComponent,
                   SelfComponent,
                   NomineeComponent,
                   LegalHeirComponent,
                   LegalRepresentativeComponent,
                   AuthorizedRepresentativeComponent,
                   GroupOfWorkersComponent,
                   DraftComplaintComponent,
                   ListApplicationsComponent,
                   ],
    providers:[UntypedFormBuilder, DashboardService]
})
export class DashboardModule{}
