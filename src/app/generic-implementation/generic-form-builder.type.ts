import { AbstractControl, UntypedFormArray, UntypedFormGroup } from '@angular/forms';

/**
 * Form.controls autocomplete with value types.
 */
export type FormControls<T> = {
  [key in keyof T]: T[key] extends TForm<any> | UntypedFormArray // If control value has type of TForm (nested form) or FormArray
    ? T[key] // Use type that we define in our FormModel
    : Omit<AbstractControl, 'value'> & { value: T[key] } // Or use custom AbstractControl with typed value
};

export type TForm<T> = UntypedFormGroup & {
  controls: FormControls<T>;
};


export type GenericFormModel<T> ={
  hasError: any;
  formModel: T;
  isEditAllowed: boolean;
  isLocked: boolean;
  enumTemplateLists: EnumListTemplate[];
  listTemplateLists: ListTemplate[];
  appFormStepsList: AppFormStepsInfo[];
};

export type ListTemplate={
  listTypeCode: string;
  listItems: GenericListTemplate[];
};

export type GenericListTemplate={
  id: number;
  text: string;
};

export type EnumListTemplate={
  selectListTypeCode: string;
  selectListItems: SelectList[];
};

export type SelectList={
  disabled: boolean;
  group: string;
  selected: boolean;
  text: string;
  value: string;
};

export type AppFormStepsInfo={
  stepTitle: string;
  isFilled: boolean;
  isLink: boolean;
  uiPageComponentPath: string;
  entityParentKeyId: number;
};

export interface AppFileInfo {
  docId: number,
  docTitle:string,
  allowedTpes:string,
  maxSizeMb:number
};

export type GenericListModel<T> = {
  listData: T[],
  hasError: boolean,
  errorDesc: string
}
export interface AppFileUploadInfoViewModel
{
    documentId: number,
    allowedMaxMB: number,
    allowedMinMB: number,
    documentExtensionType: string,
    documentName: string,
    isOptional: boolean,
    alreadyUploaded: string,
    alreadyUploadedInfo: AppFileAlreadyFileUploadedViewModel[],
    isSampleDoc : boolean,
    sampleDocPath : string,
};
export interface AppFileAlreadyFileUploadedViewModel
{
    fileName: string,
    fileUploadOn: Date,
    isLocked: boolean
}

export type CircleManagerViewModel= {
  factoryCircleId: number,
  factoryCircleName: string,
  juridictionArea: string,
  officerName : string,
  designation : string,
  mobileNo : number,
  email : string
};

export type LabourCircleViewModel= {
  labourCircleId: number,
  labourCircleName: string,
  juridictionArea: string,
  alcCircleName: string,
};


export interface NICCode
{
  nicCodeId: number,
  nicCode:string,
  parentNicCode:string,
  codeName: string,
  description:string,
  comment:string
};

export class DisplayPaymentViewModel
{
  feeHeaderTitle : string;
  transactionDate : Date;
  departmentTransactionId : string;
  bankTransactionId: string;
  amount : string;
  establishmentName : string;
  address : string;
  villageOrTown : string;
  districtName: string;
  tehsilName: string;
  pinCode : string;
};

export interface IPaymentDetailViewModel{
  appFeeTransactionDetailList: IAppFeeTransactionDetailsViewModal[];
  paymentProofList: IPaymentProofViewModal[]
}

export interface IAppFeeTransactionDetailsViewModal
{
  paymentBatchCounter : number;
  bankSettlementOn : string;
  appFeeDetails :  IAppFeeDetail[];
  appFeeSuccessTransactions: IAppFeeTransaction[];
  buildingPlanHUDPaymentDetailList: IBuildingPlanHUDPaymentDetail[]
};

export interface IPaymentProofViewModal{
  attachmentName: string;
  attachmentTitle: string;
  uploadedOn: Date;
};

export interface IAppFeeDetail
{
  feeDetailId : number,
  appRefId : number,
  feeHeaderRefId : number,
  amount : string,
  calculatedOn : string,
  isDeduductible : boolean,
  feesHeader: IFeesHeader,
  description: string
}

export interface IFeesHeader {
  feeHeaderId: number,
  feeHeaderTitle: string,
  majorHead_MajorSubHead_MinorHead_MinorSubHead_00: string
}

export interface IAppFeeTransaction {
  appFeeTransactionId: number,
  transactionInitializationDate: Date,
  paymentGatewayType: number,
  paymentModeType: number,
  paymentTreasuryType: number,
  paymentGatewayTargetUrl: string,
  paymentGatewayApiMethodType: number,
  uniquePaymentGatewayTransactionId: string,
  isWebRequestCycleCompleted: boolean,
  requestBodyData: string,
  responseBodyData: string,
  responseReceivedOn: Date,
  responseMessage: string,
  transactionFinalStatusType: number,
  amountCalculated: number,
  paymentBatchCounter: number,
  bankTransactionRefNumber1: string,
  bankTransactionRefNumber1_Type: number,
  bankTransactionRefNumber2: string,
  bankTransactionRefNumber2_Type: number,
  bankSettlementOn: Date,
  appRefId: number
}

export interface IBuildingPlanHUDPaymentDetail{
  paymentDetailId: number,
  appRefId: number,
  feeHeaderRefId: number,
  paymentBatchCounter: number,
  amountRaised: number,
  amountAlreadyPaid: number,
  isFeeApplicable: boolean,
  createddate: Date,
  lastModifiedDate: Date,
  feesHeader: IFeesHeader
  amountPayable: number,
  description: string
}
export class EstablishmentCardInfoViewModel
{
  fileNumber : string;
  establishmentName : string;
  address : string;
  villageOrTown : string;
  districtName: string;
  tehsilName: string;
  pinCode : string;
  applicationType : string;
  applicationPurposeType : string;
  publicAppRefNum : string;
  contactPersonName : string;
  contactPersonMobileNo : string;
  contactPersonEmail : string;
  projectPurpose : string;
  investPunjab_Ipin : string;
  investPunjab_AppId : number;
};

export interface IApplicationAddendumDocumentViewModel{
  id: number,
  title: string,
  attachmentName: string,
  lastModifiedDate: Date,
  appRefId: number
}

export interface InformationViewModel{
  feeDetailsList: IPaymentDetailsByLicenceNoViewModel[];
}

export interface IPaymentDetailsByLicenceNoViewModel{
  licenceNo : string,
  applicationType : number,
  paymentAmount : string,
  paymentHeadName : string,
  paymentDate : string,
}

export type ALCCircleManagerViewModel= {
  alcCircleId: number,
  alcCircleName: string,
  juridictionArea: string,
  officerName : string,
  designation : string,
  mobileNo : number,
  email : string
};