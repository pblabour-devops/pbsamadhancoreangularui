import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { IComplaint_Wages, IComplaint_Wages_PeriodAmt } from 'src/app/samadhaan/samadhaan-typed-modelts';
import { CommonOpsService } from 'src/app/shared/common-ops-service';

@Component({
  selector: 'app-wages-weeklyday',
  templateUrl: './wages-weeklyday.component.html',
  styleUrl: './wages-weeklyday.component.css',
  standalone : false
})
export class WagesWeeklydayComponent {
  @Output() wagesWeeklyDayDataEvent  = new EventEmitter<IComplaint_Wages>();
  @Input() wagesWeeklyApiData :any
  @Input() wagesWeeklyPeriodAmtApiData : GenericFormModel<IComplaint_Wages_PeriodAmt>
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  public appFormStepsList: any[] = [];
  public paramInfo: any;
  public parmamEncodedinfo: string;
  genericFormData: GenericFormModel<IComplaint_Wages>;
  applicableOptions : any

  constructor(
    private fb: FormBuilder,
    public commonOpsService: CommonOpsService
  ) {}

  Input_Form: TForm<IComplaint_Wages> = this.fb.group(
    {
      id: [0, Validators.required],
      totalReliefSought: ['', Validators.required],
      compensationSought: ['', Validators.required],
      detailAboutTheClaim: [''],
      wagesWeeklyPeriodAmtDetails: this.fb.array([]),
      applicationPurposeType : [0, Validators.required],
      projectSiteVersion: [1, Validators.required],
      toDoActivityModeType: [1, Validators.required],
      rootActivityRefId: [''],
      toDoActivityCategoryType: [0, Validators.required],
      appRefId : [0, Validators.required]
    }
  ) as TForm<IComplaint_Wages>;

  get formControls() {
    return this.Input_Form.controls;
  }

  ngOnChanges(changes : any){
    console.log('chags', changes)
    if(changes.wagesWeeklyApiData){
    this.Input_Form.patchValue(this.wagesWeeklyApiData?.formModel)
    this.Input_Form.controls.toDoActivityModeType.patchValue(2);
    } else if(changes.wagesWeeklyPeriodAmtApiData){
    const details = this.wagesWeeklyPeriodAmtApiData.formModel;
    Object.keys(details).forEach(key => {
      if (details[key] && typeof details[key] === 'string' && details[key].includes('T')) {
        details[key] = details[key].split('T')[0];
      }
    });
    const formArray = this.Input_Form.get('wagesWeeklyPeriodAmtDetails') as FormArray;
    formArray.clear();
    this.addMore(details)
    }
  }

  ngOnInit(){
    this.addMore();
      this.Input_Form.valueChanges.subscribe(value => {
      console.log('asdf')
      this.wagesWeeklyDayDataEvent.emit(value);
    });

     this.complaintDetails.valueChanges.subscribe((rows: any[]) => {
      const total = rows.reduce((sum, row) => {
        return sum + (Number(row.amount) || 0);
      }, 0);

      this.Input_Form.patchValue(
        {
          totalReliefSought: total
        },
        { emitEvent: false }
      );
    });
  }

  get complaintDetails(): FormArray {
    return this.Input_Form.get('wagesWeeklyPeriodAmtDetails') as FormArray;
  }

  createComplaintDetail(data?:any): FormGroup {
    return this.fb.group({
      id: [data?.id || 0],
      fromDate: [data?.fromDate || '', Validators.required],
      toDate: [data?.toDate || '', Validators.required],
      amount: [data?.amount || '', [Validators.required, Validators.min(0.01)]],
      projectSiteVersion: [1, Validators.required],
      toDoActivityModeType: [data ? 2 : 1, Validators.required],
      rootActivityRefId: [''],
    });
  }

  addMore(data? : any): void {
    this.complaintDetails.push(this.createComplaintDetail(data));
  }

  public isFormValid(): boolean {
    return this.Input_Form.valid;
}


  removeRow(index: number): void {
    this.complaintDetails.removeAt(index);
  }
}
