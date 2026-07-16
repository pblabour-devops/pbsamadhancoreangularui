import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonService } from 'src/app/common/common.service';
import { TForm, GenericFormModel } from 'src/app/generic-implementation/generic-form-builder.type';
import { GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { Inspection_Form_Labour_III_InterStateMigrantWorkmenAct } from '../../Inspections-typed-models';


@Component({
    selector: 'app-labour-part-iii-inter-state-migrant-workmen-act',
    templateUrl: './labour-part-iii-inter-state-migrant-workmen-act.component.html',
    styleUrls: ['./labour-part-iii-inter-state-migrant-workmen-act.component.css'],
    standalone: false
})
export class LabourPartIiiInterStateMigrantWorkmenActComponent implements OnInit {
  @Input() jsonData: any;
  Input_Form: TForm<Inspection_Form_Labour_III_InterStateMigrantWorkmenAct>;
  private ngUnsubscribe = new Subject<void>();
  genericFormData: GenericFormModel<Inspection_Form_Labour_III_InterStateMigrantWorkmenAct>;
  submitted: boolean = false;
  hasSubmitClicked: boolean = false;
  defaultValue:"N/A";
  characterCounts: { [key: string]: number } = {};
  controlMaxLengthNames: { [key: string]: number } = {};
  public parmamEncodedinfo:string;
  public paramInfo:any;
  public hasViolationFound : string;
  constructor(
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    public commonOpsService: CommonOpsService,
    public common: CommonService,
    private fb: UntypedFormBuilder,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.Input_Form = this.fb.group({
      id: [0,Validators.required],
      sec_16_Rule_41_Is_Canteen_Provided : ['-1'],
      sec_16_Rule_41_Is_Canteen_Consist_DinningHall_Kitchen_StoreRoom_Pantry_WashingPlace : ['-1'],
      sec_16_Rule_41_Is_Canteen_Sufficiently_Lighted : ['-1'],
      sec_16_Rule_41_Is_Canteen_Floor_Impervious_Material : ['-1'],
      sec_16_Rule_41_Is_Canteen_Wall_Lime_Washed_Once_InYear : ['-1'],
      sec_16_Rule_41_Is_Canteen_InSide_Wall_Lime_Washed_Every_Four_Month : ['-1'],
      sec_16_Rule_41_Is_Precincts_Of_Canteen_In_Clean : ['-1'],
      sec_16_Rule_41_Is_Wastewater_And_Garbage_Disposed : ['-1'],
      sec_16_Rule_41_Is_DiningHall_Accommodates_30Percent_ContractLabour : ['-1'],
      sec_16_Rule_41_Is_Area_Of_1_Mtr_Sqr_Available : ['-1'],
      sec_16_Rule_41_Is_Portion_Of_Dinning_Reserved_For_Women : ['-1'],
      sec_16_Rule_41_Is_Separate_Washing_Place_Provided : ['-1'],
      sec_16_Rule_41_Is_Provisions_Of_Rule_Complied : ['-1'],
      sec_16_Rule_41_Is_FoodStuffs_Meets_habits_Of_ContractLabour : ['-1'],
      sec_16_Rule_41_Is_Canteen_Running_No_Profit_No_Loss : ['-1'],
      sec_16_Rule_41_Is_AccountBook_Produced_While_Inspection : ['-1'],
      sec_16_Rule_41_Is_Canteen_Audit_Performed : ['-1'],
      sec_16_Rule_40_Is_Restroom_Provided : ['-1'],
      sec_16_Rule_39_Is_Sufficient_Drinking_Water_Available : ['-1'],
      sec_16_Rule_42_Is_Latrines_Provided : ['-1'],
      sec_16_Rule_42_Is_Signboard_In_Latrines_Displayed : ['-1'],
      sec_16_Rule_42_Is_Urinals_Provided : ['-1'],
      sec_16_Rule_42_Is_Latrine_Urinals_Adequately_Lighted : ['-1'],
      sec_16_Rule_42_Is_Latrine_Urinals_Clean : ['-1'],
      sec_16_Rule_42_Is_Latrine_Urinals_Public_Health_Requirements : ['-1'],
      sec_16_Rule_42_Is_Water_Supply_In_Latrine_Urinals : ['-1'],
      sec_16_Rule_43_Is_Washing_Facilities_Provided : ['-1'],
      sec_16_Rule_37_Is_Medical_Facility_Provided_By_Contractor : ['-1'],
      sec_16_Rule_37_Is_Medicines_Cost_Reimburse_By_Contractor : ['-1'],
      sec_16_Rule_37_Is_Family_Hospital_Expenses_Bearing_By_Contractor : ['-1'],
      sec_16_Rule_37_Is_First_Aid_Boxes_Provided : ['-1'],
      sec_16_Rule_37_Is_First_Aid_Boxes_Maintained : ['-1'],
      sec_16_Rule_37_Is_First_Aid_Boxes_InCharged_TrainedPerson : ['-1'],
      sec_16_Rule_38_Is_Protective_Clothes_Provided : ['-1'],
      sec_16_Rule_44_Is_Creche_Provided : ['-1'],
      sec_16_Rule_45_Is_Residential_Accommodation_Provided : ['-1'],
      sec_12_Rule_21_Is_Contractor_Furnished_Particulars_In_Form_X : ['-1'],
      sec_12_Rule_22_Is_Contractor_Paid_Return_Fair_To_Migrant : ['-1'],
      sec_12_Rule_23_Is_Passbook_Issued_To_Every_Migrant : ['-1'],
      sec_12_Rule_24_Is_Return_In_Form_XI_Submitted_By_Contractor : ['-1'],
      sec_13_Rule_25_Is_Wages_Paid_To_Workers : ['-1'],
      sec_17_Rule_28_Is_Wages_Payment_Made_On_7_or_10_Every_Month : ['-1'],
      rule_33_Is_Notice_Displayed : ['-1'],
      rule_35_Is_Signing_Certificate_Given_In_Wages_Register : ['-1'],
      sec_33_Rule_48_Is_Contractor_Register_Maintained_In_Form_XII_By_PE : ['-1'],
      sec_33_35_Rule_49_Is_Contractor_Maintained_Employee_Register_In_Form_XIII : ['-1'],
      sec_35_Rule_50_Is_Service_Certificate_Issued_To_Workers : ['-1'],
      sec_23_Rule_51_Is_Contractor_Maintained_Displacement_Cum_Outward_Journey_Allowance : ['-1'],
      sec_23_Rule_51_Is_Contractor_Maintained_Return_Journey_Allowance : ['-1'],
      sec_23_Rule_52_Is_Rule_52_1_Applicable : ['-1'],
      sec_23_Rule_52_Is_Muster_Roll_Form_XVII_Maintained : ['-1'],
      sec_23_Rule_52_Is_Wages_Register_Maintained_In_Form_XVIII : ['-1'],
      sec_23_Rule_52_Is_Wages_Cum_Muster_Roll_Register_Maintained_In_Form_XVIII : ['-1'],
      sec_23_Rule_52_Is_Deduction_Register_Maintained_In_Form_XIX : ['-1'],
      sec_23_Rule_52_Is_Fine_Register_Maintained_In_Form_XX : ['-1'],
      sec_23_Rule_52_Is_Advances_Register_Maintained_In_Form_XXI : ['-1'],
      sec_23_Rule_52_Is_Overtime_Register_Maintained_In_Form_XXII : ['-1'],
      sec_23_Rule_52_Is_Biometric_Of_Workers_Taken : ['-1'],
      sec_23_Rule_52_Is_Provision_Of_Rule_52_3_Applicable : ['-1'],
      sec_23_Rule_54_Is_Notices_Prescribed_In_Rule_79_Displayed : ['-1'],
      sec_23_Rule_53_IsRegistered_Preserved_For_Three_Years : ['-1'],
      sec_23_Rule_53_IsRegistered_Produced_While_Inspection : ['-1'],
      sec_23_Rule_55_Is_Notices_Prescribed_In_Rule_Displayed : ['-1'],
      sec_23_Rule_56_Is_HalfYearlyReturn_In_Form_XXIII_Submitted: ['-1'],
      sec_23_Rule_56_Is_AnnualReturn_In_Form_XXIV_Submitted_By_PE : ['-1'],
    
      sec_16_Rule_41_Is_Canteen_Provided_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_16_Rule_41_Is_Canteen_Consist_DinningHall_Kitchen_StoreRoom_Pantry_WashingPlace_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_16_Rule_41_Is_Canteen_Sufficiently_Lighted_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_16_Rule_41_Is_Canteen_Floor_Impervious_Material_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_16_Rule_41_Is_Canteen_Wall_Lime_Washed_Once_InYear_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_16_Rule_41_Is_Canteen_InSide_Wall_Lime_Washed_Every_Four_Month_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_16_Rule_41_Is_Precincts_Of_Canteen_In_Clean_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_16_Rule_41_Is_Wastewater_And_Garbage_Disposed_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_16_Rule_41_Is_DiningHall_Accommodates_30Percent_ContractLabour_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_16_Rule_41_Is_Area_Of_1_Mtr_Sqr_Available_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_16_Rule_41_Is_Portion_Of_Dinning_Reserved_For_Women_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_16_Rule_41_Is_Separate_Washing_Place_Provided_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_16_Rule_41_Is_Provisions_Of_Rule_Complied_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_16_Rule_41_Is_FoodStuffs_Meets_habits_Of_ContractLabour_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_16_Rule_41_Is_Canteen_Running_No_Profit_No_Loss_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_16_Rule_41_Is_AccountBook_Produced_While_Inspection_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_16_Rule_41_Is_Canteen_Audit_Performed_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_16_Rule_40_Is_Restroom_Provided_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_16_Rule_39_Is_Sufficient_Drinking_Water_Available_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_16_Rule_42_Is_Latrines_Provided_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_16_Rule_42_Is_Signboard_In_Latrines_Displayed_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_16_Rule_42_Is_Urinals_Provided_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_16_Rule_42_Is_Latrine_Urinals_Adequately_Lighted_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_16_Rule_42_Is_Latrine_Urinals_Clean_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_16_Rule_42_Is_Latrine_Urinals_Public_Health_Requirements_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_16_Rule_42_Is_Water_Supply_In_Latrine_Urinals_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_16_Rule_43_Is_Washing_Facilities_Provided_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_16_Rule_37_Is_Medical_Facility_Provided_By_Contractor_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_16_Rule_37_Is_Medicines_Cost_Reimburse_By_Contractor_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_16_Rule_37_Is_Family_Hospital_Expenses_Bearing_By_Contractor_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_16_Rule_37_Is_First_Aid_Boxes_Provided_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_16_Rule_37_Is_First_Aid_Boxes_Maintained_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_16_Rule_37_Is_First_Aid_Boxes_InCharged_TrainedPerson_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_16_Rule_38_Is_Protective_Clothes_Provided_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_16_Rule_44_Is_Creche_Provided_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_16_Rule_45_Is_Residential_Accommodation_Provided_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_12_Rule_21_Is_Contractor_Furnished_Particulars_In_Form_X_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_12_Rule_22_Is_Contractor_Paid_Return_Fair_To_Migrant_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_12_Rule_23_Is_Passbook_Issued_To_Every_Migrant_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_12_Rule_24_Is_Return_In_Form_XI_Submitted_By_Contractor_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_13_Rule_25_Is_Wages_Paid_To_Workers_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_17_Rule_28_Is_Wages_Payment_Made_On_7_or_10_Every_Month_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      rule_33_Is_Notice_Displayed_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      rule_35_Is_Signing_Certificate_Given_In_Wages_Register_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_33_Rule_48_Is_Contractor_Register_Maintained_In_Form_XII_By_PE_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_33_35_Rule_49_Is_Contractor_Maintained_Employee_Register_In_Form_XIII_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_35_Rule_50_Is_Service_Certificate_Issued_To_Workers_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_23_Rule_51_Is_Contractor_Maintained_Displacement_Cum_Outward_Journey_Allowance_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_23_Rule_51_Is_Contractor_Maintained_Return_Journey_Allowance_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_23_Rule_52_Is_Rule_52_1_Applicable_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_23_Rule_52_Is_Muster_Roll_Form_XVII_Maintained_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_23_Rule_52_Is_Wages_Register_Maintained_In_Form_XVIII_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_23_Rule_52_Is_Wages_Cum_Muster_Roll_Register_Maintained_In_Form_XVIII_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_23_Rule_52_Is_Deduction_Register_Maintained_In_Form_XIX_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_23_Rule_52_Is_Fine_Register_Maintained_In_Form_XX_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_23_Rule_52_Is_Advances_Register_Maintained_In_Form_XXI_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_23_Rule_52_Is_Overtime_Register_Maintained_In_Form_XXII_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_23_Rule_52_Is_Biometric_Of_Workers_Taken_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_23_Rule_52_Is_Provision_Of_Rule_52_3_Applicable_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_23_Rule_54_Is_Notices_Prescribed_In_Rule_79_Displayed_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_23_Rule_53_IsRegistered_Preserved_For_Three_Years_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_23_Rule_53_IsRegistered_Produced_While_Inspection_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_23_Rule_55_Is_Notices_Prescribed_In_Rule_Displayed_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_23_Rule_56_Is_HalfYearlyReturn_In_Form_XXIII_Submitted_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      sec_23_Rule_56_Is_AnnualReturn_In_Form_XXIV_Submitted_By_PE_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
      
      sec_16_Rule_41_Is_Canteen_Provided_ViolationExist : ['0'],
      sec_16_Rule_41_Is_Canteen_Consist_DinningHall_Kitchen_StoreRoom_Pantry_WashingPlace_ViolationExist : ['0'],
      sec_16_Rule_41_Is_Canteen_Sufficiently_Lighted_ViolationExist : ['0'],
      sec_16_Rule_41_Is_Canteen_Floor_Impervious_Material_ViolationExist : ['0'],
      sec_16_Rule_41_Is_Canteen_Wall_Lime_Washed_Once_InYear_ViolationExist : ['0'],
      sec_16_Rule_41_Is_Canteen_InSide_Wall_Lime_Washed_Every_Four_Month_ViolationExist : ['0'],
      sec_16_Rule_41_Is_Precincts_Of_Canteen_In_Clean_ViolationExist : ['0'],
      sec_16_Rule_41_Is_Wastewater_And_Garbage_Disposed_ViolationExist : ['0'],
      sec_16_Rule_41_Is_DiningHall_Accommodates_30Percent_ContractLabour_ViolationExist : ['0'],
      sec_16_Rule_41_Is_Area_Of_1_Mtr_Sqr_Available_ViolationExist : ['0'],
      sec_16_Rule_41_Is_Portion_Of_Dinning_Reserved_For_Women_ViolationExist : ['0'],
      sec_16_Rule_41_Is_Separate_Washing_Place_Provided_ViolationExist : ['0'],
      sec_16_Rule_41_Is_Provisions_Of_Rule_Complied_ViolationExist : ['0'],
      sec_16_Rule_41_Is_FoodStuffs_Meets_habits_Of_ContractLabour_ViolationExist : ['0'],
      sec_16_Rule_41_Is_Canteen_Running_No_Profit_No_Loss_ViolationExist : ['0'],
      sec_16_Rule_41_Is_AccountBook_Produced_While_Inspection_ViolationExist : ['0'],
      sec_16_Rule_41_Is_Canteen_Audit_Performed_ViolationExist : ['0'],

      sec_16_Rule_40_Is_Restroom_Provided_ViolationExist : ['0'],
      sec_16_Rule_39_Is_Sufficient_Drinking_Water_Available_ViolationExist : ['0'],
      sec_16_Rule_42_Is_Latrines_Provided_ViolationExist : ['0'],
      sec_16_Rule_42_Is_Signboard_In_Latrines_Displayed_ViolationExist : ['0'],
      sec_16_Rule_42_Is_Urinals_Provided_ViolationExist : ['0'],
      sec_16_Rule_42_Is_Latrine_Urinals_Adequately_Lighted_ViolationExist : ['0'],
      sec_16_Rule_42_Is_Latrine_Urinals_Clean_ViolationExist : ['0'],
      sec_16_Rule_42_Is_Latrine_Urinals_Public_Health_Requirements_ViolationExist : ['0'],
      sec_16_Rule_42_Is_Water_Supply_In_Latrine_Urinals_ViolationExist : ['0'],
      sec_16_Rule_43_Is_Washing_Facilities_Provided_ViolationExist : ['0'],
      sec_16_Rule_37_Is_Medical_Facility_Provided_By_Contractor_ViolationExist : ['0'],
      sec_16_Rule_37_Is_Medicines_Cost_Reimburse_By_Contractor_ViolationExist : ['0'],
      sec_16_Rule_37_Is_Family_Hospital_Expenses_Bearing_By_Contractor_ViolationExist : ['0'],
      sec_16_Rule_37_Is_First_Aid_Boxes_Provided_ViolationExist : ['0'],
      sec_16_Rule_37_Is_First_Aid_Boxes_Maintained_ViolationExist : ['0'],
      sec_16_Rule_37_Is_First_Aid_Boxes_InCharged_TrainedPerson_ViolationExist : ['0'],
      sec_16_Rule_38_Is_Protective_Clothes_Provided_ViolationExist : ['0'],

      sec_16_Rule_44_Is_Creche_Provided_ViolationExist : ['0'],
      sec_16_Rule_45_Is_Residential_Accommodation_Provided_ViolationExist : ['0'],
      sec_12_Rule_21_Is_Contractor_Furnished_Particulars_In_Form_X_ViolationExist : ['0'],
      sec_12_Rule_22_Is_Contractor_Paid_Return_Fair_To_Migrant_ViolationExist : ['0'],
      sec_12_Rule_23_Is_Passbook_Issued_To_Every_Migrant_ViolationExist : ['0'],
      sec_12_Rule_24_Is_Return_In_Form_XI_Submitted_By_Contractor_ViolationExist : ['0'],
      sec_13_Rule_25_Is_Wages_Paid_To_Workers_ViolationExist : ['0'],
      sec_17_Rule_28_Is_Wages_Payment_Made_On_7_or_10_Every_Month_ViolationExist : ['0'],
      rule_33_Is_Notice_Displayed_ViolationExist : ['0'],
      rule_35_Is_Signing_Certificate_Given_In_Wages_Register_ViolationExist : ['0'],
      sec_33_Rule_48_Is_Contractor_Register_Maintained_In_Form_XII_By_PE_ViolationExist : ['0'],
      sec_33_35_Rule_49_Is_Contractor_Maintained_Employee_Register_In_Form_XIII_ViolationExist : ['0'],
      sec_35_Rule_50_Is_Service_Certificate_Issued_To_Workers_ViolationExist : ['0'],
      sec_23_Rule_51_Is_Contractor_Maintained_Displacement_Cum_Outward_Journey_Allowance_ViolationExist : ['0'],
      sec_23_Rule_51_Is_Contractor_Maintained_Return_Journey_Allowance_ViolationExist : ['0'],
      sec_23_Rule_52_Is_Rule_52_1_Applicable_ViolationExist : ['0'],
      sec_23_Rule_52_Is_Muster_Roll_Form_XVII_Maintained_ViolationExist : ['0'],
      sec_23_Rule_52_Is_Wages_Register_Maintained_In_Form_XVIII_ViolationExist : ['0'],
      sec_23_Rule_52_Is_Wages_Cum_Muster_Roll_Register_Maintained_In_Form_XVIII_ViolationExist : ['0'],

      sec_23_Rule_52_Is_Deduction_Register_Maintained_In_Form_XIX_ViolationExist : ['0'],
      sec_23_Rule_52_Is_Fine_Register_Maintained_In_Form_XX_ViolationExist : ['0'],
      sec_23_Rule_52_Is_Advances_Register_Maintained_In_Form_XXI_ViolationExist : ['0'],
      sec_23_Rule_52_Is_Overtime_Register_Maintained_In_Form_XXII_ViolationExist : ['0'],
      sec_23_Rule_52_Is_Biometric_Of_Workers_Taken_ViolationExist : ['0'],
      sec_23_Rule_52_Is_Provision_Of_Rule_52_3_Applicable_ViolationExist : ['0'],
      sec_23_Rule_54_Is_Notices_Prescribed_In_Rule_79_Displayed_ViolationExist : ['0'],
      sec_23_Rule_53_IsRegistered_Preserved_For_Three_Years_ViolationExist : ['0'],
      sec_23_Rule_53_IsRegistered_Produced_While_Inspection_ViolationExist : ['0'],
      sec_23_Rule_55_Is_Notices_Prescribed_In_Rule_Displayed_ViolationExist : ['0'],
      sec_23_Rule_56_Is_HalfYearlyReturn_In_Form_XXIII_Submitted_ViolationExist : ['0'],
      sec_23_Rule_56_Is_AnnualReturn_In_Form_XXIV_Submitted_By_PE_ViolationExist : ['0'],



      inspectionRefId: [null, Validators.required],
    }, {}) as TForm<Inspection_Form_Labour_III_InterStateMigrantWorkmenAct>;
  }
  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      this.parmamEncodedinfo=params.info;
      this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info)=>{
      this.paramInfo = info;
      });
    });
  }

  ngAfterViewInit() {
    this.hasViolationFound = 'Any Violation Found?'
    this.appHttpRequestHandlerService.httpGet({ id:this.paramInfo.inspectionRefId}, "Inspection", "getForm_Labour_Part_III_InterStateMigrantWorkmenAct").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericFormModel<Inspection_Form_Labour_III_InterStateMigrantWorkmenAct>) => {
        this.Input_Form.patchValue(data.formModel);
        this.updateCharacterCountsForTextareaControls();

        if(this.paramInfo.isLocked == 1)
          {
            this.Input_Form.disable();
          }
    });
  }

  saveAndNext(e){
    this.submitted = true;
    this.Input_Form.controls.inspectionRefId.patchValue(this.paramInfo.inspectionRefId);
    console.log(this.Input_Form.value,'assa')
    if (this.Input_Form.valid) {
      this.appHttpRequestHandlerService.httpPost(this.Input_Form.value, "pbsamadhannetcoreapi.Models.Inspection_Form_Labour_III_InterStateMigrantWorkmenAct", "Inspection", "addUpdateForm_Labour_Part_III_InterStateMigrantWorkmenAct")
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

  getCharacterCount(controlName: string): number {
    return this.characterCounts[controlName] ?? 0;
  }

  updateCharacterCount(controlName: string, maxLength: number): void {
    const control = this.Input_Form.get(controlName);
    if (control) {
      const value = control.value || '';
      this.characterCounts[controlName] = value.length;
      this.controlMaxLengthNames[controlName] = maxLength;
    }
  }

  private updateCharacterCountsForTextareaControls(): void {
    Object.keys(this.Input_Form.controls).forEach(controlName => {
      const control = this.Input_Form.get(controlName);
      if (control && control instanceof UntypedFormControl && control.value && typeof control.value === 'string') {
        if (control.value.trim() !== '') {
          this.updateCharacterCount(controlName, 1000);
        }
      }
    });
  }
}