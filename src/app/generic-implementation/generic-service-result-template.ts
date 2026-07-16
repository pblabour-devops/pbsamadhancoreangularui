export type GenericServiceResultTemplate = {
    applicationInitiateResponse: ApplicationInitiateResponse;
    customeValidationResult: CustomeValidationResult;
    hasException: boolean;
    exceptions:any;
}
export type GenericResponseTemplateModel<T> = {
    responseDataModel: T;
    hasError: boolean,
    errorDesc: string
  };
export type CustomeValidationResult = {
    isValid: boolean;
    customeValidationErrorList: any[];
    validationErrorMessages: string;
}

export type ApplicationInitiateResponse ={
        isApplicationCreated: boolean;
        appId: number;
        entityKeyId: number;
        publicAppRefNum: string;
}
