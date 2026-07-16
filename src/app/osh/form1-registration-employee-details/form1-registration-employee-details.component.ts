import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IOSH_Form_1_Registration_EmployeeDetail } from '../osh-code-typed-models';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-form1-registration-employee-details',
    templateUrl: './form1-registration-employee-details.component.html',
    styleUrls: ['./form1-registration-employee-details.component.css'],
    standalone: false
})
export class Form1RegistrationEmployeeDetailsComponent implements OnInit {
  @Input() appRefId: number;
  @Output() empDetailDataEvent = new EventEmitter<any>();
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  
  constructor(private fb: UntypedFormBuilder, private appHttpRequestHandlerService: AppHttpRequestHandlerService,) { }
  Input_Form: TForm<IOSH_Form_1_Registration_EmployeeDetail> = this.fb.group({
    id: [0, Validators.required],
    directEmployee_Male: [0, Validators.required],
    directEmployee_Female: [0, Validators.required],
    directEmployee_Others: [0, Validators.required],
    directEmployee_Total: [0],
    ismwDirect_Male: [0, Validators.required],
    ismwDirect_Female: [0, Validators.required],
    ismwDirect_Others: [0, Validators.required],
    ismwDirect_Total: [0],
    casualWorker_Male: [0, Validators.required],
    casualWorker_Female: [0, Validators.required],
    casualWorker_Others: [0, Validators.required],
    casualWorker_Total: [0],
    fixedTerm_Male: [0, Validators.required],
    fixedTerm_Female: [0, Validators.required],
    fixedTerm_Others: [0, Validators.required],
    fixedTerm_Total: [0],
    buildingWorker_Male: [0, Validators.required],
    buildingWorker_Female: [0, Validators.required],
    buildingWorker_Others: [0, Validators.required],
    buildingWorker_Total: [0],
    contractLabour_Male: [0, Validators.required],
    contractLabour_Female: [0, Validators.required],
    contractLabour_Others: [0, Validators.required],
    contractLabour_Total: [0],
    ismwContractLabour_Male: [0, Validators.required],
    ismwContractLabour_Female: [0, Validators.required],
    ismwContractLabour_Others: [0, Validators.required],
    ismwContractLabour_Total: [0],
    contractor_BuildingWorker_Male: [0, Validators.required],
    contractor_BuildingWorker_Female: [0, Validators.required],
    contractor_BuildingWorker_Others: [0, Validators.required],
    contractor_BuildingWorker_Total: [0],
    supervisor_Male: [0, Validators.required],
    supervisor_Female: [0, Validators.required],
    supervisor_Others: [0, Validators.required],
    supervisor_Total: [0],
    employeeBelow21000_Male: [0, Validators.required],
    employeeBelow21000_Female: [0, Validators.required],
    employeeBelow21000_Others: [0, Validators.required],
    employeeBelow21000_Total: [0],
    contractBelow21000_Male: [0, Validators.required],
    contractBelow21000_Female: [0, Validators.required],
    contractBelow21000_Others: [0, Validators.required],
    contractBelow21000_Total: [0],
    grandTotal_Male: [0],
    grandTotal_Female: [0],
    grandTotal_Others: [0],
    grandTotal_All: [0],
    appRefId: [0, Validators.required]
  }) as TForm<IOSH_Form_1_Registration_EmployeeDetail>;

  get formControls() { return this.Input_Form.controls; }

  ngOnInit(): void {
    this.Input_Form.valueChanges.subscribe(value => {
      this.calculateTotals();
      this.empDetailDataEvent.emit(this.Input_Form.getRawValue());
    });
  }

  

  ngOnChanges() {
  if (!this.appRefId) return;
    this.appHttpRequestHandlerService.httpGet({ appRefId: this.appRefId },"OSH_Form_1_Registration","getForm1RegistrationEmployeeDetails").pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: any) => {
      const apiData = data?.formModel;
      if (!apiData) return;
      this.Input_Form.patchValue(apiData, { emitEvent: false });
      this.calculateTotals();
      this.empDetailDataEvent.emit(this.Input_Form.getRawValue());
    });
  }

  private calculateTotals() {
    const f = this.Input_Form.controls;
    const get = (name: string) => Number(f[name]?.value) || 0;

    const setRowTotal = (m: string, fName: string, o: string, total: string) => {
      const sum = get(m) + get(fName) + get(o);
      f[total].setValue(sum, { emitEvent: false });
    };

      setRowTotal('directEmployee_Male','directEmployee_Female','directEmployee_Others','directEmployee_Total');
      setRowTotal('ismwDirect_Male','ismwDirect_Female','ismwDirect_Others','ismwDirect_Total');
      setRowTotal('casualWorker_Male','casualWorker_Female','casualWorker_Others','casualWorker_Total');
      setRowTotal('fixedTerm_Male','fixedTerm_Female','fixedTerm_Others','fixedTerm_Total');
      setRowTotal('buildingWorker_Male','buildingWorker_Female','buildingWorker_Others','buildingWorker_Total');
      setRowTotal('contractLabour_Male','contractLabour_Female','contractLabour_Others','contractLabour_Total');
      setRowTotal('ismwContractLabour_Male','ismwContractLabour_Female','ismwContractLabour_Others','ismwContractLabour_Total');
      setRowTotal('contractor_BuildingWorker_Male','contractor_BuildingWorker_Female','contractor_BuildingWorker_Others','contractor_BuildingWorker_Total');
      setRowTotal('supervisor_Male','supervisor_Female','supervisor_Others','supervisor_Total');
      setRowTotal('employeeBelow21000_Male','employeeBelow21000_Female','employeeBelow21000_Others','employeeBelow21000_Total');
      setRowTotal('contractBelow21000_Male','contractBelow21000_Female','contractBelow21000_Others','contractBelow21000_Total');

      const maleFields = [
        'directEmployee_Male',
        'ismwDirect_Male',
        'casualWorker_Male',
        'fixedTerm_Male',
        'buildingWorker_Male',
        'contractLabour_Male',
        'ismwContractLabour_Male',
        'contractor_BuildingWorker_Male',
        'supervisor_Male',
        'employeeBelow21000_Male',
        'contractBelow21000_Male'
      ];

      const femaleFields = [
        'directEmployee_Female',
        'ismwDirect_Female',
        'casualWorker_Female',
        'fixedTerm_Female',
        'buildingWorker_Female',
        'contractLabour_Female',
        'ismwContractLabour_Female',
        'contractor_BuildingWorker_Female',
        'supervisor_Female',
        'employeeBelow21000_Female',
        'contractBelow21000_Female'
      ];

      const othersFields = [
        'directEmployee_Others',
        'ismwDirect_Others',
        'casualWorker_Others',
        'fixedTerm_Others',
        'buildingWorker_Others',
        'contractLabour_Others',
        'ismwContractLabour_Others',
        'contractor_BuildingWorker_Others',
        'supervisor_Others',
        'employeeBelow21000_Others',
        'contractBelow21000_Others'
      ];

      const totalMale = maleFields.reduce((sum, key) => sum + get(key), 0);
      const totalFemale = femaleFields.reduce((sum, key) => sum + get(key), 0);
      const totalOthers = othersFields.reduce((sum, key) => sum + get(key), 0);

      f['grandTotal_Male'].setValue(totalMale, { emitEvent: false });
      f['grandTotal_Female'].setValue(totalFemale, { emitEvent: false });
      f['grandTotal_Others'].setValue(totalOthers, { emitEvent: false });

      f['grandTotal_All'].setValue(
        totalMale + totalFemale + totalOthers,
        { emitEvent: false }
      );
  }
}