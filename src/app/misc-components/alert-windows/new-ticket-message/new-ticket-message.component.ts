import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { environment } from 'src/environments/environment';
@Component({
    selector: 'app-new-ticket-message',
    templateUrl: './new-ticket-message.component.html',
    styleUrls: ['./new-ticket-message.component.css'],
    standalone: false
})
export class NewTicketMessageComponent implements OnInit {
  public paramInfo: any;
  investPunjabReturnPath: string = environment.thirdPartyIntegrationConfigs.investPunjab.investPunjabReturnPath;
  labourReturnPath: string = environment.thirdPartyIntegrationConfigs.sys_o_urls.back_to_elabour;
  constructor(private route: ActivatedRoute,
    private commonOpsService: CommonOpsService
  ) {
    localStorage.clear();
  }

  ngOnInit(): void {
  }
  ngAfterViewInit() {

    this.route.queryParams
      .subscribe(params => {
        this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info) => {
          this.paramInfo = info;
        });
      });
    //this.loadDashboadData(1, 0);
  }
  moveToHomepage(applicationType) {
    if(applicationType == 36 ||applicationType == 8)
      {
        document.location.href = this.labourReturnPath;
      }
      else
      {
        document.location.href = this.investPunjabReturnPath;
      }

  }
}
