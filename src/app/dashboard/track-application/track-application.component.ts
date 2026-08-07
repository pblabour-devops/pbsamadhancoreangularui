import { Component } from '@angular/core';
import { ApplicationSummary } from '../dashboard-typed-models';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';

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

    constructor(private appHttpRequestHandlerService: AppHttpRequestHandlerService) {}
  

    ngAfterViewInit(): void {
    this.appHttpRequestHandlerService.httpGet({}, "Complaints", "getAllApplications")
      .subscribe((data: any) => {
        console.log('data', data)
        this.applicationSummaries[0].total = data.responseDataModel.length
        this.applicationSummaries[0].disposed = data.responseDataModel.length
        // this.applicationSummaries = data.formModel;
      });
  }
}
