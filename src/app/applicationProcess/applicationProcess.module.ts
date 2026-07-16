import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UntypedFormBuilder, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ApplicationProcessService } from "./applicationProcess-service";
import { ProcessApplicationRoutingModule } from "./applicationProcess.routing.module";
import { ProcessApplicationWindowComponent } from "./process-application-window/process-application-window.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SafePipeModule } from "safe-pipe";
@NgModule({
    imports:[
        RouterModule,
        CommonModule,
        ProcessApplicationRoutingModule,
        ReactiveFormsModule,
        SharedModule,
        NgbModule,
        SafePipeModule
    ],
    declarations:[
        ProcessApplicationWindowComponent
  ],
    providers:[UntypedFormBuilder, ApplicationProcessService]
})
export class ApplicationProcessModule{}