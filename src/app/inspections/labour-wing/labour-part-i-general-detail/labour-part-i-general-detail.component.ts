import { ChangeDetectorRef, Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Inspection_Form_Labour_Part_I_General } from '../../Inspections-typed-models';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { Observable, Subject } from 'rxjs';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { CommonService } from 'src/app/common/common.service';
import { GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-labour-part-i-general-detail',
    templateUrl: './labour-part-i-general-detail.component.html',
    styleUrls: ['./labour-part-i-general-detail.component.css'],
    standalone: false
})
export class LabourPartIGeneralDetailComponent implements OnInit {
 //Input_Form: TForm<Inspection_Form_Factory_Part_I_General>;
 private ngUnsubscribe = new Subject<void>();
 genericFormData: GenericFormModel<Inspection_Form_Labour_Part_I_General>;
 submitted: boolean = false;
 hasSubmitClicked: boolean = false;
 inspectionMaxDateTime: string;
 inspectionMaxDate: string;
 characterCounts: { [key: string]: number } = {};
 controlMaxLengthNames: { [key: string]: number } = {};
 public parmamEncodedinfo:string;
 public paramInfo:any;
 public inspectionRefId :any;
 public randomizationRefId :any;
 public factoryDetails : any;
 Input_Form = this.fb.group({
   id: [0,Validators.required],
   inspectionRefId : [0, Validators.required],
   factoryName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
   factoryAddress: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
   //inspectionFactoryExistenceType: ['', Validators.required],
   dateOfInspection: ['', Validators.required],
   dateOfLastInspection: ['', Validators.required],
   occupierName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
   occupierAddress: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
   managerName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
   managerAddress: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
   presentPersonName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
   presentPersonAddress: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
 }) as TForm<Inspection_Form_Labour_Part_I_General>;
 get formControls() { return this.Input_Form.controls; }
 constructor(
   private appHttpRequestHandlerService: AppHttpRequestHandlerService,
   public commonOpsService: CommonOpsService,
   public common: CommonService,
   private fb: UntypedFormBuilder,
   private route: ActivatedRoute
 ) {}

 ngOnInit(): void {}

 ngAfterViewInit() {
   this.route.queryParams
   .subscribe(params => {
     this.parmamEncodedinfo=params.info;
     this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info)=>{
     this.paramInfo = info;
     this.inspectionRefId = this.paramInfo.inspectionRefId;
     this.randomizationRefId = this.paramInfo.randomizationRefId;
       this.appHttpRequestHandlerService.httpGet({ id: this.inspectionRefId}, "Inspection", "getForm_Labour_Part_I_General").pipe(takeUntil(this.ngUnsubscribe))
       .subscribe((data: GenericFormModel<Inspection_Form_Labour_Part_I_General>) => {
         if(data.formModel !==  null)
         {
           this.initFormData(data)
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

         this.Input_Form.controls.factoryName.disable({emitEvent: false, onlySelf: true});
         //this.Input_Form.controls.factoryAddress.disable({emitEvent: false, onlySelf: true});
         this.Input_Form.controls.occupierName.disable({emitEvent: false, onlySelf: true});
         this.Input_Form.controls.occupierAddress.disable({emitEvent: false, onlySelf: true});
         this.Input_Form.controls.managerName.disable({emitEvent: false, onlySelf: true});
         this.Input_Form.controls.managerAddress.disable({emitEvent: false, onlySelf: true});
         this.Input_Form.controls.dateOfLastInspection.disable({emitEvent: false, onlySelf: true});
       });

       if(this.paramInfo.isLocked == 1)
        {
          this.Input_Form.disable();
        }
     });
   });
 this.setMaxDateTime();
}

 initFormData(genericFormData: GenericFormModel<Inspection_Form_Labour_Part_I_General>) {
   this.genericFormData = genericFormData;
   const formatDateTime = (date: Date) => {
     const year = date.getFullYear();
     const month = `${date.getMonth() + 1}`.padStart(2, '0');
     const day = `${date.getDate()}`.padStart(2, '0');
     const hours = `${date.getHours()}`.padStart(2, '0');
     const minutes = `${date.getMinutes()}`.padStart(2, '0');
     return `${year}-${month}-${day}T${hours}:${minutes}`;
   };
   const formatDate = (date: Date) => {
     const year = date.getFullYear();
     const month = `${date.getMonth() + 1}`.padStart(2, '0');
     const day = `${date.getDate()}`.padStart(2, '0');
     return `${year}-${month}-${day}`;
   };
   this.Input_Form.patchValue({
    id : genericFormData.formModel.id,
     inspectionRefId: this.inspectionRefId,
     factoryName: genericFormData.formModel.factoryName,
     factoryAddress: genericFormData.formModel.factoryAddress,
     //inspectionFactoryExistenceType: genericFormData.formModel.inspectionFactoryExistenceType,
     dateOfInspection: formatDateTime(new Date(this.genericFormData.formModel.dateOfInspection)),
     dateOfLastInspection: formatDate(new Date(this.genericFormData.formModel.dateOfLastInspection)),
     occupierName: genericFormData.formModel.occupierName,
     occupierAddress: genericFormData.formModel.occupierAddress,
     managerName: genericFormData.formModel.managerName,
     managerAddress: genericFormData.formModel.managerAddress,
     presentPersonName: genericFormData.formModel.presentPersonName,
     presentPersonAddress: genericFormData.formModel.presentPersonAddress,
   });
 }

 private formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

 setMaxDateTime(): void {
   const now = new Date();
   this.inspectionMaxDateTime = now.toISOString().slice(0, 16); // Format date as 'YYYY-MM-DDTHH:MM'
   this.inspectionMaxDate = now.toISOString().slice(0, 10); // Format date as 'YYYY-MM-DD'
 }
 saveAndNext(e){
    this.Input_Form.controls.inspectionRefId.patchValue( this.inspectionRefId);
    this.hasSubmitClicked=true;
    var inputForm = this.Input_Form.getRawValue();
    this.appHttpRequestHandlerService.httpPost(inputForm, "pbsamadhannetcoreapi.Models.Inspection_Form_Labour_Part_I_General", "Inspection", "addUpdateForm_Labour_Part_I_General")
      .subscribe((data: GenericServiceResultTemplate) => {
    });
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
}
