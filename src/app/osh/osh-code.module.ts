import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UntypedFormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule, NgbTimepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxPaginationModule } from "ngx-pagination";
import { SharedModule } from "../shared/shared.module";
import { OshCodeRoutingModule } from "./osh-code.routing.module";
import { Form1RegistrationComponent } from './form1-registration/form1-registration.component';
import { Form1RegistrationFactoryDetailsComponent } from './form1-registration-factory-details/form1-registration-factory-details.component';
import { Form1RegistrationBocwDetailsComponent } from './form1-registration-bocw-details/form1-registration-bocw-details.component';
import { Form1RegistrationEmployeeDetailsComponent } from './form1-registration-employee-details/form1-registration-employee-details.component';
import { Form1RegistrationEpfoEsiDetailsComponent } from './form1-registration-epfo-esi-details/form1-registration-epfo-esi-details.component';
import { Form1RegistrationPrincipalEmployerDetailsComponent } from './form1-registration-principal-employer-details/form1-registration-principal-employer-details.component';
import { Form1RegistrationContractorsDetailsComponent } from './form1-registration-contractors-details/form1-registration-contractors-details.component';
import { Form1RegistrationEmployerDetailsComponent } from './form1-registration-employer-details/form1-registration-employer-details.component';
import { Form1RegistrationMotorTransportDetailsComponent } from './form1-registration-motor-transport-details/form1-registration-motor-transport-details.component';
import { Form1RegistrationDetailsComponent } from './form1-registration-details/form1-registration-details.component';

@NgModule({
   imports:[
        RouterModule,
        CommonModule,
        OshCodeRoutingModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        NgbTimepickerModule,
        NgxPaginationModule,
    ],
    declarations:[
    Form1RegistrationComponent,
    Form1RegistrationFactoryDetailsComponent,
    Form1RegistrationBocwDetailsComponent,
    Form1RegistrationEmployeeDetailsComponent,
    Form1RegistrationEpfoEsiDetailsComponent,
    Form1RegistrationPrincipalEmployerDetailsComponent,
    Form1RegistrationContractorsDetailsComponent,
    Form1RegistrationEmployerDetailsComponent,
    Form1RegistrationMotorTransportDetailsComponent,
    Form1RegistrationDetailsComponent
  ],
    providers:[UntypedFormBuilder]
})
export class OshCodeModule{}