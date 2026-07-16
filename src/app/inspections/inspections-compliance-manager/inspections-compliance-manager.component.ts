import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonService } from 'src/app/common/common.service';
import { AppFileUploadInfoViewModel, GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { GenericResponseTemplateModel, GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { ApplicationProcessService } from 'src/app/applicationProcess/applicationProcess-service';
import { ApplicationProcess, ILatestCircleInfoViewModel, IRecordActionResponseViewModel, IVerifyAppCircleVersionRespViewModel, RoleWiseAllowedActionCode } from 'src/app/applicationProcess/applicationProcess-typed-module';
import { InspectionProcess } from '../Inspections-typed-models';

@Component({
    selector: 'app-inspections-compliance-manager',
    templateUrl: './inspections-compliance-manager.component.html',
    styleUrls: ['./inspections-compliance-manager.component.css'],
    standalone: false
})
export class InspectionsComplianceManagerComponent implements OnInit {
  public parmamEncodedinfo:string;
  public paramInfo:any;
public inspectionRefId : any ;
public inspectionType : any; 
public licenceNumber : any; 
genericFormData: GenericFormModel<ApplicationProcess>;
protected ngUnsubscribe: Subject<void> = new Subject<void>();
public selMenuCode: string = 'NOTINGS';
actionList: RoleWiseAllowedActionCode[] = [];
usersList: any = [];
public appRefId: number;
public projectSiteId: number;
public roleName : any;
notingLogs: any = [];
projectSiteData: any = [];
pdfPath: any = [];
isChecklistBasedScrutiny: boolean = environment.scrutinyConfigs.isChecklistBasedScrutiny;
areAllAgreed: boolean = true;
public checkListForm: any;
public projectSiteRefId: number;
public applicationType: number;
public currentActionCode: number;
appFilesInfo: AppFileUploadInfoViewModel[];
isDocumentUploadOption: boolean = false;
isOptional: boolean = true;
allowTakeAction: number=0;
dofNumber : any;
applicationSpecificData: any;
public circleInfoData: IVerifyAppCircleVersionRespViewModel={isAlreadyUpdated: false,latestCircles:[]};
errCode = 0;
selectedFile: File | null = null;
  base64_String : any;
@ViewChild("locationWarningModal") locationWarningModal: TemplateRef<any>;
constructor(private fb: UntypedFormBuilder,
  private applicationProcessService: ApplicationProcessService,
  private route: ActivatedRoute,
  private appHttpRequestHandlerService: AppHttpRequestHandlerService,
  private cdr: ChangeDetectorRef,
  private router: Router,
  private common: CommonService,
  private modalService: NgbModal,
  public authService: AuthService,
  public commonOpsService: CommonOpsService) { }

//initialization of form
ProcessApplication_Form: TForm<InspectionProcess> = this.fb.group({
  appActionType: ['', Validators.required],
  receiver_UserRefId: ['', Validators.required],
  remarks: ['', Validators.required],
  allowedDays: [0, Validators.required],
  inspectionRefId: ['', Validators.required],
  pdfNameGUID: ['NA', Validators.required],
  userId: ['', Validators.required],
  isDocumentUploaded: [false, Validators.required],
  appDocumentRefId: [0, Validators.required],
  ipAddress : ['', Validators.required],
  latitude : ['', Validators.required],
  longitude : ['', Validators.required],
  inspectionType: ['',Validators.required]

}) as TForm<InspectionProcess>;
UserId: string;
submitted = false;

get formControls() { return this.ProcessApplication_Form.controls; }

upgradeCircle_Form: TForm<ILatestCircleInfoViewModel> = this.fb.group({
  circleId: ['', Validators.required],
  circleType: ['', Validators.required],
  circleName: ['', Validators.required],
  juridcitionArea: ['', Validators.required],
  officerName: ['', Validators.required],
  roleDesc: [''],
  userId: ['', Validators.required],
  userProfileId: [false, Validators.required],
  roleId: ['', Validators.required],
  projectSiteRefId: ['', Validators.required],
  sender_UserRefId: [this.authService.getUserJwtDecodedInfo().UserId.toString(), Validators.required],
  sender_UserProfileRefId: [this.authService.getUserJwtDecodedInfo().UserProfileId.toString(), Validators.required],
}) as TForm<ILatestCircleInfoViewModel>;



factoryApprovalExtraInputsToBeShown:boolean=false;
factoryApprovalBalanceFeeInputsToBeShown:boolean=false;
isLocationOn: boolean=false;

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.parmamEncodedinfo = params.info;
        this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info) => {
          this.paramInfo = info;
          this.inspectionRefId = this.paramInfo.inspectionRefId;
          this.inspectionType =  this.paramInfo.inspectionType;
          this.licenceNumber = this.paramInfo.licenceNumber;
          this.currentActionCode = this.paramInfo.latestAction;
    })
  })
    this.appHttpRequestHandlerService.httpGet({ id: this.authService.getUserJwtDecodedInfo().UserId, currentActionCode:  this.currentActionCode, inspectionType: this.inspectionType }, "Inspection", "getprocessinspectiondetail").pipe(takeUntil(this.ngUnsubscribe))
                .subscribe((data1: GenericFormModel<RoleWiseAllowedActionCode[]>) => {
                  this.actionList = data1.formModel;
                  console.log(this.actionList,'cac')
                  this.isDocumentUploadOption = this.actionList[0].isDocumentUploadOption;
                  this.isOptional = this.actionList[0].isOptional;
                  
                });
  }

  onAlertModelYesClick() {
    this.modalService.dismissAll();
    this.saveActionTaken();
  }
  onModelNoClick() {
    this.modalService.dismissAll();
  }
  saveActionTaken() {
    
    const location = this.common.getCurrentLocation().then((x: any) => {
      this.ProcessApplication_Form.controls.latitude.patchValue(x.latitude);
      this.ProcessApplication_Form.controls.longitude.patchValue(x.longitude);
      this.ProcessApplication_Form.controls.inspectionRefId.patchValue(this.paramInfo.inspectionRefId);
      this.ProcessApplication_Form.controls.userId.patchValue(this.authService.getUserJwtDecodedInfo().UserId);
      this.errCode = 0;
      this.isLocationOn=true;
      this.common.getIpCliente().subscribe((y: any)=>{
      this.ProcessApplication_Form.controls.ipAddress.patchValue(y.ip);
      this.ProcessApplication_Form.controls.inspectionType.patchValue(this.paramInfo.inspectionType);
      if(this.ProcessApplication_Form.controls.appActionType.value != 404){
        this.ProcessApplication_Form.controls.allowedDays.patchValue(0);

      }
        this.appHttpRequestHandlerService.httpPost(this.ProcessApplication_Form.value,"pbsamadhannetcoreapi.ViewModels.InspectionActionViewModel", "Inspection", "addprocessinspectiondetails").pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((data: GenericResponseTemplateModel<IRecordActionResponseViewModel>) => {
              this.router.navigate(['/inspection/licencewise-inspection']) .then(() => {
              window.location.reload();
          });
        });
      })
      }).catch((ex: any) => {
      this.errCode = 1;
      this.isLocationOn=false;
      this.modalService.open(this.locationWarningModal, { size: 'sm', scrollable: true, backdrop: 'static', keyboard: false });
    });
  }

  public onChangeActionDropDown(appActionType) {
    this.ProcessApplication_Form.controls.receiver_UserRefId.patchValue('');
    this.usersList = [];
    this.isDocumentUploadOption = false;
    if (appActionType) {
      let foundActionDetail = this.actionList.filter(x => x.allowedActionCode == appActionType);
      if (foundActionDetail) {
        this.isDocumentUploadOption = foundActionDetail[0].isDocumentUploadOption;
        this.appHttpRequestHandlerService.httpGet({ id: this.authService.getUserJwtDecodedInfo().UserId, actionCode: appActionType, inspectionRefId: this.inspectionRefId, inspectionType: this.inspectionType }, "Inspection", "getuserbyinspectionactioncode").pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: GenericFormModel<any[]>) => {
            this.usersList = data.formModel
          });
      }
    }
  }

  onSubmit(takeActionAlertModal): void {
    
    this.submitted = true;
    var isAllUploaded: Boolean = true;

    this.ProcessApplication_Form.controls.appDocumentRefId.patchValue(0);
    this.ProcessApplication_Form.controls.isDocumentUploaded.patchValue(false);
    this.ProcessApplication_Form.controls.inspectionRefId.patchValue(this.paramInfo.inspectionRefId);
    this.ProcessApplication_Form.controls.latitude.patchValue('N/A');
    this.ProcessApplication_Form.controls.longitude.patchValue('N/A');
    this.ProcessApplication_Form.controls.ipAddress.patchValue('N/A');
    this.ProcessApplication_Form.controls.userId.patchValue(this.authService.getUserJwtDecodedInfo().UserId);
    this.ProcessApplication_Form.controls.inspectionType.patchValue(this.paramInfo.inspectionType);
      if(this.ProcessApplication_Form.controls.appActionType.value != 404){
        this.ProcessApplication_Form.controls.allowedDays.patchValue(0);

      }
    if (this.ProcessApplication_Form.controls.appActionType.value) {
      let foundActionDetail = this.actionList.filter(x => x.allowedActionCode == this.ProcessApplication_Form.controls.appActionType.value);
      this.isDocumentUploadOption = foundActionDetail[0].isDocumentUploadOption;
      this.isOptional = foundActionDetail[0].isOptional;
      console.log(foundActionDetail,'found')
      if (this.isDocumentUploadOption && !this.isOptional) {
        var input: any = document.getElementById(foundActionDetail[0].docRefId.toString());
        console.log(input,'input')
        if (input === null ||input.files.length == 0) {
          isAllUploaded = false;
          document.getElementById(
            'docName_' + foundActionDetail[0].docRefId.toString()
          ).className = 'text-danger';
        } else {
          document.getElementById(
            'docName_' + foundActionDetail[0].docRefId.toString()
          ).className = '';
        }
      }
      if (this.isDocumentUploadOption){
        var appDocRefId = (<HTMLInputElement>document.getElementById("appDocId_"+foundActionDetail[0].docRefId.toString())).value;
        console.log(appDocRefId,'appdoc')
        if(Number(appDocRefId)>0){
        this.ProcessApplication_Form.controls.isDocumentUploaded.patchValue(true);
        }
        this.ProcessApplication_Form.controls.appDocumentRefId.patchValue(Number(appDocRefId));
      }
    }
    if (this.ProcessApplication_Form.valid && isAllUploaded) {
      if(this.ProcessApplication_Form.controls.appActionType.value !=5){
        this.modalService.open(takeActionAlertModal, { size: 'sm', scrollable: true, backdrop: 'static', keyboard: false });
      }
      else{
        Swal.fire({
          icon: 'warning',
          text: 'Approval certificate performa is not available..!',
        });
      }
    }
  }
  navigatePage(){
      this.router.navigate(['/inspection/licencewise-inspection']);
  }

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
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
}
