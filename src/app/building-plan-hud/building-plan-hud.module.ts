import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UntypedFormBuilder, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AddUpdateBuildingPlanHudGeneralDetailComponent } from "./add-update-building-plan-hud-general-detail/add-update-building-plan-hud-general-detail.component";
import { BuildingPlanHudRoutingModule } from './building-plan-hud.routing.module';
import { DetailComponent } from './detail/detail.component';
import { BuildingPlanHudQuestionnaireComponent } from './building-plan-hud-questionnaire/building-plan-hud-questionnaire.component';
import { FormsModule } from '@angular/forms';
@NgModule({
    imports:[
        RouterModule,
        CommonModule,
        BuildingPlanHudRoutingModule,
        ReactiveFormsModule,
        SharedModule,
        FormsModule
    ],
    declarations:[
        AddUpdateBuildingPlanHudGeneralDetailComponent,
        DetailComponent,
        BuildingPlanHudQuestionnaireComponent,
    ],
    providers:[UntypedFormBuilder]
})
export class BuildingPlanHudModule{}