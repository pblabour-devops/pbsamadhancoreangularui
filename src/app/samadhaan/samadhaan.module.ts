import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SamadhaanRoutingModule } from './samadhaan-routing.module';
import { EmployerContractorDetailsComponent } from './complaints/employer-details/employer-contractor-details/employer-contractor-details.component';
import { EmployerDetailsComponent } from './complaints/employer-details/employer-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { WorkplaceDetailsComponent } from './complaints/employer-details/workplace-details/workplace-details.component';
import { EstablishmentDetailsComponent } from './complaints/employer-details/establishment-details/establishment-details.component';
import { GratuityClaimsComponent } from './complaints/gratuity-claims/gratuity-claims.component';
import { MbComplaintComponent } from './complaints/mb-complaint/mb-complaint.component';
import { RecoverOfMoneyComponent } from './complaints/recover-of-money/recover-of-money.component';
import { ClaimUnderCodeOnWagesComponent } from './complaints/wages/claim-under-code-on-wages/claim-under-code-on-wages.component';
import { WagesComponent } from './complaints/wages/wages.component';
import { MinimumWagesNotPaidComponent } from './complaints/wages/minimum-wages-not-paid/minimum-wages-not-paid.component';


@NgModule({
  declarations: [EmployerContractorDetailsComponent, EmployerDetailsComponent, WorkplaceDetailsComponent, EstablishmentDetailsComponent, GratuityClaimsComponent, MbComplaintComponent, RecoverOfMoneyComponent, ClaimUnderCodeOnWagesComponent, WagesComponent, MinimumWagesNotPaidComponent],
  imports: [
    CommonModule,
    SamadhaanRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class SamadhaanModule { }
