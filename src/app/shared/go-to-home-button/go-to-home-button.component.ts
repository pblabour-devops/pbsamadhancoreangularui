import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { GenericResponseTemplateModel } from 'src/app/generic-implementation/generic-service-result-template';
import { AppHttpRequestHandlerService } from '../app-http-request-handler.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-go-to-home-button',
    templateUrl: './go-to-home-button.component.html',
    styleUrls: ['./go-to-home-button.component.css'],
    standalone: false
})
export class GoToHomeButtonComponent implements OnInit {
  @Input() applicationType: number=0;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  constructor(private router: Router,
    private authService: AuthService,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService) { }
  ngOnInit(): void {
  }

  backToHome(){
    let userId = this.authService.getUserJwtDecodedInfo().UserId.toString();
    if(this.authService.getUserJwtDecodedInfo().RoleCode=='INDL'){
      if(this.applicationType == 36 ||this.applicationType == 1001)
      {
        this.router.navigate(['/project/sites']);
      }
      else
      {
        // this.appHttpRequestHandlerService.httpGet({ userId: userId }, "CommonApis", "getIndustryUserDashboardURLByUserId").pipe(takeUntil(this.ngUnsubscribe))
        // .subscribe((data: GenericResponseTemplateModel<string>) => { 
        //   if(data.responseDataModel == null){
        //     this.router.navigate(['/project/sites']);
        //   }
        //   else {
        //     window.location.href=data.responseDataModel;
        //   }
        // });
        window.location.href= environment.thirdPartyIntegrationConfigs.investPunjab.investPunjabReturnPath;
      } 
    }
    else{
      this.router.navigate(['/dashboard/officials']);
    }
  }
}
