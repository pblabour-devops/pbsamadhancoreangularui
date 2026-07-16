export interface IOSH_Form_1_Registration {
    registrationId : number,
    ownershipType : number,
    panNumber : string,
    nameOnPan : string,
    dateOfBirth : string,
    isEstbCarryingAnyHazardousOccupation : boolean,
    osh_EstablishmentType : number,
    establishmentOtherTypeId : number,
    maximumNoOfWorkersToBeEmployedOnAnyDay : number,
    doYouWantVoluntaryCoverageForEPFO : boolean,
    doYouWantVoluntaryCoverageForESIC : boolean,
    nationalIndustrialClassificationCode : string,
    appRefId: number,
    projectSiteRefId: number,
    applicationPurposeType : number,
    applicationType : number,
    iPin : number,
    investPunjab_AppId : number,
    labourCircleRefId : number,
    districtRefId : number,
    projectSiteVersion : number
}

export interface IOSH_Form_1_Registration_Factory {
    id : number,
    manufacturingProcess : string,
    premiseName : string,
    subLocality_OR_Street_OR_ColonyName : string,
    locality_OR_Landmark : string,
    villageOrTown : string,
    state : string,
    tehsilRefId : number,
    districtRefId : number,
    pinCode : number,
    dateOfCommencement : string,
    
    appRefId: number,
    projectSiteRefId: number,
    applicationPurposeType : number,
    applicationType : number,
    iPin : number,
    investPunjab_AppId : number,
    labourCircleRefId : number,
    factoryCircleRefId : number,
    projectSiteVersion : number,
    toDoActivityModeType : number,
    rootActivityRefId : string,
    toDoActivityCategoryType : number,
}

export interface IOSH_Form_1_Registration_BOCW {
    id : number,
    nameOfConstructionWork : string,
    nameOfPrincipalEmployer : string,
    dateOfCommencementOfWork : string,
    dateOfCompletionOfWork : string,
    approvalDetailsByLocalAuthority : string,
    registrationNoOfPrincipalEmployer : string,

    appRefId: number,
    projectSiteRefId: number,
    applicationPurposeType : number,
    applicationType : number,
    iPin : number,
    investPunjab_AppId : number,
    labourCircleRefId : number,
    districtRefId : number,
    projectSiteVersion : number,
    toDoActivityModeType : number,
    rootActivityRefId : string,
    toDoActivityCategoryType : number,
}

export interface IOSH_Form_1_Registration_EmployeeDetail {
    id: number;
    directEmployee_Male: number;
    directEmployee_Female: number;
    directEmployee_Others: number;
    ismwDirect_Male: number;
    ismwDirect_Female: number;
    ismwDirect_Others: number;
    casualWorker_Male: number;
    casualWorker_Female: number;
    casualWorker_Others: number;
    fixedTerm_Male: number;
    fixedTerm_Female: number;
    fixedTerm_Others: number;
    buildingWorker_Male: number;
    buildingWorker_Female: number;
    buildingWorker_Others: number;
    contractLabour_Male: number;
    contractLabour_Female: number;
    contractLabour_Others: number;
    ismwContractLabour_Male: number;
    ismwContractLabour_Female: number;
    ismwContractLabour_Others: number;
    contractor_BuildingWorker_Male: number;
    contractor_BuildingWorker_Female: number;
    contractor_BuildingWorker_Others: number;
    supervisor_Male: number;
    supervisor_Female: number;
    supervisor_Others: number;
    employeeBelow21000_Male: number;
    employeeBelow21000_Female: number;
    employeeBelow21000_Others: number;
    contractBelow21000_Male: number;
    contractBelow21000_Female: number;
    contractBelow21000_Others: number;
    
    appRefId: number,
    projectSiteRefId: number,
    applicationPurposeType : number,
    applicationType : number,
    iPin : number,
    investPunjab_AppId : number,
    labourCircleRefId : number,
    districtRefId : number,
    projectSiteVersion : number,
    toDoActivityModeType : number,
    rootActivityRefId : string,
    toDoActivityCategoryType : number,
}

export interface IOSH_Form_1_Registration_MotorTransport {
    id : number,
    ubin : number,
    motorTransportNameUndertaking : string,
    motorTransportServiceName : string,
    mileage : number,
    noOfVehicle : number,
    maxNoOfEmployedOnAnyDay : number,
    
    appRefId: number,
    projectSiteRefId: number,
    applicationPurposeType : number,
    applicationType : number,
    iPin : number,
    investPunjab_AppId : number,
    labourCircleRefId : number,
    districtRefId : number,
    projectSiteVersion : number,
    toDoActivityModeType : number,
    rootActivityRefId : string,
    toDoActivityCategoryType : number,
}


export interface IOSH_Form_1_Registration_EPFO_ESIC_Detail {
    id: number;
    dateOnWhich10OrMorePersonEmployed: string;
    dateOnWhich20OrMorePersonEmployed: string;
    employeesVoluntaryRegistrationDate: string;
    dPIIT_StartupRegistrationNumber: string;
    dPIIT_StartupRegistrationDate: string;
    dateOfCommencement: string;
    esic_NatureOfWork: string;
    esic_SubCategory_NatureOfWork: string;
    esic_BranchOffice: string;
    esic_InspectionDivision: string;
    
    appRefId: number,
    projectSiteRefId: number,
    applicationPurposeType : number,
    applicationType : number,
    iPin : number,
    investPunjab_AppId : number,
    labourCircleRefId : number,
    factoryCircleRefId : number,
    projectSiteVersion : number,
    toDoActivityModeType : number,
    rootActivityRefId : string,
    toDoActivityCategoryType : number,
}

export interface IOSH_Form_1_Registration_EmployerDetail {
    id: number;
    employerType: string;
    employerName: string;
    designation: string;
    fatherOrHusbandName: string;
    email: string;
    mobileNo: string;
    premiseName: string;
    subLocality_OR_Street_OR_ColonyName: string;
    locality_OR_Landmark: string;
    villageOrTown: string;
    state: string;
    tehsilRefId: number;
    districtRefId: number;
    pinCode: string;
    
    appRefId: number,
    projectSiteRefId: number,
    applicationPurposeType : number,
    applicationType : number,
    iPin : number,
    investPunjab_AppId : number,
    labourCircleRefId : number,
    projectSiteVersion : number
}

export interface IOSH_Form_1_Registration_PrincipalEmployerDetail {
    id: number;
    principalEmployerName: string;
    designation: string;
    department: string;
    email: string;
    mobileNo: string;
    premiseName: string;
    subLocality_OR_Street_OR_ColonyName: string;
    locality_OR_Landmark: string;
    villageOrTown: string;
    state: string;
    tehsilRefId: number;
    districtRefId: number;
    pinCode: string;

    appRefId: number,
    projectSiteRefId: number,
    applicationPurposeType : number,
    applicationType : number,
    iPin : number,
    investPunjab_AppId : number,
    labourCircleRefId : number,
    projectSiteVersion : number
}

export interface IOSH_Form_1_Registration_ContractorDetail {
    id: number;
    isEstablishmentEngagedContractor: boolean;
    principalEmployerName: string;
    contractorName: string;
    nameAndLocationOfWork: string;
    premiseName: string;
    subLocality_OR_Street_OR_ColonyName: string;
    locality_OR_Landmark: string;
    villageOrTown: string;
    state: string;
    tehsilRefId: number;
    districtRefId: number;
    pinCode: string;
    email: string;
    mobileNo: string;
    panNumber: string;
    nameOnPan: string;
    dateOfBirth: string;
    maxNoOfContractLabourToBeEmployed: number;
    dateOfCommencementOfWork: string;
    dateOfCompletionOfWork: string;
    
    appRefId: number,
    projectSiteRefId: number,
    applicationPurposeType : number,
    applicationType : number,
    iPin : number,
    investPunjab_AppId : number,
    labourCircleRefId : number,
    projectSiteVersion : number
}


export type OSH_Form_1_RegistrationDetailViewModel= {
    registrationDetail : IOSH_Form_1_Registration,
    employeeDetail : IOSH_Form_1_Registration_EmployeeDetail,
    factoryDetail : IOSH_Form_1_Registration_Factory,
    bocwDetail : IOSH_Form_1_Registration_BOCW,
    motorTransportDetail : IOSH_Form_1_Registration,
    epfoEsiDetail : IOSH_Form_1_Registration_EPFO_ESIC_Detail,
    employerDetail: IOSH_Form_1_Registration_EmployerDetail,
    principalEmployerDetail: IOSH_Form_1_Registration_PrincipalEmployerDetail,
    contractorsDetail: IOSH_Form_1_Registration_ContractorDetail,
    isLocked: boolean,
    isFeeApplicable: boolean,
};