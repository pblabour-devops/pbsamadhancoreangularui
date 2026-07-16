import { NumberSymbol } from "@angular/common";

export class Inspection_Randomization {
  RandomizationId: number;
  Month: number;
  Year: number;
  DateTime:Date;
}
export interface Inspection_Master {
  inspectionId: number;
  isFromLegacySystem: boolean;
  appId: number;
  nar?: string;
  applicationType: number;
  inspectionStatusType: string;
  districtRefId: number;
  factoryCircleRefId: number;
  alcCircleRefId: number;
  hasAssignedLabourCircle: boolean;
  labourCircleRefId: number;
  randomizationRefId: number;
}

export interface Inspection_LockInfo {
  lockId: number;
  factoryCircleRefId: number;
  isLocked: boolean;
  lockedOn: Date;
  lockedBy_UserId: string;
  lockedBy_ProfileId: number;
  lockedBy_RoleId: string;
  isOperationalClosed : boolean,
  inspectionEstablishmentType : number,
  inspectionFactoryExistenceType : number,
  factoryDeRegistrationNo : string,
  remarks : string,
  randomizationRefId: number;
}


export interface Inspection_Form_Factory_Part_I_General {
  id: number;
  factoryName: string;
  factoryAddress: string;
  dateOfInspection: Date;
  dateOfLastInspection: Date;
  occupierName: string;
  occupierAddress: string;
  managerName: string;
  managerAddress: string;
  presentPersonName: string;
  presentPersonAddress: string;
  inspectionRefId: number;
}

export class Inspection_Form_Factory_Part_II_FactoryDetail {
  id: number;
  license_Factory_Act: string;
  registration_PE_Act: string;
  license_CL_Act: string;
  registration_ISMW_Act: string;
  license_ISMW_Act: string;
  isFactoryFeeDeposited: number;
  inspectionRefId: number;
}

export class Inspection_Form_Factory_Part_III_InspectionReport {
  id: number;
  factorySectionCategoryType: number;
  mfg_Process_Reported: string;
  mfg_Process_Inspected: string;
  byeProduct_Intermidiates_ChemicalDetail: string;
  bp_PUPDRules_IsApplicable: number;
  bp_PUPDRules_Status: string;

  bp_FactoriesAct_IsAccepted: number;
  bp_FactoriesAct_ApprovalReferenceNum: string;
  bP_FactoriesAct_ApprovalDate: Date;
  bp_Constructed_IsAsPerApprovedPlans: number;
  bp_Constructed_ChangesAsPerInspected: string;
  bp_Stability_IsAccepted: number;


  bp_Stability_AcceptanceReferenceNum: string;
  bP_FactoriesAct_AcceptanceDate: Date;
  inspectionRefId:number
}

export interface Inspection_Form_Factory_Part_III_MusterRoll {
  id: number;
  shiftTime_From: string;
  shiftTime_To: string;
  count_Adult_Male: number;
  count_Adult_FeMale: number;
  count_Adolescent_Male: number;
  count_Adolescent_FeMale: number;
  count_Children_Male: number;
  count_Children_FeMale: number;
  inspectionMusterRollType: number;
  inspectionRefId: number;
}

export interface Inspection_Form_Factory_Part_III_Health {
  id: number;
  sec_11_Cleanliness_SuitableManner_Selection: number;
  sec_11_Cleanliness_SuitableManner_Remarks: string;
  sec_11_Cleanliness_Method_Selection: number;
  sec_11_Cleanliness_Method_Remarks: string;
  sec_11_Cleanliness_Drainage_Selection: number;
  sec_11_Cleanliness_Drainage_Remarks: string;
  sec_11_Cleanliness_LimeWashed_Selection: number;
  sec_11_Cleanliness_LimeWashed_Remarks: string;
  sec_11_Cleanliness_Whitewashing_Selection: number;
  sec_11_Cleanliness_Whitewashing_Remarks: string;
  sec_12_DisposalWaste_PPCB_Selection: number;
  sec_12_DisposalWaste_PPCB_Remarks: string;
  sec_13_VantilationTemperature_WetBulb_Selection: number;
  sec_13_VantilationTemperature_WetBulb_Remarks: string;
  sec_13_VantilationTemperature_WorkRoom_Selection: number;
  sec_13_VantilationTemperature_WorkRoom_Remarks: string;
  sec_14_DustFume_Selection: number;
  sec_14_DustFume_Remarks: string;
  sec_16_Overcrowding_142CM_Selection: number;
  sec_16_Overcrowding_142CM_Remarks: string;
  sec_17_Lighting_Windows_Selection: number;
  sec_17_Lighting_Windows_Remarks: string;
  sec_17_Lighting_EyeStrain_Selection: number;
  sec_17_Lighting_EyeStrain_Remarks: string;
  sec_17_Lighting_Passages_Selection: number;
  sec_17_Lighting_Passages_Remarks: string;
  sec_18_DrinkingWater_Language_Selection: number;
  sec_18_DrinkingWater_Language_Remarks: string;
  sec_18_DrinkingWater_Distance_Selection: number;
  sec_18_DrinkingWater_Distance_Remarks: string;
  sec_18_DrinkingWater_Quality_Selection: number;
  sec_18_DrinkingWater_Quality_Remarks: string;
  sec_18_DrinkingWater_Authority_Selection: number;
  sec_18_DrinkingWater_Authority_Remarks: string;
  sec_18_DrinkingWater_Approval_Selection: number;
  sec_18_DrinkingWater_Approval_Remarks: string;
  sec_18_DrinkingWater_Clean_Selection: number;
  sec_18_DrinkingWater_Clean_Remarks: string;
  sec_18_DrinkingWater_Point_Selection: number;
  sec_18_DrinkingWater_Point_Remarks: string;
  sec_18_DrinkingWater_CoolWater_Selection: number;
  sec_18_DrinkingWater_CoolWater_Remarks: string;
  sec_19_Urinals_Accomodation_Selection: number;
  sec_19_Urinals_Accomodation_Remarks: string;
  sec_19_Urinals_PublicHealth_Selection: number;
  sec_19_Urinals_PublicHealth_Remarks: string;
  sec_19_Urinals_Privacy_Selection: number;
  sec_19_Urinals_Privacy_Remarks: string;
  sec_19_Urinals_Signboards_Selection: number;
  sec_19_Urinals_Signboards_Remarks: string;
  sec_19_Urinals_Rule46_Selection: number;
  sec_19_Urinals_Rule46_Remarks: string;
  sec_19_Urinals_Walls_Selection: number;
  sec_19_Urinals_Walls_Remarks: string;
  sec_20_Spittoons_Rule_53_54_Selection: number;
  sec_20_Spittoons_Rule_53_54_Remarks: number;
  sec_11_Cleanliness_SuitableManner_ViolationExist: number;
  sec_11_Cleanliness_Method_ViolationExist: number;
  sec_11_Cleanliness_Drainage_ViolationExist: number;
  sec_11_Cleanliness_LimeWashed_ViolationExist: number;
  sec_11_Cleanliness_Whitewashing_ViolationExist: number;
  sec_12_DisposalWaste_PPCB_ViolationExist: number;
  sec_13_VantilationTemperature_WetBulb_ViolationExist: number;
  sec_13_VantilationTemperature_WorkRoom_ViolationExist: number;
  sec_14_DustFume_ViolationExist: number;
  sec_16_Overcrowding_142CM_ViolationExist: number;
  sec_17_Lighting_Windows_ViolationExist: number;
  sec_17_Lighting_EyeStrain_ViolationExist: number;
  sec_17_Lighting_Passages_ViolationExist: number;
  sec_18_DrinkingWater_Language_ViolationExist: number;
  sec_18_DrinkingWater_Distance_ViolationExist: number;
  sec_18_DrinkingWater_Quality_ViolationExist: number;
  sec_18_DrinkingWater_Authority_ViolationExist: number;
  sec_18_DrinkingWater_Approval_ViolationExist: number;
  sec_18_DrinkingWater_Clean_ViolationExist: number;
  sec_18_DrinkingWater_Point_ViolationExist: number;
  sec_18_DrinkingWater_CoolWater_ViolationExist: number;
  sec_19_Urinals_Accomodation_ViolationExist: number;
  sec_19_Urinals_PublicHealth_ViolationExist: number;
  sec_19_Urinals_Privacy_ViolationExist: number;
  sec_19_Urinals_Signboards_ViolationExist: number;
  sec_19_Urinals_Rule46_ViolationExist: number;
  sec_19_Urinals_Walls_ViolationExist: number;
  sec_20_Spittoons_Rule_53_54_ViolationExist : number;
  inspectionRefId: number;
}

export interface Inspection_Form_Factory_Part_III_Safety {
  id: number;
  sec_21_FancingOfMachinery_Rule55_Selection: number;
  sec_21_FancingOfMachinery_Rule55_Remarks: string;
  sec_21_FancingOfMachinery_Guarding_Selection: number;
  sec_21_FancingOfMachinery_Guarding_Remarks: string;
  sec_21_FancingOfMachinery_OtherSpecificReport_Selection: number;
  sec_21_FancingOfMachinery_OtherSpecificReport_Remarks: string;
  sec_22_MachineryInMotion_Form7_A_Selection: number;
  sec_22_MachineryInMotion_Form7_A_Remarks: string;
  sec_28_HoistAndLifts_Examination_Selection: number;
  sec_28_HoistAndLifts_Examination_Remarks: string;
  sec_28_HoistAndLifts_SafeWorking_Selection: number;
  sec_28_HoistAndLifts_SafeWorking_Remarks: string;
  sec_28_HoistAndLifts_Interlocking_Selection: number;
  sec_28_HoistAndLifts_Interlocking_Remarks: string;
  sec_28_HoistAndLifts_OtherSpecificReport_Selection: number;
  sec_28_HoistAndLifts_OtherSpecificReport_Remarks: string;
  sec_29_LiftingMachine_GoodConstruction_Selection: number;
  sec_29_LiftingMachine_GoodConstruction_Remarks: string;
  sec_29_LiftingMachine_ProperlyMaintained_Selection: number;
  sec_29_LiftingMachine_ProperlyMaintained_Remarks: string;
  sec_29_LiftingMachine_CompetentPerson_Selection: number;
  sec_29_LiftingMachine_CompetentPerson_Remarks: string;
  sec_29_LiftingMachine_MaximumSafeWorking_Selection: number;
  sec_29_LiftingMachine_MaximumSafeWorking_Remarks: string;
  sec_29_LiftingMachine_Rule60A_3_Selection: number;
  sec_29_LiftingMachine_Rule60A_3_Remarks: string;
  sec_29_LiftingMachine_SuitablePassages_Selection: number;
  sec_29_LiftingMachine_SuitablePassages_Remarks: string;
  sec_30_RevolvingMachine_NoticesOfSafe_Selection: number;
  sec_30_RevolvingMachine_NoticesOfSafe_Remarks: string;
  sec_31_PressurePlant_GoodConstruction_Selection: number;
  sec_31_PressurePlant_GoodConstruction_Remarks: string;
  sec_31_PressurePlant_SafetyValve_Selection: number;
  sec_31_PressurePlant_SafetyValve_Remarks: string;
  sec_31_PressurePlant_Gauge_Selection: number;
  sec_31_PressurePlant_Gauge_Remarks: string;
  sec_31_PressurePlant_StopValve_Selection: number;
  sec_31_PressurePlant_StopValve_Remarks: string;
  sec_31_PressurePlant_DrainCock_Selection: number;
  sec_31_PressurePlant_DrainCock_Remarks: string;
  sec_31_PressurePlant_CompetentPerson_Selection: number;
  sec_31_PressurePlant_CompetentPerson_Remarks: string;
  sec_31_PressurePlant_SpecificReport_Selection: number;
  sec_31_PressurePlant_SpecificReport_Remarks: string;
  sec_32_FloorStairs_ProperlyMaintained_Selection: number;
  sec_32_FloorStairs_ProperlyMaintained_Remarks: string;
  sec_32_FloorStairs_HandrailsProvided_Selection: number;
  sec_32_FloorStairs_HandrailsProvided_Remarks: string;
  sec_33_PitsSumps_SecurelyCovered_Selection: number;
  sec_33_PitsSumps_SecurelyCovered_Remarks: string;
  sec_34_ExcessiveWeights_Rule62_Selection: number;
  sec_34_ExcessiveWeights_Rule62_Remarks: string;
  sec_35_ProtectionOfEyes_SuitableGoggles_Selection: number;
  sec_35_ProtectionOfEyes_SuitableGoggles_Remarks: string;
  sec_36_PrecautionsDangerusFumes_Rule64_Selection: number;
  sec_36_PrecautionsDangerusFumes_Rule64_Remarks: string;
  sec_37_Explosive_ManufaturinProcess_Selection: number;
  sec_37_Explosive_ManufaturinProcess_Remarks: string;
  sec_38_PrecautionOfFire_Rule66_3_Selection: number;
  sec_38_PrecautionOfFire_Rule66_3_Remarks: string;
  sec_38_PrecautionOfFire_Rule66_4_Selection: number;
  sec_38_PrecautionOfFire_Rule66_4_Remarks: string;
  sec_38_PrecautionOfFire_Rule66_5_Selection: number;
  sec_38_PrecautionOfFire_Rule66_5_Remarks: string;
  sec_38_PrecautionOfFire_Rule66_6_Selection: number;
  sec_38_PrecautionOfFire_Rule66_6_Remarks: string;
  sec_38_PrecautionOfFire_Rule66_7_Selection: number;
  sec_38_PrecautionOfFire_Rule66_7_Remarks: string;
  sec_38_PrecautionOfFire_PreventiveMeasures_Selection: number;
  sec_38_PrecautionOfFire_PreventiveMeasures_Remarks: string;
  sec_38_PrecautionOfFire_Rule66_9_Selection: number;
  sec_38_PrecautionOfFire_Rule66_9_Remarks: string;
  sec_38_PrecautionOfFire_Rule66_10_Selection: number;
  sec_38_PrecautionOfFire_Rule66_10_Remarks: string;
  sec_38_PrecautionOfFire_Rule66_11_Selection: number;
  sec_38_PrecautionOfFire_Rule66_11_Remarks: string;
  sec_38_PrecautionOfFire_FirstAid_Selection: number;
  sec_38_PrecautionOfFire_FirstAid_Remarks: string;
  sec_38_PrecautionOfFire_PersonTrained_Selection: number;
  sec_38_PrecautionOfFire_PersonTrained_Remarks: string;
  sec_38_PrecautionOfFire_FightingDrill_Selection: number;
  sec_38_PrecautionOfFire_FightingDrill_Remarks: string;
  sec_40_SpecialReport_BuildingCauseRiskOfBodilyInjury_Selection: number;
  sec_40_SpecialReport_BuildingCauseRiskOfBodilyInjury_Remarks: string;
  sec_40_SpecialReport_PlantCauseRiskOfBodilyInjury_Selection: number;
  sec_40_SpecialReport_PlantCauseRiskOfBodilyInjury_Remarks: string;
  sec_40_SpecialReport_ProcessCauseRiskOfBodilyInjury_Selection: number;
  sec_40_SpecialReport_ProcessCauseRiskOfBodilyInjury_Remarks: string;
  sec_40_SpecialReport_MaterialCauseRiskOfBodilyInjury_Selection: number;
  sec_40_SpecialReport_MaterialCauseRiskOfBodilyInjury_Remarks: string;
  sec_40B_SafetyOfficer_NoOfRequired_Selection: number;
  sec_40B_SafetyOfficer_NoOfRequired_Remarks: string;
  sec_40B_SafetyOfficer_NoOfAppointed_Selection: number;
  sec_40B_SafetyOfficer_NoOfAppointed_Remarks: string;
  sec_40B_SafetyOfficer_EligibilityCriteria_Selection: number;
  sec_40B_SafetyOfficer_EligibilityCriteria_Remarks: string;
  sec_66F_SafetyCommittee_CommitteeRequired_Selection: number;
  sec_66F_SafetyCommittee_CommitteeRequired_Remarks: string;
  sec_66F_SafetyCommittee_CommitteeConstructed_Selection: number;
  sec_66F_SafetyCommittee_CommitteeConstructed_Remarks: string;
  sec_66F_SafetyCommittee_CommitteeHeld_Selection: number;
  sec_66F_SafetyCommittee_CommitteeHeld_Remarks: string;
  sec_66F_SafetyCommittee_RecordOfMinutes_Selection: number;
  sec_66F_SafetyCommittee_RecordOfMinutes_Remarks: string;
  sec_67A_SafetyBelts_Rule67A_Selection: number;
  sec_67A_SafetyBelts_Rule67A_Remarks: string;
  sec_67C_SafetyElecrical_Rule67C_Selection: number;
  sec_67C_SafetyElecrical_Rule67C_Remarks: string;
  sec_67D_QualityOfProposal_BoIS_Selection: number;
  sec_67D_QualityOfProposal_BoIS_Remarks: string;
  sec_67F_EyeSight_Rule67F_Selection: number;
  sec_67F_EyeSight_Rule67F_Remarks: string;
  sec_67F_EyeSight_Form8A_Selection: number;
  sec_67F_EyeSight_Form8A_Remarks: string;
  sec_67G_RailwaysInFacroty_Rule67G_Selection: number;
  sec_67G_RailwaysInFacroty_Rule67G_Remarks: string;
  sec_20_Spittoons_Rule_53_54_ViolationExist : number;
  sec_21_FancingOfMachinery_Rule55_ViolationExist: number;
  sec_21_FancingOfMachinery_Guarding_ViolationExist: number;
  sec_21_FancingOfMachinery_OtherSpecificReport_ViolationExist: number;
  sec_22_MachineryInMotion_Form7_A_ViolationExist: number;
  sec_28_HoistAndLifts_Examination_ViolationExist: number;
  sec_28_HoistAndLifts_SafeWorking_ViolationExist: number;
  sec_28_HoistAndLifts_Interlocking_ViolationExist: number;
  sec_28_HoistAndLifts_OtherSpecificReport_ViolationExist: number;
  sec_29_LiftingMachine_GoodConstruction_ViolationExist: number;
  sec_29_LiftingMachine_ProperlyMaintained_ViolationExist: number;
  sec_29_LiftingMachine_CompetentPerson_ViolationExist: number;
  sec_29_LiftingMachine_MaximumSafeWorking_ViolationExist : number;
  sec_29_LiftingMachine_Rule60A_3_ViolationExist : number;
  sec_29_LiftingMachine_SuitablePassages_ViolationExist : number;
  sec_30_RevolvingMachine_NoticesOfSafe_ViolationExist : number;
  sec_31_PressurePlant_GoodConstruction_ViolationExist : number;
  sec_31_PressurePlant_SafetyValve_ViolationExist : number;
  sec_31_PressurePlant_Gauge_ViolationExist : number;
  sec_31_PressurePlant_StopValve_ViolationExist : number;
  sec_31_PressurePlant_DrainCock_ViolationExist : number;
  sec_31_PressurePlant_CompetentPerson_ViolationExist : number;
  sec_31_PressurePlant_SpecificReport_ViolationExist : number;
  sec_32_FloorStairs_ProperlyMaintained_ViolationExist : number;
  sec_32_FloorStairs_HandrailsProvided_ViolationExist : number;
  sec_33_PitsSumps_SecurelyCovered__ViolationExist : number;
  sec_34_ExcessiveWeights_Rule62_ViolationExist : number;
  sec_35_ProtectionOfEyes_SuitableGoggles_ViolationExist : number;
  sec_36_PrecautionsDangerusFumes_Rule64_ViolationExist : number;
  sec_37_Explosive_ManufaturinProcess_ViolationExist : number;
  sec_38_PrecautionOfFire_Rule66_3ViolationExist : number;
  sec_38_PrecautionOfFire_Rule66_4_ViolationExist : number;
  sec_38_PrecautionOfFire_Rule66_5_ViolationExist : number;
  sec_38_PrecautionOfFire_Rule66_6_ViolationExist : number;
  sec_38_PrecautionOfFire_Rule66_7_ViolationExist : number;
  sec_38_PrecautionOfFire_PreventiveMeasures_ViolationExist : number;
  sec_38_PrecautionOfFire_Rule66_9_ViolationExist : number;
  sec_38_PrecautionOfFire_Rule66_10ViolationExist : number;
  sec_38_PrecautionOfFire_Rule66_11_ViolationExist : number;
  sec_38_PrecautionOfFire_FirstAid_ViolationExist : number;
  sec_38_PrecautionOfFire_PersonTrained_ViolationExist : number;
  sec_38_PrecautionOfFire_FightingDrill_ViolationExist : number;
  sec_40_SpecialReport_BuildingCauseRiskOfBodilyInjury_ViolationExist : number;
  sec_40_SpecialReport_PlantCauseRiskOfBodilyInjury_ViolationExist : number;
  sec_40_SpecialReport_ProcessCauseRiskOfBodilyInjury_ViolationExist : number;
  sec_40_SpecialReport_MaterialCauseRiskOfBodilyInjury_ViolationExist : number;
  sec_40B_SafetyOfficer_NoOfRequired_ViolationExist : number;
  sec_40B_SafetyOfficer_NoOfAppointed_ViolationExist : number;
  sec_40B_SafetyOfficer_EligibilityCriteria_ViolationExist : number;
  sec_66F_SafetyCommittee_CommitteeRequired_ViolationExist : number;
  sec_66F_SafetyCommittee_CommitteeConstructed_ViolationExist : number;
  sec_66F_SafetyCommittee_CommitteeHeld_ViolationExist : number;
  sec_66F_SafetyCommittee_RecordOfMinutes_ViolationExist : number;
  sec_67A_SafetyBelts_Rule67A_ViolationExist : number;
  sec_67C_SafetyElecrical_Rule67C_ViolationExist : number;
  sec_67D_QualityOfProposal_BoIS_ViolationExist : number;
  sec_67F_EyeSight_Rule67F_ViolationExist : number;
  sec_67F_EyeSight_Form8A_ViolationExist : number;
  sec_67G_RailwaysInFacroty_Rule67G_ViolationExist : number;

  inspectionRefId: number;
}

export interface Inspection_Form_Factory_Part_III_Welfare {
  id: number;
  sec_42_WashingFacilities_Provided_Selection:  number;
  sec_42_WashingFacilities_Provided_Remarks: string;
  sec_43_StoringAndDrying_Rule68A_Selection:  number;
  sec_43_StoringAndDrying_Rule68A_Remarks: string;
  sec_44_FacilitiesForSitting_Provided_Selection:  number;
  sec_44_FacilitiesForSitting_Provided_Remarks: string;
  sec_45_Rule69_FirstAid_Rule69_Selection:  number;
  sec_45_Rule69_FirstAid_Rule69_Remarks: string;
  sec_45_Rule69_NoticesContainNameOfPerson_Selection:  number;
  sec_45_Rule69_NoticesContainNameOfPerson_Remarks: string;
  sec_45_Rule69_PersonTrainedInFirstAid_Selection:  number;
  sec_45_Rule69_PersonTrainedInFirstAid_Remarks: string;
  sec_45_Rule70_AmbulanceRoom_Required_Selection:  number;
  sec_45_Rule70_AmbulanceRoom_Required_Remarks: string;
  sec_45_Rule70_AmbulanceRoom_Rule70_Selection:  number;
  sec_45_Rule70_AmbulanceRoom_Rule70_Remarks: string;
  sec_45_Rule70_AmbulanceRoom_MedicalOfficers_Selection:  number;
  sec_45_Rule70_AmbulanceRoom_MedicalOfficers_Remarks: string;
  sec_45_Rule70_AmbulanceRoom_ParaMedicalStaff_Selection:  number;
  sec_45_Rule70_AmbulanceRoom_ParaMedicalStaff_Remarks: string;
  sec_46_Canteen_Required_Selection:  number;
  sec_46_Canteen_Required_Remarks: string;
  sec_46_Canteen_Rule71_72_73_Selection:  number;
  sec_46_Canteen_Rule71_72_73_Remarks: string;
  sec_46_Canteen_PriceToCharged_Selection:  number;
  sec_46_Canteen_PriceToCharged_Remarks: string;
  sec_46_Canteen_BeingMaintained_Selection:  number;
  sec_46_Canteen_BeingMaintained_Remarks: string;
  sec_46_Canteen_CommitteeConstituted_Selection:  number;
  sec_46_Canteen_CommitteeConstituted_Remarks: string;
  sec_46_Canteen_ExaminedAnnualy_Selection:  number;
  sec_46_Canteen_ExaminedAnnualy_Remarks: string;
  sec_47_RestRoom_Required_Selection:  number;
  sec_47_RestRoom_Required_Remarks: string;
  sec_47_RestRoom_Rule78_Selection:  number;
  sec_47_RestRoom_Rule78_Remarks: string;
  sec_48_Crech_Required_Selection:  number;
  sec_48_Crech_Required_Remarks: string;
  sec_48_Crech_Rule79_Selection:  number;
  sec_48_Crech_Rule79_Remarks: string;
  sec_48_Crech_WashRoom_Selection:  number;
  sec_48_Crech_WashRoom_Remarks: string;
  sec_48_Crech_MilkAndRefreshment_Selection:  number;
  sec_48_Crech_MilkAndRefreshment_Remarks: string;
  sec_48_Crech_MotherFeeding_Selection:  number;
  sec_48_Crech_MotherFeeding_Remarks: string;
  sec_49_WelfareOfficer_Required_Selection:  number;
  sec_49_WelfareOfficer_Required_Remarks: string;
  sec_49_WelfareOfficer_PWOR_Selection:  number;
  sec_49_WelfareOfficer_PWOR_Remarks: string;
  sec_49_WelfareOfficer_OtherRemarks_Selection:  number;
  sec_49_WelfareOfficer_OtherRemarks_Remarks: string;
  inspectionRefId: number;
  sec_42_WashingFacilities_Provided_ViolationExist : number;
  sec_43_StoringAndDrying_Rule68A_ViolationExist : number;
  sec_44_FacilitiesForSitting_Provided_ViolationExist : number;
  sec_45_Rule69_FirstAid_Rule69_ViolationExist : number;
  sec_45_Rule69_NoticesContainNameOfPerson_ViolationExist : number;
  sec_45_Rule69_PersonTrainedInFirstAid_ViolationExist : number;
  sec_45_Rule70_AmbulanceRoom_Required_ViolationExist : number;
  sec_45_Rule70_AmbulanceRoom_Rule70_ViolationExist : number;
  sec_45_Rule70_AmbulanceRoom_MedicalOfficers_ViolationExist : number;
  sec_45_Rule70_AmbulanceRoom_ParaMedicalStaff_ViolationExist : number;
  sec_46_Canteen_Required_ViolationExist : number;
  sec_46_Canteen_Rule71_72_73_ViolationExist : number;
  sec_46_Canteen_PriceToCharged_ViolationExist : number;
  sec_46_Canteen_BeingMaintained_ViolationExist : number;
  sec_46_Canteen_CommitteeConstituted_ViolationExist : number;
  sec_46_Canteen_ExaminedAnnualy_ViolationExist : number;
  sec_47_RestRoom_Required_ViolationExist : number;
  sec_47_RestRoom_Rule78_ViolationExist : number;
  sec_48_Crech_Required_ViolationExist : number;
  sec_48_Crech_Rule79_ViolationExist : number;
  sec_48_Crech_WashRoom_ViolationExist : number;
  sec_48_Crech_MilkAndRefreshment_ViolationExist : number;
  sec_48_Crech_MotherFeeding_ViolationExist : number;
  sec_49_WelfareOfficer_Required_ViolationExist : number;
  sec_49_WelfareOfficer_PWOR_ViolationExist : number;
  sec_49_WelfareOfficer_OtherRemarks_ViolationExist : number;

}

export interface Inspection_Form_Factory_Part_III_General {
    id: number;
    sec_51_WeeklyHours_9HoursInADay_Selection: number;
    sec_51_WeeklyHours_9HoursInADay_Remarks: string;
    sec_52_WeeklyHoliday_FirstDayOfWeek_Selection: number;
    sec_52_WeeklyHoliday_FirstDayOfWeek_Remarks: string;
    sec_52_WeeklyHoliday_FactoryManager_Selection: number;
    sec_52_WeeklyHoliday_FactoryManager_Remarks: string;
    sec_53_CompensatoryHoliday_RegisterMaintained_Selection: number;
    sec_53_CompensatoryHoliday_RegisterMaintained_Remarks: string;
    sec_54_DailyHours_Sec54_Selection: number;
    sec_54_DailyHours_Sec54_Remarks: string;
    sec_55_IntervalOfRest_Sec55_Selection: number;
    sec_55_IntervalOfRest_Sec55_Remarks: string;
    sec_56_SpreadOver_Sec56_Selection: number;
    sec_56_SpreadOver_Sec56_Remarks: string;
    sec_57_NightShifts_Sec57_Selection: number;
    sec_57_NightShifts_Sec57_Remarks: string;
    sec_58_OverlappingShifts_Sec58_Selection: number;
    sec_58_OverlappingShifts_Sec58_Remarks: string;
    sec_59_ExtraWages_Sec85_Selection: number;
    sec_59_ExtraWages_Sec85_Remarks: string;
    sec_59_ExtraWages_Sec59_Selection: number;
    sec_59_ExtraWages_Sec59_Remarks: string;
    sec_60_DoubleEmployment_Sec60_Selection: number;
    sec_60_DoubleEmployment_Sec60_Remarks: string;
    sec_61_NoticeOfPeriod_Displayed_Selection: number;
    sec_61_NoticeOfPeriod_Displayed_Remarks: string;
    sec_61_NoticeOfPeriod_RegiterOfAudit_Selection: number;
    sec_61_NoticeOfPeriod_RegiterOfAudit_Remarks: string;
    sec_66_WomenInNightShift_Employed_Selection: number;
    sec_66_WomenInNightShift_Employed_Remarks: string;
    sec_66_WomenInNightShift_Approval_Selection: number;
    sec_66_WomenInNightShift_Approval_Remarks: string;
    youngPerson_NonAuditWorkers_Selection: number;
    youngPerson_NonAuditWorkers_Remarks: string;
    youngPerson_CertificateOfFitness_Selection: number;
    youngPerson_CertificateOfFitness_Remarks: string;
    youngPerson_Sec71Rule92_Selection: number;
    youngPerson_Sec71Rule92_Remarks: string;
    youngPerson_Rule93_Selection: number;
    youngPerson_Rule93_Remarks: string;
    youngPerson_CLAAct1986_Selection: number;
    youngPerson_CLAAct1986_Remarks: string;
    sec_79_LeaveAndWages_RegisterMaintained_Selection: number;
    sec_79_LeaveAndWages_RegisterMaintained_Remarks: string;
    sec_79_LeaveAndWages_LeaveBooks_Selection: number;
    sec_79_LeaveAndWages_LeaveBooks_Remarks: string;
    sec_79_LeaveAndWages_FormD_Selection: number;
    sec_79_LeaveAndWages_FormD_Remarks: string;
    sec_79_LeaveAndWages_AnyOtherReport_Selection: number;
    sec_79_LeaveAndWages_AnyOtherReport_Remarks: string;
    sec_88_89_AccidentNotice_RegisterMaintained_Selection: number;
    sec_88_89_AccidentNotice_RegisterMaintained_Remarks: string;
    sec_88_89_AccidentNotice_PrescribedTime_Selection: number;
    sec_88_89_AccidentNotice_PrescribedTime_Remarks: string;
    sec_88_89_AccidentNotice_Rule104_Selection: number;
    sec_88_89_AccidentNotice_Rule104_Remarks: string;
    rule104A_PermissibleLevels_Rule104A_Selection: number;
    rule104A_PermissibleLevels_Rule104A_Remarks: string;
    sec_108_Notices_FactoryActRules_Selection: number;
    sec_108_Notices_FactoryActRules_Remarks: string;
    sec_108_Notices_Surgeon_Selection: number;
    sec_108_Notices_Surgeon_Remarks: string;
    sec_110_Returns_LastYearSubmitted_Selection: number;
    sec_110_Returns_LastYearSubmitted_Remarks: string;
    sec_51_WeeklyHours_9HoursInADay_ViolationExist : string;
    sec_52_WeeklyHoliday_FirstDayOfWeek_ViolationExist : string;
    sec_52_WeeklyHoliday_FactoryManager_ViolationExist : string;
    sec_54_DailyHours_Sec54_ViolationExist : string;
    sec_55_IntervalOfRest_Sec55_ViolationExist : string;
    sec_56_SpreadOver_Sec56_ViolationExist : string;
    sec_57_NightShifts_Sec57_ViolationExist : string;
    sec_58_OverlappingShifts_Sec58_ViolationExist : string;
    sec_59_ExtraWages_Sec85_ViolationExist : string;
    sec_59_ExtraWages_Sec59_ViolationExist : string;
    sec_60_DoubleEmployment_Sec60_ViolationExist : string;
    sec_61_NoticeOfPeriod_Displayed_ViolationExist : string;
    sec_61_NoticeOfPeriod_RegiterOfAudit_ViolationExist : string;
    sec_66_WomenInNightShift_Employed_ViolationExist : string;
    sec_66_WomenInNightShift_Approval_ViolationExist : string;
    youngPerson_NonAuditWorkers_ViolationExist : string;
    youngPerson_CertificateOfFitness_ViolationExist : string;
    youngPerson_Sec71Rule92_ViolationExist : string;
    youngPerson_Rule93_ViolationExist : string;
    sec_79_LeaveAndWages_RegisterMaintained_ViolationExist : string;
    youngPerson_CLAAct1986_ViolationExist : string;
    sec_79_LeaveAndWages_LeaveBooks_ViolationExist : string;
    sec_79_LeaveAndWages_FormD_ViolationExist : string;
    sec_79_LeaveAndWages_AnyOtherReport_ViolationExist : string;
    sec_88_89_AccidentNotice_RegisterMaintained_ViolationExist : string;
    sec_88_89_AccidentNotice_PrescribedTime_ViolationExist : string;
    sec_88_89_AccidentNotice_Rule104_ViolationExist : string;
    rule104A_PermissibleLevels_Rule104A_ViolationExist : string;
    sec_108_Notices_FactoryActRules_ViolationExist : string;
    sec_108_Notices_Surgeon_ViolationExist : string;
    sec_110_Returns_LastYearSubmitted_ViolationExist : string;

    inspectionRefId: number;
}

export interface Inspection_Form_Factory_Part_III_DangerousOperation {
  id: number;
  isCarryingAnyDangerousOperation : boolean,
  inspectionRefId: number;
}

export interface Inspection_Form_Factory_Part_III_MajorAccidentHazard {
  id: number;
  hazardousProcess: string;
  typesOfHazarousChemical: string;
  methodOfStorage: string;
  onSiteEmergencyPlansPrepared: string;
  onSiteEmergencyPlansApproved: string;
  healthAndSafetyPolicy: string;
  decontaminationFacility: string;
  msdsPrepared: string;
  hazopStudies_Selection: number;
  agencyConductedStudies_Remarks: string;
  frequencyConductedStudies_Remarks: string;
  dateOfLastStudyConducted_Remarks: string;
  reportSubmittedAuthorities_Remarks: string;
  internalExternalTrainingProg: string;
  onSiteEmergencyMockDrills: string;
  integritySoundless_Selection: number;
  integritySoundless_AgencyConductedStudies_Remarks: string;
  integritySoundless_FrequencyConductedStudies_Remarks: string;
  integritySoundless_DateOfLastStudyConducted_Remarks: string;
  integritySoundless_CriticalFindingsNoticed_Remarks: string;
  majorAccidentsInLast3Years: string;
  ohcProvided_Selection: number;
  ohcArea: string;
  ohC_DateOfOfficerAppointed: string;
  ohC_OfficerQualification: string;
  ohC_ParaMedicalStaffAppointed: string;
  ohC_AmbulanceVanProvided: string;
  workingInHazardousProcess_Selection: number;
  workingInHazardousProcess_NameAddressOfficer: string;
  workingInHazardousProcess_NoOfWorkersExamined: string;
  workingInHazardousProcess_NatureOfOccDisease: string;
  workingInHazardousProcess_AnyNoticeableDiseased: string;
  databaseOnHealthRecordDeveloped: string;
  publicAwarenessProgConducted: string;
  safetyPamphletsPrinted: string;
  prsonsWithSuitableSupervisors: string;
  inspectionRefId: number;
  hazardousProcess_ViolationExist: number;
  typesOfHazarousChemical_ViolationExist: number;
  methodOfStorage_ViolationExist: number;
  onSiteEmergencyPlansPrepared_ViolationExist:number;
  onSiteEmergencyPlansApproved_ViolationExist: number;
  healthAndSafetyPolicy_ViolationExist: number;
  decontaminationFacility_ViolationExist: number;
  msdsPrepared_ViolationExist:number;
  hazopStudies_Selection_ViolationExist: number;
  agencyConductedStudies_ViolationExist: number;
  frequencyConductedStudies_ViolationExist: number;
  dateOfLastStudyConducted_ViolationExist: number;
  reportSubmittedAuthorities_ViolationExist: number;
  internalExternalTrainingProg_ViolationExist: number;
  onSiteEmergencyMockDrills_ViolationExist: number;
  integritySoundless_ViolationExist: number;
  integritySoundless_AgencyConductedStudies_ViolationExist:number;
  integritySoundless_FrequencyConductedStudies_ViolationExist: number;
  integritySoundless_DateOfLastStudyConducted_ViolationExist:number;
  integritySoundless_CriticalFindingsNoticed_ViolationExist: number;
  majorAccidentsInLast3Years_ViolationExist: number;
  ohcProvided_ViolationExist: number;
  ohcArea_ViolationExist: number;
  ohC_DateOfOfficerAppointed_ViolationExist: number;
  ohC_OfficerQualification_ViolationExist:number;
  ohC_ParaMedicalStaffAppointed_ViolationExist:number;
  ohC_AmbulanceVanProvided_ViolationExist: number;
  workingInHazardousProcess_ViolationExist:number;
  workingInHazardousProcess_NameAddressOfficer_ViolationExist: number;
  workingInHazardousProcess_NoOfWorkersExamined_ViolationExist: number;
  workingInHazardousProcess_NatureOfOccDisease_ViolationExist:number;
  workingInHazardousProcess_AnyNoticeableDiseased_ViolationExist: number;
  databaseOnHealthRecordDeveloped_ViolationExist: number;
  publicAwarenessProgConducted_ViolationExist: number;
  safetyPamphletsPrinted_ViolationExist: number;
  prsonsWithSuitableSupervisors_ViolationExist:number;
 
}

// Labour Wing Inspection Model

export interface Inspection_Form_Labour_Part_I_General {
  id: number;
  factoryName: string;
  factoryAddress: string;
  // inspectionFactoryExistenceType :string;
  dateOfInspection: Date;
  dateOfLastInspection: Date;
  occupierName: string;
  occupierAddress: string;
  managerName: string;
  managerAddress: string;
  presentPersonName: string;
  presentPersonAddress: string;
  inspectionRefId: number;
}
export class Inspection_Form_Labour_Part_II_FactoryDetail {
  id: number;
  license_Factory_Act: string;
  registration_PE_Act: string;
  license_CL_Act: string;
  registration_ISMW_Act: string;
  license_ISMW_Act: string;
  inspectionRefId: number;
}
export interface Inspection_Form_Labour_Part_III_EqualEnumerationAct {
  id: number;
  sec_4_IsEnumerationOfOppositeGenderPaidEqually: number,
  sec_4_IsEnumerationOfOppositeGenderPaidEqually_Remarks: string,

  sec_5_AnyDiscriminationIn_Recruitment_Promotion_Training_Transfer : number,
  sec_5_AnyDiscriminationIn_Recruitment_Promotion_Training_Transfer_Remarks : string,

  rule_6_IsRegister_FormD_Maintained : number,
  rule_6_IsRegister_FormD_Maintained_Remarks : string,
  sec_4_EnumerationPaidEqually_ViolationExist: number,
  sec_5_AnyDiscriminationIn_Recruitment_Promotion_Training_Transfer_ViolationExist: number,
  rule_6_Register_FormD_ViolationExist: number,
  inspectionRefId: number;
}
export interface Inspection_Form_Labour_III_MinimumWageAct {
  id: number;
  sec_12_IsWagesPaid_ToAll_FixedByGovernment_UnderSection_5: number,
  sec_12_IsWagesPaid_ToAll_FixedByGovernment_UnderSection_5_Remarks: string,
  sec_13_IsAllEmployeeWorking_AsFixedHoursBy_AppropriateGovernment: number,
  sec_13_IsAllEmployeeWorking_AsFixedHoursBy_AppropriateGovernment_Remarks: string,
  sec_13_IsRest_Given_ToEvery_Employee: number,
  sec_13_IsRest_Given_ToEvery_Employee_Remarks: string,
  sec_13_IsPayment_Overtime_Given: number,
  sec_13_IsPayment_Overtime_Given_Remarks: string,
  sec_15_IsWagesPaid_ForLessWorkingDays_AsPerSection_15: number,
  sec_15_IsWagesPaid_ForLessWorkingDays_AsPerSection_15_Remarks: string,
  rule_21_IsTimeAndConditions_OfPayment_Complied: null,
  rule_21_IsTimeAndConditions_OfPayment_Complied_Remarks: string,
  rule_21_IsDeductionMade_AsPrescribed: number,
  rule_21_IsDeductionMade_AsPrescribed_Remarks: string,
  rule_21_Upon_EmployerOrAuthorized_Representative: number,
  rule_21_Upon_EmployerOrAuthorized_Representative_Remarks: string,
  rule_21_IsMusterRoll_Form_V_Maintained: number,
  rule_21_IsMusterRoll_Form_V_Maintained_Remarks: string,
  rule_26_B_IsRegistered_Preserved_For_Three_Years: number,
  rule_26_B_IsRegistered_Preserved_For_Three_Years_Remarks: string,
  rule_26_C_IsRegistered_Produced_While_Inspection: number,
  rule_26_C_IsRegistered_Produced_While_Inspection_Remarks: string,
  sec_12_IsWagesPaid_ToAll_FixedByGovernment_UnderSection_5_ViolationExist: number,
  sec_13_IsAllEmployeeWorking_AsFixedHoursBy_AppropriateGovernment_ViolationExist: number,
  sec_13_IsRest_Given_ToEvery_Employee_ViolationExist: number,
  sec_13_IsPayment_Overtime_Given_ViolationExist: number,
  sec_15_IsWagesPaid_ForLessWorkingDays_AsPerSection_15_ViolationExist: number,
  rule_21_IsTimeAndConditions_OfPayment_Complied_ViolationExist: number,
  rule_21_IsDeductionMade_AsPrescribed_ViolationExist: number,
  rule_21_Upon_EmployerOrAuthorized_Representative_ViolationExist: number,
  rule_21_IsMusterRoll_Form_V_Maintained_ViolationExist: number,
  rule_26_B_IsRegistered_Preserved_For_Three_Years_ViolationExist: number,
  rule_26_C_IsRegistered_Produced_While_Inspection_ViolationExist: number,
  inspectionRefId: number;
}
export interface Inspection_Form_Labour_III_PaymentWagesAct {
  id: number;
  sec_4_IsWagesPeriodFixed : number,
  sec_4_IsWagesPeriodFixed_Remarks : string,
  sec_5_IsWagesPaid_OnTime_As_Per_Section_5 : number,
  sec_5_IsWagesPaid_OnTime_As_Per_Section_5_Remarks : string,
  sec_6_IsWages_Paid_As_Prescribed : number,
  sec_6_IsWages_Paid_As_Prescribed_Remarks : string,
  sec_7_IsDeductionMade : number,
  sec_7_IsDeductionMade_Remarks : string,
  sec_8_IsFine_Imposed_For_Acts_And_Omissions : number,
  sec_8_IsFine_Imposed_For_Acts_And_Omissions_Remarks : string,
  sec_8_IsNotice_Of_Acts_And_Omissions_Displayed : number,
  sec_8_IsNotice_Of_Acts_And_Omissions_Displayed_Remarks : string,
  sec_8_IsFine_Imposed_After_Giving_Opportunity : number,
  sec_8_IsFine_Imposed_After_Giving_Opportunity_Remarks : string,
  sec_8_Is_Fine_Amount_As_Per_Sub_Sec_8_4_And_8_5 : number,
  sec_8_Is_Fine_Amount_As_Per_Sub_Sec_8_4_And_8_5_Remarks : string,
  sec_8_Is_Fine_Recovered_As_Per_Sub_Sec_8_6 : number,
  sec_8_Is_Fine_Recovered_As_Per_Sub_Sec_8_6_Remarks : string,
  sec_9_To_13_IsDeductions_Made_AsPerSection : number,
  sec_9_To_13_IsDeductions_Made_AsPerSection_Remarks : string,
  sec_13_A_IsPrescribed_Register_Maintained : number,
  sec_13_A_IsPrescribed_Register_Maintained_Remarks : string,
  sec_13_A_IsRegister_Preserved_For_Three_Years : number,
  sec_13_A_IsRegister_Preserved_For_Three_Years_Remarks : string,
  sec_25_IsNotices_Under_section_Displayed : number,
  sec_25_IsNotices_Under_section_Displayed_Remarks : string
  sec_4_IsWagesPeriodFixed_ViolationExist: number,
  sec_5_IsWagesPaid_OnTime_As_Per_Section_5_ViolationExist: number,
  sec_6_IsWages_Paid_As_Prescribed_ViolationExist: number,
  sec_7_IsDeductionMade_ViolationExist: number,
  sec_8_IsFine_Imposed_For_Acts_And_Omissions_ViolationExist: number,
  sec_8_IsNotice_Of_Acts_And_Omissions_Displayed_ViolationExist: number,
  sec_8_IsFine_Imposed_After_Giving_Opportunity_ViolationExist: number,
  sec_8_Is_Fine_Amount_As_Per_Sub_Sec_8_4_And_8_5_ViolationExist: number,
  sec_8_Is_Fine_Recovered_As_Per_Sub_Sec_8_6_ViolationExist: number,
  sec_9_To_13_IsDeductions_Made_AsPerSection_ViolationExist: number,
  sec_13_A_IsPrescribed_Register_Maintained_ViolationExist: number,
  sec_13_A_IsRegister_Preserved_For_Three_Years_ViolationExist: number,
  sec_25_IsNotices_Under_section_Displayed_ViolationExist: number,

  inspectionRefId: number;
}
export interface Inspection_Form_Labour_III_PaymentBonusAct_StatutoryReport {
  id: number;
  rule_3_AnyPermission_ToChange_AccountingYear : number,
  rule_3_AnyPermission_ToChange_AccountingYear_Remarks : string,
  rule_4_IsForm_A_Register_Maintained : number,
  rule_4_IsForm_A_Register_Maintained_Remarks : string,
  rule_4_IsForm_B_Register_Maintained : number,
  rule_4_IsForm_B_Register_Maintained_Remarks : string,
  rule_4_IsForm_C_Register_Maintained : number,
  rule_4_IsForm_C_Register_Maintained_Remarks : string,
  rule_5_IsAnnualReturn_Form_D_Submitted : number,
  rule_5_IsAnnualReturn_Form_D_Submitted_Remarks : string,
  rule_3_AnyPermission_ToChange_AccountingYear_ViolationExist: number,
  rule_4_IsForm_A_Register_Maintained_ViolationExist: number,
  rule_4_IsForm_B_Register_Maintained_ViolationExist: number,
  rule_4_IsForm_C_Register_Maintained_ViolationExist: number,
  rule_5_IsAnnualReturn_Form_D_Submitted_ViolationExist: number,

  inspectionRefId: number;
}
export interface Inspection_Form_Labour_III_PaymentBonusAct_Part_B_Attachment {
  id: number;
  accountingYear : number,
  noOfEmployees : number,
  noOfEmployeesEligibleForBonus : number,
  rateOfBonus : number,
  noOfEmployeesWhomeBonusPaid : Number,
  noOfEmployeesWhomeBonusNotPaid : number,
  anyAgreementOfBonousBetweenEmployerAndEmployee : number,
  totalAmountUnpaidAsBonus : number,
  isEmployerSendUnpaidBonusToEmployeesAddress : number,
  inspectionRefId: number;
}
export interface Inspection_Form_Labour_III_ChildAndAdolescentLabourAct {
  id: number;
  sec_3_AnyChild_Found_Working: number,
  sec_3_AnyChild_Found_Working_Remarks: string,
  sec_3_A_AnyAdolescent_Found_Working: number,
  sec_3_A_AnyAdolescent_Found_Working_Remarks: string,
  sec_7_IsRestGiven_To_Adolescent: number,
  sec_7_IsRestGiven_To_Adolescent_Remarks: string,
  sec_7_IsWorkPeriod_NotMoreThen_6_Hours: number,
  sec_7_IsWorkPeriod_NotMoreThen_6_Hours_Remarks: string,
  sec_7_IsAny_Adolescent_Work_Between_7_PM_To_8_AM: number,
  sec_7_IsAny_Adolescent_Work_Between_7_PM_To_8_AM_Remarks: string,
  sec_7_IsAny_Adolescent_Working_Overtime: number,
  sec_7_IsAny_Adolescent_Working_Overtime_Remarks: string,
  sec_8_Is_Weekly_Holidays_Given_To_Adolescent: number,
  sec_8_Is_Weekly_Holidays_Given_To_Adolescent_Remarks: string,
  sec_8_Is_Notice_Of_Weekly_Holidays_Given_To_Adolescent: number,
  sec_8_Is_Notice_Of_Weekly_Holidays_Given_To_Adolescent_Remarks: string,
  sec_8_Is_Notice_Altered_Within_3_months: number,
  sec_8_Is_Notice_Altered_Within_3_months_Remarks: string,
  sec_9_Is_Notice_Sent_To_Inspector: number,
  sec_9_Is_Notice_Sent_To_Inspector_Remarks: string,
  sec_11_Is_Prescribed_Register_Maintained: number,
  sec_11_Is_Prescribed_Register_Maintained_Remarks: string,
  sec_12_Is_NoticeOfAbstract_Section_3A_And_14_displayed: number,
  sec_12_Is_NoticeOfAbstract_Section_3A_And_14_displayed_Remarks: string,
  sec_3_AnyChild_Found_Working_ViolationExist: number,
  sec_3_A_AnyAdolescent_Found_Working_ViolationExist: number,
  sec_7_IsRestGiven_To_Adolescent_ViolationExist: number,
  sec_7_IsWorkPeriod_NotMoreThen_6_Hours_ViolationExist: number,
  sec_7_IsAny_Adolescent_Work_Between_7_PM_To_8_AM_ViolationExist: number,
  sec_7_IsAny_Adolescent_Working_Overtime_ViolationExist: number,
  sec_8_Is_Weekly_Holidays_Given_To_Adolescent_ViolationExist: number,
  sec_8_Is_Notice_Of_Weekly_Holidays_Given_To_Adolescent_ViolationExist: number,
  sec_8_Is_Notice_Altered_Within_3_months_ViolationExist: number,
  sec_9_Is_Notice_Sent_To_Inspector_ViolationExist: number,
  sec_11_Is_Prescribed_Register_Maintained_ViolationExist: number,
  sec_12_Is_NoticeOfAbstract_Section_3A_And_14_displayed_ViolationExist: number,


  inspectionRefId: number;
}
export interface Inspection_Form_Labour_III_NationalAndFestivalHolidays {
  id: number;
  rule_3_IsFestivalHolidays_Decided_Before_30th_November : number,
  rule_3_IsFestivalHolidays_Decided_Before_30th_November_Remarks : string,
  rule_3_IsFestivalHolidays_Notification_Share_Before_31th_Dec : number,
  rule_3_IsFestivalHolidays_Notification_Share_Before_31th_Dec_Remarks : string,
  rule_3_Is_Festival_Holidays_Copy_Sent_To_Inspector_Before_31th_Dec : number,
  rule_3_Is_Festival_Holidays_Copy_Sent_To_Inspector_Before_31th_Dec_Remarks : string,
  rule_4_Is_Election_Conducted : number,
  rule_4_Is_Election_Conducted_Remarks : string,
  rule_7_Is_Form_B_Register_Maintained : number,
  rule_7_Is_Form_B_Register_Maintained_Remarks : string,
  rule_3_IsFestivalHolidays_Decided_Before_30th_November_ViolationExist: number,
  rule_3_IsFestivalHolidays_Notification_Share_Before_31th_Dec_ViolationExist: number,
  rule_3_Is_Festival_Holidays_Copy_Sent_To_Inspector_Before_31th_Dec_ViolationExist: number,
  rule_4_Is_Election_Conducted_ViolationExist: number,
  rule_7_Is_Form_B_Register_Maintained_ViolationExist: number,
  inspectionRefId: number;
}
export interface Inspection_Form_Labour_III_MaternityBenefitAct {
  id: number;
  sec_8_Rule_6_4_Is_Payment_Of_Medical_Bonus_Paid : number,
  sec_8_Rule_6_4_Is_Payment_Of_Medical_Bonus_Paid_Remarks : string,
  sec_9_Is_Leave_For_Miscarriage_Granted : number,
  sec_9_Is_Leave_For_Miscarriage_Granted_Remarks : string,
  sec_9_A_Is_Leave_with_Wages_Granted_In_Case_Of_tubectomy : number,
  sec_9_A_Leave_with_Wages_Granted_In_Case_Of_tubectomy_Remarks : string,
  sec_10_Role_6_Is_Leave_Granted_For_Illness_Arising_Out_Of_Pregnancy : number,
  sec_10_Role_6_Leave_Granted_For_Illness_Arising_Out_Of_Pregnancy_Remarks : string,
  sec_11_Role_7_Is_Nursing_Breaks_Given_Of_20_Minutes : number,
  sec_11_Role_7_Nursing_Breaks_Of_20_Minutes_Remarks : string,
  sec_11_A_Is_Creche_Facility_Provided : number,
  sec_11_A_Is_Creche_Facility_Provided_Remarks : string,
  sec_12_Is_Any_Dismissal_During_Absence_Of_Pregnancy : number,
  sec_12_Any_Dismissal_During_Absence_Of_Pregnancy_Remarks : string,
  sec_19_Role_15_Is_Act_And_Rules_In_Form_K_Displayed : number,
  sec_19_Role_15_Act_And_Rules_In_Form_K_Displayed_Remarks : string,
  sec_20_Rule_3_IsMusterRoll_Form_A_Maintained : number,
  sec_20_Rule_3_MusterRoll_Form_A_Maintained_Remarks : string,
  rule_14_Is_Record_Preserved_For_Three_Years : number,
  rule_14_Record_Preserved_For_Three_Years_Remarks : string,
  rule_16_Is_Annual_Return_Form_L_M_N_O_Submitted : number,
  rule_16_Annual_Return_Form_L_M_N_O_Submitted_Remarks : string,
  sec_8_Rule_6_4_Is_Payment_Of_Medical_Bonus_Paid_ViolationExist: number,
  sec_9_Is_Leave_For_Miscarriage_Granted_ViolationExist: number,
  sec_9_A_Is_Leave_with_Wages_Granted_In_Case_Of_tubectomy_ViolationExist: number,
  sec_10_Role_6_Is_Leave_Granted_For_Illness_Arising_Out_Of_Pregnancy_ViolationExist: number,
  sec_11_Role_7_Is_Nursing_Breaks_Given_Of_20_Minutes_ViolationExist: number,
  sec_11_A_Is_Creche_Facility_Provided_ViolationExist: number,
  sec_12_Is_Any_Dismissal_During_Absence_Of_Pregnancy_ViolationExist: number,
  sec_19_Role_15_Is_Act_And_Rules_In_Form_K_Displayed_ViolationExist: number,
  sec_20_Rule_3_IsMusterRoll_Form_A_Maintained_ViolationExist: number,
  rule_14_Is_Record_Preserved_For_Three_Years_ViolationExist: number,
  rule_16_Is_Annual_Return_Form_L_M_N_O_Submitted_ViolationExist: number,

  inspectionRefId: number;
}
export interface Inspection_Form_Labour_III_ContractLabourAct {
  id: number;
  sec_16_Rule_42_Is_Canteen_Provided: number,
  sec_16_Rule_43_Is_Canteen_Consist_DinningHall_Kitchen_StoreRoom_Pantry_WashingPlace: number,
  sec_16_Rule_43_Is_Canteen_Sufficiently_Lighted: number,
  sec_16_Rule_43_Is_Canteen_Floor_Impervious_Material: number,
  sec_16_Rule_43_Is_Canteen_Wall_Lime_Washed_Once_InYear: number,
  sec_16_Rule_43_Is_Canteen_InSide_Wall_Lime_Washed_Every_Four_Month: number,
  sec_16_Rule_43_Is_Precincts_Of_Canteen_In_Clean: number,
  sec_16_Rule_43_Is_Wastewater_And_Garbage_Disposed: number,
  sec_16_Rule_44_Is_DiningHall_Accommodates_30Percent_ContractLabour: number,
  sec_16_Rule_44_Is_Area_Of_1_Mtr_Sqr_Available: number,
  sec_16_Rule_44_Is_Portion_Of_Dinning_Reserved_For_Women: number,
  sec_16_Rule_44_Is_Separate_Washing_Place_Provided: number,
  sec_16_Rule_45_Is_Provisions_Of_Rule_Complied: number,
  sec_16_Rule_46_Is_FoodStuffs_Meets_habits_Of_ContractLabour: number,
  sec_16_Rule_47_Is_Canteen_Running_No_Profit_No_Loss: number,
  sec_19_Rule_58_Is_First_Aid_Boxes_Provided: number,
  sec_19_Rule_58_60_Is_First_Aid_Boxes_Maintained: number,
  sec_19_Rule_61_62_Is_First_Aid_Boxes_InCharged_TrainedPerson: number,
  sec_21_Is_Wages_Paid: number,
  sec_29_Rule_74_Is_Contractor_Registered_In_Form_XII_Maintained_By_PE: number,
  sec_29_Rule_75_Is_Emp_Register_Maintained_By_Contractor_In_Form_XIII: number,
  sec_29_Rule_76_Is_Employee_Card_Given_In_Form_XIV: number,
  sec_29_Rule_77_Is_Service_Certificate_Form_XV_Issued: number,
  sec_29_Rule_78_Is_Muster_Roll_Form_XVI_Maintained: number,
  sec_29_Rule_78_Is_Wages_Register_Maintained_In_Form_XVII: number,
  sec_29_Rule_78_Is_Wages_Cum_Muster_Roll_Register_Maintained_In_Form_XVIII: number,
  sec_29_Rule_78_Is_Deduction_Register_Maintained_In_Form_XX: number,
  sec_29_Rule_78_Is_Fine_Register_Maintained_In_Form_XXI: number,
  sec_29_Rule_78_Is_Advances_Register_Maintained_In_Form_XXII: number,
  sec_29_Rule_78_Is_Overtime_Register_Maintained_In_Form_XXIII: number,
  sec_29_Rule_78_Is_Wages_Slip_Issue_In_Form_XIX: number,
  sec_29_Rule_78_Is_Biometric_Of_Workers_Taken: number,
  sec_29_Rule_78_Is_Provision_Of_Rule_78_1_d_Applicable: number,
  sec_29_Rule_78_Is_Provision_Of_Rule_78_2_d_Applicable: number,
  sec_29_Rule_79_Is_Notices_Prescribed_In_Rule_79_Displayed: number,
  sec_29_Rule_80_3_IsRegistered_Preserved_For_Three_Years: number,
  sec_29_Rule_80_4_IsRegistered_Produced_While_Inspection: number,
  sec_29_Rule_81_Is_Notices_Prescribed_In_Rule_Displayed: number,
  sec_29_Rule_82_Is_HalfYearlyReturn_In_Form_XXIII_Submitted: number,
  sec_29_Rule_82_Is_AnnualReturn_In_Form_XXIV_Submitted_By_PE: number
  sec_16_Rule_42_Is_Canteen_Provided_Remarks: string,
  sec_16_Rule_43_Is_Canteen_Consist_DinningHall_Kitchen_StoreRoom_Pantry_WashingPlace_Remarks: string,
  sec_16_Rule_43_Is_Canteen_Sufficiently_Lighted_Remarks: string,
  sec_16_Rule_43_Is_Canteen_Floor_Impervious_Material_Remarks: string,
  sec_16_Rule_43_Is_Canteen_Wall_Lime_Washed_Once_InYear_Remarks: string,
  sec_16_Rule_43_Is_Canteen_InSide_Wall_Lime_Washed_Every_Four_Month_Remarks: string,
  sec_16_Rule_43_Is_Precincts_Of_Canteen_In_Clean_Remarks: string,
  sec_16_Rule_43_Is_Wastewater_And_Garbage_Disposed_Remarks: string,
  sec_16_Rule_44_Is_DiningHall_Accommodates_30Percent_ContractLabour_Remarks: string,
  sec_16_Rule_44_Is_Area_Of_1_Mtr_Sqr_Available_Remarks: string,
  sec_16_Rule_44_Is_Portion_Of_Dinning_Reserved_For_Women_Remarks: string,
  sec_16_Rule_44_Is_Separate_Washing_Place_Provided_Remarks: string,
  sec_16_Rule_45_Is_Provisions_Of_Rule_Complied_Remarks: string,
  sec_16_Rule_46_Is_FoodStuffs_Meets_habits_Of_ContractLabour_Remarks: string,
  sec_16_Rule_47_Is_Canteen_Running_No_Profit_No_Loss_Remarks: string,
  sec_16_Rule_49_Is_AccountBook_Produced_While_Inspection_Remarks: string,
  sec_16_Rule_50_Is_Canteen_Audit_Performed_Remarks: string,
  sec_17_Rule_41_Is_Restroom_Provided_Remarks: string,
  ec_18_Rule_40_Is_Sufficient_Drinking_Water_Available_Remarks: string,
  sec_18_Rule_51_52_Is_Latrines_Provided_Remarks: string,
  sec_18_Rule_53_Is_Signboard_In_Latrines_Displayed_Remarks: string,
  sec_18_Rule_54_Is_Urinals_Provided_Remarks: string,
  sec_18_Rule_55_Is_Latrine_Urinals_Adequately_Lighted_Remarks: string,
  sec_18_Rule_55_Is_Latrine_Urinals_Clean_Remarks: string,
  sec_18_Rule_55_Is_Latrine_Urinals_Public_Health_Requirements_Remarks: string,
  sec_18_Rule_56_Is_Water_Supply_In_Latrine_Urinals_Remarks: string,
  sec_18_Rule_57_Is_Washing_Facilities_Provided_Remarks: string,
  sec_19_Rule_58_Is_First_Aid_Boxes_Provided_Remarks: string,
  sec_19_Rule_58_60_Is_First_Aid_Boxes_Maintained_Remarks: string,
  sec_19_Rule_61_62_Is_First_Aid_Boxes_InCharged_TrainedPerson_Remarks: string,
  sec_21_Is_Wages_Paid_Remarks: string,
  sec_29_Rule_74_Is_Contractor_Registered_In_Form_XII_Maintained_By_PE_Remarks: string,
  sec_29_Rule_75_Is_Emp_Register_Maintained_By_Contractor_In_Form_XIII_Remarks: string,
  sec_29_Rule_76_Is_Employee_Card_Given_In_Form_XIV_Remarks: string,
  sec_29_Rule_77_Is_Service_Certificate_Form_XV_Issued_Remarks: string,
  sec_29_Rule_78_Is_Muster_Roll_Form_XVI_Maintained_Remarks: string,
  sec_29_Rule_78_Is_Wages_Register_Maintained_In_Form_XVII_Remarks: string,
  sec_29_Rule_78_Is_Wages_Cum_Muster_Roll_Register_Maintained_In_Form_XVIII_Remarks: string,
  sec_29_Rule_78_Is_Deduction_Register_Maintained_In_Form_XX_Remarks: string,
  sec_29_Rule_78_Is_Fine_Register_Maintained_In_Form_XXI_Remarks: string,
  sec_29_Rule_78_Is_Advances_Register_Maintained_In_Form_XXII_Remarks: string,
  sec_29_Rule_78_Is_Overtime_Register_Maintained_In_Form_XXIII_Remarks: string,
  sec_29_Rule_78_Is_Wages_Slip_Issue_In_Form_XIX_Remarks: string,
  sec_29_Rule_78_Is_Biometric_Of_Workers_Taken_Remarks: string,
  sec_29_Rule_78_Is_Provision_Of_Rule_78_1_d_Applicable_Remarks: string,
  sec_29_Rule_78_Is_Provision_Of_Rule_78_2_d_Applicable_Remarks: string,
  sec_29_Rule_79_Is_Notices_Prescribed_In_Rule_79_Displayed_Remarks: string,
  sec_29_Rule_80_3_IsRegistered_Preserved_For_Three_Years_Remarks: string,
  sec_29_Rule_80_4_IsRegistered_Produced_While_Inspection_Remarks: string,
  sec_29_Rule_81_Is_Notices_Prescribed_In_Rule_Displayed_Remarks: string,
  sec_29_Rule_82_Is_HalfYearlyReturn_In_Form_XXIII_Submitted_Remarks: string,
  sec_29_Rule_82_Is_AnnualReturn_In_Form_XXIV_Submitted_By_PE_Remarks: string,
  sec_16_Rule_42_Is_Canteen_Provided_ViolationExist : number,
  sec_16_Rule_43_Is_Canteen_Consist_DinningHall_Kitchen_StoreRoom_Pantry_WashingPlace_ViolationExist : number,
  sec_16_Rule_43_Is_Canteen_Sufficiently_Lighted_ViolationExist : number,
  sec_16_Rule_43_Is_Canteen_Floor_Impervious_Material_ViolationExist : number,
  sec_16_Rule_43_Is_Canteen_Wall_Lime_Washed_Once_InYear_ViolationExist : number,
  sec_16_Rule_43_Is_Canteen_InSide_Wall_Lime_Washed_Every_Four_Month_ViolationExist : number,
  sec_16_Rule_43_Is_Precincts_Of_Canteen_In_Clean_ViolationExist : number,
  sec_16_Rule_43_Is_Wastewater_And_Garbage_Disposed_ViolationExist : number,
  sec_16_Rule_44_Is_DiningHall_Accommodates_30Percent_ContractLabour_ViolationExist : number,
  sec_16_Rule_44_Is_Area_Of_1_Mtr_Sqr_Available_ViolationExist : number,
  sec_16_Rule_44_Is_Portion_Of_Dinning_Reserved_For_Women_ViolationExist : number,
  sec_16_Rule_44_Is_Separate_Washing_Place_Provided_ViolationExist : number,
  sec_16_Rule_45_Is_Provisions_Of_Rule_Complied_ViolationExist : number,
  sec_16_Rule_46_Is_FoodStuffs_Meets_habits_Of_ContractLabour_ViolationExist : number,
  sec_16_Rule_47_Is_Canteen_Running_No_Profit_No_Loss_ViolationExist : number,
  sec_16_Rule_49_Is_AccountBook_Produced_While_Inspection_ViolationExist : number,
  sec_16_Rule_50_Is_Canteen_Audit_Performed_ViolationExist : number,
  sec_17_Rule_41_Is_Restroom_Provided_ViolationExist : number,
  sec_18_Rule_40_Is_Sufficient_Drinking_Water_Available_ViolationExist : number,
  sec_18_Rule_51_52_Is_Latrines_Provided_ViolationExist : number,
  sec_18_Rule_53_Is_Signboard_In_Latrines_Displayed_ViolationExist : number,
  sec_18_Rule_54_Is_Urinals_Provided_ViolationExist : number,
  sec_18_Rule_55_Is_Latrine_Urinals_Adequately_Lighted_ViolationExist : number,
  sec_18_Rule_55_Is_Latrine_Urinals_Clean_ViolationExist : number,
  sec_18_Rule_55_Is_Latrine_Urinals_Public_Health_Requirements_ViolationExist : number,
  sec_18_Rule_56_Is_Water_Supply_In_Latrine_Urinals_ViolationExist : number,
  sec_18_Rule_57_Is_Washing_Facilities_Provided_ViolationExist : number,
  sec_19_Rule_58_Is_First_Aid_Boxes_Provided_ViolationExist : number,
  sec_19_Rule_58_60_Is_First_Aid_Boxes_Maintained_ViolationExist : number,
  sec_19_Rule_61_62_Is_First_Aid_Boxes_InCharged_TrainedPerson_ViolationExist : number,
  sec_21_Is_Wages_Paid_ViolationExist : number,
  sec_29_Rule_74_Is_Contractor_Registered_In_Form_XII_Maintained_By_PE_ViolationExist : number,
  sec_29_Rule_75_Is_Emp_Register_Maintained_By_Contractor_In_Form_XIII_ViolationExist : number,
  sec_29_Rule_76_Is_Employee_Card_Given_In_Form_XIV_ViolationExist : number,
  sec_29_Rule_77_Is_Service_Certificate_Form_XV_Issued_ViolationExist : number,
  sec_29_Rule_78_Is_Muster_Roll_Form_XVI_Maintained_ViolationExist : number,
  sec_29_Rule_78_Is_Wages_Register_Maintained_In_Form_XVII_ViolationExist : number,
  sec_29_Rule_78_Is_Wages_Cum_Muster_Roll_Register_Maintained_In_Form_XVIII_ViolationExist : number,
  sec_29_Rule_78_Is_Deduction_Register_Maintained_In_Form_XX_ViolationExist : number,
  sec_29_Rule_78_Is_Fine_Register_Maintained_In_Form_XXI_ViolationExist : number,
  sec_29_Rule_78_Is_Advances_Register_Maintained_In_Form_XXII_ViolationExist : number,
  sec_29_Rule_78_Is_Overtime_Register_Maintained_In_Form_XXIII_ViolationExist : number,
  sec_29_Rule_78_Is_Wages_Slip_Issue_In_Form_XIX_ViolationExist : number,
  sec_29_Rule_78_Is_Biometric_Of_Workers_Taken_ViolationExist : number,
  sec_29_Rule_78_Is_Provision_Of_Rule_78_1_d_Applicable_ViolationExist : number,
  sec_29_Rule_78_Is_Provision_Of_Rule_78_2_d_Applicable_ViolationExist : number,
  sec_29_Rule_79_Is_Notices_Prescribed_In_Rule_79_Displayed_ViolationExist : number,
  sec_29_Rule_80_3_IsRegistered_Preserved_For_Three_Years_ViolationExist : number,
  sec_29_Rule_80_4_IsRegistered_Produced_While_Inspection_ViolationExist : number,
  sec_29_Rule_81_Is_Notices_Prescribed_In_Rule_Displayed_ViolationExist : number,
  sec_29_Rule_82_Is_HalfYearlyReturn_In_Form_XXIII_Submitted_ViolationExist : number,
  sec_29_Rule_82_Is_AnnualReturn_In_Form_XXIV_Submitted_By_PE_ViolationExist : number,

  inspectionRefId: number;
}
export interface Inspection_Form_Labour_III_InterStateMigrantWorkmenAct {
  id: number,
  sec_16_Rule_41_Is_Canteen_Provided : number;
      sec_16_Rule_41_Is_Canteen_Consist_DinningHall_Kitchen_StoreRoom_Pantry_WashingPlace : number;
      sec_16_Rule_41_Is_Canteen_Sufficiently_Lighted : number;
      sec_16_Rule_41_Is_Canteen_Floor_Impervious_Material : number;
      sec_16_Rule_41_Is_Canteen_Wall_Lime_Washed_Once_InYear : number;
      sec_16_Rule_41_Is_Canteen_InSide_Wall_Lime_Washed_Every_Four_Month : number;
      sec_16_Rule_41_Is_Precincts_Of_Canteen_In_Clean : number;
      sec_16_Rule_41_Is_Wastewater_And_Garbage_Disposed : number;
      sec_16_Rule_41_Is_DiningHall_Accommodates_30Percent_ContractLabour : number;
      sec_16_Rule_41_Is_Area_Of_1_Mtr_Sqr_Available : number;
      sec_16_Rule_41_Is_Portion_Of_Dinning_Reserved_For_Women : number;
      sec_16_Rule_41_Is_Separate_Washing_Place_Provided : number;
      sec_16_Rule_41_Is_Provisions_Of_Rule_Complied : number;
      sec_16_Rule_41_Is_FoodStuffs_Meets_habits_Of_ContractLabour : number;
      sec_16_Rule_41_Is_Canteen_Running_No_Profit_No_Loss : number;
      sec_16_Rule_41_Is_AccountBook_Produced_While_Inspection : number;
      sec_16_Rule_41_Is_Canteen_Audit_Performed : number;
      sec_16_Rule_40_Is_Restroom_Provided : number;
      sec_16_Rule_39_Is_Sufficient_Drinking_Water_Available : number;
      sec_16_Rule_42_Is_Latrines_Provided : number;
      sec_16_Rule_42_Is_Signboard_In_Latrines_Displayed : number;
      sec_16_Rule_42_Is_Urinals_Provided : number;
      sec_16_Rule_42_Is_Latrine_Urinals_Adequately_Lighted : number;
      sec_16_Rule_42_Is_Latrine_Urinals_Clean : number;
      sec_16_Rule_42_Is_Latrine_Urinals_Public_Health_Requirements : number;
      sec_16_Rule_42_Is_Water_Supply_In_Latrine_Urinals : number;
      sec_16_Rule_43_Is_Washing_Facilities_Provided : number;
      sec_16_Rule_37_Is_Medical_Facility_Provided_By_Contractor : number;
      sec_16_Rule_37_Is_Medicines_Cost_Reimburse_By_Contractor : number;
      sec_16_Rule_37_Is_Family_Hospital_Expenses_Bearing_By_Contractor : number;
      sec_16_Rule_37_Is_First_Aid_Boxes_Provided : number;
      sec_16_Rule_37_Is_First_Aid_Boxes_Maintained : number;
      sec_16_Rule_37_Is_First_Aid_Boxes_InCharged_TrainedPerson : number;
      sec_16_Rule_38_Is_Protective_Clothes_Provided : number;
      sec_16_Rule_44_Is_Creche_Provided : number;
      sec_16_Rule_45_Is_Residential_Accommodation_Provided : number;
      sec_12_Rule_21_Is_Contractor_Furnished_Particulars_In_Form_X : number;
      sec_12_Rule_22_Is_Contractor_Paid_Return_Fair_To_Migrant : number;
      sec_12_Rule_23_Is_Passbook_Issued_To_Every_Migrant : number;
      sec_12_Rule_24_Is_Return_In_Form_XI_Submitted_By_Contractor : number;
      sec_13_Rule_25_Is_Wages_Paid_To_Workers : number;
      sec_17_Rule_28_Is_Wages_Payment_Made_On_7_or_10_Every_Month : number;
      rule_33_Is_Notice_Displayed : number;
      rule_35_Is_Signing_Certificate_Given_In_Wages_Register : number;
      sec_33_Rule_48_Is_Contractor_Register_Maintained_In_Form_XII_By_PE : number;
      sec_33_35_Rule_49_Is_Contractor_Maintained_Employee_Register_In_Form_XIII : number;
      sec_35_Rule_50_Is_Service_Certificate_Issued_To_Workers : number;
      sec_23_Rule_51_Is_Contractor_Maintained_Displacement_Cum_Outward_Journey_Allowance : number;
      sec_23_Rule_51_Is_Contractor_Maintained_Return_Journey_Allowance : number;
      sec_23_Rule_52_Is_Rule_52_1_Applicable : number;
      sec_23_Rule_52_Is_Muster_Roll_Form_XVII_Maintained : number;
      sec_23_Rule_52_Is_Wages_Register_Maintained_In_Form_XVIII : number;
      sec_23_Rule_52_Is_Wages_Cum_Muster_Roll_Register_Maintained_In_Form_XVIII : number;
      sec_23_Rule_52_Is_Deduction_Register_Maintained_In_Form_XIX : number;
      sec_23_Rule_52_Is_Fine_Register_Maintained_In_Form_XX : number;
      sec_23_Rule_52_Is_Advances_Register_Maintained_In_Form_XXI : number;
      sec_23_Rule_52_Is_Overtime_Register_Maintained_In_Form_XXII : number;
      sec_23_Rule_52_Is_Biometric_Of_Workers_Taken : number;
      sec_23_Rule_52_Is_Provision_Of_Rule_52_3_Applicable : number;
      sec_23_Rule_54_Is_Notices_Prescribed_In_Rule_79_Displayed : number;
      sec_23_Rule_53_IsRegistered_Preserved_For_Three_Years : number;
      sec_23_Rule_53_IsRegistered_Produced_While_Inspection : number;
      sec_23_Rule_55_Is_Notices_Prescribed_In_Rule_Displayed : number;
      sec_23_Rule_56_Is_HalfYearlyReturn_In_Form_XXIII_Submitted: number;
      sec_23_Rule_56_Is_AnnualReturn_In_Form_XXIV_Submitted_By_PE : number;
    
      sec_16_Rule_41_Is_Canteen_Provided_Remarks : string;
      sec_16_Rule_41_Is_Canteen_Consist_DinningHall_Kitchen_StoreRoom_Pantry_WashingPlace_Remarks : string;
      sec_16_Rule_41_Is_Canteen_Sufficiently_Lighted_Remarks : string;
      sec_16_Rule_41_Is_Canteen_Floor_Impervious_Material_Remarks : string;
      sec_16_Rule_41_Is_Canteen_Wall_Lime_Washed_Once_InYear_Remarks : string;
      sec_16_Rule_41_Is_Canteen_InSide_Wall_Lime_Washed_Every_Four_Month_Remarks : string;
      sec_16_Rule_41_Is_Precincts_Of_Canteen_In_Clean_Remarks : string;
      sec_16_Rule_41_Is_Wastewater_And_Garbage_Disposed_Remarks : string;
      sec_16_Rule_41_Is_DiningHall_Accommodates_30Percent_ContractLabour_Remarks : string;
      sec_16_Rule_41_Is_Area_Of_1_Mtr_Sqr_Available_Remarks : string;
      sec_16_Rule_41_Is_Portion_Of_Dinning_Reserved_For_Women_Remarks : string;
      sec_16_Rule_41_Is_Separate_Washing_Place_Provided_Remarks : string;
      sec_16_Rule_41_Is_Provisions_Of_Rule_Complied_Remarks : string;
      sec_16_Rule_41_Is_FoodStuffs_Meets_habits_Of_ContractLabour_Remarks : string;
      sec_16_Rule_41_Is_Canteen_Running_No_Profit_No_Loss_Remarks : string;
      sec_16_Rule_41_Is_AccountBook_Produced_While_Inspection_Remarks : string;
      sec_16_Rule_41_Is_Canteen_Audit_Performed_Remarks : string;
      sec_16_Rule_40_Is_Restroom_Provided_Remarks : string;
      sec_16_Rule_39_Is_Sufficient_Drinking_Water_Available_Remarks : string;
      sec_16_Rule_42_Is_Latrines_Provided_Remarks : string;
      sec_16_Rule_42_Is_Signboard_In_Latrines_Displayed_Remarks : string;
      sec_16_Rule_42_Is_Urinals_Provided_Remarks : string;
      sec_16_Rule_42_Is_Latrine_Urinals_Adequately_Lighted_Remarks : string;
      sec_16_Rule_42_Is_Latrine_Urinals_Clean_Remarks : string;
      sec_16_Rule_42_Is_Latrine_Urinals_Public_Health_Requirements_Remarks : string;
      sec_16_Rule_42_Is_Water_Supply_In_Latrine_Urinals_Remarks : string;
      sec_16_Rule_43_Is_Washing_Facilities_Provided_Remarks : string;
      sec_16_Rule_37_Is_Medical_Facility_Provided_By_Contractor_Remarks : string;
      sec_16_Rule_37_Is_Medicines_Cost_Reimburse_By_Contractor_Remarks : string;
      sec_16_Rule_37_Is_Family_Hospital_Expenses_Bearing_By_Contractor_Remarks : string;
      sec_16_Rule_37_Is_First_Aid_Boxes_Provided_Remarks : string;
      sec_16_Rule_37_Is_First_Aid_Boxes_Maintained_Remarks : string;
      sec_16_Rule_37_Is_First_Aid_Boxes_InCharged_TrainedPerson_Remarks : string;
      sec_16_Rule_38_Is_Protective_Clothes_Provided_Remarks : string;
      sec_16_Rule_44_Is_Creche_Provided_Remarks : string;
      sec_16_Rule_45_Is_Residential_Accommodation_Provided_Remarks : string;
      sec_12_Rule_21_Is_Contractor_Furnished_Particulars_In_Form_X_Remarks : string;
      sec_12_Rule_22_Is_Contractor_Paid_Return_Fair_To_Migrant_Remarks : string;
      sec_12_Rule_23_Is_Passbook_Issued_To_Every_Migrant_Remarks : string;
      sec_12_Rule_24_Is_Return_In_Form_XI_Submitted_By_Contractor_Remarks : string;
      sec_13_Rule_25_Is_Wages_Paid_To_Workers_Remarks : string;
      sec_17_Rule_28_Is_Wages_Payment_Made_On_7_or_10_Every_Month_Remarks : string;
      rule_33_Is_Notice_Displayed_Remarks : string;
      rule_35_Is_Signing_Certificate_Given_In_Wages_Register_Remarks : string;
      sec_33_Rule_48_Is_Contractor_Register_Maintained_In_Form_XII_By_PE_Remarks : string;
      sec_33_35_Rule_49_Is_Contractor_Maintained_Employee_Register_In_Form_XIII_Remarks : string;
      sec_35_Rule_50_Is_Service_Certificate_Issued_To_Workers_Remarks : string;
      sec_23_Rule_51_Is_Contractor_Maintained_Displacement_Cum_Outward_Journey_Allowance_Remarks : string;
      sec_23_Rule_51_Is_Contractor_Maintained_Return_Journey_Allowance_Remarks : string;
      sec_23_Rule_52_Is_Rule_52_1_Applicable_Remarks : string;
      sec_23_Rule_52_Is_Muster_Roll_Form_XVII_Maintained_Remarks : string;
      sec_23_Rule_52_Is_Wages_Register_Maintained_In_Form_XVIII_Remarks : string;
      sec_23_Rule_52_Is_Wages_Cum_Muster_Roll_Register_Maintained_In_Form_XVIII_Remarks : string;
      sec_23_Rule_52_Is_Deduction_Register_Maintained_In_Form_XIX_Remarks : string;
      sec_23_Rule_52_Is_Fine_Register_Maintained_In_Form_XX_Remarks : string;
      sec_23_Rule_52_Is_Advances_Register_Maintained_In_Form_XXI_Remarks : string;
      sec_23_Rule_52_Is_Overtime_Register_Maintained_In_Form_XXII_Remarks : string;
      sec_23_Rule_52_Is_Biometric_Of_Workers_Taken_Remarks : string;
      sec_23_Rule_52_Is_Provision_Of_Rule_52_3_Applicable_Remarks : string;
      sec_23_Rule_54_Is_Notices_Prescribed_In_Rule_79_Displayed_Remarks : string;
      sec_23_Rule_53_IsRegistered_Preserved_For_Three_Years_Remarks : string;
      sec_23_Rule_53_IsRegistered_Produced_While_Inspection_Remarks : string;
      sec_23_Rule_55_Is_Notices_Prescribed_In_Rule_Displayed_Remarks : string;
      sec_23_Rule_56_Is_HalfYearlyReturn_In_Form_XXIII_Submitted_Remarks : string;
      sec_23_Rule_56_Is_AnnualReturn_In_Form_XXIV_Submitted_By_PE_Remarks : string;

  sec_16_Rule_41_Is_Canteen_Provided_ViolationExist : number,
  sec_16_Rule_41_Is_Canteen_Consist_DinningHall_Kitchen_StoreRoom_Pantry_WashingPlace_ViolationExist : number,
  sec_16_Rule_41_Is_Canteen_Sufficiently_Lighted_ViolationExist : number,
  sec_16_Rule_41_Is_Canteen_Floor_Impervious_Material_ViolationExist : number,
  sec_16_Rule_41_Is_Canteen_Wall_Lime_Washed_Once_InYear_ViolationExist : number,
  sec_16_Rule_41_Is_Canteen_InSide_Wall_Lime_Washed_Every_Four_Month_ViolationExist : number,
  sec_16_Rule_41_Is_Precincts_Of_Canteen_In_Clean_ViolationExist : number,
  sec_16_Rule_41_Is_Wastewater_And_Garbage_Disposed_ViolationExist : number,
  sec_16_Rule_41_Is_DiningHall_Accommodates_30Percent_ContractLabour_ViolationExist : number,
  sec_16_Rule_41_Is_Area_Of_1_Mtr_Sqr_Available_ViolationExist : number,
  sec_16_Rule_41_Is_Portion_Of_Dinning_Reserved_For_Women_ViolationExist : number,
  sec_16_Rule_41_Is_Separate_Washing_Place_Provided_ViolationExist : number,
  sec_16_Rule_41_Is_Provisions_Of_Rule_Complied_ViolationExist : number,
  sec_16_Rule_41_Is_FoodStuffs_Meets_habits_Of_ContractLabour_ViolationExist : number,
  sec_16_Rule_41_Is_Canteen_Running_No_Profit_No_Loss_ViolationExist : number,
  sec_16_Rule_41_Is_AccountBook_Produced_While_Inspection_ViolationExist : number,
  sec_16_Rule_41_Is_Canteen_Audit_Performed_ViolationExist : number,

  sec_16_Rule_40_Is_Restroom_Provided_ViolationExist : number,
  sec_16_Rule_39_Is_Sufficient_Drinking_Water_Available_ViolationExist : number,
  sec_16_Rule_42_Is_Latrines_Provided_ViolationExist : number,
  sec_16_Rule_42_Is_Signboard_In_Latrines_Displayed_ViolationExist : number,
  sec_16_Rule_42_Is_Urinals_Provided_ViolationExist : number,
  sec_16_Rule_42_Is_Latrine_Urinals_Adequately_Lighted_ViolationExist : number,
  sec_16_Rule_42_Is_Latrine_Urinals_Clean_ViolationExist : number,
  sec_16_Rule_42_Is_Latrine_Urinals_Public_Health_Requirements_ViolationExist : number,
  sec_16_Rule_42_Is_Water_Supply_In_Latrine_Urinals_ViolationExist : number,
  sec_16_Rule_43_Is_Washing_Facilities_Provided_ViolationExist : number,
  sec_16_Rule_37_Is_Medical_Facility_Provided_By_Contractor_ViolationExist : number,
  sec_16_Rule_37_Is_Medicines_Cost_Reimburse_By_Contractor_ViolationExist : number,
  sec_16_Rule_37_Is_Family_Hospital_Expenses_Bearing_By_Contractor_ViolationExist : number,
  sec_16_Rule_37_Is_First_Aid_Boxes_Provided_ViolationExist : number,
  sec_16_Rule_37_Is_First_Aid_Boxes_Maintained_ViolationExist : number,
  sec_16_Rule_37_Is_First_Aid_Boxes_InCharged_TrainedPerson_ViolationExist : number,
  sec_16_Rule_38_Is_Protective_Clothes_Provided_ViolationExist : number,

  sec_16_Rule_44_Is_Creche_Provided_ViolationExist : number,
  sec_16_Rule_45_Is_Residential_Accommodation_Provided_ViolationExist : number,
  sec_12_Rule_21_Is_Contractor_Furnished_Particulars_In_Form_X_ViolationExist : number,
  sec_12_Rule_22_Is_Contractor_Paid_Return_Fair_To_Migrant_ViolationExist : number,
  sec_12_Rule_23_Is_Passbook_Issued_To_Every_Migrant_ViolationExist : number,
  sec_12_Rule_24_Is_Return_In_Form_XI_Submitted_By_Contractor_ViolationExist : number,
  sec_13_Rule_25_Is_Wages_Paid_To_Workers_ViolationExist : number,
  sec_17_Rule_28_Is_Wages_Payment_Made_On_7_or_10_Every_Month_ViolationExist : number,
  rule_33_Is_Notice_Displayed_ViolationExist : number,
  rule_35_Is_Signing_Certificate_Given_In_Wages_Register_ViolationExist : number,
  sec_33_Rule_48_Is_Contractor_Register_Maintained_In_Form_XII_By_PE_ViolationExist : number,
  sec_33_35_Rule_49_Is_Contractor_Maintained_Employee_Register_In_Form_XIII_ViolationExist : number,
  sec_35_Rule_50_Is_Service_Certificate_Issued_To_Workers_ViolationExist : number,
  sec_23_Rule_51_Is_Contractor_Maintained_Displacement_Cum_Outward_Journey_Allowance_ViolationExist : number,
  sec_23_Rule_51_Is_Contractor_Maintained_Return_Journey_Allowance_ViolationExist : number,
  sec_23_Rule_52_Is_Rule_52_1_Applicable_ViolationExist : number,
  sec_23_Rule_52_Is_Muster_Roll_Form_XVII_Maintained_ViolationExist : number,
  sec_23_Rule_52_Is_Wages_Register_Maintained_In_Form_XVIII_ViolationExist : number,
  sec_23_Rule_52_Is_Wages_Cum_Muster_Roll_Register_Maintained_In_Form_XVIII_ViolationExist : number,

  sec_23_Rule_52_Is_Deduction_Register_Maintained_In_Form_XIX_ViolationExist : number,
  sec_23_Rule_52_Is_Fine_Register_Maintained_In_Form_XX_ViolationExist : number,
  sec_23_Rule_52_Is_Advances_Register_Maintained_In_Form_XXI_ViolationExist : number,
  sec_23_Rule_52_Is_Overtime_Register_Maintained_In_Form_XXII_ViolationExist : number,
  sec_23_Rule_52_Is_Biometric_Of_Workers_Taken_ViolationExist : number,
  sec_23_Rule_52_Is_Provision_Of_Rule_52_3_Applicable_ViolationExist : number,
  sec_23_Rule_54_Is_Notices_Prescribed_In_Rule_79_Displayed_ViolationExist : number,
  sec_23_Rule_53_IsRegistered_Preserved_For_Three_Years_ViolationExist : number,
  sec_23_Rule_53_IsRegistered_Produced_While_Inspection_ViolationExist : number,
  sec_23_Rule_55_Is_Notices_Prescribed_In_Rule_Displayed_ViolationExist : number,
  sec_23_Rule_56_Is_HalfYearlyReturn_In_Form_XXIII_Submitted_ViolationExist : number,
  sec_23_Rule_56_Is_AnnualReturn_In_Form_XXIV_Submitted_By_PE_ViolationExist : number,

  inspectionRefId: number;
}
export interface Inspection_Form_Labour_III_LabourWelfareFund_Act {
  id: number,
  isLabourWelfareFund_Paid : boolean,
  depositedDate : string,
  depositedAmount : number,
  establishmentName : string,
  period : string,
  noOfWorkers : number,
  contributionAmount : number,
  unpaidAccumulation : string,
  contributionPaidAndPeriod : string,
  unclaimedPaidOrNot : string,
  remarks : string,
  inspectionRefId: number;
  contributionAmountStillPayable : string,
  unclaimedPaidAndPeriod :string,
}
export interface Inspection_Form_Labour_III_GratuityAct {
  id : number,
  rule_3_Is_Notice_In_Form_A_Given : number,
  rule_3_Is_Notice_In_Form_A_Given_Remarks : string,
  rule_4_Is_Notice_Displayed : number,
  rule_4_Is_Notice_Displayed_Remarks : string,
  rule_5_Is_Notice_In_Form_D_E_Given : number,
  rule_5_Is_Notice_In_Form_D_E_Given_Remarks : string,
  rule_6_Rule_6_Is_Nominee_Filled_By_Employee_In_Form_F : number,
  rule_6_Rule_6_Is_Nominee_Filled_By_Employee_In_Form_F_Remarks : string,
  rule_8_Is_Notice_In_Form_L_M_Endorsed_To_Authority : number,
  rule_8_Is_Notice_In_Form_L_M_Endorsed_To_Authority_Remarks : string,
  rule_20_Is_Notice_In_Form_U_Displayed : number,
  rule_20_Is_Notice_In_Form_U_Displayed_Remarks : string,
  rule_3_Is_Notice_In_Form_A_Given_ViolationExist : number,
  rule_4_Is_Notice_Displayed_ViolationExist : number,
  rule_5_Is_Notice_In_Form_D_E_Given_ViolationExist : number,
  rule_6_Rule_6_Is_Nominee_Filled_By_Employee_In_Form_F_ViolationExist : number,
  rule_8_Is_Notice_In_Form_L_M_Endorsed_To_Authority_ViolationExist : number,
  rule_20_Is_Notice_In_Form_U_Displayed_ViolationExist: number,
  inspectionRefId: number;
}
export interface Inspection_Form_Labour_III_IndustrialEmploymentAct {
  id: number;
  sec_1_3_Is_Act_Applicable_On_Establishment: number;
  sec_1_3_Is_Act_Applicable_On_Establishment_Remarks: string;
  sec_5_Is_Establishment_Fall_In_Exempted_Category: number;
  sec_5_Is_Establishment_Fall_In_Exempted_Category_Remarks: string;
  sec_5_Is_Establishment_Complying_Provission_Of_Notification: number;
  sec_5_Is_Establishment_Complying_Provission_Of_Notification_Remarks: string;
  sec_5_Is_Standing_Orders_Submitted_By_Certifying_Officer: number;
  sec_5_Is_Standing_Orders_Submitted_By_Certifying_Officer_Remarks: string;
  sec_6_Is_Any_Appeal_Pending_With_Appellate_Authority: number;
  sec_6_Is_Any_Appeal_Pending_With_Appellate_Authority_Remarks: string;
  sec_9_Is_Standing_Order_Posted_By_Employer: number;
  sec_9_Is_Standing_Order_Posted_By_Employer_Remarks: string;
  sec_10_A_Is_Subsistence_Allowance_Given_To_Suspended_Workmen: number;
  sec_10_A_Is_Subsistence_Allowance_Given_To_Suspended_Workmen_Remarks: string;
  sec_1_3_Is_Act_Applicable_On_Establishment_ViolationExist : number,
  sec_5_Is_Establishment_Fall_In_Exempted_Category_ViolationExist : number,
  sec_5_Is_Establishment_Complying_Provission_Of_Notification_ViolationExist : number,
  sec_5_Is_Standing_Orders_Submitted_By_Certifying_Officer_ViolationExist : number,
  sec_6_Is_Any_Appeal_Pending_With_Appellate_Authority_ViolationExist : number,
  sec_9_Is_Standing_Order_Posted_By_Employer_ViolationExist: number,
  sec_10_A_Is_Subsistence_Allowance_Given_To_Suspended_Workmen_ViolationExist: number,
  inspectionRefId: number;
}
export interface Inspection_Form_Labour_III_BOCW_Act {
  id: number,
  is_Construction_Establishment_Registered_Under_Act: number;
  is_Construction_Establishment_Registered_Under_Act_Remarks: string;
  is_Engaged_Workers_Registered_Under_Act: number;
  is_Engaged_Workers_Registered_Under_Act_Remarks: string;
  is_Employer_Submitted_Commencement_Completion_Notice: number;
  is_Employer_Submitted_Commencement_Completion_Notice_Remarks: string;
  is_Employer_Submitted_Form_I_Within_30Days_Commencement_Of_Work: number;
  is_Employer_Submitted_Form_I_Within_30Days_Commencement_Of_Work_Remarks: string;
  is_One_Percent_Cess_Being_Paid_Of_Total_Cost: number;
  is_One_Percent_Cess_Being_Paid_Of_Total_Cost_Remarks: string;
  is_Establishment_Maintained_Muster_Roll_In_Form_XVI: number;
  is_Establishment_Maintained_Muster_Roll_In_Form_XVI_Remarks: string;
  is_Establishment_Maintained_Wages_Register_In_Form_XVII: number;
  is_Establishment_Maintained_Wages_Register_In_Form_XVII_Remarks: string;
  is_Establishment_Maintained_Overtime_Register_In_Form_XXII: number;
  is_Establishment_Maintained_Overtime_Register_In_Form_XXII_Remarks: string;
  is_Employer_Provide_Working_Conditions_To_Workers: number;
  is_Employer_Provide_Working_Conditions_To_Workers_Remarks: string;
  is_Employer_Submitted_Annual_Return: number;
  is_Employer_Submitted_Annual_Return_Remarks: string;
  is_Employer_Ensured_Safety_Measures: number;
  is_Employer_Ensured_Safety_Measures_Remarks: string;
  is_Any_Nature_Of_Violation_Found: number;
  is_Any_Nature_Of_Violation_Found_Remarks: string;
  is_Construction_Establishment_Registered_Under_Act_ViolationExist : number,
  is_Engaged_Workers_Registered_Under_Act_ViolationExist : number,
  is_Employer_Submitted_Commencement_Completion_Notice_ViolationExist : number,
  is_Employer_Submitted_Form_I_Within_30Days_Commencement_Of_Work_ViolationExist : number,
  is_One_Percent_Cess_Being_Paid_Of_Total_Cost_ViolationExist : number,
  is_Establishment_Maintained_Muster_Roll_In_Form_XVI_ViolationExist: number,
  is_Establishment_Maintained_Wages_Register_In_Form_XVII_ViolationExist: number,
  is_Establishment_Maintained_Overtime_Register_In_Form_XXII_ViolationExist: number,
  is_Employer_Provide_Working_Conditions_To_Workers_ViolationExist: number,
  is_Employer_Submitted_Annual_Return_ViolationExist: number,
  is_Employer_Ensured_Safety_Measures_ViolationExist: number,
  is_Any_Nature_Of_Violation_Found_ViolationExist: number,
  inspectionRefId: number;
}
export interface Inspection_Form_Labour_III_ShopAct {
  id : number,
  natureOfBusinessType : number,
  noOfWorkerMale : number,
  noOfWorkerFemale : number,
  noOfWorkerYoungPerson : number,
  noOfWorkerChild : number,
  is_Registration_Certificate_Obtained : string,
  is_Registration_Certificate_Valid : string,
  is_Shop_Or_Esablishment_Obtained_Exemption : string,
  wagesPeriod : string,
  wagesPaymentDate : string,
  wagesPaymentModeType : number,
  isViolationFound : number,
  remarks : string,
  inspectionRefId: number;
}
export interface Inspection_Form_Labour_III_Observations {
  id : number,
  is_Spread_Over_Being_Observed_During_Rest : number,
  is_Spread_Over_Being_Observed_During_Rest_Remarks : string,
  is_Any_Child_Employee_Found : number,
  is_Any_Child_Employee_Found_Remarks : string,
  is_Working_Hours_Adhered_For_Women_Young_Person : number,
  is_Working_Hours_Adhered_For_Women_Young_Person_Remarks : string,
  is_Opening_Closing_Hours_Observed : number,
  is_Opening_Closing_Hours_Observed_Remarks : string,
  is_Weekly_Holiday_Provided : number,
  is_Weekly_Holiday_Provided_Remarks : string,
  is_Overtime_Paid_For_Holiday_Work : number,
  is_Overtime_Paid_For_Holiday_Work_Remarks : string,
  any_Deduction_Of_Wages : number,
  any_Deduction_Of_Wages_Remarks : string,
  any_Fine_Imposed_For_Damage_Loss : number,
  any_Fine_Imposed_For_Damage_Loss_Remarks : string,
  is_Fine_Realized_Utilized_As_Per_Gov_Guidline : number,
  is_Fine_Realized_Utilized_As_Per_Gov_Guidline_Remarks : string,
  is_Leaves_Given_To_Employees : number,
  is_Leaves_Given_To_Employees_Remarks : string,
  is_Cleanliness : number,
  is_Cleanliness_Remarks: string,
  is_There_Ventilation_And_Lighting : number,
  is_There_Ventilation_And_Lighting_Remarks : string,
  is_There_Drinking_Water_Facility : number,
  is_There_Drinking_Water_Facility_Remarks : string,
  any_Precaution_Against_Fire : number,
  any_Precaution_Against_Fire_Remarks : string,
  is_Spread_Over_Being_Observed_During_Rest_ViolationExist : number,
  is_Any_Child_Employee_Found_ViolationExist : number,
  is_Working_Hours_Adhered_For_Women_Young_Person_ViolationExist : number,
  is_Opening_Closing_Hours_Observed_ViolationExist : number,
  is_Weekly_Holiday_Provided_ViolationExist : number,
  is_Overtime_Paid_For_Holiday_Work_ViolationExist: number,
  any_Deduction_Of_Wages_ViolationExist: number,
  any_Fine_Imposed_For_Damage_Loss_ViolationExist: number,
  is_Fine_Realized_Utilized_As_Per_Gov_Guidline_ViolationExist: number,
  is_Leaves_Given_To_Employees_ViolationExist: number,
  is_Cleanliness_ViolationExist: number,
  is_There_Ventilation_And_Lighting_ViolationExist: number,
  is_There_Drinking_Water_Facility_ViolationExist: number,
  any_Precaution_Against_Fire_ViolationExist: number,


}

export type ILock_InspectionViewModel = {
  userRefId: string,
  inspectionRefId : number,
  inspectionFactoryExistenceType : number,
  inspectionDate : Date,
  inspectionEstablishmentType: number, 
  factoryDeRegistrationNo: string,
  remarks: string,
  email : string,
  mobileNo : string,
  appId : number,
  isLegacy : boolean
}

export type InspectionFactoryDetailsViewModel = {
  factoryName: string,
  factoryAddress : string,
  occupierName : string,
  occupierAddress : string,
  managerName: string, 
  managerAddress: string,
  manufacturingProcess: string,
  lastInspectionDate : Date
}

export interface licenceNumber {
  licenceNumber: string,
  
}

export type InspectionProcess = {
  appActionType: number;
  receiver_UserRefId: string;
  remarks: string;
  inspectionRefId: number;
  pdfNameGUID: string;
  userId: string;
  isDocumentUploaded: boolean;
  appDocumentRefId: number;
  attachmentName: string;
  ipAddress : string,
  latitude : string,
  longitude : string,
  allowedDays: number,
  inspectionType: number
};

