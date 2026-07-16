import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttachDseWithAppComponent } from './attach-dse-with-app/attach-dse-with-app.component';
import { RegisterDigitalSignatureComponent } from './register-digital-signature/register-digital-signature.component';
const appRoutes: Routes=[
    { path:'register', component:RegisterDigitalSignatureComponent },
    { path:'sign_application', component:AttachDseWithAppComponent }
];
@NgModule({
    imports:[
        RouterModule.forChild(appRoutes)
    ],
    exports:[RouterModule]
})
export class DigitalSignatureRoutingModule{}