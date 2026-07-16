import { NgModule } from "@angular/core";
import { UntypedFormBuilder, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { CommonLicenceService } from "./commonLicence-service";
import { CommonLicenceRoutingModule } from "./commonLicence.routing.module";
import { CommonModule } from "@angular/common";
import { AddUpdateGeneralDetailComponent } from "./add-update-general-detail/add-update-general-detail.component";
import { AddUpdateContractorDetailComponent } from './add-update-contractor-detail/add-update-contractor-detail.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
    imports:[
        RouterModule,
        CommonModule,
        CommonLicenceRoutingModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations:[
        AddUpdateGeneralDetailComponent,
        AddUpdateContractorDetailComponent,
        DetailComponent,
    ],
    providers:[UntypedFormBuilder, CommonLicenceService]
})
export class CommonLicenceModule{}