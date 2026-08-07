import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericFormModel } from 'src/app/generic-implementation/generic-form-builder.type';
import { AppHttpRequestHandlerService } from '../../app-http-request-handler.service';
import { CommonOpsService } from '../../common-ops-service';

@Component({
  selector: 'app-samadhaan-complaints-details',
  standalone: false,
  templateUrl: './samadhaan-complaints-details.component.html',
  styleUrl: './samadhaan-complaints-details.component.css',
})
export class SamadhaanComplaintsDetailsComponent {
  @Input() appRefId: number;
  @Input() entityPrimaryid: number;
  @Input() applicationType: number;
  @Input() projectSiteVersion: number;
  @Output() appFormStepsListEvent = new EventEmitter<any>();
  allDistricts : any
  appFormStepsList:any
  paramInfo:any
  appId : any
  protected ngUnsubscribe = new Subject<void>();
  detailData:any
  basisOfClaimOptions:any[]=[]
  maritalStatusOptions:any[]=[]
  workerCategoryOptions: any[]= []
  applicableOptions : any[] = []
  allowanceType : any[] = []
  placeOfWorkType : any[] = []
  bonusClaimTypeOptions : any[] = []
  constructor(private commonOpsService : CommonOpsService, private route : ActivatedRoute, private appHttpRequestHandlerService : AppHttpRequestHandlerService){}

  ngOnInit(){
    this.getDistricts();
  }

  ngAfterViewInit(){
  this.loadFormDetails();
  }

  loadFormDetails(){
    this.appHttpRequestHandlerService.httpGet({id : this.appRefId}, "Complaints", "getComplaintDetail").pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: GenericFormModel<any>) => {
      
       this.appFormStepsListEvent.emit({
        appFormStepsList: data.appFormStepsList,
        isLocked: data.formModel.isLocked,
        isAllowEdit: data.isEditAllowed,
        applicationLifeCycleStatusType: (data as any).applicationLifeCycleStatusType
      });
      this.detailData = data.formModel
      this.basisOfClaimOptions = data.enumTemplateLists.find(e => e.selectListTypeCode == 'GratuityClaimBasisTypeEnum').selectListItems
      this.maritalStatusOptions = data.enumTemplateLists.find(e => e.selectListTypeCode == 'MaritalStatusTypeEnum').selectListItems
      this.workerCategoryOptions = data.enumTemplateLists.find(e => e.selectListTypeCode == 'WorkerCategoryTypeEnum').selectListItems
      this.applicableOptions = data.enumTemplateLists.find(e => e.selectListTypeCode == 'MaternityDischargeTypeEnum').selectListItems
      this.allowanceType = data.enumTemplateLists.find(e => e.selectListTypeCode == 'AllowanceTypeEnum').selectListItems
      this.placeOfWorkType = data.enumTemplateLists.find(e => e.selectListTypeCode == 'PlaceOfWorkTypeEnum').selectListItems
      this.bonusClaimTypeOptions = data.enumTemplateLists.find(e => e.selectListTypeCode == 'BonusClaimTypeEnum').selectListItems
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

  getMaternityDischargeTypeText(value: number): string {
  const found = this.applicableOptions?.find(x => +x.value === +value);
    return found ? found.text : '-';
  }

  getAllowanceTypeText(value: number): string {
  if (value === null || value === undefined) return '-';
  const found = this.allowanceType?.find(x => +x.value === +value);
  return found ? found.text : '-';
}

getPlaceOfWorkTypeAText(value: number): string {
  if (value === null || value === undefined) return '-';
  const found = this.placeOfWorkType?.find(x => +x.value === +value);
  return found ? found.text : '-';
}

getPlaceOfWorkTypeBText(value: number): string {
  if (value === null || value === undefined) return '-';
  const found = this.placeOfWorkType?.find(x => +x.value === +value);
  return found ? found.text : '-';
}

getBonusClaimTypeText(value: number): string {
  if (value === null || value === undefined) return '-';
  const found = this.bonusClaimTypeOptions?.find(x => +x.value === +value);
  return found ? found.text : '-';
}


}
