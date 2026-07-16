import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UploadDocumentComponent } from "../establishment/upload-document/upload-document.component";
import { AddUpdateAreaDetailsComponent } from "./add-update-area-details/add-update-area-details.component";
import { AddUpdateGeneralDetailComponent } from "./add-update-general-detail/add-update-general-detail.component";
import { DetailsComponent } from "./details/details.component";

const appRoutes: Routes=[
    { path:'addupdategeneraldetail', component:AddUpdateGeneralDetailComponent },
    { path:'addupdateareadetail', component:AddUpdateAreaDetailsComponent },
    { path:'upload-document', component:UploadDocumentComponent },
    { path:'detail', component: DetailsComponent}
];
@NgModule({
    imports:[
        RouterModule.forChild(appRoutes)
    ],
    exports:[RouterModule]
})
export class BuildingPlanRoutingModule{}