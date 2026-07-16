import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterMobileDeviceComponent } from './register-mobile-device/register-mobile-device.component';

const appRoutes: Routes=[
    { path:'register_mobile_device', component:RegisterMobileDeviceComponent },
];
@NgModule({
    imports:[
        RouterModule.forChild(appRoutes)
    ],
    exports:[RouterModule]
})
export class UserMobileAppDeviceRoutingModule{}