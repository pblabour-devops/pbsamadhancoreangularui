import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonService } from 'src/app/common/common.service';
import { TForm, GenericFormModel } from 'src/app/generic-implementation/generic-form-builder.type';
import { GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { Inspection_Form_Labour_III_LabourWelfareFund_Act } from '../../Inspections-typed-models';


@Component({
    selector: 'app-labour-part-iii-lwf-act',
    templateUrl: './labour-part-iii-lwf-act.component.html',
    styleUrls: ['./labour-part-iii-lwf-act.component.css'],
    standalone: false
})
export class LabourPartIiiLwfActComponent implements OnInit {
  @Input() jsonData: any;
  Input_Form: TForm<Inspection_Form_Labour_III_LabourWelfareFund_Act>;
  private ngUnsubscribe = new Subject<void>();
  genericFormData: GenericFormModel<Inspection_Form_Labour_III_LabourWelfareFund_Act>;
  submitted: boolean = false;
  hasSubmitClicked: boolean = false;
  defaultValue:"N/A";
  characterCounts: { [key: string]: number } = {};
  controlMaxLengthNames: { [key: string]: number } = {};
  public parmamEncodedinfo:string;
  public paramInfo:any;
  constructor(
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    public commonOpsService: CommonOpsService,
    public common: CommonService,
    private fb: UntypedFormBuilder,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.Input_Form = this.fb.group({
      id: [0,Validators.required],
      isLabourWelfareFund_Paid: [false],
      depositedDate : ['', Validators.required],
      depositedAmount : ['', Validators.required],
      establishmentName : ['', Validators.required],
      period : ['', Validators.required],
      noOfWorkers : ['', Validators.required],
      contributionAmount : ['', Validators.required],
      unpaidAccumulation : ['', Validators.required],
      contributionPaidAndPeriod : ['', Validators.required],
      unclaimedPaidAndPeriod : ['', Validators.required],
      contributionAmountStillPayable : ['',Validators.required],
      unclaimedPaidOrNot: ['', Validators.required],
      remarks : ['', Validators.required],
      inspectionRefId: [null, Validators.required],
    }, {}) as TForm<Inspection_Form_Labour_III_LabourWelfareFund_Act>
    
  }
  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      this.parmamEncodedinfo=params.info;
      this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info)=>{
      this.paramInfo = info;
      });
    });
  }

  ngAfterViewInit() {
    this.appHttpRequestHandlerService.httpGet({ id:this.paramInfo.inspectionRefId}, "Inspection", "getForm_Labour_Part_III_LabourWelfareFund_Act").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericFormModel<Inspection_Form_Labour_III_LabourWelfareFund_Act>) => {
        
        this.Input_Form.patchValue(data.formModel);
        this.updateCharacterCountsForTextareaControls();
        if(data.formModel != null && data.formModel.depositedDate!=null){
          this.Input_Form.controls.depositedDate.value = this.formatDate(new Date(data.formModel.depositedDate));
        }
        if(this.paramInfo.isLocked == 1)
          {
            this.Input_Form.disable();
          }
    });
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private formatDateTime(date: Date): string {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    const hours = `${date.getHours()}`.padStart(2, '0');
    const minutes = `${date.getMinutes()}`.padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }


  saveAndNext(e){
    this.submitted = true;
    this.Input_Form.controls.inspectionRefId.patchValue(this.paramInfo.inspectionRefId);
   
    if(this.Input_Form.controls.isLabourWelfareFund_Paid.value == true){
      this.Input_Form.controls.isLabourWelfareFund_Paid.patchValue(true);
      this.Input_Form.controls.establishmentName.patchValue('NA');
      this.Input_Form.controls.period.patchValue('NA');
      this.Input_Form.controls.noOfWorkers.patchValue(0);
      this.Input_Form.controls.contributionAmount.patchValue(0.00);
      this.Input_Form.controls.unpaidAccumulation.patchValue('NA');
      this.Input_Form.controls.contributionPaidAndPeriod.patchValue('NA');
      this.Input_Form.controls.unclaimedPaidOrNot.patchValue(false);
      this.Input_Form.controls.remarks.patchValue('NA');
      this.Input_Form.controls.contributionAmountStillPayable.patchValue('NA');
      this.Input_Form.controls.unclaimedPaidAndPeriod.patchValue('NA');
    }
    else{
      this.Input_Form.controls.isLabourWelfareFund_Paid.patchValue(false);
      this.Input_Form.controls.depositedDate.patchValue(new Date());
      this.Input_Form.controls.depositedAmount.patchValue(0);
    }
    if (this.Input_Form.valid) {
      this.appHttpRequestHandlerService.httpPost(this.Input_Form.value, "pbsamadhannetcoreapi.Models.Inspection_Form_Labour_III_LabourWelfareFund_Act", "Inspection", "addUpdateForm_Labour_Part_III_LabourWelfareFund_Act")
        .subscribe((data: GenericServiceResultTemplate) => {
          // this.inspectionsPerformaStepersComponent.moveToNextStep();
        });
    }
  }

  fillDefaultValueInRemarks(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (!inputElement.value || inputElement.value.trim() === '' || inputElement.value === '-') {
      inputElement.value = 'N/A';
      this.Input_Form.get(inputElement.getAttribute('formControlName')!)?.patchValue('N/A');
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getCharacterCount(controlName: string): number {
    return this.characterCounts[controlName] ?? 0;
  }

  updateCharacterCount(controlName: string, maxLength: number): void {
    const control = this.Input_Form.get(controlName);
    if (control) {
      const value = control.value || '';
      this.characterCounts[controlName] = value.length;
      this.controlMaxLengthNames[controlName] = maxLength;
    }
  }

  private updateCharacterCountsForTextareaControls(): void {
    Object.keys(this.Input_Form.controls).forEach(controlName => {
      const control = this.Input_Form.get(controlName);
      if (control && control instanceof UntypedFormControl && control.value && typeof control.value === 'string') {
        if (control.value.trim() !== '') {
          this.updateCharacterCount(controlName, 1000);
        }
      }
    });
  }
}
