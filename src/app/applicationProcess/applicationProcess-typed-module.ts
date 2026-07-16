export type ApplicationProcess = {
    appActionType: number;
    receiver_UserRefId: string;
    remarks: string;
    appRefId: number;
    pdfNameGUID: string;
    publicAppRefNum: string;
    checkListFormJson: string;
    userId: string;
    isDocumentUploaded: boolean;
    appDocumentRefId: number;
    attachmentName: string;
    paymentBatchCounter: number;
    factoryHazardousCategoryType: number,
    factorySectionCategoryType: number,
    factorySessionCategoryType: number,
    factoryCategoryType: number,
    labourCircleRefId: number,
    districtLgdRefId: number,
    raisedFeeReason : string,
    raisedFeeAmount : number,
    securityRaisedFeeAmount : number,

    existingWorkers_MaxDuringYear : number,
    existingPowerKW_Installed : number,
    workers_MaxDuringYear : number,
    powerKW_Installed : number,

    psiecCessAmount : number,
    psiecProcessingFeeAmount: number,

    ipAddress : string,
    latitude : string,
    longitude : string,
    previousActionType: number

};

export type ProjectSite= {
    projectSiteId: number;
    establishmentName: string;
    address: string;
    tehsilRefId : number;
    districtRefId: number;
    pinCode: string;
    factoryCircleRefId:string;
    labourCircleRefId:string;
    factoryCircleName: string;
    labourCircleName: string;
    districtName: string;
    tehsilName: string;
    UserRefId: number,
    villageOrTown: string
  };

  export type RoleWiseAllowedActionCode ={
    roleId : string;
    currentActionCode : number;
    isDocumentUploadOption : boolean;
    isOptional : boolean;
    docRefId : number;
    allowedActionCode : number;
    actionName : string;
    precheckCode : string;
  }

  export type AppActionTime_MutualProcessFlag = {
    hasClosed : boolean,
    officerName : string,
    officerDesignation : string,
  }

  export type ApplicationTransferParms = {
    appRefId: number;
    remarks: string;

    receiver_UserRefId: string;
    receiver_UserProfileRefId: number;
    receiver_RoleRefId: string
    
    sender_UserRefId: string;
    sender_UserProfileRefId: number;

    labourCircleId: number;
    factoryCircleId: number;
    alcCircleId: number;
  };

  export type InspectionTransferUserInfo = {
    userRefId : string;
    firstName : string;
    lastName : string;
    userProfileRefId : number;
    roleId : string;
    userName : string;
    circleId : number;
    circleName : string;
    juridictionArea : string;
  };

  export type TransferUserInfo = {
    userRefId : string;
    firstName : string;
    lastName : string;
    userProfileRefId : number;
    roleId : string;
    labourCircleId : number;
    labourCircleName : string;
    juridcitionArea : string;
    alcCircleName : string;
  };

  export interface IRecordActionResponseViewModel
  {
    appActionId : number,
    applicationActionLogId : number
  }


  export interface IVerifyAppCircleVersionRespViewModel{
    isAlreadyUpdated: boolean,
    latestCircles: ILatestCircleInfoViewModel[]
  }

  export interface ILatestCircleInfoViewModel{
  circleId: number,
  circleType: number,
  circleName: string,
  juridcitionArea: string,
  officerName: string,
  roleDesc: string,
  userId: string,
  userProfileId: number,
  roleId: string,
  appRefId: number,
  projectSiteRefId: number,
  sender_UserRefId: string,
  sender_UserProfileRefId: number
  }


  export type TransferFactoryCircleParms = {
    appRefId: number;
    remarks: string;

    receiver_UserRefId: string;
    receiver_UserProfileRefId: number;
    receiver_RoleRefId: string
    
    sender_UserRefId: string;
    sender_UserProfileRefId: number;

    factoryCircleId: number;
  };

  export type TransferFactoryCircleUserInfo = {
    userRefId : string;
    firstName : string;
    lastName : string;
    roleDesc : string;
    userProfileRefId : number;
    roleId : string;
    factoryCircleId : number;
    factoryCircleName : string;
    juridictionArea : string;
  };

  export type InspectionTransferParms = {
    inspectionId: number;
    remarks: string;
    labourCircleId: number;
  };



  export type TransferAlcCircleUserInfo = {
    userRefId : string;
    firstName : string;
    lastName : string;
    roleDesc : string;
    userProfileRefId : number;
    roleId : string;
    alcCircleId : number;
    alcCircleName : string;
    juridictionArea : string;
  };

 export interface IPSIECUserDetails {
  sdoDetails: IPSIECUsers[];
  eoDetails: IPSIECUsers[];
}
export interface IPSIECUsers {
  userRefId: string;
  userName: string;
  designation: string;
  officerName: string;
}
