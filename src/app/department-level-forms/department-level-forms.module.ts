import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UntypedFormBuilder, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { DepartmentLevelFormsRoutingModule } from "./department-level-forms.routing.module";
import { FormsModule } from '@angular/forms'; 
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from "ngx-pagination";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MprFactoryWingComponent } from './mpr-factory-wing/add-update-form/mpr-factory-wing.component';
import { EstablishmentEpfoComponent } from "./establishment-epfo/establishment-epfo.component";
import { EstablishmentEpfoReportComponent } from "./establishment-epfo-report/establishment-epfo-report.component";
import { SafePipeModule } from "safe-pipe";
import { MergeFactoryLicencesComponent } from './merge-factory-licences/merge-factory-licences.component';

@NgModule({
   imports:[
        RouterModule,
        CommonModule,
        DepartmentLevelFormsRoutingModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        NgbTimepickerModule,
        NgxPaginationModule,
        SafePipeModule
    ],
    declarations:[
    MprFactoryWingComponent,
    EstablishmentEpfoComponent,
    EstablishmentEpfoReportComponent,
    MergeFactoryLicencesComponent
  ],
    providers:[UntypedFormBuilder]
})
export class DepartmentLevelFormsModule{}