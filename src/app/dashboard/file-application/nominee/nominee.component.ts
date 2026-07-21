import { Component } from '@angular/core';
import { Category } from '../../dashboard-typed-models';

@Component({
  selector: 'app-nominee',
  standalone: false,
  templateUrl: './nominee.component.html',
  styleUrl: './nominee.component.css',
})
export class NomineeComponent {

  categories: Category[] = [
    {
      title: 'Payment Related',
      issues: [
        {
          id: 1,
          label: 'Non payment/less payment of gratuity /Non payment of Interest for Delayed payment of Gratuity',
          hasInfo: true,
          info: ` Pre-requisites before filing claim (Nominee – Gratuity Claims)
        - Keep Nominee details ready (name, relationship with employee, contact details, address)
        - Keep Worker / Employee details ready (name, gender, designation, employment details)
        - Keep permanent and correspondence address details ready (country, state, district, pincode)
        - Keep Employer / Contractor details ready (name, designation, address, contact details)
        - Keep Principal Employer / Establishment details ready (name, address, employment period, wage period)
        - Keep gratuity claim details ready (basis of claim)
        - Keep annexure details ready (applicant, employee, employer information, gratuity amount)
        `,
        },
        {
          id: 2,
          label: 'Complaint for non-payment of Maternity Benefits/Medical Bonus/Wages for leave due to Maternity/Termination from service due to maternity',
          hasInfo: true,
          info: `Pre-requisites before filing claim (Nominee – MB Complaint)
        - Keep Nominee details ready (name, relationship with employee, phone number)
        - Keep IP Card ready for upload
        - Keep Worker / Employee details ready (name, designation)
        - Keep Employer / Establishment details ready (employer/contractor name, designation, address, principal employer details, category)
        - Keep employment details ready (date of start, date of end, wage period)
        - Keep complaint details ready (discharge/dismissal or change in service conditions as per Code on Social Security, 2020)
        - Keep amount details ready (maternity benefit, medical bonus, wages for maternity leave)`
        },
      ],
    },
  ];
}
