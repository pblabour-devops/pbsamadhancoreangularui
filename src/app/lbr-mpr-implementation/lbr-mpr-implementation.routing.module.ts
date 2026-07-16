import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LbrMprStepContainerComponent } from "./lbr-mpr-step-container/lbr-mpr-step-container.component";
import { LbrMprMainComponent } from "./lbr-mpr-main/lbr-mpr-main.component";

const appRoutes: Routes=[
    { path:'lbr-mpr-main', component:LbrMprMainComponent },
    { path:'lbr-mpr-step-container', component:LbrMprStepContainerComponent }
 
];
@NgModule({
    imports:[
        RouterModule.forChild(appRoutes)
    ],
    exports:[RouterModule]
})
export class LbrMprImplementationRoutingModule{}