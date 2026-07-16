import { RouterModule, Routes } from "@angular/router";
import { AnnualReturnMainComponent } from "./annual-return-main/annual-return-main.component";
import { AnnualReturnStepContainerComponent } from "./annual-return-step-container/annual-return-step-container.component";
import { AnnualReturnDashboardComponent } from "./annual-return-dashboard/annual-return-dashboard.component";
import { NgModule } from "@angular/core";

const appRoutes: Routes=[
    { path:'annual-return-main', component:AnnualReturnMainComponent },
    { path:'annual-return-step-container', component:AnnualReturnStepContainerComponent },
    { path:'annual-return-dashboard', component:AnnualReturnDashboardComponent }
 
];
@NgModule({
    imports:[
        RouterModule.forChild(appRoutes)
    ],
    exports:[RouterModule]
})
export class AnnualReturnImplementationRoutingModule{}

