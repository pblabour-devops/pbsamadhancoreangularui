import { Component, OnInit } from '@angular/core';
import { Category, ComplaintCategory, IComplainantTypeComplaintTypeMapping } from '../dashboard-typed-models';
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
  selectedIssues: any[] = []
  categories: any[] = [];
 filingTypes: any[]
  public ComplainantType ={
    SELF : 1,
    NOMINEE : 2,
    LEGAL_HEIR : 3,
    LEGAL_REPRESENTATIVE : 4,
    AUTHORIZED_REPRESENTATIVE : 5,
    GROUP_OF_WORKERS : 6,
}
  
  selectedFilingType = 1;

  protected ngUnsubscribe: Subject<void> = new Subject<void>();


  constructor(
    private router : Router, 
    private commonOpsService: CommonOpsService,
    private appHttpRequestHandlerService : AppHttpRequestHandlerService){}

    
  ngAfterViewInit() {
    this.getComplainantComplaints(this.ComplainantType.SELF);
  }

 getComplainantComplaints(complainantType: number) {
  this.appHttpRequestHandlerService
    .httpGet(
      { complainantType: complainantType },
      "Complaints",
      "getComplainantComplaints"
    )
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: GenericFormModel<any>) => {

      this.filingTypes =
        data.enumTemplateLists.find(
          e => e.selectListTypeCode == 'ComplainantTypeEnum'
        ).selectListItems;

      console.log('data', data);

      const categoryNames: { [key: number]: string } = {
        1: 'Payment Related',
        2: 'Job(Service Condition) Related',
        3: 'File Appeal',
        4: 'Penalty/Composition'
      };

      const groupedCategories: any[] = [];

      Object.keys(categoryNames).forEach(key => {

        const type = +key;

        const issues = data.formModel
          .filter(x => x.complaintCategoryType === type)
          .map(x => ({
            id: x.id,
            label: x.complaintTitle,
            hasInfo: x.hasInfo,
            info: x.info,
            disabled: 0,
            complaintCategoryType: x.complaintCategoryType
          }));

        if (issues.length > 0) {
          groupedCategories.push({
            title: categoryNames[type],
            issues: issues
          });
        }

      });

      this.categories = groupedCategories;

      console.log('grouped categories', this.categories);
    });
}

  toggleComplaint(complanant){
    this.getComplainantComplaints(complanant.value);
    console.log('complanant', complanant);
  }

  toggleIssue(issue: any): void {
    console.log('issue', issue);
    const index = this.selectedIssues.indexOf(issue.id);

    if (index > -1) {
      this.selectedIssues.splice(index, 1);
    } else {
      this.selectedIssues.push(issue);
    }
  }
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

  ngOnDestroy() {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
    }

}
