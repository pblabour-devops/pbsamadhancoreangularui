import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { ApplicationWithdraw } from '../../third-party-integration-typed.models';
import { Subject } from 'rxjs';
import { GenericResponseTemplateModel, GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ICRUD_CreateUpdateOperationResponse } from 'src/app/typed-model/crud-typed-models';
import { environment } from 'src/environments/environment';
import { CommonOpsService } from 'src/app/shared/common-ops-service';

@Component({
    selector: 'app-withdraw-application',
    templateUrl: './withdraw-application.component.html',
    styleUrls: ['./withdraw-application.component.css'],
    standalone: false
})
export class WithdrawApplicationComponent implements OnInit, OnDestroy {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  submitted = false;
  Input_Form: TForm<ApplicationWithdraw>;
  public parmamEncodedinfo: string;
  public projectSiteRefId : any;
  public appRefId : any;
  public projectSiteVersion : any;
  public applicationType : any;
  public isApplicationFound: boolean=false;
  public isInitialCheckFinishes: boolean=false;
  public iPin: number=0;
  public appId:number=0;
  public applicationPurposeType:number=0;
  constructor(
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private modalService: NgbModal,
    public commonOpsService: CommonOpsService
  ) {
    this.Input_Form = this.fb.group({
      remarks: ['', Validators.required],
      appRefId: ['', Validators.required],
      iPin: [0, Validators.required],
      appId: [0, Validators.required],
      applicationType: ['', Validators.required],
      applicationPurposeType: [1, Validators.required],
      projectSiteRefId: [0, Validators.required],
      projectSiteVersion: [0, Validators.required],
      toDoActivityModeType: [0, Validators.required],
      rootActivityRefId: ['', Validators.required],
      toDoActivityCategoryType: [0, Validators.required]
    }) as TForm<ApplicationWithdraw>;
  }

  ngOnInit(): void {}

  get formControls() {
    return this.Input_Form.controls;
  }

   ngAfterViewInit() {
      this.route.queryParams
        .subscribe(params => {
            this.appHttpRequestHandlerService.httpGet({requestData:params.msg}, "ThirdPartyIntegrations", "withdrawApplication").pipe(takeUntil(this.ngUnsubscribe))
              .subscribe((data: GenericResponseTemplateModel<ApplicationWithdraw>) => { 
                this.isInitialCheckFinishes=true;
                if(data.responseDataModel.appRefId>0){
                  this.isApplicationFound=true;
                  this.projectSiteRefId = data.responseDataModel.projectSiteRefId;
                  this.appRefId = data.responseDataModel.appRefId;
                  this.projectSiteVersion = data.responseDataModel.projectSiteVersion;
                  this.applicationType = data.responseDataModel.applicationType;
                  this.iPin = data.responseDataModel.iPin;
                  this.appId = data.responseDataModel.appId;
                  this.applicationPurposeType = data.responseDataModel.applicationPurposeType;
                }
                else
                {
                    window.location.href =  environment.thirdPartyIntegrationConfigs.sys_o_urls.nxttoElabor + params.msg;
                }
            });
        });
    }

  onSubmit(): void {
    this.submitted = true;
     if (this.Input_Form.controls.remarks.invalid) {
      this.Input_Form.markAllAsTouched();
      return;
    }
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, withdraw my application!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        const current = new Date();
        const timestamp = current.getTime();
        this.Input_Form.controls.toDoActivityModeType.patchValue(6);
        this.Input_Form.controls.rootActivityRefId.patchValue(timestamp);
        this.Input_Form.controls.toDoActivityCategoryType.patchValue(7);
        this.Input_Form.controls.appRefId.patchValue(this.appRefId);
        this.Input_Form.controls.iPin.patchValue(this.iPin);
        this.Input_Form.controls.appId.patchValue(this.appId);
        this.Input_Form.controls.applicationType.patchValue(this.applicationType);
        this.Input_Form.controls.applicationPurposeType.patchValue(this.applicationPurposeType);
        this.Input_Form.controls.appRefId.patchValue(this.appRefId);
        this.Input_Form.controls.projectSiteRefId.patchValue(this.projectSiteRefId);
        this.Input_Form.controls.projectSiteVersion.patchValue(this.projectSiteVersion);
        this.appHttpRequestHandlerService.httpPost(this.Input_Form.value,'pbsamadhannetcoreapi.ViewModels.WithdrawApplicationSubmissionViewModel','Crud','CreateUpdate')
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: ICRUD_CreateUpdateOperationResponse) => {
            if (!data.hasExceptions) {
              document.location.href = environment.thirdPartyIntegrationConfigs.investPunjab.investPunjabReturnPath;
            }
          });
      }
    });
  }

  backToHome(){
    document.location.href = environment.thirdPartyIntegrationConfigs.investPunjab.investPunjabReturnPath;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
