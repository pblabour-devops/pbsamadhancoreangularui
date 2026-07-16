import { UntypedFormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LbrMprMainComponent } from "./lbr-mpr-main/lbr-mpr-main.component";
import { LbrMprStepContainerComponent } from "./lbr-mpr-step-container/lbr-mpr-step-container.component";
import { SharedModule } from "../shared/shared.module";
import { LbrMprImplementationRoutingModule } from "./lbr-mpr-implementation.routing.module";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

@NgModule({
    imports:[
        RouterModule,
        CommonModule,
        LbrMprImplementationRoutingModule,
        ReactiveFormsModule,
        SharedModule,
         FormsModule
    ],
    declarations:[
       LbrMprMainComponent,
       LbrMprStepContainerComponent
    ],
     exports: [  
    LbrMprMainComponent
  ],
    providers:[UntypedFormBuilder]
})
export class LbrMprImplementationModule{}
