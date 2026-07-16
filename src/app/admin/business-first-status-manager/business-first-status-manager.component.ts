import { Component, OnInit } from '@angular/core';
import { TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { IStatusManagerRequestParms, IStatusManagerResponseParms } from '../admin-type-models';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { GenericResponseTemplateModel } from 'src/app/generic-implementation/generic-service-result-template';

@Component({
    selector: 'app-business-first-status-manager',
    templateUrl: './business-first-status-manager.component.html',
    styleUrls: ['./business-first-status-manager.component.css'],
    standalone: false
})
export class BusinessFirstStatusManagerComponent implements OnInit {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();

  Input_Form: TForm<IStatusManagerRequestParms> = this.fb.group({
    iPin: ['', Validators.required],
    applicationId: ['', Validators.required],
    applicationType: ['', Validators.required],
    applicationPurposeType : ['', Validators.required],
  }) as TForm<IStatusManagerRequestParms>;
  responseData: any;
  isSubmitted: boolean=false;
  isSyncClicked: boolean= false;
  isApplicationUnlocked: boolean= false;
  get formControls() { return this.Input_Form.controls; }
  shareStatusResop: GenericResponseTemplateModel<string>={
    errorDesc:'',
    hasError:false,
    responseDataModel:""
  };
  constructor(
    private fb: UntypedFormBuilder, 
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,) { }

  ngOnInit(): void {
  }
  onSubmit(){
    if(this.Input_Form.valid){
      this.appHttpRequestHandlerService.httpPost(this.Input_Form.value,"pbsamadhannetcoreapi.ViewModels.StatusManagerRequestParmsViewModel", "Admin", "SearchApplicationByIPin").pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data: GenericResponseTemplateModel<IStatusManagerResponseParms>) => {
          this.responseData = data.responseDataModel;
          this.isSyncClicked=false;
          this.isSubmitted = true;
      });
    }

  }
  updateStatus(appId, applicationType, appActionType){
    this.appHttpRequestHandlerService.httpGet({appId: appId, applicationType: applicationType, appActionType: appActionType}, "Admin", "ShareStaus").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericResponseTemplateModel<string>) => {
        this.shareStatusResop = data;
        this.isSyncClicked=true;
        this.isSubmitted = false;
    });
  }
  reset(){
    this.isSyncClicked=false;
    this.isSubmitted = false;
    this.shareStatusResop ={
      errorDesc:'',
      hasError:false,
      responseDataModel:""
    };
    this.Input_Form.patchValue({iPin:'', applicationType:'', applicationPurposeType:''});
  }

  unlockApplication(appId, applicationType, appActionType){
    this.appHttpRequestHandlerService.httpGet({appId: appId, applicationType: applicationType, appActionType: appActionType}, "Admin", "unlockedApplication").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericResponseTemplateModel<string>) => {
        this.shareStatusResop = data;
        this.isApplicationUnlocked=true;
    });
  }
}
