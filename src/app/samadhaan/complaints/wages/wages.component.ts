import { Component, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { IComplaint_Claim_CodeOnWage, IComplaint_MinimumWagesNotPaid, IComplaint_Wages, IComplaint_Wages_PeriodAmt } from '../../samadhaan-typed-modelts';
import { ClaimUnderCodeOnWagesComponent } from './claim-under-code-on-wages/claim-under-code-on-wages.component';
import Swal from 'sweetalert2';
import { MinimumWagesNotPaidComponent } from './minimum-wages-not-paid/minimum-wages-not-paid.component';
import { WagesWeeklydayComponent } from './wages-weeklyday/wages-weeklyday.component';
import { categoryTypeEnum } from 'src/app/shared.data';
import { WagesWorkingOvertimeComponent } from './wages-working-overtime/wages-working-overtime.component';
import { WagesNotPaidAtAllComponent } from './wages-not-paid-at-all/wages-not-paid-at-all.component';
import { WagesUnauthorisedDeductionComponent } from './wages-unauthorised-deduction/wages-unauthorised-deduction.component';
import { NonPaymentBonusComponent } from './non-payment-bonus/non-payment-bonus.component';
import { ICRUD_CreateUpdateOperationResponse } from 'src/app/typed-model/crud-typed-models';

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
  @ViewChild(MinimumWagesNotPaidComponent)
  MinimumWagesNotPaidComponent: MinimumWagesNotPaidComponent;
  @ViewChild(WagesWeeklydayComponent)
  WagesWeeklydayComponent: WagesWeeklydayComponent;
  @ViewChild(WagesWorkingOvertimeComponent)
  WagesWorkingOvertimeComponent: WagesWorkingOvertimeComponent;
  @ViewChild(WagesNotPaidAtAllComponent)
  WagesNotPaidAtAllComponent: WagesNotPaidAtAllComponent;
  @ViewChild(WagesUnauthorisedDeductionComponent)
  WagesUnauthorisedDeductionComponent: WagesUnauthorisedDeductionComponent;
    @ViewChild(NonPaymentBonusComponent)
  NonPaymentBonusComponent: NonPaymentBonusComponent;
  minimumWagesDetailData : IComplaint_Wages
  wagesWeeklyDayDetailData : IComplaint_Wages
  wagesWorkingOverTimeDetailData : IComplaint_Wages
  wagesNotPaidAtAllDetailData : IComplaint_Wages
  wagesUnauthDedDetailData : IComplaint_Wages
  nonPayBonusDetailData
  public appFormStepsList: any[] = [];
  public paramInfo: any;
  public parmamEncodedinfo: string;
  codeOnWagesDetailData : IComplaint_Claim_CodeOnWage
  genericFormData: GenericFormModel<IComplaint_Claim_CodeOnWage>;
  claimUnderCodeOnWagesApiData:any
  minimumWagesApiData : any
  minimumWagesPeriodApiData : any
  wagesWeeklyApiData : GenericFormModel<IComplaint_Wages>
  wagesNotPaidAtAllApiData : GenericFormModel<IComplaint_Wages>
  wageUnauthDedApiData : GenericFormModel<IComplaint_Wages>
  nonPayBonusApiData

  wagesWeeklyPeriodAmtApiData : GenericFormModel<IComplaint_Wages_PeriodAmt[]>
  wagesOverTimeApiData : GenericFormModel<IComplaint_Wages>
  wagesOverTimePeriodAmtApiData : GenericFormModel<IComplaint_Wages_PeriodAmt[]>
  wagesNotPaidAtAllPeriodAmtApiData : GenericFormModel<IComplaint_Wages_PeriodAmt[]>
  wageUnauthDedPeriodAmtApiData : GenericFormModel<IComplaint_Wages_PeriodAmt[]>
  nonPayBonusPeriodAmtApiData

  constructor(  
    private fb: UntypedFormBuilder,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private route: ActivatedRoute,
    public commonOpsService: CommonOpsService,
    private router : Router
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.route.queryParams.subscribe((params) => {
      this.parmamEncodedinfo = params.info;
      this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info) => {
        this.paramInfo = info;
        this.getClaimUnderCodeOnWagesData();
        this.getMinimumWagesData();
        this.getMinumWagesPeriodData();
        this.getWeeklyDayWagesData();
        this.getWeeklyDayWagesPeriodData();
        this.getOverTimeWagesData();
        this.getNotPaidAtAllWagesData();
        this.getNotPaidAtAllWagesPeriodAmtData();
        this.getOverTimeWagesPeriodAmtData();
        this.getUnAuthorisedDedWagesData();
        this.getUnAuthorisedDedWagesPeriodAmtData();
        this.getNonPayBonusData();
        this.getNonPayBonusPeriodAmtData();
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
      this.appFormStepsList = data.appFormStepsList
    })
  }

  getMinimumWagesData(){
    this.appHttpRequestHandlerService
    .httpGet({ id: this.paramInfo?.appRefId }, 'Complaints', 'getMinimumWagesNotPaidDetail')
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: GenericFormModel<IComplaint_MinimumWagesNotPaid>) => {
      this.minimumWagesApiData = data;
    })
  }


  getMinumWagesPeriodData(){
    this.appHttpRequestHandlerService
    .httpGet({ id: this.paramInfo?.appRefId }, 'Complaints', 'getMinimumWagesNotPaidPeriodAmountDetail')
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: GenericFormModel<IComplaint_MinimumWagesNotPaid>) => {
      this.minimumWagesPeriodApiData = data;

    })
  }

  getWeeklyDayWagesData(){
    this.appHttpRequestHandlerService
    .httpGet({ id: this.paramInfo?.appRefId }, 'Complaints', 'getWagesNotPaidWeekDayDetail')
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: GenericFormModel<IComplaint_Wages>) => {
      this.wagesWeeklyApiData = data;
    })
  }


   getWeeklyDayWagesPeriodData(){
    this.appHttpRequestHandlerService
    .httpGet({ id: this.paramInfo?.appRefId }, 'Complaints', 'getWagesNotPaidWeekDayPeriodAmountDetail')
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: GenericFormModel<IComplaint_Wages_PeriodAmt[]>) => {
      this.wagesWeeklyPeriodAmtApiData = data;
    })
  }


  getOverTimeWagesData(){
    this.appHttpRequestHandlerService
    .httpGet({ id: this.paramInfo?.appRefId }, 'Complaints', 'getWagesWorkingOvertimeDetail')
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: GenericFormModel<IComplaint_Wages>) => {
      this.wagesOverTimeApiData = data;
    })
  }


   getOverTimeWagesPeriodAmtData(){
    this.appHttpRequestHandlerService
    .httpGet({ id: this.paramInfo?.appRefId }, 'Complaints', 'getWagesWorkingOvertimePerAmtDetail')
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: GenericFormModel<IComplaint_Wages_PeriodAmt[]>) => {
      this.wagesOverTimePeriodAmtApiData = data;
    })
  }

  getNotPaidAtAllWagesData(){
    this.appHttpRequestHandlerService
    .httpGet({ id: this.paramInfo?.appRefId }, 'Complaints', 'getWagesNotPaidDetail')
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: GenericFormModel<IComplaint_Wages>) => {
      this.wagesNotPaidAtAllApiData = data;
    })
  }


  getNotPaidAtAllWagesPeriodAmtData(){
    this.appHttpRequestHandlerService
    .httpGet({ id: this.paramInfo?.appRefId }, 'Complaints', 'getWagesNotPaidPerAmtDetail')
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: GenericFormModel<IComplaint_Wages_PeriodAmt[]>) => {
      this.wagesNotPaidAtAllPeriodAmtApiData = data;
    })
  }

  getUnAuthorisedDedWagesData(){
    this.appHttpRequestHandlerService
    .httpGet({ id: this.paramInfo?.appRefId }, 'Complaints', 'getUnauthDeductWagesDetail')
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: GenericFormModel<IComplaint_Wages>) => {
      this.wageUnauthDedApiData = data;
    })
  }

  getUnAuthorisedDedWagesPeriodAmtData(){
    this.appHttpRequestHandlerService
    .httpGet({ id: this.paramInfo?.appRefId }, 'Complaints', 'getUnauthDeductWagesPerAmtDetail')
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: GenericFormModel<IComplaint_Wages_PeriodAmt[]>) => {
      this.wageUnauthDedPeriodAmtApiData = data;
    })
  }

   getNonPayBonusData(){
    this.appHttpRequestHandlerService
    .httpGet({ id: this.paramInfo?.appRefId }, 'Complaints', 'getNonPayBonusDetail')
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data) => {
      this.nonPayBonusApiData = data;
    })
  }


  getNonPayBonusPeriodAmtData(){
    this.appHttpRequestHandlerService
    .httpGet({ id: this.paramInfo?.appRefId }, 'Complaints', 'getNonPayBonusPerAmtDetail')
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data) => {
      this.nonPayBonusPeriodAmtApiData = data;
    })
  }


  onSaveDraft(): void {
  }

  onBack(): void {
}

  // onSubmit(): void {
  //  if(!this.claimCodeOnWagesComponent?.isFormValid()){
  //   Swal.fire({ icon: 'warning', text: 'Please fill Claim Under code on wages completely.' });
  //   return;
  //  }
  //  if(!this.MinimumWagesNotPaidComponent?.isFormValid()){
  //   Swal.fire({ icon: 'warning', text: 'Please fill Minimum Wages completely.' });
  //   return;
  //  }
  //   if(!this.WagesWeeklydayComponent?.isFormValid()){
  //   Swal.fire({ icon: 'warning', text: 'Please fill Wages Weekly completely.' });
  //   return;
  //  }

  //  if(!this.WagesWorkingOvertimeComponent?.isFormValid()){
  //   Swal.fire({ icon: 'warning', text: 'Please fill Wages Working Overtime completely.' });
  //   return;
  //  }

  //   if(!this.WagesNotPaidAtAllComponent?.isFormValid()){
  //   Swal.fire({ icon: 'warning', text: 'Please fill Wages Not Paid At All completely.' });
  //   return;
  //   }

  //   if(!this.WagesUnauthorisedDeductionComponent?.isFormValid()){
  //   Swal.fire({ icon: 'warning', text: 'Please fill Unauthorised Deduction completely.' });
  //   return;
  //   }

  //    if(!this.NonPaymentBonusComponent?.isFormValid()){
  //   Swal.fire({ icon: 'warning', text: 'Please fill Non payment of bonus completely.' });
  //   return;
  //   }

  //  // FOR CLAIM UNDER CODE ON WAGES
  //  this.codeOnWagesDetailData.appRefId = this.paramInfo?.appRefId;
  //  this.codeOnWagesDetailData.projectSiteRefId=this.paramInfo?.projectSiteRefId;
  //  this.codeOnWagesDetailData.applicationPurposeType=this.paramInfo?.applicationPurposeType;
  //  this.codeOnWagesDetailData.iPin=this.paramInfo?.iPin;
  //  this.codeOnWagesDetailData.investPunjab_AppId=this.paramInfo?.investPunjab_AppId;
  //  this.codeOnWagesDetailData.projectSiteVersion=this.paramInfo?.projectSiteVersion;
  //  this.codeOnWagesDetailData.toDoActivityModeType=1;
  //  this.codeOnWagesDetailData.rootActivityRefId='default value';
  //  this.codeOnWagesDetailData.toDoActivityCategoryType=2006;
  //  this.codeOnWagesDetailData.applicationType = this.paramInfo.applicationType;

  //  console.log('codeOnWagesDetailData', this.codeOnWagesDetailData)

  //   this.appHttpRequestHandlerService
  //     .httpPost(this.codeOnWagesDetailData,'pbsamadhannetcoreapi.Models.Complaint_Claim_CodeOnWage','Crud','CreateUpdate').pipe(takeUntil(this.ngUnsubscribe)).subscribe({
  //       next: () => {

  //   // FOR MINIMUM WAGES

  //     this.minimumWagesDetailData.Complaint_MinimumWagesNotPaidDetails.forEach(data => {
  //       data.appRefId = this.paramInfo?.appRefId;
  //       data.applicationPurposeType=this.paramInfo?.applicationPurposeType;
  //       data.projectSiteVersion=this.paramInfo?.projectSiteVersion;
  //       // data.toDoActivityModeType=1;
  //       data.rootActivityRefId='default value';
  //       data.toDoActivityCategoryType=2007;
  //       data.applicationType = this.paramInfo.app
  //       console.log('data', data)
  //       this.appHttpRequestHandlerService.httpPost(data,'pbsamadhannetcoreapi.Models.Complaint_MinimumWagesPeriodAmt','Crud','CreateUpdate').pipe(takeUntil(this.ngUnsubscribe)).subscribe({
  //       next: () => {
  //       this.minimumWagesDetailData.appRefId = this.paramInfo?.appRefId;
  //       this.minimumWagesDetailData.applicationPurposeType=this.paramInfo?.applicationPurposeType;
  //       this.minimumWagesDetailData.projectSiteVersion=this.paramInfo?.projectSiteVersion;
  //       this.minimumWagesDetailData.rootActivityRefId='default value';
  //       this.minimumWagesDetailData.toDoActivityCategoryType=2008;
  //       this.minimumWagesDetailData.applicationType = this.paramInfo.applicationType;
  //       console.log('minimumWagesDetailData', this.minimumWagesDetailData)
  //       this.appHttpRequestHandlerService.httpPost(this.minimumWagesDetailData,'pbsamadhannetcoreapi.Models.Complaint_MinimumWage','Crud','CreateUpdate').pipe(takeUntil(this.ngUnsubscribe)).subscribe({
  //        next: () => {
          
  //        }})

  //       }})

  //     })

  //     // FOR WEEKLY DAT OF REST 
    
  //       this.wagesWeeklyDayDetailData.appRefId = this.paramInfo?.appRefId;
  //       this.wagesWeeklyDayDetailData.applicationPurposeType=this.paramInfo?.applicationPurposeType;
  //       this.wagesWeeklyDayDetailData.projectSiteVersion=this.paramInfo?.projectSiteVersion;
  //       this.wagesWeeklyDayDetailData.toDoActivityCategoryType=categoryTypeEnum.INDIVIDUAL_COMPLAINT_WAGES_WEEKLY;
  //       this.wagesWeeklyDayDetailData.applicationType = this.paramInfo.applicationType;
  //       this.wagesWeeklyDayDetailData.rootActivityRefId = ''
  //       console.log('wagesWeeklyDayDetailData', this.wagesWeeklyDayDetailData)
  //       this.appHttpRequestHandlerService.httpPost(this.wagesWeeklyDayDetailData,'pbsamadhannetcoreapi.Models.Complaint_Wages_WkDay','Crud','CreateUpdate').pipe(takeUntil(this.ngUnsubscribe)).subscribe({
  //        next: () => {
  //       this.wagesWeeklyDayDetailData.periodAmtDetails.forEach(data => {
  //       data.appRefId = this.paramInfo?.appRefId;
  //       data.applicationPurposeType=this.paramInfo?.applicationPurposeType;
  //       data.projectSiteVersion=this.paramInfo?.projectSiteVersion;
  //       // data.toDoActivityModeType=1;
  //       data.toDoActivityCategoryType=categoryTypeEnum.INDIVIDUAL_COMPLAINT_WAGES_WEEKLY_PERIOD_AMOUNT;
  //       data.applicationType = this.paramInfo.applicationType
  //       this.appHttpRequestHandlerService.httpPost(data,'pbsamadhannetcoreapi.Models.Complaint_Wages_WkDay_PeriodAmt','Crud','CreateUpdate').pipe(takeUntil(this.ngUnsubscribe)).subscribe({
  //       next: () => {
          

  //       }})})
  //        }})

  //       // FOR WORKING OVERTIME
    
  //       this.wagesWorkingOverTimeDetailData.appRefId = this.paramInfo?.appRefId;
  //       this.wagesWorkingOverTimeDetailData.applicationPurposeType=this.paramInfo?.applicationPurposeType;
  //       this.wagesWorkingOverTimeDetailData.projectSiteVersion=this.paramInfo?.projectSiteVersion;
  //       this.wagesWorkingOverTimeDetailData.toDoActivityCategoryType=categoryTypeEnum.INDIVIDUAL_COMPLAINT_WORKING_OVERTIME;
  //       this.wagesWorkingOverTimeDetailData.applicationType = this.paramInfo.applicationType;
  //       this.wagesWorkingOverTimeDetailData.rootActivityRefId = ''
  //       this.appHttpRequestHandlerService.httpPost(this.wagesWorkingOverTimeDetailData,'pbsamadhannetcoreapi.Models.Complaint_Wages_OT','Crud','CreateUpdate').pipe(takeUntil(this.ngUnsubscribe)).subscribe({
  //        next: () => {
  //         debugger;
  //       this.wagesWorkingOverTimeDetailData.periodAmtDetails.forEach(data => {
  //       data.appRefId = this.paramInfo?.appRefId;
  //       data.applicationPurposeType=this.paramInfo?.applicationPurposeType;
  //       data.projectSiteVersion=this.paramInfo?.projectSiteVersion;
  //       // data.toDoActivityModeType=1;
  //       data.toDoActivityCategoryType=categoryTypeEnum.INDIVIDUAL_COMPLAINT_WORKING_OVERTIME_PERIOD_AMOUNT;
  //       data.applicationType = this.paramInfo.applicationType
  //       this.appHttpRequestHandlerService.httpPost(data,'pbsamadhannetcoreapi.Models.Complaint_Wages_OT_PeriodAmt','Crud','CreateUpdate').pipe(takeUntil(this.ngUnsubscribe)).subscribe({
  //       next: () => {
          

  //       }})})
  //        }})

  //       // FOR WAGES NOT PAID AT ALL 

  //       this.wagesNotPaidAtAllDetailData.appRefId = this.paramInfo?.appRefId;
  //       this.wagesNotPaidAtAllDetailData.applicationPurposeType=this.paramInfo?.applicationPurposeType;
  //       this.wagesNotPaidAtAllDetailData.projectSiteVersion=this.paramInfo?.projectSiteVersion;
  //       this.wagesNotPaidAtAllDetailData.toDoActivityCategoryType=categoryTypeEnum.INDIVIDUAL_COMPLAINT_WAGES_NOT_PAID;
  //       this.wagesNotPaidAtAllDetailData.applicationType = this.paramInfo.applicationType;
  //       this.wagesNotPaidAtAllDetailData.rootActivityRefId = ''
  //       this.appHttpRequestHandlerService.httpPost(this.wagesNotPaidAtAllDetailData,'pbsamadhannetcoreapi.Models.Complaint_Wages_Not_Paid','Crud','CreateUpdate').pipe(takeUntil(this.ngUnsubscribe)).subscribe({
  //        next: () => {
  //       this.wagesNotPaidAtAllDetailData.periodAmtDetails.forEach(data => {
  //       data.appRefId = this.paramInfo?.appRefId;
  //       data.applicationPurposeType=this.paramInfo?.applicationPurposeType;
  //       data.projectSiteVersion=this.paramInfo?.projectSiteVersion;
  //       // data.toDoActivityModeType=1;
  //       data.toDoActivityCategoryType=categoryTypeEnum.INDIVIDUAL_COMPLAINT_WAGES_NOT_PAID_PERIOD_AMOUNT         ;
  //       data.applicationType = this.paramInfo.applicationType
  //       console.log('data', data);
  //       this.appHttpRequestHandlerService.httpPost(data,'pbsamadhannetcoreapi.Models.Complaint_Wages_Not_Paid_PeriodAmt','Crud','CreateUpdate').pipe(takeUntil(this.ngUnsubscribe)).subscribe({
  //       next: () => {
          

  //       }})})
  //        }})

  //       // FOR UNAUTHORISED DECUTION OF WAGES 
  //       this.wagesUnauthDedDetailData.appRefId = this.paramInfo?.appRefId;
  //       this.wagesUnauthDedDetailData.applicationPurposeType=this.paramInfo?.applicationPurposeType;
  //       this.wagesUnauthDedDetailData.projectSiteVersion=this.paramInfo?.projectSiteVersion;
  //       this.wagesUnauthDedDetailData.toDoActivityCategoryType=categoryTypeEnum.INDIVIDUAL_COMPLAINT_WAGES_UNAUTHDED;
  //       this.wagesUnauthDedDetailData.applicationType = this.paramInfo.applicationType;
  //       this.wagesUnauthDedDetailData.rootActivityRefId = ''
  //       console.log('wagesUnauthDedDetailData', this.wagesUnauthDedDetailData)
  //       this.appHttpRequestHandlerService.httpPost(this.wagesUnauthDedDetailData,'pbsamadhannetcoreapi.Models.Complaint_Wages_Unauth_Deduct','Crud','CreateUpdate').pipe(takeUntil(this.ngUnsubscribe)).subscribe({
  //        next: () => {
  //       this.wagesUnauthDedDetailData.periodAmtDetails.forEach(data => {
  //       data.appRefId = this.paramInfo?.appRefId;
  //       data.applicationPurposeType=this.paramInfo?.applicationPurposeType;
  //       data.projectSiteVersion=this.paramInfo?.projectSiteVersion;
  //       data.toDoActivityCategoryType=categoryTypeEnum.INDIVIDUAL_COMPLAINT_WAGES_UNAUTHDED_PERIOD_AMOUNT         ;
  //       data.applicationType = this.paramInfo.applicationType
  //       console.log('data', data);
  //       this.appHttpRequestHandlerService.httpPost(data,'pbsamadhannetcoreapi.Models.Complaint_Wages_Unauth_Deduct_PeriodAmt','Crud','CreateUpdate').pipe(takeUntil(this.ngUnsubscribe)).subscribe({
  //       next: () => {
          

  //       }})})
  //        }})

  //       //  FOR NON PAYMENT OF WAGES

  //       this.nonPayBonusDetailData.appRefId = this.paramInfo?.appRefId;
  //       this.nonPayBonusDetailData.applicationPurposeType=this.paramInfo?.applicationPurposeType;
  //       this.nonPayBonusDetailData.projectSiteVersion=this.paramInfo?.projectSiteVersion;
  //       this.nonPayBonusDetailData.toDoActivityCategoryType=categoryTypeEnum.INDIVIDUAL_COMPLAINT_NON_PAY_BONUS;
  //       this.nonPayBonusDetailData.applicationType = this.paramInfo.applicationType;
  //       this.nonPayBonusDetailData.rootActivityRefId = ''
  //       console.log('wagesUnauthDedDetailData', this.wagesUnauthDedDetailData)
  //       this.appHttpRequestHandlerService.httpPost(this.nonPayBonusDetailData,'pbsamadhannetcoreapi.Models.Complaint_Non_Pay_Bonus','Crud','CreateUpdate').pipe(takeUntil(this.ngUnsubscribe)).subscribe({
  //        next: () => {
  //       this.nonPayBonusDetailData.periodAmtDetails.forEach(data => {
  //       data.appRefId = this.paramInfo?.appRefId;
  //       data.applicationPurposeType=this.paramInfo?.applicationPurposeType;
  //       data.projectSiteVersion=this.paramInfo?.projectSiteVersion;
  //       data.toDoActivityCategoryType=categoryTypeEnum.INDIVIDUAL_COMPLAINT_NON_PAY_BONUS_PERIOD_AMOUNT;
  //       data.applicationType = this.paramInfo.applicationType
  //       data.rootActivityRefId = ''
  //       console.log('data', data);
  //       this.appHttpRequestHandlerService.httpPost(data,'pbsamadhannetcoreapi.Models.Complaint_Non_Pay_Bonus_PeriodAmt','Crud','CreateUpdate').pipe(takeUntil(this.ngUnsubscribe)).subscribe({
  //       next: () => {
          

  //       }})})
  //        }})


       
      
        
         
  //       }
  //     });

  // }

  onSubmit(): void {
  if(!this.claimCodeOnWagesComponent?.isFormValid()){
   Swal.fire({ icon: 'warning', text: 'Please fill Claim Under code on wages completely.' });
   return;
  }
  if(!this.MinimumWagesNotPaidComponent?.isFormValid()){
   Swal.fire({ icon: 'warning', text: 'Please fill Minimum Wages completely.' });
   return;
  }
   if(!this.WagesWeeklydayComponent?.isFormValid()){
   Swal.fire({ icon: 'warning', text: 'Please fill Wages Weekly completely.' });
   return;
  }

  if(!this.WagesWorkingOvertimeComponent?.isFormValid()){
   Swal.fire({ icon: 'warning', text: 'Please fill Wages Working Overtime completely.' });
   return;
  }

   if(!this.WagesNotPaidAtAllComponent?.isFormValid()){
   Swal.fire({ icon: 'warning', text: 'Please fill Wages Not Paid At All completely.' });
   return;
   }

   if(!this.WagesUnauthorisedDeductionComponent?.isFormValid()){
   Swal.fire({ icon: 'warning', text: 'Please fill Unauthorised Deduction completely.' });
   return;
   }

    if(!this.NonPaymentBonusComponent?.isFormValid()){
   Swal.fire({ icon: 'warning', text: 'Please fill Non payment of bonus completely.' });
   return;
   }

  // FOR CLAIM UNDER CODE ON WAGES
  this.codeOnWagesDetailData.appRefId = this.paramInfo?.appRefId;
  this.codeOnWagesDetailData.applicationPurposeType=this.paramInfo?.applicationPurposeType;
  this.codeOnWagesDetailData.projectSiteVersion=this.paramInfo?.projectSiteVersion;
  this.codeOnWagesDetailData.rootActivityRefId='default value';
  this.codeOnWagesDetailData.toDoActivityCategoryType=2006;
  this.codeOnWagesDetailData.applicationType = this.paramInfo.applicationType;

  console.log('codeOnWagesDetailData', this.codeOnWagesDetailData)

  this.appHttpRequestHandlerService
    .httpPost(this.codeOnWagesDetailData,'pbsamadhannetcoreapi.Models.Complaint_Claim_CodeOnWage','Crud','CreateUpdate').pipe(takeUntil(this.ngUnsubscribe)).subscribe({
      next: () => {

        // FOR MINIMUM WAGES
        this.minimumWagesDetailData.periodAmtDetails.forEach(data => {
          data.appRefId = this.paramInfo?.appRefId;
          data.applicationPurposeType=this.paramInfo?.applicationPurposeType;
          data.projectSiteVersion=this.paramInfo?.projectSiteVersion;
          data.rootActivityRefId='default value';
          data.toDoActivityCategoryType=2007;
          data.applicationType = this.paramInfo.app
          console.log('data', data)
          this.appHttpRequestHandlerService.httpPost(data,'pbsamadhannetcoreapi.Models.Complaint_MinimumWagesPeriodAmt','Crud','CreateUpdate').pipe(takeUntil(this.ngUnsubscribe)).subscribe({
          next: () => {
          this.minimumWagesDetailData.appRefId = this.paramInfo?.appRefId;
          this.minimumWagesDetailData.applicationPurposeType=this.paramInfo?.applicationPurposeType;
          this.minimumWagesDetailData.projectSiteVersion=this.paramInfo?.projectSiteVersion;
          this.minimumWagesDetailData.rootActivityRefId='default value';
          this.minimumWagesDetailData.toDoActivityCategoryType=2008;
          this.minimumWagesDetailData.applicationType = this.paramInfo.applicationType;
          console.log('minimumWagesDetailData', this.minimumWagesDetailData)
          this.appHttpRequestHandlerService.httpPost(this.minimumWagesDetailData,'pbsamadhannetcoreapi.Models.Complaint_MinimumWage','Crud','CreateUpdate').pipe(takeUntil(this.ngUnsubscribe)).subscribe({
           next: () => {

            // FOR WEEKLY DAY OF REST
            this.wagesWeeklyDayDetailData.appRefId = this.paramInfo?.appRefId;
            this.wagesWeeklyDayDetailData.applicationPurposeType=this.paramInfo?.applicationPurposeType;
            this.wagesWeeklyDayDetailData.projectSiteVersion=this.paramInfo?.projectSiteVersion;
            this.wagesWeeklyDayDetailData.toDoActivityCategoryType=categoryTypeEnum.INDIVIDUAL_COMPLAINT_WAGES_WEEKLY;
            this.wagesWeeklyDayDetailData.applicationType = this.paramInfo.applicationType;
            this.wagesWeeklyDayDetailData.rootActivityRefId = ''
            console.log('wagesWeeklyDayDetailData', this.wagesWeeklyDayDetailData)
            this.appHttpRequestHandlerService.httpPost(this.wagesWeeklyDayDetailData,'pbsamadhannetcoreapi.Models.Complaint_Wages_WkDay','Crud','CreateUpdate').pipe(takeUntil(this.ngUnsubscribe)).subscribe({
             next: () => {
              this.wagesWeeklyDayDetailData.periodAmtDetails.forEach(data => {
              data.appRefId = this.paramInfo?.appRefId;
              data.applicationPurposeType=this.paramInfo?.applicationPurposeType;
              data.projectSiteVersion=this.paramInfo?.projectSiteVersion;
              data.toDoActivityCategoryType=categoryTypeEnum.INDIVIDUAL_COMPLAINT_WAGES_WEEKLY_PERIOD_AMOUNT;
              data.applicationType = this.paramInfo.applicationType
              this.appHttpRequestHandlerService.httpPost(data,'pbsamadhannetcoreapi.Models.Complaint_Wages_WkDay_PeriodAmt','Crud','CreateUpdate').pipe(takeUntil(this.ngUnsubscribe)).subscribe({
              next: () => {

                // FOR WORKING OVERTIME
                this.wagesWorkingOverTimeDetailData.appRefId = this.paramInfo?.appRefId;
                this.wagesWorkingOverTimeDetailData.applicationPurposeType=this.paramInfo?.applicationPurposeType;
                this.wagesWorkingOverTimeDetailData.projectSiteVersion=this.paramInfo?.projectSiteVersion;
                this.wagesWorkingOverTimeDetailData.toDoActivityCategoryType=categoryTypeEnum.INDIVIDUAL_COMPLAINT_WORKING_OVERTIME;
                this.wagesWorkingOverTimeDetailData.applicationType = this.paramInfo.applicationType;
                this.wagesWorkingOverTimeDetailData.rootActivityRefId = ''
                this.appHttpRequestHandlerService.httpPost(this.wagesWorkingOverTimeDetailData,'pbsamadhannetcoreapi.Models.Complaint_Wages_OT','Crud','CreateUpdate').pipe(takeUntil(this.ngUnsubscribe)).subscribe({
                 next: () => {
                  this.wagesWorkingOverTimeDetailData.periodAmtDetails.forEach(data => {
                  data.appRefId = this.paramInfo?.appRefId;
                  data.applicationPurposeType=this.paramInfo?.applicationPurposeType;
                  data.projectSiteVersion=this.paramInfo?.projectSiteVersion;
                  data.toDoActivityCategoryType=categoryTypeEnum.INDIVIDUAL_COMPLAINT_WORKING_OVERTIME_PERIOD_AMOUNT;
                  data.applicationType = this.paramInfo.applicationType
                  this.appHttpRequestHandlerService.httpPost(data,'pbsamadhannetcoreapi.Models.Complaint_Wages_OT_PeriodAmt','Crud','CreateUpdate').pipe(takeUntil(this.ngUnsubscribe)).subscribe({
                  next: () => {

                    // FOR WAGES NOT PAID AT ALL
                    this.wagesNotPaidAtAllDetailData.appRefId = this.paramInfo?.appRefId;
                    this.wagesNotPaidAtAllDetailData.applicationPurposeType=this.paramInfo?.applicationPurposeType;
                    this.wagesNotPaidAtAllDetailData.projectSiteVersion=this.paramInfo?.projectSiteVersion;
                    this.wagesNotPaidAtAllDetailData.toDoActivityCategoryType=categoryTypeEnum.INDIVIDUAL_COMPLAINT_WAGES_NOT_PAID;
                    this.wagesNotPaidAtAllDetailData.applicationType = this.paramInfo.applicationType;
                    this.wagesNotPaidAtAllDetailData.rootActivityRefId = ''
                    this.appHttpRequestHandlerService.httpPost(this.wagesNotPaidAtAllDetailData,'pbsamadhannetcoreapi.Models.Complaint_Wages_Not_Paid','Crud','CreateUpdate').pipe(takeUntil(this.ngUnsubscribe)).subscribe({
                     next: () => {
                      this.wagesNotPaidAtAllDetailData.periodAmtDetails.forEach(data => {
                      data.appRefId = this.paramInfo?.appRefId;
                      data.applicationPurposeType=this.paramInfo?.applicationPurposeType;
                      data.projectSiteVersion=this.paramInfo?.projectSiteVersion;
                      data.toDoActivityCategoryType=categoryTypeEnum.INDIVIDUAL_COMPLAINT_WAGES_NOT_PAID_PERIOD_AMOUNT;
                      data.applicationType = this.paramInfo.applicationType
this.appHttpRequestHandlerService.httpPost(data,'pbsamadhannetcoreapi.Models.Complaint_Wages_Not_Paid_PeriodAmt','Crud','CreateUpdate').pipe(takeUntil(this.ngUnsubscribe)).subscribe({
                      next: () => {

                        // FOR UNAUTHORISED DEDUCTION OF WAGES
                        this.wagesUnauthDedDetailData.appRefId = this.paramInfo?.appRefId;
                        this.wagesUnauthDedDetailData.applicationPurposeType=this.paramInfo?.applicationPurposeType;
                        this.wagesUnauthDedDetailData.projectSiteVersion=this.paramInfo?.projectSiteVersion;
                        this.wagesUnauthDedDetailData.toDoActivityCategoryType=categoryTypeEnum.INDIVIDUAL_COMPLAINT_WAGES_UNAUTHDED;
                        this.wagesUnauthDedDetailData.applicationType = this.paramInfo.applicationType;
                        this.wagesUnauthDedDetailData.rootActivityRefId = ''
                        console.log('wagesUnauthDedDetailData', this.wagesUnauthDedDetailData)
                        this.appHttpRequestHandlerService.httpPost(this.wagesUnauthDedDetailData,'pbsamadhannetcoreapi.Models.Complaint_Wages_Unauth_Deduct','Crud','CreateUpdate').pipe(takeUntil(this.ngUnsubscribe)).subscribe({
                         next: () => {
                          this.wagesUnauthDedDetailData.periodAmtDetails.forEach(data => {
                          data.appRefId = this.paramInfo?.appRefId;
                          data.applicationPurposeType=this.paramInfo?.applicationPurposeType;
                          data.projectSiteVersion=this.paramInfo?.projectSiteVersion;
                          data.toDoActivityCategoryType=categoryTypeEnum.INDIVIDUAL_COMPLAINT_WAGES_UNAUTHDED_PERIOD_AMOUNT;
                          data.applicationType = this.paramInfo.applicationType
this.appHttpRequestHandlerService.httpPost(data,'pbsamadhannetcoreapi.Models.Complaint_Wages_Unauth_Deduct_PeriodAmt','Crud','CreateUpdate').pipe(takeUntil(this.ngUnsubscribe)).subscribe({
                          next: () => {

                            // FOR NON PAYMENT OF BONUS
                            this.nonPayBonusDetailData.appRefId = this.paramInfo?.appRefId;
                            this.nonPayBonusDetailData.applicationPurposeType=this.paramInfo?.applicationPurposeType;
                            this.nonPayBonusDetailData.projectSiteVersion=this.paramInfo?.projectSiteVersion;
                            this.nonPayBonusDetailData.toDoActivityCategoryType=categoryTypeEnum.INDIVIDUAL_COMPLAINT_NON_PAY_BONUS;
                            this.nonPayBonusDetailData.applicationType = this.paramInfo.applicationType;
                            this.nonPayBonusDetailData.rootActivityRefId = ''
                            console.log('wagesUnauthDedDetailData', this.wagesUnauthDedDetailData)
                            this.appHttpRequestHandlerService.httpPost(this.nonPayBonusDetailData,'pbsamadhannetcoreapi.Models.Complaint_Non_Pay_Bonus','Crud','CreateUpdate').pipe(takeUntil(this.ngUnsubscribe)).subscribe({
                             next: () => {
                              this.nonPayBonusDetailData.periodAmtDetails.forEach(data => {
                              data.appRefId = this.paramInfo?.appRefId;
                              data.applicationPurposeType=this.paramInfo?.applicationPurposeType;
                              data.projectSiteVersion=this.paramInfo?.projectSiteVersion;
                              data.toDoActivityCategoryType=categoryTypeEnum.INDIVIDUAL_COMPLAINT_NON_PAY_BONUS_PERIOD_AMOUNT;
                              data.applicationType = this.paramInfo.applicationType
                              data.rootActivityRefId = ''
this.appHttpRequestHandlerService.httpPost(data,'pbsamadhannetcoreapi.Models.Complaint_Non_Pay_Bonus_PeriodAmt','Crud','CreateUpdate').pipe(takeUntil(this.ngUnsubscribe)).subscribe({
                              next: () => {
                                      this.navigateToNextStep(data);

                              }})
                              })
                             }})

                          }})
                          })
                         }})

                      }})
                      })
                     }})

                  }})
                  })
                 }})

              }})
              })
             }})

           }})
          }})
        })

      }
    });

}

  navigateToNextStep(regFormRspData : ICRUD_CreateUpdateOperationResponse){
    this.router.navigate([this.appFormStepsList.find(x=>x.stepCode=='CCOW').uiNextPageComponentPath],{queryParams: { info: this.commonOpsService.encodeQueryParamsInBase64( 
      { 
        identityKey: regFormRspData.entityKeyId,
        appRefId: this.paramInfo.appRefId,
        applicationType: 100001,
        applicationPurposeType: 0,
        projectSiteVersion: 1,
      })
    }});
  }


  claimUnderCodeOnWagesDataEventListener(data:IComplaint_Claim_CodeOnWage){
  console.log('daa')
  this.codeOnWagesDetailData = data
  }

  minimumWagesDataDataEventListener(data: any){
    console.log('minimun wages deail data', this.minimumWagesDetailData)
    this.minimumWagesDetailData = data
  }

  wagesWeeklyDayEventListener(data: IComplaint_Wages){
    this.wagesWeeklyDayDetailData = data
  }
  wagesWorkingOvertimeEventListener(data: IComplaint_Wages){
    this.wagesWorkingOverTimeDetailData = data
  }
  
  wagesNotPaidAtAllEventListener(data: IComplaint_Wages){
    this.wagesNotPaidAtAllDetailData = data
  }

  wagesUnauthDedEventListener(data: IComplaint_Wages){
    console.log('data', data)
    this.wagesUnauthDedDetailData = data
  }

  nonPayBonusEventListener(data){
this.nonPayBonusDetailData = data
  }


  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
