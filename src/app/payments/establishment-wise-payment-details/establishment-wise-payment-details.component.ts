import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { IEstablishmentWisePaymentDetailsRequestParms } from '../payments-typed-models';
import { TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';


@Component({
    selector: 'app-establishment-wise-payment-details',
    templateUrl: './establishment-wise-payment-details.component.html',
    styleUrls: ['./establishment-wise-payment-details.component.css'],
    standalone: false
})
export class EstablishmentWisePaymentDetailsComponent implements OnInit {
protected ngUnsubscribe: Subject<void> = new Subject<void>();
filteredData: any[] = [];
paymentDetails: any[] = [];
selectedServiceType = '';
searchTerm = '';
pageSize = 10;
currentPage = 1;
totalPages = 0;
selectedUser: any = {};
sortColumn = '';
sortDirection: 'asc' | 'desc' = 'asc';
submitted: boolean = false;
visiblePages: (number | '...')[] = [];
applicationTypes: string[] = [];

servicesList = [
  { id: 70, name: "Registration of Factories Under The Factory ACT" },
  { id: 5, name: "Combined Proposed Approval of Building Plans (HUD and Factories)" },
  { id: 6, name: "The Punjab Shop & Commercial Establishment Act, 1958" },
  { id: 61, name: "Grant of Permission for Women to Work in Night Shift Under Factory Act" },
  { id: 62, name: "Grant of Permission for Women to Work in Night Shift Under Shop Act" },
  { id: 37, name: "Principal Employer" },
  { id: 62, name: "Contract Labour" },
  { id: 39, name: "Inter State Migrant" },
  { id: 71, name: "Proposed Building Plans Under The Factory Act " },
  { id: 72, name: "Existing Building Under The Factory Act" },
  { id: 73, name: " Existing Building with Stability Certificate (Addition-Amendment)" }
];

Input_Form: TForm<IEstablishmentWisePaymentDetailsRequestParms> = this.fb.group({
  fromDate: ['2025-12-10', Validators.required],
  toDate: [new Date().toISOString().slice(0, 10), Validators.required],
  serviceType: ['']
}) as TForm<IEstablishmentWisePaymentDetailsRequestParms>;

  constructor(
    private fb: UntypedFormBuilder,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
  this.appHttpRequestHandlerService
    .httpGet(this.Input_Form.value, "PaymentManager", "getEstablishmentWisePaymentDetails").pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: any) => {
      this.paymentDetails = data.responseDataModel;
      console.log(this.paymentDetails, '>>>>>>')
      this.filteredData = [...this.paymentDetails];
      this.applyFilters();
      this.applicationTypes = Array.from(
        new Set(this.paymentDetails.map((item: any) => item.ApplicationType))
      );
    });
}

  onFilterClick(): void {
    if (this.Input_Form.valid) {
      const formValues = this.Input_Form.value;
      this.appHttpRequestHandlerService
        .httpGet(formValues, "PaymentManager", "getEstablishmentWisePaymentDetails").pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data: any) => {
          this.paymentDetails = data.responseDataModel;
          this.filteredData = [...this.paymentDetails];
          this.applyFilters();
        });
    } else {
      this.Input_Form.markAllAsTouched();
    }
  }


  onSearchChange() {
    this.applyFilters();
  }

  applyFilters() {
    let data = [...this.paymentDetails];
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      data = data.filter(item => (
          item.establishmentName?.toLowerCase().includes(term) || 
          item.address?.toLowerCase().includes(term) || 
          item.investPunjab_Ipin?.toLowerCase().includes(term) || 
          (item.amountCalculated?.toString().includes(term))
        )
      );
    }

    // Apply sorting
    if (this.sortColumn) {
      data.sort((a, b) => {
        const aVal = (a[this.sortColumn] || '').toString().toLowerCase();
        const bVal = (b[this.sortColumn] || '').toString().toLowerCase();

        if (aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    this.filteredData = data;
    this.totalPages = Math.ceil(this.filteredData.length / this.pageSize);
    this.currentPage = 1;
    this.updateDisplayedData();
    this.generateVisiblePages(); // << add this here
    this.updateDisplayedData();
  }

  updateDisplayedData() {
    const start = (this.currentPage - 1) * this.pageSize;
    this.paymentDetails = this.filteredData.slice(start, start + this.pageSize);
  }

  changePage(page: number) {
  if (page < 1 || page > this.totalPages) return;
  this.currentPage = page;
  this.updateDisplayedData();
  this.generateVisiblePages();
  }

  generateVisiblePages() {
    const total = this.totalPages;
    const current = this.currentPage;
    const delta = 2;

    const pages: (number | '...')[] = [];
    const range: number[] = [];

    const left = Math.max(2, current - delta);
    const right = Math.min(total - 1, current + delta);

    range.push(1); // always show first

    if (left > 2) {
      pages.push('...');
    }

    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    if (right < total - 1) {
      pages.push('...');
    }

    if (total > 1) {
      range.push(total); // always show last
    }

    this.visiblePages = [1];

    if (left > 2) this.visiblePages.push('...');

    for (let i = left; i <= right; i++) {
      this.visiblePages.push(i);
    }

    if (right < total - 1) this.visiblePages.push('...');

    if (total !== 1) this.visiblePages.push(total);
  }

  sortBy(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applyFilters();  // Reapply filters to update data
  }

  exportToExcel(): void {
    if (!this.paymentDetails || this.paymentDetails.length === 0) {
      alert('No data available to export.');
      return;
    }

    const exportData = this.filteredData.map((item, index) => ({
      'Sr. No': index + 1,
      'Establishment Name': item.establishmentName,
      'Address': item.address,
      'IPIN': item.investPunjab_Ipin,
      'AppId': item.investPunjab_AppId,
      'Service Name': item.applicationType,
      'Amount (in rupees)': item.amountCalculated,
      'Transaction Date': item.transactionInitializationDate,
      'Transaction ID': item.uniquePaymentGatewayTransactionId,
      'Payment Type': item.paymentTreasuryType
    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
    const workbook: XLSX.WorkBook = { Sheets: { 'Payment Report': worksheet }, SheetNames: ['Payment Report'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(data, 'EstablishmentWisePaymentReport.xlsx');
  }

  getApplicationName(applicationType: number): string {
    let service = this.servicesList.find(service => service.id === applicationType);
    return service ? service.name : "Unknown Application";
  }


  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}