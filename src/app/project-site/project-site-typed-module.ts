export interface ProjectSite {
    applicationType : string;
    applicationPurposeType : string;
    applicationStatus : string;
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
    alcCircleName:string;
    districtName: string;
    tehsilName: string;
    UserRefId: number;
    villageOrTown: string;
    createdDate: Date;
    applicantName : string;
    mobileNo : string;
    email : string;

    contactPersonName : string,
    contactPersonMobileNo : string,
    contactPersonEmail : string,
    projectSiteVersion : number,
    investPunjab_Ipin : string,
    licenceNumber : string
  };
  export interface IlastClerance {
    length: any;  
    licenceNo : string;
    licencePath : string;
    clearanceIssuedOn : Date;
    clearanceExpiredOn: Date;
    fileNo: string;
    projectSiteRefId: bigint;
    isLegacyApplication: number;
  };

  export interface ProjectSites {
    applicationType : string,
    applicationPurposeType : string,
    applicationStatus : string,
    projectSiteId: number,
    establishmentName: string,
    address: string,
    villageOrTown:string,
    tehsilRefId : number,
    districtRefId: number,
    pinCode: string,
    factoryCircleRefId:string,
    labourCircleRefId:string,
    factoryCircleName: string,
    labourCircleName: string,
    districtName: string,
    tehsilName: string,
    UserRefId: string,
    createdDate: Date,
    applicantName : string,
    mobileNo : string,
    email : string,
    ProjectPurpose:string,

    contactPersonFirstName : string,
    contactPersonMiddleName : string,
    contactPersonLastName : string,
    contactPersonMobileNo : string,
    contactPersonEmail : string,
    projectSiteVersion : number,
    alcCircleRefId:number,
    alternateEmail :string,
    alternateMobileNo :string,
  };