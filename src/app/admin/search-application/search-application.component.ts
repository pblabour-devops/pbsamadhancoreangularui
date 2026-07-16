import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, UntypedFormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { GenericResponseTemplateModel } from 'src/app/generic-implementation/generic-service-result-template';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { GetAdminDashboardDetailsViewModel, ISearchParms } from '../admin-type-models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationFeeDetailsViewModel } from 'src/app/dashboard/dashboard-typed-models';

@Component({
    selector: 'app-search-application',
    templateUrl: './search-application.component.html',
    styleUrls: ['./search-application.component.css'],
    standalone: false
})
export class SearchApplicationComponent implements OnInit, OnDestroy {

  protected ngUnsubscribe: Subject<void> = new Subject<void>();

  Input_Form: TForm<ISearchParms> = this.fb.group({
    searchParams: ['', Validators.required]
  }) as TForm<ISearchParms>;

  responseData: GetAdminDashboardDetailsViewModel | null = null;

  groupedLogs: any[] = [];

  isSubmitted: boolean = false;

  public feeDetails: any = [];

  selectedComment: string = '';

  lifeCycleDescription: any = {
    [-1]: { text: 'Not Submitted', class: 'secondary-pill' },
    [0]: { text: 'In Process', class: 'warning-pill' },
    [1]: { text: 'Approved', class: 'success-pill' },
    [2]: { text: 'Rejected', class: 'danger-pill' },
    [3]: { text: 'In Objection', class: 'warning-pill' },
    [4]: { text: 'Deregistered', class: 'info-pill' },
    [6]: { text: 'Deemed Completed', class: 'success-pill' },
    [11]: { text: 'Application Withdrawn', class: 'secondary-pill' },
    [12]: { text: 'Application Dormant', class: 'secondary-pill' },
    [13]: { text: 'Application Declined', class: 'danger-pill' }
  };

  get formControls() {
    return this.Input_Form.controls;
  }

  constructor(
    private fb: UntypedFormBuilder,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    public modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.Input_Form.valid) {
      this.appHttpRequestHandlerService.httpPost(this.Input_Form.value,"pbsamadhannetcoreapi.ViewModels.StatusApplicationParmsViewModel","Admin","SearchApplication").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.responseData = data.responseDataModel;
        this.groupLogsByAppId();
      });
    }
  }

  reset() {
    this.isSubmitted = false;
    this.responseData = null;
    this.groupedLogs = [];
    this.Input_Form.patchValue({
      searchParams: ''
    });
  }

  ViewFeeDetails(appRefId, longContent2) {
    this.modalService.open(longContent2, {
      scrollable: true,
      size: 'lg'
    });

    this.appHttpRequestHandlerService.httpGet(
      {
        appRefId: appRefId,
        appFormId: 0,
        nar: '',
        isLegacy: 0
      },
      "Dashboard",
      "getFeeDetailsByAppId"
    )
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: GenericResponseTemplateModel<ApplicationFeeDetailsViewModel>) => {

      this.feeDetails = data.responseDataModel;

    });

  }

  openCommentModal(content, comment: string) {

    this.selectedComment = comment;

    this.modalService.open(content, {
      centered: true,
      size: 'lg'
    });

  }

  groupLogsByAppId() {

    if (!this.responseData || !this.responseData.applicationActionLogs) {
      return;
    }

    const groups: any = {};

    this.responseData.applicationActionLogs.forEach((log: any) => {

      if (!groups[log.appId]) {
        groups[log.appId] = [];
      }

      groups[log.appId].push(log);

    });

    this.groupedLogs = Object.keys(groups).map(appId => ({
      appId: appId,
      logs: groups[appId]
    }));

  }

  ngOnDestroy() {

    this.ngUnsubscribe.next();

    this.ngUnsubscribe.complete();

  }

}