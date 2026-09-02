import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { IOSH_Form_1_Registration, IComplaint_RecOfMon_DueDetail } from 'src/app/osh/osh-code-typed-models';
import { IComplaint_RecOfMon_GeneralDetail, IComplaint_RecOfMon_AwardDetail, IComplaint_RecOfMon_NoticePayDetail, IComplaint_RecOfMon_RetrenchmentCompDetail, IComplaint_RecOfMon_LayOffDetail, IComplaint_RecOfMon_SettlementDetail, IComplaint_RecOfMon_LayOffCompDetail, IComplaint_RecoveryOfMoneyUnderIRCode } from 'src/app/samadhaan/samadhaan-typed-modelts';
import { categoryTypeEnum } from 'src/app/shared.data';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { ICRUD_CreateUpdateOperationResponse } from 'src/app/typed-model/crud-typed-models';
import Swal from 'sweetalert2';
import { AwardDetailsComponent } from '../award-details/award-details.component';
import { LayOffDetailsComponent } from '../lay-off-details/lay-off-details.component';
import { NoticePayDetailsComponent } from '../notice-pay-details/notice-pay-details.component';
import { RetrenchmentCompensationDetailsComponent } from '../retrenchment-compensation-details/retrenchment-compensation-details.component';
import { SettlementDetailsComponent } from '../settlement-details/settlement-details.component';

@Component({
  selector: 'app-recovery-of-money-general-details',
  templateUrl: './recovery-of-money-general-details.component.html',
  styleUrl: './recovery-of-money-general-details.component.css',
    standalone: false,
})
export class RecoveryOfMoneyGeneralDetailsComponent {
  @ViewChild(SettlementDetailsComponent)
    settlementDetailsComponent: SettlementDetailsComponent;
    @ViewChild(AwardDetailsComponent)
    awardDetailsComponent: AwardDetailsComponent;
    @ViewChild(NoticePayDetailsComponent)
    noticePayDetailsComponent: NoticePayDetailsComponent;
    @ViewChild(RetrenchmentCompensationDetailsComponent)
    retrenchmentCompensationDetailsComponent: RetrenchmentCompensationDetailsComponent;
    @ViewChild(LayOffDetailsComponent)
    layOffDetailsComponent: LayOffDetailsComponent;
    genericFormData: GenericFormModel<IComplaint_RecoveryOfMoneyUnderIRCode>;
    moneyDueReasonArray : any[] = [];



    public appFormStepsList: any[];
    public moneyDueOptions : any[]
    public parmamEncodedinfo:string;
    public paramInfo:any;
    public appRefId : any;
    public projectSiteVersion : any;
    public isEditAllowed : boolean;
    protected ngUnsubscribe: Subject<void> = new Subject<void>();
    public settlementDetailData : IComplaint_RecOfMon_GeneralDetail
    public awardDetailData : IComplaint_RecOfMon_AwardDetail
    public noticePaydDetailData : IComplaint_RecOfMon_NoticePayDetail
    public retrenchmentDetailData : IComplaint_RecOfMon_RetrenchmentCompDetail
    public layOffDetailData :IComplaint_RecOfMon_LayOffDetail
    public settlementDetailsApiData: GenericFormModel<IComplaint_RecOfMon_SettlementDetail>
    public awardDetailsApiData : GenericFormModel<IComplaint_RecOfMon_AwardDetail>
    public noticePayApiData : GenericFormModel<IComplaint_RecOfMon_NoticePayDetail>
    public retrenchmentDetailApiData : GenericFormModel<IComplaint_RecOfMon_RetrenchmentCompDetail>
    public layOffDetailApiData : GenericFormModel<IComplaint_RecOfMon_LayOffDetail>
    public layOffCompDetailApiData : GenericFormModel<IComplaint_RecOfMon_LayOffCompDetail[]>

    constructor(private fb : FormBuilder, private route : ActivatedRoute, private commonOpsService : CommonOpsService, private appHttpRequestHandlerService : AppHttpRequestHandlerService, private cdr : ChangeDetectorRef, private router : Router){}

    Input_Form : TForm<IComplaint_RecOfMon_GeneralDetail> = this.fb.group({
      id : [0, Validators.required],
      demandNoticeServedDate: ['', Validators.required],
      appRefId: ['', Validators.required],
      applicationType : ['', Validators.required],
      projectSiteVersion: [1, Validators.required],
      toDoActivityModeType: [1, Validators.required],
      applicationPurposeType : [0, Validators.required],
      rootActivityRefId: ['defaultValue'],
      toDoActivityCategoryType: [1017, Validators.required],
      moneyDueOptions: ['', Validators.required]
      })as TForm<IComplaint_RecOfMon_GeneralDetail>;


      ngAfterViewInit() {
      this.route.queryParams
      .subscribe(params => {
        this.parmamEncodedinfo=params.info;
        this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info)=>{

        this.paramInfo = info;
        
        this.appRefId = this.paramInfo.appRefId;
        this.projectSiteVersion = this.paramInfo.projectSiteVersion;
        this.Input_Form.controls.appRefId.patchValue(this.paramInfo?.appRefId);
        this.Input_Form.controls.applicationType.patchValue(this.paramInfo?.applicationType);
        this.appHttpRequestHandlerService.httpGet({ id: this.paramInfo?.appRefId }, "Complaints", "getComplaintRecOfMonGeneralDetail").pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: GenericFormModel<any>) => { 
            this.genericFormData = data;
            this.appFormStepsList = data.appFormStepsList
            this.moneyDueOptions = data.enumTemplateLists.find(e => e.selectListTypeCode == "MoneyDueReasonTypeEnum").selectListItems
            this.initFormData(data)
            this.isEditAllowed = data.isEditAllowed;
          });
        });
        this.getComplaintRecOfMonMoneyDueDetails();
        this.getSettilementDetailData();
        this.getAwardDetailData();
        this.getNoticePayDetailData();
        this.getRetrenchmentDetailData();
        this.getLayOffDetailData();
        this.getLayOffCompDetailData();
      });
  }

  getComplaintRecOfMonMoneyDueDetails(){
      this.appHttpRequestHandlerService
        .httpGet({ id: this.paramInfo?.appRefId }, 'Complaints', 'getComplaintRecOfMonDueDetail')
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data: GenericFormModel<IComplaint_RecOfMon_DueDetail[]>) => {
          

          if(data.formModel && data.formModel.length > 0){
            data.formModel.forEach((value: IComplaint_RecOfMon_DueDetail) => {
              this.moneyDueReasonArray.push(value.moneyDueReasonType);
            })
          }
          this.Input_Form.controls.moneyDueOptions.patchValue(this.moneyDueReasonArray);
          
        })
  }

   initFormData(genericFormData: GenericFormModel<IOSH_Form_1_Registration>) {
    if(genericFormData.formModel){
      const formData = { ...genericFormData.formModel };
     Object.keys(formData).forEach(key => {
        if (formData[key] && typeof formData[key] === 'string' && formData[key].includes('T')) {
          formData[key] = formData[key].split('T')[0];
        }
      });
      this.Input_Form.patchValue(formData);
      this.Input_Form.controls.toDoActivityModeType.patchValue(2);
    }

      this.cdr.detectChanges();
    }

    getSettilementDetailData(){
        this.appHttpRequestHandlerService
        .httpGet({ id: this.paramInfo?.appRefId }, 'Complaints', 'getComplaintRecOfMonSettlementDetail')
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data: GenericFormModel<IComplaint_RecOfMon_SettlementDetail>) => {
          this.settlementDetailsApiData = data
          this.appFormStepsList = data.appFormStepsList
        })
      }
    
      getAwardDetailData(){
        this.appHttpRequestHandlerService
        .httpGet({ id: this.paramInfo?.appRefId }, 'Complaints', 'getComplaintRecOfMonAwardDetail')
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data: GenericFormModel<IComplaint_RecOfMon_AwardDetail>) => {
          this.awardDetailsApiData = data;
        })
      }
    
    
      getNoticePayDetailData(){
        this.appHttpRequestHandlerService
        .httpGet({ id: this.paramInfo?.appRefId }, 'Complaints', 'getComplaintRecOfMonNoticePayDetail')
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data: GenericFormModel<IComplaint_RecOfMon_NoticePayDetail>) => {
          this.noticePayApiData = data;
    
        })
      }
    
      getRetrenchmentDetailData(){
        this.appHttpRequestHandlerService
        .httpGet({ id: this.paramInfo?.appRefId }, 'Complaints', 'getComplaintRecOfMonRetrenchmentCompDetail')
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data: GenericFormModel<IComplaint_RecOfMon_RetrenchmentCompDetail>) => {
          this.retrenchmentDetailApiData = data;
        })
      }
    
    
       getLayOffDetailData(){
        this.appHttpRequestHandlerService
        .httpGet({ id: this.paramInfo?.appRefId }, 'Complaints', 'getComplaintRecOfMonLayOffDetail')
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data: GenericFormModel<IComplaint_RecOfMon_LayOffDetail>) => {
          this.layOffDetailApiData = data;
        })
      }

        getLayOffCompDetailData(){
        this.appHttpRequestHandlerService
        .httpGet({ id: this.paramInfo?.appRefId }, 'Complaints', 'getComplaintRecOfMonLayOffCompDetail')
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data: GenericFormModel<IComplaint_RecOfMon_LayOffCompDetail[]>) => {
          this.layOffCompDetailApiData = data;
        })
      }

      onSubmit(): void {
        
        
        // 
        // 
        // 
        // 
        // 
        if(!this.settlementDetailsComponent?.isFormValid() && this.Input_Form.value.moneyDueOptions.includes(1)){
        Swal.fire({ icon: 'warning', text: 'Please fill Settlement Details completely.' });
        return;
        }

        if(!this.awardDetailsComponent?.isFormValid() && this.Input_Form.value.moneyDueOptions.includes(2)){
        Swal.fire({ icon: 'warning', text: 'Please fill Award Details completely.' });
        return;
        }

        if(!this.noticePayDetailsComponent?.isFormValid() && this.Input_Form.value.moneyDueOptions.includes(3)){
        Swal.fire({ icon: 'warning', text: 'Please fill Notice Pay Details completely.' });
        return;
        }


        if(!this.retrenchmentCompensationDetailsComponent?.isFormValid() && this.Input_Form.value.moneyDueOptions.includes(4)){
        Swal.fire({ icon: 'warning', text: 'Please fill Retrenchment Compensation Details completely.' });
        return;
        }

        if(!this.layOffDetailsComponent?.isFormValid() && this.Input_Form.value.moneyDueOptions.includes(5)){
        Swal.fire({ icon: 'warning', text: 'Please fill Lay Off Details completely.' });
        return;
        }
        
          this.saveMoneyDueDetails();
          if (this.Input_Form.valid) {
          this.Input_Form.controls.applicationPurposeType.patchValue(this.paramInfo.applicationPurposeType);
          this.Input_Form.controls.projectSiteVersion.patchValue(this.paramInfo.projectSiteVersion);
          this.Input_Form.controls.rootActivityRefId.patchValue('');
          this.Input_Form.controls.applicationType.patchValue(100001);
          this.Input_Form.controls.toDoActivityCategoryType.patchValue(categoryTypeEnum.INDIVIDUAL_COMPLAINT_REC_OF_MON_GEN_DETAILS);
          this.appHttpRequestHandlerService.httpPost(this.Input_Form.value, "pbsamadhannetcoreapi.Models.Complaint_RecOfMon_GeneralDetail", "Crud", "CreateUpdate").pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: ICRUD_CreateUpdateOperationResponse) => {
            if(this.Input_Form.value.moneyDueOptions.includes(1)){
          this.settlementDetailData.appRefId = this.paramInfo.appRefId;
          this.settlementDetailData.applicationPurposeType = this.paramInfo.applicationPurposeType;
          this.settlementDetailData.projectSiteVersion= this.paramInfo.projectSiteVersion;
          this.settlementDetailData.rootActivityRefId= '';
          this.settlementDetailData.applicationType= 100001;
          this.settlementDetailData.toDoActivityCategoryType= categoryTypeEnum.INDIVIDUAL_COMPLAINT_REC_OF_MON_SETTLEMENT_DETAILS;
          this.appHttpRequestHandlerService.httpPost(this.settlementDetailData, "pbsamadhannetcoreapi.Models.Complaint_RecOfMon_SettlementDetail", "Crud", "CreateUpdate").pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: ICRUD_CreateUpdateOperationResponse) => {
           this.navigateToNextStep(data,1);
          })
        }
          if( this.Input_Form.value.moneyDueOptions.includes(2)){
          this.awardDetailData.appRefId = this.paramInfo.appRefId;
          this.awardDetailData.applicationPurposeType = this.paramInfo.applicationPurposeType;
          this.awardDetailData.projectSiteVersion= this.paramInfo.projectSiteVersion;
          this.awardDetailData.rootActivityRefId= '';
          this.awardDetailData.applicationType= 100001;
          this.awardDetailData.toDoActivityCategoryType= categoryTypeEnum.INDIVIDUAL_COMPLAINT_REC_OF_MON_AWARD_DETAILS;
          this.appHttpRequestHandlerService.httpPost(this.awardDetailData, "pbsamadhannetcoreapi.Models.Complaint_RecOfMon_AwardDetail", "Crud", "CreateUpdate").pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: ICRUD_CreateUpdateOperationResponse) => {
            this.navigateToNextStep(data,2);
          })
        }
          if( this.Input_Form.value.moneyDueOptions.includes(3)){
          this.noticePaydDetailData.appRefId = this.paramInfo.appRefId;
          this.noticePaydDetailData.applicationPurposeType = this.paramInfo.applicationPurposeType;
          this.noticePaydDetailData.projectSiteVersion= this.paramInfo.projectSiteVersion;
          this.noticePaydDetailData.rootActivityRefId= '';
          this.noticePaydDetailData.applicationType= 100001;
          this.noticePaydDetailData.toDoActivityCategoryType= categoryTypeEnum.INDIVIDUAL_COMPLAINT_REC_OF_MON_NOTICE_PAY_DETAILS;
          this.appHttpRequestHandlerService.httpPost(this.noticePaydDetailData, "pbsamadhannetcoreapi.Models.Complaint_RecOfMon_NoticePayDetail", "Crud", "CreateUpdate").pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: ICRUD_CreateUpdateOperationResponse) => {
            this.navigateToNextStep(data,3);
          })
        }
          if( this.Input_Form.value.moneyDueOptions.includes(4)){
          this.retrenchmentDetailData.appRefId = this.paramInfo.appRefId;
          this.retrenchmentDetailData.applicationPurposeType = this.paramInfo.applicationPurposeType;
          this.retrenchmentDetailData.projectSiteVersion= this.paramInfo.projectSiteVersion;
          this.retrenchmentDetailData.rootActivityRefId= '';
          this.retrenchmentDetailData.applicationType= 100001;
          this.retrenchmentDetailData.toDoActivityCategoryType= categoryTypeEnum.INDIVIDUAL_COMPLAINT_REC_OF_MON_RETRENCHMENT_DETAILS;
          this.appHttpRequestHandlerService.httpPost(this.retrenchmentDetailData, "pbsamadhannetcoreapi.Models.Complaint_RecOfMon_RetrenchmentCompDetail", "Crud", "CreateUpdate").pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: ICRUD_CreateUpdateOperationResponse) => {
            this.navigateToNextStep(data,4);
          })
        }
          if( this.Input_Form.value.moneyDueOptions.includes(5)){
          this.layOffDetailData.appRefId = this.paramInfo.appRefId;
          this.layOffDetailData.projectSiteVersion= this.paramInfo.projectSiteVersion;
          this.layOffDetailData.rootActivityRefId= '';
          this.layOffDetailData.applicationType= 100001;
          this.layOffDetailData.toDoActivityCategoryType= categoryTypeEnum.INDIVIDUAL_COMPLAINT_REC_OF_MON_LAY_OFF_DETAILS;
          this.appHttpRequestHandlerService.httpPost(this.layOffDetailData, "pbsamadhannetcoreapi.Models.Complaint_RecOfMon_LayOffDetail", "Crud", "CreateUpdate").pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: ICRUD_CreateUpdateOperationResponse) => {
          })
          this.layOffDetailData.complaint_RecOfMon_LayOffCompDetail.forEach(data =>{
          data.appRefId = this.paramInfo.appRefId;
          data.projectSiteVersion= this.paramInfo.projectSiteVersion;
          data.projectSiteVersion= this.paramInfo.projectSiteVersion;
          data.rootActivityRefId= '';
          data.applicationType= 100001;
          data.toDoActivityCategoryType= categoryTypeEnum.INDIVIDUAL_COMPLAINT_REC_OF_MON_LAY_OFF_COMPDETAILS;
          this.appHttpRequestHandlerService.httpPost(data, "pbsamadhannetcoreapi.Models.Complaint_RecOfMon_LayOffCompDetail", "Crud", "CreateUpdate").pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: ICRUD_CreateUpdateOperationResponse) => {
              this.navigateToNextStep(data,5);
          });
          })
        }
          }) 
        }else {
          this.Input_Form.markAllAsTouched();
          Swal.fire({ icon: 'warning', text: 'Please Fill General Details completely.' });

          Object.keys(this.Input_Form.controls).forEach(key => {
            const control = this.Input_Form.get(key);
            if (control?.invalid) {
              
            }
          });
        }
          }
    
    navigateToNextStep(data: ICRUD_CreateUpdateOperationResponse, stepNumber: number) {
    if(this.Input_Form.value.moneyDueOptions.at(-1) === stepNumber){
    this.router.navigate(
          [this.appFormStepsList.find(x => x.stepCode === 'RM')?.uiNextPageComponentPath],
          {
            queryParams: {
              info: this.commonOpsService.encodeQueryParamsInBase64({
                identityKey: data.entityKeyId,
                appRefId: this.paramInfo.appRefId,
                applicationType: 100001,
                applicationPurposeType: 0,
                projectSiteVersion: 1,
              }),
            },
          }
        );
      }
    }

    saveMoneyDueDetails(){
      const moneyDueOptions = this.Input_Form.get('moneyDueOptions')?.value as string[];

      moneyDueOptions.forEach((value: string) => {
      const data: any = {};
      data.id = 0;
      data.appRefId = this.paramInfo.appRefId;
      data.applicationPurposeType = this.paramInfo.applicationPurposeType;
      data.projectSiteVersion =this.paramInfo.projectSiteVersion
      data.rootActivityRefId  = '';
      data.applicationType = 100001;
      data.toDoActivityCategoryType = categoryTypeEnum.INDIVIDUAL_COMPLAINT_REC_OF_MON_DUE;
      data.todoActivityModeType = this.moneyDueReasonArray.length > 0 ? 2 : 1;
      data.moneyDueReasonType = Number(value);
      this.appHttpRequestHandlerService.httpPost(data, "pbsamadhannetcoreapi.Models.Complaint_RecOfMon_MoneyDueDetail", "Crud", "CreateUpdate").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: ICRUD_CreateUpdateOperationResponse) => {
       
      });
    })
  }

        
    ngOnDestroy() {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
    }

    settlementDetailDataEventListener(data:IComplaint_RecOfMon_GeneralDetail){
    this.settlementDetailData = data;
    }

    awardDetailDataEventListener(data:IComplaint_RecOfMon_AwardDetail){
    this.awardDetailData = data;
    }

    noticePayDetailDataEventListener(data:IComplaint_RecOfMon_NoticePayDetail){
    this.noticePaydDetailData = data;
    }

    retrenchmentDetailDataEventListener(data:IComplaint_RecOfMon_RetrenchmentCompDetail){
    this.retrenchmentDetailData = data;
    }

    layOffDetailDataEventListener(data:IComplaint_RecOfMon_LayOffDetail){
      
    this.layOffDetailData = data;
    }

}
