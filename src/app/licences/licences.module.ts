import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UntypedFormBuilder, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { LicenceRoutingModule } from "./licences.routing.module";
import { FormsModule } from '@angular/forms'; 
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from "ngx-pagination";
import { FactoryQuestionnaireComponent } from './factory/factory-questionnaire/factory-questionnaire.component';
import { AddUpdateFactoryGeneralDetailComponent } from './factory/add-update-factory-general-detail/add-update-factory-general-detail.component';
import { FactoryLicenceDetailComponent } from "./factory/detail/detail.component";
import { AddUpdateOccupierDetailComponent } from './factory/add-update-occupier-detail/add-update-occupier-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
   imports:[
        RouterModule,
        CommonModule,
        LicenceRoutingModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        NgbTimepickerModule,
        NgxPaginationModule,
        
    ],
    declarations:[
        FactoryQuestionnaireComponent,
        AddUpdateFactoryGeneralDetailComponent,
        FactoryLicenceDetailComponent,
        AddUpdateOccupierDetailComponent,
    ],
    providers:[UntypedFormBuilder]
})
export class LicenceModule{}