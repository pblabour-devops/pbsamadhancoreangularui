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
  allDistricts : any
  appFormStepsList:any
  paramInfo:any
  appId : any
  protected ngUnsubscribe = new Subject<void>();
  detailData:any
  basisOfClaimOptions:any[]=[]
  maritalStatusOptions:any[]=[]
  workerCategoryOptions: any[]= []
  constructor(private commonOpsService : CommonOpsService, private route : ActivatedRoute, private appHttpRequestHandlerService : AppHttpRequestHandlerService){}

  ngOnInit(){
    this.getDistricts();
  }

  ngAfterViewInit(){
  this.route.queryParams
        .subscribe(params => {
          this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info) => {
            this.paramInfo = info;
            this.appId = this.paramInfo.appId;
              this.appHttpRequestHandlerService.httpGet({id : this.paramInfo?.appRefId}, "Complaints", "getComplaintDetail").pipe(takeUntil(this.ngUnsubscribe))
              .subscribe((data: GenericFormModel<any>) => {
                this.appFormStepsList = data.appFormStepsList;
                this.detailData = data.formModel
                this.basisOfClaimOptions = data.enumTemplateLists.find(e => e.selectListTypeCode == 'GratuityClaimBasisTypeEnum').selectListItems
                this.maritalStatusOptions = data.enumTemplateLists.find(e => e.selectListTypeCode == 'MaritalStatusTypeEnum').selectListItems
                this.workerCategoryOptions = data.enumTemplateLists.find(e => e.selectListTypeCode == 'WorkerCategoryTypeEnum').selectListItems
              });
          });
        });
  }

   getDistricts(): void {
  this.appHttpRequestHandlerService.httpGet(null, "CommonApis", "getalldistrict")
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: GenericFormModel<any>) => {
      this.allDistricts = data.formModel.filter(
        district => district.stateRefId === 3
      );
    });
}

getDistrict(districtRefId:any){
return this.allDistricts.find(e => e.districtLgdId == districtRefId).districtName;
}

getBasisOfClaimText(value: number): string {
    const found = this.basisOfClaimOptions.find(x => x.value == value);
    return found ? found.text : '-';
  }

  getMaritalStatusText(value: number): string {
    const found = this.maritalStatusOptions.find(x => x.value == value);
    return found ? found.text : '-';
  }

  getworkerText(value : number) : string {
    const found = this.workerCategoryOptions.find(x => x.value == value);
    return found ? found.text : '-';
  }

  getYesNoText(value: boolean): string {
    if (value === null || value === undefined) return '-';
    return value ? 'Yes' : 'No';
  }

}
