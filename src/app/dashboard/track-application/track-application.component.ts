import { Component } from '@angular/core';
import { ApplicationSummary } from '../dashboard-typed-models';

@Component({
  selector: 'app-track-application',
  templateUrl: './track-application.component.html',
  styleUrl: './track-application.component.css',
  standalone: false
})
export class TrackApplicationComponent {

  applicationSummaries = [
    {
      title: 'Individual Application',
      total: 0,
      pending: 0,
      disposed: 0,
      icon: 'icon-bell',
      iconBg: 'icon-bg-pink'
    },
    {
      title: 'Group of worker application',
      total: 0,
      pending: 0,
      disposed: 0,
      icon: 'icon-users',
      iconBg: 'icon-bg-blue'
    }
  ]
}
