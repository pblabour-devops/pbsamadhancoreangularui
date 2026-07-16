import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { read, utils, writeFile } from 'xlsx';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AppHttpRequestHandlerService } from '../app-http-request-handler.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { IUploadCsvResponseViewModel, IUploadCsvSheetDataViewModel } from '../shared-typed-models';
import { GenericResponseTemplateModel } from 'src/app/generic-implementation/generic-service-result-template';
@Component({
    selector: 'app-excel-upload',
    templateUrl: './excel-upload.component.html',
    styleUrls: ['./excel-upload.component.css'],
    standalone: false
})
export class ExcelUploadComponent implements OnInit {
  csvResponseData: IUploadCsvSheetDataViewModel= {SheetData:[]};
  uploadCsvResponse: IUploadCsvResponseViewModel={
    csvMismatchList: [],
    data:'',
    isValidData:true,
    modelColumnList: [],
    rows: [],
    uploadCsvErrorType: 0
  }
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  @Input() entityKeyValue: number;
  @Output() excelSheetUploadStatusEvent = new EventEmitter<any>();
  p: number = 1;
  constructor(private appHttpRequestHandlerService: AppHttpRequestHandlerService) { }

  ngOnInit(): void {
  }
  ngOnChanges(){
    //console.log(this.entityKeyValue)
  }

  onCsvUpload($event: any){
    const files = $event.target.files;
    if (files.length) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (event: any) => {
            const wb = read(event.target.result);
            const sheets = wb.SheetNames;

            if (sheets.length) {
                const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                //this.movies = rows;

                let rowsStringified = JSON.stringify({sheetData: rows});

                this.appHttpRequestHandlerService.httpPost({data: rowsStringified, entityKey: 'ShopLicenceRefId', entityKeyValue: this.entityKeyValue}, "List<pblabournetcoreapi.ViewModels.UploadCsvRequestViewModel>", "CommonApis","ValidateAndSeedCsvData").pipe(takeUntil(this.ngUnsubscribe))
                .subscribe((data: GenericResponseTemplateModel<IUploadCsvResponseViewModel>)=>{
                  this.uploadCsvResponse = data.responseDataModel;
                  //console.log(this.uploadCsvResponse.isValidData , this.uploadCsvResponse.uploadCsvErrorType)
                  if(!this.uploadCsvResponse.isValidData && this.uploadCsvResponse.uploadCsvErrorType==1){ // Column Mismatch
                    Swal.fire({
                      icon: 'warning',
                      title:'Operation Failed..!',
                      text: 'System found some columns mismatch between preferred performa and uploaded excel sheet. Please fill excel sheet as per performa provided and try again.',
                    });
                  }
                  else if(!this.uploadCsvResponse.isValidData && this.uploadCsvResponse.uploadCsvErrorType==2){ // Empty Sheet
                    Swal.fire({
                      icon: 'warning',
                      title:'Operation Failed..!',
                      text: 'You are trying to upload empty excel sheet. Please prepare data in excel sheet and try again.',
                    });
                  }
                  else if(!this.uploadCsvResponse.isValidData && this.uploadCsvResponse.uploadCsvErrorType==3){ // Data Validation
                    Swal.fire({
                      icon: 'warning',
                      title:'Operation Failed..!',
                      text: 'System found some incorrect data in excel sheet. You can find the incorrect data report prepared by the system and after correcting data in excel sheet you can try again.',
                    });
                  }
                  this.excelSheetUploadStatusEvent.emit(this.uploadCsvResponse);
                  //console.log(this.uploadCsvResponse)
                  // this.csvResponseData = JSON.parse(data.responseDataModel.data);
                  // console.log(this.csvResponseData)
                });

            }
        }
        reader.readAsArrayBuffer(file);
    }

  }
  Reset(){
    this.uploadCsvResponse={
      csvMismatchList: [],
      data:'',
      isValidData:true,
      modelColumnList: [],
      rows: [],
      uploadCsvErrorType: 0
    };
    (<HTMLInputElement> document.getElementById("fileUploadInput")).files=null;
    (<HTMLInputElement> document.getElementById("fileUploadInput")).value="";
  }
}
