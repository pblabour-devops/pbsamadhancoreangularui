import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkerDetailsComponent } from './complaints/worker-details/worker-details.component';
import { EmployerDetailsComponent } from './complaints/employer-details/employer-details.component';
import { GratuityClaimsComponent } from './complaints/gratuity-claims/gratuity-claims.component';
import { MbComplaintComponent } from './complaints/mb-complaint/mb-complaint.component';
import { ClaimUnderCodeOnWagesComponent } from './complaints/wages/claim-under-code-on-wages/claim-under-code-on-wages.component';
import { WagesComponent } from './complaints/wages/wages.component';
import { DetailsComponent } from './complaints/details/details.component';
import { RecoveryOfMoneyComponent } from './complaints/recovery-of-money/recovery-of-money.component';
import { ReviewComponent } from './complaints/review/review.component';
import { AppealComponent } from './complaints/appeal/appeal.component';

const routes: Routes = [
   {path : 'worker-details',component : WorkerDetailsComponent},
   {path : 'employer-details',component : EmployerDetailsComponent},
   {path : 'gratuity-claims',component : GratuityClaimsComponent},
   {path : 'mb-complaint',component : MbComplaintComponent},
   {path : 'recovery-of-money',component : RecoveryOfMoneyComponent},
   {path : 'wages',component : WagesComponent},
   {path : 'details',component : DetailsComponent},
   {path : 'review',component : ReviewComponent},
   {path : 'appeal',component : AppealComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SamadhaanRoutingModule {   
}
