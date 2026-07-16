import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
    selector: 'app-lbr-mpr-main',
    templateUrl: './lbr-mpr-main.component.html',
    styleUrls: ['./lbr-mpr-main.component.css'],
    standalone: false
})
export class LbrMprMainComponent  {

@Input() formJson: any;
 @Input() isLockStep: boolean = false;
 @Input() isSubmitted: boolean = false;
@ViewChild('printSection') printSection: ElementRef | undefined;
dynamicTableColumns: any[] = [];
dynamicTableRows: any[] = [];
totalInspectionsValue: any = '';

  hiddenPrintHtmlRendered = false;
  private pendingPdfRequest: { month: string; year: number } | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

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
}


createEmptyRowFromSimple(): any {
  const row: any = {};
  this.dynamicTableColumns.forEach(col => {
    row[col.ColumnId] = '';
  });
  return row;
}



createEmptyRow(): any {
  const row: any = {};
  this.dynamicTableColumns.forEach(col => {
    row[col.LableTitle] = '';
  });
  return row;
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

    
      this.pendingPdfRequest = null;
    }
  }
addTableRow(): void {
  this.dynamicTableRows.push(this.createEmptyRow());
}

addSimpleTableRow(table: any) {
  const emptyRow = this.createEmptyRowFromSimple();
  this.dynamicTableRows.push(emptyRow);
}


removeTableRow(index: number): void {
  if (this.dynamicTableRows.length > 1) {
    this.dynamicTableRows.splice(index, 1);
  }
}
tableSections: string[] = [
  'Inspections Under the Factories Act, 1948',
  'Inspections Under the Payment of Wages Act, 1936',
  'Inspections Under the Minimum Wages Act, 1948',
  'Inspections under the Equal Remuneration Act, 1976 ',
 'Inspections Under the Punjab Labour Welfare Fund Act, 1965',
 'Inspections Under the Payment of Bonus Act, 1965',
 'Inspections Under the Maternity Benefit Act, 1961',
 'Inspections Under the Punjab Industrial Establishment Act, 1965',
 'Inspections Under the WORKING JOURNALISTS AND OTHER NEWSPAPER EMPLOYEES (CONDITION OF SERVICE) AND MISCELLANEOUS PROVISIONS ACT, 1955 ',
 'Inspections Under Inter State Migrant Workmen Act, 1979',
 'Inspections Under Sales Promotion Employees (Condition of Services Act, 1976)',
 'Inspections Under the MOTOR TRANSPORT WORKERS ACT, 1961 ',
 'Inspections Under the BUILDING AND OTHER CONSTRUCTION WORKERS (REGULATION OF EMPLOYMENT AND CONDITIONS OF SERVICE) ACT, 1996'
 

];
simpleTableSections: string[] = [
  'Number of raids conducted under THE BONDED LABOUR SYSTEM (ABOLITION) ACT, 1976',
  'Head Quarter/District Administration Duties',
  'Training /Workshop/Seminar Attended',
  'Inspections of Agriculture Farms'
];

isTablesSection(): boolean {
  const title = this.formJson?.[0]?.Section?.SectionTitle;
  return this.tableSections.includes(title);
}
isSimpleTableSection(): boolean {
  const title = this.formJson?.[0]?.Section?.SectionTitle;
  return this.simpleTableSections.includes(title);
}


// validateForm() {
//   for (let sub of this.formJson[0].Section.SubSections) {

//     // Case 1: Complex dynamic tables
//     if (this.isTablesSection()) {
//       const dynamicInfo = sub.DynamicTableInfo;
//       if (!this.totalInspectionsValue) return false;

//       const mandatoryCols = dynamicInfo.TableColumns.filter(col => col.IsMendatory);
//       const hasAnyRowFilled = this.dynamicTableRows.some(row =>
//         mandatoryCols.some(col => !!row[col.LableTitle]?.toString().trim())
//       );
//       if (!hasAnyRowFilled) return false;


//       dynamicInfo.TotalInspectionsLabel.LableValueInfo.Value = this.totalInspectionsValue;
//       dynamicInfo.TableRows = [...this.dynamicTableRows];
//     }

   
//     else if (this.isSimpleTableSection()) {
//       const tableInfo = sub.Table;

  
//       const hasAnyValue = this.dynamicTableRows.some(row =>
//         tableInfo.Columns.some(col => !!row[col.ColumnId]?.toString().trim())
//       );

//       if (!hasAnyValue) return false;


//       tableInfo.Rows = [...this.dynamicTableRows];
//     }

   
//     if (sub.Lables && Array.isArray(sub.Lables)) {
//       for (let label of sub.Lables) {
//         if (label.LableValueInfo?.IsMendatory && !label.LableValueInfo.Value) {
//           return false;
//         }
//       }
//     }
//   }

//   return true;
// }
validateForm() {
  for (let sub of this.formJson[0].Section.SubSections) {

   
    if (this.isTablesSection()) {
      const dynamicInfo = sub.DynamicTableInfo;
      dynamicInfo.TotalInspectionsLabel.LableValueInfo.Value = this.totalInspectionsValue;
      dynamicInfo.TableRows = [...this.dynamicTableRows];
    }

    
    else if (this.isSimpleTableSection()) {
      const tableInfo = sub.Table;
      tableInfo.Rows = [...this.dynamicTableRows];
    }

   
    if (sub.Lables && Array.isArray(sub.Lables)) {
      for (let label of sub.Lables) {
        
        if (label.LableValueInfo?.IsMendatory) {
          const val = label.LableValueInfo.Value;
          if (val === null || val === undefined || val === '') {
            
            if (!label.LableValueInfo.IsAutoFilled) {
              return false;
            }
          }
        }
      }
    }
  }
  return true; 
}
}

