import { Component } from '@angular/core';
import { ApplicationSummary } from '../dashboard-typed-models';

@Component({
  selector: 'app-track-application',
  templateUrl: './track-application.component.html',
  styleUrl: './track-application.component.css',
  standalone: false
})
export class TrackApplicationComponent {

  applicationSummaries: ApplicationSummary[] = [
    {
      title: 'Individual Application',
      total: 0,
      pending: 0,
      disposed: 0,
      iconBg: 'bg-icon-pink'
    },
    {
      title: 'Group of worker application',
      total: 0,
      pending: 0,
      disposed: 0,
      iconBg: 'bg-icon-blue'
    }
  ];
}
