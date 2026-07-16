import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { AnnualReturnMainComponent } from '../annual-return-main/annual-return-main.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { CommonService } from 'src/app/common/common.service';
import { AuthService } from 'src/app/auth/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { GenericResponseTemplateModel, GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { actStepMap } from 'src/app/AnnualReturn/Annul-return-stepper-filter';
import { stepperJson } from 'src/app/AnnualReturn/Annual-return-Stepper-List';

@Component({
    selector: 'app-annual-return-step-container',
    templateUrl: './annual-return-step-container.component.html',
    styleUrls: ['./annual-return-step-container.component.css'],
    standalone: false
})
export class AnnualReturnStepContainerComponent implements OnInit {

  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  @ViewChild('annualReturnFormMain') annualReturnFormMain: AnnualReturnMainComponent;
    @Input() projectSiteRefId: number;
  @Input() projectSiteVersion: number;
   public paramInfo:any;
  isLocked: boolean;
    isSubmitted: boolean = false;
    stepList: any[] = [];
    currentIndex = 0;
    currentFormData: any;
    isLockStep = false;
    monthwise: number;
    yearwise: number;
    stepFormDataMap: { [stepCode: string]: any } = {}; 
    isViewOnly: boolean = false; 
    actList: { id: number; name: string; }[];
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
    if (params['info']) {
      this.commonOpsService.decodeQueryParamsFromBase64ToModel(params['info'], (decoded) => {
        this.paramInfo = decoded;
        this.projectSiteRefId = Number(decoded.projectSiteRefId);
        this.projectSiteVersion = Number(decoded.projectSiteVersion);
        const userId = decoded.userId;
        this.isViewOnly = decoded.isViewOnly === true || decoded.isViewOnly === 'true';
        const actsParam = decoded.acts;
        const financialYear = decoded.financialYear;
        const appId = decoded.appId;
        const licenceNumber = decoded.licenceNumber;
        const scaleType = decoded.scaleType;                                          
     
        let selectedActs: string[] = [];
        if (scaleType === 'small'|| actsParam === '' ||actsParam == null) {

    selectedActs = ["SmallScaleFactory"];
} 
else if (actsParam) {
    const actIds = actsParam.split(',').map((id: string) => +id);
    this.actList = this.common.actList;

    selectedActs = this.actList
      .filter(a => actIds.includes(a.id))
      .map(a => a.name);
}

        const requiredParts = selectedActs.reduce((acc: any[], act) => {
          const parts = actStepMap[act] || [];
          return acc.concat(parts.map(p => ({ stepCode: p, actName: act })));
        }, []);

        this.stepList = stepperJson
          .filter(step => requiredParts.some(rp => rp.stepCode === step.stepCode))
          .map(step => {
            const matched = requiredParts.find(rp => rp.stepCode === step.stepCode);
            return {
              ...step,
              actName: matched?.actName
            };
          });

        this.stepList.push({
          partHeading: "CONFIRM & LOCK",
          partSubHeading: "Final Step",
          uiPageUrl: null,
          isCompleted: false,
          stepCode: "LOCK",
          hasPageUrl: false,
          actName: "Confirmation"
        });

        this.currentIndex = 0;
        if (userId) {
          this.fetchAnnualReturnData(userId);
        } else {
          this.loadCurrentStep();                                                                     
        }
      });
    }
  });
}

    loadCurrentStep(): void {
  const currentStepCode = this.stepList[this.currentIndex].stepCode;

  if (currentStepCode === 'LOCK') {
    this.currentFormData = null;
    return;
  }


  if (currentStepCode === 'PART-I') {

    if (this.stepFormDataMap[currentStepCode]) {
      this.currentFormData = JSON.parse(JSON.stringify(this.stepFormDataMap[currentStepCode]));
    } else {
   
      this.fetchSpDataForStep(this.paramInfo?.licenceNumber, currentStepCode);
    }
    } 
  else if (this.stepFormDataMap[currentStepCode]) {
    this.currentFormData = JSON.parse(
      JSON.stringify(this.stepFormDataMap[currentStepCode])
    );
  } 
  else {
    const jsonUrl = `assets/AnnualReturn_json/${this.stepList[this.currentIndex].uiPageUrl}.json`;
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
    
  fetchAnnualReturnData(userId: string): void {
  const params = { 
    userId,
    ProjectSiteRefId: this.projectSiteRefId,
    projectSiteVersion: this.projectSiteVersion
  };

  this.appHttpRequestHandlerService.httpGet(params, "AnnualReturn", "get_AnnualReturnList")
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe({
      next: (res: GenericResponseTemplateModel<any[]>) => {
        if (res.responseDataModel?.length > 0) {
          const filledSteps = res.responseDataModel;

         
          this.isLocked = false;
filledSteps.forEach(record => {
  if (record.stepCodes && record.jsonData) {
    this.stepFormDataMap[record.stepCodes] = JSON.parse(record.jsonData);
    const step = this.stepList.find(s => s.stepCode === record.stepCodes);
    if (step) step.isCompleted = true;
  }

    
            if (record.stepCodes === 'LOCK') {
    this.isLocked = true;
    const lockStep = this.stepList.find(s => s.stepCode === 'LOCK');
    if (lockStep) lockStep.isCompleted = true;
  }
          });


         if (this.isLocked) {
  const lockStep = this.stepList.find(s => s.stepCode === 'LOCK');
  if (lockStep) lockStep.isCompleted = true;
}

          if (this.isViewOnly) {
            this.currentIndex = 0;
          } else {
            const firstIncompleteIndex = this.stepList.findIndex(step => !step.isCompleted);
            this.currentIndex = firstIncompleteIndex !== -1 ? firstIncompleteIndex : this.stepList.length - 1;
          }
        } else {
          if (this.isViewOnly) {
            this.currentIndex = 0;
          }
        }

        this.loadCurrentStep();
      },
    });
}
fetchSpDataForStep(
 licenceNumber:string,
  stepCode: string
) {
  const params = { LicenceNo: licenceNumber };


  this.appHttpRequestHandlerService.httpGet(params, 'AnnualReturn', 'Get_EstablishmentDetails')
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe({
      next: (res: any) => {
      
        const step = this.stepList.find(s => s.stepCode === stepCode);
        if (!step) return;

        const jsonUrl = `assets/AnnualReturn_json/${step.uiPageUrl}.json`;

        fetch(jsonUrl)
          .then(res => res.json())
          .then(stepJson => {
     
            stepJson = Array.isArray(stepJson) ? stepJson : [stepJson];

            if (res.responseDataModel?.length > 0) {
  const data = res.responseDataModel[0];

  stepJson.forEach(sectionWrapper => {
    const sections = sectionWrapper.Section ? [sectionWrapper.Section] : [];
    sections.forEach(section => {
      section.SubSections?.forEach(subSection => {
        subSection.Lables?.forEach(label => {
        
          switch (label.LableTitle) {
            case '2(a)  Name of Factory':
              label.LableValueInfo.Value = data.establishmentName;
              break;
            case '(6)  Factory Address':
              label.LableValueInfo.Value = data.establishmentAddress;
              break;
            case '5(a)  Phone No.':
              label.LableValueInfo.Value = data.contactNumber;
              break;
            case '5(b)  Mobile No.':
              label.LableValueInfo.Value = data.contactNumber;
              break;
            
          }
        });
      });
    });
  });
}

         
            this.stepFormDataMap[stepCode] = stepJson;
            this.currentFormData = JSON.parse(JSON.stringify(stepJson));
          })
          .catch(err => {
            console.error('Error loading JSON for step:', stepCode, err);
          });
      }
    });
}


    
  saveAndNext(): void {
  const isValid = this.annualReturnFormMain?.validateForm();
  this.isSubmitted = true; 

  if (!isValid) {
    Swal.fire({
      icon: 'warning',
      title: 'Incomplete Form',
      text: 'Please fill all required fields before proceeding.',
      confirmButtonText: 'OK',
      customClass: { confirmButton: 'btn btn-primary' },
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
     const jsonData = JSON.stringify(this.annualReturnFormMain?.formJson || this.currentFormData);
     const stepCode = this.stepList[this.currentIndex].stepCode;
      const licenceNumber=this.paramInfo?.licenceNumber;
      const appId = this.paramInfo?.appId || Number(this.route.snapshot.queryParamMap.get('appId'));
      const returnYear = this.paramInfo?.financialYear || this.route.snapshot.queryParamMap.get('financialYear');

      const params = {
        StepCodes: stepCode,
        SubmittedBy_UserRefId: userId,
        SubmittedBy_ProfileRefId: profileId,
        AppId: appId,
        ReturnYear: returnYear,
        JsonData: jsonData,
        IsLocked: false,
        ProjectSiteRefId: this.paramInfo?.projectSiteRefId,
        ProjectSiteVersion: this.paramInfo?.projectSiteVersion,
        licenceNumber:this.paramInfo?.licenceNumber
        
      };

      this.appHttpRequestHandlerService.httpPost(
        params,
       "pbsamadhannetcoreapi.ViewModels.SaveStepsReturnViewModel",
        "AnnualReturn",
       "save_StepsDataReturn"
      )
      .subscribe({
        next: () => {
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


  const appId = this.paramInfo?.appId || Number(this.route.snapshot.queryParamMap.get('appId'));
  const returnYear = this.paramInfo?.financialYear || this.route.snapshot.queryParamMap.get('financialYear');

  const pendingSteps = this.stepList.filter(s => s.stepCode !== 'LOCK' && !s.isCompleted);
  if (pendingSteps.length > 0) {
    Swal.fire({
      icon: 'error',
      title: 'Incomplete Steps',
      text: 'Please complete all steps before locking.',
      confirmButtonText: 'OK',
      customClass: { confirmButton: 'btn btn-danger' },
      buttonsStyling: false
    });
    return;
  }

  Swal.fire({
    title: 'Are you sure you want to lock this Annual Return?',
    text: "Once locked, no changes will be allowed.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, Lock it!',
    cancelButtonText: 'No, Cancel!',
    customClass: {
      confirmButton: 'btn btn-success me-2',
      cancelButton: 'btn btn-secondary'
    },
    buttonsStyling: false
  }).then((result) => {
    if (result.isConfirmed) {
      const params = {
        StepCodes: 'LOCK',
        SubmittedBy_UserRefId: userId,
        AppId: appId,
        ReturnYear: returnYear,
        JsonData: '',
        IsLocked: true,
        ProjectSiteRefId: this.paramInfo?.projectSiteRefId,
        ProjectSiteVersion: this.paramInfo?.projectSiteVersion
      };

      this.appHttpRequestHandlerService.httpPost(
        params,
        "pbsamadhannetcoreapi.ViewModels.SaveStepsReturn_ViewModel",
        "AnnualReturn",
        "save_StepsDataReturn"
      )
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (res: GenericServiceResultTemplate) => {
          Swal.fire({
            icon: 'success',
            title: 'Annual Return successfully locked.',
            showConfirmButton: false,
            timer: 2000
          });

          this.isLockStep = true;
          const lockStep = this.stepList.find(s => s.stepCode === 'LOCK');
          if (lockStep) lockStep.isCompleted = true;

          this.router.navigate(['/dashboard/applicantdashboard'], { 
            queryParams: { 
              info: this.commonOpsService.encodeQueryParamsInBase64({ 
                projectSiteRefId: this.paramInfo?.projectSiteRefId, 
                appRefId: this.paramInfo?.appId || 0, 
                projectSiteVersion: this.projectSiteVersion 
              }) 
            } 
          });
        },
      });
    }
  });
}

    
    NavigateToDashboard(){
        this.router.navigate(['/dashboard/applicantdashboard'], { 
  queryParams: { 
    info: this.commonOpsService.encodeQueryParamsInBase64({ 
      projectSiteRefId: this.projectSiteRefId, 
      appRefId: 0, 
      projectSiteVersion: this.projectSiteVersion  
    }) 
  } 
});
    }
    
    
      openStepperModal(content: any): void {
        this.modalService.open(content, { centered: true, size: 'xl' });
      }
    
      navigateToStep(index: number): void {
        this.currentIndex = index;
        this.loadCurrentStep();
      }
    }
	
