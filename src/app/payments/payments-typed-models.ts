
export interface FeeCalculatorInfoParmsViewModel {
    feeHeaderId: number;
    feeHeaderTitle: string;
    amountCalculated: number;
    isDeduductible: boolean;
    appRefId: number;
    description: string;
    paymentBatchCounter: number;
    paymentDetailId: number;
    hasDedicatedTreasuryCode: boolean;
    dedicatedTreasurCode: string;
    dedicatedDDOCode: string;
    isTreasuryPayment: boolean,
    nonTreasuryCode: string
  };

  export interface AppFeePaymentInitiateTerminalInfoViewModel{
        appRefId: number;
        paymentGatewayType: number;
        paymentModeType: number;
        paymentTreasuryType: number;
        paymentGatewayTargetUrl: string;
        paymentGatewayApiMethodType: number;
        uniquePaymentGatewayTransactionRefId: string;
        amountCalculated: number;
        //paymentGatewayClientFormInputs: PaymentGatewayClientFormInputViewModel[];
        paymentGatewayClientFormInputDetail: PaymentGatewayClientFormInputDetailsViewModel;
        applicationTypeName : string; 
        applicationPurposeTypeName : string;
        paymentPartCounter :number,
        paymentBatchCounter: number
    }

    export interface PaymentGatewayClientFormInputDetailsViewModel{
        paymentGatewayTargetUrl: string;
        paymentGatewayClientFormInputList: PaymentGatewayClientFormInputViewModel[];
    }
    export interface PaymentGatewayClientFormInputViewModel{
        formInputName: string;
        formInputValue: string;
        isHidden: boolean;
    }

    export interface IBuildingPlanHUDPaymentDetail {
        filter(arg0: (x: any) => boolean): unknown;
        paymentDetailId: number,
        feeHeaderRefId: number,
        paymentBatchCounter : number,
        amountRaised : number,
        amountAlreadyPaid : number,
        IsFeeApplicable : boolean,
        appRefId: number;
        amountPayable: number;
        feesHeader: IFeesHeader;
        description: string;
        hasDedicatedTreasuryCode: boolean;
        dedicatedTreasurCode: string;
        dedicatedDDOCode : string;
      };

      export interface IFeesHeader {
        feeHeaderId: number,
        feeHeaderTitle: string,
        majorHead_MajorSubHead_MinorHead_MinorSubHead_00: string
      }

    export interface IBuildingPlanHUDPaymentDetailViewModal{
        buildingPlanHUDPaymentDetailList : any[],
        appDocRefId: number
    }

    export interface IRaiseFeeParms{
      isForVerification : boolean;
      feeCalculatorInfoParms: FeeCalculatorInfoParmsViewModel[],
      remarks : string,
      isTimeLineFlow : boolean
    }

    export interface IAppFeeDetailViewModel{
      feeDetailId : number,
      appRefId : number,
      feeHeaderRefId : number,
      amount : number,
      calculatedOn : Date,
      isDeduductible : boolean,
      paymentBatchCounter : number,
      paymentPartCounter : number
      hasDedicatedTreasuryCode : boolean,
      dedicatedTreasurCode : string;
      dedicatedDDOCode : string;
      feesHeader: IFeesHeader;
    }

    export interface IAppPaymentPartViewModel{
      appPaymentPartId : number,
      appRefId : number,
      paymentBatchCounter : number,
      paymentPartCounter : number,
      transactionFinalStatusType : string,
      lastUpdatedOn : Date
    }

    export interface IAppPaymentPartsDetailViewModel{
      appFeeDetails : IAppFeeDetailViewModel[],
      appPaymentParts: IAppPaymentPartViewModel[]
    }

    export interface IApplicationRaiseFeeParms{
      isForVerification : boolean;
      feeCalculatorInfoParms: IApplicationRaiseFeeCalculatorInfoParmsViewModel[],
      remarks : string,
      toDoActivityModeType : number,
      rootActivityRefId : string,
      toDoActivityCategoryType : number,
      projectSiteRefId : number,
      projectSiteVersion : number,
      applicationType : number,
      applicationPurposeType : number,
      iPin : number,
      investPunjab_AppId : number,
      appRefId : number
    }
    export interface IApplicationRaiseFeeCalculatorInfoParmsViewModel {
      feeHeaderId: number;
      feeHeaderTitle: string;
      amountCalculated: number;
      isDeduductible: boolean;
      appRefId: number;
      description: string;
      paymentBatchCounter: number;
      paymentDetailId: number;
      hasDedicatedTreasuryCode: boolean;
      dedicatedTreasurCode: string;
      dedicatedDDOCode: string;
      isTreasuryPayment: boolean,
      nonTreasuryCode: string,
    };

    export interface IApplicationRaiseFeeDetail {
      filter(arg0: (x: any) => boolean): unknown;
      paymentDetailId: number,
      feeHeaderRefId: number,
      paymentBatchCounter : number,
      amountRaised : number,
      amountAlreadyPaid : number,
      IsFeeApplicable : boolean,
      appRefId: number;
      amountPayable: number;
      feesHeader: IFeesHeader;
      description: string;
      hasDedicatedTreasuryCode: boolean;
      dedicatedTreasurCode: string;
      dedicatedDDOCode : string;
    };

    export interface IApplicationPaymentDetailViewModal{
      applicationPaymentDetailList : any[],
      appDocRefId: number,
      toDoActivityModeType : number,
      rootActivityRefId : string,
      toDoActivityCategoryType : number,
      projectSiteRefId : number,
      projectSiteVersion : number,
      applicationType : number,
      applicationPurposeType : number,
      iPin : number,
      investPunjab_AppId : number,
      appRefId : number
  }


export interface IEstablishmentWisePaymentDetailsRequestParms  {
  fromDate: string,
  toDate: string,
  serviceType : string
}