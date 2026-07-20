import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { IComplaint_Wages, IComplaint_Wages_PeriodAmt } from 'src/app/samadhaan/samadhaan-typed-modelts';
import { CommonOpsService } from 'src/app/shared/common-ops-service';

@Component({
  selector: 'app-wages-not-paid-at-all',
  standalone: false,
  templateUrl: './wages-not-paid-at-all.component.html',
  styleUrl: './wages-not-paid-at-all.component.css',
})
export class WagesNotPaidAtAllComponent {
  @Output() wagesDataEvent  = new EventEmitter<IComplaint_Wages>();
  @Input() wagesApiData :any
  @Input() wagesPeriodAmtApiData : GenericFormModel<IComplaint_Wages_PeriodAmt[]>
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
      periodAmtDetails: this.fb.array([]),
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
    if(changes.wagesApiData){
    this.Input_Form.patchValue(this.wagesApiData?.formModel)
    this.Input_Form.controls.toDoActivityModeType.patchValue(2);
    } else if(changes.wagesPeriodAmtApiData){
    const details = this.wagesPeriodAmtApiData.formModel;
    if(details){
    const formArray = this.Input_Form.get('periodAmtDetails') as FormArray;
    formArray.clear();
    details?.forEach(detail =>{
    Object.keys(detail).forEach(key => {
      if (detail[key] && typeof detail[key] === 'string' && detail[key].includes('T')) {
        detail[key] = detail[key].split('T')[0];
      }
    });
      this.addMore(detail)
    })
    }
  }
  }

  ngOnInit(){
    this.addMore();
      this.Input_Form.valueChanges.subscribe(value => {
      this.wagesDataEvent.emit(value);
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
    return this.Input_Form.get('periodAmtDetails') as FormArray;
  }

  createComplaintDetail(data?:any): FormGroup {
    return this.fb.group({
      id: [data?.id || 0],
      fromDate: [data?.fromDate || '', Validators.required],
      toDate: [data?.toDate || '', Validators.required],
      overTimeHours : [data?.overTimeHours || '', Validators.required],
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
