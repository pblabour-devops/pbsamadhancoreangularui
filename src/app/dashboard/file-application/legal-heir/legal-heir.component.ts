import { Component } from '@angular/core';
import { Category } from '../../dashboard-typed-models';

@Component({
  selector: 'app-legal-heir',
  standalone: false,
  templateUrl: './legal-heir.component.html',
  styleUrl: './legal-heir.component.css',
})
export class LegalHeirComponent {
  categories: Category[] = [
    {
      title: 'Payment Related',
      issues: [
        {
          id: 1,
          label: 'Non payment/less payment of gratuity /Non payment of Interest for Delayed payment of Gratuity',
          hasInfo: true,
          info: `Pre-requisites before filing claim (Legal Heir – Gratuity Claims)
        - Keep Legal Heir details ready (name, relationship with employee, contact details, address)
        - Keep Legal Heir Certificate ready for upload
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
          label: 'Application for recovery of money due from employer under section 59(I) of IR Code',
          hasInfo: true,
          info: `Pre-requisites before filing application
          - Keep Legal Heir details ready (name, contact, relationship)
          - Keep Legal Heir Certificate ready (PDF, max 5 MB)
          - Keep employee name & designation ready
          - Keep Employer / Establishment details (with or without contractor)
          - Keep employment dates ready
          - Keep Demand Notice details (date and document)
          - Identify basis of claim
          - Prepare claim details (dates, amounts, justification)
          - Keep supporting documents ready (PDF, max 5 MB)
          `
        },
      ],
    },
  ];
}
