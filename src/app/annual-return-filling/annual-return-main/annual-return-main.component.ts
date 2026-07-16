import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
    selector: 'app-annual-return-main',
    templateUrl: './annual-return-main.component.html',
    styleUrls: ['./annual-return-main.component.css'],
    standalone: false
})
export class AnnualReturnMainComponent  {

  @Input() formJson: any;
  @Input() isLockStep: boolean = false;
  @Input() isSubmitted: boolean = false;

  @ViewChild('printSection') printSection: ElementRef | undefined;

  dynamicTableColumns: any[] = [];
  dynamicTableRows: any[] = [];
  totalInspectionsValue: any = '';

  hiddenPrintHtmlRendered = false;
  private pendingPdfRequest: { month: string; year: number } | null = null;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnChanges(): void {
    if (!this.formJson || !this.formJson[0]) return;

    const section = this.formJson[0].Section;

    if (this.isTablesSection()) {
      const dynamicInfo = section.SubSections[0].DynamicTableInfo;
      this.totalInspectionsValue = dynamicInfo.TotalInspectionsLabel.LableValueInfo.Value;
      this.dynamicTableColumns = dynamicInfo.TableColumns;
      this.dynamicTableRows = dynamicInfo.TableRows?.length > 0
        ? [...dynamicInfo.TableRows]
        : [this.createEmptyRow()];
    }
    else if (this.isSimpleTableSection()) {
      const tableInfo = section.SubSections[0].Table;
      this.dynamicTableColumns = tableInfo.Columns;
      this.dynamicTableRows = tableInfo.Rows?.length > 0
        ? [...tableInfo.Rows]
        : [this.createEmptyRowFromSimple()];
    }
    const savedSignature = localStorage.getItem('managerSignatureFile');
  if (savedSignature && this.isSignatureSection()) {
    const label = this.formJson[0]?.Section?.SubSections[0]?.Lables[0];
    if (label && !label.LableValueInfo.Value) {
      label.LableValueInfo.Value = savedSignature;
    }
  }
  }

  createEmptyRow(): any {
    const row: any = {};
    this.dynamicTableColumns.forEach(col => {
      row[col.LableTitle] = '';
    });
    return row;
  }

  createEmptyRowFromSimple(): any {
    const row: any = {};
    this.dynamicTableColumns.forEach(col => {
      row[col.ColumnId] = '';
    });
    return row;
  }

  addTableRow(): void {
    this.dynamicTableRows.push(this.createEmptyRow());
  }

  addSimpleTableRow(): void {
    this.dynamicTableRows.push(this.createEmptyRowFromSimple());
  }

  removeTableRow(index: number): void {
    if (this.dynamicTableRows.length > 1) {
      this.dynamicTableRows.splice(index, 1);
    }
  }
onFileSelected(event: any, label: any) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const base64Data = reader.result as string;
    label.LableValueInfo.Value = base64Data;


    localStorage.setItem('managerSignatureFile', base64Data);
  };
  reader.readAsDataURL(file);
}


  isImage(fileValue: string): boolean {
    return fileValue.startsWith('data:image');
  }

  generatePdfForFormJson(month: string, year: number) {
    this.hiddenPrintHtmlRendered = true;
    this.pendingPdfRequest = { month, year };
    this.cdr.detectChanges();
  }

  ngAfterViewChecked(): void {
    if (this.pendingPdfRequest && this.printSection) {
      const content = this.printSection.nativeElement;
      html2canvas(content, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      }).then(canvas => {
        const imageData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = (canvas.height * pageWidth) / canvas.width;

        pdf.addImage(imageData, 'PNG', 0, 0, pageWidth, pageHeight);
        pdf.save(`MPR_${this.pendingPdfRequest!.month}_${this.pendingPdfRequest!.year}.pdf`);

        this.hiddenPrintHtmlRendered = false;
        this.pendingPdfRequest = null;
        this.cdr.detectChanges();
      });
    }
  }

  // Section checks
  tableSections: string[] = [
    'Inspections under the Equal Remuneration Act, 1976 ',
    'Inspections Under the Maternity Benefit Act, 1961',
    'Inspections Under Inter State Migrant Workmen Act, 1979',
    'Inspections Under Sales Promotion Employees (Condition of Services Act, 1976)',
    'Child and Adolescent Labour (Prohibition and Regulation) Act 1986'
  ];

  simpleTableSections: string[] = [
    'Strike/Closed Details',
    'Recovery',
    'Notice Related Lay Off',
    'Factory Closure',
    'Inspections Under the Payment of Gratuity Act,1972',
    'Inspections under Contract Labour (Regulation and Abolition), Act 1970',
    'Inspections of Health & Safety under The Building and Other Constructions Workers (Regulation of Employment and Conditions of Service) Act, 1996.',
    'Inspections under Punjab Labour Welfare Fund Act, 1965',
    'Report of Fatal accident or non Fatal accident on dangerous occurance (A)',
    'Number of raids conducted under THE BONDED LABOUR SYSTEM (ABOLITION) ACT, 1976',
    'Inspections Under the WORKING JOURNALISTS AND OTHER NEWSPAPER EMPLOYEES (CONDITION OF SERVICE) AND MISCELLANEOUS PROVISIONS ACT, 1955 ',
    'Inspections under The Industrial Employment (Standing Order) Act, 1946',
    'Head Quarter/District Administration Duties',
    'Training /Workshop/Seminar Attended',
    'Court Cases (Appeals or Writ petitions)',
    'Payment of Bonus Act(Bonus Details)'
  ];

  isTablesSection(): boolean {
    const title = this.formJson?.[0]?.Section?.SectionTitle;
    return this.tableSections.includes(title);
  }

  isSimpleTableSection(): boolean {
    const title = this.formJson?.[0]?.Section?.SectionTitle;
    return this.simpleTableSections.includes(title);
  }

  isSignatureSection(): boolean {
    const title = this.formJson?.[0]?.Section?.SectionTitle;
    return title === 'Manager Signature';
  }

  validateForm(): boolean {
    for (let sub of this.formJson[0].Section.SubSections) {
      if (this.isTablesSection()) {
        const dynamicInfo = sub.DynamicTableInfo;
        if (!this.totalInspectionsValue) return false;

        const mandatoryCols = dynamicInfo.TableColumns.filter((col: any) => col.IsMendatory);
        const hasAnyRowFilled = this.dynamicTableRows.some(row =>
          mandatoryCols.some((col: any) => !!row[col.LableTitle]?.toString().trim())
        );
        if (!hasAnyRowFilled) return false;

        dynamicInfo.TotalInspectionsLabel.LableValueInfo.Value = this.totalInspectionsValue;
        dynamicInfo.TableRows = [...this.dynamicTableRows];
      }
      else if (this.isSimpleTableSection()) {
        const tableInfo = sub.Table;
        const hasAnyValue = this.dynamicTableRows.some(row =>
          tableInfo.Columns.some((col: any) => !!row[col.ColumnId]?.toString().trim())
        );
        if (!hasAnyValue) return false;

        tableInfo.Rows = [...this.dynamicTableRows];
      }

      if (sub.Lables && Array.isArray(sub.Lables)) {
        for (let label of sub.Lables) {
          if (label.LableValueInfo?.IsMendatory && !label.LableValueInfo.Value) {
            return false;
          }
        }
      }
    }
    return true;
  }
} 
