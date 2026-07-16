import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UntypedFormBuilder, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AddUpdateGeneralDetailComponent } from "./add-update-general-detail/add-update-general-detail.component";
import { BuildingPlanService } from "./buildingPlan-service";
import { BuildingPlanRoutingModule } from "./buildingPlan.routing.module";
import { AddUpdateAreaDetailsComponent } from './add-update-area-details/add-update-area-details.component';
import { DetailsComponent } from './details/details.component';


@NgModule({
    imports:[
        RouterModule,
        CommonModule,
        BuildingPlanRoutingModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations:[
        AddUpdateGeneralDetailComponent,
        AddUpdateAreaDetailsComponent,
        DetailsComponent
    ],
    providers:[UntypedFormBuilder, BuildingPlanService]
})
export class BuildingPlanModule{}