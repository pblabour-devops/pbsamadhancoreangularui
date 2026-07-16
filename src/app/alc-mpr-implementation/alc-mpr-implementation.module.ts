import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UntypedFormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AlcMprMainComponent } from "./alc-mpr-main/alc-mpr-main.component";
import { AlcMprStepContainerComponent } from "./alc-mpr-step-container/alc-mpr-step-container.component";
import { AlcMprImplementationRoutingModule } from "./alc-mpr-implementation.routing.module";

 @NgModule({
    imports:[
        RouterModule,
        CommonModule,
        AlcMprImplementationRoutingModule,
        ReactiveFormsModule,
        SharedModule,
         FormsModule
    ],
    declarations:[
       AlcMprMainComponent,
       AlcMprStepContainerComponent
    ],
     exports: [  
    AlcMprMainComponent
  ],
    providers:[UntypedFormBuilder]
})
export class AlcMprImplementationModule{}