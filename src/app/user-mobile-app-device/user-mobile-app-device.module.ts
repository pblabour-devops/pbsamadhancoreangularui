import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserMobileAppDeviceRoutingModule } from './user-mobile-app-device.routing.module';
//import { AddUpdateGeneralDetailComponent } from './add-update-general-detail/add-update-general-detail.component';
import { ReactiveFormsModule ,UntypedFormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserMobileAppDeviceService } from './user-mobile-app-device.service';
import { SharedModule } from '../shared/shared.module';
import { RegisterMobileDeviceComponent } from './register-mobile-device/register-mobile-device.component';
import { FormsModule } from '@angular/forms';
import { QrCodeModule } from 'ng-qrcode';
@NgModule({
    imports:[
        RouterModule,
        CommonModule,
        UserMobileAppDeviceRoutingModule,
        ReactiveFormsModule,
        SharedModule,
        FormsModule,
        QrCodeModule
    ],
    declarations:[
        //AddUpdateGeneralDetailComponent,
    
    RegisterMobileDeviceComponent
  ],
    providers:[UntypedFormBuilder, UserMobileAppDeviceService]
})
export class UserMobileAppDeviceModule{}
