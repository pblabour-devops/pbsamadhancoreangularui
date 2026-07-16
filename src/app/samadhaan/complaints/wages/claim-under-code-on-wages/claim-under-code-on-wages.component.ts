import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IComplaint_Claim_CodeOnWage } from '../../../samadhaan-typed-modelts';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';

@Component({
  selector: 'app-claim-under-code-on-wages',
  standalone: false,
  templateUrl: './claim-under-code-on-wages.component.html',
  styleUrl: './claim-under-code-on-wages.component.css',
})
export class ClaimUnderCodeOnWagesComponent {
  @Output() appSteps = new EventEmitter<void>();
  @Output() claimUnderCodeOnWagesDataEvent  = new EventEmitter<IComplaint_Claim_CodeOnWage>();
  @Input() claimUnderCodeOnWagesApiData:any;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();

  public appFormStepsList: any;
  public paramInfo: any;
  public parmamEncodedinfo: string;

  genericFormData: GenericFormModel<IComplaint_Claim_CodeOnWage>;

  allowanceType : any[] = [];
  placeOfWorkTypeA : any[] = [];
  placeOfWorkTypeB : any[] = [];

  applicableOptions : any
  constructor(
    private fb: UntypedFormBuilder,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    public commonOpsService: CommonOpsService
  ) {}

  Input_Form: TForm<IComplaint_Claim_CodeOnWage> = this.fb.group(
    {
      id: [0, Validators.required],
      allowanceType: ['', Validators.required],
      placeOfWorkTypeA: [''],
      placeOfWorkTypeB: [''],
      placeofWorkNameC: [''],
      projectSiteRefId : [0, Validators.required],
      applicationPurposeType : [0, Validators.required],
      iPin: [0, Validators.required],
      investPunjab_AppId: [0, Validators.required],
      projectSiteVersion: [0, Validators.required],
      toDoActivityModeType: [0, Validators.required],
      rootActivityRefId: [0, Validators.required],
      toDoActivityCategoryType: [0, Validators.required],
      appRefId : [0,Validators.required]
    },
    {
      validators: this.placeOfWorkValidator()
    }
  ) as TForm<IComplaint_Claim_CodeOnWage>;

  get formControls() {
    return this.Input_Form.controls;
  }

  onChange(control : any){
  const controls = ['placeOfWorkTypeA', 'placeOfWorkTypeB', 'placeofWorkNameC']
  const otherControls = controls.filter(c => c !== control);
  otherControls.forEach(c =>{
    this.Input_Form.get(c).patchValue('');
  })
  }

  ngOnInit(): void {
    this.Input_Form.valueChanges.subscribe(value => {
      console.log('asdf')
      this.claimUnderCodeOnWagesDataEvent.emit(value);
    });
  }

  ngOnChanges(){
    this.allowanceType = this.claimUnderCodeOnWagesApiData.enumTemplateLists.find(e => e.selectListTypeCode === 'AllowanceTypeEnum').selectListItems;
    this.placeOfWorkTypeA = this.claimUnderCodeOnWagesApiData.enumTemplateLists.find(e => e.selectListTypeCode === 'PlaceOfWorkTypeEnum').selectListItems
    this.placeOfWorkTypeB = this.claimUnderCodeOnWagesApiData.enumTemplateLists.find(e => e.selectListTypeCode === 'PlaceOfWorkTypeEnum').selectListItems
  }


  placeOfWorkValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const valueA = group.get('placeOfWorkTypeA')?.value; 
      const valueB = group.get('placeOfWorkTypeB')?.value;
      const valueC = group.get('placeofWorkNameC')?.value;

      if (valueA || valueB || valueC) {
        return null;
      }

      return { placeOfWorkRequired: true };
    };
  }    


  public isFormValid(): boolean {
    return this.Input_Form.valid;
}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
