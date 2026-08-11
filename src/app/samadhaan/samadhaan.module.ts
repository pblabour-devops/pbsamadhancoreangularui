import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SamadhaanRoutingModule } from './samadhaan-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { WorkplaceDetailsComponent } from './complaints/employer-details/workplace-details/workplace-details.component';
import { EstablishmentDetailsComponent } from './complaints/employer-details/establishment-details/establishment-details.component';
import { GratuityClaimsComponent } from './complaints/gratuity-claims/gratuity-claims.component';
import { MbComplaintComponent } from './complaints/mb-complaint/mb-complaint.component';
import { ClaimUnderCodeOnWagesComponent } from './complaints/wages/claim-under-code-on-wages/claim-under-code-on-wages.component';
import { MinimumWagesNotPaidComponent } from './complaints/wages/minimum-wages-not-paid/minimum-wages-not-paid.component';
import { WagesWeeklydayComponent } from './complaints/wages/wages-weeklyday/wages-weeklyday.component';
import { WagesWorkingOvertimeComponent } from './complaints/wages/wages-working-overtime/wages-working-overtime.component';
import { WagesNotPaidAtAllComponent } from './complaints/wages/wages-not-paid-at-all/wages-not-paid-at-all.component';
import { WagesUnauthorisedDeductionComponent } from './complaints/wages/wages-unauthorised-deduction/wages-unauthorised-deduction.component';
import { NonPaymentBonusComponent } from './complaints/wages/non-payment-bonus/non-payment-bonus.component';
import { DetailsComponent } from './complaints/details/details.component';
import { SettlementDetailsComponent } from './complaints/recovery-of-money/settlement-details/settlement-details.component';
import { AwardDetailsComponent } from './complaints/recovery-of-money/award-details/award-details.component';
import { NoticePayDetailsComponent } from './complaints/recovery-of-money/notice-pay-details/notice-pay-details.component';
import { RetrenchmentCompensationDetailsComponent } from './complaints/recovery-of-money/retrenchment-compensation-details/retrenchment-compensation-details.component';
import { LayOffDetailsComponent } from './complaints/recovery-of-money/lay-off-details/lay-off-details.component';
import { ReviewComponent } from './complaints/review/review.component';
import { AppealComponent } from './complaints/appeal/appeal.component';
import { EmployerDetailsComponent } from './complaints/employer-details/employer-details/employer-details.component';
import { RecoveryOfMoneyGeneralDetailsComponent } from './complaints/recovery-of-money/recovery-of-money-general-details/recovery-of-money-general-details.component';
@NgModule({
  declarations: [ EmployerDetailsComponent, WorkplaceDetailsComponent, EstablishmentDetailsComponent, GratuityClaimsComponent, MbComplaintComponent, ClaimUnderCodeOnWagesComponent, MinimumWagesNotPaidComponent, WagesWeeklydayComponent, WagesWorkingOvertimeComponent, WagesNotPaidAtAllComponent, WagesUnauthorisedDeductionComponent, NonPaymentBonusComponent, DetailsComponent, SettlementDetailsComponent, AwardDetailsComponent, NoticePayDetailsComponent, RetrenchmentCompensationDetailsComponent, LayOffDetailsComponent, ReviewComponent, AppealComponent, RecoveryOfMoneyGeneralDetailsComponent],
  imports: [
    CommonModule,
    SamadhaanRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class SamadhaanModule { }
