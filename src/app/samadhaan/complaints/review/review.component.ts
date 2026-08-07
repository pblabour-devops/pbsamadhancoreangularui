import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppFormStepsInfo, GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { applicationTypeEnum } from 'src/app/shared.data';
import { IComplaint_Review_GeneralDetail } from '../../samadhaan-typed-modelts';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-review',
  standalone: false,
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
})
export class ReviewComponent {
  public orderOptions : any[] =[]
  public appFormStepsList : AppFormStepsInfo[] = []
  public parmamEncodedinfo:string;
  public appRefId : any;
  public projectSiteVersion : number;
  public isEditAllowed : boolean;
  public paramInfo:any;
  ngUnsubscribe = new Subject<void>();
  
  constructor(private fb: FormBuilder, private route : ActivatedRoute, private commonOpsService : CommonOpsService, private appHttpRequestHandlerService : AppHttpRequestHandlerService, private cdr : ChangeDetectorRef) {} 

   ngAfterViewInit() {
    this.route.queryParams.subscribe(params => {
        this.parmamEncodedinfo=params.info;
        this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info)=>{

        this.paramInfo = info;
        console.log('paraminof', this.paramInfo);
        this.appRefId = this.paramInfo.appRefId;
        this.projectSiteVersion = this.paramInfo.projectSiteVersion;
        this.Input_Form.controls.appRefId.patchValue(this.paramInfo?.appRefId);
        this.Input_Form.controls.applicationType.patchValue(this.paramInfo?.applicationType);
        this.appHttpRequestHandlerService.httpGet({ id: this.paramInfo?.appRefId }, "Complaints", "getReviewofDismissalDetail").pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: GenericFormModel<IComplaint_Review_GeneralDetail>) => { 
            this.appFormStepsList = data.appFormStepsList
            this.initFormData(data)
            this.isEditAllowed = data.isEditAllowed;
          });
        });
      });
    }

      initFormData(genericFormData: GenericFormModel<IComplaint_Review_GeneralDetail>) {
        if(genericFormData.formModel){
          const formData = { ...genericFormData.formModel };
         Object.keys(formData).forEach(key => {
            if (formData[key] && typeof formData[key] === 'string' && formData[key].includes('T')) {
              formData[key] = formData[key].split('T')[0];
            }
          });
          this.Input_Form.patchValue(formData);
          this.Input_Form.controls.toDoActivityModeType.patchValue(2);
        }
    
          this.cdr.detectChanges();
        }
    

  Input_Form : TForm<IComplaint_Review_GeneralDetail> = this.fb.group({
      id : [0, Validators.required],
      orderNumber : [0, Validators.required],
      orderDate : ['', Validators.required],
      remarks : ['', Validators.required],
      appRefId: [0, Validators.required],
      applicationType: [applicationTypeEnum.SAMADHAN_COMPLAINTS, Validators.required],
      applicationPurposeType: [0, Validators.required],
      projectSiteVersion: [1, Validators.required],
      toDoActivityModeType: [1, Validators.required],
      rootActivityRefId: ['defaultValue', Validators.required],
      toDoActivityCategoryType: [1017, Validators.required]
      })as TForm<IComplaint_Review_GeneralDetail>;

      onSubmit(){

      }

        ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
