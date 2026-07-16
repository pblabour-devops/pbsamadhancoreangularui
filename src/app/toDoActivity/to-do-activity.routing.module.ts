import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ToDoActivityViewerComponent } from "./to-do-activity-viewer/to-do-activity-viewer.component";
import { TicketManagerComponent } from "./dashboards/ticket-manager/ticket-manager.component";
import { ServiceWiseActivityListViewerComponent } from "./dashboards/service-wise-activity-list-viewer/service-wise-activity-list-viewer.component";

const appRoutes: Routes=[
    { path:'activity-viewer', component: ToDoActivityViewerComponent},
    { path:'activity-ticket-manager', component: TicketManagerComponent},
    { path:'service-wise-activity-viewer', component: ServiceWiseActivityListViewerComponent}
    
    
];
@NgModule({
    imports:[
        RouterModule.forChild(appRoutes)
    ],
    exports:[RouterModule]
})
export class ToDoActivityRoutingModule{}

