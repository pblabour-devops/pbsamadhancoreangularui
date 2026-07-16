import { SafeResourceUrl } from "@angular/platform-browser"

export interface FileUploadResponse {
    id: number,
    fileName:string
  };

  export interface IUploadCsvResponseViewModel{
    isValidData: boolean,
    data: string
  }

  export interface IUploadCsvSheetDataViewModel{
    SheetData: any[]
  }




  export interface ICsvMismatchInfoViewModel{
    columnName: string,
    csvColumnMismatchType: number
  }

  export interface IUploadCsvResponseViewModel{
    uploadCsvErrorType: number,
    csvMismatchList:ICsvMismatchInfoViewModel[],
    isValidData: boolean,
    modelColumnList: string[]
    rows: IUploadCsvIncorrectDataViewModal[]
  }

  export interface IUploadCsvIncorrectDataViewModal{
    row: any,
    validationErrors: string,
    excelSheetRowIndex: number
  }

  export interface IWelfareFundAndAnnualReturnViewModel{
    appId: number,
    financialYear: string,
    timeSlot: string,
    amount: number,
  }

  export interface  IApplicationAdditionalDetailsViewModel{
    welfareFundDetails : IWelfareFundDetailsViewModel[]
    annualReturnDetails : IAnnualReturnDetailsViewModel[]
  }
  export interface IWelfareFundDetailsViewModel
  {
    appId: number,
    financialYear: string,
    timeSlot: string,
    amount: number,
  }

  export interface IAnnualReturnDetailsViewModel
  {
    appId: number,
    accNo: string,
    returnYear: string,
    returnType: number,
  }

  export interface InspectionEstablishmentBasicDetailsViewModel{
    establishmentName : string,
    establishmentAddress : string,
    licenceNo : string,
    workerDuringYear : number,
    workerPastYear : number,
    installedPower : number
  }
  export interface IPropertyTitleValuePair {
    title: string;
    value: string;
}

export interface InspectionSectionWiseKeyValuePair {
    pairs_GeneralDetails: IPropertyTitleValuePair[];
    pairs_FactoryDetails: IPropertyTitleValuePair[];
    pairs_Health: IPropertyTitleValuePair[];
    pairs_Safety: IPropertyTitleValuePair[];
    pairs_Welfare: IPropertyTitleValuePair[];
    pairs_General: IPropertyTitleValuePair[];
    pairs_Accident: IPropertyTitleValuePair[];
    pairs_EnumerationAct: IPropertyTitleValuePair[];
    pairs_MinimumWageAct: IPropertyTitleValuePair[];
    pairs_PaymentWagesAct: IPropertyTitleValuePair[];
    pairs_StatutoryReport: IPropertyTitleValuePair[];
    pairs_AdolescentLabourAct: IPropertyTitleValuePair[];
    pairs_FestivalHolidays: IPropertyTitleValuePair[];
    pairs_MaternityBenefitAct: IPropertyTitleValuePair[];
    pairs_ContractLabourAct: IPropertyTitleValuePair[];
    pairs_MigrantWorkmenAct: IPropertyTitleValuePair[];
    pairs_WelfareFundAct: IPropertyTitleValuePair[];
    pairs_GratuityAct: IPropertyTitleValuePair[];
    pairs_IndustrialEmploymentAct: IPropertyTitleValuePair[];
    pairs_BOCWAct: IPropertyTitleValuePair[];
    pairs_ObservationsAct: IPropertyTitleValuePair[];
} 

export interface ISelectedFiles {
  name: string;
  file: any;
  base64?: string;
}


export interface IUserArchitectAdditionalInfoMapping{
  id : number,
  nameOfTheParticipants : string,
  address : string,
  mobileNo : string,
  email : string,
  areYouMemberOfChdClub : string,
  membershipType : string,
  membershipNumber : string,
  handicap : number,
  isFeePaid : string,
  registrationDate : Date,
  signature : string
}
export interface IHybridEncryptionAlgoRespViewModel{
  i: string
  d: string,
  k: string,
  t: string,
  c: string,
  l: string,
  u: string,
  p: string
}
export interface IInitialPageRespViewModel{
  pageLink: string,
  isExternalLink: boolean,
  portalType: string
}

export interface IPublicKeyPairViewModel{
  keyName: string,
  keyValue: string,
  keyType: string
}

export interface IClientLocationViewModel{
  latitude: string,
  longitude: string
}


export interface IPdfWindowViewModel {
  id: number;
  title: string;
  pdfUrl: SafeResourceUrl;
  x: number;
  y: number;
  zIndex: number;
}

export interface IFilePreviewInfoViewModel{
  id: number;
  name: string;
  path: SafeResourceUrl;
  type: string;
  uploadedOn: string;
  title: string;
  publicReferenceNum: string,
  x: number;
  y: number;
  zIndex: number;
}

export interface IValidateGstResponseViewModel{
    success: boolean;
    message: string;
    data: IValidateGstResponseDataViewModel
}
export interface IValidateGstResponseDataViewModel {
  gstin: string;
  tradeName: string;
  legalName: string;
  address: string;
  status: string;
  approving_Auth: string;
  ward: string;
  district: string
}