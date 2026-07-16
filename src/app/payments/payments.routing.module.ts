import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppfeecalculatorComponent } from './appfeecalculator/appfeecalculator.component';
import { AppFeePaymentInitiateTerminalComponent } from './app-fee-payment-initiate-terminal/app-fee-payment-initiate-terminal.component';
import { AppFeePaymentCompleteTerminalComponent } from './app-fee-payment-complete-terminal/app-fee-payment-complete-terminal.component';
import { BuildingPlanHUD_MakeRaisedFeeComponent } from './buildingPlanHUD-make-raised-fees/buildingPlanHUD-make-raised-fees.component';
import { BuildingPlanHUD_Raise_FeeComponent } from './buildingPlanHUD-raise-fee/buildingPlanHUD-raise-fee.component';
import { TreasuryWisePaymentManagerComponent } from './treasury-wise-payment-manager/treasury-wise-payment-manager.component';
import { FeeReceiptComponent } from './fee-receipt/fee-receipt.component';
import { PendingTransactionsListComponent } from './pending-transactions-list/pending-transactions-list.component';
import { AppRaiseFeeComponent } from './app-raise-fee/app-raise-fee.component';
import { AppMakeRaisedFeesComponent } from './app-make-raised-fees/app-make-raised-fees.component';
import { AppTreasuryWisePaymentManagerComponent } from './app-treasury-wise-payment-manager/app-treasury-wise-payment-manager.component';
import { FeeVerificationManagerComponent } from './fee-verification-manager/fee-verification-manager.component';
import { EstablishmentWisePaymentDetailsComponent } from './establishment-wise-payment-details/establishment-wise-payment-details.component';
const appRoutes: Routes=[
    { path:'appfeecalculator', component:AppfeecalculatorComponent },
    { path:'appfeepaymentinitiateterminal', component:AppFeePaymentInitiateTerminalComponent },
    { path:'appfeepayment_completeterminal', component:AppFeePaymentCompleteTerminalComponent },
    { path:'buildingplanhud_makeraisedfee', component:BuildingPlanHUD_MakeRaisedFeeComponent },
    { path:'buildingplanhudraisfee', component:BuildingPlanHUD_Raise_FeeComponent },
    { path:'TreasuryWisePaymentManager', component: TreasuryWisePaymentManagerComponent },
    { path:'fee-receipt', component: FeeReceiptComponent },
    { path:'pending-transactions', component: PendingTransactionsListComponent },
    { path:'app-raise-fee', component:AppRaiseFeeComponent },
    { path:'app-make-raised-fee', component:AppMakeRaisedFeesComponent },
    { path:'app-treasury-wise-payment-manager', component: AppTreasuryWisePaymentManagerComponent},
    { path:'fee-verification-manager', component: FeeVerificationManagerComponent},
    { path:'establishment-wise-payment-details', component: EstablishmentWisePaymentDetailsComponent}
];
@NgModule({
    imports:[
        RouterModule.forChild(appRoutes)
    ],
    exports:[RouterModule]
})
export class PaymentsRoutingModule{}