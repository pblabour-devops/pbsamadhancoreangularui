// import { StringMap } from "@angular/compiler/src/compiler_facade_interface";
import { TForm } from "../generic-implementation/generic-form-builder.type";

export type LoginTypeModel = {
    userName: string;
    password: string;
    recaptcha:any;
    tokenConnectionId : string;
    userid : number;
  };

export type UserJwtDecodedInfo = {
  UserId: string,
  UserPublicId: string,
  UserName: string,

  RoleId: string,
  RoleName: string,
  RoleCode: string,

  UserProfileId: number,
  FullName: string,
  Name: string,
  aud: string,
  exp: string,
  iss: string
}


export type CaptchaResultViewModel = {
  captchaCode: string;
  captchaToken: string;
  captchaImg: string;
  timestamp:Date;
};



export interface IGolferDataViewModel  {
  id: number,
  nameOfTheParticipants: string,
  address : string,
  mobileNo : string,
  email : string,
  areYouMemberOfChdClub : string,
  membershipType : string,
  membershipNumber : string,
  handicap : string,
  isFeePaid : string,
  registrationDate : string,
  sgnature : string
}

export interface IPartnerPortalLoginResponseViewModel{
  hasError : boolean,
  errorCode : string,
  errorDesc : string,
  responseMessage : string
}