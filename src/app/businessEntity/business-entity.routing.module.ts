import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BusinessEntityComponent } from "./business-entity-dashboard/business-entity.component"


const appRoutes: Routes=[
        { path:'businessentity', component: BusinessEntityComponent},
];
@NgModule({
    imports:[
        RouterModule.forChild(appRoutes)
    ],
    exports:[RouterModule]
})
export class BusinessEntityRoutingModule{}