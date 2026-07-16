import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-not-found-page',
    templateUrl: './not-found-page.component.html',
    styleUrls: ['./not-found-page.component.css'],
    standalone: false
})
export class NotFoundPageComponent implements OnInit {

  constructor(public authService : AuthService) { }

  ngOnInit(): void {
    this.authService.logout(false);
    localStorage.clear();
    sessionStorage.clear();
    // var cookies = cookies.getAll();
    // cookies.remove();
  }
}
