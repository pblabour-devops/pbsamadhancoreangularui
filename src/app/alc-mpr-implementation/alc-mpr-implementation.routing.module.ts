import { RouterModule, Routes } from "@angular/router";
import { AlcMprMainComponent } from "./alc-mpr-main/alc-mpr-main.component";
import { AlcMprStepContainerComponent } from "./alc-mpr-step-container/alc-mpr-step-container.component";
import { NgModule } from "@angular/core";

const appRoutes: Routes=[
    { path:'alc-mpr-main', component:AlcMprMainComponent },
    { path:'alc-mpr-step-container', component:AlcMprStepContainerComponent }
 
];
@NgModule({
    imports:[
        RouterModule.forChild(appRoutes)
    ],
    exports:[RouterModule]
})
export class AlcMprImplementationRoutingModule{}