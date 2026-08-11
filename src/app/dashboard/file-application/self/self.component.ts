import { Component, EventEmitter, Output } from '@angular/core';
import { Category, ComplaintCategory } from '../../dashboard-typed-models';
import { takeUntil } from 'rxjs/operators';
import { GenericFormModel } from 'src/app/generic-implementation/generic-form-builder.type';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-self',
  standalone: false,
  templateUrl: './self.component.html',
  styleUrl: './self.component.css',
})
export class SelfComponent {
  @Output() selectedIssueEventEmitter = new EventEmitter()
  categories: any[] = [];
  selectedIssues: number[] = [];
  ngUnsubscribe = new Subject<void>();

  constructor(
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
  ) {}

  ngOnInit(): void {
    this.getComplaintCategories();
  }

  getComplaintCategories(): void {

    this.appHttpRequestHandlerService.httpGet(
      {}, "Complaints", "getComplaintsCategories").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericFormModel<ComplaintCategory[]>) => {
        console.log('data', data)

        const categoryNames: { [key: number]: string } = {
          1: 'Payment Related',
          2: 'Job(Service Condition) Related',
          3: 'File Appeal',
          4: 'Penalty/Composition'
        };

        const groupedCategories: any[] = [];
        let isFirstIssueAssigned = false;   // ✅ track first issue globally

        Object.keys(categoryNames).forEach(key => {

          const type = +key;

          groupedCategories.push({
            title: categoryNames[type],
            issues: data.formModel
              .filter(x => x.complaintCategoryType === type)
              .map(x => {
                const issue = {
                  id: x.id,
                  label: x.complaintTitle,
                  hasInfo: x.hasInfo,
                  info: x.info,
                  disabled: 0,
                  complaintCategoryType : x.complaintCategoryType
                };

                if (!isFirstIssueAssigned) {
                  isFirstIssueAssigned = true;   
                }

                return issue;
              })
          });

        });

        this.categories = groupedCategories;
        console.log('Fetched Complaint Categories:', this.categories);

      });
  }

  toggleIssue(issue: any): void {
    console.log('issue', issue);
    const index = this.selectedIssues.indexOf(issue.id);

    if (index > -1) {
      this.selectedIssues.splice(index, 1);
    } else {
      this.selectedIssues.push(issue);
      console.log('selected issue in child', this.selectedIssues)
      this.selectedIssueEventEmitter.emit(this.selectedIssues)
    }
  }

  check(id: number): boolean {
    return this.selectedIssues.includes(id);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}