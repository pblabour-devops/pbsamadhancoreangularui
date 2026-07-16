import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonOpsService } from 'src/app/shared/common-ops-service';

@Component({
    selector: 'app-request-error',
    templateUrl: './request-error.component.html',
    styleUrls: ['./request-error.component.css'],
    standalone: false
})
export class RequestErrorComponent implements OnInit {
  info: any;
  constructor(private route: ActivatedRoute,
    public commonOpsService: CommonOpsService) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info)=>{
        this.info = info;
      });
    });
  }
}
