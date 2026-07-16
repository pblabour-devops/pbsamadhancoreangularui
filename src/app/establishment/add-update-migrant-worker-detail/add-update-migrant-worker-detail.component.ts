import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { GenericFormModel, TForm } from '../../generic-implementation/generic-form-builder.type';
import { Establishment_MigrantWorkerDetail } from '../establishment-typed-models';
import { EstablishmentService } from '../establishment-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import Swal from 'sweetalert2';
import { CommonOpsService } from '../../shared/common-ops-service';
@Component({
    selector: 'app-add-update-migrant-worker-detail',
    templateUrl: './add-update-migrant-worker-detail.component.html',
    styleUrls: ['./add-update-migrant-worker-detail.component.css'],
    standalone: false
})
export class AddUpdateMigrantWorkerDetailComponent implements OnInit {
  genericFormData: GenericFormModel<Establishment_MigrantWorkerDetail>;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  public appFormStepsList: any[];
  public establishmentRefId:number;
  detailData: any;
  public paramInfo:any;
  public parmamEncodedinfo:string;

  constructor(private fb: UntypedFormBuilder,
    private establishmentService: EstablishmentService,
    private route: ActivatedRoute,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    public commonOpsService: CommonOpsService) { }
  //initialization of form
  Establishment_MigrantWorkerDetail_Form: TForm<Establishment_MigrantWorkerDetail> = this.fb.group({
    establishmentMigrantworkerId: [0,Validators.required],
    worker_Name: ['', [Validators.required, Validators.maxLength(100)]],
    worker_father_husband_name: ['', [Validators.required, Validators.maxLength(100)]],
    worker_permanent_address: ['', [Validators.required, Validators.maxLength(500)]],
    worker_villageortown: ['', Validators.required],
    Worker_Tehsil: ['', Validators.required],
    Worker_District: ['', Validators.required],
    Worker_State: ['', Validators.required],
    Worker_Aadhar_Number: ['', [Validators.required,Validators.maxLength(12)]],
    Worker_Mobile_Number: ['', [Validators.required,Validators.maxLength(10)]],
    establishmentRefId: [0, Validators.required],
  }) as TForm<Establishment_MigrantWorkerDetail>; 

  ngOnInit(): void {}
  ngAfterViewInit() {
    this.route.queryParams
      .subscribe(params => {
        this.parmamEncodedinfo=params.info;
        this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info)=>{
          this.paramInfo = info;
          if (this.paramInfo.identityKey != 0) {
            this.Establishment_MigrantWorkerDetail_Form.patchValue({ establishmentRefId: this.paramInfo.identityKey });
          }
          this.establishmentRefId=this.paramInfo.identityKey;
          this.getInitialData(this.paramInfo.projectSiteRefId);
        });
      });
  }
  
  getInitialData(id){
    this.appHttpRequestHandlerService.httpGet({ id: this.paramInfo.identityKey }, "Establishment", "getmigrantworkerdetail").pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: GenericFormModel<Establishment_MigrantWorkerDetail>) => {
      this.initFormData(data);
    });
  }
  initFormData(genericFormData: GenericFormModel<Establishment_MigrantWorkerDetail>){
    this.genericFormData = genericFormData;
    this.detailData = genericFormData.formModel;
    this.appFormStepsList = this.genericFormData.appFormStepsList;
    if(genericFormData.formModel!=null && genericFormData.formModel.establishmentMigrantworkerId!=0){
      this.Establishment_MigrantWorkerDetail_Form.patchValue(genericFormData.formModel);
    }
  }

  onSubmit(): void {
    this.appHttpRequestHandlerService.httpPost(this.Establishment_MigrantWorkerDetail_Form.value, "pbsamadhannetcoreapi.Models.Establishment_Migrantworker", "Establishment", "addupdate_migrantworkerdetails").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericServiceResultTemplate) => {
        this.getInitialData(this.paramInfo.projectSiteRefId);
        this.Establishment_MigrantWorkerDetail_Form.reset();
        this.Establishment_MigrantWorkerDetail_Form.patchValue({ establishmentRefId:  this.paramInfo.identityKey, establishmentMigrantworkerId:0 });
      });
  }
  deleteMigrant(establishmentMigrantworkerId:number){  
    const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        })
        
        swalWithBootstrapButtons.fire({
            title: 'Are you sure want to delete this worker?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Delete!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.appHttpRequestHandlerService.httpGet({ establishmentMigrantworkerId: establishmentMigrantworkerId }, "Establishment","deletemigrantworkerdetails").pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((data: GenericServiceResultTemplate)=>{
              this.getInitialData(this.paramInfo.id);
              this.Establishment_MigrantWorkerDetail_Form.reset();
            });
          } else if (
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Cancelled',
              'Your have cancelled the operation',
              'error'
            )
          }
        })
  } 

  nextPage(){
    this.router.navigate([this.appFormStepsList.find(x=>x.stepCode=='MW').uiNextPageComponentPath],{queryParams: { info: this.parmamEncodedinfo }});
  }
  
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
 } 
}