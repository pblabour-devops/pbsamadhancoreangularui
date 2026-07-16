import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, FormGroup, Validators } from '@angular/forms';
import {Inspection_Form_Labour_Part_II_FactoryDetail} from '../../Inspections-typed-models';
import { Subject } from 'rxjs';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { CommonService } from 'src/app/common/common.service';
import { takeUntil } from 'rxjs/operators';
import { GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'app-labour-part-ii-factory-detail',
    templateUrl: './labour-part-ii-factory-detail.component.html',
    styleUrls: ['./labour-part-ii-factory-detail.component.css'],
    standalone: false
})
export class LabourPartIIFactoryDetailComponent implements OnInit {

  @Input() jsonData: any;
  private ngUnsubscribe = new Subject<void>();
  genericFormData: GenericFormModel<Inspection_Form_Labour_Part_II_FactoryDetail>;
  submitted: boolean = false;
  hasSubmitClicked: boolean = false;
  inspectionMaxDateTime: string;
  inspectionMaxDate: string;
  public parmamEncodedinfo:string;
  public paramInfo:any;
  characterCounts: { [key: string]: number } = {};
  controlMaxLengthNames: { [key: string]: number } = {};
   Input_Form = this.fb.group({
    id: [0,Validators.required],
    license_Factory_Act: ['', [Validators.required, Validators.maxLength(30)]],
    registration_PE_Act: ['', [Validators.required, Validators.maxLength(30)]],
    license_CL_Act: ['', [Validators.required, Validators.maxLength(30)]],
    registration_ISMW_Act: ['', [Validators.required, Validators.maxLength(30)]],
    license_ISMW_Act: ['', [Validators.required, Validators.maxLength(30)]],
    inspectionRefId: [0, [Validators.maxLength(10)]]
  }) as TForm<Inspection_Form_Labour_Part_II_FactoryDetail>;
    get formControls() { return this.Input_Form.controls; }
    constructor(
      private appHttpRequestHandlerService: AppHttpRequestHandlerService,
      public commonOpsService: CommonOpsService,
      public common: CommonService,
      private fb: UntypedFormBuilder,
      private route: ActivatedRoute,
      private router: Router
    ) {
    }
  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    this.route.queryParams
    .subscribe(params => {
      this.parmamEncodedinfo=params.info;
      this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info)=>{
      this.paramInfo = info;
      this.appHttpRequestHandlerService.httpGet({ id: this.paramInfo.inspectionRefId}, "Inspection", "getForm_Labour_Part_II_FactoryDetail").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericFormModel<Inspection_Form_Labour_Part_II_FactoryDetail>) => {
        this.Input_Form.patchValue(data.formModel);
        this.Input_Form.controls.license_Factory_Act.patchValue(this.paramInfo.licenceNumber);
        this.updateCharacterCountsForTextareaControls();

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
    this.Input_Form.controls.inspectionRefId.patchValue(this.paramInfo.inspectionRefId);
    if (this.Input_Form.valid) {
      this.appHttpRequestHandlerService.httpPost(this.Input_Form.value, "pbsamadhannetcoreapi.Models.Inspection_Form_Labour_Part_II_FactoryDetail", "Inspection", "addUpdateForm_Labour_Part_II_FactoryDetail")
        .subscribe((data: GenericServiceResultTemplate) => {
          });
    }
  }

  updateCharacterCount(controlName: string, maxLength: number): void {
    const control = this.Input_Form.get(controlName);
    if (control) {
      const value = control.value || '';
      this.characterCounts[controlName] = value.length;
      this.controlMaxLengthNames[controlName] = maxLength;
    }
  }

  hasExceededMaxLength(controlName: string): boolean {
    return this.characterCounts[controlName] >= this.controlMaxLengthNames[controlName];
  }

  // navigatePage(urlStr: string,id:any): void{
  //   var encryptedParms=this.commonOpsService.encodeQueryParamsInBase64({inspectionRefId:id});
  //   console.log(urlStr,'URL')
  //   this.router.navigate(['/inspection/' + urlStr], { queryParams: {info: encryptedParms}});
  // }

  getCharacterCount(controlName: string): number {
    return this.characterCounts[controlName] ?? 0;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private updateCharacterCountsForTextareaControls(): void {
    Object.keys(this.Input_Form.controls).forEach(controlName => {
      const control = this.Input_Form.get(controlName);
      if (control && control instanceof UntypedFormControl && control.value && typeof control.value === 'string') {
        if (control.value.trim() !== '') {
          this.updateCharacterCount(controlName, 1000);
        }
      }
    });
  }

  isMinLength(controlName: string): boolean {
    return this.Input_Form.get(controlName).value.length < 5;
  }

}
