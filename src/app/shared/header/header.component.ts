import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CommonService } from '../../common/common.service';
import { environment } from 'src/environments/environment';
import { AppHttpRequestHandlerService } from '../app-http-request-handler.service';
import { GetRedirectUrlViewModel } from 'src/app/dashboard/dashboard-typed-models';
import { GenericFormModel } from 'src/app/generic-implementation/generic-form-builder.type';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    standalone: false
})
export class HeaderComponent implements OnInit {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  public isloginError:boolean=false;
  
  constructor(public authService: AuthService,private CS:CommonService,
     private router: Router,
      private appHttpRequestHandlerService: AppHttpRequestHandlerService,) { }

  ngOnInit(): void {
  }

  toggleNavBar=()=>{
    this.CS.setNavBarState(!this.CS.getNavBarState());
  }

  onLogoutClick() {
      localStorage.clear();
      //this.isloginError=false;
      //this.router.navigate(['/login']);
      //document.location.href = '/';
      this.router.navigate(['/']);
   }
   onBackToSystem_O_Click(roleName: string) {
    if(roleName=='INDL' && localStorage.getItem('bb4d2a40-0814-4e70-8dbd-c48327e2f33f') == null){
        localStorage.clear();
        window.location.href= environment.thirdPartyIntegrationConfigs.investPunjab.investPunjabReturnPath;
      }
  else if(localStorage.getItem('bb4d2a40-0814-4e70-8dbd-c48327e2f33f') != null){
        let sys_O_UserDetails = localStorage.getItem('bb4d2a40-0814-4e70-8dbd-c48327e2f33f');
        localStorage.clear();
        window.location.href= environment.thirdPartyIntegrationConfigs.sys_o_urls.backToSys_O_Url + sys_O_UserDetails.replace(/ /g, '+');
      }
    
    // else{
    //   localStorage.clear();
    //   window.location.href= environment.thirdPartyIntegrationConfigs.investPunjab.investPunjabReturnPath;
    // }
 }
onBackToelabour_node(roleName: string)
{
  if(roleName=='MPRC')
  {
    this.appHttpRequestHandlerService.httpGet({ role: roleName , type :'MPR'} , "ThirdPartyIntegrations", "redirectToOtherPortel").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericFormModel<GetRedirectUrlViewModel>) => {
        window.location.href = data.formModel.redirectUrl;
    }); 
  }
}

//  -----Redirect to Another Portel----
OnJumpToAnotherPortel(roleName: string , type: string) {
    this.appHttpRequestHandlerService.httpGet({ role: roleName , type :type} , "ThirdPartyIntegrations", "redirectToOtherPortel").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericFormModel<GetRedirectUrlViewModel>) => {
        window.location.href = data.formModel.redirectUrl;
    });
}
}
