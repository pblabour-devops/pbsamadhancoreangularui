import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppFormStepsInfo, GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { IComplaint_RecOfMon_GeneralDetail } from '../../samadhaan-typed-modelts';
import { ActivatedRoute } from '@angular/router';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { AppHttpInterceptor } from 'src/app/shared/app-http.interceptor';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { takeUntil } from 'rxjs/operators';
import { IOSH_Form_1_Registration } from 'src/app/osh/osh-code-typed-models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-recovery-of-money',
  standalone: false,
  templateUrl: './recovery-of-money.component.html',
  styleUrl: './recovery-of-money.component.css',
})
export class RecoveryOfMoneyComponent {

    public appFormStepsList: AppFormStepsInfo[];
    public moneyDueOptions : any[]
    public parmamEncodedinfo:string;
    public paramInfo:any;
    public appRefId : any;
    public projectSiteVersion : any;
    public isEditAllowed : boolean;
    protected ngUnsubscribe: Subject<void> = new Subject<void>();




    constructor(private fb : FormBuilder, private route : ActivatedRoute, private commonOpsService : CommonOpsService, private appHttpRequestHandlerService : AppHttpRequestHandlerService, private cdr : ChangeDetectorRef){}

    Input_Form : TForm<IComplaint_RecOfMon_GeneralDetail> = this.fb.group({
      id : [0, Validators.required],
      DemandNoticeServedDate: ['', Validators.required],
      appRefId: ['', Validators.required],
      projectSiteVersion: [1, Validators.required],
      toDoActivityModeType: [1, Validators.required],
      applicationPurposeType : [0, Validators.required],
      rootActivityRefId: ['defaultValue', Validators.required],
      toDoActivityCategoryType: [1017, Validators.required]
      })as TForm<IComplaint_RecOfMon_GeneralDetail>;


      ngAfterViewInit() {
      this.route.queryParams
      .subscribe(params => {
        this.parmamEncodedinfo=params.info;
        this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info)=>{
        this.paramInfo = info;
        this.appRefId = this.paramInfo.appRefId;
        this.projectSiteVersion = this.paramInfo.projectSiteVersion;
        this.appHttpRequestHandlerService.httpGet({ id: this.paramInfo?.appRefId }, "Complaints", "getComplaintRecOfMonGeneralDetail").pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: GenericFormModel<IOSH_Form_1_Registration>) => { 
            this.appFormStepsList = data.appFormStepsList
            this.moneyDueOptions = data.enumTemplateLists.find(e => e.selectListTypeCode == "MoneyDueReasonTypeEnum").selectListItems
            this.initFormData(data)
            this.isEditAllowed = data.isEditAllowed;
          });
        });
      });
  }

   initFormData(genericFormData: GenericFormModel<IOSH_Form_1_Registration>) {
      console.log('generfic formdata', genericFormData);

      this.cdr.detectChanges();
    }


      onSubmit(): void {
      //     if (this.Input_Form.valid) {
      //         this.Input_Form.controls.applicationPurposeType.patchValue(0);
      //         // this.Input_Form.controls.iPin.patchValue(0);
      //         // this.Input_Form.controls.investPunjab_AppId.patchValue(0);
      //         this.Input_Form.controls.projectSiteVersion.patchValue(1);
      //         // this.Input_Form.controls..patchValue(1); // Static FactoryCircleRefId
      //         this.Input_Form.controls.rootActivityRefId.patchValue('Default');
      //         this.Input_Form.controls.toDoActivityCategoryType.patchValue(1);
      //         this.Input_Form.controls.applicationType.patchValue(100001);
      //         // this.Input_Form.controls.projectSiteRefId.patchValue(388263); // static 
      //         this.appHttpRequestHandlerService.httpPost(this.Input_Form.value, "pbsamadhannetcoreapi.Models.WorkerDetail", "Crud", "CreateUpdate").pipe(takeUntil(this.ngUnsubscribe))
      //           .subscribe((data: ICRUD_CreateUpdateOperationResponse) => {
      //           // if(this.Input_Form.value.appRefId !=0){
      //             this.navigateToNextStep(data);
      //           // } else {
      //           // this.mapCategories(data);
      //           // }
      //             // this.router.navigate([this.appFormStepsList.find(x=>x.stepCode=='EPFO').uiNextPageComponentPath],{queryParams: { info: this.commonOpsService.encodeQueryParamsInBase64( {
      //             //   identityKey: data.entityKeyId, 
      //             //   appRefId: data.appId, 
      //             //   applicationType: 101, 
      //             //   projectSiteRefId: this.paramInfo?.projectSiteRefId,
      //             //   applicationPurposeType: this.paramInfo?.applicationPurposeType,
      //             //   investPunjab_AppId: this.paramInfo?.investPunjab_AppId,
      //             //   iPin: this.paramInfo?.iPin,
      //             //   projectSiteVersion: this.projectSiteVersion
      //             // })}});
      //         });
      //     } else {
      //       this.Input_Form.markAllAsTouched();
      //       Object.keys(this.Input_Form.controls).forEach(key => {
      //     const control = this.Input_Form.get(key);
      
      //     if (control?.invalid) {
      // }
      //   });
      //     }
        }

        
    ngOnDestroy() {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
    }


}
