import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericFormModel } from 'src/app/generic-implementation/generic-form-builder.type';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';

@Component({
  selector: 'app-details',
  standalone: false,
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {

  appFormStepsList:any
  paramInfo:any
  appId : any
    protected ngUnsubscribe = new Subject<void>();
    detailData:any
  constructor(private commonOpsService : CommonOpsService, private route : ActivatedRoute, private appHttpRequestHandlerService : AppHttpRequestHandlerService){}

  ngAfterViewInit(){
  this.route.queryParams
        .subscribe(params => {
          this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info) => {
            console.log('param inof', info)
            this.paramInfo = info;
            this.appId = this.paramInfo.appId;
              this.appHttpRequestHandlerService.httpGet({id : this.paramInfo?.appRefId}, "Complaints", "getComplaintDetail").pipe(takeUntil(this.ngUnsubscribe))
              .subscribe((data: GenericFormModel<any>) => {
                this.appFormStepsList = data.appFormStepsList;
                this.detailData = data.formModel
                console.log('detial data', this.detailData)
              });
          });
        });
  }

}
