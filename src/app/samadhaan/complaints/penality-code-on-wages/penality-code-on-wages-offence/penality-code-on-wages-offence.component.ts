import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { IComplaint_PenaltyCodeOnWagesOffence } from 'src/app/samadhaan/samadhaan-typed-modelts';
import { applicationTypeEnum, categoryTypeEnum } from 'src/app/shared.data';
import { CommonOpsService } from 'src/app/shared/common-ops-service';

@Component({
  selector: 'app-penality-code-on-wages-offence',
  standalone: false,
  templateUrl: './penality-code-on-wages-offence.component.html',
  styleUrl: './penality-code-on-wages-offence.component.css',
})
export class PenalityCodeOnWagesOffenceComponent {
  paramInfo: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private commonOpsService: CommonOpsService) { }

  Input_Form: TForm<IComplaint_PenaltyCodeOnWagesOffence> = this.fb.group({
    id: [0, Validators.required],
    appRefId: [0, Validators.required],
    applicationType: [applicationTypeEnum.SAMADHAN_COMPLAINTS, Validators.required],
    applicationPurposeType: [0, Validators.required],
    projectSiteVersion: [1, Validators.required],
    toDoActivityModeType: [1, Validators.required],
    rootActivityRefId: [''],
    toDoActivityCategoryType: [categoryTypeEnum.INDIVIDUAL_COMPLAINT_PENALITY_CODE_ON_WAGES, Validators.required],
    offenceList: this.fb.array([])
  }) as TForm<IComplaint_PenaltyCodeOnWagesOffence>;

  get offenceList(): FormArray {
    return this.Input_Form.get('offenceList') as FormArray;
  }

  createOffenceGroup(): FormGroup {
    return this.fb.group({
      sectionRule: [''],
      offence: ['']
    });
  }

  ngOnInit() {
    this.Input_Form.valueChanges.subscribe((value) => {
      
    });
  }

  ngAfterViewInit() {
    this.route.queryParams
      .subscribe(params => {
        this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info) => {
          this.paramInfo = info;

          this.Input_Form.patchValue({
            appRefId: this.paramInfo?.appRefId,
            applicationType: this.paramInfo?.applicationType,
            applicationPurposeType: this.paramInfo?.applicationPurposeType,
            projectSiteVersion: this.paramInfo?.projectSiteVersion
          });

          if (this.offenceList.length === 0) {
            this.addOffence();
          }
        });
      });
  }

  addOffence() {
    this.offenceList.push(this.createOffenceGroup());
  }

  deleteOffence(index: number) {
    this.offenceList.removeAt(index);
  }

}
