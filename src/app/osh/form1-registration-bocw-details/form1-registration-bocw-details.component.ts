import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IOSH_Form_1_Registration_BOCW } from '../osh-code-typed-models';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-form1-registration-bocw-details',
    templateUrl: './form1-registration-bocw-details.component.html',
    styleUrls: ['./form1-registration-bocw-details.component.css'],
    standalone: false
})
export class Form1RegistrationBocwDetailsComponent implements OnInit {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  @Input() appRefId: number;
  @Output() bocwDetailDataEvent= new EventEmitter<any>();
  constructor(private fb: UntypedFormBuilder,private appHttpRequestHandlerService: AppHttpRequestHandlerService) { }
  
  Input_Form: TForm<IOSH_Form_1_Registration_BOCW> = this.fb.group({
    id: [0, Validators.required],
    nameOfConstructionWork: ['', Validators.required],
    nameOfPrincipalEmployer: ['', Validators.required],
    dateOfCommencementOfWork: ['', Validators.required],
    dateOfCompletionOfWork: ['', Validators.required],
    approvalDetailsByLocalAuthority: ['', Validators.required],
    registrationNoOfPrincipalEmployer: ['', Validators.required],
    appRefId: [0, Validators.required],
    projectSiteRefId:[0, Validators.required],
    applicationType: [101, Validators.required],
    applicationPurposeType: [1, Validators.required],
    iPin : [0, Validators.required],
    investPunjab_AppId : [0, Validators.required],
    factoryCircleRefId : ['', [Validators.required, Validators.min(1)]],
    projectSiteVersion:[0, Validators.required],
    toDoActivityModeType: [0, Validators.required],
    rootActivityRefId: ['', Validators.required],
    toDoActivityCategoryType: [0, Validators.required],
    }) as TForm<IOSH_Form_1_Registration_BOCW>;
    get formControls() { return this.Input_Form.controls; }
    ngOnInit(): void {
      this.Input_Form.valueChanges.subscribe(value => {
        this.bocwDetailDataEvent.emit(value);
      });
    }

    ngOnChanges() {
        if (!this.appRefId) return;
          this.appHttpRequestHandlerService.httpGet({ appRefId: this.appRefId },"OSH_Form_1_Registration","getForm1RegistrationBocwDetails").pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: any) => {
            const apiData = data?.formModel;
            if (!apiData) return;
            this.Input_Form.patchValue(apiData, { emitEvent: false });
            this.bocwDetailDataEvent.emit(this.Input_Form.getRawValue());
          });
    }
}
