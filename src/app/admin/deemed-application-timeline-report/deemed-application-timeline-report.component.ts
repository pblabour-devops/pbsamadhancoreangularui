import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DeemedApplicationTimeLineViewModel } from '../admin-type-models';



@Component({
    selector: 'app-deemed-application-timeline-report',
    templateUrl: './deemed-application-timeline-report.component.html',
    styleUrls: ['./deemed-application-timeline-report.component.css'],
    standalone: false
})
export class DeemedApplicationTimelineReportComponent implements OnInit {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  public applicationTimeLineData : DeemedApplicationTimeLineViewModel[];
  constructor(private appHttpRequestHandlerService: AppHttpRequestHandlerService,
               private fb: UntypedFormBuilder,
               private router: Router,
               public commonOpsService: CommonOpsService,
               private route: ActivatedRoute,
               private http: HttpClient) { }

  ngOnInit(): void {
    this.getDeemedApps();
  }

  getDeemedApps() {
        this.appHttpRequestHandlerService.httpGet({},"DeemedProcess", "getDeemedTimeLineApplications").pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data) => {
          this.applicationTimeLineData = data.responseDataModel;
          console.log(this.applicationTimeLineData)
      });
    }
  
}
