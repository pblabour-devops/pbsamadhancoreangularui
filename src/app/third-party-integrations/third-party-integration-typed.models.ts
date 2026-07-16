import { IToDoTicket } from "../toDoActivity/to-do-activity.typed.models";

export interface IServiceGatewayResponseViewModel{
    hasException: boolean,
    exceptionMessage: string
    canApply: boolean,
    requestDeniedReason: string,
    symmetricKey: string,
    hasLessParameters: boolean,
    iPin: number,
    nativeAppId: number,
    nativeUserId: string,
    serviceCode: number,
    projectSiteRefId : number,
    categoryTypeId: number,
    isOtpVerificationRequired: boolean,
    contactSnapshot: string,
    isRequestToLegacyApp: boolean,
    legacyAppUrl:string,
    investPunjab_AppId : Number,
    isEntityKeysToKeepSame: boolean
    toDoActivityModeType : number,
    rootActivityRefId : string,
    toDoActivityCategoryType : number,
    hasOpenedTickets: boolean,
    toDoTickets: IToDoTicket[],
    licenceNo: string,
    projectSiteVersion :  number,
    encryptionKey: string,
    ivKey: string
}

export interface ApplicationActionViewModel{
    appActionId : number;
    appActionType : number;
    userRefId : string;
    sender_ProfileRefId : number;
    receiver_UserRefId : string;
    receiver_ProfileRefId : number;
    actionDate : string; 
    actionTakenDaysCount : number;
    actionTakenHoursCount : string;
    remarks : string; 
    senderRoleId  : string;
    receiverRoleId : string;
    checklist_Json  : string;
    checklist_IsAllAgreed : boolean;
    checklist_FieldObjections : number; 
    checklist_DocObjections : number;
    isDocumentUploaded : boolean;
    actionPublicName: string;
}

export interface IStabiltyAcknoweldgementReceiptViewModel
{
  fileNumber : string;
  establishmentName : string;
  address : string;
  isStabilityApproved : number;
  villageOrTown : string;
  districtName: string;
  tehsilName: string;
  pinCode : string;
  applicationType : string;
  applicationPurposeType : string;
  contactPersonName : string;
  contactPersonMobileNo : string;
  contactPersonEmail : string;
  competentPersonName : string;
  competentPersonEmail : string;
  competentPersonContactNo : string;
  approvedDate : Date;
  engineerName : string;
  engineerContactNo : string;
  engineerEmail : string;
};

export type ApplicationWithdraw = {
  appActionType: number;
  receiver_UserRefId: string;
  remarks: string;
  appRefId: number;
  iPin : number,
  appId : number,
  applicationType : number,
  applicationPurposeType : number,
  projectSiteRefId : number,
  projectSiteVersion : number,
  ipAddress : string,
  latitude : string,
  longitude : string
};