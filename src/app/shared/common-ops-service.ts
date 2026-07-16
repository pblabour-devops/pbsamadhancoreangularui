import { Injectable } from '@angular/core';  
import { Router } from '@angular/router';
import { JsonHubProtocol } from '@microsoft/signalr';
import * as CryptoJS from 'crypto-js';  
import { AsyncSubject, BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';
import { catchError, switchMap, takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IHybridEncryptionAlgoRespViewModel, IInitialPageRespViewModel, IPublicKeyPairViewModel, ISelectedFiles } from './shared-typed-models';
import { RsaPublicKeyService } from '../common/rsa-public-key-service';
import * as forge from 'node-forge';
import { AuthService } from '../auth/auth.service';
import { GetRedirectUrlViewModel } from '../dashboard/dashboard-typed-models';
import { GenericFormModel } from '../generic-implementation/generic-form-builder.type';
import { AppHttpRequestHandlerService } from './app-http-request-handler.service';
import { GlobalStateManagerService } from './global-state-manager-service';
import { UserJwtDecodedInfo } from '../auth/auth-typed-models';
import jwt_decode from 'jwt-decode';
@Injectable()  
export class CommonOpsService {  encryptRsa: BehaviorSubject<string>;
protected ngUnsubscribe: Subject<void> = new Subject<void>();
    
    constructor(private router: Router,
        private rsaPublicKeyService: RsaPublicKeyService, private globalStateManagerService: GlobalStateManagerService) {}
   
    public RestrictNumericValuesOnly(e: any, maxSizeAllowed: number ) {
        let input;
        if(e.target.value.length==maxSizeAllowed){
            return false;
        }
        if (e.metaKey || e.ctrlKey) {
            return true;
        }
        if (e.which === 32) {
            return false;
        }
        if (e.which === 0) {
            return true;
        }
        if (e.which < 33) {
            return true;
        }
        input = String.fromCharCode(e.which);
        return !!/[\d\s]/.test(input);
    }
    
    public encodeQueryParamsInBase64(model: any):string{
        Object.assign(model, {"createdOn": Date.now()})
        return CryptoJS.AES.encrypt(JSON.stringify(model), environment.queryParmsPrivateEncryptionKey).toString();  
    }

    public decodeQueryParamsFromBase64ToModel(encodedText: string, callback): Observable<any>{
        if(encodedText==undefined || encodedText.trim().length==0){
            return callback(encodedText);
        }
        else{
            var decryptedVal =JSON.parse(CryptoJS.AES.decrypt(encodedText, environment.queryParmsPrivateEncryptionKey).toString(CryptoJS.enc.Utf8));
            if(decryptedVal.hasOwnProperty("createdOn")){
                if((Date.now()-decryptedVal.createdOn)> environment.maxUrlAgeInMilliseconds){
                    localStorage.clear();
                    sessionStorage.clear();
                    //document.location.href = environment.thirdPartyIntegrationConfigs.sys_o_urls.back_to_elabour; 
                    this.router.navigate(['/authentication-error']);
                }
            }
            else{
                localStorage.clear();
                sessionStorage.clear();
                this.router.navigate(['/authentication-error']);
            }
            return callback(decryptedVal);
        }
    }
    errorHandler(error: any) {
        return throwError(
          'Something bad happened; please try again later.');
      }
    


    public encryptUsingAES256(text: string, secretKey: string, secretIV: string): any {
        var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(text), CryptoJS.enc.Utf8.parse(secretKey), {
            keySize: 128 / 8,
            iv: CryptoJS.enc.Utf8.parse(secretIV),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.toString();
    }
    public decryptUsingAES256(decString: string, secretKey: string, secretIV: string) {
        var decrypted = CryptoJS.AES.decrypt(decString, CryptoJS.enc.Utf8.parse(secretKey), {
            keySize: 128 / 8,
            iv: CryptoJS.enc.Utf8.parse(secretIV),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return decrypted.toString(CryptoJS.enc.Utf8);
      }

    public toFilesBase64(files: File[], selectedFiles: ISelectedFiles[]): Observable<ISelectedFiles[]> {
        const result = new AsyncSubject<ISelectedFiles[]>();
        const updatedSelectedFiles = [...selectedFiles];  
        if (files?.length) {
            const readFilePromises = files.map((file) => {
            return new Promise<void>((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                const index = updatedSelectedFiles.findIndex(f => f.name === file.name);
                if (index !== -1) {
                    updatedSelectedFiles.splice(index, 1); 
                }
                updatedSelectedFiles.push({
                    name: file.name,
                    file: file,
                    base64: reader.result as string
                });

                resolve(); 
                };
            });
            });

            Promise.all(readFilePromises).then(() => {
            result.next(updatedSelectedFiles);
            result.complete();
            });

        } else {
            result.next([]);
            result.complete();
        }
        return result;
    }


    public lowercaseKeysDeep(obj: Record<string, any>): Record<string, any> {
        if (typeof obj !== 'object' || obj === null) {
            return obj;
        }

        if (Array.isArray(obj)) {
            return obj.map(item => this.lowercaseKeysDeep(item));
        }

        return Object.keys(obj).reduce((acc: Record<string, any>, key) => {
            const value = obj[key];
            const lowerCaseKey = key.charAt(0).toLowerCase() + key.substring(key.length>1 ? 1 : 0);
            acc[lowerCaseKey] = this.lowercaseKeysDeep(value);
            return acc;
        }, {});
    }

    public encrypyWithRSA(plainText: string, publicKeyName: string): Promise<string>{
        return new Promise<string>((resolve, reject) => {
        //this.rsaPublicKeyService.publicKey.subscribe((publicKeyValue: string) => {
        this.globalStateManagerService.publicKeyPairs.subscribe((keyPairs: IPublicKeyPairViewModel[])=>{
            var rsa = forge.pki.publicKeyFromPem(keyPairs.filter(x=>x.keyName==publicKeyName)[0].keyValue);
            var encryptedData = window.btoa(rsa.encrypt(plainText));
                resolve(encryptedData);
            })
            //});
        });
    }
    encryptXHRRequestsWithHybridAlgo(plainText: string, isXhrEncryptionEnabled: boolean, publicKey: string): Observable<any> {
        if(isXhrEncryptionEnabled){
                // console.log(this.globalStateManagerService.getClientIpValue());
                // console.log(this.globalStateManagerService.getClientLocationIsOnValue());

                let secretKey=this.generateGuid().substring(0,16);
                let secretIV=this.generateGuid().substring(0,16);
                let encryptedData = this.encryptUsingAES256(plainText, secretKey, secretIV);
                const currentDateTime = new Date().toISOString(); 
                let encryptedTime = this.encryptUsingAES256(currentDateTime, secretKey, secretIV);
                //this.rsaPublicKeyService.publicKeyPath=publicKeyPath;
                //return this.rsaPublicKeyService.publicKey.pipe(
                    //switchMap((publicKeyValue: string) => {
                let encryptedCurrentUrl = this.encryptUsingAES256(this.router.url, secretKey, secretIV);
                let encryptedRequestId = this.encryptUsingAES256(this.generateGuid(), secretKey, secretIV);
                var rsa = forge.pki.publicKeyFromPem(publicKey);
                var encryptedKeys = window.btoa(rsa.encrypt(secretKey + '|' +secretIV));
                var encryptedLocations = this.encryptUsingAES256(this.globalStateManagerService.getClientLocationValue().latitude + '|' + this.globalStateManagerService.getClientLocationValue().longitude + '|' + this.globalStateManagerService.getClientIpValue(), secretKey, secretIV);
                var encryptedUserName='anonymous';
                var encryptedProfileId='0';
                if(this.getUserJwtDecodedInfo()!=null){
                    encryptedUserName =  this.getUserJwtDecodedInfo().UserName;
                    encryptedProfileId =  this.getUserJwtDecodedInfo().UserProfileId.toString();
                }
                encryptedUserName =  this.encryptUsingAES256(encryptedUserName, secretKey, secretIV);
                encryptedProfileId =  this.encryptUsingAES256(encryptedProfileId, secretKey, secretIV);
                let hybridEncryptionAlgoResp: IHybridEncryptionAlgoRespViewModel=
                {
                    i: encryptedRequestId, 
                    d: encryptedData, 
                    k: encryptedKeys, 
                    t: encryptedTime, 
                    c: encryptedCurrentUrl,
                    l: encryptedLocations,
                    u: encryptedUserName,
                    p: encryptedProfileId
                };
                return of(JSON.stringify(hybridEncryptionAlgoResp));
                //});
            //);
            }
            else{
                return of(plainText);
            }
       
    }

  private getUserJwtDecodedInfo():UserJwtDecodedInfo{
    if(this.isUserLoggedIn()){
      let token : any =jwt_decode(this.getJwtToken());
      let encryptionKey =this.globalStateManagerService.getTokenEncryptedKeyValue()
      let iVKey = this.globalStateManagerService.getTokenIVKeyValue()
      let decodedTokenText = this.decryptUsingAES256(token.ServerSecret, 
        encryptionKey,
        iVKey);
      return JSON.parse(decodedTokenText);
    }
    return null;
  }
  private isUserLoggedIn(): boolean{
    if(this.getJwtToken()!=''){
      return true;
    }
    return false;
  }
  private getJwtToken():string{
    //if(localStorage.getItem('BearerToken')){
    if(this.globalStateManagerService.getTokenJwtValue()){
      //return localStorage.getItem('BearerToken');
      return this.globalStateManagerService.getTokenJwtValue();
    }
    return '';
  }

    // encryptXHRRequestsWithHybridAlgo(plainText: string, isEncryptiontoAvoid: boolean): Observable<any> {
    //     try {
    //         if(!isEncryptiontoAvoid){
    //             let secretKey=this.generateGuid().substring(0,16);
    //             let secretIV=this.generateGuid().substring(0,16);
    //             let encryptedData = this.encryptUsingAES256(plainText, secretKey, secretIV);
    //             this.rsaPublicKeyService.publicKey.subscribe((publicKeyValue: string) => {
    //             var rsa = forge.pki.publicKeyFromPem(publicKeyValue);
    //             var encryptedKeys = window.btoa(rsa.encrypt(secretKey + '|' +secretIV));
    //                 let hybridEncryptionAlgoResp: IHybridEncryptionAlgoRespViewModel={encryptedData: encryptedData, encryptedKeys: encryptedKeys};
    //                 return of(JSON.stringify(hybridEncryptionAlgoResp));
    //             });
    //         }
    //         else{
    //             return of(plainText);
    //         }
    //     } 
    //     catch (error) {
    //         console.error('Encryption failed:', error);
    //         // In a real app, you might throw an error using throwError from rxjs
    //         return of(null); // Or return an observable that emits null/error
    //     }
    // }


    // public encryptXHRRequestsWithHybridAlgo(plainText: string): Promise<string>{
    //     return new Promise<string>((resolve, reject) => {
    //         let secretKey=this.generateGuid().substring(0,16);
    //         let secretIV=this.generateGuid().substring(0,16);
    //         let encryptedData = this.encryptUsingAES256(plainText, secretKey, secretIV);
    //         this.rsaPublicKeyService.publicKey.subscribe((publicKeyValue: string) => {
    //         var rsa = forge.pki.publicKeyFromPem(publicKeyValue);
    //         var encryptedKeys = window.btoa(rsa.encrypt(secretKey + '|' +secretIV));
    //             let hybridEncryptionAlgoResp: IHybridEncryptionAlgoRespViewModel={encryptedData: encryptedData, encryptedKeys: encryptedKeys};
    //             resolve(JSON.stringify(hybridEncryptionAlgoResp));
    //         });
    //     });
    // }

    public generateGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  updateKeyValueOfJsonObject(obj: any, keyTobeSearched: string, keyTobeUpdated: string, val: string, newVal: any) {
    var newValue = newVal;
    var objects: any[] = [];
    for (var i in obj) {
      if (!obj.hasOwnProperty(i)) continue;
      if (typeof obj[i] == 'object') {
        objects = objects.concat(this.updateKeyValueOfJsonObject(obj[i], keyTobeSearched, keyTobeUpdated, val, newValue));
      } else if (i == keyTobeSearched && obj[keyTobeSearched] == val) {
        obj[keyTobeUpdated] = newValue;
      }
    }
    return obj;
  }


initiateHomePage(roleCode: string): IInitialPageRespViewModel{
    console.log('roleCode', roleCode);
    var resp: IInitialPageRespViewModel;
    if(roleCode=='INDL'){
      this.router.navigate(['/project/sites']);
      resp={isExternalLink:false, pageLink:'/project/sites', portalType:''};
    } 
    else if(roleCode == 'WORKER_INDL')
    {
        resp={isExternalLink:false, pageLink:'/dashboard/applicantdashboard', portalType:''};
        //this.router.navigate(['/dashboard/officials']);
    }
    return resp;
  }

}  
