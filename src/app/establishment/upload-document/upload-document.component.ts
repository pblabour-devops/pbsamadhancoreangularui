import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common/common.service';

@Component({
    selector: 'app-upload-document',
    templateUrl: './upload-document.component.html',
    styleUrls: ['./upload-document.component.css'],
    standalone: false
})

export class UploadDocumentComponent implements OnInit {
  Alls: any = ['jpg', 'png','pdf','jpeg','doc','docx'];
  imgFiles:any=['jpg', 'png','jpeg']
  pdfFiles:any=['pdf']
  DocFiles:any=['doc','docx']
  imgOrPdf:any=['pdf','jpg','png','jpeg']
  uploading = false
    percentUpload = 0
  constructor(private common:CommonService) { }

  ngOnInit(): void {
  }

  public  uploadFile(fileToUpload: File) {
    const _formData = new FormData();
     _formData.append('file', fileToUpload, fileToUpload.name);

     alert(fileToUpload.name)
alert(fileToUpload)
    //  if(o){
    //  _formData.append('ip',JSON.stringify(o));
    //  }
    // const reqs = new HttpRequest('POST', this.host + '/upload/image', _formData, {
    //     reportProgress: true,
    // });
    // return <any>this.httpClient.request(reqs);
}

public  fileEvent($event, filetypes) {
  var fileSize=5.0;
  var eleFile=$event.target
  const fileSelected: File = $event.target.files[0];
  const size=(($event.target.files[0].size)/1024)/1024;
  //alert(size)
  let temparr = fileSelected.name.split('.');
  let extfile = temparr[temparr.length - 1]


  if(this.imgFiles.indexOf(extfile.toLowerCase())>-1){
          fileSize=0.5;
  }else if(this.pdfFiles.indexOf(extfile.toLowerCase())>-1){
          fileSize=2;
  }


  if (filetypes.indexOf(extfile.toLowerCase()) > -1 && size<fileSize) {
      ////////////////////////// upload file ///////////////////////////
      this.uploading = true;
      var prog = this.uploadFile(fileSelected)        
  }
    else{
      alert("ërror");
    }
  }
}
