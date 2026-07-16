import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApplicationTransferParms, InspectionTransferParms, InspectionTransferUserInfo } from 'src/app/applicationProcess/applicationProcess-typed-module';
import { AuthService } from 'src/app/auth/auth.service';
import { TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { GenericResponseTemplateModel } from 'src/app/generic-implementation/generic-service-result-template';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-inspections-dashboard',
    templateUrl: './inspections-dashboard.component.html',
    styleUrls: ['./inspections-dashboard.component.css'],
    standalone: false
})
export class InspectionsDashboardComponent implements OnInit {
  public parmamEncodedinfo: string;
  public paramInfo: any;
  randomizationId: any;
  private ngUnsubscribe = new Subject<void>();
  public inspectionLockedData: any;
  public labourCircleUserDetails: any;
  public assignedInspectionData: any;
  isCollapsed = true;
  public factoryCircleIdByLCId: any;
  public districtIdbyLCId: any;
  public month: number;
  public year: number;
  public factoryRefId: number;
  public usersInfoList: InspectionTransferUserInfo[]=[];
  public selectedInspectionId :  any;
  public notingLogs: any = [];
  public oldInspectionsData: any ;
  isOpen = false;
  iframeUrl: SafeResourceUrl;
  iframeLoaded: boolean = false;
  isLocalStorageSet: boolean = false;
  dataItem: any = [];
  dataItem1: any = [];
  public showInspectionFreezeMessage: boolean = false;

  toggleDrawer() {
    this.isOpen = !this.isOpen;
  }
  Input_Form3: TForm<InspectionTransferParms> = this.fb.group({
    remarks: ['', Validators.required],
    inspectionId: ['', Validators.required],
    circleId: ['',Validators.required],
    receiverUserId : ['',Validators.required],
    receiverRoleId : ['',Validators.required],
    receiverProfileId : ['',Validators.required],
  }) as TForm<InspectionTransferParms>;

  submitted = false;
  get formControls() { return this.Input_Form3.controls; }

  constructor(
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private router: Router,
    public commonOpsService: CommonOpsService,
    public authService: AuthService,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer
  ) { }
  ngOnInit(): void { }
  
  ngAfterViewInit() {
    
    this.route.queryParams
      .subscribe(params => {
        this.parmamEncodedinfo = params.info;
        this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info) => {
          this.paramInfo = info;
          this.randomizationId = this.paramInfo.randomizationRefId;
          this.month = this.paramInfo.month;
          this.year = this.paramInfo.year;
          this.checkInspectionFreezeDate();
          this.appHttpRequestHandlerService.httpGet({ id: this.randomizationId, factoryRefId: this.paramInfo.factoryRefId, roleName : this.authService.getUserJwtDecodedInfo().RoleName, userRefId : this.authService.getUserJwtDecodedInfo().UserId  }, "Inspection", "get_inspectionsByRandomization").pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((data) => {
              this.inspectionLockedData = data.responseDataModel;
             
            });
        });
      });
  }
  navigatePage(urlStr: string, inspectionId : number,establishmentName: string, licenceNumber: string, isLocked : number, appId : number,
    isLegacy : boolean): void {
    if (inspectionId == null) {
        inspectionId = 0 ;
    }
    else 
    {
      inspectionId;
    }
    this.appHttpRequestHandlerService.httpGet({inspectionRefId: inspectionId}, "Inspection", "get_Inspections_FactoryPerformaStepStatus").pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: any) => {
      const hasCompleted = data.responseDataModel.some((item: { isCompleted: number }) => item.isCompleted === 1);
      if(hasCompleted == true && isLocked !== 1){
        var encryptedParms = this.commonOpsService.encodeQueryParamsInBase64(
          { 
            inspectionRefId: inspectionId, 
            randomizationRefId: this.randomizationId,
            month: this.month,
            year: this.year,
            factoryRefId: this.paramInfo.factoryRefId,
            establishmentName:establishmentName,
            licenceNumber: licenceNumber,
            isLocked : isLocked,
            appId : appId,
            isLegacy : isLegacy
          });
          if(this.authService.getUserJwtDecodedInfo().RoleName=="LBIN"){
            this.router.navigate(['/inspection/labour-part-i-general-detail'],{ queryParams: { info: encryptedParms } });
          }
          else{
            this.router.navigate(['/inspection/part-i-general-detail'],{ queryParams: { info: encryptedParms } });
          }
      }
     else if(hasCompleted == true && isLocked == 1){
        var encryptedParms = this.commonOpsService.encodeQueryParamsInBase64(
          { 
            inspectionRefId: inspectionId, 
            randomizationRefId: this.randomizationId,
            month: this.month,
            year: this.year,
            factoryRefId: this.paramInfo.factoryRefId,
            establishmentName:establishmentName,
            licenceNumber: licenceNumber,
            isLocked : isLocked,
            appId : appId,
            isLegacy : isLegacy

          });
          if(this.authService.getUserJwtDecodedInfo().RoleName=="LBIN"||this.authService.getUserJwtDecodedInfo().RoleName=="ALLC"){
            this.router.navigate(['/inspection/' + urlStr],{ queryParams: { info: encryptedParms } });
          }
          else{
            this.router.navigate(['/inspection/' + urlStr],{ queryParams: { info: encryptedParms } });
          }
      }
      else{
        var encryptedParms = this.commonOpsService.encodeQueryParamsInBase64(
        { 
          inspectionRefId: inspectionId, 
          randomizationRefId: this.randomizationId,
          month: this.month,
          year: this.year,
          factoryRefId: this.paramInfo.factoryRefId,
          establishmentName:establishmentName,
          licenceNumber: licenceNumber,
          isLocked : isLocked,
          appId : appId,
            isLegacy : isLegacy
        });
        this.router.navigate(['/inspection/' + urlStr], { queryParams: { info: encryptedParms } });
      }
    });
  }

  getLabourCircleUserDetails(labourCircleRefId,labourWingProfileRefId) {
    this.appHttpRequestHandlerService.httpGet({ id: labourCircleRefId , labourWingProfileRefId : labourWingProfileRefId}, "Inspection", "getInspection_LabourCircleUserDetails").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data) => {
        this.labourCircleUserDetails = data.formModel;
        Swal.fire({
          html: `
              <h6 style="font-size: 20px;color:#0052A3;margin-bottom:20px"> Labour Inspector Detail </h6>
              <h6>Name : <span style="font-size: 15px;">${this.labourCircleUserDetails.fullName}</span></h6>
              <h6>Mobile No : <span style="font-size: 15px;">${this.labourCircleUserDetails.mobileNo}</span></h6>
              <h6>Email : <span style="font-size: 15px;">${this.labourCircleUserDetails.email}</span></h6>
            `
        });
      });
  }

  calculateHourDifference(): string {
    var timeInHrs = this.inspectionLockedData.totalTimeTaken_Hours 
               - (this.inspectionLockedData.totalHolidays + this.inspectionLockedData.totalWeekends);
    if(timeInHrs>48){
      return  "<span class='text-danger'>"+timeInHrs.toString()+"</span>"
    }
    return  "<span class='text-success'>"+timeInHrs.toString()+"</span>"
  }
  getMonthName(monthNumber: number): string {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    return monthNames[monthNumber - 1];
  }

  inspectionTransferClick(longContent, data){
    this.selectedInspectionId = data.inspectionId;
    this.appHttpRequestHandlerService.httpGet({ userRefId : this.authService.getUserJwtDecodedInfo().UserId , roleName: this.authService.getUserJwtDecodedInfo().RoleName }, "Inspection", "getLabourCircleOfficersByInspectionRefId").pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: GenericResponseTemplateModel<InspectionTransferUserInfo[]>) => {
      this.usersInfoList = data.responseDataModel;
    });

    this.modalService.open(longContent, { scrollable: true, backdrop: 'static', keyboard: true, size:'md'});
  }

  transferInspection(){
    const inspectionType = this.authService.getUserJwtDecodedInfo().RoleName === 'LBIN' ? 2 : 1;
    this.appHttpRequestHandlerService.httpGet({
      inspectionId : this.selectedInspectionId,
       hasAssignedLabourCircle : false, 
       circleRefId : this.Input_Form3.controls.circleId.value,
       senderUserId : this.authService.getUserJwtDecodedInfo().UserId,
       senderRoleId : this.authService.getUserJwtDecodedInfo().RoleId,
       senderrRoleName : this.authService.getUserJwtDecodedInfo().RoleName,
       receiverUserId : this.Input_Form3.controls.receiverUserId.value,
       receiverRoleId : this.Input_Form3.controls.receiverRoleId.value,
       receiverProfileId : this.Input_Form3.controls.receiverProfileId.value,
       remarks : this.Input_Form3.controls.remarks.value,
       inspectionType : inspectionType

      
      }, "Inspection", "Transfer_Inspection_MasterUsingInspectionId").pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data) => {
      this.modalService.dismissAll();
      window.location.reload();
      
    });
  }

  setReceiverDetails(circleId: number, receiverUserId : string ,receiverRoleId : string , receiverProfileId : number ){
    
    
    this.Input_Form3.controls.circleId.patchValue(circleId);
    this.Input_Form3.controls.receiverUserId.patchValue(receiverUserId);
    this.Input_Form3.controls.receiverRoleId.patchValue(receiverRoleId);
    this.Input_Form3.controls.receiverProfileId.patchValue(receiverProfileId);
    //receiverProfileId
    
   }


  dismissAllModals(){
    this.modalService.dismissAll();
  }

  // downloadInspection(inspectionId,inpectionType){
  //   this.appHttpRequestHandlerService.httpGet({
  //     inspectionRefId : inspectionId,
  //     inspectiontype : inpectionType
      
  //     }, "PdfOprations", "generateInspectionPdf").pipe(takeUntil(this.ngUnsubscribe))
  //   .subscribe((data) => {
      
      
  //   });
  // }


  downloadViolationReport(inspectionId,inpectionType) {

    this.appHttpRequestHandlerService.httpGet({ inspectionRefId : inspectionId,inspectionType : inpectionType}, "PdfOprations", "generateInspectionViolationPdf")
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: any) => {
        var blob = this.base64toBlob(data.pdfContent, "application/pdf");
        let a = document.createElement("a");
        document.body.appendChild(a);
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = String(data.fileNo + ".pdf");
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      }
    )};
  
  // loadIframe(item,longContent3) {
  //   this.dataItem = [];
  //     this.dataItem = item;
  //     localStorage.setItem('AuthToken', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVU0VSX0lEIjoiNjgyNGJjN2EtMjI1Yy00NTU2LWFiNTMtMTM1YmFlMTcxMzYxIiwiVVNFUl9OQU1FIjoiR2F1cmF2IFB1cmkiLCJST0xFIjoiQVBQUyIsIkxPR0lOX0RUIjoiMTgvMDQvMjAyNCIsIkxPR0lOX1RZUEUiOiJCUCIsIlJFVF9VUkwiOiJhc2RmYXNkZmFjY2EiLCJBUElfUEFUSCI6Imh0dHA6Ly9sb2NhbGhvc3QvIiwiQkFDS19UT19FTEFCX1BBVEgiOiJodHRwczovL3BibGFib3VyLmdvdi5pbi9lTGFib3VyL0FjY291bnQvTG9naW5Gcm9tUFdCUyIsImlhdCI6MTcxNDYyMzg5NiwiZXhwIjoxODcyNDExODk2fQ.qWIwCPUjb8wh6lHkTdlV5WJQmKNoY6I-QLQwz6fIG6Q" );
  //     if (localStorage.getItem('AuthToken')) {
  //       this.isLocalStorageSet = true;
  //     } else {
  //       this.isLocalStorageSet = false;
        
  //     }
  //     this.modalService.open(longContent3, { scrollable: true });
  //   // Sanitize the URL and set the iframeUrl
  //    let userId = this.authService.getUserJwtDecodedInfo().UserId;
  //    let  FIId = this.dataItem.fiId;
  //    let  year = this.dataItem.randomizationYear;
  //    let month = this.dataItem.randomizationMonth;
  
  // // Construct the URL with parameters
  // let url = `https://pblabour.gov.in/wbapp/inspect/inspect-detail?UserId=${userId}&FIID=${FIId}&Year=${year}&Month=${month}`;
  
  // // Sanitize the URL
  // this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  //   this.iframeLoaded = true;
  // }
  // getAssignedInspectionsListForLBIN(){
  //   this.appHttpRequestHandlerService.httpGet({ labourCircleRefId: this.paramInfo.factoryRefId }, "Inspection", "getFactoryCircleIdByLabourCircleId").pipe(takeUntil(this.ngUnsubscribe))
  //           .subscribe((data) => {
  //             this.factoryCircleIdByLCId = data.responseDataModel.factoryCircleId;
  //             this.districtIdbyLCId = data.responseDataModel.districtId;
  //             this.appHttpRequestHandlerService.httpGet({ districtRefId: this.districtIdbyLCId }, "CircleManager", "getLabourCircleByalcCircleRefId").pipe(takeUntil(this.ngUnsubscribe))
  //             .subscribe((data) => {
  //             });
  //           //   this.appHttpRequestHandlerService.httpGet({ id: this.randomizationId, factoryRefId: this.factoryCircleIdByLCId }, "Inspection", "get_inspectionsByRandomization").pipe(takeUntil(this.ngUnsubscribe))
  //           // .subscribe((data) => {
  //           //   this.assignedInspectionData = data.responseDataModel;
  //           //   console.log(this.assignedInspectionData,'asadsasa')
  //           // });
  //           });
  // }

  

  checkInspectionFreezeDate() {
    const freezeDate = new Date(this.year,this.month,16)
    const todayDate = new Date()
    if (freezeDate > todayDate) {
      this.showInspectionFreezeMessage = false; 
    }
    else 
    {
      this.showInspectionFreezeMessage = true;
    }
  }


  showinspectionFreezDetails(year,month) {
    
    Swal.fire({
      html: `
          <h6 style="font-size: 20px;color:#e22d19 ;margin-bottom:20px"> Inspections Freezed....! </h6>
          <h6>As per the instructions given by the department <span style="font-size: 15px;color:#0052A3;"> (Refer to Point. No.: E. INSPECTIONS Dated: 10/09/2024)</span>, After 3rd of every month inspections which are not conducted in the previous month will be frozen.<a target="_blank" href="assets/file/LetterInspection.pdf" style="color: #0052A3; font-weight: 800;font-size: larger;"> Download Instructions </a></h6>

        `
    });
  }

  viewCompliance(inspectionRefId,inspectionType,licenceNumber)
  {
    var encryptedParms=this.commonOpsService.encodeQueryParamsInBase64(
      {
        inspectionRefId: inspectionRefId,
        inspectionType: inspectionType,
        licenceNumber : licenceNumber
      });
  
    this.router.navigate(['/inspection/compliance-manager'],{ queryParams:{info: encryptedParms}});
  
  }

  viewComplianceLogs(item,inspectionType,longContent) {
    this.dataItem = [];
      this.dataItem = item;
      this.modalService.open(longContent, { scrollable: true });
    this.appHttpRequestHandlerService.httpGet({ inspectionRefId: this.dataItem.inspectionId,
      inspectionType : inspectionType
      }, "Inspection", "getInspectionLogsByInspectionId").pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data) => { 
             this.notingLogs = data.responseDataModel
    })
  }

    public base64toBlob(b64Data, contentType) {
      contentType = contentType || '';
      let sliceSize = 512;
    
      var byteCharacters = atob(b64Data);
      var byteArrays = [];
    
      for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          var slice = byteCharacters.slice(offset, offset + sliceSize);
    
          var byteNumbers = new Array(slice.length);
          for (var i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
          }
          var byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
      }
    
      var blob = new Blob(byteArrays, { type: contentType });
      return blob;
    }

    getInspectionTransferLogs(inspectionID,longContent) {
      this.dataItem = [];
        this.modalService.open(longContent, { scrollable: true });
        
        const inspectionType = this.authService.getUserJwtDecodedInfo().RoleName === 'LBIN' ? 2 : 1;

        this.appHttpRequestHandlerService.httpGet(
          { 
            inspectionRefId: inspectionID,
            inspectionType: inspectionType
          }, 
          "Inspection", 
          "getInspectionTranferLogs"
        ).pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data) => { 
          this.notingLogs = data.responseDataModel;
        });
        
    }
    loadIframe(inspectionId : number) {

      this.appHttpRequestHandlerService.httpGet({ inspectionRefId: inspectionId
      }, "Inspection", "getOldInspectionId").pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data) => { 
             this.oldInspectionsData = data.formModel
   
  this.dataItem = [];
    localStorage.setItem('AuthToken', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVU0VSX0lEIjoiNjgyNGJjN2EtMjI1Yy00NTU2LWFiNTMtMTM1YmFlMTcxMzYxIiwiVVNFUl9OQU1FIjoiR2F1cmF2IFB1cmkiLCJST0xFIjoiQVBQUyIsIkxPR0lOX0RUIjoiMTgvMDQvMjAyNCIsIkxPR0lOX1RZUEUiOiJCUCIsIlJFVF9VUkwiOiJhc2RmYXNkZmFjY2EiLCJBUElfUEFUSCI6Imh0dHA6Ly9sb2NhbGhvc3QvIiwiQkFDS19UT19FTEFCX1BBVEgiOiJodHRwczovL3BibGFib3VyLmdvdi5pbi9lTGFib3VyL0FjY291bnQvTG9naW5Gcm9tUFdCUyIsImlhdCI6MTcxNDYyMzg5NiwiZXhwIjoxODcyNDExODk2fQ.qWIwCPUjb8wh6lHkTdlV5WJQmKNoY6I-QLQwz6fIG6Q" );
    if (localStorage.getItem('AuthToken')) {
      this.isLocalStorageSet = true;
    } else {
      this.isLocalStorageSet = false;
      
    }
  
  // Sanitize the URL and set the iframeUrl
   let userId = this.authService.getUserJwtDecodedInfo().UserId;
   let  FIId = this.oldInspectionsData.factoryInspectionId;
   let  year = this.oldInspectionsData.year;
   let month = this.oldInspectionsData.month;

// Construct the URL with parameters
let url = `https://pblabour.gov.in/wbapp/inspect/inspect-detail?UserId=${userId}&FIID=${FIId}&Year=${year}&Month=${month}`;

// Sanitize the URL
this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  this.iframeLoaded = true;
  window.open(url, '_blank');
   })
}

}

