import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { IToDoActivityWiseStepViewModel, IToDoTicket } from '../../to-do-activity.typed.models';
import { GenericResponseTemplateModel } from 'src/app/generic-implementation/generic-service-result-template';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-ticket-manager',
    templateUrl: './ticket-manager.component.html',
    styleUrls: ['./ticket-manager.component.css'],
    standalone: false
})
export class TicketManagerComponent implements OnInit {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  tickets: IToDoTicket[];
  @ViewChild("stepsViewerModal") stepsViewerModal: TemplateRef<any>;
  @ViewChild("failedMessageViewerModal") failedMessageViewerModal: TemplateRef<any>;
  failedMessageViewerModalRef: NgbModalRef;
  stepsWiseData: IToDoActivityWiseStepViewModel[] =[];
  activityFailedMessage: string='';
  selRootActivityRefId: string='';
  constructor(private appHttpRequestHandlerService: AppHttpRequestHandlerService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.appHttpRequestHandlerService.httpGet({}, "ToDoManager", "getAssignedTickets").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericResponseTemplateModel<IToDoTicket[]>) => {
        this.tickets = data.responseDataModel;
      });
  }
  onClickActivityRow(rootActivityRefId: string){
      this.selRootActivityRefId = rootActivityRefId;
      this.appHttpRequestHandlerService.httpGet({rootActivityRefId:rootActivityRefId}, "ToDoManager", "getActivitiesWiseSteps").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericResponseTemplateModel<IToDoActivityWiseStepViewModel[]>) => {
        this.modalService.open(this.stepsViewerModal, { windowClass: 'my-class', size: 'lg', scrollable: true, backdrop: 'static', keyboard: false });
        this.stepsWiseData = data.responseDataModel;
      });
    }
    onClickViewFailedMessage(toDoSerialOrderCount: number){
      this.activityFailedMessage = this.stepsWiseData.filter(x=>x.toDoSerialOrderCount == toDoSerialOrderCount)[0].activityFailedMessage;
      this.failedMessageViewerModalRef = this.modalService.open(this.failedMessageViewerModal, { windowClass: 'error-message', size: 'md', scrollable: true, backdrop: 'static', keyboard: false });
    }
    onClickCloseFailedMessageModal(){
      this.failedMessageViewerModalRef.close();
    }
    onClickCloseStepsViewerModal(){
      this.modalService.dismissAll();
    }
  
}
