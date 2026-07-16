import { TForm } from "../generic-implementation/generic-form-builder.type";

export type Establishment_GeneralDetail = {
    establishmentId: number;
    // establishmentName: string;

    // //Establishment address
    // estb_Address: string;
    // estb_VillageOrTown: string;
    // estb_TehsilRefId : number;
    // estb_DistrictRefId: number;
    // estb_PinCode: string;
    gstNumber: string;

    //Communication address
    comm_Address: string;
    comm_VillageOrTown: string;
    comm_TehsilRefId: number;
    comm_DistrictRefId: number;
    comm_PinCode: string;
    establishmentType: number;
    labourIdentificationNum: string;
    electricLoadConnectedInKilowatts: number;
    establishmentConstitutionType: number;
    establishmentBuildingType: number;
    isEmployingInterStateMigrantWorkers: boolean;
    nationalIndustrialClassificationCode: string;
    appRefId: number;
    projectSiteRefId: number;
    applicationPurposeType : number;
  };

  // Employer Details
  export type Establishment_EmployerDetail = {
    Establishment_EmployerDetailId: number;
    
    //Emloyer address
    Employer_Name: string;
    Employer_Address: string;
    Employer_VillageOrTown : string;
    Employer_DistrictRefId: number;
    Employer_TehsilRefId: number;
    Employer_PinCode: string;

    // Employer Personal Details
    Employer_Email: string;
    Employer_Phone: number;

    MaxEmployeesToBeEmployedAnyDay : number;
    MaxEmployeesWereEmployedAnyDay: number;
    DateOfCommencementOfActivityInEstb: string;
    EstablishmentRefId: number;
  };

  // Contractor Details Modal
  export type Establishment_ContractorDetail= {
    Establishment_ContractorDetailId: number,
    contractor_Name: string;
    contractor_Address: string;
    contractor_VillageOrTown: string;
    contractor_DistrictRefId :number;
    contractor_TehsilRefId: number;
    contractor_PinCode: number;
    contractor_Email : string;
    contractor_Phone: string;

    // No of Employee
    numberOfContractLabourToBeEmployed: number;
    natureOfWorkContractLabour: string;
    establishmentRefId : number;
  };

  // Migrant Worker Details Modal
  export type Establishment_MigrantWorkerDetail= {
    establishmentMigrantworkerId: number,
    worker_Name: string;
    worker_father_husband_name: string;
    worker_permanent_address: string;
    worker_villageortown :string;
    Worker_Tehsil: string;
    Worker_District: string;
    Worker_State : string;
    Worker_Aadhar_Number: string;
    Worker_Mobile_Number: number;
    establishmentRefId : number;
  };

  export type EstablishmentDetailViewModel= {
    generalDetail: Establishment_GeneralDetail,
    employerDetail: Establishment_EmployerDetail,
    contractorDetail: Establishment_ContractorDetail,
    isLocked: boolean,
    isFeeApplicable: boolean
  };

  

 