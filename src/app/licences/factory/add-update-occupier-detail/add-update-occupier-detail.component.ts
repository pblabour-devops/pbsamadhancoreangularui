import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/common/common.service';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { Licence_Factory_OccupierAndManagerDetail } from '../../licences-typed-models';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';

@Component({
    selector: 'app-add-update-occupier-detail',
    templateUrl: './add-update-occupier-detail.component.html',
    styleUrls: ['./add-update-occupier-detail.component.css'],
    standalone: false
})
export class AddUpdateOccupierDetailComponent implements OnInit {
  genericFormData: GenericFormModel<Licence_Factory_OccupierAndManagerDetail>;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  public appFormStepsList: any[];
  public paramInfo:any;
  public parmamEncodedinfo:string;
  submitted:boolean=false;
  hasSubmitClicked: boolean = false;
  public appRefId : any;
  public projectSiteRefId : any;
  public projectSiteVersion : any;
  public isEditAllowed : boolean;

  constructor(private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService, 
    private cdr: ChangeDetectorRef,
    private router: Router,
    public common:CommonService,
    public commonOpsService: CommonOpsService,
    private modalService: NgbModal) { }

  Input_Form: TForm<Licence_Factory_OccupierAndManagerDetail> = this.fb.group({
    occupierAndManagerDetailId: [0, Validators.required],
    managerFullName : ['', Validators.required],
    managerFatherName : ['', Validators.required],
    managerFullAddress : ['', Validators.required],
    managerMobile : ['', [Validators.required, Validators.maxLength(10)]],
    managerEmail : ['', Validators.required],
    managerResidentialAddress : ['', Validators.required],
    occupierFullName : ['', Validators.required],
    occupierFatherName : ['', Validators.required],
    occupierFullAddress : ['', Validators.required],
    occupierMobile : ['', [Validators.required, Validators.maxLength(10)]],
    occupierEmail : ['', Validators.required],
    occupierResidentialAddress : ['', Validators.required],
    ownerName : ['', Validators.required],
    ownerPremisesAddress : ['', Validators.required],
    stabilityCertificateNumber : ['', Validators.required],
    stabilityCertificateDate : ['', Validators.required],
    stabilityDOFNumber : ['', Validators.required],
    checklist_IsBuildingPlanApproved : ['', Validators.required],
    checklist_IsLabourWelfareFundPaid : ['', Validators.required],
    checklist_IsAnnualReturnFiled : ['', Validators.required],
    checklist_IsStabilityCertificateAttached : ['', Validators.required],
    factoryLicenceRefId : [0, Validators.required],
    appRefId : [0, Validators.required],
    
  }) as TForm<Licence_Factory_OccupierAndManagerDetail>;
  get formControls() { return this.Input_Form.controls; }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.route.queryParams
    .subscribe(params => {
      this.parmamEncodedinfo=params.info;
      this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info)=>{
        this.paramInfo = info;
        this.appRefId=this.paramInfo.appRefId
        this.projectSiteRefId = this.paramInfo.projectSiteRefId;
        this.projectSiteVersion = this.paramInfo.projectSiteVersion;
        if (this.paramInfo.identityKey != 0) {
          this.Input_Form.patchValue({ factoryLicenceRefId: this.paramInfo.identityKey });
          this.appHttpRequestHandlerService.httpGet({ id: this.paramInfo.identityKey }, "FactoryLicence", "getOccupierAndManagerDetail").pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: GenericFormModel<Licence_Factory_OccupierAndManagerDetail>) => {
            this.isEditAllowed = data.isEditAllowed;
            this.initFormData(data);
          });
        }});
    });
  }
  initFormData(genericFormData: GenericFormModel<Licence_Factory_OccupierAndManagerDetail>) {
    this.genericFormData = genericFormData;
    this.appFormStepsList = this.genericFormData.appFormStepsList;
    if (genericFormData.formModel != null && genericFormData.formModel.factoryLicenceRefId != 0) {
      this.Input_Form.patchValue(genericFormData.formModel);
      this.Input_Form.controls.stabilityCertificateDate.patchValue(this.formatDateTime(new Date(genericFormData.formModel.stabilityCertificateDate)));
      // this.Input_Form.patchValue({
      //  managerFullName : this.genericFormData.formModel.managerFullName,
      //  managerFatherName :this.genericFormData.formModel.managerFatherName,
      //  managerFullAddress : this.genericFormData.formModel.managerFullAddress
      
      // })
    }
  }

  private formatDateTime(date: Date): string {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    const hours = `${date.getHours()}`.padStart(2, '0');
    const minutes = `${date.getMinutes()}`.padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  onSubmit(): void {
    this.submitted=true;
    this.Input_Form.controls.appRefId.patchValue(this.appRefId)
    var inputForm = this.Input_Form.getRawValue();
    if(this.Input_Form.valid){
    this.hasSubmitClicked=true;
    this.appHttpRequestHandlerService.httpPost(inputForm, "pbsamadhannetcoreapi.Models.Licence_Factory_OccupierAndManagerDetail", "FactoryLicence", "addUpdate_OccupierAndManagerDetail").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericServiceResultTemplate) => {
        this.router.navigate([this.appFormStepsList.find(x=>x.stepCode=='OD').uiNextPageComponentPath],{queryParams: { info: this.commonOpsService.encodeQueryParamsInBase64( {
          identityKey: data.applicationInitiateResponse.entityKeyId, 
          appRefId: this.appRefId, 
          applicationType: 70, 
          projectSiteRefId: this.paramInfo?.projectSiteRefId, 
          applicationPurposeType: this.paramInfo?.applicationPurposeType,
          investPunjab_AppId: this.paramInfo?.investPunjab_AppId,
          iPin: this.paramInfo?.iPin,
          projectSiteVersion: this.paramInfo?.projectSiteVersion
        }
        )}});
      });
    }
  }
}
