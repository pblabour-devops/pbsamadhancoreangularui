import { ChangeDetectorRef, Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Inspection_Form_Factory_Part_I_General, Inspection_Form_Factory_Part_III_DangerousOperation, Inspection_Form_Factory_Part_III_General } from '../../Inspections-typed-models';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { Observable, Subject } from 'rxjs';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { CommonService } from 'src/app/common/common.service';
import { GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-part-iii-dangerous-operation',
    templateUrl: './part-iii-dangerous-operation.component.html',
    styleUrls: ['./part-iii-dangerous-operation.component.css'],
    standalone: false
})
export class PartIiiDangerousOperationComponent implements OnInit {
  @Input() jsonData: any;
  private ngUnsubscribe = new Subject<void>();
  public parmamEncodedinfo:string;
  public paramInfo:any;
  public inspectionRefId :any;
  public randomizationRefId :any;
  hasSubmitClicked: boolean = false;
  
  constructor(private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    public commonOpsService: CommonOpsService,
    public common: CommonService,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute) { }
    Input_Form = this.fb.group({
      id : [0,Validators.required],
      inspectionRefId : [0, Validators.required],
      isCarryingAnyDangerousOperation : ['', Validators.required]
      
    }) as TForm<Inspection_Form_Factory_Part_III_DangerousOperation>;
  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.route.queryParams
    .subscribe(params => {
      this.parmamEncodedinfo=params.info;
      this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info)=>{
      this.paramInfo = info;
      this.inspectionRefId = this.paramInfo.inspectionRefId;
      this.randomizationRefId = this.paramInfo.randomizationRefId;

      this.appHttpRequestHandlerService.httpGet({ id: this.paramInfo.inspectionRefId}, "Inspection", "GetForm_Factory_Part_III_Dangerousoperation").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericFormModel<Inspection_Form_Factory_Part_III_DangerousOperation>) => {
        this.Input_Form.controls.isCarryingAnyDangerousOperation.patchValue(
          data.formModel.isCarryingAnyDangerousOperation );
        if(this.paramInfo.isLocked == 1)
          {
            this.Input_Form.disable();
          }
        });
      });
    });

    if(this.paramInfo.isLocked == 1)
      {
        this.Input_Form.disable();
      }
}
  // saveAndNext(e){
  //   // this.inspectionsPerformaStepersComponent.moveToNextStep();
  // }

  saveAndNext(e){
    this.hasSubmitClicked=true;
    this.Input_Form.controls.inspectionRefId.patchValue(this.paramInfo.inspectionRefId);
    if (this.Input_Form.valid) { 
        this.appHttpRequestHandlerService.httpPost(this.Input_Form.value, "pbsamadhannetcoreapi.Models.Inspection_Form_Factory_Part_III_DangerousOperation", "Inspection", "addUpdateForm_Factory_Part_III_Dangerousoperation")
          .subscribe((data: GenericServiceResultTemplate) => {
            // this.inspectionsPerformaStepersComponent.moveToNextStep();
      });
    }
  }
}
