import { TForm } from "../generic-implementation/generic-form-builder.type";

export type CommonLicence_GeneralDetail = {
    commonLicenceId : number;
    isFactory : boolean;
    isEngagementOfContractor : boolean;
    isBeediAndCigar : boolean;

    // Occupier Or PE Details
    occupierOrPE_Name : string;
    occupierOrPE_Permanent_Address : string;
    occupierOrPE_VillageOrTown : string;
    occupierOrPE_TehsilRefId: number;
    occupierOrPE_TehsilLgd : number;
    occupierOrPE_DistrictRefId : number;
    occupierOrPE_DistrictLgd : number;
    occupierOrPE_PinCode: number;
    occupierOrPE_Email : string;
    occupierOrPE_PhoneNumber : number; 

    // Occupier Or PE Local Address
    occupierOrPE_Local_Address : string;
    occupierOrPE_Local_VillageOrTown : string;
    occupierOrPE_Local_TehsilRefId : number;
    occupierOrPE_Local_TehsilLgd : number;
    occupierOrPE_Local_DistrictRefId : number;
    occupierOrPE_Local_DistrictLgd : number;
    occupierOrPE_Local_PinCode : number;

    // Owner Details
    owner_Name : string;
    owner_PartnershipShare : string;
    owner_Address :  string;
    owner_VillageOrTown :  string;
    owner_TehsilRefId : number;
    owner_TehsilLgd : number;
    owner_DistrictRefId : number;
    owner_DistrictLgd : number;
    owner_PinCode : number; 

    coreActivity : string;
    nationalIndustrialClassificationCode : string;
    totalNoWorkersToBeEmployedInLicence : number;
    totalNoWorkersToBeEmployedDuringLastYear : number;
    electricLoadConnectedInKilowatts : number;
    approvedBuildingPlanNumber : string;
    approvedBuildingPlanDate : string;
    stabilityCertificateNumber : string;
    dateOfStabilityCertificateApproval : string;
    disposalOfTrade : string;

    appRefId: number;
    establishmentRefId: number;
    applicationPurposeType : number;
    projectSiteRefId : number;
  };

  // Contractor Details Modal
  export type CommonLicence_ContractorDetail= {
    commonLicence_ContractorDetailId : number;
    natureOfWorkContractLabour : string;
    numberOfContractLabourToBeEmployed: number;
    dateOfCommencementOfEachContractWorkUnderEachContractor : string;
    dateOfTerminationOfEmployementUnderEachContractor : string;
    commonLicenceRefId : number;
  };

  export type EstablishmentDetailViewModel= {
    generalDetail: CommonLicence_GeneralDetail,
    contractorDetail: CommonLicence_ContractorDetail,
    isLocked: boolean,
    isFeeApplicable: boolean
  };


  export type CommonLicenceDetailViewModel= {
    generalDetail: CommonLicence_GeneralDetail,
    employerDetail: CommonLicence_ContractorDetail,
    isLocked: boolean,
    isFeeApplicable: boolean
  };