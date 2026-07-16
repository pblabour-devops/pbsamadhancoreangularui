import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-authentication-error',
    templateUrl: './authentication-error.component.html',
    styleUrls: ['./authentication-error.component.css'],
    standalone: false
})
export class AuthenticationErrorComponent implements OnInit {

  constructor(private router: Router) { }
  
  ngOnInit(): void {
  }

  backToELabour(){
    window.location.href = environment.thirdPartyIntegrationConfigs.sys_o_urls.back_to_elabour;
  }
  backToInvestPunjab(){
    window.location.href = environment.thirdPartyIntegrationConfigs.investPunjab.investPunjabReturnPath;
  }
}
