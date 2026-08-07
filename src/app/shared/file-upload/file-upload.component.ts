import { HttpClient, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import {AppFileAlreadyFileUploadedViewModel, AppFileUploadInfoViewModel } from 'src/app/generic-implementation/generic-form-builder.type';
import { environment } from 'src/environments/environment';
import { AppHttpRequestHandlerService } from '../app-http-request-handler.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { CommonOpsService } from '../../shared/common-ops-service';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';
import { FileUploadResponse } from '../shared-typed-models';
import { GenericResponseTemplateModel } from 'src/app/generic-implementation/generic-service-result-template';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/auth.service';
import { GlobalStateManagerService } from '../global-state-manager-service';
import { SignalEventsService } from '../signal-events-service';
@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.css'],
    standalone: false
})
export class FileUploadComponent implements OnInit {
  progress: any;
  @Input() appRefId: number;
  @Input() isUploadShow: boolean;
  @Input() entityPrimaryid: number;
  @Input() applicationType: number;
  @Input() projectSiteRefId: number;
  @Input() deleteTempFiles: boolean; 
  @Input() userId: string;
  @Input() currentActionCode: number;  
  @Input() allowedActionCode: number;  
  @Input() applicationaType: number;  
  @Input() projectSiteVersion: number;
  @Input() isTimeLineFlow: boolean;
  @Input() applicationActionLogId : number;

  pdfPath: string='';
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  appFilesInfo: AppFileUploadInfoViewModel[];
  isAnyFileChanges: boolean = false;
  public parmamEncodedinfo: string;
  alreadyUploadedInfo: AppFileAlreadyFileUploadedViewModel[]=[];
  roleName: string='';
  activeTab: string = 'Enclosures';
  constructor(
    private httpClient: HttpClient,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private router: Router,
    public commonOpsService: CommonOpsService,
    private modalService: NgbModal,
    public authService : AuthService,
    public globalStateManagerService: GlobalStateManagerService,
    public signalEventsService: SignalEventsService
  ) {}

  ngOnInit(): void {
    this.roleName = this.authService.getUserJwtDecodedInfo().RoleName;
  }
  
  ngOnChanges() {
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
      .httpGet({ id: this.appRefId, deleteTempFiles: this.deleteTempFiles, userId: this.userId, currentActionCode: this.currentActionCode, allowedActionCode: this.allowedActionCode, applicationaType: this.applicationaType, isTimeLineFlow : this.isTimeLineFlow, applicationActionLogId : this.applicationActionLogId }, 'CommonApis', 'initiateappdocumentwithroleid')
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: AppFileUploadInfoViewModel[]) => {
        this.appFilesInfo = data;
      });
    }
  }
  upload(event, control, files, docId, allowedMaxMB, documentExtensionType) {
    var appDocId= (<HTMLInputElement>document.getElementById("appDocId_"+ docId)).value;
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
      }
      else if (documentExtensionType.split(',').filter(x=>x.toLowerCase().trim() ==  file.name.substring(file.name.lastIndexOf('.'), file.name.length).toLowerCase().trim()).length==0) {
        isAllOk = false;
        control.value = '';
        Swal.fire({
          icon: 'warning',
          title: 'Invalid file type..!',
          text: 'Allowed types: ' + documentExtensionType,
        });
      }
      else {
        formData.append(file.name, file);
        this.isAnyFileChanges = true;
      }
      //console.log(documentExtensionType.split(',').filter(x=>x.toLowerCase() ==  file.name.substring(file.name.lastIndexOf('.'), file.name.length).toLowerCase()));
      //console.log(documentExtensionType.split(',').filter(x=>x.toLowerCase().trim() ==  file.name.substring(file.name.lastIndexOf('.'), file.name.length).toLowerCase().trim()).length);
    }
    if (isAllOk) {
      const uploadReq = new HttpRequest(
        'POST',
        environment.pbLabourDefaultApiRoot + 'CommonApis/UploadDocument',
        formData,
        {
          reportProgress: true,
          headers: new HttpHeaders({
            DocId: docId.toString(),
            AppId: this.appRefId.toString(),
            AppDocId: appDocId
          }),
        }
      );
      this.httpClient.request(uploadReq).subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * event.loaded) / event.total);
        }
        else if(event.type === HttpEventType.Response){
          (<HTMLInputElement>document.getElementById("appDocId_"+ docId)).setAttribute("value", (<GenericResponseTemplateModel<FileUploadResponse>>event.body).responseDataModel.id.toString())
          if(this.appFilesInfo.filter(x=>x.documentId==docId)[0].alreadyUploadedInfo){
            this.appFilesInfo.filter(x=>x.documentId==docId)[0].alreadyUploadedInfo = this.appFilesInfo.filter(x=>x.documentId==docId)[0].alreadyUploadedInfo.filter(x=>x.isLocked);
          }

           this.alreadyUploadedInfo = this.appFilesInfo.filter(x=>x.documentId==docId)[0].alreadyUploadedInfo;
           if(this.alreadyUploadedInfo==null){
            this.alreadyUploadedInfo = <AppFileAlreadyFileUploadedViewModel[]>[];
            this.alreadyUploadedInfo.push(
              {
                fileName:this.appRefId.toString()+'_'+docId+'_'+(<GenericResponseTemplateModel<FileUploadResponse>>event.body).responseDataModel.id.toString()+'.pdf',
                fileUploadOn: new Date(),
                isLocked: false
              });
           }
           else{
            
            this.alreadyUploadedInfo.push({
              fileName:this.appRefId.toString()+'_'+docId+'_'+(<GenericResponseTemplateModel<FileUploadResponse>>event.body).responseDataModel.id.toString()+'.pdf',
              fileUploadOn: new Date(),
              isLocked: false
            })
           }
           this.appFilesInfo.filter(x=>x.documentId==docId)[0].alreadyUploadedInfo = this.alreadyUploadedInfo;
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
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        icon: 'warning',
        text: 'Please upload all mandatory files.',
      });
      canNext = false;
    }
    if (this.isAnyFileChanges && canNext) {
      var appDocIds: number[]=[];
      var appDocIdInput = document.getElementsByClassName('appDocIdInput');
      for (var i=0; i<appDocIdInput.length; i++) {
        if(appDocIdInput[i].getAttribute("value")!='0'){
          appDocIds.push(Number(appDocIdInput[i].getAttribute("value")))
        }
      }
      this.appHttpRequestHandlerService
        .httpGet({ id: this.appRefId, appDocIds: JSON.stringify(appDocIds)}, 'CommonApis', 'lockuploadfiles')
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data: any) => {
          this.redirectToNextPath();
        });
    }

    if (!this.isAnyFileChanges && canNext) {
      this.redirectToNextPath()
    }
  }
  redirectToNextPath () {
    var detailPagePath='';
    if (this.applicationType == 100001) {
      detailPagePath='/samadhaan/details';
      }
    
    this.router.navigate([detailPagePath], {
      queryParams: {
        info: this.commonOpsService.encodeQueryParamsInBase64({
          identityKey: this.entityPrimaryid,
          appRefId: this.appRefId,
          applicationType: this.applicationType,
          projectSiteRefId:this.projectSiteRefId,
          projectSiteVersion : this.projectSiteVersion
        }),
      },
    });
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
   
  previewDocument(longContent, fileName, type, uploadedOn, title, publicReferenceNum) {
    this.pdfPath = environment.pbLabourDefaultRoot + 'AppFiles/' + fileName.trim();
    //this.modalService.open(longContent, { scrollable: true, backdrop: 'static', keyboard: false });
    this.signalEventsService.emitFilePreviewEvent({id: 0, name: fileName, path: this.pdfPath, publicReferenceNum: publicReferenceNum, title: title, type: type, uploadedOn: uploadedOn, x:0, y: 0,zIndex:0});
    //this.globalStateManagerService.setFilePreviewInfoValue({name: fileName, path: this.pdfPath, publicReferenceNum: '123', title: fileName, type: 'pdf', uploadedOn: '23233'});
  }
  closePreviewModal(){
    this.modalService.dismissAll();
  }
  selectTab(tab: string): void {
    this.activeTab = tab;
  }
}
