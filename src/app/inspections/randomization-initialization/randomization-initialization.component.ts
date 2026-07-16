import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { CommonService } from 'src/app/common/common.service';
import { TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';

@Component({
    selector: 'app-randomization-initialization',
    templateUrl: './randomization-initialization.component.html',
    styleUrls: ['./randomization-initialization.component.css'],
    standalone: false
})
export class RandomizationInitializationComponent implements OnInit {
protected ngUnsubscribe: Subject<void> = new Subject<void>();
  public currentMonth : any;
  public currentYear : any;
  randomizationResult : any
  constructor(private appHttpRequestHandlerService: AppHttpRequestHandlerService,
      private fb: UntypedFormBuilder,
      private router: Router,
      public commonOpsService: CommonOpsService,
      private common: CommonService,
      public authService: AuthService) { }



    ngOnInit(): void {
      this.currentMonth = new Date().getMonth() +1;
      this.currentYear = new Date().getFullYear();
    }
    onSubmit() 
    { 
          this.getReport();
    }

    getReport(){
      console.log()
        this.appHttpRequestHandlerService.httpGet({month : this.currentMonth  , year :new Date().getFullYear() , userRefId : this.authService.getUserJwtDecodedInfo().UserId }, "Inspection", "randomization-initialization")
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: any) => {
            console.log(data.formModel[0],'data')
            this.randomizationResult = data.formModel[0];
    
          });
      }

      getMonthName(monthNumber: number): string {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    return monthNames[monthNumber - 1];
  }
}
