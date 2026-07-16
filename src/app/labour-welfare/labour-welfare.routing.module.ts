import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FundDepositComponent } from "./fund-deposit/fund-deposit.component";
import { MakePaymentComponent } from "./make-payment/make-payment.component";

const appRoutes: Routes=[
    { path:'fund-deposit', component: FundDepositComponent },
    { path:'make-payment', component: MakePaymentComponent }

];
@NgModule({
    imports:[
        RouterModule.forChild(appRoutes)
    ],
    exports:[RouterModule]
})
export class LabourWelfareRoutingModule{}