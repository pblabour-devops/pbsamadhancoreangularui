import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UntypedFormBuilder, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { BusinessEntityRoutingModule } from "./business-entity.routing.module";
import { BusinessEntityService } from "./business-entity.service";
import { BusinessEntityComponent } from "./business-entity-dashboard/business-entity.component";
import { BusinessEntityFormComponent } from "./business-entity-form/business-entity-form.component";


@NgModule({
    imports:[
        RouterModule,
        CommonModule,
        BusinessEntityRoutingModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations:[
        BusinessEntityComponent,
        BusinessEntityFormComponent
    ],
    providers:[UntypedFormBuilder, BusinessEntityService]
})
export class BusinessEntityModule{}