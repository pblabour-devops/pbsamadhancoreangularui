import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(private authService: AuthService, private route: ActivatedRoute,private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.authService.isUserLoggedIn()){
        document.location.href = environment.thirdPartyIntegrationConfigs.investPunjab.investPunjabReturnPath; 
      }
      else{
        let roleName = this.authService.getUserJwtDecodedInfo().RoleCode;
        let notAllowedRoles = route.data["notAllowedRoles"] as any[]
        let allowedRoles = route.data["allowedRoles"] as any[]
        if(notAllowedRoles.includes(roleName)){
          this.authService.logout(true);
        }
        else if(allowedRoles.length > 0 && !allowedRoles.includes(roleName)){
          this.authService.logout(true);
        }
      }
    return true;
  }
}
