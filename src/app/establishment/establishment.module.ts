import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EstablishmentRoutingModule } from './establishment.routing.module';
import { AddUpdateGeneralDetailComponent } from './add-update-general-detail/add-update-general-detail.component';
import { ReactiveFormsModule ,UntypedFormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddUpdateEmployerDetailComponent } from '../establishment/add-update-employer-detail/add-update-employer-detail.component';
import { EstablishmentService } from './establishment-service';
import { SharedModule } from '../shared/shared.module';
import { AddUpdateContractorDetailComponent } from './add-update-contractor-detail/add-update-contractor-detail.component';
import { AddUpdateMigrantWorkerDetailComponent } from './add-update-migrant-worker-detail/add-update-migrant-worker-detail.component';
import { DetailComponent } from './detail/detail.component';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
@NgModule({
    imports:[
        RouterModule,
        CommonModule,
        EstablishmentRoutingModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations:[
        AddUpdateGeneralDetailComponent,
        AddUpdateEmployerDetailComponent,
        AddUpdateContractorDetailComponent,
        AddUpdateMigrantWorkerDetailComponent,
        DetailComponent,
        UploadDocumentComponent
    ],
    providers:[UntypedFormBuilder, EstablishmentService]
})
export class EstablishmentModule{}
