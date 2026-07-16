import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProcessApplicationWindowComponent } from "./process-application-window/process-application-window.component";

const appRoutes: Routes=[
    { path:'actionWindow', component:ProcessApplicationWindowComponent },
];
@NgModule({
    imports:[
        RouterModule.forChild(appRoutes)
    ],
    exports:[RouterModule]
})
// export class BuildingPlanRoutingModule{}
export class ProcessApplicationRoutingModule{}