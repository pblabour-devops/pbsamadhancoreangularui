export interface ShopLicence_GeneralDetail  {
    shopLicenceId: number,
    closingDay: string
    openingHoursOfEstablishment: string,
    closingHoursOfEstablishment: string,
    ownerName : string,
    ownerFatherOrHusbandName : string,
    aadharNumber: string,
    establishmentConstitutionTypeEnum: string,
    managerName : string,
    shopType: string,
    nationalIndustrialClassificationCode: string,
    isHavingEmployee: number,
    // panOrTanNumber : string,
    // gstNumber : string,

    appRefId: number,
    projectSiteRefId: number,
    applicationPurposeType : number,
    applicationType : number,
    iPin : number,
    investPunjab_AppId : number,
    labourCircleRefId : number,
    districtRefId : number,
    employeeList: IShopLicence_EmployeeDetail[],
    projectSiteVersion : number
}

export interface IShopLicence_EmployeeDetail  {
    employeeDetailId : number,
    name : string,
    fatherOrHusbandName : string, 
    gender : number,
    dateOfBirth : string,
    mobileNumber : number,
    panNumber  : string,
    aadharNumber : string,
    joiningDate : string,
    closingDayType : number,
    workingHoursFrom : string,
    workingHoursTo : string,
    intervalFrom : string,
    intervalTo  : string,
    maxRows: number
}


export type ShopLicenceDetailViewModel= {
    generalDetail: ShopLicence_GeneralDetail,
    isLocked: boolean,
    isFeeApplicable: boolean,
    remarks : string
  };

export type Building_Plan_Factory_Questionnaire = {
    isSiteFallUnderMC: number,
    isSiteFallUnderPSIEC: number,
    isApprovedFromMC: number,
    isApprovedFromPSIEC: number,
}

export type Building_Plan_Factory_GeneralDetail = {
    buildingPlanFactoryId: number,
    buildingCost : number,
    ownerName : string,
    ownerContactNo : string,
    ownerEmail : string,

    architectOrCompetentPersonName : string,
    architectOrCompetentPersonContactNo : string,
    architectOrCompetentPersonEmail : string,
    dispatchNo : string,
    issueDate : string,

    appRefId: number,
    projectSiteRefId: number,
    applicationPurposeType : number,
    iPin : number,
    investPunjab_AppId : number,
    projectSiteVersion : number
}

export type BuildingPlanFactoryViewModel= {
    generalDetail: Building_Plan_Factory_GeneralDetail,
    isLocked: boolean,
    isFeeApplicable: boolean
  };

export interface IEmployeeDetail{
    isHavingEmployee: number,
    shopLicenceId: number,
    appRefId: number,
    //applicationPurposeType: number,
    applicationLifeCycleStatusType: number,
    employeesList: IShopLicence_EmployeeDetail[],
    projectSiteVersion :  number,
}

export interface IFactory_Questionnaire {
    questionnaireDetailId: number,
    isUnderRightToBusinessAct : number,
    dateOfPrincipalApproval : string,
    projectIdentificationNo : string,
    appIdRightToBusinessAct: string,
    isRBAVerified: boolean,

    isTempRegistered: number,
    tempRegistrationNumber : string,
    isTempRegistrationVerified: boolean,

    isBuildingPlanApproved: number,
    buildingPlanDofNumber: string,
    isBuildingPlanVerified: boolean

    isStabilityApproved: number,
    stabilityPlanDofNumber: string,
    isStabilityPlanVerified: boolean,
    competentPersonUserId: string,

    appRefId: number,
    projectSiteRefId:number,
    applicationPurposeType: number,
    iPin : number,
    investPunjab_AppId : number,
    projectSiteVersion : number
}

export type Licence_Factory_GeneralDetail = {
    factoryLicenceId: number,
    oldLicenceNo : string,
    oldLicenceValidUpTo : Date,
    oldLicenceTotalEmployees : number,
    oldLicenceFactoryKiloWatt : number,
    registrationDate : Date,
    renewalFromDate : Date,
    ammendmentDate : Date,
    noOfYears : number,
    manufacturingProcess_Last12Months : string,
    manufacturingProcess_Next12Months : string,
    nationalIndustrialClassificationCode : string,
    mfgProducts_Last12Month : string,
    workers_MaxDuringYear : number,
    workers_MaxLast12Month : number,
    workers_OrdinarilyEmployed : number,
    powerKW_Installed : number,
    powerKW_MaxProposed : number,

    isUnderRightToBusinessAct : number,
    dateOfPrincipalApproval : string,
    projectIdentificationNo : string,
    appIdRightToBusinessAct: string,
    isRBAVerified: boolean,

    isTempRegistered: number,
    tempRegistrationNumber : string,
    isTempRegistrationVerified: boolean,

    isBuildingPlanApproved: number,
    buildingPlanDofNumber: string,
    isBuildingPlanVerified: boolean

    isStabilityApproved: number,
    stabilityPlanDofNumber: string,
    isStabilityPlanVerified: boolean,
    competentPersonUserId: string,

    isBuildingConstructedBefore29June2018 : number,
    haveYouMadeChangesInBuildingPlan : number,

    appRefId: number,
    projectSiteRefId: number,
    applicationPurposeType : number,
    iPin : number,
    investPunjab_AppId : number,

    renewalFromDate_Json: any,
    registrationDate_Json: any,
    ammendmentDate_Json: any,
    oldLicenceValidUpTo_Json: any,

    factoryCircleRefId : number
    competentPersonUserRefId : string,
    competentPersonName : string,
    competentPersonContactNo : string,
    competentPersonEmail : string,

    engineerName : string,
    engineerContactNo : number,
    engineerEmail : string,
    buildingPlanApprovalDate : string,
    buildingPlanStabilityApprovalDate : string,
    projectSiteVersion : number
}

export type Licence_Factory_OccupierAndManagerDetail = {
    occupierAndManagerDetailId: number,
    managerFullName : string,
    managerFatherName : string,
    managerFullAddress : string,
    managerMobile : string,
    managerEmail : string,
    managerResidentialAddress : string,
    occupierFullName : string,
    occupierFatherName : string,
    occupierFullAddress : string,
    occupierMobile : string,
    occupierEmail : string,
    occupierResidentialAddress : string,
    ownerName : string,
    ownerPremisesAddress : string,
    stabilityCertificateNumber : string,
    stabilityCertificateDate : Date,
    stabilityDOFNumber : string,
    checklist_IsBuildingPlanApproved : number,
    checklist_IsLabourWelfareFundPaid : number,
    checklist_IsAnnualReturnFiled : number,
    checklist_IsStabilityCertificateAttached : number,
    factoryLicenceRefId: number,
    appRefId: number
}

export type FactoryLicenceDetailViewModel= {
    generalDetail: Licence_Factory_GeneralDetail,
    occupierAndManagerDetail: Licence_Factory_OccupierAndManagerDetail,
    licence_Factory_AmendmentDataHistory: Licence_Factory_AmendmentDataHistory
    isLocked: boolean,
    isFeeApplicable: boolean,
    remarks : string
};

export type Licence_Factory_AmendmentDataHistory= {
    id : number,
    sectionCode :  string,
    fieldName : string,
    previousValue : string,
    modifiedValue : string,
    modifiedOn : string,
    modifiedCounter : number,
    isLocked : boolean
}

export interface IFactory_TemporaryLicenceDetailsViewModel {
    factoryName : string,
    factorySituationAddress : string,
    factoryCommunicationAddress : string,
    maximumNumberEmployeeInYear : number,
    maximumNumberEmployeeLastYear : number,
    ordinarilyEmployed : number,
    installedPower : string,
    maximumPowerUsed : string,
    managerFullName : string,
    managerFullAddress : string,
    managerFatherName : string,
    manufacturingProcesses : string,
    occupierFullName : string,
    occupierFullAddress : string,
    occupierFatherName : string,
    occupierMobile : string,
    occupierEmail : string,
    ownerPremisesAddress : string,
    nicCode  : string,
    licenceForNoOfYear : number,
    registrationDate : string,
    applicationDate : string,
    managerMobile : string,
    managerEmail : string,
    clearanceIssuedOn : string,
    clearanceExpiredOn : string,
    licencePath: string
};

export interface IOfficerDetailsByRoleNameViewModel
{
    officerFullName : string,
    contactNo : string,
    email : string,
    id : string
}
export interface IShop_NightShift_ChecklistPoint{
    checklistID:  number,
    checklistDescription: string,
    dateOfEffective: Date,
    orderNumber: string,
    isEnabled: boolean,
    isSelected: boolean
}

export type ILicence_Shop_NightShift_Approval = {
    id: number,
    appRefId: number,
    licenceNumber: string,
    checkListJson: string,
    declaration: boolean,
    screenShotTaken: boolean,
    nightShift_ChecklistPoints: IShop_NightShift_ChecklistPoint[],
    projectSiteRefId : number,
    projectSiteVersion : number
}

export interface ILicence_Shop_NightShift_ApprovalViewModel  {
    generalDetail: ILicence_Shop_NightShift_Approval,
    isLocked: boolean,
    isFeeApplicable: boolean,
    remarks : string
  };

export type BuildingPlanFactory_Declaration_Stability_Certificate = {
    declarationStabilityCertificateId: number,

    isBuildingPlanApproved: number,
    buildingPlanDofNumber: string,
    isBuildingPlanVerified: boolean
    buildingPlanDofApprovalDate : Date,

    isStabilityApproved: number,
    stabilityPlanDofNumber: string,
    isStabilityPlanVerified: boolean,
    competentPersonUserId: string,
    competentPersonName : string,
    competentPersonContactNo : string,
    competentPersonEmail : string,
    
    engineerUserRefId:number,
    engineerName : string,
    engineerContactNo : number,
    engineerEmail : string,

    stabilityPlanDofApprovalDate : Date,

    isCompetentPersonSubmittedAnyChanges : number,
    factoryCircleRefId:number,
    appRefId: number,
    projectSiteRefId: number,
    applicationPurposeType : number,
    iPin : number,
    investPunjab_AppId : number,
    projectSiteVersion : number,

    competentPersonList: EmpanelledPersonDetails[];
    empaneledEngineersList : EmpanelledPersonDetails[];
}

export type BuildingPlanFactory_Declaration_Stability_CertificateViewModel= {
    generalDetail: BuildingPlanFactory_Declaration_Stability_Certificate,
    isLocked: boolean,
    isFeeApplicable: boolean,
    remarks : string
};


export interface Licence_BocwAct_GeneralDetails  {
        bocwEstablishmentRegistrationId : number,       
        bocwActCircleType : number,       
        managerName : string,
        managerAddress : string,
        managerEmail : string,
        managerMobile : string,
        engagedAnyContractorType : number,
        bocwEngagedWorkerSlabType : number,
        bocwRegisteredType : number,
        work_CommencementDate : Date,
        work_CompletionDate : Date,
        principalEmployerName : string,
        principalEmployerAddress : string ,
        principalEmployerFatherName : string,
        principalEmployerMobileNo : string,
        principalEmployerEmail : string,
        appRefId : number
        constructionBuildingDesc : string,
        constructionBuildingType : number,
        contractLabourLicenceNumber : string,
        maximumNoOfWorkers : number,
        projectSiteRefId: number,
        applicationPurposeType : number,
        alcCircleRefId : number,
        factoryCircleRefId : number,
        
        constructionSite_Name : string,
        constructionSite_Address : string,
        districtLgdRefId : number,
        tehsilLgdRefId : number,
        constructionSite_PinCode : string,
        
        iPin : number,
        investPunjab_AppId : number,
        contractorDetails : string,
        alcCirlceRefId : number,
        licence_BocwAct_ContractorDetail: Licence_BocwAct_ContractorDetails[],
        projectSiteVersion :  number,
}


export interface alcCircles{
    alcCircleId: number,
    alcCircleName: string,
    districtLgdRefId: number,
}

export interface factoryCircles{
    factoryCircleId: number,
    factoryCircleName: string,
    districtLgdRefId: number,
}

export interface IBocwContractorDetail{
    engagedAnyContractorType: number,
    bocwEstablishmentRegistrationId: number,
    appRefId: number,
    bocwContractorList: Licence_BocwAct_ContractorDetails[]
    totalworker: number,
    bocwEngagedWorkerSlabType :number,
    work_CommencementDate :Date,
    work_CompletionDate :Date,
}

export interface Licence_BocwAct_ContractorDetails{
    bocwEstablishmentContractorDetailId : number,
    bocwEstablishmentRegistrationRefId :number,
    contractorName : string,
    contractorAddress :string,
    natureOfConstructionWork : string,
    maxNoOfContractorOnAnyDay :number,
    contractor_Work_CommencementDate : Date,
    contractor_Work_CompletionDate :  Date,
}


export type BocwLicenceDetailViewModel= {
    generalDetail: Licence_BocwAct_GeneralDetails,
    isLocked: boolean,
    isFeeApplicable: boolean,
    remarks : string,
    constructionBuildingTypeDesc :string,
    bocwRegisteredType :string,
    bocwEngagedWorkerSlabType :string,
  };

  export type ILicence_Factory_NightShift_Approval = {
    id: number,
    appRefId: number,
    projectSiteRefId: number,
    projectSiteVersion : number
    applicationPurposeType : number,
    applicationType : number,
    iPin : number,
    investPunjab_AppId : number,
    licenceNumber: string,
    checkListJson: string,
    declaration: boolean,
    screenShotTaken: boolean,
    nightShift_ChecklistPoints: IFactory_NightShift_ChecklistPoint[]
}
export interface IFactory_NightShift_ChecklistPoint{
    checklistID:  number,
    checklistDescription: string,
    dateOfEffective: Date,
    orderNumber: string,
    isEnabled: boolean,
    isSelected: boolean
}
export interface ILicence_Factory_NightShift_ApprovalViewModel  {
    generalDetail: ILicence_Factory_NightShift_Approval,
    isLocked: boolean,
    isFeeApplicable: boolean,
    remarks : string
};

export type Licence_Proposed_BuildingPlan_GeneralDetail ={
    proposedBuildingPlanId : number,
    competentPersonListId : number,
    buildingCost : number,
    isBuildingConstructedBefore_01_Oct_2008 : number,
    dispatchNo : string,
    dispatchDate : Date,
    registrationDate : Date,
    competentPersonVisitDate : Date,
    bocw_NoOfWorkers : number
    competentPersonUserRefId : string,
    competentPersonName : string,
    competentPersonContactNo : number,
    competentPersonEmail : string,
    architectUserRefId : string,
    architectName : string,
    architectContactNo : number,
    architectEmail : string,
    engineerUserRefId : string,
    engineerName : string,
    engineerContactNo : number,
    engineerEmail : string,
    buildingPlanApprovalAuthorityType : number
    appRefId: number,
    projectSiteRefId: number,
    applicationPurposeType : number,
    iPin : number,
    investPunjab_AppId : number,
    projectSiteVersion : number,

    competentPersonList: EmpanelledPersonDetails[];
    empaneledArchitectsList : EmpanelledPersonDetails[];
    empaneledEngineersList : EmpanelledPersonDetails[];
}

export type ProposedBuildingPlanViewModel= {
    generalDetail: Licence_Proposed_BuildingPlan_GeneralDetail,
    isLocked: boolean,
    isFeeApplicable: boolean
  };

export type Licence_Existing_BuildingPlan_GeneralDetail ={
    existingBuildingPlanId : number,
    dispatchNo : string,
    dispatchDate : string,
    isBuildingConstructedBefore_01_Oct_2008 : number,
    buildingCost : number,
    noOfConstructionWorkers : number,
    industryType : number,
    projectPurpose : string,
    competentPersonUserRefId : string,
    competentPersonName : string,
    competentPersonContactNo : number,
    competentPersonEmail : string,
    architectUserRefId : string,
    architectName : string,
    architectContactNo : number,
    architectEmail : string,
    engineerUserRefId : string,
    engineerName : string,
    engineerContactNo : number,
    engineerEmail : string,
    buildingPlanApprovalAuthorityType : number
    appRefId: number,
    projectSiteRefId: number,
    applicationPurposeType : number,
    iPin : number,
    investPunjab_AppId : number,
    projectSiteVersion : number,

    competentPersonList: EmpanelledPersonDetails[];
    empaneledEngineersList : EmpanelledPersonDetails[];
}

export type ExistingBuildingPlanViewModel= {
    generalDetail: Licence_Existing_BuildingPlan_GeneralDetail,
    isLocked: boolean,
    isFeeApplicable: boolean
  };

  export type Licence_Addition_Amendment_BuildingPlan_GeneralDetail ={
    addition_AmendmentBuildingPlanId : number,
    existingBuildingPlanType : number,
    dispatchNo : string,
    dispatchDate : string,
    isBuildingConstructedBefore_01_Oct_2008 : number,
    buildingCost : number,
    noOfConstructionWorkers : number,
    industryType : number,
    projectPurpose : string,
    competentPersonUserRefId : string,
    competentPersonName : string,
    competentPersonContactNo : number,
    competentPersonEmail : string,
    architectUserRefId : string,
    architectName : string,
    architectContactNo : number,
    architectEmail : string,
    engineerUserRefId : string,
    engineerName : string,
    engineerContactNo : number,
    engineerEmail : string,
    buildingPlanApprovalAuthorityType : number
    appRefId: number,
    projectSiteRefId: number,
    applicationPurposeType : number,
    iPin : number,
    investPunjab_AppId : number,
    projectSiteVersion : number,
    competentPersonList: EmpanelledPersonDetails[];
    empaneledEngineersList : EmpanelledPersonDetails[];
}

export type EmpanelledPersonDetails = {
  contactNo: string;
  email: string;
  id: string;
  isActive: boolean;
  officerFullName: string;
  registrationIssuedOn: string;
  registrationNumber: string;
  registrationValidUpto: string;
};

export type Addition_AmendmentBuildingPlanViewModel= {
    generalDetail: Licence_Addition_Amendment_BuildingPlan_GeneralDetail,
    isLocked: boolean,
    isFeeApplicable: boolean
  };

  export interface Licence_CL_PE_GeneralDetails  {
    id : number,
    manager_Name : string,
    manager_Address : string,
    manager_Email : string,
    manager_Mobile : string,
    natureOfWork : string,
    pE_Name : string,
    pE_FatherName : string ,
    pE_Address : string,
    pE_Mobile : string,
    pE_Email : string,
    appRefId : number,
    projectSiteRefId: number,
    applicationPurposeType : number,
    alcCircleRefId : number,
    iPin : number,
    investPunjab_AppId : number,
    totalWorker:number,
    applicationType : number,
    projectSiteVersion : number
    legacy_LicenceNo : string

}
export interface Licence_CL_PE_ContractorDetails{
    id : number,
    name :string,
    address : string,
    natureOfWork :string,
    maxLabourWorkerEmployed :number,
    dateOfCommencement : Date,
    dateOfTermination :  Date,
    licence_CL_PE_GeneralDetailRefId : number,
};


export interface Licence_CL_PE_ContractorDetailViewModel{
    id: number,
    appRefId: number,
    applicationPurposeType: number,
}

export interface IContractorDetailViewModel{
    id: number,
    appRefId: number,
    appTypeStatus: number,
    applicationPurposeType: number,
    totalworkers: number,
}


export type CL_PE_LicenceDetailViewModel= {
    generalDetail: Licence_CL_PE_GeneralDetails,
    Licence_CL_PE_AmendmentDataHistories: Licence_CL_PE_AmendmentDataHistories,
    isLocked: boolean,
    isFeeApplicable: boolean,
    remarks : string,
    appActionType:number,
  };
  
  export interface Licence_CL_PE_AmendmentDataHistories  {
    id : number,
    SectionCode : string,
    FieldName : string,
    PreviousValue : string,
    ModifiedValue : string,
    ModifiedOn : Date,
    ModifiedCounter : number,
}

export interface Licence_ContractLabour_GeneralDetail  {
    contractLabourId : number,
    isCoopraticSociety : string,

    contractorName : string,
    contractorFatherName : string,
    contractorAddress : string,
    contractorDOB : Date,
    panOrTanNumber : number,
    gstNumber: number,

    typeOfBusiness : string,


    registrationCertificateNo : number,
    registrationCertificateDate : Date,
    establishmentName:string,
    principalEmployerName : string,
    principalEmployerAddress : string,
    natureOfWork : string,

    contractWork_CommencingDate: Date,
    contractWork_TerminationDate : Date,
    maximumNumberOfEmployee : number,

    agentOrManagerName : string,
    agentOrManagerAddress : string,

    contractorAge:number,
    licenceForYear : number,
    modifiedCounter : string,

    peContractorId : number,
    appRefId : number,
    projectSiteRefId : number,
    applicationPurposeType : number,
    iPin : number,
    investPunjab_AppId:number,
    alcCircleRefId : number,
    districtRefId : number,
    legacyLicenceNumber:string,
}

export type Licence_Contract_LabourViewModel= {
    generalDetail: Licence_ContractLabour_GeneralDetail,
    Licence_ContractLabour_AmendmentDataHistories: Licence_CL_PE_AmendmentDataHistories,
    isLocked: boolean,
    isFeeApplicable: boolean,
    remarks : string,
    appActionType:number,
  };

  export interface Licence_CL_PE_GeneralDetail_ViewModel  {
    id : number,
    pE_Name : string,
    pE_FatherName : string ,
    pE_Mobile : string,
    pE_Email : string,
    pE_Address : string,
    manager_Name : string,
    manager_Mobile : string,
    manager_Email : string,
    manager_Address : string, 
    natureOfWork : string,
    totalWorker:number,
    modifiedCounter:number,
    appRefId : number,
    registrationDate:Date,
    establishmentName:string
}

export type AdhaarVerifyViewModel= {
    userName: string,
  };




  export interface Licence_MotorTransport  {
    id : number,
    transportUndertakingName : string,
    communicationAddress : string,
    communicationAddress_PinCode : string,
    communicationAddress_DistrictLgdId : number,
    communicationAddress_TehsilLgdId : number,
    transportServiceName : string,
    totalRoutes : number ,
    totalRouteMileage : number,
    totalVehicles : number,
    maxTransportWorkers : number,
    nameAddressType : string,
    nameAddressType_Name: string,
    nameAddressType_Email : string,
    nameAddressType_Mobile : string,
    nameAddressType_Address : string,
    isCompanyRegUnderCompaniesAct : number,
    director_Name: string,
    director_Email : string,
    director_Mobile : string,
    director_Address : string,
    licenceForYear:number,
    appRefId: number,
    projectSiteRefId: number,
    applicationPurposeType : number,
    iPin : number,
    investPunjab_AppId : number,
    alcCircleRefId : number,
    oldAppRefId : number,
    projectSiteVersion:number,
    districtName:string,
    tehsilName:string,

}
export type MotorTransportLicenceDetailViewModel= {
    generalDetail: Licence_MotorTransport,
    licence_Motor_Transport_AmendmentDataHistories: Licence_Motor_Transport_AmendmentDataHistories,
    isLocked: boolean,
    isFeeApplicable: boolean,
    remarks : string,
};

export interface Licence_Motor_Transport_AmendmentDataHistories  {
    id : number,
    SectionCode : string,
    FieldName : string,
    PreviousValue : string,
    ModifiedValue : string,
    ModifiedOn : Date,
    ModifiedCounter : number,
}

export interface Licence_PE_ISM_ContractorDetails{
    id : number,
    name :string,
    address : string,
    natureOfWork :string,
    maxLabourWorkerEmployed :number,
    dateOfCommencement : Date,
    dateOfTermination :  Date,
    licence_PE_ISM_GeneralDetailRefId : number,
};

export interface IContractorDetailISMViewModel{
    id: number,
    appRefId: number,
    appTypeStatus: number,
    applicationPurposeType: number,
    totalworkers: number,
}

export interface Licence_PE_ISM_AmendmentDataHistories  {
    id : number,
    SectionCode : string,
    FieldName : string,
    PreviousValue : string,
    ModifiedValue : string,
    ModifiedOn : Date,
    ModifiedCounter : number,
}


export type Licence_PE_ISMDetailViewModel= {
    generalDetail: Licence_PE_ISM_GeneralDetails,
    Licence_PE_ISM_AmendmentDataHistories: Licence_PE_ISM_AmendmentDataHistories,
    isLocked: boolean,
    isFeeApplicable: boolean,
    remarks : string,
    appActionType:number,
  };

  export interface Licence_PE_ISM_GeneralDetails  {
    id : number,
    manager_Name : string,
    manager_Address : string,
    manager_Email : string,
    manager_Mobile : string,
    natureOfWork : string,
    pE_Name : string,
    pE_FatherName : string ,
    pE_Address : string,
    pE_Mobile : string,
    pE_Email : string,
    appRefId : number,
    projectSiteRefId: number,
    applicationPurposeType : number,
    alcCircleRefId : number,
    iPin : number,
    investPunjab_AppId : number,
    totalWorker:number,
    applicationType : number,
    projectSiteVersion : number
    legacyLicenceNumber:string,
}

export interface Licence_PE_ISM_GeneralDetail_ViewModel  {
    id : number,
    pE_Name : string,
    pE_FatherName : string ,
    pE_Mobile : string,
    pE_Email : string,
    pE_Address : string,
    manager_Name : string,
    manager_Mobile : string,
    manager_Email : string,
    manager_Address : string, 
    natureOfWork : string,
    totalWorker:number,
    modifiedCounter:number,
    appRefId : number,
    registrationDate:Date,
    establishmentName:string,
}

  export interface Licence_ISM_PE_ContractorDetailViewModel{
    id: number,
    appRefId: number,
    applicationPurposeType: number,
}


export type Building_Plan_PSIEC_Questionnaire = {
    isSiteFallUnderMC: number,
    isSiteFallUnderPSIEC: number,
    isApprovedFromMC: number,
    isApprovedFromPSIEC: number,
}

export type Licence_BuildingPlan_PSIEC_GeneralDetail = {
    psiecBuildingPlanId: number,
    isUnderRightToBusinessAct: number,
    hadbustNumber : string,
    projectIdentificationNo : string,
    appIdRightToBusinessAct: string,
    dateOfPrincipalApproval : string,
    buidingPlanHUDApprovalType: number,
    buildingType: number,

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

    name : string,
    registrationNo : string,
    plotNo : string,
    pSIECPhaseType : number,

    plotAreaSqFt: number,
    plotAreaSqYards: number,
    
    appRefId: number,
    projectSiteRefId: number,
    applicationPurposeType : number,
    iPin : number,
    investPunjab_AppId : number,
    principalApproval_RBA_Details : PrincipalApproval_RBA_DetailsViewModel,
    projectSiteVersion :  number,

    competentPersonList: EmpanelledPersonDetails[];
    empaneledArchitectsList : EmpanelledPersonDetails[];
    empaneledEngineersList : EmpanelledPersonDetails[];
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

export type Licence_BuildingPlan_PSIECViewModel= {
    generalDetail: Licence_BuildingPlan_PSIEC_GeneralDetail,
    isLocked: boolean,
    isFeeApplicable: boolean
};



export interface Licence_TradeUnion  {
    tradeUnionId : number,
    tuName : string,
    tuAddress : string,
    workEngaged : string,
    licenceForYear:number,
    exisetencedate:Date,
    appRefId: number,
    projectSiteRefId: number,
    applicationPurposeType : number,
    iPin : number,
    investPunjab_AppId : number,
    labourCircleRefId : number,
    oldAppRefId : number,
    projectSiteVersion:number,
    districtName:string,
    tehsilName:string,
    isVerifybyLBIN:number,
    oldLicenceNo:string

}


export interface Licence_TradeUnion_Officer  {
    officerId : number,
    designation : string,
    officerName : string,
    address : string,
    phone:string,
    age:number,
    occupation: string,
    modifiedCounter : number,
    tradeUnionRefId : number,
}


export interface IOfficerDetailViewModel{
    tradeUnionId: number,
    appRefId: number,
    //applicationPurposeType: number,
    applicationLifeCycleStatusType: number,
    projectSiteVersion :  number,
}


export type TradeUnionDetailViewModel= {
    generalDetail: Licence_TradeUnion,
    isLocked: boolean,
    isFeeApplicable: boolean,
    remarks : string
  };






export interface Licence_ISM_ContractLabour_GeneralDetail  {
    ismContractLabourId : number,
    isCoopraticSociety : string,

    contractorName : string,
    contractorFatherName : string,
    contractorAddress : string,
    contractorDOB : Date,
    panOrTanNumber : number,
    gstNumber: number,

    typeOfBusiness : string,
    establishmentName:string,

    registrationCertificateNo : number,
    registrationCertificateDate : Date,
    principalEmployerName : string,
    principalEmployerAddress : string,
    natureOfWork : string,

    contractWork_CommencingDate: Date,
    contractWork_TerminationDate : Date,
    maximumNumberOfEmployee : number,

    agentOrManagerName : string,
    agentOrManagerAddress : string,

    contractorAge:number,
    licenceForYear : number,
    modifiedCounter : string,

    appRefId : number,
    projectSiteRefId : number,
    applicationPurposeType : number,
    iPin : number,
    investPunjab_AppId:number,
    alcCircleRefId : number,
    districtRefId : number,
    legacyLicenceNumber:string,
}

export type Licence_ISM_Contract_LabourViewModel= {
    generalDetail: Licence_ISM_ContractLabour_GeneralDetail,
    Licence_ISM_ContractLabour_AmendmentDataHistories: Licence_CL_PE_AmendmentDataHistories,
    isLocked: boolean,
    isFeeApplicable: boolean,
    remarks : string,
    appActionType:number,
  };

