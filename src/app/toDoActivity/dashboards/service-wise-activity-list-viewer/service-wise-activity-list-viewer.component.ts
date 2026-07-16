import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericResponseTemplateModel } from 'src/app/generic-implementation/generic-service-result-template';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { IToDoApplicationActivityMaping } from '../../to-do-activity.typed.models';

@Component({
    selector: 'app-service-wise-activity-list-viewer',
    templateUrl: './service-wise-activity-list-viewer.component.html',
    styleUrls: ['./service-wise-activity-list-viewer.component.css'],
    standalone: false
})
export class ServiceWiseActivityListViewerComponent implements OnInit {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  activities: IToDoApplicationActivityMaping[];
  filteredActivities: IToDoApplicationActivityMaping[];
  distinctApplicationTypes: number[]=[];
  allDistinctApplicationTypes: number[]=[];
  constructor(private appHttpRequestHandlerService: AppHttpRequestHandlerService) { }

  ngOnInit(): void {
    this.appHttpRequestHandlerService.httpGet({}, "ToDoManager", "getActivityMappingList").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericResponseTemplateModel<IToDoApplicationActivityMaping[]>) => {
        this.filteredActivities= this.activities = data.responseDataModel;
        this.allDistinctApplicationTypes = this.distinctApplicationTypes = [...new Set(this.filteredActivities.map(item => item.applicationType))];
      });
  }
  getApplicationTypeDesc(applicationType){
    console.log(applicationType);
    return this.filteredActivities.filter(x=>x.applicationType==applicationType)[0].applicationTypeDesc;
  }
  getDistinctApplicationPurposeTypes(applicationType){
    return [...new Set(this.filteredActivities.filter(x=>x.applicationType == applicationType).map(item => item.applicationPurposeType))];
  }
  getApplicationTypePurposeTypeDesc(applicationType, applicationPurposeType){
    return this.filteredActivities.filter(x=>x.applicationType==applicationType && x.applicationPurposeType == applicationPurposeType)[0].applicationPurposeTypeDesc;
  }

  getDistinctActivityCategoryTypes(applicationType, applicationPurposeType){
    return [...new Set(this.filteredActivities.filter(x=>x.applicationType == applicationType && x.applicationPurposeType == applicationPurposeType).map(item => item.toDoActivityCategoryType))];
  }
  getActivityCategoryTypeDesc(applicationType, applicationPurposeType, activityCategoryType){
    return this.filteredActivities.filter(x=>x.applicationType==applicationType && x.applicationPurposeType == applicationPurposeType && x.toDoActivityCategoryType == activityCategoryType)[0].toDoActivityCategoryTypeDesc;
  }

  getDistinctActivityModeTypes(applicationType, applicationPurposeType, activityCategoryType){
    return [...new Set(this.filteredActivities.filter(x=>x.applicationType == applicationType && x.applicationPurposeType == applicationPurposeType && x.toDoActivityCategoryType == activityCategoryType).map(item => item.toDoActivityModeType))];
  }
  getActivityActivityModeTypeDesc(applicationType, applicationPurposeType, activityCategoryType, activityModeType){
    return this.filteredActivities.filter(x=>x.applicationType==applicationType && x.applicationPurposeType == applicationPurposeType && x.toDoActivityCategoryType == activityCategoryType && x.toDoActivityModeType == activityModeType)[0].toDoActivityModeTypeDesc;
  }

  getDistinctActivityCodeTypes(applicationType, applicationPurposeType, activityCategoryType, activityModeType){
    return [...new Set(this.filteredActivities.filter(x=>x.applicationType == applicationType && x.applicationPurposeType == applicationPurposeType && x.toDoActivityCategoryType == activityCategoryType && x.toDoActivityModeType == activityModeType).map(item => item.toDoCodeType))];
  }
  getActivityActivityCodeTypeDesc(applicationType, applicationPurposeType, activityCategoryType, activityModeType, activityCodeType){
    var activityCodeInfo = this.filteredActivities.filter(x=>x.applicationType==applicationType && x.applicationPurposeType == applicationPurposeType && x.toDoActivityCategoryType == activityCategoryType && x.toDoActivityModeType == activityModeType && x.toDoCodeType == activityCodeType)[0];
    return '(' + activityCodeInfo.toDoSerialOrderCount.toString()+ ') ' + activityCodeInfo.toDoCodeTypeDesc;
  }
  filterAcivitiesByApplicationType(event){
    // console.log(event.target.value)
    // this.filteredActivities = this.activities.filter(x=>x.applicationType == event.target.value);
    // this.distinctApplicationTypes = [...new Set(this.filteredActivities.map(item => item.applicationType))];
  }
}

