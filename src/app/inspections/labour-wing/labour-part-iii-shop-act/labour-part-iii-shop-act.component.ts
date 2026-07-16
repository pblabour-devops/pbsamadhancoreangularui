import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { GenericFormModel } from 'src/app/generic-implementation/generic-form-builder.type';
import { GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { CommonService } from 'src/app/common/common.service';
import { Inspection_Form_Labour_III_ShopAct } from '../../Inspections-typed-models';



@Component({
    selector: 'app-labour-part-iii-shop-act',
    templateUrl: './labour-part-iii-shop-act.component.html',
    styleUrls: ['./labour-part-iii-shop-act.component.css'],
    standalone: false
})
export class LabourPartIiiShopActComponent implements OnInit {
  Input_Form: UntypedFormGroup;
  submitted = false;
  hasSubmitClicked: boolean = false;
  private ngUnsubscribe = new Subject<void>();
  paramInfo: any; 
  genericFormData: GenericFormModel<Inspection_Form_Labour_III_ShopAct>;
  public tableData : any[] = [];
 
  constructor(
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    public commonOpsService: CommonOpsService,
    public common: CommonService,
    private formBuilder: UntypedFormBuilder,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.Input_Form = this.formBuilder.group({
      id: [0,Validators.required],
      natureOfBusinessType: ['', Validators.required],
      noOfWorkerMale: ['', Validators.required],
      noOfWorkerFemale: ['', Validators.required],
      noOfWorkerYoungPerson: ['', Validators.required],
      noOfWorkerChild: ['', Validators.required],
      is_Registration_Certificate_Obtained: ['', Validators.required],
      is_Registration_Certificate_Valid: ['', Validators.required],
      is_Shop_Or_Esablishment_Obtained_Exemption: ['', Validators.required],
      wagesPeriod: ['', Validators.required],
      wagesPaymentDate: ['', Validators.required],
      wagesPaymentModeType: ['', Validators.required],
      isViolationFound : [false,Validators.required],
      remarks : ['',Validators.required],
      inspectionRefId: [null, Validators.required],
      //inspectionDoneOn_Labour_Wing :['', Validators.required] 
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
  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info) => {
          this.paramInfo = info;
        });
      });

    this.appHttpRequestHandlerService.httpGet({ id: this.paramInfo.inspectionRefId }, "Inspection", "getForm_Labour_Part_III_ShopAct")
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericFormModel<any>) => {
        this.Input_Form.patchValue(data.formModel);
        this.tableData = [{ ...data.formModel }];
        this.Input_Form.controls.wagesPaymentDate.patchValue(this.formatDateTime(new Date(data.formModel.wagesPaymentDate)));

        this.updateCharacterCountsForTextareaControls();
      });

      if(this.paramInfo.isLocked == 1)
        {
          this.Input_Form.disable();
        }
  }

  ngAfterViewInit() {
  
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  get formControls() {
    return this.Input_Form.controls;
  }

  saveAndNext(event: Event) {
      }

  onSubmit(): void { 
    this.submitted = true;
    this.Input_Form.controls.inspectionRefId.patchValue(this.paramInfo.inspectionRefId);
    if (this.Input_Form.valid){
    this.appHttpRequestHandlerService.httpPost(this.Input_Form.value, "pbsamadhannetcoreapi.Models.Inspection_Form_Labour_III_ShopAct", "Inspection", "addUpdateForm_Labour_Part_III_ShopAct")
      .subscribe((data: GenericServiceResultTemplate) => {

        this.appHttpRequestHandlerService.httpGet({ id: this.paramInfo.inspectionRefId }, "Inspection", "getForm_Labour_Part_III_ShopAct")
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericFormModel<any>) => {
        this.Input_Form.patchValue(data.formModel);
        this.tableData = [{ ...data.formModel }];
        this.Input_Form.controls.wagesPaymentDate.patchValue(this.formatDateTime(new Date(data.formModel.wagesPaymentDate)));

        this.updateCharacterCountsForTextareaControls();
      });
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

  updateCharacterCountsForTextareaControls(): void {
    Object.keys(this.Input_Form.controls).forEach(controlName => {
      const control = this.Input_Form.get(controlName);
      if (control && control instanceof UntypedFormControl && control.value && typeof control.value === 'string') {
        if (control.value.trim() !== '') {
          this.updateCharacterCount(controlName, 1000);
        }
      }
    });
  }

  private updateCharacterCount(controlName: string, maxLength: number): void {
    const control = this.Input_Form.get(controlName);
    if (control) {
      const value = control.value || '';
    }
  }

  getCharacterCount(controlName: string): number {
    return 0;
  }
}

