export interface IMPR_Factory  {
    id: number,
    month: number,
    year: number,
    jsonData: string,
    accidenInfoListJson: string,
    courtCaseInfoListJson: string,
    adminDutyInfoListJson: string,
    trainingInfoListJson: string,
    isLocked: boolean,
    lastModifiedOn: Date,
    submittedBy_UserRefId: string,
    submittedBy_ProfileRefId: number,
    submittedBy_RoleRefId: string,
    factoryCircleRefId: number
}

export interface IMPR_Factory_Accident{
    accidentType: number,
    noOfWorkersAffected: string,
    nameOfWorker: string,
    nameAndAddressOfEstb: string,
    dateAndTimeOfAccident: string,
    briefofAccident: string,
    dateOfInquiryReportSubmitted: string
}
export interface IMPR_Factory_CourtCase{
    courtType: number,
    titleOfCase: string,
    status: string,
}

export interface IMPR_Factory_AdminDuty{
    nameOfDuty: number,
    periodOfDuty: string,
    remarks: string,
}

export interface IMPR_Factory_Training{
    nameOfTraining: number,
    period: string,
    remarks: string,
}

export interface IEstablishment_EPFO{
    establishmentId : string,
    establishmentName : string,
    establishmentAddress1: string,
    establishmentAddress2 : string,
    city : string,
    district : string,
    pinCode : string,
    coverDate : string,
    establishmentStatus : string,
    establishmentType : string,
    industry_GRP_Id : string,
    industry_Code : string,
    dSC : string,
    }

    export interface epfonumber {
        establishmentId : string,
    }

export interface Establishment_EPFO_Logs {
      length: any;
    establishmentEPFOLogsId :string,
    establishmentRefId : string,
    hasSent :  string,
    sentRemarks : string,
    sentDate  : Date,
    sender_UserRefId  : string,
    senderProfileRefId : string,
    senderRoleId  : string,
} 

export interface Establishment_EPFO_Report {
    establishmentId: string,
    establishmentEPFOLogsId:number,
    establishmentName: string,
    establishmentAddress1 : string,
    establishmentType : string,
    sentRemarks  : string,
    sentDate: Date,
    disputeNumber : string,
    maxRows: number
} 
export interface IMergeFactoryLicenceDetails {
  isPrimary: number;   
  establishmentName: string;
  address: string;    
  employees: number;
  powerInstalled: number;
  manufacturingProcess: string;  
  licenceNumber: string;        
  licenceValidity: string;       
}