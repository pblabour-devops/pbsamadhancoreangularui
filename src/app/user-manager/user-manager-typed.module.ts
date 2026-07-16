export interface ILoginResponseViewModel  {
    encryptedResp: string
}

export interface ILoginResponseDetailViewModel  {
    token: string,
    hasError: boolean,
    errorCode: string,
    errorDesc: string,
    isMobileOtpVerificationReq: boolean,
    isMobileOtpVerified: boolean,
    mobileNoToBeSentOtp: string
    encryptionKey: string,
    iVKey: string,
    responseId : string
}

export interface IResetPasswordResponseViewModel  {
    encryptedResp: string
}

export interface IResetPasswordResponseDetailViewModel  {
    UserId: string,
    hasError: boolean,
    errorCode: string,
    errorDesc: string,
    isMobileOtpVerificationReq: boolean,
    isMobileOtpVerified: boolean,
    mobileNoToBeSentOtp: string,
    responseId: string
}
export interface ISetNewPasswordResponseViewModel  {
    encryptedResp: string
}

export interface ISetNewPasswordResponseDetailViewModel  {
    hasError: boolean,
    errorCode: string,
    errorDesc: string,
    passwordValidationErrors: string[]
}

export interface IUserRegResponseViewModel  {
    encryptedResp: string
}

export interface IUserRegResponseDetailViewModel  {
    firstName: string,
    middleName: string,
    lastName: string,
    isEmailOtpVerified: boolean,
    emailToBeSentOtp: string,
    isMobileOtpVerified: boolean,
    mobileNoToBeSentOtp: string,
    hasError: boolean,
    errorCode: string,
    errorDesc: string,
}

export interface IOTPRegistrationVerifyRespViewModel  {
    otpVerifyResp: string
}
export interface IOTPRegistrationVerifyDetailRespViewModel {
    enteredMobileOtp: string
    isMobileOtpMatched: boolean,
    enteredEmailOtp: string,
    isEmailOtpMatched: boolean,
    mobile: string,
    email: string,
    timeStemp: number,
    isUserCreated: boolean,
    hasError: boolean,
    errorDesc: string
}