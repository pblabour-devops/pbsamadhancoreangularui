import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  connection: signalR.HubConnection;
  signalRConnectionId: BehaviorSubject<string>;
  //progressPercentage: BehaviorSubject<number>;
  QrScanLoginServerResponse: BehaviorSubject<string>;

  constructor() { 
    this.signalRConnectionId = new BehaviorSubject<string>(null);
    //this.progressPercentage = new BehaviorSubject<number>(null);
    this.QrScanLoginServerResponse = new BehaviorSubject<string>(null);
  }
  public initiateSignalrConnection(): Promise<any>{
    return new Promise<void>((resolve, reject) => {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(environment.signalrHubsRoot,
          {
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets
          }) // the SignalR server url, in the .NET Project properties
        .build();
  
      this.setSignalrClientMethods();
  
      this.connection
        .start()
        .then(() => {
          //console.log(`SignalR connection success! connectionId: ${this.connection.connectionId} `);
          this.signalRConnectionId.next(this.connection.connectionId);
            resolve();
        })
        .catch((error) => {
          console.log(`SignalR connection error: ${error}`);
            reject();
        });
    });
  }
  private setSignalrClientMethods(): void {
    // this.connection.on('DisplayMessage', (message: string) => {
    //   this.signalRConnectionId.next(message);
    // });
    // this.connection.on('UpdateProgressBar', (percentage: number) => {
    //     this.progressPercentage.next(percentage);
    // });
    
    // this.connection.on('DisplayProgressMessage', (message: string) => {
    //     this.progressMessage.next(message);
    // });
    this.connection.on("SendQrScanLoginResponseToConnectionClient", (message: string) => {  
      
        this.QrScanLoginServerResponse.next(message);
      });  
  }
}