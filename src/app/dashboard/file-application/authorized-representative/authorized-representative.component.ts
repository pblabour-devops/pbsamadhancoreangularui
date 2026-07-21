import { Component } from '@angular/core';
import { Category } from '../../dashboard-typed-models';

@Component({
  selector: 'app-authorized-representative',
  standalone: false,
  templateUrl: './authorized-representative.component.html',
  styleUrl: './authorized-representative.component.css',
})
export class AuthorizedRepresentativeComponent {
categories: Category[] = [
    {
      title: 'Payment Related',
      issues: [
        {
          id: 1,
          label: 'Application for recovery of money due from employer under section 59(I) of IR Code',
          hasInfo: true,
          info: `Pre-requisites before filing application
- Keep Authorized Representative details ready (name, designation, contact)
- Keep Authorization document ready (PDF, max 5 MB)
- Keep Employer / Establishment details (with or without contractor)
- Keep employment dates ready
- Keep Demand Notice details (date and document)
- Identify basis of claim
- Prepare claim details (dates, amounts, justification)
- Keep supporting documents ready (PDF, max 5 MB)
        `,
        }
      ],
    },
  ];
}
