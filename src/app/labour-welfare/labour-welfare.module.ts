import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { LabourWelfareRoutingModule } from "./labour-welfare.routing.module";
import {FundDepositComponent} from "./fund-deposit/fund-deposit.component";

@NgModule({
    imports:[
        RouterModule,
        CommonModule,
        LabourWelfareRoutingModule,
        ReactiveFormsModule,
        SharedModule,
        FundDepositComponent

    ],
    declarations:[

  ],
    providers:[FormBuilder]
})
export class LabourWelfareModule{}