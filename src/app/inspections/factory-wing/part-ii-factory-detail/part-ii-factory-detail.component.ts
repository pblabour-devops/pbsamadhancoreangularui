import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Inspection_Form_Factory_Part_II_FactoryDetail } from '../../Inspections-typed-models';
import { Subject } from 'rxjs';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { CommonService } from 'src/app/common/common.service';
import { takeUntil } from 'rxjs/operators';
import { GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-part-ii-factory-detail',
    templateUrl: './part-ii-factory-detail.component.html',
    styleUrls: ['./part-ii-factory-detail.component.css'],
    standalone: false
})
export class PartIiFactoryDetailComponent implements OnInit {
  @Input() jsonData: any;
  Input_Form: TForm<Inspection_Form_Factory_Part_II_FactoryDetail>;
  private ngUnsubscribe = new Subject<void>();
  genericFormData: GenericFormModel<Inspection_Form_Factory_Part_II_FactoryDetail>;
  submitted: boolean = false;
  hasSubmitClicked: boolean = false;
  inspectionMaxDateTime: string;
  inspectionMaxDate: string;
  public parmamEncodedinfo: string;
  public paramInfo: any;
  public inspectionRefId: any;
  characterCounts: { [key: string]: number } = {};
  controlMaxLengthNames: { [key: string]: number } = {};
  
  constructor(
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    public commonOpsService: CommonOpsService,
    public common: CommonService,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute
  ) {
    this.Input_Form = this.fb.group({
      id : [0,Validators.required],
      license_Factory_Act: ['', [Validators.required, Validators.maxLength(30)]],
      registration_PE_Act: ['', [Validators.required, Validators.maxLength(30)]],
      license_CL_Act: ['', [Validators.required, Validators.maxLength(30)]],
      registration_ISMW_Act: ['', [Validators.required, Validators.maxLength(30)]],
      license_ISMW_Act: ['', [Validators.required, Validators.maxLength(30)]],
      isFactoryFeeDeposited: ['1'],
      inspectionRefId: [0, [Validators.maxLength(10)]]
    }) as TForm<Inspection_Form_Factory_Part_II_FactoryDetail>;

    this.characterCounts = {
      license_Factory_Act: 0,
      registration_PE_Act: 0,
      license_CL_Act: 0,
      registration_ISMW_Act: 0,
      license_ISMW_Act: 0,
    };

    this.controlMaxLengthNames = {
      license_Factory_Act: 30,
      registration_PE_Act: 30,
      license_CL_Act: 30,
      registration_ISMW_Act: 30,
      license_ISMW_Act: 30,
    };
  }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.route.queryParams
      .subscribe(params => {
        this.parmamEncodedinfo = params.info;
        this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info) => {
          this.paramInfo = info;
          this.appHttpRequestHandlerService.httpGet({ id: this.paramInfo.inspectionRefId }, "Inspection", "getForm_Factory_Part_II_FactoryDetail").pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((data: GenericFormModel<Inspection_Form_Factory_Part_II_FactoryDetail>) => {
              this.Input_Form.patchValue(data.formModel);
              this.Input_Form.controls.license_Factory_Act.patchValue(this.paramInfo.licenceNumber)

              if(this.paramInfo.isLocked == 1)
                {
                  this.Input_Form.disable();
                }
            });
        });
      });
  }

  saveAndNext(e) {
    this.submitted = true;
    this.Input_Form.controls.inspectionRefId.patchValue(this.paramInfo.inspectionRefId);
    if (this.Input_Form.valid) {
      this.appHttpRequestHandlerService.httpPost(this.Input_Form.value, "pbsamadhannetcoreapi.Models.Inspection_Form_Factory_Part_II_FactoryDetail", "Inspection", "addUpdateForm_Factory_Part_II_FactoryDetail")
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

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  
  isMinLength(controlName: string): boolean {
    return this.Input_Form.get(controlName).value.length < 5;
  }

}
