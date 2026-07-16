export interface IStatusManagerRequestParms  {
    iPin: string,
    applicationId: string,
    applicationType: number,
    applicationPurposeType: number
}

export interface IStatusManagerResponseParms{
    establishmentName: string,
    address: string,
    districtName: string,
    tehsilName: string,
    actionPublicName: string,
    appActionType: number,
    appId: number,
	publicAppRefNum: string,
    investPunjab_AppId: number,
    actionDate: Date,
    remarks: string,
    actionTakenDaysCount: number,
    actionTakenHoursCount: number,
    actionTakenBy: string,
    actionTakenByRoleName: string,
    actionTakenByRoleNormalizeName: string,
    currentPendingWith: string,
    normalizedName: string
}


export interface ISearchParms  {
    searchParams: string
}

export interface GetAdminDashboardDetailsViewModel {
  userDetails: AdminDashboardUserDetailsViewModel[];
  establishmentDetails: AdminDashboardEstablishmentDetailsViewModel[];
  applicationDetails: AdminDashboardApplicationDetailsViewModel[];
  applicationActions: AdminDashboardActionLogViewModel[];
  applicationActionLogs: AdminDashboardActionLogViewModel[];
  paymentDetails: AdminDashboardPaymentDetailsViewModel[];
  approvalDetails: AdminDashboardApprovalDetailsViewModel[];
  welfareContributionDetails: AdminDashboardWelfareContributionDetailsViewModel[];
  annualReturnDetails: AdminDashboardAnnualReturnDetailsViewModel[];
  inspectionDetails: AdminDashboardInspectionDetailsViewModel[];
}

export interface AdminDashboardUserDetailsViewModel {
  userName: string;
  fullName: string;
  mobileNo: string;
  email: string;
}

export interface AdminDashboardEstablishmentDetailsViewModel {
  establishmentName: string;
  address: string;
  districtName: string;
  tehsilName: string;
  circleName: string;
  projectPurpose: string;
}

export interface AdminDashboardApplicationDetailsViewModel {
  appId: number;
  publicAppRefNum: string;
  serviceName : string,
  investPunjab_Ipin: string;
  investPunjab_AppId: string;
  createdOnDate: string;
  applicationLifeCycleStatusType: string;
  formStatus: string;
}

export interface AdminDashboardActionLogViewModel {
  appId: number;
  appActionType: number;
  actionName: string;
  senderUserName: string;
  senderName: string;
  receiverUserName: string;
  receiverName: string;
  actionDate: string;
  comment: string;
}

export interface AdminDashboardPaymentDetailsViewModel {
  appId: number;
  transactionAmount: string;
  transactionDate: string;
  uniquePaymentGatewayTransactionId: string;
  transactionStatus: string;
}

export interface AdminDashboardApprovalDetailsViewModel {
  srNo: number;
  appId: number;
  serviceName: string;
  licenceNumber: string;
  approvalDate: string;
  clearanceExpiredOn : string,
  licencePath: string;
}

export interface AdminDashboardWelfareContributionDetailsViewModel{
  appId : number,
  financialYear : string,
  timeSlot : string,
  amount : number,
  pwbCessCollectionId : number
}

export interface AdminDashboardAnnualReturnDetailsViewModel{
  appId : number,
  accNo : string,
  returnYear : string,
  returnType : string,
  returnID : number
}

export interface AdminDashboardInspectionDetailsViewModel{
  appId: number;
  establishmentName : string,
  licenceNumber : string,
  factoryHazardousCategoryType : string,
  inspectionDoneOn_Factory_Wing : Date,
  inspectionSubmittedFactoryWing : string,
  inspectionDoneOn_Labour_Wing : Date,
  inspectionSubmittedLabourWing : string
}

export interface ISearchTransactionByAppRefId  {
    appRefId: number
}

export interface DeemedapplicationDataViewModel  {
    deemedId: number,
    appRefId: number,
    allActDeemedProcessEngineRefId: number,
    applicationType: number,
    submissionDate: Date,
    initiateDeemedDate:Date,
    deemedDate:Date,
    totalTime: string,
    totalHolidaysTime: string,
    totalWeekEndsTime: string,
    totalObjectionTime: string,
    deemedInTime: string,
    maxDeemedTime: string,
    deemedTimeType: string,
    deemedProcessStatusType: number,
    deemedProcessRemarks: string,
    certificateFileName: string,
    fileDeemedDate: Date,
    officer_UserRefId: string,
    officer_RoleRefId: string,
    officer_ProfileRefId: string,
    serviceName: string,
    currentPendingWith: string,
    publicAppRefNum: string,
    establishmentName: string,
    contactPersonMobileNo: string,
    isFeeApplicable: number,
    invetPunjabiPin: string,
    invetPunjabiAppId: string,
}

export interface IUserArchitectAdditionalInfoMapping{
  userRefId : string,
  registrationNumber_DOF : string,
  architectName : string,
  architectfatherName : string,
  communicationAddress : string,
  contactNumber : number,
  email : string,
  registrationNumber_COA : string,
  registrationIssuedOn_COA : Date,
  registrationValidUpto_COA : Date,
  termAndCondition1 : boolean,
  termAndCondition2 : boolean,
  councilOfArchitectApproval : string,
  specimenSignature : string
}

export interface DeemedApplicationTimeLineViewModel  {
    appRefId: number,
    publicAppRefNum: string,
    serviceName: string,
    applicationType: number,
    establishmentName: string,
    submissionDate: Date,
    totalTime: number,
    totalHolidaysTime: number,
    totalWeekEndsTime: number,
    totalObjectionTime: number,
    deemedInTime: number,
    maxDeemedTime: number,
    deemedTimeType: string,
    lastDeemedDate: Date,
    userName:string
}

