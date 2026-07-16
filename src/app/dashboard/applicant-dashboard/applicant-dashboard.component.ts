import { Component, ViewEncapsulation, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil, finalize } from "rxjs/operators";
import { GenericFormModel } from "src/app/generic-implementation/generic-form-builder.type";
import { AppHttpRequestHandlerService } from "src/app/shared/app-http-request-handler.service";



@Component({
  selector: 'app-applicant-dashboard',
  templateUrl: './applicant-dashboard.component.html',
  styleUrls: ['./applicant-dashboard.component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: false
})
export class ApplicantDashboardComponent  {

  panels = [
    {
      title: 'Filing an Application as self:',
      isOpen: false,
      points: [
        'Select "Self" option',
        'Choose appropriate issue and fill out the form accordingly',
        'For each selected issue, a unique Application ID will be generated after the final submission of the form.',
        'For each selected issue, a unique Application ID will be generated after the final submission of the form.'
      ]
    },
    {
      title: 'Filing an Application as a Group of workers:',
      isOpen: false,
      points: [
        'Before filing an application as a Group of Workers/Employees, a group must be created.',
        'Navigate to the "Create Group" option from the side menu.',
        'While creating the group, there must be a minimum of Five workers representatives.',
        'Each workers representative must verify his/her mobile number and email through OTP.',
        'Select "Group of Workers" as the filing category.',
        'Next from the side menu, select "File Application" and then choose "group of workers" Tab',
        'Choose the appropriate issue from the available options.',
        'Fill in the requisite details in the form.',
        'After final submission, a unique Application ID will be generated.'
      ]
    },
    {
      title: 'Filing an Application as a Legal heir / Legal Practitioner/ Authorized Representative/ Nominee',
      isOpen: false,
      points: [
        'Select Legal heir / Legal Practitioner/ Authorized Representative/ Nominee option.',
        'Then enter the details of the applicant.',
        'Pick the relevant Category (issue) and fill out the form accordingly.',
        'For each selected Category (issue), a unique Application ID will be generated, after final submission',
        'Users can preview and edit the application before final submission.'
      ]
    }
  ];

  togglePanel(index: number): void {
    this.panels[index].isOpen = !this.panels[index].isOpen;
  }
}


       
    





