import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-official-landing-page',
    templateUrl: './official-landing-page.component.html',
    styleUrls: ['./official-landing-page.component.css'],
    standalone: false
})
export class OfficialLandingPageComponent implements OnInit {
 
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
