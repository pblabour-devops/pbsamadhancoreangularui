import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  async generateAndMergePDF(establishmentId: string, attachmentPath: string) {
    const element = document.getElementById('divToExport');
    if (!element) {
      console.error('Element not found');
      return;
    }

    element.style.display = 'block';

    const canvas = await html2canvas(element);
    const pdf = new jsPDF('p', 'pt', 'a4');
    const imgWidth = 595.28; 
    const imgHeight = 842.04; 
    const imgData = canvas.toDataURL('image/png');

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const ratio = canvasWidth / canvasHeight;
    let pdfWidth, pdfHeight;

    if (canvasWidth > imgWidth || canvasHeight > imgHeight) {
      if (canvasWidth / imgWidth > canvasHeight / imgHeight) {
        pdfWidth = imgWidth;
        pdfHeight = imgWidth / ratio;
      } else {
        pdfHeight = imgHeight;
        pdfWidth = imgHeight * ratio;
      }
    } else {
      pdfWidth = canvasWidth;
      pdfHeight = canvasHeight;
    }

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

 
    const generatedPdfBytes = pdf.output('arraybuffer');


    const existingPdfBytes = await fetch(attachmentPath).then(res => res.arrayBuffer());


    const pdfDoc = await PDFDocument.create();


    const generatedPdfDoc = await PDFDocument.load(generatedPdfBytes);
    const [generatedPage] = await pdfDoc.copyPages(generatedPdfDoc, [0]);
    pdfDoc.addPage(generatedPage);


    const existingPdfDoc = await PDFDocument.load(existingPdfBytes);

 
    const existingPages = await pdfDoc.copyPages(existingPdfDoc, existingPdfDoc.getPageIndices());
    existingPages.forEach(page => pdfDoc.addPage(page));


    const mergedPdfBytes = await pdfDoc.save();
    saveAs(new Blob([mergedPdfBytes], { type: 'application/pdf' }), `${establishmentId}.pdf`);

    element.style.display = 'none';
  }
}