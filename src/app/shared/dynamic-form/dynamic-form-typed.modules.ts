export interface IDynamicFormViewModel  {
  clientId_OnCreation: string,
  clientId_OnSubmission: string,
  formCreatedOn: string,
  dynamicFormFields: IDynamicFormFieldsViewModel[]
}

export interface IDynamicFormFieldsViewModel  {
    key: string,
    value: string,
    keyCode: string,
    isClientSideEncryption: boolean,
    isHidden: boolean,
    captionText: string,
    type: string,
    isValid: boolean,
    validationErrorText: string
}