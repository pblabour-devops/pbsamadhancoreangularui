import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/common/common.service';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { Inspection_Form_Factory_Part_III_InspectionReport } from '../../Inspections-typed-models';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { Subject } from 'rxjs';
import { GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-part-iii-inspection-report-main',
    templateUrl: './part-iii-inspection-report-main.component.html',
    styleUrls: ['./part-iii-inspection-report-main.component.css'],
    standalone: false
})
export class PartIiiInspectionReportMainComponent implements OnInit {
  Input_Form: TForm<Inspection_Form_Factory_Part_III_InspectionReport>;
  private ngUnsubscribe = new Subject<void>();
  genericFormData: GenericFormModel<Inspection_Form_Factory_Part_III_InspectionReport>;
  submitted: boolean = false;
  hasSubmitClicked: boolean = false;
  inspectionMaxDateTime: string;
  inspectionMaxDate: string;
  characterCounts: { [key: string]: number } = {};
  controlMaxLengthNames: { [key: string]: number } = {};
  public paramInfo: any;
  public inspectionRefId: any;
  public parmamEncodedinfo: string;
  public factoryDetails : any;
  public manufacturingprocess : any;
  
  
  constructor(
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    public commonOpsService: CommonOpsService,
    public common: CommonService,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.Input_Form = this.fb.group({
      id : [0,Validators.required],
      factorySectionCategoryType: ['0'],
      mfg_Process_Reported: ['', [Validators.required]],
      mfg_Process_Inspected: ['', [Validators.required]],
      byeProduct_Intermidiates_ChemicalDetail: ['', [Validators.required]],
      bp_PUPDRules_IsApplicable: ['-1'],
      bp_PUPDRules_Status: ['N/A', [Validators.required, Validators.maxLength(500)]],
      bp_FactoriesAct_IsAccepted: [''],
      bp_FactoriesAct_ApprovalReferenceNum: ['N/A', [Validators.required, Validators.maxLength(100)]],
      bP_FactoriesAct_ApprovalDate: [null],
      bp_Constructed_IsAsPerApprovedPlans: [''],
      bp_Constructed_ChangesAsPerInspected: ['N/A', [Validators.required]],
      bp_Stability_IsAccepted: ['0'],
      bp_Stability_AcceptanceReferenceNum: ['N/A', [Validators.required, Validators.maxLength(100)]],
      bP_FactoriesAct_AcceptanceDate: [null],
      inspectionRefId: ['', Validators.required]
    }) as TForm<Inspection_Form_Factory_Part_III_InspectionReport>;

    this.characterCounts = {
      bp_PUPDRules_Status: 0,
      bp_FactoriesAct_ApprovalReferenceNum: 0,
      bp_Stability_AcceptanceReferenceNum: 0,
    };

    this.controlMaxLengthNames = {
      bp_PUPDRules_Status: 500,
      bp_FactoriesAct_ApprovalReferenceNum: 100,
      bp_Stability_AcceptanceReferenceNum: 100
    };
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = `${date.getMonth() + 1}`.padStart(2, '0');
      const day = `${date.getDate()}`.padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    this.route.queryParams
      .subscribe(params => {
        this.parmamEncodedinfo = params.info;
        this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info) => {
          this.paramInfo = info;
          this.appHttpRequestHandlerService.httpGet({ id: this.paramInfo.inspectionRefId }, "Inspection", "getForm_Factory_Part_III_InspectionReport").pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((data) => {
              this.Input_Form.patchValue(data.formModel);
              this.Input_Form.controls.bp_Constructed_IsAsPerApprovedPlans.patchValue(data.formModel.bP_Constructed_IsAsPerApprovedPlans);
              this.Input_Form.controls.bp_PUPDRules_IsApplicable.patchValue(data.formModel.bP_PUPDRules_IsApplicable);
              this.Input_Form.controls.bp_Stability_IsAccepted.patchValue(data.formModel.bP_Stability_IsAccepted);
              this.Input_Form.controls.bp_Constructed_ChangesAsPerInspected.patchValue(data.formModel.bP_Constructed_ChangesAsPerInspected);
              this.Input_Form.controls.bp_PUPDRules_Status.patchValue(data.formModel.bP_PUPDRules_Status);
              this.Input_Form.controls.bp_FactoriesAct_ApprovalReferenceNum.patchValue(data.formModel.bP_FactoriesAct_ApprovalReferenceNum);
              this.Input_Form.controls.bp_FactoriesAct_IsAccepted.patchValue(data.formModel.bP_FactoriesAct_IsAccepted);
              this.manufacturingprocess =data.formModel.mfg_Process_Reported;
              this.Input_Form.controls.bP_FactoriesAct_ApprovalDate?.patchValue(formatDate(new Date(data.formModel.bP_FactoriesAct_ApprovalDate)))
              this.Input_Form.controls.bP_FactoriesAct_AcceptanceDate?.patchValue(formatDate(new Date(data.formModel.bP_FactoriesAct_AcceptanceDate)))



              this.Input_Form.setValue({
                bp_Constructed_IsAsPerApprovedPlans: data.formModel.bp_Constructed_IsAsPerApprovedPlans,
                // other fields...
              });
              
            });
          
            this.appHttpRequestHandlerService.httpGet({ licenceNo: this.paramInfo.licenceNumber}, "Inspection", "getInspectionFactoryDetailsByLicenceNo").pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((data) => {
              this.factoryDetails = data.responseDataModel;
              this.Input_Form.patchValue({
                
                mfg_Process_Reported: (this.factoryDetails.manufacturingProcess === 'NA' ? this.manufacturingprocess : this.factoryDetails.manufacturingProcess)
              });
              if(this.paramInfo.isLocked == 1)
                {
                  this.Input_Form.disable();
                }
            });
        });
      });
  }

  fillDefaultValueInRemarks(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (!inputElement.value || inputElement.value.trim() === '' || inputElement.value === '-') {
      inputElement.value = 'N/A';
      this.Input_Form.get(inputElement.getAttribute('formControlName')!)?.patchValue('N/A');
    }
  }

  saveAndNext(e) {
    this.submitted = true;
    this.hasSubmitClicked = true;
    this.Input_Form.controls.inspectionRefId.patchValue(this.paramInfo.inspectionRefId);
      if (this.Input_Form.controls.bP_FactoriesAct_ApprovalDate.value == null)
      {
        this.Input_Form.controls.bP_FactoriesAct_ApprovalDate.patchValue(new Date());
      }
    if (this.Input_Form.valid) {
      this.appHttpRequestHandlerService.httpPost(this.Input_Form.value, "pbsamadhannetcoreapi.Models.Inspection_Form_Factory_Part_III_InspectionReport", "Inspection", "addUpdateForm_Factory_Part_III_InspectionReport")
        .subscribe((data: GenericServiceResultTemplate) => {
          // this.inspectionsPerformaStepersComponent.moveToNextStep();
        });
    }
  }
  hasExceededMaxLength(controlName: string): boolean {
    return this.characterCounts[controlName] >= this.controlMaxLengthNames[controlName];
  }

  getCharacterCount(controlName: string): number {
    return this.Input_Form.get(controlName).value.length;
  }

  
}
