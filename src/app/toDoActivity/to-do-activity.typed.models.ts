export interface IToDoActivityLogViewModel {
        maxRows: number,
        toDoActivityLogId: number,
        rootActivityRefId: string,
        appRefId: number,
        applicationType: number,
        applicationTypeDesc: string,

        applicationPurposeType: number,
        applicationPurposeTypeDesc: string,

        // toDoCodeType: number,
        // toDoCodeTypeDesc: string,

        toDoActivityModeType: number,
        toDoActivityModeTypeDesc: string,

        toDoActivityMapingVersion: number,
        // toDoActivityCompleteType: number,
        // toDoActivityCompleteTypeDesc: string,

        toDoActivityCategoryType: number,
        toDoActivityCategoryTypeDesc: string,

        // activityFailedMessage: string,
        // userRefId: string,
        // userFullName: string,
        // userName: string,
        //public string UserMobile { get; set; }
        //public string UserEmail { get; set; }

        investPunjab_Ipin: number,
        investPunjab_AppId: number,
        totalSuceeded: number,
        totalFailed: number,
        totalSkipped: number,
        totalSteps: number,
        //timeStemp: Date
        userFullDetail: string,
        timeStemp: Date,
        userRefId: string
    }

    export interface IToDoUserWiseActivityViewModel{
        userRefId: string,
        userFullName: string,
        userName: string,
        totalActivities: number,
        succeededActivities: number,
        failedActivities: number,
        rootActivityRefIds: string
    }

    export interface IToDoActivityWiseStepViewModel
    {
        toDoCodeType: number,
        toDoCodeTypeDesc: string,
        toDoActivityCompleteType: number,
        toDoActivityCompleteTypeDesc: string,
        activityFailedMessage: string,
        timeStemp: Date,
        toDoSerialOrderCount: number
    }

    export interface IToDoTicket{
        id: number,
        rootActivityRefId: string,
        manpowerMappingRefId: number,
        createdOn: Date,
        toDoTicketStatusType: number,
        applicationType: number,
        applicationTypeDesc: string,
        applicationPurposeType: number,
        applicationPurposeTypeDesc: string,
        toDoTicketStatusTypeDesc: string,
        toDoActivityCategoryTypeDesc: string,
        appRefId: number,
        userRefId: string,
        investPunjab_Ipin: number,
        investPunjab_AppId: number,
        userLoginName: string,
        userName: string,
        userRole: string
      }

    export interface IToDoApplicationActivityMaping{
        id: number,
        applicationType: number,
        applicationPurposeType: number,
        toDoCodeType: number,

        toDoActivityModeType: number,
        toDoActivityCategoryType: number,
        toDoSerialOrderCount: number,
        version: number,
        applicationTypeDesc: string,
        applicationPurposeTypeDesc: string,
        toDoCodeTypeDesc: string,
        toDoActivityModeTypeDesc: string,
        toDoActivityCategoryTypeDesc: string
      }