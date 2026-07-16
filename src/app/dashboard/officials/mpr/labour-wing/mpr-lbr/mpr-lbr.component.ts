import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { CommonService } from 'src/app/common/common.service';
import { IDataTableParamsViewModel, IMPR_Factory_DashboardViewModel, IMPR_Labour_DashboardViewModel } from 'src/app/dashboard/dashboard-typed-models';
import { GenericResponseTemplateModel, GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { stepperJson } from 'src/app/LbrWingMpr/Lbr-Wing-Stepper-List';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { LbrMprMainComponent } from 'src/app/lbr-mpr-implementation/lbr-mpr-main/lbr-mpr-main.component';

@Component({
    selector: 'app-mpr-lbr',
    templateUrl: './mpr-lbr.component.html',
    styleUrls: ['./mpr-lbr.component.css'],
    standalone: false
})
export class MprLbrComponent implements OnInit {
@ViewChild('mprMainRef') mprMainComp: LbrMprMainComponent;
protected ngUnsubscribe: Subject<void> = new Subject<void>();
    dataItem: any = [];
    pdfPath: any = [];
    iframeUrl: SafeResourceUrl;
    iframeLoaded: boolean = false;
    isLocalStorageSet: boolean = false;
    mprList : IMPR_Labour_DashboardViewModel[]=[];
    totalRecords: number = 0;
    totalPages: number = 0;
    fakeArray = new Array(0);
    public roleName :any;
    searchText: string = '';
    yearwise:number = 0;
    monthwise:number = 0;
    searchMonth: number = 0;
    searchYear: number = 0;
    modal:any;
    selectedItem: any = null;
    isPdfVisible=false;

months = [
  { value: 1, name: 'January' }, { value: 2, name: 'February' }, { value: 3, name: 'March' },
  { value: 4, name: 'April' }, { value: 5, name: 'May' }, { value: 6, name: 'June' },
  { value: 7, name: 'July' }, { value: 8, name: 'August' }, { value: 9, name: 'September' },
  { value: 10, name: 'October' }, { value: 11, name: 'November' }, { value: 12, name: 'December' }
];
years = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];


    stepCodes=stepperJson.map(step => step.stepCode);
    dataTableParams: IDataTableParamsViewModel = {
      searchCode: '',
      pageNo: 1,
      pageSize: 10,
      sortColumn: 'Year',
      sortOrder: '1',
      filterArray: ''
    };
  
    public officerName : any;
    public officerDesignation : any;
    public officerCircleName : any;
    public officerDetails : any ;


    constructor(private route: ActivatedRoute, 
      private router: Router,
      private activeRoute: ActivatedRoute,
      private appHttpRequestHandlerService: AppHttpRequestHandlerService,  
      private common:CommonService,  
      private modalService: NgbModal,
      public commonOpsService: CommonOpsService,
      public authService: AuthService,
      private sanitizer: DomSanitizer,) { }
      
    ngOnInit(): void {
      this.monthwise = 0;  
  this.yearwise = 0;  
  this.searchMonth = 0;
  this.searchYear = 0;
  this.loadDashboadData();
    }
    ngAfterViewInit() {
      this.loadDashboadData();
    }
     loadDashboadData(){
        this.roleName = this.authService.getUserJwtDecodedInfo().RoleName;
        let parms = { 
          id: this.authService.getUserJwtDecodedInfo().UserId,  
          searchCode: this.dataTableParams.searchCode, 
          pageNo: this.dataTableParams.pageNo, 
          pageSize : this.dataTableParams.pageSize, 
          sortColumn : 'Year', 
          sortOrder : this.dataTableParams.sortOrder,
          filterArray : this.dataTableParams.filterArray,
          month : this.searchMonth,
          year : this.searchYear,   
        };
        this.appHttpRequestHandlerService.httpGet(parms, "Dashboard", "Load_Mpr_Labour_Data").pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data: GenericResponseTemplateModel<IMPR_Labour_DashboardViewModel[]>)=>{
          this.mprList = data.responseDataModel;
          if (this.mprList.length > 0) {
            this.totalRecords = this.mprList[0].maxRows;
            this.calcTotalPages();
            console.log(this.mprList,'okk')
          }
          else {
            this.totalRecords = 0;
          }
        });
      }

startMprFilling(modal: any) {
  if (this.monthwise === 0 || this.yearwise === 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Missing Selection',
      text: 'Please select both month and year.',
      confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'btn btn-primary'
      },
      buttonsStyling: false
    });
    return;
  }

  const userId = this.authService.getUserJwtDecodedInfo().UserId;
  const isDuplicate = this.mprList.some(m =>
    m.month == this.monthwise &&
    m.year == this.yearwise &&
    m.submittedBy_UserRefId == userId
  );

  if (isDuplicate) {
    Swal.fire({
      icon: 'error',
      title: 'Duplicate Entry',
      text: `MPR already exists for this month and year.`,
      confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    return;
  }

  const profileId = this.authService.getUserJwtDecodedInfo().UserProfileId;
  const params = {
    SubmittedBy_UserRefId: userId,
    month: this.monthwise,
    year: this.yearwise,
    StepCodes: this.stepCodes,
    SubmittedBy_ProfileRefId: profileId
  };

  this.appHttpRequestHandlerService.httpPost( params, "pbsamadhannetcoreapi.ViewModels.InsertNullJson_ViewModel",  "MPR", "insert_null_json")
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe({
      next: () => {
        modal.close();
        this.router.navigate(['/lbr-mpr-implementation/lbr-mpr-step-container'], {
          queryParams: { month: this.monthwise, year: this.yearwise }
        });
      }
    });
}

openEditForm(item: any): void {
  this.router.navigate(['/lbr-mpr-implementation/lbr-mpr-step-container'], {
    queryParams: {
      id: item.id,                       
      userId: item.submittedBy_UserRefId, 
      month: item.month,
      year: item.year,
      isViewOnly: item.isLocked
 
    }
  });
}
  
    loadIframe(item,longContent3) {
      localStorage.removeItem('AuthToken');
      sessionStorage.clear();
      this.dataItem = [];
      this.dataItem = item;
        let ViewParms: any = {
          month: this.dataItem.month,
          year: this.dataItem.year,
          usrtype: this.dataItem.legacy_Role,
          mprid: this.dataItem.legacy_MPRId,
          viewuser: 'mpr'
        }
  
        let ViewParms2: any = {
          AppFormID: 0,
          TYPE: 13,
          AppId: 0,
          
        }
        localStorage.setItem('AuthToken', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVU0VSX0lEIjoiNjgyNGJjN2EtMjI1Yy00NTU2LWFiNTMtMTM1YmFlMTcxMzYxIiwiVVNFUl9OQU1FIjoiR2F1cmF2IFB1cmkiLCJST0xFIjoiQVBQUyIsIkxPR0lOX0RUIjoiMTgvMDQvMjAyNCIsIkxPR0lOX1RZUEUiOiJCUCIsIlJFVF9VUkwiOiJhc2RmYXNkZmFjY2EiLCJBUElfUEFUSCI6Imh0dHA6Ly9sb2NhbGhvc3QvIiwiQkFDS19UT19FTEFCX1BBVEgiOiJodHRwczovL3BibGFib3VyLmdvdi5pbi9lTGFib3VyL0FjY291bnQvTG9naW5Gcm9tUFdCUyIsImlhdCI6MTcxNDYyMzg5NiwiZXhwIjoxODcyNDExODk2fQ.qWIwCPUjb8wh6lHkTdlV5WJQmKNoY6I-QLQwz6fIG6Q" );
        sessionStorage.setItem('UserName', this.dataItem.legacy_Username);
        sessionStorage.setItem('ROLE', this.dataItem.legacy_Role);
        sessionStorage.setItem('routePerms_view', JSON.stringify(ViewParms));
        sessionStorage.setItem('UserId', this.dataItem.submittedBy_UserRefId);
        sessionStorage.setItem('routePerms_Dash', JSON.stringify(ViewParms2));
        this.modalService.open(longContent3, { scrollable: true });
    
    
    // Construct the URL with parameters
    let url = `https://pblabour.gov.in/wbapp/MprViewAdf/MprAdfView`;
    
    // Sanitize the URL
    this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      this.iframeLoaded = true;
    }
  
  
    onChangeSortOrder(event) {
      this.dataTableParams.sortOrder = event.target.value;
  
      this.onClickSearchBar();
    }
    onChangePageSize(event) {
      this.dataTableParams.pageNo = 1;
      this.dataTableParams.pageSize = event.target.value;
      this.onClickSearchBar();
    }
  
    onChangePageNumber(event) {
      this.dataTableParams.pageNo = event.target.value;
      this.onClickSearchBar();
    }
    onClickNextPage() {
      if (this.dataTableParams.pageNo < this.totalPages) {
        this.dataTableParams.pageNo = this.dataTableParams.pageNo + 1;
          this.onClickSearchBar();
      }
    }
    onClickPrevPage() {
      if (this.dataTableParams.pageNo > 1) {
        this.dataTableParams.pageNo = this.dataTableParams.pageNo - 1;
          this.onClickSearchBar();
      }
    }
  
    searchPressed(event){
      if(event.keyCode==13){
        this.onClickSearchBar()
      }
    }
    searchKeyUp(event){
      this.searchText =(<HTMLInputElement>document.getElementById('searchKeyword')).value;
      if(((event.keyCode==8 || event.keyCode==46) && event.target.value.trim().length==0)){
        this.onClickSearchBar()
      }
    }
    clearSearch(){
      (<HTMLInputElement>document.getElementById('searchKeyword')).value='';
      this.searchText='';
        this.onClickSearchBar()
    }
    
    onClickSearchBar() {
      this.searchByKeyword((<HTMLInputElement>document.getElementById('searchKeyword')).value);
    }
    searchByKeyword(keyword: string) {
      this.dataTableParams.searchCode = keyword.trim();
      this.loadDashboadData();
    }
  
    calcTotalPages() {
      this.totalPages = Math.ceil(this.totalRecords / this.dataTableParams.pageSize);
      this.fakeArray = Array(this.totalPages);
    }
  
    onChangeYear(event) {
      this.yearwise = event.target.value;
   
    }
    
    onChangeMonth(event) {
      this.monthwise = event.target.value;
    
    }
    openMonthYearModal(content: any): void {
  this.monthwise = 0;
  this.yearwise = 0;
    this.loadDashboadData();
  this.modalService.open(content);
}
generatePdfFromDashboard(item: any): void {
  const params = {
    userId: item.submittedBy_UserRefId,
    month: item.month,
    year: item.year
  };

  this.appHttpRequestHandlerService.httpGet(params, 'MPR', 'get_mpr_list')
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((res: GenericResponseTemplateModel<any[]>) => {
      if (res.responseDataModel?.length > 0) {
        const allSteps = res.responseDataModel;

       
        const allFormJsons = allSteps
          .filter(step => step.jsonData)
          .map(step => JSON.parse(step.jsonData));

        this.generatePdfForAllForms(allFormJsons, item.monthName, item.year);
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'No Data',
          text: 'No MPR data found to generate PDF.',
          confirmButtonText: 'OK',
          customClass: { confirmButton: 'btn btn-primary' },
          buttonsStyling: false
        });
      }
    });
}


private generatePdfForAllForms(formJsons: any[], monthName: string, year: number): void {
  const doc = new jsPDF('p', 'mm', 'a4');

  formJsons.forEach((formJson, index) => {
    this.addFormContentToPdf(doc, formJson, monthName, year);

    if (index < formJsons.length - 1) {
      doc.addPage();  
    }
  });

  doc.save(`MPR_${monthName}_${year}.pdf`);
}


private drawCell(
  doc: jsPDF,
  x: number,
  y: number,
  w: number,
  text: string,
  lineHeight: number = 5
): number {
  const wrapped = doc.splitTextToSize(text || '-', w - 4);
  const rowHeight = wrapped.length * lineHeight + 4;


  doc.rect(x, y, w, rowHeight);

  doc.text(wrapped, x + 2, y + lineHeight);

  return rowHeight; 
}

private addFormContentToPdf(doc: jsPDF, formJson: any, monthName: string, year: number): void {
  let y = 20;
  const marginX = 14;
  const pageHeight = doc.internal.pageSize.getHeight();


  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text(`Monthly Progress Report - ${monthName} ${year}`, marginX, y);
  y += 12;

  formJson.forEach((sectionWrapper: any, secIndex: number) => {
    const section = sectionWrapper.Section;
    if (!section) return;

    doc.setFontSize(12).setFont(undefined, 'bold');
    doc.text(`Section ${secIndex + 1}: ${section.SectionTitle}`, marginX, y);
    y += 8;

    section.SubSections?.forEach((sub: any, subIndex: number) => {
      if (
        (!sub.Lables || sub.Lables.length === 0) &&
        !sub.Table &&
        !sub.DynamicTableInfo
      ) {
        return; 
      }

      doc.setFontSize(11).setFont(undefined, 'bold');
      doc.text(`SubSection ${subIndex + 1}: ${sub.SubSectionTitle || ''}`, marginX + 2, y);
      y += 7;
      doc.setFont(undefined, 'normal');

      
      if (sub.Lables?.length) {
        sub.Lables.forEach((label: any) => {
          const field = label.LableTitle || '';
          const value = label.LableValueInfo?.Value ?? '-';

          const fieldHeight = this.drawCell(doc, marginX, y, 70, field);
          const valueHeight = this.drawCell(doc, marginX + 70, y, 110, value);

          const rowHeight = Math.max(fieldHeight, valueHeight);
          y += rowHeight + 2;

          if (y > pageHeight - 20) {
            doc.addPage();
            y = 20;
          }
        });
        y += 4;
      }

      
      if (sub.Table) {
        const colCount = sub.Table.Columns.length;
        const colWidth = 180 / colCount;
        const lineHeight = 5;

        
        let maxHeight = 0;
        sub.Table.Columns.forEach((c: any, i: number) => {
          const h = this.drawCell(doc, marginX + i * colWidth, y, colWidth, c.ColumnTitle, lineHeight);
          if (h > maxHeight) maxHeight = h;
        });
        y += maxHeight;

        
        sub.Table.Rows.forEach((row: any) => {
          let maxRowHeight = 0;
          sub.Table.Columns.forEach((c: any, i: number) => {
            const val = row[c.ColumnId] || '-';
            const h = this.drawCell(doc, marginX + i * colWidth, y, colWidth, String(val), lineHeight);
            if (h > maxRowHeight) maxRowHeight = h;
          });
          y += maxRowHeight;

          if (y > pageHeight - 20) {
            doc.addPage();
            y = 20;
          }
        });
        y += 6;
      }

      
      if (sub.DynamicTableInfo) {
        const dyn = sub.DynamicTableInfo;

        if (dyn.TotalInspectionsLabel) {
          const text = `${dyn.TotalInspectionsLabel.LableTitle}: ${dyn.TotalInspectionsLabel.LableValueInfo?.Value ?? '-'}`;
          y += this.drawCell(doc, marginX, y, 180, text);
        }

        if (dyn.TableColumns?.length) {
          const colCount = dyn.TableColumns.length;
          const colWidth = 180 / colCount;
          const lineHeight = 5;

          
          let maxHeight = 0;
          dyn.TableColumns.forEach((c: any, i: number) => {
            const h = this.drawCell(doc, marginX + i * colWidth, y, colWidth, c.LableTitle, lineHeight);
            if (h > maxHeight) maxHeight = h;
          });
          y += maxHeight;

          
          (dyn.TableRows || []).forEach((row: any) => {
            let maxRowHeight = 0;
            dyn.TableColumns.forEach((c: any, i: number) => {
              const val = row[c.LableTitle] || '-';
              const h = this.drawCell(doc, marginX + i * colWidth, y, colWidth, String(val), lineHeight);
              if (h > maxRowHeight) maxRowHeight = h;
            });
            y += maxRowHeight;

            if (y > pageHeight - 20) {
              doc.addPage();
              y = 20;
            }
          });
          y += 6;
        }
      }
    });
  });
}







}