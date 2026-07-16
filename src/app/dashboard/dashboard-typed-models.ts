export type Dashboard = {
  appRefId: number;
  applicationPurposeType:number;
  establishmentName: string;
  address: string;
  publicAppRefNum: string;
  applicationType: string;
  appActionType: string;
  actionDate : string;
  projectSiteRefId : number;
  isEnabled: boolean;
  isDeleted: boolean;
  isDigitalSignatureRequired: boolean;
  isDigitalSignatureVerified: boolean;
  isLocked: boolean;
  isAllowEdit: boolean;
  isFeeApplicable: boolean;
  identityKey: number;
  actionName: string;
  actionPublicName : string;
  applicationLifeCycleStatusType: number;
  establishmentId : number;
  applicationTypeDesc: string;
  projectSiteVersion:number,
  legacy_AppId: number;
  currentPendingWith: string;
  normalizedName: string;
  };
  export type AlreadyClearancesData = {
    publicAppRefNum: string;
    appRefId: number;
    projectSiteRefId: number;
    actionDate : string;
    actionTakenDaysCount : number;
    actionTakenHoursCount : number;
    licenseIssuedBy : string;
    designation : string;
    establishmentId : number;
    applicationType: number;
    applicationPurposeType: number;
    licenceNumber:string,
    expiredOn:Date,
    projectSiteVersion:number,
    legacy_AppId: number;
    };
  export type RecordsTypeListViewModel ={
      applicationRefId: number,
      establishmentName: string,
      publicAppRefNum:string,
      address: string, 
      actionTakenBy: string,
      actionDate: string,
      actionTakenDaysCount: number,
      actionTakenHoursCount: number,
      currentPendingWith: string,
      normalizedName : string,
      remarks : string,
      actionName : string,
      actionPublicName : string,
      actionCode : string,
      projectSiteRefId : number;
      applicationType: number;
      applicationPurposeType: number;
      identityKey: number;
      actionTakenByRoleName: string;
      actionTakenByRoleNormalizeName: string;
      districtName :string;
      maxRows: number,
      projectSiteVersion : number,
      circleName : string
      applicationActionLogId : number,
      actionCanTakenUpto : Date,
      isTimeLineElapsed : boolean,
      appProcessPhaseType : number,
      isTimeLineFlow : boolean
  }
export type RecordTypeMenuCountViewModel= {
      recordHead: string,
      recordCount: number,
      headCode: string,
      applicationType: number,
      applicationTypeDesc: string,
      applicationTypeShortDesc: string
  }
  export type OfficialDashboardContentViewModel= {
      applicationType: number,
      recordTypeMenuCount:RecordTypeMenuCountViewModel[],
      recordsTypeList:RecordsTypeListViewModel[]
  }

  export type GetRedirectUrlViewModel= {
    redirectUrl:string,
}
  
  export interface IDataTableParamsViewModel{
    searchCode: string,
    pageNo: number,
    pageSize: number,
    sortColumn: string,
    sortOrder: string,
    filterArray: string
  };

  export interface ILegacyApprovedClearenceMapping {
    legacyApprovedClearenceMappingId : number,
    legacy_AppId : number,
    legacy_AppFormId : number,
    legacy_NAR : string,
    approvedOn : Date,
    attachmentName : string,
    sys_N_AppRefId : number,
    legacyLicenceNo : string
  }

  export interface IClearenceFileInfo{
    alreadyClearancesData: AlreadyClearancesData[],
    legacyApprovedClearenceMappings: ILegacyApprovedClearenceMapping[]
    getSysNClearancesIssueds: GetSysNClearancesIssuedsViewModel[]
    welfareFundDetails: WelfareFundStatusDetailsViewModel[]
    welfareSchemesDetails: WelfareSchemesDetailsViewModel[]
    inspectionsDetails: InspectionsDetailsViewModel[]
    unpaidWagesDetails: unpaidWagesDetailsViewModel[]
  }


  export interface IPSLDashboardMajorCountBP_HUD{
    countType: string,
    roleCode: string,
    roleDesc: string,
    roleId: string,
    counts: number
}

export interface IPSLDashboardMajorCountPivot{
  colDetail:IPivotColDetail
}
export interface IPivotColDetail{
  colCode: string,
  colName: string,
  colSpan: number,
  roleDetailList: IRoleDetail[]
}

export interface IRoleDetail{
  roleName: string,
  roleCode: string,
  roleId: string,
  counts: number,
  appActionType: number,
  applicationLifeCycleStatusType: number
}

export interface IPSLDashboardMajorCountRequestParms  {
  fromDate: string,
  toDate: string,
  roleName : string
}

export interface IDeemed_ProcessFilesLog {
  deemedId: number,
  appRefId: number,
  deemedProcessEngineRefId: number,
	applicationType: number,
	submissionDate: Date,
	totalTime: number,
  totalHolidaysTime: number,
	totalWeekEndsTime: number,
	totalObjectionTime: number,
	deemedInTime: number,
  maxDeemedTime: number,
	deemedTimeType: string,
  deemedProcessStatusType: number,
	deemedProcessRemarks: string,
	certificateFileName: string,
	fileDeemedDate: Date,
	officer_UserRefId: string,
	officer_RoleRefId: string
	officer_ProfileRefId: number
}

export interface IDeemed_All_Act_ProcessFilesLog  {
    appRefId: number,
    applicationType: number,
    submissionDate: Date,
    totalTime: number,
    totalHolidaysTime: number,
    totalWeekEndsTime: number,
    totalObjectionTime: number,
    totalDormantTime: number,
    deemedInTime: number,
    maxDeemedTime: number,
    deemedTimeType: string,
    fileDeemedDate: Date,  
}


export interface INotingLogs {
  senderName: string,
  receiverName: string,
  normalizedName: string,
  actionDate: Date,
  remarks: string,
  actionName: string,
  actionPublicName: string,
  checklist_Json: string,
  isDocumentUploaded: boolean,
  appDocumentRefId: number,
  attachmentName: string,
  actionTakenHoursCount: number,
  actionTakenDaysCount: number,
  applicationActionLogId : number,
  senderUserName : string,
  receiverUserName : string,
  applicationStatus : number

}

export interface IPaymentDetailsListViewModel {
  maxRows: number,
  appId : number,
  publicAppRefNum: string,
  investPunjab_Ipin : string,
  investPunjab_AppId : number,
  establishmentName:string,
  establishmentAddress: string, 
  districtName: string,
  tehsilName: string,
  actionName: number,
  applicantName: number,
  mobileNo: string,
  email : string,
  totalPaymentReceived : string,
}

export interface IOtherActClearancesData  {
    PublicAppRefNum : string,
    applicationType : string,
    applicationName : string,
    EstablishmentName : string,
    Address : string,
    ActionTakenBy : string,
    ActionDate : string,
    remarks : string,
    ActionTakenDaysCount : number,
    actionName : string,
    applicationRefId : string,
    projectSiteRefId : number,
    actionCode : number,
    actionPublicName : string,
    actionTakenHoursCount : number,
    currentPendingWith : string,
    normalizedName : string,
    actionTakenByRoleName : string,
    actionTakenByRoleNormalizeName : string,
    districtName : string
  };
  export interface IFormHViewModel {
    appID : number,
    nicCode : string,
    nicDesc : string,
    licenceNumber : string,
    publicAppRefNum : string,
    establishmentName : string,
    shopType : number,
    employeeCount : number,
    employeeMCount : number,
    employeeFCount : number,
    ownerName : string,
    ownerFatherOrHusbandName : string,
    address : string,
    tehsilName : string,
    mobileNo : string,
    alternateMobileNo : string,
    email : string,
    aadharNumber : string,
    createdOnDate : Date,
    applicationLifeCycleLastStatusOn : Date,
    establishmentConstitutionType : number,
    sender_UserRefId : string,
    list_Output : string,
    maxRows : number
  }

  export interface IFormH {
    fromDate : Date,
    toDate : Date
  }

  export interface IFactoryBacklogDataViewModel {
    publicAppRefNum : string,
    appId : number,
    factoryLicenceId : number,
    establishmentname : string,
    address : string,
    projectPurpose : string,
    workers_MaxDuringYear : number,
    powerKW_MaxProposed : number,
    ownerName : string,
    mobileNumber : string,
    email : string,
    factoryHazardousCategoryType : number,
    factorySessionCategoryType : number,
    factorySectionCategoryType_NVarChar : string,
    maxRows : number,
    isLegacy : number,
    appFormId : number,
    nar : string,
    applicantuserid : string,
    applicantprofileid : number,
    statusId : number,
    projectSiteRefId : number,
    legacy_AppId : number,
    licenceNumber : string,
    factoryCategoryType : number,
    factoryOrganisationType : string,
  }

  export interface IFactoryBacklog {
  }

  export type IFactoryBacklog_InputDetail = {
    userId : string,
    publicAppRefNum : string,
    appId : number,
    factoryLicenceId : number,
    establishmentname : string,
    address : string,
    projectPurpose : string,
    workers_MaxDuringYear : number,
    powerKW_MaxProposed : number,
    ownerName : string,
    mobileNumber : string,
    email : string,
    factoryHazardousCategoryType : number,
    factorySessionCategoryType : number,
    factorySectionCategoryType_NVarChar : string,
    establishmentname_original : string,
    address_original : string,
    projectPurpose_original : string,
    workers_MaxDuringYear_original : number,
    powerKW_MaxProposed_original : number,
    ownerName_original : string,
    mobileNumber_original: string,
    email_original : string,
    factoryHazardousCategoryType_original : number,
    factorySessionCategoryType_original : number,
    factorySectionCategoryType_NVarChar_original : string,
    isLegacy : number,
    remarks : string,
    deregistrationnumber : string,
    deregistrationdate : Date,
    appFormId : number,
    nar : string,
    appActionType: number,
    factoryCategoryType:  number
  }
  export type IFactoryBacklog_DeRegisterDetail = {
    remarks : string,
    deregistrationnumber : string,
    deregistrationdate : Date,
    appFormId : number,
    nar : string,
  }
  export type IFactoryBacklog_UpdateDetail = {
    factoryHazardousCategoryType : number,
    factorySessionCategoryType : number,
    factorySectionCategoryType_NVarChar : string,
    remarks : string,
    factoryOrganisationCategoryType : string,
    factoryCategoryType: number
  }

  export interface ApplicationDetailViewModel{
    currentStatus: GetCurrentStatusViewModel,
    clearances: GetClearancesIssuedsViewModel,
    serviceLogs: ProcessImd_ClearencesLogViewModel,
    clearencesFee: ProcessImd_ClearencesFeeViewModel,
    welfareFundDetails : WelfareFundDetailsViewModel,
    annualReturnDetails : AnnualReturnDetailsViewModel,
    factoryInspectionDetails:FactoryInspectionDetailsViewModel
  };

  export type SysNApplicationDetailViewModel ={
    applicationDetails:GetApplicationDetailsViewModel
    currentStatus: GetSysNCurrentStatusViewModel,
    clearances: GetSysNClearancesIssuedsViewModel,
    welfareFundDetails : WelfareFundDetailsViewModel,
    annualReturnDetails : AnnualReturnDetailsViewModel,
    factoryInspectionDetails:FactoryInspectionDetailsViewModel,
    buildingPlanDetails:GetMappedBuildingPlanViewModel

  };

  export interface GetSysNCurrentStatusViewModel  {
    estdname :string,
    appId :number,
    appFormId : number,
    nar : string,
    statusDate :Date,
    statusId : number,
    fileNumber : string,
    actName : string,
    siteAddress : string
    mobileNo : string,
    email : string,
    projectPurpose : string,
    statusDesc : string
  }

  export interface GetSysNClearancesIssuedsViewModel  {
    tokenNumber : string,
    actName : string,
    clearanceIssuedOn : Date,
    clearanceExpiredOn : Date,
    licenceNo : string,
    appId : number,
    appFormId : number,
    nar : string,
    isLegacy : number,
    licencePath : string
  }

  export interface GetMappedBuildingPlanViewModel  {
    facAppid : number,
    tokennumber : string,
    BpAppid : number,
    licenceNo : string,
    issuedOn : Date,
    licencePath : string,
    appformId : number,
    nAR : string
  }

  export type GetCurrentStatusViewModel = {
    estdname :string,
    appId :number,
    AppFormId : number,
    nar : string,
    statusDesc : string,
    statusDate :Date,
    statusId : number,
    fileNumber : string,
    actName : string,
    regulatoryDeptID : number,
    appFormAbbre : string,
    appMultipalLicenseId : number,
    receiver : string,
    siteAddress : string
    mobileNo : string,
    email : string,
    projectPurpose : string
  }

  export type GetApplicationDetailsViewModel = {
    estdname :string,
    siteAddress : string
    projectPurpose : string
    fileNumber : string,
    appId :number,
    mobileNo : string,
    email : string,
  }

  export type GetClearancesIssuedsViewModel = {
    tokenNumber : string,
    actName : string,
    clearanceIssuedOn : Date,
    clearanceExpiredOn : Date,
    licenceNo : string,
    appId : number,
    appFormId : number,
    nar : string
  }

  export type ProcessImd_ClearencesLogViewModel = {
    senderUserId :string,
    senderProfileID :number,
    receiverUserId : string,
    ReceiverProfileID : number,
    statusId : number,
    statusDesc : string,
    statusDate :Date,
    appId :number,
    AppFormId : number,
    nar : string,
    senderRoleId : string,
    receiverRoleId : string,
  }

  export type ProcessImd_ClearencesFeeViewModel = {
    transactionAmount :number,
    transactionDate :Date,
    feeType : string,
    paymentDate : Date,
    bANK_REFERENCE_NO : string,
    mE_TXN_REF_NO : string,
    reqMsg :string,
    resMsg :string,
  }
  
  export type RoleWiseAllowedActionCode ={
    roleId : string;
    currentActionCode : number;
    isDocumentUploadOption : boolean;
    isOptional : boolean;
    docRefId : number;
    allowedActionCode : number;
    actionName : string;
  }

  export interface WelfareFundDetailsViewModel 
  {
    pWBCessCollectionId:number,
    appId: number,
    financialYear: string,
    timeSlot: string,
    amount: number,
  }

  export interface AnnualReturnDetailsViewModel 
  {
    appId: number,
    accNo: string,
    returnYear: string,
    returnType: number,
    returnID : number
  }

  export type GetApplicationNotingLogsViewModel = {
    [x: string]: any;
    statusDesc :string,
    statusDate :Date,
    appPBIPActionLogId : number,
    officerName : string,
    name : string,
    remarks : string
  }

  export type ApplicationFeeDetailsViewModel = {
    actName :string,
    transactionAmount :number,
    transactionDate : Date,
    paymentDate : Date,
    feeType : string,
  }

  export interface FactoryInspectionDetailsViewModel  {
    fIId :number,
    randomizationYear :number,
    randomizationMonth :number,
    factoryName :string,
    factoryOwner :number,
    factoryInspectorName : Date,
    shiftTiming : Date,
    maleEmployeeNumber : string,
    femaleEmployeeNumber : string,
    employeeNumber : string,
    violation : string,
    remarks : string,
    inspectionDate : Date
  }

  export type IMapBuildingPlan_InputForm = {
    dofnumber : string
  }

  export type GetBuildingPlanDetailsViewModel = {
    publicAppRefNum :string,
    establishmentName :string,
    address : string,
    isLegacy : number
  }

  export interface IFactoryBacklogCountViewModel {
    approvedCount  :number,
    inObjectionCount :number,
    deregisteredCount : number,
    backlogCount : number
  }

  export interface IFactoryBacklogExcelDataViewModel {
    publicAppRefNum : string,
    appId : number,
    factoryLicenceId : number,
    establishmentname : string,
    address : string,
    projectPurpose : string,
    workers_MaxDuringYear : number,
    powerKW_MaxProposed : number,
    ownerName : string,
    mobileNumber : string,
    email : string,
    factoryHazardousCategoryType : number,
    factorySessionCategoryType : number,
    factorySectionCategoryType_NVarChar : string,
    maxRows : number,
    isLegacy : number,
    appFormId : number,
    nar : string,
    applicantuserid : string,
    applicantprofileid : number,
    statusId : number,
    projectSiteRefId : number,
    legacy_AppId : number,
    occupierFullName :string,
    occupierFullAddress :string,
    managerFullName :string,
    managerFullAddress :string,
    licenceNumber :string,
    clearanceIssuedOn :Date,
    clearanceExpiredOn :Date,
    factoryCategoryType : number
  }

  export interface IMPR_Factory_DashboardViewModel{
    id: number,
    monthName: string,
    month: number,
    year: number,
    isLocked: boolean,
    lastModifiedOn: Date,
    submittedBy_UserRefId: string,
    fullName: string,
    roleDesc: string,
    factoryCircleName: string,
    legacy_Role: string,
    legacy_Username: string,
    legacy_MPRId: number,
    isLegacy: number,
    maxRows: number
  }

  export interface IActAndApplicationPurposeTypeCountsViewModel{
    applicationType : number,
    applicationPurposeType : number,
    received : number,
    inObjection : number,
    pending : number,
    approved : number,
    rejected : number,
    deemed : number,
    revenue : number
  }

  export interface ICircleAndApplicationPurposeTypeCountsViewModel{
    circleName : string,
    circleRefId : number,
    applicationPurposeType : number,
    applicationType : number,
    revenue : number,
    received : number,
    inObjection : number,
    pending : number,
    approved : number,
    rejected : number,
    deemed : number
  }
  export interface IDesignationAndApplicationPurposeTypeCountsViewModel{
    applicationType : number,
    officerName : string,
    officerProfileRefId : number,
    applicationPurposeType : number,
    received : number,
    inObjection : number,
    pending : number,
    approved : number,
    rejected : number,
    deemed : number,
    revenue : number
  }

  export interface IFileWiseDataViewModel{
    appId : number,
    publicAppRefNum : string,
    establishmentName : string,
    address: string,
    actionTakenBy : string,
    actionDate : Date,
    remarks : string,
    actionTakenDaysCount : number,
    actionTakenHoursCount : number,
    currentPendingWith : string,
    actionPublicName: string,
    appActionType : number,
    projectSiteRefId : number,
    applicationType : number,
    applicationPurposeType : number,
    normalizedName : string,
    actionTakenByRoleName : string,
    actionTakenByRoleNormalizeName : string,
    districtName : string,
    circleRefId : number,
    maxRows: number,
    legacy_AppFormId : number,
    legacy_NAR : string
  }

  export interface IProfileAndApplicationPurposeTypeCountsViewModel{
    officerName : string,
    designation : string,
    circleName : string,
    received : number,
    inObjection : number,
    pending : number,
    approved : number,
    rejected : number,
    deemed : number,
    revenue : number
  }

  export interface IOfficerMISDashboardDetailsByRoleNameViewModel{
    officerName : string,
    officerProfileRefId : number,
    designation : string,
    received : number,
    inObjection : number,
    pending : number,
    approved : number,
    rejected : number,
    deemed : number
  }

  export interface IOfficerProfileAndActWiseDashboardDetailsViewModel{
    officerName : string,
    officerProfileRefId : number,
    applicationType : number,
    received : number,
    inObjection : number,
    pending : number,
    approved : number,
    rejected : number,
    deemed : number
  }
  export interface IOfficerProfileAndCircleWiseDashboardDetailsViewModel{
    officerName : string,
    officerProfileRefId : number,
    circleName : string,
    circleRefId : number,
    applicationType : number,
    received : number,
    inObjection : number,
    pending : number,
    approved : number,
    rejected : number,
    deemed : number
  }

  export interface ICurrentlyDesignatedOfficerDetailsViewModel{
    circleId : number,
    circleName : string,
    roleName : string,
    roleNormalizedName : string,
    officerName : string
  }

  export interface ILabourWelfareSchemeApplicationCountsViewModel{
    designation : string,
    officerName : string,
    circleName : string,
    labourCircleGradeName : string,
    received : number,
    approved : number,
    rejected : number,
    pendency : number,
    inObjection : number,
    pendency30Days : number,
    pendency60Days : number
    pendency90Days : number,
    pendency365Days : number,
    pendencyAbove365Days : number
  }

  export interface lastClerance {
    licenceNo : string;
    licencePath : string;
    clearanceIssuedOn : Date;
    clearanceExpiredOn: Date;
    fileNo: string;
  };

  export interface IEsamikshaCountsViewModel{
    totalInspectionsRandomized:number,
    factoryWingSubmitted:number,
    labourWingSubmitted:number,
    factoryWingPending:number,
    labourWingPending:number,
    labourCircleAssigned:number,
    factoryViolationCount:number,
    labourViolationCount:number,
    registeredFactoriesInTheAskedMonth:number,
    totalRegisteredFactories:number,
    applicationsReceived:number,
    applicationsApproved:number,
    pendingBeyondTimeline:number,
    feeCollected:number
   
  }
  export interface GetPendingAppCountsViewModel{
    iPin:number,
    applicationId:number,
    serviceName:string,
    integrationDept:string,
    submittedOn:string,
    currentStatus:string,
    updatedOn:string,
    noOfActions:number
    maxRows: number
  }

  export interface IPendencyCountViewModel{
    serviceCode:number,
    serviceName:string,
    pendingAtDepartment:number,
    pendingAtInvestor:number,
  }


  export interface LWFMonthWiseContributionViewModel 
  {
    financialYearMonthlyContributionID:number,
    pWBCessCollectionId: number,
    monthName: string,
    noOfWorkers: number,
    totalContribution: number,
    employerShare: number,
    employeeShare: number,
    noOfEmpsOnLeave: number,
  }


  
  export interface LWFEmployeeContributionViewModel 
  {
    pWBEmployeeId :number, 
    empName :string,
    aadharNo :string,
    mobile :string,
    eSICNo :string,
    pFNo :string,
    empDOJ :Date,
    bankAccountNo :number,
    bankName :string,
    gender :string,
    iFSCCode :string,
    skillLevel :string,
    empDOR :Date,
    empDOB :Date,
    fatherOrHusbandName:string,

  }

  export interface GetAppActionDocumentsViewModel 
  {
    
    docName:string,
    fileName:string,

  }

  export interface GetApplciationLogsRequestParms  {
    appid: number,
    investPunjabAppid: number,
    publicRefrenceNo : string,
  }
  
  export interface GetApplciationLogsViewModelViewModel{
    appId : number,
    investPunjab_Ipin : string,
    investPunjab_AppId : number,
    publicAppRefNum : string,
    applicationType : number,
    actionTakenDaysCount:number,
    establishmentName : string,
    establishmentAddress : string,
    applicationTypeDesc : string,
    applicationPurposeType : number,
    applicationPurposeTypeDesc : string,
    createdOnDate : Date,
    legacy_AppId : number,
    legacy_AppFormId : number,
    legacy_NAR : string,
    legacy_LicenceNo : string,
    appActionType : number,
    actionName : string,
    actionDate : Date,
    senderUserName : string,
    senderName : string,
    senderRoleName : string,
    receiverUserName : string,
    receiverName : string,
    receiverRoleName : string,
    remarks : string,
  }

  export interface IAppActionTimeLineDefinations {
    id: number,
    appRefId: number,
    appActionLogRefId: number,
    slabDate: Date,
    totalWorkingTime: number,
    slabDayType: number,
    slabDayDesc: string,
    workStartsTime : Date,
    workEndsTime : Date,
    orderNo : number,
    allowedAppActionType: number,
    hours: number,
    minutes: number
  }

  export type ServiceList = {
    applicationLifeCycleStatusType: number; 
    applicationPurposeType:number;
    appRefId: number;
    establishmentName: string;
    serviceName: string;
    applicationType: string;
    
    };

    export type deemedParms = {
    deemedDate: Date;
    
    };


    export interface IEmpanelledPersonDetails  {
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

  export interface IOfficerTransferDetails  {
    username:string;
    currentProfileId : number,
    currentofficerName : string,
    currentofficerMobileNo: number,
    tranferofficerProfileId: number,
    transferofficerName: string,
    transferofficerMobileNo:  number,
    trasnferDate: Date,
    role:string,
    remarks : string,
    base64: string
}

  export interface PasswordResetModel  {
    username:string,
    password : string,
    cofrmPassword : string,
}

  export interface IWhatsNewInPortal{
    id: string,
    title: string,
    description: string,
    modifiedDate: Date, 
    usageType : string
  }

   export interface IMPR_Alc_DashboardViewModel{
   id: number,
    monthName: string,
    month: number,
    year: number,
    isLocked: boolean,
    lastModifiedOn: Date,
    submittedBy_UserRefId: string,
    fullName: string,
    roleDesc: string,
    alcCircleName: string,
    legacy_Role: string,
    legacy_Username: string,
    legacy_MPRId: number,
    isLegacy: number,
    maxRows: number
}
export interface IMPR_Labour_DashboardViewModel{
   id: number,
    monthName: string,
    month: number,
    year: number,
    isLocked: boolean,
    lastModifiedOn: Date,
    submittedBy_UserRefId: string,
    fullName: string,
    roleDesc: string,
    labourCircleName: string,
    legacy_Role: string,
    legacy_Username: string,
    legacy_MPRId: number,
    isLegacy: number,
    maxRows: number
}
  export interface IAnnualReturn_DashboardViewModel{
  userId:string,
  returnYear:string,
  submittedOn:string,
  isLocked:boolean,
  acknowledgementNo:string,
  actIds:string,
  projectSiteRefId: number;
  licenceNumber:string
  

}

export interface WelfareSchemesDetailsViewModel  {
    said : number,
    aLLCId : number,
    lCGID : number,
    fCID : number,
    schemeId : number,
    schemename : string,
    updateDate : Date,
    appSubmitDate : Date,
    amount : string,
    sender_id : string,
    receiver_id : string,
    schemeref : number,
    schemejson : string
  }

  export interface WelfareFundStatusDetailsViewModel  {
    pwbCessCollectionId : number,
    appId : number,
    financialYear : string,
    timeSlot : string,
    amount : string,
    tdate : Date,
    appStatus : number,
    licence_Number : string
  }

 export interface ITransperancyCountsViewModel {
  applicationType: number;
  actName: string;
  beginningPending: number;
  receivedInPeriod: number;
  approved: number;
  rejected: number;
  objections: number;
  currentPending: number;
  deemedAndOthers: number
}

export interface InspectionsDetailsViewModel  {
    month: number;
    year: number;
    licenceNumber: string;
    inspectionDoneOnFactory: Date;
    submittedByNameFactory: string;
    submittedByRoleFactory: string;
    inspectionDoneOnLabour: Date;
    submittedByNameLabour: string;
    submittedByRoleLabour: string;
  }

  export interface unpaidWagesDetailsViewModel  {
    appId: number;
    licenceNo: string;
    lwbSlabType: number;
    year: string;
    employeeCount: number;
    verifiedEmployees: number;
    id: number;
    lwbAadhaarVerficationStatusType: number;
    createdOn: Date;

  }


  // For Samadhan Portal
export interface Issue {
  label: string;
  hasInfo: boolean;
  info?: string;
}

export interface Category {
  title: string;
  issues: Issue[];
}

export interface ApplicationSummary {
  title: string;
  total: number;
  pending: number;
  disposed: number;
  iconBg: string;
}

export interface FAQ {
  question: string;
  answer: string;
  isOpen: boolean;
}

export interface ComplaintCategory {
  id: number;
  complaintTitle: string;
  complaintCategoryType: number;
}

export interface Issue {
  id: number;
  label: string;
  hasInfo: boolean;
  info?: string;
}

export interface Category {
  title: string;
  issues: Issue[];
}

export interface Tab {
  id: string;
  label: string;
  closable?: boolean;
}

export interface WorkerAddress {
  address: string;
  country: string;
  state: string;
  district: string;
  pincode: string;
}

export interface WorkerFormModel {
  name: string;
  gender: string;
  designation: string;
  maritalStatus: string;
  mobileNumber: string;
  email: string;
  permanentAddress: WorkerAddress;
  sameAsAbove: boolean;
  correspondenceAddress: WorkerAddress;
}

export interface FAQTableRow {
  issues: string;
  whoCanRaise: string;
  applicableAct?: string;
}

export interface FAQ {
  question: string;
  answer: string;
  tableRows?: FAQTableRow[];
  isOpen: boolean;
}

  // End 