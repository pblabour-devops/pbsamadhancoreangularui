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
import { DeemedapplicationDataViewModel } from '../admin-type-models';


@Component({
    selector: 'app-deemed-applications',
    templateUrl: './deemed-applications.component.html',
    styleUrls: ['./deemed-applications.component.css'],
    standalone: false
})
export class DeemedApplicationsComponent implements OnInit {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  pageSize = 10;
  currentPage = 1;
  totalPages = 0;
  dateOption: string = '1';
  filteredData: any[] = [];
  displayedData: any[] = [];
  selectedDate: string = new Date(Date.now()).toISOString().split('T')[0];
  deemedDate: string = this.selectedDate;
  public deemedapplicationData : DeemedapplicationDataViewModel[];
  constructor(private appHttpRequestHandlerService: AppHttpRequestHandlerService,
               private fb: UntypedFormBuilder,
               private router: Router,
               public commonOpsService: CommonOpsService,
               private route: ActivatedRoute,
               private http: HttpClient) { }

  ngOnInit(): void {
      this.getDeemedApps(this.deemedDate,"1");
  }

  getDeemedApps(selectedDate: string , type :string) {
      this.appHttpRequestHandlerService.httpGet({ deemedDate : selectedDate , type : type }, "DeemedProcess", "getDeemedApplications").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data) => {
        this.deemedapplicationData = data.responseDataModel;
    });
  }

  addOneDay(dateStr: string): string {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + 1);
  return date.toISOString().split('T')[0];
}

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updateDisplayedData();
  }

  updateDisplayedData() {
    const start = (this.currentPage - 1) * this.pageSize;
    this.displayedData = this.filteredData.slice(start, start + this.pageSize);
  }

   onDateChange(newDate: string) {
    this.deemedDate = newDate;
    this.getDeemedApps(this.deemedDate,"2")
  }


  onChange(event: any)
  {
    if(event == "1")
    {
      this.deemedDate = this.selectedDate;
      this.getDeemedApps(this.deemedDate,"1")
    }
    else  if(event == "2")
    {
      this.getDeemedApps(this.deemedDate,"2")
    }
    else  if(event == "3")
    {
      this.deemedDate = this.selectedDate;
      this.getDeemedApps(this.deemedDate,"3")
    }
  }

convertHoursToDaysHours(totalHours: number): string {
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;
  return `${days}.${hours}`;
}

  replaceTimeNames(originalText: string, index: number): string{
    return originalText.split('-')[index];
    
  }
  exportToExcel(): void {  
          const records = this.deemedapplicationData;
  
          const dataToExport = records.map((item: any, index: number) => ({
            'Sr. No': index + 1,
            'Service Name': item.serviceName,
            'File No': item.publicAppRefNum,
            'Ipin': item.invetPunjabiPin,
            'ApplicationId': item.invetPunjabiAppId,
            'EstablishmentName': item.establishmentName,
            'Current Pending With': item.currentPendingWith,
            'Submission Date': new Date(item.submissionDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }),
            'Deemed Date': new Date(item.deemedDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }),
            'Total Time (Days)': (item.totalTime / 24).toFixed(1),
            'Total Holiday Time (Days)': (item.totalHolidaysTime / 24).toFixed(1),
            'Total Weekends Time (Days)': (item.totalWeekEndsTime / 24).toFixed(1),
            'Total Objection Time (Days)': (item.totalObjectionTime / 24).toFixed(1),
            'Deemd In Time (Days)': (item.deemedInTime/ 24).toFixed(1),
            'Max Deemed TimeLine (Days)': (item.maxDeemedTime/ 24).toFixed(1),
            'Fee Status': item.isFeeApplicable == true ? "Pending" : "Paid",
          }));
  
          const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
          const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
          XLSX.writeFile(workbook, `DeemedApplication_Report.xlsx`);
    }

}
