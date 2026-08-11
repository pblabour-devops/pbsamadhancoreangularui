import { Component, OnInit } from '@angular/core';
import { Category, ComplaintCategory } from '../dashboard-typed-models';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { GenericFormModel } from 'src/app/generic-implementation/generic-form-builder.type';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { CommonOpsService } from 'src/app/shared/common-ops-service';

@Component({
  selector: 'app-file-application',
  templateUrl: './file-application.component.html',
  styleUrl: './file-application.component.css',
  standalone: false
})
export class FileApplicationComponent {
  selectedIssues!: any

 filingTypes: string[] = [
    'Self',
    'Nominee',
    'Legal Heir',
    'Legal Representative',
    'Authorized Representative',
  ];


  selectedFilingType = 'Self';



  constructor(
    private router : Router, 
    private commonOpsService: CommonOpsService){}


  selectedissue(){
    if(this.selectedIssues.length === 0) {
      alert('Please select at least one issue before proceeding.');
      return;
    }
    console.log('Selected Issues:', this.selectedIssues);
    if (this.selectedIssues.some(
      x => x.complaintCategoryType === 1 ||
          x.complaintCategoryType === 2 ||
          x.complaintCategoryType === 4
    )) {
      this.router.navigate(['/samadhaan/worker-details'], {
        queryParams: {
          info: this.commonOpsService.encodeQueryParamsInBase64({
            selectedIssues: this.selectedIssues.map(x => x.id).join(',')
          })
        }
      });
    } else {
      this.router.navigate(['/samadhaan/appeal'], {
        queryParams: {
          info: this.commonOpsService.encodeQueryParamsInBase64({
            selectedIssues: this.selectedIssues.map(x => x.id).join(',')
          })
        }
      });
    }
  }

  setSelectedIssues(event){
  this.selectedIssues = event;
  console.log('selected issue', this.selectedIssues)
  }

}
