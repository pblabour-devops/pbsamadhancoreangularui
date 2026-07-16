import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Inspection_Form_Factory_Part_III_MusterRoll } from '../../Inspections-typed-models';
import { Subject } from 'rxjs';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { CommonService } from 'src/app/common/common.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { AbstractControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GenericResponseTemplateModel, GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'app-labour-part-iii-worker-detail-mustor-roll',
    templateUrl: './labour-part-iii-worker-detail-mustor-roll.component.html',
    styleUrls: ['./labour-part-iii-worker-detail-mustor-roll.component.css'],
    standalone: false
})
export class LabourPartIIIWorkerDetailMustorRollComponent implements OnInit {

  @Input() jsonData: any;
  inspectionInputsDisabled: boolean = true;
  Input_Form: TForm<Inspection_Form_Factory_Part_III_MusterRoll>;
  private ngUnsubscribe = new Subject<void>();
  genericFormData: GenericFormModel<Inspection_Form_Factory_Part_III_MusterRoll>;
  submitted: boolean = false;
  hasSubmitClicked: boolean = false;
  inspectionRollType:number;
  totalCount: number = 0;
  totalCountError:boolean = false;
  public savedData : any;
  public parmamEncodedinfo:string;
  public paramInfo:any;
  public isLocked : any;
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
      id: [0,Validators.required],
      shiftTime_From: ['', [Validators.required, Validators.maxLength(20)]],
      shiftTime_To: ['', [Validators.required, Validators.maxLength(20)]],
      count_Adult_Male: [0, Validators.required],
      count_Adult_FeMale: [0, Validators.required],
      count_Adolescent_Male: [0, Validators.required],
      count_Adolescent_FeMale: [0, Validators.required],
      count_Children_Male: [0, Validators.required],
      count_Children_FeMale: [0, Validators.required],
      inspectionMusterRollType: [null, Validators.required],
      inspectionRefId: ['', Validators.required]
    }) as TForm<Inspection_Form_Factory_Part_III_MusterRoll>;
    //, {  validator: [this.timeValidator] }
  }
  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      this.parmamEncodedinfo=params.info;
      this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info)=>{
      this.paramInfo = info;
      this.isLocked = this.paramInfo.isLocked;
      });
    });
  }

  ngAfterViewInit() {
    this.appHttpRequestHandlerService.httpGet({ id: this.paramInfo.inspectionRefId}, "Inspection", "getForm_Labour_Part_III_MusterRoll").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericResponseTemplateModel<Inspection_Form_Factory_Part_III_MusterRoll>) => {
        this.savedData = data.responseDataModel;

        if(this.paramInfo.isLocked == 1)
          {
            this.Input_Form.disable();
          }
    });
  }

  onSubmit(roleType:number): void {
    this.submitted = true;
    this.Input_Form.controls.inspectionRefId.patchValue(this.paramInfo.inspectionRefId);
    this.Input_Form.controls.inspectionMusterRollType.patchValue(roleType);
    this.calculateTotalCount(this.Input_Form.value);
    if (this.Input_Form.valid && this.totalCount) {
      this.appHttpRequestHandlerService.httpPost(this.Input_Form.value, "pbsamadhannetcoreapi.Models.Inspection_Form_Labour_Part_III_MusterRoll", "Inspection", "addUpdateForm_Labour_Part_III_MusterRoll")
        .subscribe((data: GenericServiceResultTemplate) => {
          //this.Input_Form.reset();
          this.setValueOfInputField();
          this.closeInspectionModal();
          this.ngAfterViewInit();
        });
    }
  }

  calculateTotalCount(values): void {
    this.totalCount =0;
    this.totalCount = values.count_Adolescent_FeMale +
                      values.count_Adolescent_Male +
                      values.count_Adult_FeMale +
                      values.count_Adult_Male +
                      values.count_Children_FeMale +
                      values.count_Children_Male;
    if(this.totalCount == 0)
      {
        this.totalCountError = true
      }
      else{
        this.totalCountError = false
      }
  }

  checkInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (!inputElement.value || inputElement.value.trim() === '' || inputElement.value === '-') {
      inputElement.value = '0';
      this.Input_Form.get(inputElement.getAttribute('formControlName')!)?.setValue(0);
    } else if (inputElement.value.startsWith('-')) {
      inputElement.value = '0' + inputElement.value.substring(1);
      this.Input_Form.get(inputElement.getAttribute('formControlName')!)?.setValue(0);
    }
  }

  setValueOfInputField()
  {
    this.Input_Form.controls.count_Adult_Male.patchValue(0);
    this.Input_Form.controls.count_Adult_FeMale.patchValue(0);
    this.Input_Form.controls.count_Adolescent_Male.patchValue(0);
    this.Input_Form.controls.count_Adolescent_FeMale.patchValue(0);
    this.Input_Form.controls.count_Children_Male.patchValue(0);
    this.Input_Form.controls.count_Children_FeMale.patchValue(0);
  }

  openInspectionModal(content) {
    this.closeInspectionModal();
    this.modalService.open(content, { scrollable: true });
  }

  closeInspectionModal() {
    this.modalService.dismissAll();
  }

  timeValidator(group: AbstractControl): { [key: string]: boolean } | null {
    const from = group.get('shiftTime_From').value;
    const to = group.get('shiftTime_To').value;

    if (from && to && from >= to) {
      return { 'timeError': true };
    }
    return null;
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  saveAndNext(e){
      }
  removeMustorRoleDetails(id)
  {
    this.appHttpRequestHandlerService.httpGet({ id: id}, "Inspection", "RemoveForm_Labour_Part_III_MusterRoll").pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: GenericResponseTemplateModel<Inspection_Form_Factory_Part_III_MusterRoll>) => {
      this.savedData = data.responseDataModel;
      this.ngAfterViewInit();
  });
  }

}
