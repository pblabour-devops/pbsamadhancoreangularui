import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUpdateGeneralDetailComponent } from './add-update-general-detail/add-update-general-detail.component';
import { AddUpdateEmployerDetailComponent } from '../establishment/add-update-employer-detail/add-update-employer-detail.component';
import { AddUpdateContractorDetailComponent } from './add-update-contractor-detail/add-update-contractor-detail.component';

import { AddUpdateMigrantWorkerDetailComponent } from './add-update-migrant-worker-detail/add-update-migrant-worker-detail.component';
import { DetailComponent } from './detail/detail.component';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
const appRoutes: Routes=[
    { path:'addupdategeneraldetail', component:AddUpdateGeneralDetailComponent },
    { path:'addupdateemployerdetail', component:AddUpdateEmployerDetailComponent },
    { path:'addupdatecontractordetail', component:AddUpdateContractorDetailComponent },
    { path:'addupdatemigrantdetail', component:AddUpdateMigrantWorkerDetailComponent },
    { path:'detail', component:DetailComponent },
    { path:'upload-document', component:UploadDocumentComponent }
];
@NgModule({
    imports:[
        RouterModule.forChild(appRoutes)
    ],
    exports:[RouterModule]
})
export class EstablishmentRoutingModule{}