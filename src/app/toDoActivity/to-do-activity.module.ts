import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UntypedFormBuilder, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ToDoActivityViewerComponent } from "./to-do-activity-viewer/to-do-activity-viewer.component";
import { BrowserModule } from "@angular/platform-browser";
import { ToDoActivityRoutingModule } from "./to-do-activity.routing.module";
import { SafePipeModule } from "safe-pipe";
import { TicketManagerComponent } from './dashboards/ticket-manager/ticket-manager.component';
import { ServiceWiseActivityListViewerComponent } from './dashboards/service-wise-activity-list-viewer/service-wise-activity-list-viewer.component';

@NgModule({
    imports:[
        RouterModule,
        CommonModule,
        ToDoActivityRoutingModule,
        ReactiveFormsModule,
        SharedModule,
        SafePipeModule
    ],
    declarations:[
        ToDoActivityViewerComponent,
        TicketManagerComponent,
        ServiceWiseActivityListViewerComponent
    ],
    providers:[UntypedFormBuilder]
})
export class ToDoActivityModule{}