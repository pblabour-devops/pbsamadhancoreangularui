import { TForm } from "../generic-implementation/generic-form-builder.type";

export type BuildingPlan_GeneralDetail = {
  BuildingPlanId : number;
  applicantName : string;
  applicant_Address : string;
  applicant_VillageOrTown : string;
  applicant_TehsilRefId : number;
  applicant_TehsilLgd : number;
  applicant_DistrictRefId : number;
  applicant_DistrictLgd : number;
  applicant_PinCode : number;
  applicantRelationToFactory : string;
  nameOfFactory : string;
  khasraNumber : number;
  wardNumber : number;
  plotNumber : number;
  floorNumber : number;

  projectSiteRefId : number;
  appRefId: number;
  establishmentRefId: number;
  applicationPurposeType : number;
  };

  export type BuildingPlan_AreaDetail = {
   buildingPlan_AreaDetailId : number;
   numberOfRooms : number;
   lengthOfRoom_X_Axis : number;
   breadthOfRoom_Y_Axis : number;
   maximum_Z_Axis_Height : number; 
   minimum_Z_Axis_Height : number;
   area : number; 
   areaOccupiedByMachine : number;
   volume : number;
   breathingSpace  : string;
   ventilation : string;
   lightingLevel : string;
   maximumCapicityOfRoom : number;
   numberOfPersonsToEmployedInRoom : string;
   purposeOfRoom  : string;
   constructionPeriod : string;
   remarks : string;

   buildingPlanRefId : number;
  };

  export type BuildingPlanDetailViewModel= {
    generalDetail: BuildingPlan_GeneralDetail,
    areaDetails: BuildingPlan_AreaDetail,
    isLocked: boolean,
    isFeeApplicable: boolean
  };