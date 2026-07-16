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
export class FileApplicationComponent implements OnInit {
 filingTypes: string[] = [
    'Self',
    'Nominee',
    'Legal Heir',
    'Legal Representative',
    'Authorized Representative',
    'Group of Workers'
  ];

  ngUnsubscribe = new Subject<void>();

  selectedFilingType = 'Self';

  categories: Category[] = [];

  selectedIssues: number[] = [];

  constructor(
    private appHttpRequestHandlerService: AppHttpRequestHandlerService, 
    private router : Router, 
    private commonOpsService: CommonOpsService){}

  ngOnInit(): void {
    this.getComplaintCategories();  
  }

  getComplaintCategories(): void {

    this.appHttpRequestHandlerService.httpGet(
      {}, "Complaints", "getComplaintsCategories").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericFormModel<ComplaintCategory[]>) => {

        const categoryNames: { [key: number]: string } = {
          1: 'Payment Related',
          2: 'Job(Service Condition) Related',
          3: 'File Appeal',
          4: 'Penalty/Composition'
        };

        const groupedCategories: Category[] = [];

        Object.keys(categoryNames).forEach(key => {

          const type = +key;

          groupedCategories.push({
            title: categoryNames[type],
            issues: data.formModel
              .filter(x => x.complaintCategoryType === type)
              .map(x => ({
                id: x.id,
                label: x.complaintTitle,
                hasInfo: true
              }))
          });

        });

        this.categories = groupedCategories;
        console.log('Fetched Complaint Categories:', this.categories);

      });
}

  toggleIssue(id: number): void {
  const index = this.selectedIssues.indexOf(id);

    if (index > -1) {
      this.selectedIssues.splice(index, 1);
    } else {
      this.selectedIssues.push(id);
    }
  }

  check(id: number): boolean {
  return this.selectedIssues.includes(id);
}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  selectedissue(){
    if(this.selectedIssues.length === 0) {
      alert('Please select at least one issue before proceeding.');
      return;
    }
    this.router.navigate(['/samadhaan/worker-details'], {queryParams: { info: this.commonOpsService.encodeQueryParamsInBase64({ selectedIssues: this.selectedIssues.join(',') }) } });
  }

}
