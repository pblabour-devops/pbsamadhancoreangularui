import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddUpdateBuildingPlanHudGeneralDetailComponent } from "./add-update-building-plan-hud-general-detail/add-update-building-plan-hud-general-detail.component";
import { BuildingPlanHudQuestionnaireComponent } from "./building-plan-hud-questionnaire/building-plan-hud-questionnaire.component";
import { DetailComponent } from "./detail/detail.component";

const appRoutes: Routes=[
    { path:'addupdategeneraldetail', component:AddUpdateBuildingPlanHudGeneralDetailComponent },
    { path:'detail', component: DetailComponent },
    { path:'questionnaire', component: BuildingPlanHudQuestionnaireComponent },
];
@NgModule({
    imports:[
        RouterModule.forChild(appRoutes)
    ],
    exports:[RouterModule]
})
export class BuildingPlanHudRoutingModule{}