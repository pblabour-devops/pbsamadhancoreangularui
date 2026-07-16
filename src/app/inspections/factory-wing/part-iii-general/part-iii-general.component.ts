import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Inspection_Form_Factory_Part_III_General } from '../../Inspections-typed-models';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { Subject } from 'rxjs';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { CommonService } from 'src/app/common/common.service';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-part-iii-general',
    templateUrl: './part-iii-general.component.html',
    styleUrls: ['./part-iii-general.component.css'],
    standalone: false
})
export class PartIiiGeneralComponent implements OnInit {
  @Input() jsonData: any;
  Input_Form: TForm<Inspection_Form_Factory_Part_III_General>;
  private ngUnsubscribe = new Subject<void>();
  genericFormData: GenericFormModel<Inspection_Form_Factory_Part_III_General>;
  submitted: boolean = false;
  hasSubmitClicked: boolean = false;
  router: any;
  defaultValue:"N/A";
  public parmamEncodedinfo:string;
  public paramInfo:any;
  public hasViolationFound : string;
  
  constructor(
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    public commonOpsService: CommonOpsService,
    public common: CommonService,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute
  ) {
    this.Input_Form = this.fb.group({
      id : [0,Validators.required],
      sec_51_WeeklyHours_9HoursInADay_Selection: ['-1'],
      sec_51_WeeklyHours_9HoursInADay_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_51_WeeklyHours_9HoursInADay_ViolationExist : [0,[Validators.required]],
      sec_52_WeeklyHoliday_FirstDayOfWeek_Selection: ['-1'],
      sec_52_WeeklyHoliday_FirstDayOfWeek_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_52_WeeklyHoliday_FirstDayOfWeek_ViolationExist : [0,[Validators.required]],
      sec_52_WeeklyHoliday_FactoryManager_Selection: ['-1'],
      sec_52_WeeklyHoliday_FactoryManager_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_52_WeeklyHoliday_FactoryManager_ViolationExist : [0,[Validators.required]],
      sec_53_CompensatoryHoliday_RegisterMaintained_Selection: ['-1'],
      sec_53_CompensatoryHoliday_RegisterMaintained_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_53_CompensatoryHoliday_RegisterMaintained_ViolationExist : [0,[Validators.required]],
      sec_54_DailyHours_Sec54_Selection: ['-1'],
      sec_54_DailyHours_Sec54_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_54_DailyHours_Sec54_ViolationExist : [0,[Validators.required]],
      sec_55_IntervalOfRest_Sec55_Selection: ['-1'],
      sec_55_IntervalOfRest_Sec55_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_55_IntervalOfRest_Sec55_ViolationExist : [0,[Validators.required]],
      sec_56_SpreadOver_Sec56_Selection: ['-1'],
      sec_56_SpreadOver_Sec56_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_56_SpreadOver_Sec56_ViolationExist : [0,[Validators.required]],
      sec_57_NightShifts_Sec57_Selection: ['-1'],
      sec_57_NightShifts_Sec57_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_57_NightShifts_Sec57_ViolationExist : [0,[Validators.required]],
      sec_58_OverlappingShifts_Sec58_Selection: ['-1'],
      sec_58_OverlappingShifts_Sec58_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_58_OverlappingShifts_Sec58_ViolationExist : [0,[Validators.required]],
      sec_59_ExtraWages_Sec85_Selection: ['-1'],
      sec_59_ExtraWages_Sec85_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_59_ExtraWages_Sec85_ViolationExist : [0,[Validators.required]],
      sec_59_ExtraWages_Sec59_Selection: ['-1'],
      sec_59_ExtraWages_Sec59_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_59_ExtraWages_Sec59_ViolationExist : [0,[Validators.required]],
      sec_60_DoubleEmployment_Sec60_Selection: ['-1'],
      sec_60_DoubleEmployment_Sec60_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_60_DoubleEmployment_Sec60_ViolationExist : [0,[Validators.required]],
      sec_61_NoticeOfPeriod_Displayed_Selection: ['-1'],
      sec_61_NoticeOfPeriod_Displayed_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_61_NoticeOfPeriod_Displayed_ViolationExist : [0,[Validators.required]],
      sec_61_NoticeOfPeriod_RegiterOfAudit_Selection: ['-1'],
      sec_61_NoticeOfPeriod_RegiterOfAudit_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_61_NoticeOfPeriod_RegiterOfAudit_ViolationExist : [0,[Validators.required]],
      sec_66_WomenInNightShift_Employed_Selection: ['-1'],
      sec_66_WomenInNightShift_Employed_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_66_WomenInNightShift_Employed_ViolationExist : [0,[Validators.required]],
      sec_66_WomenInNightShift_Approval_Selection: ['-1'],
      sec_66_WomenInNightShift_Approval_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_66_WomenInNightShift_Approval_ViolationExist : [0,[Validators.required]],
      youngPerson_NonAuditWorkers_Selection: ['-1'],
      youngPerson_NonAuditWorkers_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      youngPerson_NonAuditWorkers_ViolationExist : [0,[Validators.required]],
      youngPerson_CertificateOfFitness_Selection: ['-1'],
      youngPerson_CertificateOfFitness_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      youngPerson_CertificateOfFitness_ViolationExist : [0,[Validators.required]],
      youngPerson_Sec71Rule92_Selection: ['-1'],
      youngPerson_Sec71Rule92_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      youngPerson_Sec71Rule92_ViolationExist : [0,[Validators.required]],
      youngPerson_Rule93_Selection: ['-1'],
      youngPerson_Rule93_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      youngPerson_Rule93_ViolationExist : [0,[Validators.required]],
      youngPerson_CLAAct1986_Selection: ['-1'],
      youngPerson_CLAAct1986_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      youngPerson_CLAAct1986_ViolationExist : [0,[Validators.required]],
      sec_79_LeaveAndWages_RegisterMaintained_Selection: ['-1'],
      sec_79_LeaveAndWages_RegisterMaintained_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_79_LeaveAndWages_RegisterMaintained_ViolationExist : [0,[Validators.required]],
      sec_79_LeaveAndWages_LeaveBooks_Selection: ['-1'],
      sec_79_LeaveAndWages_LeaveBooks_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_79_LeaveAndWages_LeaveBooks_ViolationExist : [0,[Validators.required]],
      sec_79_LeaveAndWages_FormD_Selection: ['-1'],
      sec_79_LeaveAndWages_FormD_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_79_LeaveAndWages_FormD_ViolationExist : [0,[Validators.required]],
      sec_79_LeaveAndWages_AnyOtherReport_Selection: ['-1'],
      sec_79_LeaveAndWages_AnyOtherReport_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_79_LeaveAndWages_AnyOtherReport_ViolationExist : [0,[Validators.required]],
      sec_88_89_AccidentNotice_RegisterMaintained_Selection: ['-1'],
      sec_88_89_AccidentNotice_RegisterMaintained_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_88_89_AccidentNotice_RegisterMaintained_ViolationExist : [0,[Validators.required]],
      sec_88_89_AccidentNotice_PrescribedTime_Selection: ['-1'],
      sec_88_89_AccidentNotice_PrescribedTime_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_88_89_AccidentNotice_PrescribedTime_ViolationExist : [0,[Validators.required]],
      sec_88_89_AccidentNotice_Rule104_Selection: ['-1'],
      sec_88_89_AccidentNotice_Rule104_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_88_89_AccidentNotice_Rule104_ViolationExist : [0,[Validators.required]],
      rule104A_PermissibleLevels_Rule104A_Selection: ['-1'],
      rule104A_PermissibleLevels_Rule104A_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      rule104A_PermissibleLevels_Rule104A_ViolationExist : [0,[Validators.required]],
      sec_108_Notices_FactoryActRules_Selection: ['-1'],
      sec_108_Notices_FactoryActRules_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_108_Notices_FactoryActRules_ViolationExist : [0,[Validators.required]],
      sec_108_Notices_Surgeon_Selection: ['-1'],
      sec_108_Notices_Surgeon_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_108_Notices_Surgeon_ViolationExist : [0,[Validators.required]],
      sec_110_Returns_LastYearSubmitted_Selection: ['-1'],
      sec_110_Returns_LastYearSubmitted_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_110_Returns_LastYearSubmitted_ViolationExist : [0,[Validators.required]],
      inspectionRefId: ['',Validators.required]

    }, {}) as TForm<Inspection_Form_Factory_Part_III_General>;
  }
  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.hasViolationFound = 'Any Violation Found?'
    this.route.queryParams
    .subscribe(params => {
      this.parmamEncodedinfo=params.info;
      this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info)=>{
      this.paramInfo = info;
      this.appHttpRequestHandlerService.httpGet({ id: this.paramInfo.inspectionRefId}, "Inspection", "getForm_Factory_Part_III_General").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericFormModel<Inspection_Form_Factory_Part_III_General>) => {
        this.Input_Form.patchValue(data.formModel)

        if(this.paramInfo.isLocked == 1)
          {
            this.Input_Form.disable();
          }
        });
      });
    });
  }

  saveAndNext(e){
    this.submitted = true;
    this.hasSubmitClicked = true;
    this.Input_Form.controls.inspectionRefId.patchValue(this.paramInfo.inspectionRefId);
    if (this.Input_Form.valid) {
      this.appHttpRequestHandlerService.httpPost(this.Input_Form.value, "pbsamadhannetcoreapi.Models.Inspection_Form_Factory_Part_III_General", "Inspection", "addUpdateForm_Factory_Part_III_General")
        .subscribe((data: GenericServiceResultTemplate) => {
          // this.inspectionsPerformaStepersComponent.moveToNextStep();
        });
    }
  }

  fillDefaultValueInRemarks(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (!inputElement.value || inputElement.value.trim() === '' || inputElement.value === '-') {
      inputElement.value = 'N/A';
      this.Input_Form.get(inputElement.getAttribute('formControlName')!)?.patchValue('N/A');
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
