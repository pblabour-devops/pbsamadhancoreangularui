import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { AlcMprMainComponent } from '../alc-mpr-main/alc-mpr-main.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonService } from 'src/app/common/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { AuthService } from 'src/app/auth/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { takeUntil } from 'rxjs/operators';
import { GenericResponseTemplateModel, GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import Swal from 'sweetalert2';
import { stepperJson } from 'src/app/AlcMPR/Alc-stepper-List';

@Component({
    selector: 'app-alc-mpr-step-container',
    templateUrl: './alc-mpr-step-container.component.html',
    styleUrls: ['./alc-mpr-step-container.component.css'],
    standalone: false
})
export class AlcMprStepContainerComponent implements OnInit {

  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  @ViewChild('mprFormMain') mprFormMain: AlcMprMainComponent;
  isSubmitted: boolean = false;
  stepList: any[] = [];
  currentIndex = 0;
  currentFormData: any;
  isLockStep = false;
  monthwise: number;
  yearwise: number;
  stepFormDataMap: { [stepCode: string]: any } = {}; 
  isViewOnly: boolean = false; 
   constructor(private route: ActivatedRoute, 
  private router: Router,
  private activeRoute: ActivatedRoute,
  private appHttpRequestHandlerService: AppHttpRequestHandlerService,  
  private common:CommonService,  
  private modalService: NgbModal,
  public commonOpsService: CommonOpsService,
  public authService: AuthService,
  private sanitizer: DomSanitizer,) { }
    ngOnInit(): void {
      this.stepList = JSON.parse(JSON.stringify(stepperJson));
      this.route.queryParams.subscribe(params => {
      const userId = params['userId'];
      this.monthwise = +params['month'];
      this.yearwise = +params['year'];
      this.isViewOnly = params['isViewOnly'] === 'true';
   if (userId) {
        this.fetchMprData( userId,this.monthwise,this.yearwise);  
      }
  
    else {
        this.loadCurrentStep(); 
      }
    });
  }
  
   loadCurrentStep(): void {
    const currentStepCode = this.stepList[this.currentIndex].stepCode;
   if (currentStepCode === 'LOCK') {
      
      this.currentFormData = null;
      return;
    }
    if (this.stepFormDataMap[currentStepCode]) {
      this.currentFormData = JSON.parse(JSON.stringify(this.stepFormDataMap[currentStepCode]));
    } else {
     const jsonUrl = `assets/ALCMpr_Json/${this.stepList[this.currentIndex].uiPageUrl}.json`;
  
      fetch(jsonUrl)
        .then(res => res.json())
        .then(data => {
          this.currentFormData = JSON.parse(JSON.stringify(data));
        });
    }
  }
  
  
    nextStep(): void {
      if (this.currentIndex < this.stepList.length - 1) {
        this.currentIndex++;
        this.loadCurrentStep();
      }
    }
  
  
    prevStep(): void {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.loadCurrentStep();
      }
    }
  
   fetchMprData(userId: string, month: number, year: number): void {
    const params = { userId, month, year };
  
    this.appHttpRequestHandlerService.httpGet(params, 'MPR', 'get_mpr_list_alc')
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (res: GenericResponseTemplateModel<any[]>) => {
          if (res.responseDataModel?.length > 0) {
            const filledSteps = res.responseDataModel;
            filledSteps.forEach(record => {
              if (record.stepCodes && record.jsonData) {
                this.stepFormDataMap[record.stepCodes] = JSON.parse(record.jsonData);
            const step = this.stepList.find(s => s.stepCode === record.stepCodes);
                if (step) {
                  step.isCompleted = true;
                }
              }
              if (record.stepCodes === 'LOCK' && record.isLocked) {
          const lockStep = this.stepList.find(s => s.stepCode === 'LOCK');
              if (lockStep) {
             lockStep.isCompleted = true;
               }
             }
            });
            const firstFilledStep = this.stepList.findIndex(step =>
              this.stepFormDataMap[step.stepCode]);
  
            this.currentIndex = firstFilledStep !== -1 ? firstFilledStep : 0;
  
            
           // this.loadCurrentStep();
          } else {
            this.currentIndex = 0;
          }
            this.loadCurrentStep();
          },
      });
  }
  
   saveAndNext(): void {
    const isValid = this.mprFormMain?.validateForm();
    this.isSubmitted = true; 
  
    if (!isValid) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Form',
        text: 'Please fill all required fields before proceeding.',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      });
      return;
    }
  
    Swal.fire({
      title: 'Are you sure you want to save and continue?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Save & Next',
      cancelButtonText: 'Cancel',
      customClass: {
        confirmButton: 'btn btn-success me-2',
        cancelButton: 'btn btn-secondary'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        const userId = this.authService.getUserJwtDecodedInfo().UserId;
        const profileId = this.authService.getUserJwtDecodedInfo().UserProfileId;
        const jsonData = JSON.stringify(this.currentFormData);
        const stepCode = this.stepList[this.currentIndex].stepCode;
  
        const params = {
          StepCodes: stepCode,
          Month: this.monthwise,
          Year: this.yearwise,
          SubmittedBy_UserRefId: userId,
          JsonData: jsonData,
          SubmittedBy_ProfileRefId: profileId
        };
  
        this.appHttpRequestHandlerService.httpPost( params, "pbsamadhannetcoreapi.ViewModels.SaveStepsAlc_ViewModel", "MPR","save_steps_data_alc" )
        .subscribe({
          next: (res: any) => {
            this.stepList[this.currentIndex].isCompleted = true;
            this.stepFormDataMap[stepCode] = JSON.parse(JSON.stringify(this.currentFormData));
            this.nextStep(); 
          }
        });
      }
    });
  }
  
  
  confirmAndLock(): void {
    const userId = this.authService.getUserJwtDecodedInfo().UserId;
    const profileId = this.authService.getUserJwtDecodedInfo().UserProfileId;
  
    const pendingSteps = this.stepList.filter(s => s.stepCode !== 'LOCK' && !s.isCompleted);
    if (pendingSteps.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Incomplete Steps',
        text: 'Please complete all steps before locking.',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'btn btn-danger'
        },
        buttonsStyling: false
      });
      return;
    }
  
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success me-2',
        cancelButton: 'btn btn-secondary'
      },
      buttonsStyling: false
    });
  
    swalWithBootstrapButtons.fire({
      title: 'Are you sure you want to lock this MPR?',
      text: "Once locked, no changes will be allowed.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Lock it!',
      cancelButtonText: 'No, Cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        const params = {
          StepCodes: 'LOCK',
          Month: this.monthwise,
          Year: this.yearwise,
          SubmittedBy_UserRefId: userId,
          SubmittedBy_ProfileRefId: profileId,
          JsonData: '',
          IsLocked: true
        };
  
        this.appHttpRequestHandlerService.httpPost( params, "pbsamadhannetcoreapi.ViewModels.SaveStepsAlc_ViewModel", "MPR","save_steps_data_alc" )
        .pipe(takeUntil(this.ngUnsubscribe)).subscribe({
          next: (res: GenericServiceResultTemplate) => {
            Swal.fire({
              icon: 'success',
              title: 'MPR successfully locked.',
              showConfirmButton: false,
              timer: 2000
            });
  
            this.isLockStep = true;
            const lockStep = this.stepList.find(s => s.stepCode === 'LOCK');
            if (lockStep) lockStep.isCompleted = true;
             this.router.navigate(['/dashboard/mpr-alc']);
          },
        });
      }
    });
  } 
  
  NavigateToDashboard(){
    this.router.navigate(['/dashboard/mpr-alc']);
  }
  
  
    openStepperModal(content: any): void {
      this.modalService.open(content, { centered: true, size: 'xl' });
    }
  
    navigateToStep(index: number): void {
      this.currentIndex = index;
      this.loadCurrentStep();
    }
  } 
  
