import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UntypedFormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AnnualReturnMainComponent } from "./annual-return-main/annual-return-main.component";
import { AnnualReturnStepContainerComponent } from "./annual-return-step-container/annual-return-step-container.component";
import { AnnualReturnDashboardComponent } from "./annual-return-dashboard/annual-return-dashboard.component";
import { AnnualReturnImplementationRoutingModule } from "./annual-return-filling.routing.module";

@NgModule({
    imports:[
        RouterModule,
        CommonModule,
        AnnualReturnImplementationRoutingModule,
        ReactiveFormsModule,
        SharedModule,
         FormsModule
    ],
    declarations:[
       AnnualReturnMainComponent,
       AnnualReturnStepContainerComponent,
       AnnualReturnDashboardComponent
    ],
     exports: [  
    AnnualReturnMainComponent
  ],
    providers:[UntypedFormBuilder]
})
export class AnnualReturnImplementationModule{}