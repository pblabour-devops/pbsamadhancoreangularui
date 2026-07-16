import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { Inspection_Form_Factory_Part_III_MajorAccidentHazard } from '../../Inspections-typed-models';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { CommonService } from 'src/app/common/common.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-part-iii-major-accident',
    templateUrl: './part-iii-major-accident.component.html',
    styleUrls: ['./part-iii-major-accident.component.css'],
    standalone: false
})
export class PartIiiMajorAccidentComponent implements OnInit {
  @Input() jsonData: any;
  Input_Form: TForm<Inspection_Form_Factory_Part_III_MajorAccidentHazard>;
  private ngUnsubscribe = new Subject<void>();
  genericFormData: GenericFormModel<Inspection_Form_Factory_Part_III_MajorAccidentHazard>;
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
      isFactoryCoverdUnderAccident : [false,[Validators.required]],
      hazardousProcess: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      typesOfHazarousChemical: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      methodOfStorage: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      onSiteEmergencyPlansPrepared: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      onSiteEmergencyPlansApproved: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      healthAndSafetyPolicy: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      decontaminationFacility: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      msdsPrepared: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      hazopStudies_Selection: ['-1'],
      agencyConductedStudies_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      frequencyConductedStudies_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      dateOfLastStudyConducted_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      reportSubmittedAuthorities_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      internalExternalTrainingProg: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      onSiteEmergencyMockDrills: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      integritySoundless_Selection: ['-1'],
      integritySoundless_AgencyConductedStudies_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      integritySoundless_FrequencyConductedStudies_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      integritySoundless_DateOfLastStudyConducted_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      integritySoundless_CriticalFindingsNoticed_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      majorAccidentsInLast3Years: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      ohcProvided_Selection: ['-1'],
      ohcArea: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      ohC_DateOfOfficerAppointed: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      ohC_OfficerQualification: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      ohC_ParaMedicalStaffAppointed: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      ohC_AmbulanceVanProvided: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      workingInHazardousProcess_Selection: ['-1'],
      workingInHazardousProcess_NameAddressOfficer: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      workingInHazardousProcess_NoOfWorkersExamined: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      workingInHazardousProcess_NatureOfOccDisease: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      workingInHazardousProcess_AnyNoticeableDiseased: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      databaseOnHealthRecordDeveloped: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      publicAwarenessProgConducted: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      safetyPamphletsPrinted: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      prsonsWithSuitableSupervisors: ['N/A', [Validators.required, Validators.maxLength(1000)]],
      inspectionRefId: ['', Validators.required],
      hazardousProcess_ViolationExist: ['0', Validators.required],
      typesOfHazarousChemical_ViolationExist: ['0', Validators.required],
      methodOfStorage_ViolationExist: ['0', Validators.required],
      onSiteEmergencyPlansPrepared_ViolationExist:['0', Validators.required],
      onSiteEmergencyPlansApproved_ViolationExist: ['0', Validators.required],
      healthAndSafetyPolicy_ViolationExist: ['0', Validators.required],
      decontaminationFacility_ViolationExist: ['0', Validators.required],
      msdsPrepared_ViolationExist:['0', Validators.required],
      hazopStudies_Selection_ViolationExist: ['0', Validators.required],
      agencyConductedStudies_ViolationExist: ['0', Validators.required],
      frequencyConductedStudies_ViolationExist: ['0', Validators.required],
      dateOfLastStudyConducted_ViolationExist: ['0', Validators.required],
      reportSubmittedAuthorities_ViolationExist: ['0', Validators.required],
      internalExternalTrainingProg_ViolationExist: ['0', Validators.required],
      onSiteEmergencyMockDrills_ViolationExist: ['0', Validators.required],
      integritySoundless_ViolationExist: ['0', Validators.required],
      integritySoundless_AgencyConductedStudies_ViolationExist:['0', Validators.required],
      integritySoundless_FrequencyConductedStudies_ViolationExist: ['0', Validators.required],
      integritySoundless_DateOfLastStudyConducted_ViolationExist:['0', Validators.required],
      integritySoundless_CriticalFindingsNoticed_ViolationExist: ['0', Validators.required],
      majorAccidentsInLast3Years_ViolationExist: ['0', Validators.required],
      ohcProvided_ViolationExist: [0, Validators.required],
      ohcArea_ViolationExist: ['0', Validators.required],
      ohC_DateOfOfficerAppointed_ViolationExist: ['0', Validators.required],
      ohC_OfficerQualification_ViolationExist:['0', Validators.required],
      ohC_ParaMedicalStaffAppointed_ViolationExist:['0', Validators.required],
      ohC_AmbulanceVanProvided_ViolationExist: ['0', Validators.required],
      workingInHazardousProcess_ViolationExist:['0', Validators.required],
      workingInHazardousProcess_NameAddressOfficer_ViolationExist: ['0', Validators.required],
      workingInHazardousProcess_NoOfWorkersExamined_ViolationExist: ['0', Validators.required],
      workingInHazardousProcess_NatureOfOccDisease_ViolationExist:['0', Validators.required],
      workingInHazardousProcess_AnyNoticeableDiseased_ViolationExist: ['0', Validators.required],
      databaseOnHealthRecordDeveloped_ViolationExist: ['0', Validators.required],
      publicAwarenessProgConducted_ViolationExist: ['0', Validators.required],
      safetyPamphletsPrinted_ViolationExist: ['0', Validators.required],
      prsonsWithSuitableSupervisors_ViolationExist:['0', Validators.required]


    }) as TForm<Inspection_Form_Factory_Part_III_MajorAccidentHazard>;
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
      this.appHttpRequestHandlerService.httpGet({ id: this.paramInfo.inspectionRefId}, "Inspection", "getForm_Factory_Part_III_MajorAccidentHazard").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericFormModel<Inspection_Form_Factory_Part_III_MajorAccidentHazard>) => {
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
    this.Input_Form.controls.inspectionRefId.patchValue( this.paramInfo.inspectionRefId);
    if (this.Input_Form.valid) {
      this.appHttpRequestHandlerService.httpPost(this.Input_Form.value, "pbsamadhannetcoreapi.Models.Inspection_Form_Factory_Part_III_MajorAccidentHazard", "Inspection", "addUpdateForm_Factory_Part_III_MajorAccidentHazard")
        .subscribe((data: GenericServiceResultTemplate) => {
          // this.inspectionsPerformaStepersComponent.moveToNextStep();
        });
    }
  }

  fillDefaultValueInTextBox(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (!inputElement.value || inputElement.value.trim() === '' || inputElement.value === '-') {
      inputElement.value = 'N/A';
      this.Input_Form.get(inputElement.getAttribute('formControlName')!)?.patchValue('N/A');
    }
  }
}
