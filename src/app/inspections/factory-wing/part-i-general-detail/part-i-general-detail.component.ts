import { ChangeDetectorRef, Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Inspection_Form_Factory_Part_I_General, InspectionFactoryDetailsViewModel } from '../../Inspections-typed-models';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { Observable, Subject } from 'rxjs';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { CommonService } from 'src/app/common/common.service';
import { GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
    selector: 'app-part-i-general-detail',
    templateUrl: './part-i-general-detail.component.html',
    styleUrls: ['./part-i-general-detail.component.css'],
    standalone: false
})
export class PartIGeneralDetailComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  genericFormData: GenericFormModel<Inspection_Form_Factory_Part_I_General>;
  submitted: boolean = false;
  hasSubmitClicked: boolean = false;
  inspectionMaxDateTime: string;
  inspectionMaxDate: string;
  minDate: string;
  maxDate: string;
  characterCounts: { [key: string]: number } = {};
  controlMaxLengthNames: { [key: string]: number } = {};
  public parmamEncodedinfo:string;
  public paramInfo:any;
  public inspectionRefId :any;
  public randomizationRefId :any;
  public factoryDetails : any;
  
  Input_Form = this.fb.group({
    id : [0,Validators.required],
    inspectionRefId : [0, Validators.required],
    factoryName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    factoryAddress: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
    dateOfInspection: ['',Validators.required],
    dateOfLastInspection: ['', Validators.required],
    occupierName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    occupierAddress: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
    managerName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    managerAddress: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
    presentPersonName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    presentPersonAddress: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
  }) as TForm<Inspection_Form_Factory_Part_I_General>;
  constructor(
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    public commonOpsService: CommonOpsService,
    public common: CommonService,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(){

    const currentDate = new Date();
    this.maxDate = this.formatDate(currentDate);

    // Calculate 10 days ago
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(currentDate.getDate() - 30);
    this.minDate = this.formatDate(tenDaysAgo);
  }
  ngAfterViewInit() {
    this.route.queryParams
    .subscribe(params => {
      this.parmamEncodedinfo=params.info;
      this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info)=>{
      this.paramInfo = info;
      this.inspectionRefId = this.paramInfo.inspectionRefId;
      this.randomizationRefId = this.paramInfo.randomizationRefId;
        this.appHttpRequestHandlerService.httpGet({ id: this.inspectionRefId}, "Inspection", "getForm_Factory_Part_I_General").pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data: GenericFormModel<Inspection_Form_Factory_Part_I_General>) => {
          if(data.formModel !==  null)
          {
            this.Input_Form.controls.id.patchValue( data.formModel.id);
            this.Input_Form.controls.dateOfInspection.patchValue(this.formatDateTime(new Date(data.formModel.dateOfInspection)));
            this.Input_Form.controls.dateOfLastInspection.patchValue(this.formatDateTime(new Date(data.formModel.dateOfLastInspection)));
            this.Input_Form.controls.presentPersonName.patchValue( data.formModel.presentPersonName);
            this.Input_Form.controls.presentPersonAddress.patchValue(data.formModel.presentPersonAddress);
          }

          if(this.paramInfo.isLocked == 1)
          {
            this.Input_Form.disable();
          }
        });

        this.appHttpRequestHandlerService.httpGet({ licenceNo: this.paramInfo.licenceNumber}, "Inspection", "getInspectionFactoryDetailsByLicenceNo").pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data) => {
          this.factoryDetails = data.responseDataModel;
          this.Input_Form.patchValue({
            factoryName: this.factoryDetails.factoryName,
            factoryAddress: this.factoryDetails.factoryAddress,
            occupierName: this.factoryDetails.occupierName,
            occupierAddress: this.factoryDetails.occupierAddress,
            managerName: this.factoryDetails.managerName,
            managerAddress: this.factoryDetails.managerAddress,
            dateOfLastInspection: this.formatDate(new Date(this.factoryDetails.lastInspectionDate)),
          });

          // this.Input_Form.controls.factoryName.disable({emitEvent: false, onlySelf: true});
          // this.Input_Form.controls.factoryAddress.disable({emitEvent: false, onlySelf: true});
          // this.Input_Form.controls.occupierName.disable({emitEvent: false, onlySelf: true});
          // this.Input_Form.controls.occupierAddress.disable({emitEvent: false, onlySelf: true});
          // this.Input_Form.controls.managerName.disable({emitEvent: false, onlySelf: true});
          // this.Input_Form.controls.managerAddress.disable({emitEvent: false, onlySelf: true});
          // this.Input_Form.controls.dateOfLastInspection.disable({emitEvent: false, onlySelf: true});
        });
      });
    });
  this.setMaxDateTime();
}

  // private formatDate(date: Date): string {
  //   const year = date.getFullYear();
  //   const month = `${date.getMonth() + 1}`.padStart(2, '0');
  //   const day = `${date.getDate()}`.padStart(2, '0');
  //   return `${year}-${month}-${day}`;
  // }

  private formatDateTime(date: Date): string {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    const hours = `${date.getHours()}`.padStart(2, '0');
    const minutes = `${date.getMinutes()}`.padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  setMaxDateTime(): void {
    const now = new Date();
    this.inspectionMaxDateTime = now.toISOString().slice(0, 16); // Format date as 'YYYY-MM-DDTHH:MM'
    this.inspectionMaxDate = now.toISOString().slice(0, 10); // Format date as 'YYYY-MM-DD'

  }
    
  saveAndNext(e){
    // this.Input_Form.patchValue({
    //   factoryName: this.factoryDetails.factoryName,
    //   factoryAddress: this.factoryDetails.factoryAddress,
    //   occupierName: this.factoryDetails.occupierName,
    //   occupierAddress: this.factoryDetails.occupierAddress,
    //   managerName: this.factoryDetails.managerName,
    //   managerAddress: this.factoryDetails.managerAddress,
    //   dateOfLastInspection: this.formatDate(new Date(this.factoryDetails.lastInspectionDate)),
    // });
    this.Input_Form.controls.inspectionRefId.patchValue( this.inspectionRefId);
    this.hasSubmitClicked=true;
    var inputForm = this.Input_Form.getRawValue();
    this.appHttpRequestHandlerService.httpPost(inputForm, "pbsamadhannetcoreapi.Models.Inspection_Form_Factory_Part_I_General", "Inspection", "addUpdateForm_Factory_Part_I_General")
    .subscribe((data: GenericServiceResultTemplate) => {
      // this.inspectionsPerformaStepersComponent.moveToNextStep();
    });
  }
  hasExceededMaxLength(controlName: string): boolean {
    return this.characterCounts[controlName] >= this.controlMaxLengthNames[controlName];
  }

  isMinLength(controlName: string): boolean {
    return this.Input_Form.get(controlName).value.length < 5;
  }
  getCharacterCount(controlName: string): number {
    return this.Input_Form.get(controlName).value.length;
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
}
