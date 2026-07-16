import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { actStepMap } from 'src/app/AnnualReturn/Annul-return-stepper-filter';
import { AuthService } from 'src/app/auth/auth.service';
import { CommonService } from 'src/app/common/common.service';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';

@Component({
    selector: 'app-annual-return-dashboard',
    templateUrl: './annual-return-dashboard.component.html',
    styleUrls: ['./annual-return-dashboard.component.css'],
    standalone: false
})
export class AnnualReturnDashboardComponent implements OnInit {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
annualReturnForm!: UntypedFormGroup;
selectedActs: number[] = [];
 
actList: { id: number; name: string; }[] = [];

autoSelectMap: any = {
  1: [3, 4, 5,6,7] ,
  2: [3,4,5,6,7]
};

  stepCodes: string[] = [];
  paramInfo: any;
  requireScaleSelection = false;
  scaleType: 'small' | 'large' | null = null;
  showActs = true;  
  constructor(private fb: UntypedFormBuilder,private route: ActivatedRoute, 
    private router: Router,
    private activeRoute: ActivatedRoute,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,  
    private common:CommonService,  
    private modalService: NgbModal,
    public commonOpsService: CommonOpsService,
    public authService: AuthService,
    private sanitizer: DomSanitizer,) {}

 ngOnInit(): void {

  this.annualReturnForm = this.fb.group({
    actName: [{ value: '', disabled: true }],
    appId: [{ value: '', disabled: true }],
    licenceNumber: [{ value: '', disabled: true }],
    actIds: [[], Validators.required],
    financialYear: ['', Validators.required],
    remarks: ['']
  });


  this.route.queryParams.subscribe(params => {
    if (params['info']) {
      this.commonOpsService.decodeQueryParamsFromBase64ToModel(params['info'], (decoded) => {
         this.paramInfo = decoded; 
         this.requireScaleSelection = decoded.requireScaleSelection === true;
         if (this.requireScaleSelection) {
            this.showActs = false;
          }   
        this.annualReturnForm.patchValue({
          appId: decoded.appId,
          licenceNumber: decoded.licenceNumber,
          actName: decoded.actName,
          projectSiteVersion:decoded.projectSiteVersion
        });
      });
    }
  });
  this.actList = this.common.actList;
   if (this.requireScaleSelection) {
  this.showActs = false;
  this.annualReturnForm.get('actIds')?.clearValidators();
  this.annualReturnForm.get('actIds')?.updateValueAndValidity();
}
}
onScaleSelect(type: 'small' | 'large') {
    this.scaleType = type;

    if (type === 'small') {
      this.showActs = false;
      this.selectedActs = [];
      this.annualReturnForm.patchValue({ actIds: [] });
       this.annualReturnForm.get('actIds')?.clearValidators();
    this.annualReturnForm.get('actIds')?.updateValueAndValidity();
    }

    if (type === 'large') {
      this.showActs = true;
       this.annualReturnForm.get('actIds')?.setValidators([Validators.required]);
    this.annualReturnForm.get('actIds')?.updateValueAndValidity();
    }
  } 
onActSelection(event: any) {
  const actId = Number(event.target.value);
  const isChecked = event.target.checked;


  if (isChecked) {
    this.selectedActs.push(actId);

   
    if (this.autoSelectMap[actId]) {
      this.autoSelectMap[actId].forEach((relatedId: number) => {
        if (!this.selectedActs.includes(relatedId)) {
          this.selectedActs.push(relatedId);
        }
      });
    }
  } else {

    this.selectedActs = this.selectedActs.filter(id => id !== actId);

 
    if (this.autoSelectMap[actId]) {
      this.selectedActs = this.selectedActs.filter(
        id => !this.autoSelectMap[actId].includes(id)
      );
    }
  }


  this.updateCheckboxSelection();

 
  const selectedActNames = this.actList
    .filter(act => this.selectedActs.includes(act.id))
    .map(act => act.name);

  this.stepCodes = selectedActNames
    .map(name => actStepMap[name] || [])
    .reduce((acc, val) => acc.concat(val), []);


  this.annualReturnForm.patchValue({ actIds: this.selectedActs });
}


updateCheckboxSelection() {
 
  const allCheckboxes = document.getElementsByClassName('form-check-input') as HTMLCollectionOf<HTMLInputElement>;

 
  for (let i = 0; i < allCheckboxes.length; i++) {
    const checkbox = allCheckboxes[i];
    const actId = Number(checkbox.value); 

    
    if (this.selectedActs.includes(actId)) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
  }
}

  onSubmitAnnualReturn() {
     if (this.requireScaleSelection && this.scaleType === 'small') {
      this.selectedActs = [];
      this.annualReturnForm.patchValue({ actIds: [] });
      this.stepCodes = actStepMap["SmallScaleFactory"] || [];
    }
    const payload = this.annualReturnForm.getRawValue();
    const userId = this.authService.getUserJwtDecodedInfo().UserId;
    const profileId = this.authService.getUserJwtDecodedInfo().UserProfileId;

    const params = {
      SubmittedBy_UserRefId: String(userId),
      StepCodes: this.stepCodes,
      SubmittedBy_ProfileRefId: Number(profileId),
      AppId: Number(payload.appId),
      ProjectSiteRefId: this.paramInfo?.projectSiteRefId,
      ProjectSiteVersion: Number(payload.projectSiteVersion),
      ReturnYear: String(payload.financialYear),
      ActIds: this.selectedActs.join(','),
      LicenceNumber:String(payload.licenceNumber)
    };

    this.appHttpRequestHandlerService.httpPost(
      params,
      "pbsamadhannetcoreapi.ViewModels.InitiateAnnualReturnViewModel",
      "AnnualReturn",
      "initiate_AnnualReturn"
    ).pipe(takeUntil(this.ngUnsubscribe))
    .subscribe({
      next: () => {
        const infoPayload = {
          acts: this.selectedActs.join(','),
          financialYear: payload.financialYear,
          appId: Number(payload.appId),
          licenceNumber: payload.licenceNumber,
          projectSiteRefId: this.paramInfo?.projectSiteRefId,
          projectSiteVersion: Number(payload.projectSiteVersion),                                                                     
          userId,
          isViewOnly: false,
           scaleType: this.scaleType                                            
        };

        this.router.navigate(['/annual-return-filling/annual-return-step-container'], {
          queryParams: { info: this.commonOpsService.encodeQueryParamsInBase64(infoPayload) }
        });
      }
    });
  }



}		
