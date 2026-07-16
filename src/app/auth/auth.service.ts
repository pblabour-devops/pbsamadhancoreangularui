import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginTypeModel, UserJwtDecodedInfo } from './auth-typed-models';
import { environment } from '../../environments/environment';
import jwt_decode from 'jwt-decode';
import { CommonOpsService } from '../shared/common-ops-service';
import { Router } from '@angular/router';
import { GlobalStateManagerService } from '../shared/global-state-manager-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient, public commonOpsService: CommonOpsService, private router: Router, private globalStateManagerService: GlobalStateManagerService) { }

  public loginUser(loginTypeModel : LoginTypeModel){
      this.httpClient.post(environment.pbLabourDefaultApiRoot+ "Auth/login",loginTypeModel)
      .subscribe(response=>{
        //localStorage.setItem("BearerToken",(<any>response).token)
        this.globalStateManagerService.setTokenJwtValue((<any>response).token)
      });
  }

  getJwtToken():string{
    //if(localStorage.getItem('BearerToken')){
    if(this.globalStateManagerService.getTokenJwtValue()!=null){
      //return localStorage.getItem('BearerToken');
      return this.globalStateManagerService.getTokenJwtValue()
    }
    return '';
  }

  getUserJwtDecodedInfo():UserJwtDecodedInfo{
    if(this.isUserLoggedIn()){
      let rawToken =this.getJwtToken();
      let token : any =jwt_decode(rawToken);
      let encryptionKey =this.globalStateManagerService.getTokenEncryptedKeyValue()
      let iVKey = this.globalStateManagerService.getTokenIVKeyValue()
      let decodedTokenText = this.commonOpsService.decryptUsingAES256(token.ServerSecret, 
        encryptionKey,
        iVKey);
      return JSON.parse(decodedTokenText);
    }
    return null;
  }
  //   getUserJwtDecodedInfo():UserJwtDecodedInfo{
  //   if(this.isUserLoggedIn()){
  //     let token : any =jwt_decode(this.getJwtToken());
  //     let decodedTokenText = this.commonOpsService.decryptUsingAES256(token.ServerSecret, 
  //       environment.xhrEncryptionConfigs.tokenEncyptionSecretKey,
  //       environment.xhrEncryptionConfigs.tokenEncyptionSecretIV);
  //       // console.log('>>>',jwt_decode(decodedTokenText[0]));
  //       // debugger;
  //     return JSON.parse(decodedTokenText);
  //   }
  //   return null;
  // }

  public isUserLoggedIn(): boolean{
    if( this.getJwtToken() !=''){
      return true;
    }
    return false;
  }
  public logout(moveToLoginPage: boolean){
    localStorage.clear();
    sessionStorage.clear();
    this.globalStateManagerService.setTokenEncryptedKeyValue(null);
    this.globalStateManagerService.setTokenIVKeyValue(null);
    this.globalStateManagerService.setTokenJwtValue(null);
    if(moveToLoginPage){
       this.router.navigate(['/']);
    }
  }
}