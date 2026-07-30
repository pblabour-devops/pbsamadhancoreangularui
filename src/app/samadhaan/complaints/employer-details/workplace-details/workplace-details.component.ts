  import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { ProjectSite } from 'src/app/project-site/project-site-typed-module';
import { IComplaint_WorkplaceDetail } from 'src/app/samadhaan/samadhaan-typed-modelts';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import Swal from 'sweetalert2';

  @Component({
    selector: 'app-workplace-details',
    standalone: false,
    templateUrl: './workplace-details.component.html',
    styleUrl: './workplace-details.component.css',
  })
  export class WorkplaceDetailsComponent {
  @Output() workPlaceDataEvent= new EventEmitter<any>();
  protected ngUnsubscribe: Subject<void> = new Subject<void>();

  allDistricts: any[] = [];
  allPinCodes: any[] = [];

  public appFormStepsList: any[] = [];
  public paramInfo: any;
  public parmamEncodedinfo: string;

  genericFormData: GenericFormModel<IComplaint_WorkplaceDetail>;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private router: Router,
    public commonOpsService: CommonOpsService
  ) {}

  Input_Form: TForm<IComplaint_WorkplaceDetail> = this.fb.group({
    id: [0, Validators.required],
    appRefId: [0, Validators.required],

    workplaceAddress: ['', [Validators.required, Validators.maxLength(500)]],
    state: ['', Validators.required],
    districtRefId: ['', Validators.required],
    pinCode: ['', [Validators.required, Validators.maxLength(6)]],

    // NotMapped — application context fields
    applicationPurposeType: [1, Validators.required],
    applicationType: [101, Validators.required],
    factoryCircleRefId: [1, Validators.required],
    projectSiteVersion: [0, Validators.required],
    toDoActivityModeType: [1, Validators.required],
    toDoActivityCategoryType: [1017, Validators.required],
    rootActivityRefId: ['defaultValue', Validators.required],
  }) as TForm<IComplaint_WorkplaceDetail>;

  get formControls() {
    return this.Input_Form.controls;
  }

  ngOnInit(): void {
      this.Input_Form.valueChanges.subscribe(value => {
      this.workPlaceDataEvent.emit(value);
    });
  }

  ngAfterViewInit() {
    this.route.queryParams.subscribe((params) => {
      this.parmamEncodedinfo = params.info;

      this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info) => {
        this.paramInfo = info;
        this.Input_Form.controls.appRefId.patchValue(this.paramInfo?.appRefId);

        this.appHttpRequestHandlerService
          .httpGet({ id: this.paramInfo?.appRefId }, 'Complaints', 'getComplaintWorkplaceDetail')
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: GenericFormModel<IComplaint_WorkplaceDetail>) => {
            this.genericFormData = data;
            this.appFormStepsList = data.appFormStepsList;

            if (data.formModel) {
                 const formData = data.formModel;
                Object.keys(formData).forEach(key => {
                  if (
                    formData[key] &&
                    typeof formData[key] === 'string' &&
                    formData[key].includes('T')
                  ) {
                    formData[key] = formData[key].split('T')[0];
                  }
                });

                this.Input_Form.patchValue(formData);
                this.Input_Form.patchValue({ toDoActivityModeType: 2});
                this.Input_Form.patchValue({rootActivityRefId : 'defaultValue'});
            }
          });
      });
    });

    this.getDistricts();
  }

  
  getDistricts(): void {
  this.appHttpRequestHandlerService.httpGet(null, "CommonApis", "getalldistrict")
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: GenericFormModel<any>) => {
      this.allDistricts = data.formModel.filter(
        district => district.stateRefId === 3
      );
    });
}


  resetForm() {
    this.Input_Form.reset();
    this.Input_Form.patchValue({ id: 0, appRefId: this.paramInfo?.appRefId });
  }

  onSaveDraft(): void {
// Call save-draft API service here
  }

  onBack(): void {
}

  onSubmit(): void {
    if (this.Input_Form.invalid) {
      this.Input_Form.markAllAsTouched();
      return;
    }

    const payload = {
      ...this.Input_Form.value,
      applicationPurposeType: this.paramInfo?.applicationPurposeType,
      projectSiteVersion: this.paramInfo?.projectSiteVersion,
      factoryCircleRefId: 1,
      toDoActivityModeType: 1,
      rootActivityRefId: 'defaultValue',
      toDoActivityCategoryType: 1017,
    };

    this.appHttpRequestHandlerService
      .httpPost(
        payload,
        'pbsamadhannetcoreapi.Models.Complaint_WorkplaceDetail',
        'Crud',
        'CreateUpdate'
      )
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Workplace Details Saved Successfully!',
            timer: 1500,
            showConfirmButton: false,
          });

          this.router.navigate(
            [this.appFormStepsList.find((x) => x.stepCode == 'WRK')?.uiNextPageComponentPath],
            {
              queryParams: {
                info: this.commonOpsService.encodeQueryParamsInBase64({
                  appRefId: this.paramInfo?.appRefId,
                  applicationType: 101,
                  applicationPurposeType: this.paramInfo?.applicationPurposeType,
                  projectSiteVersion: this.paramInfo?.projectSiteVersion,
                }),
              },
            }
          );
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error saving workplace details',
          });
        },
      });
  }

   public isFormValid(): boolean {
    return this.Input_Form.valid;
  }
  
  }
