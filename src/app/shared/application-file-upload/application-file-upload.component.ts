import { HttpClient, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AppFileUploadInfoViewModel } from 'src/app/generic-implementation/generic-form-builder.type';
import { environment } from 'src/environments/environment';
import { AppHttpRequestHandlerService } from '../app-http-request-handler.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { CommonOpsService } from '../../shared/common-ops-service';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';
@Component({
    selector: 'app-application-file-upload',
    templateUrl: './application-file-upload.component.html',
    styleUrls: ['./application-file-upload.component.css'],
    standalone: false
})
export class ApplicationFileUploadComponent implements OnInit {
  progress: any;
  @Input() appRefId: number;
  @Input() isUploadShow: boolean;
  @Input() entityPrimaryid: number;
  @Input() applicationType: number;
  @Input() projectSiteRefId: number;
  @Input() deleteTempFiles: boolean; 
  @Input() userId: string;  
  @Input() projectSiteVersion: number;

  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  appFilesInfo: AppFileUploadInfoViewModel[];
  isAnyFileChanges: boolean = false;
  public parmamEncodedinfo: string;

  constructor(
    private httpClient: HttpClient,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private router: Router,
    public commonOpsService: CommonOpsService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    if(this.userId == undefined){
      this.appHttpRequestHandlerService
      .httpGet({ id: this.appRefId, deleteTempFiles: this.deleteTempFiles  }, 'CommonApis', 'initiateappdocuments')
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: AppFileUploadInfoViewModel[]) => {
        this.appFilesInfo = data;
      });
    }
    else {
      this.appHttpRequestHandlerService
      .httpGet({ id: this.appRefId, deleteTempFiles: this.deleteTempFiles, userId: this.userId  }, 'CommonApis', 'initiateappdocumentwithroleid')
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: AppFileUploadInfoViewModel[]) => {
        this.appFilesInfo = data;
      });
    }
  }

  upload(event, control, files, docId, allowedMaxMB) {
    if (files.length === 0) return;

    const formData = new FormData();
    var isAllOk: boolean = true;

    for (const file of files) {
      if (file.size > allowedMaxMB * 1000000) {
        isAllOk = false;
        control.value = '';
        Swal.fire({
          icon: 'warning',
          title: 'Invalid file size..!',
          text: 'Max size allowed: ' + allowedMaxMB + ' MB',
        });
      } else {
        formData.append(file.name, file);
        this.isAnyFileChanges = true;
      }
    }
    if (isAllOk) {
      const uploadReq = new HttpRequest(
        'POST',
        environment.pbLabourDefaultApiRoot + 'CommonApis/uploadappdocs',
        formData,
        {
          reportProgress: true,
          headers: new HttpHeaders({
            DocId: docId.toString(),
            AppId: this.appRefId.toString(),
          }),
        }
      );
      this.httpClient.request(uploadReq).subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * event.loaded) / event.total);
        }
      });
    }
  }
  LockUploadFiles() {
    var isAllUploaded: Boolean = true;
    var canNext = true;
    this.appFilesInfo.forEach((element) => {
      if (!element.isOptional) {
        var input: any = document.getElementById(element.documentId.toString());
        if (input.files.length == 0 && element.alreadyUploaded == null) {
          isAllUploaded = false;
          document.getElementById(
            'docName_' + element.documentId.toString()
          ).className = 'text-danger';
        } else {
          document.getElementById(
            'docName_' + element.documentId.toString()
          ).className = '';
        }
      }
    });

    if (!isAllUploaded) {
      Swal.fire({
        icon: 'warning',
        title: 'Few mandatory files are missing..!',
        text: 'Please upload all mandatory files.',
      });
      canNext = false;
    }
    if (this.isAnyFileChanges && canNext) {
      this.appHttpRequestHandlerService
        .httpGet({ id: this.appRefId }, 'CommonApis', 'lockuploadfiles')
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data: any) => {});
    }
    if (canNext) {
      var detailPagePath='';
      if (this.applicationType == 1) {
        detailPagePath='/establishment/detail';
        }
      else if (this.applicationType == 2) {
        detailPagePath='/contractor/detail';
        }
      else if (this.applicationType == 4) {
        detailPagePath='/commonLicence/detail';
        }
      else if (this.applicationType == 3) {
        detailPagePath='/buildingPlan/detail';
        }
      else if (this.applicationType == 5) {
        detailPagePath='/building-plan-hud/detail';
        }
      else if (this.applicationType == 61) {
        detailPagePath='/licence/WomenInNightShiftFormDetail';
       }
        else if (this.applicationType == 62) {
          detailPagePath='/licence/factoryWomenInNightShiftFormDetail';
        }
        else if (this.applicationType == 39) {
          detailPagePath='/licence/ismdetail';
        }
        else if (this.applicationType == 37) {
          detailPagePath='/licence/contractlabourPEDetail';
        }
        else if (this.applicationType == 38) {
          detailPagePath='/licence/contractlabourDetail';
        }
        else if (this.applicationType == 8) {
          detailPagePath='/licence/tradeuniondetail';
        }
        else if (this.applicationType == 39) {
          detailPagePath='/licence/ismdetail';
        }
        else if (this.applicationType == 40) {
          detailPagePath='/licence/ismcontractlabourDetail';
        }

       this.router.navigate([detailPagePath], {
        queryParams: {
          info: this.commonOpsService.encodeQueryParamsInBase64({
            identityKey: this.entityPrimaryid,
            appRefId: this.appRefId,
            applicationType: this.applicationType,
            projectSiteRefId:this.projectSiteRefId,
            projectSiteVersion:this.projectSiteVersion,
          }),
        },
      });
    }
  }
  downloadFile(fileName) {
    this.appHttpRequestHandlerService
      .httpGet({ file: fileName }, 'CommonApis', 'download')
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: any) => {});
  }

  download(file) {
    let fileName = file;
    let checkFileType = fileName.split('.').pop();
    var fileType;
    if (checkFileType == '.txt') {
      fileType = 'text/plain';
    }
    if (checkFileType == '.pdf') {
      fileType = 'application/pdf';
    }
    if (checkFileType == '.doc') {
      fileType = 'application/vnd.ms-word';
    }
    if (checkFileType == '.docx') {
      fileType = 'application/vnd.ms-word';
    }
    if (checkFileType == '.xls') {
      fileType = 'application/vnd.ms-excel';
    }
    if (checkFileType == '.png') {
      fileType = 'image/png';
    }
    if (checkFileType == '.jpg') {
      fileType = 'image/jpeg';
    }
    if (checkFileType == '.jpeg') {
      fileType = 'image/jpeg';
    }
    if (checkFileType == '.gif') {
      fileType = 'image/gif';
    }
    if (checkFileType == '.csv') {
      fileType = 'text/csv';
    }
    this.DownloadFile(fileName, fileType).subscribe(
      (success) => {
        saveAs(success, fileName);
      },
      (err) => {
        alert('Server error while downloading file.');
      }
    );
  }
  DownloadFile(filePath: string, fileType: string): Observable<any> {
    let fileExtension = fileType;

    return this.httpClient
      .get(
        environment.pbLabourDefaultApiRoot +
          'CommonApis/download?file=' +
          filePath.trim(),
        {
          responseType: 'blob',
          observe: 'response',
        }
      )
      .pipe(
        map((res: any) => {
          return new Blob([res.body], { type: fileExtension });
        })
      );
  }

 
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
