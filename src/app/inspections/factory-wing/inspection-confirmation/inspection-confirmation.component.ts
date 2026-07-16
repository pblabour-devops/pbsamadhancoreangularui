import { Component, HostListener, Inject, OnInit, DOCUMENT } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { Inspection_LockInfo, Inspection_Master } from '../../Inspections-typed-models';
import { GenericResponseTemplateModel, GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';

import { ChangeDetectorRef } from '@angular/core';
import { CircleManagerViewModel, GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import 'src/assets/js/popper.min';
import { AuthService } from 'src/app/auth/auth.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InspectionTransferParms, InspectionTransferUserInfo } from 'src/app/applicationProcess/applicationProcess-typed-module';

@Component({
    selector: 'app-inspection-confirmation',
    templateUrl: './inspection-confirmation.component.html',
    styleUrls: ['./inspection-confirmation.component.css'],
    standalone: false
})
export class InspectionConfirmationComponent implements OnInit {
  public parmamEncodedinfo:string;
  public paramInfo:any;
  randomizationId:any;
  private ngUnsubscribe = new Subject<void>();
  public randomizationData : any;
  public randomizationMasterData : any;
  public labourCircleData : any;
  public labourCircleId : number;
  public unAssignedData : any;
  public unAssignedDataCount : any;
  public assignedData : any;
  public filteredData:any;
  public assignedAndLockedButton :boolean;
  public inspectionData : any;
  windowScrolled: boolean;
  isFloatingBucketToBeTop: boolean;
  Input_Form: TForm<Inspection_Master>;
  Input_Form1: TForm<Inspection_LockInfo>;
  public labourCircleUserDetails: any;
  dragged: any = null;
  public districtRefId : number;
  public factoryRefId: number;
  public usersInfoList: InspectionTransferUserInfo[]=[];
  public selectedInspectionId :  any;
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
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: UntypedFormBuilder,
    public commonOpsService: CommonOpsService,
    private cdr: ChangeDetectorRef,
    public authService : AuthService,
    private modalService: NgbModal,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.Input_Form = this.fb.group({
      inspectionId: [],
      isFromLegacySystem: [],
      appId: [],
      nar: [],
      applicationType: [],
      inspectionStatusType: [],
      districtRefId: [],
      factoryCircleRefId: [],
      alcCircleRefId: [],
      hasAssignedLabourCircle: [],
      labourCircleRefId: [],
      randomizationRefId: [],

  }) as TForm<Inspection_Master>;

  this.Input_Form1 = this.fb.group({
    lockId: [],
    factoryCircleRefId: [],
    isLocked: [],
    lockedOn: [],
    lockedBy_UserId: [],
    lockedBy_ProfileId: [],
    lockedBy_RoleId: [],
    randomizationRefId: []
}) as TForm<Inspection_LockInfo>;}

@HostListener("window:scroll", [])
onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 500) {
      this.isFloatingBucketToBeTop = true;
    } 
    else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
        this.isFloatingBucketToBeTop = false;
    }

    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
        this.windowScrolled = true;
    } 
   else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
        this.windowScrolled = false;
    }
}
scrollToTop() {
    (function smoothscroll() {
        var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - (currentScroll / 8));
        }
    })();
}


  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.parmamEncodedinfo=params.info;
        this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info)=>{
        this.paramInfo = info;
        this.randomizationId = this.paramInfo.randomizationRefId;
        this.getRandomizationMasterData();
        });
      });
  }

  getMonthName(monthNumber: number): string {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    return monthNames[monthNumber - 1];
  }

  getRandomizationMasterData()
  {
    var userDetails = this.authService.getUserJwtDecodedInfo();
    this.appHttpRequestHandlerService.httpGet({id: this.paramInfo.randomizationRefId ,userId : userDetails.UserId }, "Inspection", "getInspection_MasterDataByRandomizationIdWithStabblishmentNameAddress").pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data) => {
          this.randomizationMasterData = data.formModel;
          this.loadCircles();
          this.unAssignedData =  this.randomizationMasterData.filter(data => !data.hasAssignedLabourCircle);
          this.unAssignedDataCount= this.unAssignedData.length;
          this.assignedData =  this.randomizationMasterData.filter(data => data.hasAssignedLabourCircle);
          (this.assignedData, 'assigned') 
          this.assignedAndLockedButton = this.unAssignedData ==0 ? true:false;
    });
    // this.appHttpRequestHandlerService.httpGet({id: this.paramInfo.randomizationRefId}, "Inspection", "getInspection_Randomization").pipe(takeUntil(this.ngUnsubscribe))
    // .subscribe((data) => {
    //   this.randomizationData = data.formModel;
    //   this.assignedAndLockedButton = this.randomizationData[0].totalPending === 0 ? true:false;
    // });
  }

  // loadCircles(){
  //   if(this.randomizationMasterData[0].districtRefId!=undefined || this.randomizationMasterData.length !== 0){
  //   this.appHttpRequestHandlerService.httpGet({ districtRefId: this.randomizationMasterData[0].districtRefId }, "CircleManager", "getLabourCircleByalcCircleRefId").pipe(takeUntil(this.ngUnsubscribe))
  //     .subscribe((data: GenericFormModel<CircleManagerViewModel>) => {
  //       this.labourCircleData= data.formModel;
  //       console.log(this.labourCircleData, '>>>')
  //     });
  //   }
  // }

  loadCircles(){
    this.appHttpRequestHandlerService.httpGet({ userId: this.authService.getUserJwtDecodedInfo().UserId }, "Inspection", "getDistrictRefIdByUserId").pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data) => {
      this.districtRefId = data.responseDataModel;
      if(this.randomizationMasterData[0].districtRefId!=undefined || this.randomizationMasterData.length !== 0){
        this.appHttpRequestHandlerService.httpGet({ districtRefId: this.districtRefId }, "Inspection", "inspection_getLabourCircleByalcCircleRefId").pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: any) => {
            this.labourCircleData= data.formModel;
          });
        }
    });
  }

  getAssignedDataByLabourCircleId(labourCircleId: number) {
    this.filteredData = this.assignedData.filter(data => data.labourCircleId === labourCircleId);
    return this.assignedData.filter(data => data.labourCircleId === labourCircleId);
  }

  navigatePage(urlStr: string): void{
    var encryptedParms=this.commonOpsService.encodeQueryParamsInBase64({randomizationId:this.randomizationId});
     this.router.navigate(['/inspection/' + urlStr], { queryParams: {info: encryptedParms}});
    
    
  }

  patchValueInInputForm(filteredData)
  {
    this.Input_Form.value.inspectionId=filteredData.inspectionId,
    this.Input_Form.value.inspectionId= filteredData.inspectionId,
    this.Input_Form.value.isFromLegacySystem= filteredData.isFromLegacySystem,
    this.Input_Form.value.appId= filteredData.appId,
    this.Input_Form.value.nar= filteredData.nar,
    this.Input_Form.value.applicationType= filteredData.applicationType,
    this.Input_Form.value.inspectionStatusType= filteredData.inspectionStatusType,
    this.Input_Form.value.districtRefId= filteredData.districtRefId,
    this.Input_Form.value.factoryCircleRefId= filteredData.factoryCircleRefId,
    this.Input_Form.value.alcCircleRefId= filteredData.alcCircleRefId,
    this.Input_Form.value.hasAssignedLabourCircle= filteredData.hasAssignedLabourCircle,
    this.Input_Form.value.labourCircleRefId= filteredData.labourCircleRefId,
    this.Input_Form.value.randomizationRefId= filteredData.randomizationRefId
  }

  patchValueInInputForm1LockedInspection()
  {
    var userDetails = this.authService.getUserJwtDecodedInfo();
    this.Input_Form1.value.lockId=0,
    this.Input_Form1.value.factoryCircleRefId=this.paramInfo.factoryRefId,
    this.Input_Form1.value.isLocked= true,
    this.Input_Form1.value.lockedOn= '1900-01-01 09:03:39.0124242',
    this.Input_Form1.value.lockedBy_UserId= userDetails.UserId,
    this.Input_Form1.value.lockedBy_ProfileId= userDetails.UserProfileId,
    this.Input_Form1.value.lockedBy_RoleId= userDetails.UserId,
    this.Input_Form1.value.randomizationRefId= this.assignedData[0].randomizationRefId
  }

  onDragStart(event: DragEvent,data:any) {
    this.patchValueInInputForm(data)
  }

  onDragEnd(event: DragEvent) {
  }

  onDragOver(event: DragEvent,test :any) {
    event.preventDefault();
  }

  getAssignedDataCount(labourCircleId: string): number {
    return this.assignedData.filter(data => data.labourCircleRefId === labourCircleId).length;
  }

  // getUnAssignedDataCount(): number {
  //   return this.unAssignedData.length;
  // }

  onDrop(event: DragEvent,labourCircleId :any, userProfileId) {
    this.Input_Form.value.hasAssignedLabourCircle = (labourCircleId === '000' ? false: true);
    this.Input_Form.value.labourCircleRefId = labourCircleId === '000' ? 0 : labourCircleId;
    if (this.Input_Form.valid && (labourCircleId === '000' || labourCircleId !==null || labourCircleId !== undefined)) {
      this.appHttpRequestHandlerService.httpGet({inspectionId:  this.Input_Form.value.inspectionId,
        hasAssignedLabourCircle:this.Input_Form.value.hasAssignedLabourCircle,
        labourCircleRefId: this.Input_Form.value.labourCircleRefId,
        labourWingUserProfileRefId :userProfileId}, "Inspection", "update_Inspection_MasterUsingInpectionId").pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data) => {
          this.getRandomizationMasterData();
        });
    } 
  }

  lockInspectionInfo()
  {
    this.patchValueInInputForm1LockedInspection();
    (this.Input_Form1,'inputt')
    if (this.Input_Form1.valid) {

      this.appHttpRequestHandlerService.httpPost(this.Input_Form1.value, "pbsamadhannetcoreapi.Models.Inspection_LockInfo", "Inspection", "lock_AssignmentInfo")
        .subscribe((data: GenericServiceResultTemplate) => {
          var encryptedParms=this.commonOpsService.encodeQueryParamsInBase64(
            {
              randomizationRefId: this.paramInfo.randomizationRefId, 
              month: this.paramInfo.month, 
              year: this.paramInfo.year,
              factoryRefId: this.paramInfo.factoryRefId
            });
            this.router.navigate(['/inspection/inspection-dashboard'], { queryParams: {info: encryptedParms}})
        });
    }
  }

  backToRandomizationDashboard()
  {
    var encryptedParms=this.commonOpsService.encodeQueryParamsInBase64(
      {
        randomizationRefId: this.paramInfo.randomizationRefId, 
        month: this.paramInfo.month, 
        year: this.paramInfo.year,
        factoryRefId: this.paramInfo.factoryRefId
      });
      this.router.navigate(['/inspection/randomization'], { queryParams: {info: encryptedParms}})
    
  }

  viewLabourCircleClick(longContent, data){
    this.patchValueInInputForm(data)
    // this.appHttpRequestHandlerService.httpGet({ id: data.labourCircleRefId }, "Inspection", "getInspection_LabourCircleUserDetails").pipe(takeUntil(this.ngUnsubscribe))
    //   .subscribe((data) => {
    //     this.labourCircleUserDetails = data.formModel;
    //   });

    this.inspectionData = data;
    this.modalService.open(longContent, { scrollable: true, backdrop: 'static', keyboard: true, size:'md'});
  }

  assignToLabourWing(labourCircleId :any, userProfileId : any){
    this.Input_Form.value.hasAssignedLabourCircle = (labourCircleId === '000' ? false: true);
    this.Input_Form.value.labourCircleRefId = labourCircleId === '000' ? 0 : labourCircleId;
    if (this.Input_Form.valid && (labourCircleId === '000' || labourCircleId !==null || labourCircleId !== undefined)) {
      this.appHttpRequestHandlerService.httpGet({inspectionId:  this.Input_Form.value.inspectionId,
        hasAssignedLabourCircle:this.Input_Form.value.hasAssignedLabourCircle,
        labourCircleRefId: this.Input_Form.value.labourCircleRefId,
      labourWingProfileRefId: userProfileId}, "Inspection", "update_Inspection_MasterUsingInpectionId").pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data) => {
          this.getRandomizationMasterData();
        });
        this.dismissAllModals();
    } 
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
}
