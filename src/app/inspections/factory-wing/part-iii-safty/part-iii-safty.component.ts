import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Inspection_Form_Factory_Part_III_Safety } from '../../Inspections-typed-models';
import { UntypedFormBuilder, FormControl, Validators } from '@angular/forms';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { Subject } from 'rxjs';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { CommonService } from 'src/app/common/common.service';
import { GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
// 
@Component({
    selector: 'app-part-iii-safty',
    templateUrl: './part-iii-safty.component.html',
    styleUrls: ['./part-iii-safty.component.css'],
    standalone: false
})
export class PartIiiSaftyComponent implements OnInit {
  Input_Form: TForm<Inspection_Form_Factory_Part_III_Safety>;
  private ngUnsubscribe = new Subject<void>();
  genericFormData: GenericFormModel<Inspection_Form_Factory_Part_III_Safety>;
  submitted: boolean = false;
  hasSubmitClicked: boolean = false;
  defaultValue:"N/A";
  characterCounts: { [key: string]: number } = {};
  controlMaxLengthNames: { [key: string]: number } = {};
  public parmamEncodedinfo:string;
  public paramInfo:any;
  public hasViolationFound: string;
  // 
  constructor(
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    public commonOpsService: CommonOpsService,
    public common: CommonService,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute
  ) {
    this.Input_Form = this.fb.group({
      id : [0,Validators.required],
      sec_21_FancingOfMachinery_Rule55_Selection: ['-1'],
      sec_21_FancingOfMachinery_Rule55_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_21_FancingOfMachinery_Rule55_ViolationExist : [0,[Validators.required]],
      sec_21_FancingOfMachinery_Guarding_Selection: ['-1'],
      sec_21_FancingOfMachinery_Guarding_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_21_FancingOfMachinery_Guarding_ViolationExist : [0,[Validators.required]],
      sec_21_FancingOfMachinery_OtherSpecificReport_Selection: ['-1'],
      sec_21_FancingOfMachinery_OtherSpecificReport_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_21_FancingOfMachinery_OtherSpecificReport_ViolationExist : [0,[Validators.required]],
      sec_22_MachineryInMotion_Form7_A_Selection: ['-1'],
      sec_22_MachineryInMotion_Form7_A_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_22_MachineryInMotion_Form7_A_ViolationExist : [0,[Validators.required]],
      sec_28_HoistAndLifts_Examination_Selection: ['-1'],
      sec_28_HoistAndLifts_Examination_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_28_HoistAndLifts_Examination_ViolationExist : [0,[Validators.required]],
      sec_28_HoistAndLifts_SafeWorking_Selection: ['-1'],
      sec_28_HoistAndLifts_SafeWorking_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_28_HoistAndLifts_SafeWorking_ViolationExist : [0,[Validators.required]],
      sec_28_HoistAndLifts_Interlocking_Selection: ['-1'],
      sec_28_HoistAndLifts_Interlocking_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_28_HoistAndLifts_Interlocking_ViolationExist : [0,[Validators.required]],
      sec_28_HoistAndLifts_OtherSpecificReport_Selection: ['-1'],
      sec_28_HoistAndLifts_OtherSpecificReport_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_28_HoistAndLifts_OtherSpecificReport_ViolationExist : [0,[Validators.required]],
      sec_29_LiftingMachine_GoodConstruction_Selection: ['-1'],
      sec_29_LiftingMachine_GoodConstruction_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_29_LiftingMachine_GoodConstruction_ViolationExist : [0,[Validators.required]],
      sec_29_LiftingMachine_ProperlyMaintained_Selection: ['-1'],
      sec_29_LiftingMachine_ProperlyMaintained_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_29_LiftingMachine_ProperlyMaintained_ViolationExist : [0,[Validators.required]],
      sec_29_LiftingMachine_CompetentPerson_Selection: ['-1'],
      sec_29_LiftingMachine_CompetentPerson_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_29_LiftingMachine_CompetentPerson_ViolationExist : [0,[Validators.required]],
      sec_29_LiftingMachine_MaximumSafeWorking_Selection: ['-1'],
      sec_29_LiftingMachine_MaximumSafeWorking_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_29_LiftingMachine_MaximumSafeWorking_ViolationExist : [0,[Validators.required]],
      sec_29_LiftingMachine_Rule60A_3_Selection: ['-1'],
      sec_29_LiftingMachine_Rule60A_3_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_29_LiftingMachine_Rule60A_3_ViolationExist : [0,[Validators.required]],
      sec_29_LiftingMachine_SuitablePassages_Selection: ['-1'],
      sec_29_LiftingMachine_SuitablePassages_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_29_LiftingMachine_SuitablePassages_ViolationExist : [0,[Validators.required]],
      sec_30_RevolvingMachine_NoticesOfSafe_Selection: ['-1'],
      sec_30_RevolvingMachine_NoticesOfSafe_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_30_RevolvingMachine_NoticesOfSafe_ViolationExist : [0,[Validators.required]],
      sec_31_PressurePlant_GoodConstruction_Selection: ['-1'],
      sec_31_PressurePlant_GoodConstruction_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_31_PressurePlant_GoodConstruction_ViolationExist : [0,[Validators.required]],
      sec_31_PressurePlant_SafetyValve_Selection: ['-1'],
      sec_31_PressurePlant_SafetyValve_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_31_PressurePlant_SafetyValve_ViolationExist : [0,[Validators.required]],
      sec_31_PressurePlant_Gauge_Selection: ['-1'],
      sec_31_PressurePlant_Gauge_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_31_PressurePlant_Gauge_ViolationExist : [0,[Validators.required]],
      sec_31_PressurePlant_StopValve_Selection: ['-1'],
      sec_31_PressurePlant_StopValve_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_31_PressurePlant_StopValve_ViolationExist : [0,[Validators.required]],
      sec_31_PressurePlant_DrainCock_Selection: ['-1'],
      sec_31_PressurePlant_DrainCock_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_31_PressurePlant_DrainCock_ViolationExist : [0,[Validators.required]],
      sec_31_PressurePlant_CompetentPerson_Selection: ['-1'],
      sec_31_PressurePlant_CompetentPerson_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_31_PressurePlant_CompetentPerson_ViolationExist : [0,[Validators.required]],
      sec_31_PressurePlant_SpecificReport_Selection: ['-1'],
      sec_31_PressurePlant_SpecificReport_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_31_PressurePlant_SpecificReport_ViolationExist : [0,[Validators.required]],
      sec_32_FloorStairs_ProperlyMaintained_Selection: ['-1'],
      sec_32_FloorStairs_ProperlyMaintained_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_32_FloorStairs_ProperlyMaintained_ViolationExist : [0,[Validators.required]],
      sec_32_FloorStairs_HandrailsProvided_Selection: ['-1'],
      sec_32_FloorStairs_HandrailsProvided_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_32_FloorStairs_HandrailsProvided_ViolationExist : [0,[Validators.required]],
      sec_33_PitsSumps_SecurelyCovered_Selection: ['-1'],
      sec_33_PitsSumps_SecurelyCovered_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_33_PitsSumps_SecurelyCovered_ViolationExist : [0,[Validators.required]],
      sec_34_ExcessiveWeights_Rule62_Selection: ['-1'],
      sec_34_ExcessiveWeights_Rule62_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_34_ExcessiveWeights_Rule62_ViolationExist : [0,[Validators.required]],
      sec_35_ProtectionOfEyes_SuitableGoggles_Selection: ['-1'],
      sec_35_ProtectionOfEyes_SuitableGoggles_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_35_ProtectionOfEyes_SuitableGoggles_ViolationExist : [0,[Validators.required]],
      sec_36_PrecautionsDangerusFumes_Rule64_Selection: ['-1'],
      sec_36_PrecautionsDangerusFumes_Rule64_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_36_PrecautionsDangerusFumes_Rule64_ViolationExist : [0,[Validators.required]],
      sec_37_Explosive_ManufaturinProcess_Selection: ['-1'],
      sec_37_Explosive_ManufaturinProcess_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_37_Explosive_ManufaturinProcess_ViolationExist : [0,[Validators.required]],
      sec_38_PrecautionOfFire_Rule66_3_Selection: ['-1'],
      sec_38_PrecautionOfFire_Rule66_3_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_38_PrecautionOfFire_Rule66_3_ViolationExist : [0,[Validators.required]],
      sec_38_PrecautionOfFire_Rule66_4_Selection: ['-1'],
      sec_38_PrecautionOfFire_Rule66_4_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_38_PrecautionOfFire_Rule66_4_ViolationExist : [0,[Validators.required]],
      sec_38_PrecautionOfFire_Rule66_5_Selection: ['-1'],
      sec_38_PrecautionOfFire_Rule66_5_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_38_PrecautionOfFire_Rule66_5_ViolationExist : [0,[Validators.required]],
      sec_38_PrecautionOfFire_Rule66_6_Selection: ['-1'],
      sec_38_PrecautionOfFire_Rule66_6_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_38_PrecautionOfFire_Rule66_6_ViolationExist : [0,[Validators.required]],
      sec_38_PrecautionOfFire_Rule66_7_Selection: ['-1'],
      sec_38_PrecautionOfFire_Rule66_7_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_38_PrecautionOfFire_Rule66_7_ViolationExist : [0,[Validators.required]],
      sec_38_PrecautionOfFire_PreventiveMeasures_Selection: ['-1'],
      sec_38_PrecautionOfFire_PreventiveMeasures_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_38_PrecautionOfFire_PreventiveMeasures_ViolationExist : [0,[Validators.required]],
      sec_38_PrecautionOfFire_Rule66_9_Selection: ['-1'],
      sec_38_PrecautionOfFire_Rule66_9_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_38_PrecautionOfFire_Rule66_9_ViolationExist : [0,[Validators.required]],
      sec_38_PrecautionOfFire_Rule66_10_Selection: ['-1'],
      sec_38_PrecautionOfFire_Rule66_10_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_38_PrecautionOfFire_Rule66_10_ViolationExist : [0,[Validators.required]],
      sec_38_PrecautionOfFire_Rule66_11_Selection: ['-1'],
      sec_38_PrecautionOfFire_Rule66_11_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_38_PrecautionOfFire_Rule66_11_ViolationExist : [0,[Validators.required]],
      sec_38_PrecautionOfFire_FirstAid_Selection: ['-1'],
      sec_38_PrecautionOfFire_FirstAid_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_38_PrecautionOfFire_FirstAid_ViolationExist : [0,[Validators.required]],
      sec_38_PrecautionOfFire_PersonTrained_Selection: ['-1'],
      sec_38_PrecautionOfFire_PersonTrained_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_38_PrecautionOfFire_PersonTrained_ViolationExist : [0,[Validators.required]],
      sec_38_PrecautionOfFire_FightingDrill_Selection: ['-1'],
      sec_38_PrecautionOfFire_FightingDrill_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_38_PrecautionOfFire_FightingDrill_ViolationExist : [0,[Validators.required]],
      sec_40_SpecialReport_BuildingCauseRiskOfBodilyInjury_Selection: ['-1'],
      sec_40_SpecialReport_BuildingCauseRiskOfBodilyInjury_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_40_SpecialReport_BuildingCauseRiskOfBodilyInjury_ViolationExist : [0,[Validators.required]],
      sec_40_SpecialReport_PlantCauseRiskOfBodilyInjury_Selection: ['-1'],
      sec_40_SpecialReport_PlantCauseRiskOfBodilyInjury_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_40_SpecialReport_PlantCauseRiskOfBodilyInjury_ViolationExist : [0,[Validators.required]],
      sec_40_SpecialReport_ProcessCauseRiskOfBodilyInjury_Selection: ['-1'],
      sec_40_SpecialReport_ProcessCauseRiskOfBodilyInjury_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_40_SpecialReport_ProcessCauseRiskOfBodilyInjury_ViolationExist : [0,[Validators.required]],
      sec_40_SpecialReport_MaterialCauseRiskOfBodilyInjury_Selection: ['-1'],
      sec_40_SpecialReport_MaterialCauseRiskOfBodilyInjury_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_40_SpecialReport_MaterialCauseRiskOfBodilyInjury_ViolationExist : [0,[Validators.required]],
      sec_40B_SafetyOfficer_NoOfRequired_Selection: ['-1'],
      sec_40B_SafetyOfficer_NoOfRequired_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_40B_SafetyOfficer_NoOfRequired_ViolationExist : [0,[Validators.required]],
      sec_40B_SafetyOfficer_NoOfAppointed_Selection: ['-1'],
      sec_40B_SafetyOfficer_NoOfAppointed_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_40B_SafetyOfficer_NoOfAppointed_ViolationExist : [0,[Validators.required]],
      sec_40B_SafetyOfficer_EligibilityCriteria_Selection: ['-1'],
      sec_40B_SafetyOfficer_EligibilityCriteria_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_40B_SafetyOfficer_EligibilityCriteria_ViolationExist : [0,[Validators.required]],
      sec_66F_SafetyCommittee_CommitteeRequired_Selection: ['-1'],
      sec_66F_SafetyCommittee_CommitteeRequired_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_66F_SafetyCommittee_CommitteeRequired_ViolationExist : [0,[Validators.required]],
      sec_66F_SafetyCommittee_CommitteeConstructed_Selection: ['-1'],
      sec_66F_SafetyCommittee_CommitteeConstructed_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_66F_SafetyCommittee_CommitteeConstructed_ViolationExist : [0,[Validators.required]],
      sec_66F_SafetyCommittee_CommitteeHeld_Selection: ['-1'],
      sec_66F_SafetyCommittee_CommitteeHeld_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_66F_SafetyCommittee_CommitteeHeld_ViolationExist : [0,[Validators.required]],
      sec_66F_SafetyCommittee_RecordOfMinutes_Selection: ['-1'],
      sec_66F_SafetyCommittee_RecordOfMinutes_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_66F_SafetyCommittee_RecordOfMinutes_ViolationExist : [0,[Validators.required]],
      sec_67A_SafetyBelts_Rule67A_Selection: ['-1'],
      sec_67A_SafetyBelts_Rule67A_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_67A_SafetyBelts_Rule67A_ViolationExist : [0,[Validators.required]],
      sec_67C_SafetyElecrical_Rule67C_Selection: ['-1'],
      sec_67C_SafetyElecrical_Rule67C_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_67C_SafetyElecrical_Rule67C_ViolationExist : [0,[Validators.required]],
      sec_67D_QualityOfProposal_BoIS_Selection: ['-1'],
      sec_67D_QualityOfProposal_BoIS_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_67D_QualityOfProposal_BoIS_ViolationExist : [0,[Validators.required]],
      sec_67F_EyeSight_Rule67F_Selection: ['-1'],
      sec_67F_EyeSight_Rule67F_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_67F_EyeSight_Rule67F_ViolationExist : [0,[Validators.required]],
      sec_67F_EyeSight_Form8A_Selection: ['-1'],
      sec_67F_EyeSight_Form8A_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_67F_EyeSight_Form8A_ViolationExist : [0,[Validators.required]],
      sec_67G_RailwaysInFacroty_Rule67G_Selection: ['-1'],
      sec_67G_RailwaysInFacroty_Rule67G_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_67G_RailwaysInFacroty_Rule67G_ViolationExist : [0,[Validators.required]],
      inspectionRefId: ['',Validators.required]

    }, {}) as TForm<Inspection_Form_Factory_Part_III_Safety>;
  }
  ngOnInit() {
    this.hasViolationFound=  "Any Violation Found?";
  }

  ngAfterViewInit() {
    
    this.route.queryParams
    .subscribe(params => {
      this.parmamEncodedinfo=params.info;
      this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info)=>{
      this.paramInfo = info;
      this.appHttpRequestHandlerService.httpGet({ id: this.paramInfo.inspectionRefId}, "Inspection", "getForm_Factory_Part_III_Safety").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericFormModel<Inspection_Form_Factory_Part_III_Safety>) => {
        // this.initFormData(data)
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
    this.hasSubmitClicked  =true;
    this.Input_Form.controls.inspectionRefId.patchValue(this.paramInfo.inspectionRefId);
    if (this.Input_Form.valid) {
      this.appHttpRequestHandlerService.httpPost(this.Input_Form.value, "pbsamadhannetcoreapi.Models.Inspection_Form_Factory_Part_III_Safety", "Inspection", "addUpdateForm_Factory_Part_III_Safety")
        .subscribe((data: GenericServiceResultTemplate) => {
          // // this.inspectionsPerformaStepersComponent.moveToNextStep();
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

  


  getCharacterCount(controlName: string): number {
    return this.Input_Form.get(controlName).value.length;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
