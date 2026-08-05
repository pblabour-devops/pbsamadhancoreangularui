import { Component, Input, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { AppHttpRequestHandlerService } from '../../app-http-request-handler.service';
import { GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { Subject } from 'rxjs';
import { takeUntil, timeout } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CommonOpsService } from '../../common-ops-service';
import { environment } from 'src/environments/environment';


@Component({
    selector: 'app-common-appform-detail-page',
    templateUrl: './common-appform-detail-page.component.html',
    styleUrls: ['./common-appform-detail-page.component.css'],
    standalone: false
})
export class CommonAppformDetailPageComponent implements OnInit {

  @Input() appRefId: number;
  @Input() entityPrimaryid: number;
  @Input() applicationType: number;
  @Input() projectSiteRefId: number;
  @Input() isStepperHidden: boolean;
  @Input() projectSiteVersion: number;
  isLocked: boolean;
  isAllowEdit: boolean;
  applicationLifeCycleStatusType: number;
  appFormStepsList: any;
  isReadyToLock: boolean = false;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  serviceName: any;
  hasSubmitClicked: boolean = false;


  // @ViewChild(Form1RegistrationDetailsComponent) form1RegistrationDetailsComponent: Form1RegistrationDetailsComponent;
  public remarks: string="NA";
  constructor(private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private router: Router,
    public commonOpsService: CommonOpsService) { }
  
  ngOnInit(): void {
  }
  ngAfterViewInit(){
  }
  appFormStepsListEventListener(event) {
    this.appFormStepsList = event.appFormStepsList;
    this.isLocked = event.isLocked;
    this.isAllowEdit = event.isAllowEdit;
    this.applicationLifeCycleStatusType = event.applicationLifeCycleStatusType;
    console.log('finded', this.appFormStepsList.find(x => (!x.isCommonStep || x.stepCode == 'DOC') && !x.isFilled) )
    if (this.appFormStepsList.find(x => (!x.isCommonStep || x.stepCode == 'DOC') && !x.isFilled) == undefined) {
      this.isReadyToLock = true;
    }
// setTimeout(() => {
//   if (this.appFormStepsList.find(x => (!x.isCommonStep || x.stepCode == 'DOC') && !x.isFilled) == undefined) {
//     this.isReadyToLock = true;
//   }
// }, 1000);


  }

  onSubmit(appActionType): void {
    if(appActionType == 0){
      appActionType = (this.applicationType==6 || this.applicationType==61 || this.applicationType==62) ? 5 : 2;
    }

    if(this.applicationType == 76)//--Stabilty
    {
        appActionType = 209;
    }

    if(this.applicationType == 71 || this.applicationType == 72 || this.applicationType == 73 || this.applicationType == 81)// Building Plan (Proposed + Addition/Amendment/Existing)
    {
        appActionType = appActionType == 6 ? 6 : 405 // Fee Not Applicable
    }

    var areTermsAccepted: boolean = false;
    if (this.applicationType == 5) //BuildingPlanHUD
    {
      // areTermsAccepted = this.buildingPlanHudDetailsComponent.Input_Form.valid;
    }
    else {
      areTermsAccepted = true;
    }
    if (areTermsAccepted) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, lock it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          let applicationLockParms: any = {
            appId: this.appRefId
          };
          if (this.applicationType == 100001) //OSh-Form-1-Registration
          {
            this.serviceName = "Complaint";
          }
          this.hasSubmitClicked=true;

          const current = new Date();
          const timestamp = current.getTime();
          let viewModelName = "pblabournetcoreapi.ViewModels.ApplicationLockParmsViewModel";
          let controllerName = this.serviceName;
          let actionName =  "lockapplication";

          let actionParmsLess={
            AppId: this.appRefId, 
            appActionType: appActionType, 
            remarks: this.remarks
          }
          let actionParmsAll={ 
            appRefId: this.appRefId, 
            appActionType: appActionType, 
            remarks: this.remarks,
            toDoActivityModeType: appActionType == 6 ? 3 : 4,
            rootActivityRefId: timestamp,
            toDoActivityCategoryType: 3
        }
         

          if(this.applicationType == 100001)
          {
            viewModelName = "pbsamadhannetcoreapi.ViewModels.ApplicationLockViewModel";
            controllerName = "Crud";
            actionName =  "CreateUpdate";
          }

          // console.log(actionParmsAll.toDoActivityModeType, 'Mode Type')
         
            //this.appHttpRequestHandlerService.httpPost({ appId: this.appRefId, appActionType: appActionType, remarks: this.remarks }, "pblabournetcoreapi.ViewModels.ApplicationLockParmsViewModel", this.serviceName, "lockapplication").pipe(takeUntil(this.ngUnsubscribe))
            this.appHttpRequestHandlerService.httpPost(

              (this.applicationType == 100001) ? actionParmsAll : actionParmsLess

              , viewModelName, controllerName, actionName).pipe(takeUntil(this.ngUnsubscribe)).subscribe((data: GenericServiceResultTemplate) => {
              // if (this.appFormStepsList.find(x => x.stepCode == 'AUTO_APP') != undefined) {
              //   this.router.navigate(['/licence/bocw-generate-licence'], { queryParams: { info: this.commonOpsService.encodeQueryParamsInBase64({ identityKey: this.entityPrimaryid, appRefId: this.appRefId, applicationType: this.applicationType, projectSiteRefId: this.projectSiteRefId }) } });
              // }
              if (this.appFormStepsList.find(x => x.stepCode == 'DEG_SIG') != undefined) {
                this.router.navigate(['/digitalsignature/sign_application'], { queryParams: { info: this.commonOpsService.encodeQueryParamsInBase64({ identityKey: this.entityPrimaryid, appRefId: this.appRefId, applicationType: this.applicationType, projectSiteRefId: this.projectSiteRefId, projectSiteVersion: this.projectSiteVersion }) } });
              }
              else if (this.appFormStepsList.find(x => x.stepCode == 'PAYMNT') != undefined) {
                this.router.navigate(['/payments/appfeecalculator'], { queryParams: { info: this.commonOpsService.encodeQueryParamsInBase64({ identityKey: this.entityPrimaryid, appRefId: this.appRefId, applicationType: this.applicationType, projectSiteRefId: this.projectSiteRefId, projectSiteVersion: this.projectSiteVersion }) } });
              }
              else if (this.applicationType == 36 || this.applicationType == 8) {
                this.router.navigate(['/dashboard/applicantdashboard'], { queryParams: { info: this.commonOpsService.encodeQueryParamsInBase64({ projectSiteRefId: this.projectSiteRefId, projectSiteVersion: this.projectSiteVersion }) } });
              }
              else
              {
                document.location.href = environment.thirdPartyIntegrationConfigs.investPunjab.investPunjabReturnPath;
              }     
            });
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          // swalWithBootstrapButtons.fire(
          //   'Cancelled',
          //   'Your have cancelled the operation',
          //   'error'
          // )
        }
      })
    }
    else{
      Swal.fire({
        icon:'warning',
        text: 'Please accept all terms & conditions..!',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
        }).then((result) => {
          if (result.isConfirmed) {
          }
      })
    }
  }
  btnHomeClick(applicationType) {
    if(applicationType == 36 ||applicationType == 8)
    {
      this.router.navigate(['/project/sites']);
    }
    else
    {
      window.location.href= environment.thirdPartyIntegrationConfigs.investPunjab.investPunjabReturnPath;
    }
    
  }
}
