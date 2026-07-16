import { HttpClient, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppHttpRequestHandlerService } from '../app-http-request-handler.service';
import { CommonOpsService } from '../common-ops-service';
import { environment } from 'src/environments/environment';
import { takeUntil } from 'rxjs/operators';
import { GenericResponseTemplateModel } from 'src/app/generic-implementation/generic-service-result-template';
import { IApplicationAddendumDocumentViewModel } from 'src/app/generic-implementation/generic-form-builder.type';
import { Subject } from 'rxjs';
import { SignalEventsService } from '../signal-events-service';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
    selector: 'app-addendum',
    templateUrl: './addendum.component.html',
    styleUrls: ['./addendum.component.css'],
    standalone: false
})
export class AddendumComponent implements OnInit {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  progress: any;
  file: any;
  pdfPath: string='';
  submitted: boolean=false;
  public title: string='';
  @Input() appRefId: number=0;
  @Input() isUploadOptionShown: boolean=false;
  public appFiles: IApplicationAddendumDocumentViewModel[] =[];
  constructor(private modalService: NgbModal,
    private httpClient: HttpClient,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private router: Router,
    public commonOpsService: CommonOpsService,
    public signalEventsService: SignalEventsService,
    public authService: AuthService) { }

  ngOnInit(): void {
  }
  ngOnChanges(){
    this.getAllAddendums();
  }

  getAllAddendums(){
    this.appHttpRequestHandlerService
      .httpGet({ id: this.appRefId }, 'CommonApis', 'getAppAddendumDocs')
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericResponseTemplateModel<IApplicationAddendumDocumentViewModel[]>) => {
        this.appFiles = data.responseDataModel;

        if(this.isUploadOptionShown){
          this.appHttpRequestHandlerService
          .httpGet({ id: this.appRefId }, 'CommonApis', 'determineAddendumUploadOptionShown')
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((resp: GenericResponseTemplateModel<boolean>) => {
            this.isUploadOptionShown = resp.responseDataModel;
          });
        }
      });
  }
  openAddendumModal(uploadAddendumModal){
    this.progress=null;
    this.file = null;
    this.pdfPath ='';
    this.submitted=false;
    this.title ='';
    this.modalService.open(uploadAddendumModal, { size: 'lg', scrollable: true, backdrop: 'static', keyboard: false });
  }
  upload(file){
    this.file = file;
  }
  uploadSelectedFile(){
    this.submitted=true;

    if(this.file.files.length!=0 && this.title.trim().length>0){
      this.modalService.dismissAll();
      const formData = new FormData();
      for (const file of this.file.files) {
          // if (file.size > allowedMaxMB * 1000000) {
          //   isAllOk = false;
          //   control.value = '';
          //   Swal.fire({
          //     icon: 'warning',
          //     title: 'Invalid file size..!',
          //     text: 'Max size allowed: ' + allowedMaxMB + ' MB',
          //   });
          // } else {
            formData.append(file.name, file);
            //this.isAnyFileChanges = true;
          //}



          // if (file.size > allowedMaxMB * 1000000) {
          //   isAllOk = false;
          //   control.value = '';
          //   Swal.fire({
          //     icon: 'warning',
          //     title: 'Invalid file size..!',
          //     text: 'Max size allowed: ' + allowedMaxMB + ' MB',
          //   });
          // }
          // else if (documentExtensionType.split(',').filter(x=>x.toLowerCase().trim() ==  file.name.substring(file.name.lastIndexOf('.'), file.name.length).toLowerCase().trim()).length==0) {
          //   isAllOk = false;
          //   control.value = '';
          //   Swal.fire({
          //     icon: 'warning',
          //     title: 'Invalid file type..!',
          //     text: 'Allowed types: ' + documentExtensionType,
          //   });
          // }
          // else {
          //   formData.append(file.name, file);
          //   this.isAnyFileChanges = true;
          // }



        }
        const uploadReq = new HttpRequest(
          'POST',
          environment.pbLabourDefaultApiRoot + 'CommonApis/UploadAppAddendum',
          formData,
          {
            reportProgress: true,
            headers: new HttpHeaders({
              AppId: this.appRefId.toString(),
              Title: this.title
            }),
          }
        );
        this.httpClient.request(uploadReq).subscribe((event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((100 * event.loaded) / event.total);
          }
          else if(event.type === HttpEventType.Response){
            this.getAllAddendums();
          }
        });
    }
  }
  previewDocument(longContent, fileName, title, lastModifiedDate) {
    this.pdfPath = environment.pbLabourDefaultRoot + 'AppAddendums/' + fileName.trim();
    this.signalEventsService.emitFilePreviewEvent({id: 0, name: fileName, path: this.pdfPath, publicReferenceNum: '', title: title, type: '', uploadedOn: lastModifiedDate, x:0, y: 0,zIndex:0});
    //this.modalService.open(longContent, { scrollable: true, backdrop: 'static', keyboard: false });
  }
  closePreviewModal(){
    this.modalService.dismissAll();
  }
}
