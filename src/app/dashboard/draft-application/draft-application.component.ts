import { AfterViewInit, Component } from '@angular/core';
import { ApplicationSummary, ComplaintCategory } from '../dashboard-typed-models';
import { GenericFormModel } from 'src/app/generic-implementation/generic-form-builder.type';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { Router } from '@angular/router';
import { CommonOpsService } from 'src/app/shared/common-ops-service';

@Component({
  selector: 'app-draft-application',
  templateUrl: './draft-application.component.html',
  styleUrl: './draft-application.component.css',
  standalone: false
})
export class DraftApplicationComponent {
 
  
  allApplications: any[] = [];
  pagedApplications: any[] = [];

  // Pagination state
  pageSize = 5;
  currentPage = 1;
  totalCount = 0;
  pageSizeOptions = [5, 10, 20, 50];

  isLoading = true;

  constructor(private appHttpRequestHandlerService: AppHttpRequestHandlerService, private router : Router, private commonOpsService: CommonOpsService) {}

  ngOnInit(): void {
    this.loadDraftApplications();
  }

  loadDraftApplications(): void {
    this.isLoading = true;
    this.appHttpRequestHandlerService
      .httpGet({}, 'Complaints', 'getComplaintsDraftApplication')
      .subscribe({
        next: (data: any) => {
          this.allApplications = data?.responseDataModel || [];
          this.totalCount = this.allApplications.length;
          this.setPage(1);
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching draft applications', err);
          this.isLoading = false;
        }
      });
  }

  setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedApplications = this.allApplications.slice(startIndex, endIndex);
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

  // ⚠️ STATIC placeholders — Category/SubCategory not present in API response yet
  getCategory(app: any): string {
    return '-';
  }

  getSubCategory(app: any): string {
    return 'Draft Application';
  }

  onEdit(app: any): void {
    console.log('Edit application', app);
    this.router.navigate(['/samadhaan/worker-details'], {
        queryParams: {
          info: this.commonOpsService.encodeQueryParamsInBase64({
            appRefId:app.appId,
            applicationType: 100001,
            applicationPurposeType: 0,
            projectSiteVersion: app.projectSiteVersion,
          }),
        },
      });
  }

  onDelete(app: any): void {
    console.log('Delete application', app.appId);
    // TODO: call delete API, then reload list
  }

}
