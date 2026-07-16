import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddUpdateContractorDetailComponent } from "./add-update-contractor-detail/add-update-contractor-detail.component";
import { AddUpdateGeneralDetailComponent } from "./add-update-general-detail/add-update-general-detail.component";
import { DetailComponent } from "./detail/detail.component";

const appRoutes: Routes=[
    { path:'addupdategeneraldetail', component:AddUpdateGeneralDetailComponent },
    { path:'addupdatecontractordetail', component:AddUpdateContractorDetailComponent },
    { path:'detail', component: DetailComponent },
];
@NgModule({
    imports:[
        RouterModule.forChild(appRoutes)
    ],
    exports:[RouterModule]
})
export class CommonLicenceRoutingModule{}