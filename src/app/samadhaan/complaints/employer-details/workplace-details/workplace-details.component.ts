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
    pinCode: ['', [Validators.required, Validators.maxLength(10)]],

    // NotMapped — application context fields
    projectSiteRefId: [0, Validators.required],
    applicationPurposeType: [1, Validators.required],
    applicationType: [101, Validators.required],
    iPin: [0, Validators.required],
    investPunjab_AppId: [0, Validators.required],
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

        // this.appHttpRequestHandlerService
        //   .httpGet({ id: this.paramInfo?.appRefId }, 'Complaint', 'getComplaintWorkplaceDetail')
        //   .pipe(takeUntil(this.ngUnsubscribe))
        //   .subscribe((data: GenericFormModel<IComplaint_WorkplaceDetail>) => {
        //     this.genericFormData = data;
        //     this.appFormStepsList = data.appFormStepsList;

        //     if (data.formModel) {
        //       this.Input_Form.patchValue(data.formModel);
        //     }
        //   });
      });
    });

    this.appHttpRequestHandlerService
      .httpGet(null, 'CommonApis', 'getalldistrict')
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericFormModel<ProjectSite>) => {
        this.allDistricts = data.formModel as any;
      });
  }


  resetForm() {
    this.Input_Form.reset();
    this.Input_Form.patchValue({ id: 0, appRefId: this.paramInfo?.appRefId });
  }

  onSaveDraft(): void {
    console.log('Saved as Draft:', this.Input_Form.value);
    // Call save-draft API service here
  }

  onBack(): void {
    console.log('Navigate back to previous tab');
  }

  onSubmit(): void {
    if (this.Input_Form.invalid) {
      this.Input_Form.markAllAsTouched();
      return;
    }

    const payload = {
      ...this.Input_Form.value,
      projectSiteRefId: this.paramInfo?.projectSiteRefId,
      applicationPurposeType: this.paramInfo?.applicationPurposeType,
      iPin: this.paramInfo?.iPin,
      investPunjab_AppId: this.paramInfo?.investPunjab_AppId,
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
                  projectSiteRefId: this.paramInfo?.projectSiteRefId,
                  applicationPurposeType: this.paramInfo?.applicationPurposeType,
                  investPunjab_AppId: this.paramInfo?.investPunjab_AppId,
                  iPin: this.paramInfo?.iPin,
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
  }
