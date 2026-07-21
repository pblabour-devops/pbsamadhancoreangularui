import { Component } from '@angular/core';
import { Category } from '../../dashboard-typed-models';

@Component({
  selector: 'app-legal-representative',
  standalone: false,
  templateUrl: './legal-representative.component.html',
  styleUrl: './legal-representative.component.css',
})
export class LegalRepresentativeComponent {
  categories: Category[] = [
    {
      title: 'Payment Related',
      issues: [
        {
          id: 1,
          label: 'Complaint for non-payment of Maternity Benefits/Medical Bonus/Wages for leave due to Maternity/Termination from service due to maternity',
          hasInfo: true,
          info: `Pre-requisites before filing claim (Legal Practitioner – MB Complaint)
          - Keep Legal Practitioner details ready (name, designation, phone number)
          - Keep Worker / Employee details ready (name, designation, gender, mobile number)
          - Keep Employer / Establishment details ready (employer/contractor name, designation, address, principal employer details, category)
          - Keep employment details ready (date of start, date of end, wage period)
          - Keep complaint details ready (discharge/dismissal or change in service conditions as per Code on Social Security, 2020)
          - Keep amount details ready (maternity benefit, medical bonus, wages for maternity leave)
        `,
        }
      ],
    },
  ];
}
