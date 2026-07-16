import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Inspection_Form_Factory_Part_III_Health } from '../../Inspections-typed-models';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { Subject } from 'rxjs';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { CommonService } from 'src/app/common/common.service';
import { UntypedFormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GenericResponseTemplateModel, GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-part-iii-health',
    templateUrl: './part-iii-health.component.html',
    styleUrls: ['./part-iii-health.component.css'],
    standalone: false
})
export class PartIiiHealthComponent implements OnInit {
  @Input() jsonData: any;
  Input_Form: TForm<Inspection_Form_Factory_Part_III_Health>;
  private ngUnsubscribe = new Subject<void>();
  genericFormData: GenericFormModel<Inspection_Form_Factory_Part_III_Health>;
  submitted: boolean = false;
  hasSubmitClicked: boolean = false;
  defaultValue:"N/A";
  characterCounts: { [key: string]: number } = {};
  controlMaxLengthNames: { [key: string]: number } = {};
  public parmamEncodedinfo:string;
  public paramInfo:any;
  public hasViolationFound : string;
  
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
      id : [0,Validators.required],
      sec_11_Cleanliness_SuitableManner_Selection: ['-1'],
      sec_11_Cleanliness_SuitableManner_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_11_Cleanliness_SuitableManner_ViolationExist : [0,[Validators.required]],
      sec_11_Cleanliness_Method_Selection: ['-1'],
      sec_11_Cleanliness_Method_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_11_Cleanliness_Method_ViolationExist : [0,[Validators.required]],
      sec_11_Cleanliness_Drainage_Selection: ['-1'],
      sec_11_Cleanliness_Drainage_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_11_Cleanliness_Drainage_ViolationExist : [0,[Validators.required]],
      sec_11_Cleanliness_LimeWashed_Selection: ['-1'],
      sec_11_Cleanliness_LimeWashed_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_11_Cleanliness_LimeWashed_ViolationExist : [0,[Validators.required]],
      sec_11_Cleanliness_Whitewashing_Selection: ['-1'],
      sec_11_Cleanliness_Whitewashing_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_11_Cleanliness_Whitewashing_ViolationExist : [0,[Validators.required]],
      sec_12_DisposalWaste_PPCB_Selection: ['-1'],
      sec_12_DisposalWaste_PPCB_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_12_DisposalWaste_PPCB_ViolationExist : [0,[Validators.required]],
      sec_13_VantilationTemperature_WetBulb_Selection: ['-1'],
      sec_13_VantilationTemperature_WetBulb_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_13_VantilationTemperature_WetBulb_ViolationExist : [0,[Validators.required]],
      sec_13_VantilationTemperature_WorkRoom_Selection: ['-1'],
      sec_13_VantilationTemperature_WorkRoom_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_13_VantilationTemperature_WorkRoom_ViolationExist : [0,[Validators.required]],
      sec_14_DustFume_Selection: ['-1'],
      sec_14_DustFume_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_14_DustFume_ViolationExist : [0,[Validators.required]],
      sec_16_Overcrowding_142CM_Selection: ['-1'],
      sec_16_Overcrowding_142CM_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_16_Overcrowding_142CM_ViolationExist : [0,[Validators.required]],
      sec_17_Lighting_Windows_Selection: ['-1'],
      sec_17_Lighting_Windows_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_17_Lighting_Windows_ViolationExist : [0,[Validators.required]],
      sec_17_Lighting_EyeStrain_Selection: ['-1'],
      sec_17_Lighting_EyeStrain_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_17_Lighting_EyeStrain_ViolationExist : [0,[Validators.required]],
      sec_17_Lighting_Passages_Selection: ['-1'],
      sec_17_Lighting_Passages_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_17_Lighting_Passages_ViolationExist : [0,[Validators.required]],
      sec_18_DrinkingWater_Language_Selection: ['-1'],
      sec_18_DrinkingWater_Language_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_18_DrinkingWater_Language_ViolationExist : [0,[Validators.required]],
      sec_18_DrinkingWater_Distance_Selection: ['-1'],
      sec_18_DrinkingWater_Distance_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_18_DrinkingWater_Distance_ViolationExist : [0,[Validators.required]],
      sec_18_DrinkingWater_Quality_Selection: ['-1'],
      sec_18_DrinkingWater_Quality_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_18_DrinkingWater_Quality_ViolationExist : [0,[Validators.required]],
      sec_18_DrinkingWater_Authority_Selection: ['-1'],
      sec_18_DrinkingWater_Authority_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_18_DrinkingWater_Authority_ViolationExist : [0,[Validators.required]],
      sec_18_DrinkingWater_Approval_Selection: ['-1'],
      sec_18_DrinkingWater_Approval_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_18_DrinkingWater_Approval_ViolationExist : [0,[Validators.required]],
      sec_18_DrinkingWater_Clean_Selection: ['-1'],
      sec_18_DrinkingWater_Clean_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_18_DrinkingWater_Clean_ViolationExist : [0,[Validators.required]],
      sec_18_DrinkingWater_Point_Selection: ['-1'],
      sec_18_DrinkingWater_Point_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_18_DrinkingWater_Point_ViolationExist : [0,[Validators.required]],
      sec_18_DrinkingWater_CoolWater_Selection: ['-1'],
      sec_18_DrinkingWater_CoolWater_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_18_DrinkingWater_CoolWater_ViolationExist : [0,[Validators.required]],
      sec_19_Urinals_Accomodation_Selection: ['-1'],
      sec_19_Urinals_Accomodation_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_19_Urinals_Accomodation_ViolationExist : [0,[Validators.required]],
      sec_19_Urinals_PublicHealth_Selection: ['-1'],
      sec_19_Urinals_PublicHealth_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_19_Urinals_PublicHealth_ViolationExist : [0,[Validators.required]],
      sec_19_Urinals_Privacy_Selection: ['-1'],
      sec_19_Urinals_Privacy_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_19_Urinals_Privacy_ViolationExist : [0,[Validators.required]],
      sec_19_Urinals_Signboards_Selection: ['-1'],
      sec_19_Urinals_Signboards_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_19_Urinals_Signboards_ViolationExist : [0,[Validators.required]],
      sec_19_Urinals_Rule46_Selection: ['-1'],
      sec_19_Urinals_Rule46_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_19_Urinals_Rule46_ViolationExist : [0,[Validators.required]],
      sec_19_Urinals_Walls_Selection: ['-1'],
      sec_19_Urinals_Walls_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_19_Urinals_Walls_ViolationExist : [0,[Validators.required]],
      sec_20_Spittoons_Rule_53_54_Selection: ['-1'],
      sec_20_Spittoons_Rule_53_54_Remarks: ['N/A', [Validators.required,Validators.maxLength(1000)]],
      sec_20_Spittoons_Rule_53_54_ViolationExist : [0,[Validators.required]],
      
      inspectionRefId: [null, Validators.required],
    }, {}) as TForm<Inspection_Form_Factory_Part_III_Health>;
  }
  ngOnInit(): void {}

  ngAfterViewInit() {
     this.hasViolationFound = 'Any Violation Found?'
    this.route.queryParams
    .subscribe(params => {
      this.parmamEncodedinfo=params.info;
      this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info)=>{
      this.paramInfo = info;
      this.appHttpRequestHandlerService.httpGet({ id:this.paramInfo.inspectionRefId}, "Inspection", "getForm_Factory_Part_III_Health").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericFormModel<Inspection_Form_Factory_Part_III_Health>) => {
        this.Input_Form.patchValue(data.formModel);

        if(this.paramInfo.isLocked == 1)
          {
            this.Input_Form.disable();
          }
    });
      });
    });
  }

  saveAndNext(e){
    this.submitted = true;
    this.hasSubmitClicked = true;
    this.Input_Form.controls.inspectionRefId.patchValue(this.paramInfo.inspectionRefId);
    if (this.Input_Form.valid) {
      this.appHttpRequestHandlerService.httpPost(this.Input_Form.value, "pbsamadhannetcoreapi.Models.Inspection_Form_Factory_Part_III_Health", "Inspection", "addUpdateForm_Factory_Part_III_Health")
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

  

  getCharacterCount(controlName: string): number {
    return this.Input_Form.get(controlName).value.length;
  }



  // private updateCharacterCountsForTextareaControls(): void {
  //   Object.keys(this.Input_Form.controls).forEach(controlName => {
  //     const control = this.Input_Form.get(controlName);
  //     if (control && control instanceof FormControl && control.value && typeof control.value === 'string') {
  //       if (control.value.trim() !== '') {
  //         //this.updateCharacterCount(controlName, 1000);
  //       }
  //     }
  //   });
  // }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
