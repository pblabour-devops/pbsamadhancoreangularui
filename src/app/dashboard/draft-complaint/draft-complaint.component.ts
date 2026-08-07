import { Component } from '@angular/core';
import { GenericFormModel } from 'src/app/generic-implementation/generic-form-builder.type';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { ApplicationSummary } from '../dashboard-typed-models';

@Component({
  selector: 'app-draft-complaint',
  standalone: false,
  templateUrl: './draft-complaint.component.html',
  styleUrl: './draft-complaint.component.css',
})
export class DraftComplaintComponent {

   applicationSummaries: ApplicationSummary[] = [
    {
      title: 'Individual Application',
      total: 0,
      pending: 0,
      disposed: 0,
      icon: 'icon-bell',
      iconBg: 'bg-icon-pink'
    },
    {
      title: 'Group of worker application',
      total: 0,
      pending: 0,
      disposed: 0,
      icon: 'icon-file-text',
      iconBg: 'bg-icon-blue'
    }
  ];

  constructor(private appHttpRequestHandlerService: AppHttpRequestHandlerService) {}

  ngAfterViewInit(): void {
    this.appHttpRequestHandlerService.httpGet({}, "Complaints", "getComplaintsDraftApplication")
      .subscribe((data: any) => {
        console.log('data', data)
        this.applicationSummaries[0].total = data.responseDataModel.length
        // this.applicationSummaries = data.formModel;
      });
  }

}
