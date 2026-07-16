import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MprFactoryWingComponent } from './mpr-factory-wing/add-update-form/mpr-factory-wing.component';
import { EstablishmentEpfoComponent } from "./establishment-epfo/establishment-epfo.component";
import { EstablishmentEpfoReportComponent } from "./establishment-epfo-report/establishment-epfo-report.component";
import { MergeFactoryLicencesComponent } from "./merge-factory-licences/merge-factory-licences.component";
const appRoutes: Routes=[
    {path:'mpr-factory-wing', component:MprFactoryWingComponent},
    {path:'epfoDetails', component:EstablishmentEpfoComponent},
    {path:'epfoReport', component:EstablishmentEpfoReportComponent},
    {path:'merge-factory-licence', component:MergeFactoryLicencesComponent}
];
@NgModule({
   imports:[
       RouterModule.forChild(appRoutes)
   ],
   exports:[RouterModule]
})
export class DepartmentLevelFormsRoutingModule{}