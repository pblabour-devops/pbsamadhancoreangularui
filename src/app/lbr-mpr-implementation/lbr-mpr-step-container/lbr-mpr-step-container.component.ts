import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import Swal from 'sweetalert2';
import { LbrMprMainComponent } from '../lbr-mpr-main/lbr-mpr-main.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonService } from 'src/app/common/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { AuthService } from 'src/app/auth/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { stepperJson } from 'src/app/AlcMPR/Alc-stepper-List';

@Component({
    selector: 'app-lbr-mpr-step-container',
    templateUrl: './lbr-mpr-step-container.component.html',
    styleUrls: ['./lbr-mpr-step-container.component.css'],
    standalone: false
})
export class LbrMprStepContainerComponent implements OnInit { 
protected ngUnsubscribe: Subject<void> = new Subject<void>();
@ViewChild('mprMainForm') mprMainForm: LbrMprMainComponent;
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
    const userId =this.authService.getUserJwtDecodedInfo().UserId;
    //id: this.authService.getUserJwtDecodedInfo().UserId,  
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

//  loadCurrentStep(): void {
//   const currentStepCode = this.stepList[this.currentIndex].stepCode;
//  if (currentStepCode === 'LOCK') {
    
//     this.currentFormData = null;
//     return;
//   }
//   if (this.stepFormDataMap[currentStepCode]) {
//     this.currentFormData = JSON.parse(JSON.stringify(this.stepFormDataMap[currentStepCode]));
//   } else {
//    const jsonUrl = `assets/LbrMPR_Json/${this.stepList[this.currentIndex].uiPageUrl}.json`;

//     fetch(jsonUrl)
//       .then(res => res.json())
//       .then(data => {
//         this.currentFormData = JSON.parse(JSON.stringify(data));
//       });
//   }
// }
loadCurrentStep(): void {
  const currentStep = this.stepList[this.currentIndex];
  if (!currentStep) return;

  const currentStepCode = currentStep.stepCode;


  if (currentStepCode === 'LOCK') {
    this.currentFormData = null;
    return;
  }

  const userId = this.authService.getUserJwtDecodedInfo().UserId;
  const month = this.monthwise;
  const year = this.yearwise;

  
  if (currentStepCode === 'PART-I') {
    
    this.fetchSpDataForStep(userId, month, year, currentStepCode, 6);
    return;
  } else if (currentStepCode === 'PART-XXIV') {

    this.fetchSpDataForStep(userId, month, year, currentStepCode, 1001);
    return;
  }

  
  if (this.stepFormDataMap[currentStepCode]) {
    this.currentFormData = JSON.parse(JSON.stringify(this.stepFormDataMap[currentStepCode]));
  } else {
    const jsonUrl = `assets/LbrMPR_Json/${currentStep.uiPageUrl}.json`;
    fetch(jsonUrl)
      .then(res => res.json())
      .then(data => {
        this.currentFormData = JSON.parse(JSON.stringify(data));
      })
      .catch(err => console.error('Error loading JSON:', err));
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

//  fetchMprData(userId: string, month: number, year: number): void {
//   const params = { userId, month, year };

//   this.appHttpRequestHandlerService.httpGet(params, 'MPR', 'get_mpr_list')
//     .pipe(takeUntil(this.ngUnsubscribe))
//     .subscribe({
//       next: (res: GenericResponseTemplateModel<any[]>) => {
//         if (res.responseDataModel?.length > 0) {
//           const filledSteps = res.responseDataModel;
//           filledSteps.forEach(record => {
//             if (record.stepCodes && record.jsonData) {
//               this.stepFormDataMap[record.stepCodes] = JSON.parse(record.jsonData);
//           const step = this.stepList.find(s => s.stepCode === record.stepCodes);
//               if (step) {
//                 step.isCompleted = true;
//               }
//             }
//             if (record.stepCodes === 'LOCK' && record.isLocked) {
//         const lockStep = this.stepList.find(s => s.stepCode === 'LOCK');
//             if (lockStep) {
//            lockStep.isCompleted = true;
//              }
//            }
//           });
//           const firstFilledStep = this.stepList.findIndex(step =>
//             this.stepFormDataMap[step.stepCode]);

//           this.currentIndex = firstFilledStep !== -1 ? firstFilledStep : 0;

          
//          // this.loadCurrentStep();
//         } else {
//           this.currentIndex = 0;
//         }
//           this.loadCurrentStep();
//         },
//     });
// }
fetchMprData(userId: string, month: number, year: number): void {
  const params = { userId, month, year };

  this.appHttpRequestHandlerService.httpGet(params, 'MPR', 'get_mpr_list')
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe({
      next: (res: any) => {
        const filledSteps = res.responseDataModel || [];

        
        filledSteps.forEach(record => {
          if (record.stepCodes && record.jsonData) {
            this.stepFormDataMap[record.stepCodes] = JSON.parse(record.jsonData);
            const step = this.stepList.find(s => s.stepCode === record.stepCodes);
            if (step) step.isCompleted = true;
          }
        });

        
       const autoFillStepCode = this.stepList[this.currentIndex]?.stepCode || 'PART-I';


        if (autoFillStepCode === 'PART-I') {
  
          this.fetchSpDataForStep(userId, month, year, autoFillStepCode, 6);
        }
        else if (autoFillStepCode === 'PART-XXIV') {
         
          this.fetchSpDataForStep(userId, month, year, autoFillStepCode, 10001);
        }
        else {
          this.loadCurrentStep();
        }
      }
    });
}


fetchSpDataForStep(userId: string, month: number, year: number, stepCode: string, applicationType: number) {
  const params = { userId, month, year, applicationType };

  this.appHttpRequestHandlerService.httpGet(params, 'MPR', 'Get_MPR_data')
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe({
      next: (res: any) => {
        const step = this.stepList.find(s => s.stepCode === stepCode);
        if (!step) return;

        const jsonUrl = `assets/LbrMPR_Json/${step.uiPageUrl}.json`;

        fetch(jsonUrl)
          .then(res => res.json())
          .then(defaultJson => {
            let finalJson;


            if (this.stepFormDataMap[stepCode]) {
              finalJson = JSON.parse(JSON.stringify(this.stepFormDataMap[stepCode]));
            } else {
              finalJson = Array.isArray(defaultJson) ? defaultJson : [defaultJson];
            }

            if (res.responseDataModel?.length > 0) {
              const data = res.responseDataModel[0];

              finalJson.forEach(sectionWrapper => {
                const sections = sectionWrapper.Section ? [sectionWrapper.Section] : [];
                sections.forEach(section => {
                  section.SubSections?.forEach(subSection => {
                    subSection.Lables?.forEach(label => {
                      switch (label.LableTitle) {
                        case 'Registration beginning of the Month':
                          label.LableValueInfo.Value ||= data.approvedBegin;
                          break;
                        case 'Number of Workers beginning of the Month':
                          label.LableValueInfo.Value ||= data.approvedWorkersBegin;
                          break;
                        case 'No. of registration applied during the Month':
                          label.LableValueInfo.Value ||= data.approvedDuring;
                          break;
                        case 'Registered During the Month':
                          label.LableValueInfo.Value ||= data.approvedWorkersDuring;
                          break;
                        case 'De-Register During the Month':
                          label.LableValueInfo.Value ||= data.deRegisteredDuring;
                          break;
                        case 'De-Number Of Workers During the Month':
                          label.LableValueInfo.Value ||= data.deRegisteredWorkers;
                          break;
                        case 'Total Shops end of the Month':
                          label.LableValueInfo.Value ||= data.totalShopsEnd;
                          break;
                        case 'Total Workers end of the Month':
                          label.LableValueInfo.Value ||= data.totalWorkersEnd;
                          break;
                      }
                    });
                  });
                });
              });
            }

           
            this.stepFormDataMap[stepCode] = finalJson;
            this.currentFormData = JSON.parse(JSON.stringify(finalJson));
          })
          
      }
    });
}






 saveAndNext(): void {
  const isValid = this.mprMainForm?.validateForm();
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

      this.appHttpRequestHandlerService.httpPost( params, "pbsamadhannetcoreapi.ViewModels.SaveSteps_ViewModel", "MPR","save_steps_data" )
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

      this.appHttpRequestHandlerService.httpPost( params, "pbsamadhannetcoreapi.ViewModels.SaveSteps_ViewModel", "MPR","save_steps_data" )
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
           this.router.navigate(['/dashboard/mpr-lbr']);
        },
      });
    }
  });
} 

NavigateToDashboard(){
  this.router.navigate(['/dashboard/mpr-lbr']);
}


  openStepperModal(content: any): void {
    this.modalService.open(content, { centered: true, size: 'xl' });
  }

  navigateToStep(index: number): void {
    this.currentIndex = index;
    this.loadCurrentStep();
  }



}

