import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonService } from 'src/app/common/common.service';
import { GenericFormModel } from 'src/app/generic-implementation/generic-form-builder.type';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';

@Component({
    selector: 'app-register-mobile-device',
    templateUrl: './register-mobile-device.component.html',
    styleUrls: ['./register-mobile-device.component.css'],
    standalone: false
})
export class RegisterMobileDeviceComponent implements OnInit {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  userName: string = "";
  qrCodeData: string;   
  constructor(private common:CommonService,
    private route: ActivatedRoute,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService) { }
    
  ngOnInit(): void {
  }
  ngAfterViewInit() {
  }

  getQRCodeDataByUserName(){
    this.appHttpRequestHandlerService.httpGet({ userName: this.userName}, "UserMobileAppDeviceManager", "GenerateAndSendQRCodeByUserName").pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: any) => { 
      this.qrCodeData=data.formModel; 
    }
    );
  }


  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
