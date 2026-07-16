import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaymentsRoutingModule } from './payments.routing.module';
import { ReactiveFormsModule ,UntypedFormBuilder, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaymentsService } from './payments-service';
import { SharedModule } from '../shared/shared.module';
import { AppfeecalculatorComponent } from './appfeecalculator/appfeecalculator.component';
import { AppFeePaymentInitiateTerminalComponent } from './app-fee-payment-initiate-terminal/app-fee-payment-initiate-terminal.component';
import { AppFeePaymentCompleteTerminalComponent } from './app-fee-payment-complete-terminal/app-fee-payment-complete-terminal.component';
import { FeeVerificationManagerComponent } from './fee-verification-manager/fee-verification-manager.component';
import { SanitizeHtmlPipe } from '../pipes/sanitize-html.pipe';
import { BuildingPlanHUD_MakeRaisedFeeComponent } from './buildingPlanHUD-make-raised-fees/buildingPlanHUD-make-raised-fees.component';
import { BuildingPlanHUD_Raise_FeeComponent } from './buildingPlanHUD-raise-fee/buildingPlanHUD-raise-fee.component';
import { TreasuryWisePaymentManagerComponent } from './treasury-wise-payment-manager/treasury-wise-payment-manager.component';
import { RaisedFeeDetailsComponent } from './raised-fee-details/raised-fee-details.component';
import { FeeReceiptComponent } from './fee-receipt/fee-receipt.component';
import { PendingTransactionsListComponent } from './pending-transactions-list/pending-transactions-list.component';
import { AppRaiseFeeComponent } from './app-raise-fee/app-raise-fee.component';
import { AppMakeRaisedFeesComponent } from './app-make-raised-fees/app-make-raised-fees.component';
import { AppTreasuryWisePaymentManagerComponent } from './app-treasury-wise-payment-manager/app-treasury-wise-payment-manager.component';
import { EstablishmentWisePaymentDetailsComponent } from './establishment-wise-payment-details/establishment-wise-payment-details.component';
@NgModule({
    imports:[
        RouterModule,
        CommonModule,
        PaymentsRoutingModule,
        ReactiveFormsModule,
        SharedModule,
        FormsModule
    ],
    declarations:[
    AppfeecalculatorComponent,
    AppFeePaymentInitiateTerminalComponent,
    AppFeePaymentCompleteTerminalComponent,
    FeeVerificationManagerComponent,
    SanitizeHtmlPipe,
    BuildingPlanHUD_MakeRaisedFeeComponent,
    BuildingPlanHUD_Raise_FeeComponent,
    TreasuryWisePaymentManagerComponent,
    FeeReceiptComponent,
    PendingTransactionsListComponent,
    AppRaiseFeeComponent,
    AppMakeRaisedFeesComponent,
    AppTreasuryWisePaymentManagerComponent,
    EstablishmentWisePaymentDetailsComponent
  ],
    providers:[UntypedFormBuilder, PaymentsService]
})
export class PaymentsModule{}
