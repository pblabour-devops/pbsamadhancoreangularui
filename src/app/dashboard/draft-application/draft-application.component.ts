import { Component } from '@angular/core';
import { ApplicationSummary } from '../dashboard-typed-models';

@Component({
  selector: 'app-draft-application',
  templateUrl: './draft-application.component.html',
  styleUrl: './draft-application.component.css',
  standalone: false
})
export class DraftApplicationComponent {
  applicationSummaries: ApplicationSummary[] = [
    {
      title: 'Individual Application',
      total: 0,
      pending: 0,
      disposed: 0,
      icon: 'icon-file-text',
      iconBg: 'bg-icon-pink'
    },
    {
      title: 'Group of worker application',
      total: 0,
      pending: 0,
      disposed: 0,
      icon: 'icon-users',
      iconBg: 'bg-icon-blue'
    }
  ];
}
