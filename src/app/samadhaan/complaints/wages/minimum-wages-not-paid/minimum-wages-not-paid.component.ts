import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { IComplaint_Claim_CodeOnWage, IComplaint_MinimumWagesNotPaid } from 'src/app/samadhaan/samadhaan-typed-modelts';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';

@Component({
  selector: 'app-minimum-wages-not-paid',
  standalone: false,
  templateUrl: './minimum-wages-not-paid.component.html',
  styleUrl: './minimum-wages-not-paid.component.css',
})
export class MinimumWagesNotPaidComponent {
protected ngUnsubscribe: Subject<void> = new Subject<void>();

  public appFormStepsList: any[] = [];
  public paramInfo: any;
  public parmamEncodedinfo: string;

  genericFormData: GenericFormModel<IComplaint_MinimumWagesNotPaid>;


  // NEW: Options for the conditional radio buttons
  applicableOptions : any
  constructor(
    private fb: FormBuilder,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    public commonOpsService: CommonOpsService
  ) {}

  Input_Form: TForm<IComplaint_MinimumWagesNotPaid> = this.fb.group(
    {
      id: [0, Validators.required],
      totalReliefSought: ['', Validators.required],
      compensationSought: ['', Validators.required],
      detailAboutTheClaim: ['', [Validators.required, Validators.min(0)]],
      Complaint_MinimumWagesNotPaidDetails: this.fb.array([]),
      projectSiteRefId : ['', Validators.required],
      applicationPurposeType : ['', Validators.required],
      iPin: ['', Validators.required],
      investPunjab_AppId: ['', Validators.required],
      projectSiteVersion: ['', Validators.required],
      toDoActivityModeType: ['', Validators.required],
      rootActivityRefId: ['', Validators.required],
      toDoActivityCategoryType: ['', Validators.required]
    }
  ) as TForm<IComplaint_MinimumWagesNotPaid>;

  get formControls() {
    return this.Input_Form.controls;
  }

  ngOnInit(){
    this.addMore();
  }

  ngAfterViewInit() {
    this.route.queryParams.subscribe((params) => {
      this.parmamEncodedinfo = params.info;

      this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info) => {
        this.paramInfo = info;
        console.log('info', this.paramInfo)
        // this.Input_Form.controls.appRefId.patchValue(this.paramInfo?.appRefId);

        this.appHttpRequestHandlerService
          .httpGet({ id: this.paramInfo?.appRefId }, 'Complaints', 'getMinimumWagesNotPaidDetail')
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: GenericFormModel<IComplaint_Claim_CodeOnWage>) => {
            this.appFormStepsList = data.appFormStepsList;
          });
      });
    });
  }

  get complaintDetails(): FormArray {
    return this.Input_Form.get('Complaint_MinimumWagesNotPaidDetails') as FormArray;
  }

  createComplaintDetail(): FormGroup {
    return this.fb.group({
      id: [0],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]]
    });
  }

  addMore(): void {
    this.complaintDetails.push(this.createComplaintDetail());
  }

  removeRow(index: number): void {
    this.complaintDetails.removeAt(index);
  }
}
