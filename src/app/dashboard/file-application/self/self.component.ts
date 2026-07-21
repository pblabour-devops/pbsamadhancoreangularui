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
  categories: Category[] = [];
  selectedIssues: number[] = [];
  ngUnsubscribe = new Subject<void>();

  constructor(
  private appHttpRequestHandlerService: AppHttpRequestHandlerService, 
  ){}

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
    console.log('this is working')
  const index = this.selectedIssues.indexOf(id);

    if (index > -1) {
      this.selectedIssues.splice(index, 1);
    } else {
      this.selectedIssues.push(id);
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
