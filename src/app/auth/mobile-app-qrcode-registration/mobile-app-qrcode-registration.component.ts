import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { GenericFormModel } from 'src/app/generic-implementation/generic-form-builder.type';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
    selector: 'app-mobile-app-qrcode-registration',
    templateUrl: './mobile-app-qrcode-registration.component.html',
    styleUrls: ['./mobile-app-qrcode-registration.component.css'],
    standalone: false
})
export class MobileAppQrcodeRegistrationComponent implements OnInit {

  constructor( public authService : AuthService,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    ) { }
  roleName: string='';
  signalRConnectionId: any;
  qrData: string;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  ngOnInit(): void {
    const userRefId = this.authService.getUserJwtDecodedInfo().UserId.toString()
  //  this.signalRConnectionId= userRefId;

   this.appHttpRequestHandlerService.httpGet({ userRefId: userRefId }, "UserMobileAppDeviceManager", "GenerateDeviceRegistrationQRCode").pipe(takeUntil(this.ngUnsubscribe))
   .subscribe((data: any) => {
    //  this.qrData = data.formModel
     this.signalRConnectionId = data.responseDataModel;

   });
    
  }
  
  

  
}
