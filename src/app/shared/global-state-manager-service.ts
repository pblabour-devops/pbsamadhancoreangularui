import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IClientLocationViewModel, IFilePreviewInfoViewModel, IPublicKeyPairViewModel } from './shared-typed-models';
 
@Injectable({
  providedIn: 'root' // Makes the service a singleton available everywhere
})
export class GlobalStateManagerService {
  private jwtTokenJwtSubject: BehaviorSubject<string>;
  private tokenEncryptedKeySubject: BehaviorSubject<string>;
  private jwtTokenSubject: BehaviorSubject<string>;
  private tokenIVKeySubject: BehaviorSubject<string>;

  private clientIpAddress: BehaviorSubject<string>;
  private clientLocation_IsOn: BehaviorSubject<boolean>;
  private clientLocation_Latitude: BehaviorSubject<string>;
  private clientLocation_Longitude: BehaviorSubject<string>;
  //private filePreviewInfo: BehaviorSubject<IFilePreviewInfoViewModel[]>;
  public publicKeyPairs: BehaviorSubject<IPublicKeyPairViewModel[]> = new BehaviorSubject<IPublicKeyPairViewModel[]>([
    {
      keyName:'Version_1_pub.key_PP2L', // Partner Portal TO Labour
      keyValue: `-----BEGIN PUBLIC KEY-----
          MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAskgPKBcNpz71mi4NSYa5
          mazJrO0WZim7T2yy7qPxk2NqQE7OmWWakLJcaeUYnI0kO3yC57vck66RPCjKxWuW
          SGZ7dHXe0bWb5IXjcT4mNdnUIalR+lV8czsoH/wDUvkQdG1SJ+IxzW64WvoaCRZ+
          /4wBF2cSUh9oLwGEXiodUJ9oJXFZVPKGCEjPcBI0vC2ADBRmVQ1sKsZg8zbHN+gu
          U9rPLFzN4YNrCnEsSezVw/W1FKVS8J/Xx4HSSg7AyVwniz8eHi0e3a8VzFg+H09I
          5wK+w39sjDYfAdnJUkr6PjtSbN4/Sg/NMkKB2Ngn8oj7LCfe/7RNqIdiS+dQuSFg
          eQIDAQAB
          -----END PUBLIC KEY-----`,
      keyType:'PUBLIC'
    }
  ]);
  constructor() { 
    this.tokenEncryptedKeySubject = new BehaviorSubject<string>('');
    this.tokenIVKeySubject = new BehaviorSubject<string>('');
    this.jwtTokenJwtSubject = new BehaviorSubject<string>('');

    this.clientIpAddress = new BehaviorSubject<string>('');
    this.clientLocation_IsOn = new BehaviorSubject<boolean>(false);
    this.clientLocation_Latitude = new BehaviorSubject<string>('');
    this.clientLocation_Longitude = new BehaviorSubject<string>('');
    this.jwtTokenSubject = new BehaviorSubject<string>('');
    //this.filePreviewInfo = new BehaviorSubject<IFilePreviewInfoViewModel[]>([]);
  }
  
  setTokenEncryptedKeyValue(value: string): void {
    this.tokenEncryptedKeySubject.next(value);
  }
  getTokenEncryptedKeyValue(): string {
    return this.tokenEncryptedKeySubject.getValue();
  }
  
  // setJwtTokenValue(value: string): void {
  //   this.jwtTokenSubject.next(value);
  // }
  // getJwtTokenValue(): string {
  //   return this.jwtTokenSubject.getValue();
  // }

  setTokenIVKeyValue(value: string): void {
    this.tokenIVKeySubject.next(value);
  }
  getTokenIVKeyValue(): string {
    return this.tokenIVKeySubject.getValue();
  }
  setTokenJwtValue(value: string): void {
    this.jwtTokenJwtSubject.next(value);
  }
  getTokenJwtValue(): string {
    return this.jwtTokenJwtSubject.getValue();
  }

  setClientIpValue(value: string): void {
    this.clientIpAddress.next(value);
  }
  getClientIpValue(): string {
    return this.clientIpAddress.getValue();
  }
  setClientLocationIsOnValue(value: boolean): void {
    this.clientLocation_IsOn.next(value);
  }
  getClientLocationIsOnValue(): boolean {
    return this.clientLocation_IsOn.getValue();
  }

  setClientLocationValue(value: IClientLocationViewModel): void {
    this.clientLocation_Latitude.next(value.latitude);
    this.clientLocation_Longitude.next(value.longitude);
  }
  getClientLocationValue(): IClientLocationViewModel {
    let value: IClientLocationViewModel = 
    {
      latitude : this.clientLocation_Latitude.getValue(), 
      longitude : this.clientLocation_Longitude.getValue()
    }
    return value;
  }

  // setFilePreviewInfoValue(value: IFilePreviewInfoViewModel): void {
  //   let allValues = this.getFilePreviewInfoValues();
  //   allValues.push(value);
  //   this.filePreviewInfo.next(allValues);
  // }
  // getFilePreviewInfoValues(): IFilePreviewInfoViewModel[] {
  //   let value: IFilePreviewInfoViewModel[] = this.filePreviewInfo.getValue();
  //   return value;
  // }
  // getFilePreviewInfoValueByName(name: string): IFilePreviewInfoViewModel {
  //   let value: IFilePreviewInfoViewModel = this.filePreviewInfo.getValue().filter(x=>x.name==name)[0];
  //   return value;
  // }
  // removeFilePreviewInfoValueByName(name: string) {
  //   let remainValues = this.filePreviewInfo.getValue().filter(x=>x.name!=name);
  //   this.filePreviewInfo.next(remainValues);
  // }
}