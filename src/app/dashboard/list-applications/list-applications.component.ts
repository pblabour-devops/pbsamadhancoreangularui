import { Component } from '@angular/core';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';

@Component({
  selector: 'app-list-applications',
  standalone: false,
  templateUrl: './list-applications.component.html',
  styleUrl: './list-applications.component.css',
})
export class ListApplicationsComponent {

  allApplications: any[] = [];
  filteredApplications: any[] = [];
  pagedApplications: any[] = [];

  searchText: string = '';

  // Pagination state
  pageSize = 10;
  currentPage = 1;
  totalCount = 0;
  pageSizeOptions = [10, 25, 50, 100];
  disposedCount : number

  isLoading = true;

  constructor(
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private commonOpsService: CommonOpsService
  ) {}

  ngOnInit(): void {
    this.loadAllApplications();
  }

  loadAllApplications(): void {
    this.isLoading = true;
    this.appHttpRequestHandlerService
      .httpGet({}, 'Complaints', 'getAllApplications')
      .subscribe({
        next: (data: any) => {
          this.allApplications = data?.responseDataModel || [];
          this.filteredApplications = [...this.allApplications];
          this.totalCount = this.filteredApplications.length;
          this.disposedCount = this.totalCount;
          this.setPage(1);
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching applications', err);
          this.isLoading = false;
        }
      });
  }


  onSearchChange(): void {
    // const term = this.searchText.trim().toLowerCase();

    // if (!term) {
    //   this.filteredApplications = [...this.allApplications];
    // } else {
    //   this.filteredApplications = this.allApplications.filter(app =>
    //     app.publicAppRefNum?.toLowerCase().includes(term) ||
    //     this.getStatusText(app.applicationLifeCycleStatusType).toLowerCase().includes(term) ||
    //     this.getApplicantName(app).toLowerCase().includes(term)
    //   );
    // }

    // this.totalCount = this.filteredApplications.length;
    // this.setPage(1);
  }

  setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedApplications = this.filteredApplications.slice(startIndex, endIndex);
  }

  onPageSizeChange(): void {
    this.setPage(1);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.setPage(this.currentPage + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalCount / this.pageSize) || 1;
  }

  get startRecord(): number {
    return this.totalCount === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
  }

  get endRecord(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalCount);
  }

  getApplicantName(app: any): string {
    return app.workerDetail?.name || '-';
  }

  getApplicationCategory(app: any): string {
    // ⚠️ Static/placeholder — see note below
    return '-';
  }

  getStatusBadgeClass(statusType: number): any {
    return
    // switch (statusType) {
    //   case ApplicationLifeCycleStatusTypeEnum.DISPOSED: return 'badge-disposed';
    //   case ApplicationLifeCycleStatusTypeEnum.REJECTED: return 'badge-rejected';
    //   case ApplicationLifeCycleStatusTypeEnum.UNDER_REVIEW: return 'badge-pending';
    //   default: return 'badge-default';
    // }
  }

  onView(app: any): void {
    console.log('View application', app.appId);
    // TODO: navigate to view/detail page
  }

  onFeedback(app: any): void {
    console.log('Feedback for application', app.appId);
    // TODO: open feedback modal or navigate
  }
}
