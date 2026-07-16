import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ApplicationDocumentsComponent } from "./application-documents/application-documents.component";
import { ApplicationFileUploadComponent } from "./application-file-upload/application-file-upload.component";
// import { EstablishmentRegistrationDetailsComponent } from "./application-forms-detail-pages/establishment-registration-details/establishment-registration-details.component";

const appRoutes: Routes=[
    { path:'appfileupload', component: ApplicationFileUploadComponent},
    { path:'appdocuments', component: ApplicationDocumentsComponent},
    
];
@NgModule({
    imports:[
        RouterModule.forChild(appRoutes)
    ],
    exports:[RouterModule]
})
export class SharedRoutingModule{}