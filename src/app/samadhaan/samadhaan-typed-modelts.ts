export interface IComplaint_EmployerDetail {
  id: number;
  appRefId: number;
  isEngagedThroughContractor: boolean;
  employerORContractorNameAndDesignation: string;
  employerORContractorAddress: string;
  state: string;
  districtRefId: number | string;
  pinCode: string;
  mobileNumber: string;
  email: string;
  projectSiteRefId: number;
  applicationPurposeType: number;
  applicationType: number;
  iPin: number;
  investPunjab_AppId: number;
  factoryCircleRefId: number;
  projectSiteVersion: number;
  toDoActivityModeType: number;
  toDoActivityCategoryType: number;
  rootActivityRefId: string;
}

export interface IComplaint_WorkplaceDetail {
  id: number;
  appRefId: number;
  workplaceAddress: string;
  state: string;
  districtRefId: number | string;
  pinCode: string;
  projectSiteRefId: number;
  applicationPurposeType: number;
  applicationType: number;
  iPin: number;
  investPunjab_AppId: number;
  factoryCircleRefId: number;
  projectSiteVersion: number;
  toDoActivityModeType: number;
  toDoActivityCategoryType: number;
  rootActivityRefId: string;
}

export interface IComplaint_EstablishmentDetail {
  id: number;
  appRefId: number;

  establishmentName: string;
  establishmentAddress: string;

  state: string;
  districtRefId: number | string;
  pinCode: string;
  mobileNumber: string;
  email: string;

  natureOfWorkPerformed: string;
  isStillWorking: boolean;
  categoryRefId: number | string;

  employmentStartDate: string;
  employmentEndDate: string;

  wagePeriod: number | string;
  wageRate: number;

  // NotMapped fields — application context (same pattern as other components)
  projectSiteRefId: number;
  applicationPurposeType: number;
  applicationType: number;
  iPin: number;
  investPunjab_AppId: number;
  factoryCircleRefId: number;
  projectSiteVersion: number;
  toDoActivityModeType: number;
  toDoActivityCategoryType: number;
  rootActivityRefId: string;
}

export enum GratuityClaimBasisType {
  Superannuation = 1,
  Retirement = 2,
  Resignation = 3,
  DeathOrDisablement = 4,
  Termination = 5,
  Other = 99
}

export enum MaritalStatusType {
  Unmarried = 1,
  Married = 2,
  Widowed = 3,
  Divorced = 4
}

export interface IComplaint_GratuityClaim {
  id: number;
  appRefId: number;

  // Claim Information
  basisOfClaim: GratuityClaimBasisType | string;
  employmentStartDate: string;
  employmentEndDate: string;
  yearsOfContinuousService: number;
  isApplicationMadeToEmployer: boolean | string;
  disputeDetails: string;

  // Annexure
  applicantNameAndAddress: string;
  claimBasisDescription: string;
  employeeNameAndAddress: string;
  maritalStatus: MaritalStatusType | string;
  employerNameAndAddress: string;
  department: string;
  employeePost: string;
  appointmentDate: string;
  terminationDate: string;
  terminationReason: string;
  totalServicePeriod: string;
  lastDrawnWages: number;
  nominationNumber: string;
  nominationRecordingDate: string;
  totalGratuityPayable: number;
  gratuityPercentagePayable: number;
  gratuityAmountClaimed: number;
  claimDate: string;
  place: string;

  // NotMapped fields — application context (same pattern as other components)
  projectSiteRefId: number;
  applicationPurposeType: number;
  applicationType: number;
  iPin: number;
  investPunjab_AppId: number;
  factoryCircleRefId: number;
  projectSiteVersion: number;
  toDoActivityModeType: number;
  toDoActivityCategoryType: number;
  rootActivityRefId: string;
}

export interface IComplaint_MaternityBenefitComplaint {
  id: number;
  appRefId: number;

  isDischargedOrDismissedDueToAbsence: boolean | string;

  maternityBenefitAmountDue: number;
  medicalBonusMaternityAmountDue: number;
  wagesForMaternityLeaveAmountDue: number;

  // NotMapped fields — application context
  projectSiteRefId: number;
  applicationPurposeType: number;
  applicationType: number;
  iPin: number;
  investPunjab_AppId: number;
  factoryCircleRefId: number;
  projectSiteVersion: number;
  toDoActivityModeType: number;
  toDoActivityCategoryType: number;
  rootActivityRefId: string;
}

export enum MoneyDueReasonType {
  None = 0,
  Wages = 1,
  Bonus = 2,
  Gratuity = 4,
  RetrenchmentCompensation = 8,
  LayOffCompensation = 16,
  ClosureCompensation = 32,
  OvertimeWages = 64,
  LeaveEncashment = 128,
  ProvidentFundDues = 256,
  Other = 512
}

export interface IComplaint_RecoveryOfMoneyUnderIRCode {
  id: number;
  appRefId: number;

  dateOfDemandNoticeServed: string;
  moneyDueReasons: number; // bitmask (sum of selected MoneyDueReasonType values)

  // NotMapped fields — application context
  projectSiteRefId: number;
  applicationPurposeType: number;
  applicationType: number;
  iPin: number;
  investPunjab_AppId: number;
  factoryCircleRefId: number;
  projectSiteVersion: number;
  toDoActivityModeType: number;
  toDoActivityCategoryType: number;
  rootActivityRefId: string;
}

export interface IComplaint_Claim_CodeOnWage {
  id: number;
  appRefId: number;
  allowanceType: boolean | string;
  placeOfWorkTypeA: number;
  placeOfWorkTypeB: number;
  placeofWorkNameC: number;
  projectSiteRefId: number;
  applicationPurposeType: number;
  applicationType: number;
  iPin: number;
  investPunjab_AppId: number;
  factoryCircleRefId: number;
  projectSiteVersion: number;
  toDoActivityModeType: number;
  toDoActivityCategoryType: number;
  rootActivityRefId: string;
}

export interface IComplaint {
  id: number;
  appRefId: number;
  allowanceType: boolean | string;
  placeOfWorkTypeA: number;
  placeOfWorkTypeB: number;
  placeofWorkNameC: number;
}

export interface IComplaint_MinimumWagesNotPaid {
  id: number;
  appRefId: number;
  totalReliefSought: boolean | string;
  compensationSought: number;
  detailAboutTheClaim: number;
  Complaint_MinimumWagesNotPaidDetails: Array<any>;
  projectSiteRefId: number;
  applicationPurposeType: number;
  applicationType: number;
  iPin: number;
  investPunjab_AppId: number;
  factoryCircleRefId: number;
  projectSiteVersion: number;
  toDoActivityModeType: number;
  toDoActivityCategoryType: number;
  rootActivityRefId: string;
}