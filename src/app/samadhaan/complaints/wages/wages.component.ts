import { Component, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { IComplaint_Claim_CodeOnWage } from '../../samadhaan-typed-modelts';
import { ClaimUnderCodeOnWagesComponent } from './claim-under-code-on-wages/claim-under-code-on-wages.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wages',
  standalone: false,
  templateUrl: './wages.component.html',
  styleUrl: './wages.component.css',
})
export class WagesComponent {
protected ngUnsubscribe: Subject<void> = new Subject<void>();
  @ViewChild(ClaimUnderCodeOnWagesComponent)
  claimCodeOnWagesComponent: ClaimUnderCodeOnWagesComponent;

  public appFormStepsList: any[] = [];
  public paramInfo: any;
  public parmamEncodedinfo: string;
  codeOnWagesDetailData : IComplaint_Claim_CodeOnWage

  genericFormData: GenericFormModel<IComplaint_Claim_CodeOnWage>;
  claimUnderCodeOnWagesApiData:any

  allowanceType : any[] = [];
  placeOfWorkTypeA : any[] = [];
  placeOfWorkTypeB : any[] = [];

  // NEW: Options for the conditional radio buttons
  applicableOptions : any
  constructor(  
    private fb: UntypedFormBuilder,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    public commonOpsService: CommonOpsService
  ) {}

  Input_Form: TForm<IComplaint_Claim_CodeOnWage> = this.fb.group(
    {
      id: [0, Validators.required],
      allowanceType: ['', Validators.required],
      placeOfWorkTypeA: ['', Validators.required],
      placeOfWorkTypeB: ['', [Validators.required, Validators.min(0)]],
      placeofWorkNameC: ['', [Validators.required, Validators.min(0)]],
    }
  ) as TForm<IComplaint_Claim_CodeOnWage>;

  get formControls() {
    return this.Input_Form.controls;
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.route.queryParams.subscribe((params) => {
      this.parmamEncodedinfo = params.info;

      this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info) => {
        this.paramInfo = info;
        console.log('info', this.paramInfo)
        this.getClaimUnderCodeOnWagesData();
        // this.getClai
        // this.get
      });
    });
  }

  getClaimUnderCodeOnWagesData(){
    this.appHttpRequestHandlerService
    .httpGet({ id: this.paramInfo?.appRefId }, 'Complaints', 'getClaimUnderCodeOnWagesDetails')
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: GenericFormModel<IComplaint_Claim_CodeOnWage>) => {
      this.claimUnderCodeOnWagesApiData = data
    })
  }




  onSaveDraft(): void {
    console.log('Saved as Draft:', this.Input_Form.value);
    // Call save-draft API service here
  }

  onBack(): void {
    console.log('Navigate back to previous tab');
  }

  onSubmit(): void {
   if(!this.claimCodeOnWagesComponent?.isFormValid()){
    Swal.fire({ icon: 'warning', text: 'Please fill Claim Under code on wages completely.' });
    return;
   }
   console.log('prama info', this.paramInfo)
   this.codeOnWagesDetailData.appRefId = this.paramInfo?.appRefId;
   this.codeOnWagesDetailData.projectSiteRefId=this.paramInfo?.projectSiteRefId;
   this.codeOnWagesDetailData.applicationPurposeType=this.paramInfo?.applicationPurposeType;
   this.codeOnWagesDetailData.iPin=this.paramInfo?.iPin;
   this.codeOnWagesDetailData.investPunjab_AppId=this.paramInfo?.investPunjab_AppId;
   this.codeOnWagesDetailData.projectSiteVersion=this.paramInfo?.projectSiteVersion;
   this.codeOnWagesDetailData.toDoActivityModeType=1;
   this.codeOnWagesDetailData.rootActivityRefId='default value';
   this.codeOnWagesDetailData.toDoActivityCategoryType=2006;
   this.codeOnWagesDetailData.applicationType = this.paramInfo.applicationType;

   console.log('codeOnWagesDetailData', this.codeOnWagesDetailData)

    this.appHttpRequestHandlerService
      .httpPost(this.codeOnWagesDetailData,'pbsamadhannetcoreapi.Models.Complaint_Claim_CodeOnWage','Crud','CreateUpdate').pipe(takeUntil(this.ngUnsubscribe)).subscribe({
        next: () => {
         
        }
      });

  }

  claimUnderCodeOnWagesDataEventListener(data:IComplaint_Claim_CodeOnWage){
  console.log('data', data)
  this.codeOnWagesDetailData = data
  }

  appStepInfoDataEventListener(event:any){
  this.appFormStepsList = event
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
