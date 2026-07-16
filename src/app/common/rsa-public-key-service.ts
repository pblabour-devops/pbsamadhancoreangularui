import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RsaPublicKeyService {
  publicKey: BehaviorSubject<string>;
  publicKeyPath:string='';
  constructor(private http: HttpClient) { 
    this.publicKey = new BehaviorSubject<string>(null);
  }
  public initiateRsaPublicKeyConnection(defaultPublicKey: string): Promise<any>{
    return new Promise<void>((resolve, reject) => {
      if(this.publicKeyPath==''){
        this.publicKeyPath= defaultPublicKey;
      }
        this.http
        .get(this.publicKeyPath, { responseType: 'text' }) // Specify responseType as 'text'
        .subscribe({
            next: (data) => {
                this.publicKey.next(data);
                resolve();
            console.log('File content loaded successfully:');
            },
            error: (error) => {
            console.error('Error reading file:', error);
            },
        });
       
    });
  }
}