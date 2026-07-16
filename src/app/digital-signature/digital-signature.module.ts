import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DigitalSignatureRoutingModule } from './digital-signature.routing.module';
import { ReactiveFormsModule ,UntypedFormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterDigitalSignatureComponent } from './register-digital-signature/register-digital-signature.component';
import { DigitalSignatureService } from './digital-signature.service';
import { SharedModule } from '../shared/shared.module';
@NgModule({
    imports:[
        RouterModule,
        CommonModule,
        DigitalSignatureRoutingModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations:[
        RegisterDigitalSignatureComponent
    ],
    providers:[UntypedFormBuilder, DigitalSignatureService]
})
export class DigitalSignatureModule{}