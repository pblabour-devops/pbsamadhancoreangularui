export type Building_Plan_Hud_GeneralDetail = {
    buildingPlanHUDId: number,
    isUnderRightToBusinessAct: number,
    hadbustNumber : string,
    projectIdentificationNo : string,
    appIdRightToBusinessAct: string,
    dateOfPrincipalApproval : string,
    buidingPlanHUDApprovalType: number,
    buildingType: number,
    isBuildingHeightMoreThen15Meter : number,
    inspectionType: number,
    plotAreaSqFt: number,
    plotAreaAcres: number,
    projectPurpose : string,
    projectType: number,
    buildingCost: number,
    appRefId: number,
    projectSiteRefId: number,
    applicationPurposeType : number,
    iPin : number,
    investPunjab_AppId : number,
    isGasOrFuelPipeLinePassWithin150Meter : number,
    isHistoricalSiteIsLocatedWithin100Meter : number,
    industryType : number,
    coveredAreaSqFt : number,

    ownerName : string,
    ownerContactNo : string,
    ownerEmail : string,

    competentPersonUserRefId : string,
    competentPersonName : string,
    competentPersonContactNo : string,
    competentPersonEmail : string,

    architectName : string,
    architectContactNo : number,
    architectEmail : string,

    engineerName : string,
    engineerContactNo : number,
    engineerEmail : string,

    BuildingPlanApprovalAuthorityType : number,

    principalApproval_RBA_Details : PrincipalApproval_RBA_DetailsViewModel,
    projectSiteVersion :  number
}

export type BuildingPlanHUDViewModel= {
    generalDetail: Building_Plan_Hud_GeneralDetail,
    isLocked: boolean,
    isFeeApplicable: boolean
  };

export type Building_Plan_Hud_Questionnaire = {
    isSiteFallUnderMC: number,
    isSiteFallUnderPSIEC: number,
    isApprovedFromMC: number,
    isApprovedFromPSIEC: number,
}

export interface PrincipalApproval_RBA_DetailsViewModel {
  success : boolean,
  data : PrincipalApprovalData[]
};

export interface PrincipalApprovalData {
  ipin : string,
  serviceid : number,
  approval_file: string,
  servicename : string,
  applicantname : string,
  idproofnumber : string,
  idproofattachment : string,
  pannumber : string,
  panattachment : string,
  applicantphoneno : any,
  applicantmobileno : string,
  applicantemailid : string,
  applicantaddress : string,
  applicantstate : number,
  applicantdistrict : number,
  areaclassification : string,
  applicanttehsil : number,
  applicantvillage : string,
  applicantpincode : string,
  majoractivities : string,
  servicesprovided : string,
  projectname : string,
  projectpurpose : string,
  projectaddress : string,
  allotmentletter : string,
  typeofindustry : string,
  landcost : number,
  buildingcost : number,
  plantcost : number,
  othercost : number,
  totalinvestmentcost : number,
  directempmale : number,
  directempfemale : number,
  indirectempmale : number,
  indirectempfemale : number,
  totalempmale : number,
  totalempfemale : number,
  ownershipdetail : number,
  requirementofwater : number,
  address2 : any,
  be_name : string,
  business_entity_type : string,
  applicationid : string,
  userid : number,
  form_id : number,
  order_id : number,
  status : number,
  tdate : string,
  projectvillage : any,
  pdate : string,
  applicationdate : string,
  paytitle : string,
  mclimit : string,
  landarea : string,
  built_up_area : string,
  tradecity : any,
  tradearray : any,
  accarray : any,
  statename : string,
  districtname : string,
  tehsilname : string,
  classificationzone : string,
  landusecategory : string,
  landusecategoryname : string,
  undertakingfile : string,
  designationname : string,
  projectstatename : string,
  projectdistrictname : string,
  projecttehsilname : string,
  projectvillagetown : string,
  projectpincode : string,
  beaddress1 : any,
  beaddress2 : any,
  be_city_village : any,
  be_pincode : any,
  bedistrictname : string,
  besubdistrictname : string,
  buildingapprovalbylg_filename : any,
  buildingapprovalbyfactories_filename : any,
  fireapproval_filename : any,
  tradeapproval_filename : any,
  clu_filename : any,
  location_filename : string,
  sitesituated : string,
  cluexemption_filename : any,
  runningmeter : string,
  approvedsite : string,
  ulbName : any,
  urban_local_body_classification : any,
  authority : string,
  edcfilename : any,
  total_amount : string,
  bifurcation_info : BifurcationDetailsViewModel[],
  approvaldate : string,
};

export interface BifurcationDetailsViewModel {
  bifurcationname : string,
  bifurcationamount : string,
}

export interface IBuildingPlanHUD_RTB_Mapping{
  projectIdentificationNo : string;
  appIdRightToBusinessAct : string;
  responseJson : any;
  appRefId : number;
}

export interface IAppPaymentEDCAuthority{
  id : number,
  title : string,
  bankName : string,
  bankAccountHolderName : string,
  bankAccountNumber : string,
  bankIFSC : string,
  nonTreasuryCode :string,
}

