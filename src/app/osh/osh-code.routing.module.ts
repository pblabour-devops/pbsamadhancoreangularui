import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Form1RegistrationComponent } from "./form1-registration/form1-registration.component";
import { Form1RegistrationEpfoEsiDetailsComponent } from "./form1-registration-epfo-esi-details/form1-registration-epfo-esi-details.component";
import { Form1RegistrationEmployerDetailsComponent } from "./form1-registration-employer-details/form1-registration-employer-details.component";
import { Form1RegistrationPrincipalEmployerDetailsComponent } from "./form1-registration-principal-employer-details/form1-registration-principal-employer-details.component";
import { Form1RegistrationContractorsDetailsComponent } from "./form1-registration-contractors-details/form1-registration-contractors-details.component";
import { Form1RegistrationMotorTransportDetailsComponent } from "./form1-registration-motor-transport-details/form1-registration-motor-transport-details.component";
import { Form1RegistrationDetailsComponent } from "./form1-registration-details/form1-registration-details.component";

const appRoutes: Routes=[
    { path:'form-1-registration', component: Form1RegistrationComponent },
    { path:'form-1-registration-epfo-esi', component: Form1RegistrationEpfoEsiDetailsComponent },
    { path:'form-1-registration-employer', component: Form1RegistrationEmployerDetailsComponent },
    { path:'form-1-registration-principal-employer', component: Form1RegistrationPrincipalEmployerDetailsComponent },
    { path:'form-1-registration-contractor', component: Form1RegistrationContractorsDetailsComponent },
    { path:'form-1-registration-motor-transport', component: Form1RegistrationMotorTransportDetailsComponent },
    { path:'form-1-registration-details', component: Form1RegistrationDetailsComponent }
];
@NgModule({
   imports:[
       RouterModule.forChild(appRoutes)
   ],
   exports:[RouterModule]
})
export class OshCodeRoutingModule{}