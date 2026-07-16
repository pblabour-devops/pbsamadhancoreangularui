import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { Inspection_Form_Factory_Part_III_Welfare } from '../../Inspections-typed-models';
import { Subject } from 'rxjs';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { CommonService } from 'src/app/common/common.service';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { ActivatedRoute, Router } from '@angular/router';
// 
@Component({
    selector: 'app-part-iii-welfare',
    templateUrl: './part-iii-welfare.component.html',
    styleUrls: ['./part-iii-welfare.component.css'],
    standalone: false
})
export class PartIiiWelfareComponent implements OnInit {
  @Input() jsonData: any;
  private ngUnsubscribe = new Subject<void>();
  genericFormData: GenericFormModel<Inspection_Form_Factory_Part_III_Welfare>;
  submitted: boolean = false;
  hasSubmitClicked: boolean = false;
  defaultValue:"N/A";
  public parmamEncodedinfo:string;
  public paramInfo:any;
  public hasViolationFound : string;
  // 
  constructor(
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    public commonOpsService: CommonOpsService,
    public common: CommonService,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  Input_Form: TForm<Inspection_Form_Factory_Part_III_Welfare> = this.fb.group({
    id : [0,Validators.required],
    sec_42_WashingFacilities_Provided_Selection: ['-1', Validators.required],
    sec_42_WashingFacilities_Provided_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
    sec_42_WashingFacilities_Provided_ViolationExist: ['0', Validators.required],
    sec_43_StoringAndDrying_Rule68A_Selection: ['-1', Validators.required],
    sec_43_StoringAndDrying_Rule68A_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
    sec_43_StoringAndDrying_Rule68A_ViolationExist: ['0', Validators.required],
    sec_44_FacilitiesForSitting_Provided_Selection: ['-1', Validators.required],
    sec_44_FacilitiesForSitting_Provided_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
    sec_44_FacilitiesForSitting_Provided_ViolationExist: ['0', Validators.required],
    sec_45_Rule69_FirstAid_Rule69_Selection: ['-1', Validators.required],
    sec_45_Rule69_FirstAid_Rule69_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
    sec_45_Rule69_FirstAid_Rule69_ViolationExist: ['0', Validators.required],
    sec_45_Rule69_NoticesContainNameOfPerson_Selection: ['-1', [Validators.required, Validators.maxLength(1000)]],
    sec_45_Rule69_NoticesContainNameOfPerson_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
    sec_45_Rule69_NoticesContainNameOfPerson_ViolationExist: ['0', Validators.required],
    sec_45_Rule69_PersonTrainedInFirstAid_Selection : ['-1', [Validators.required, Validators.maxLength(1000)]],
    sec_45_Rule69_PersonTrainedInFirstAid_Remarks : ['N/A', [Validators.required, Validators.maxLength(1000)]],
    sec_45_Rule69_PersonTrainedInFirstAid_ViolationExist: ['0', Validators.required],
    sec_45_Rule70_AmbulanceRoom_Required_Selection: ['-1', Validators.required],
    sec_45_Rule70_AmbulanceRoom_Required_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
    sec_45_Rule70_AmbulanceRoom_Required_ViolationExist: ['0', Validators.required],
    sec_45_Rule70_AmbulanceRoom_Rule70_Selection: ['-1', Validators.required],
    sec_45_Rule70_AmbulanceRoom_Rule70_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
    sec_45_Rule70_AmbulanceRoom_Rule70_ViolationExist: ['0', Validators.required],
    sec_45_Rule70_AmbulanceRoom_MedicalOfficers_Selection: ['-1', Validators.required],
    sec_45_Rule70_AmbulanceRoom_MedicalOfficers_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
    sec_45_Rule70_AmbulanceRoom_MedicalOfficers_ViolationExist: ['0', Validators.required],
    sec_45_Rule70_AmbulanceRoom_ParaMedicalStaff_Selection: ['-1', Validators.required],
    sec_45_Rule70_AmbulanceRoom_ParaMedicalStaff_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
    sec_45_Rule70_AmbulanceRoom_ParaMedicalStaff_ViolationExist: ['0', Validators.required],
    sec_46_Canteen_Required_Selection: ['-1', Validators.required],
    sec_46_Canteen_Required_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
    sec_46_Canteen_Required_ViolationExist: ['0', Validators.required],
    sec_46_Canteen_Rule71_72_73_Selection: ['-1', Validators.required],
    sec_46_Canteen_Rule71_72_73_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
    sec_46_Canteen_Rule71_72_73_ViolationExist: ['0', Validators.required],
    sec_46_Canteen_PriceToCharged_Selection: ['-1', Validators.required],
    sec_46_Canteen_PriceToCharged_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
    sec_46_Canteen_PriceToCharged_ViolationExist: ['0', Validators.required],
    sec_46_Canteen_BeingMaintained_Selection: ['-1', Validators.required],
    sec_46_Canteen_BeingMaintained_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
    sec_46_Canteen_BeingMaintained_ViolationExist: ['0', Validators.required],
    sec_46_Canteen_CommitteeConstituted_Selection: ['-1', Validators.required],
    sec_46_Canteen_CommitteeConstituted_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
    sec_46_Canteen_CommitteeConstituted_ViolationExist: ['0', Validators.required],
    sec_46_Canteen_ExaminedAnnualy_Selection: ['-1', Validators.required],
    sec_46_Canteen_ExaminedAnnualy_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
    sec_46_Canteen_ExaminedAnnualy_ViolationExist: ['0', Validators.required],
    sec_47_RestRoom_Required_Selection: ['-1', Validators.required],
    sec_47_RestRoom_Required_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
    sec_47_RestRoom_Required_ViolationExist: ['0', Validators.required],
    sec_47_RestRoom_Rule78_Selection: ['-1', Validators.required],
    sec_47_RestRoom_Rule78_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
    sec_47_RestRoom_Rule78_ViolationExist: ['0', Validators.required],
    sec_48_Crech_Required_Selection: ['-1', Validators.required],
    sec_48_Crech_Required_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
    sec_48_Crech_Required_ViolationExist: ['0', Validators.required],
    sec_48_Crech_Rule79_Selection: ['-1', Validators.required],
    sec_48_Crech_Rule79_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
    sec_48_Crech_Rule79_ViolationExist: ['0', Validators.required],
    sec_48_Crech_WashRoom_Selection: ['-1', Validators.required],
    sec_48_Crech_WashRoom_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
    sec_48_Crech_WashRoom_ViolationExist: ['0', Validators.required],
    sec_48_Crech_MilkAndRefreshment_Selection: ['-1', Validators.required],
    sec_48_Crech_MilkAndRefreshment_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
    sec_48_Crech_MilkAndRefreshment_ViolationExist: ['0', Validators.required],
    sec_48_Crech_MotherFeeding_Selection: ['-1', Validators.required],
    sec_48_Crech_MotherFeeding_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
    sec_48_Crech_MotherFeeding_ViolationExist: ['0', Validators.required],
    sec_49_WelfareOfficer_Required_Selection: ['-1', Validators.required],
    sec_49_WelfareOfficer_Required_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
    sec_49_WelfareOfficer_Required_ViolationExist: ['0', Validators.required],
    sec_49_WelfareOfficer_PWOR_Selection: ['-1', Validators.required],
    sec_49_WelfareOfficer_PWOR_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
    sec_49_WelfareOfficer_PWOR_ViolationExist: ['0', Validators.required],
    sec_49_WelfareOfficer_OtherRemarks_Selection: ['-1', Validators.required],
    sec_49_WelfareOfficer_OtherRemarks_Remarks: ['N/A', [Validators.required, Validators.maxLength(1000)]],
    sec_49_WelfareOfficer_OtherRemarks_ViolationExist: ['0', Validators.required],
    inspectionRefId: ['',Validators.required]
  }) as TForm<Inspection_Form_Factory_Part_III_Welfare>;
  ngOnInit(): void {}

  ngAfterViewInit() {
    this.hasViolationFound=  "Any Violation Found?";
    this.route.queryParams
    .subscribe(params => {
      this.parmamEncodedinfo=params.info;
      this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info)=>{
      this.paramInfo = info;
      this.appHttpRequestHandlerService.httpGet({ id: this.paramInfo.inspectionRefId}, "Inspection", "getForm_Factory_Part_III_Welfare").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericFormModel<Inspection_Form_Factory_Part_III_Welfare>) => {
        // this.initFormData(data)
        this.Input_Form.patchValue(data.formModel)

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
    this.Input_Form.controls.inspectionRefId.patchValue( this.paramInfo.inspectionRefId);
    if (this.Input_Form.valid) {
      this.appHttpRequestHandlerService.httpPost(this.Input_Form.value, "pbsamadhannetcoreapi.Models.Inspection_Form_Factory_Part_III_Welfare", "Inspection", "addUpdateForm_Factory_Part_III_Welfare")
        .subscribe((data: GenericServiceResultTemplate) => {
          // // this.inspectionsPerformaStepersComponent.moveToNextStep();
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

}
