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
  minimumWagesDetailData : IComplaint_MinimumWagesNotPaid
  wagesWeeklyDayDetailData : IComplaint_Wages
  wagesWorkingOverTimeDetailData : IComplaint_Wages
  wagesNotPaidAtAllDetailData : IComplaint_Wages
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

  wagesWeeklyPeriodAmtApiData : GenericFormModel<IComplaint_Wages_PeriodAmt>
  wagesOverTimeApiData : GenericFormModel<IComplaint_Wages>
  wagesOverTimePeriodAmtApiData : GenericFormModel<IComplaint_Wages_PeriodAmt>
  wagesNotPaidAtAllPeriodAmtApiData : GenericFormModel<IComplaint_Wages_PeriodAmt>
  wageUnauthDedPeriodAmtApiData : GenericFormModel<IComplaint_Wages_PeriodAmt>
  nonPayBonusPeriodAmtApiData

  constructor(  
    private fb: UntypedFormBuilder,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private route: ActivatedRoute,
    public commonOpsService: CommonOpsService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.route.queryParams.subscribe((params) => {
      this.parmamEncodedinfo = params.info;
      this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info) => {
        this.paramInfo = info;
        console.log('info', this.paramInfo)
        this.getClaimUnderCodeOnWagesData();
        this.getMinimumWagesData();
        this.getMinumWagesPeriodData();
        this.getWeeklyDayWagesData();
        this.getWeeklyDayWagesPeriodData();
        this.getNotPaidAtAllWagesData();
        this.getOverTimeWagesPeriodAmtData();
        this.getUnAuthorisedDedWagesData();
        this.getUnAuthorisedDedWagesPeriodAmtData()
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
    .httpGet({ id: this.paramInfo?.appRefId }, 'Complaints', 'getWagesNotPaidWeekDayDetail')
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: GenericFormModel<IComplaint_Wages_PeriodAmt>) => {
      this.wagesWeeklyPeriodAmtApiData = data;
    })
  }


  getOverTimeWagesData(){
    this.appHttpRequestHandlerService
    .httpGet({ id: this.paramInfo?.appRefId }, 'Complaints', 'getWagesNotPaidWeekDayDetail')
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: GenericFormModel<IComplaint_Wages>) => {
      this.wagesOverTimeApiData = data;
    })
  }


   getOverTimeWagesPeriodAmtData(){
    this.appHttpRequestHandlerService
    .httpGet({ id: this.paramInfo?.appRefId }, 'Complaints', 'getWagesNotPaidWeekDayDetail')
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: GenericFormModel<IComplaint_Wages_PeriodAmt>) => {
      this.wagesOverTimePeriodAmtApiData = data;
    })
  }

  getNotPaidAtAllWagesData(){
    this.appHttpRequestHandlerService
    .httpGet({ id: this.paramInfo?.appRefId }, 'Complaints', 'getWagesNotPaidWeekDayDetail')
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: GenericFormModel<IComplaint_Wages>) => {
      this.wagesNotPaidAtAllApiData = data;
    })
  }


  getNotPaidAtAllWagesPeriodAmtData(){
    this.appHttpRequestHandlerService
    .httpGet({ id: this.paramInfo?.appRefId }, 'Complaints', 'getWagesNotPaidWeekDayDetail')
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: GenericFormModel<IComplaint_Wages_PeriodAmt>) => {
      this.wagesNotPaidAtAllPeriodAmtApiData = data;
    })
  }

  getUnAuthorisedDedWagesData(){
    this.appHttpRequestHandlerService
    .httpGet({ id: this.paramInfo?.appRefId }, 'Complaints', 'getWagesNotPaidWeekDayDetail')
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: GenericFormModel<IComplaint_Wages>) => {
      this.wageUnauthDedApiData = data;
    })
  }


  getUnAuthorisedDedWagesPeriodAmtData(){
    this.appHttpRequestHandlerService
    .httpGet({ id: this.paramInfo?.appRefId }, 'Complaints', 'getWagesNotPaidWeekDayDetail')
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: GenericFormModel<IComplaint_Wages_PeriodAmt>) => {
      this.wageUnauthDedPeriodAmtApiData = data;
    })
  }

   getNonPayBonusData(){
    this.appHttpRequestHandlerService
    .httpGet({ id: this.paramInfo?.appRefId }, 'Complaints', 'getWagesNotPaidWeekDayDetail')
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data) => {
      this.nonPayBonusApiData = data;
    })
  }


  getNonPayBonusPeriodAmtData(){
    this.appHttpRequestHandlerService
    .httpGet({ id: this.paramInfo?.appRefId }, 'Complaints', 'getWagesNotPaidWeekDayDetail')
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data) => {
      this.nonPayBonusPeriodAmtApiData = data;
    })
  }


  onSaveDraft(): void {
  }

  onBack(): void {
    console.log('Navigate back to previous tab');
  }

  onSubmit(): void {
  //  if(!this.claimCodeOnWagesComponent?.isFormValid()){
  //   Swal.fire({ icon: 'warning', text: 'Please fill Claim Under code on wages completely.' });
  //   return;
  //  }
  //  if(!this.MinimumWagesNotPaidComponent?.isFormValid()){
  //   Swal.fire({ icon: 'warning', text: 'Please fill Minimum Wages completely.' });
  //   return;
  //  }
    if(!this.WagesWeeklydayComponent?.isFormValid()){
    Swal.fire({ icon: 'warning', text: 'Please fill Wages Weekly completely.' });
    return;
   }

   // FOR CLAIM UNDER CODE ON WAGES
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


    // FOR MINIMUM WAGES

      // this.minimumWagesDetailData.Complaint_MinimumWagesNotPaidDetails.forEach(data => {
      //   data.appRefId = this.paramInfo?.appRefId;
      //   data.applicationPurposeType=this.paramInfo?.applicationPurposeType;
      //   data.projectSiteVersion=this.paramInfo?.projectSiteVersion;
      //   // data.toDoActivityModeType=1;
      //   data.rootActivityRefId='default value';
      //   data.toDoActivityCategoryType=2007;
      //   data.applicationType = this.paramInfo.app
      //   console.log('data', data)
      //   this.appHttpRequestHandlerService.httpPost(data,'pbsamadhannetcoreapi.Models.Complaint_MinimumWagesPeriodAmt','Crud','CreateUpdate').pipe(takeUntil(this.ngUnsubscribe)).subscribe({
      //   next: () => {
      //   this.minimumWagesDetailData.appRefId = this.paramInfo?.appRefId;
      //   this.minimumWagesDetailData.applicationPurposeType=this.paramInfo?.applicationPurposeType;
      //   this.minimumWagesDetailData.projectSiteVersion=this.paramInfo?.projectSiteVersion;
      //   this.minimumWagesDetailData.rootActivityRefId='default value';
      //   this.minimumWagesDetailData.toDoActivityCategoryType=2008;
      //   this.minimumWagesDetailData.applicationType = this.paramInfo.applicationType;
      //   console.log('minimumWagesDetailData', this.minimumWagesDetailData)
      //   this.appHttpRequestHandlerService.httpPost(this.minimumWagesDetailData,'pbsamadhannetcoreapi.Models.Complaint_MinimumWage','Crud','CreateUpdate').pipe(takeUntil(this.ngUnsubscribe)).subscribe({
      //    next: () => {
          
      //    }})

      //   }})

      // })

      // FOR WEEKLY DAT OF REST 
       this.wagesWeeklyDayDetailData.wagesWeeklyPeriodAmtDetails.forEach(data => {
        data.appRefId = this.paramInfo?.appRefId;
        data.applicationPurposeType=this.paramInfo?.applicationPurposeType;
        data.projectSiteVersion=this.paramInfo?.projectSiteVersion;
        // data.toDoActivityModeType=1;
        data.toDoActivityCategoryType=categoryTypeEnum.INDIVIDUAL_COMPLAINT_WAGES_WEEKLY_PERIOD_AMOUNT;
        data.applicationType = this.paramInfo.applicationType
        this.appHttpRequestHandlerService.httpPost(data,'pbsamadhannetcoreapi.Models.Complaint_Wages_WkDay_PeriodAmt','Crud','CreateUpdate').pipe(takeUntil(this.ngUnsubscribe)).subscribe({
        next: () => {
        this.wagesWeeklyDayDetailData.appRefId = this.paramInfo?.appRefId;
        this.wagesWeeklyDayDetailData.applicationPurposeType=this.paramInfo?.applicationPurposeType;
        this.wagesWeeklyDayDetailData.projectSiteVersion=this.paramInfo?.projectSiteVersion;
        this.wagesWeeklyDayDetailData.toDoActivityCategoryType=categoryTypeEnum.INDIVIDUAL_COMPLAINT_WAGES_WEEKLY;
        this.wagesWeeklyDayDetailData.applicationType = this.paramInfo.applicationType;
        console.log('wagesWeeklyDayDetailData', this.wagesWeeklyDayDetailData)
        this.appHttpRequestHandlerService.httpPost(this.wagesWeeklyDayDetailData,'pbsamadhannetcoreapi.Models.Complaint_Wages_WkDay','Crud','CreateUpdate').pipe(takeUntil(this.ngUnsubscribe)).subscribe({
         next: () => {
          
         }})

        }})

      })

       
      
        
         
  //       }
  //     });

  }

  claimUnderCodeOnWagesDataEventListener(data:IComplaint_Claim_CodeOnWage){
  console.log('data', data)
  this.codeOnWagesDetailData = data
  }

  minimumWagesDataDataEventListener(data: IComplaint_MinimumWagesNotPaid){
    console.log('data',data)
    this.minimumWagesDetailData = data
  }

  wagesWeeklyDayEventListener(data: IComplaint_Wages){
    console.log('data',data)
    this.wagesWeeklyDayDetailData = data
  }
  wagesWorkingOvertimeEventListener(data: IComplaint_Wages){
    console.log('data',data)
    this.wagesWorkingOverTimeDetailData = data
  }
  
  wagesNotPaidAtAllEventListener(data: IComplaint_Wages){
    this.wagesNotPaidAtAllDetailData = data
  }

  wagesUnauthDedEventListener(data: IComplaint_Wages){
    this.wagesNotPaidAtAllDetailData = data
  }

  nonPayBonusEventListener(data){
    this.nonPayBonusDetailData = data
  }


  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
