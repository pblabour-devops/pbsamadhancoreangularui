import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import Swal from 'sweetalert2';
import { GenericFormModel, TForm } from '../../generic-implementation/generic-form-builder.type';
import { EstablishmentService } from '../establishment-service';
import { Establishment_ContractorDetail, Establishment_EmployerDetail } from '../establishment-typed-models';
import { CommonOpsService } from '../../shared/common-ops-service';
@Component({
    selector: 'app-add-update-contractor-detail',
    templateUrl: './add-update-contractor-detail.component.html',
    styleUrls: ['./add-update-contractor-detail.component.css'],
    standalone: false
})

export class AddUpdateContractorDetailComponent implements OnInit {
  genericFormData: GenericFormModel<Establishment_ContractorDetail>;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  public appFormStepsList: any[];
  detailData: any;
  public tehsilsList:any;
  //public establishmentRefId:number;
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
  Establishment_ContractorDetail_Form: TForm<Establishment_ContractorDetail> = this.fb.group({
    establishment_ContractorDetailId: [0, Validators.required],
    contractor_Name: ['', [Validators.required, Validators.maxLength(100)]],
    contractor_Address: ['', [Validators.required, Validators.maxLength(500)]],
    contractor_VillageOrTown: ['', Validators.required],
    contractor_TehsilRefId: ['', Validators.required],
    contractor_DistrictRefId: ['', Validators.required],
    contractor_PinCode: ['', [Validators.required, Validators.maxLength(6)]],

    contractor_Email: ['', [Validators.required, Validators.maxLength(50)]],
    contractor_Phone: ['', [Validators.required, Validators.maxLength(10)]],

    numberOfContractLabourToBeEmployed: ['', [Validators.required, Validators.maxLength(100)]],
    natureOfWorkContractLabour: ['', [Validators.required, Validators.maxLength(100)]],
    establishmentRefId: [0, Validators.required],

  }) as TForm<Establishment_ContractorDetail>;

  ngOnInit(): void { }
  ngAfterViewInit() {
    this.route.queryParams
      .subscribe(params => {
        this.parmamEncodedinfo=params.info;
        this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info)=>{
          this.paramInfo = info;
          if ( this.paramInfo.identityKey != 0) {
            this.Establishment_ContractorDetail_Form.patchValue({ establishmentRefId:  this.paramInfo.identityKey, establishment_ContractorDetailId: 0 });
          }
          this.getInitialData(this.paramInfo.identityKey);
        });
      });
  }

  getInitialData(id){
    this.appHttpRequestHandlerService.httpGet({ id: this.paramInfo.identityKey }, "Establishment", "getcontractordetail").pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: GenericFormModel<Establishment_ContractorDetail>) => {
      this.initFormData(data);
    });
  }
  initFormData(genericFormData: GenericFormModel<Establishment_ContractorDetail>) {
    this.genericFormData = genericFormData;
    this.detailData = genericFormData.formModel;
    this.appFormStepsList = this.genericFormData.appFormStepsList;
    if (genericFormData.formModel != null && genericFormData.formModel.establishmentRefId != 0) {
      this.Establishment_ContractorDetail_Form.patchValue(genericFormData.formModel);
    }
  }

  filterListTemplate(listTypeCode) {
    var itemsList = this.genericFormData?.listTemplateLists.filter(object => {
      return object['listTypeCode'] == listTypeCode;
      });
      if(itemsList!=undefined &&   itemsList.length>0){
        return itemsList[0].listItems;
      } 
    return null;
  }
  public getTehsilsByDistrictRefId(districtRefId, targetTehsilCtrlName){
    this.Establishment_ContractorDetail_Form.controls.contractor_TehsilRefId.patchValue('');
    if(districtRefId!=''){
      this.appHttpRequestHandlerService.httpGet({ id: districtRefId }, "CommonApis", "gettehsilsbydistrictrefid").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data) => { 
        this.tehsilsList = data; 
      });
    }
  }
  onSubmit(): void {
    this.appHttpRequestHandlerService.httpPost(this.Establishment_ContractorDetail_Form.value, "pbsamadhannetcoreapi.Models.Establishment_ContractorDetail", "Establishment", "addupdate_contractordetails").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericServiceResultTemplate) => {
        this.getInitialData(this.paramInfo.id);
        this.Establishment_ContractorDetail_Form.reset();
        this.Establishment_ContractorDetail_Form.patchValue({ establishmentRefId:  this.paramInfo.identityKey, establishment_ContractorDetailId:0 });
      });
  }

  deleteContractor(establishment_ContractorDetailId:number){  
    const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        })
        
        swalWithBootstrapButtons.fire({
            title: 'Are you sure want to delete this contractor?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Delete!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.appHttpRequestHandlerService.httpGet({ establishment_ContractorDetailId: establishment_ContractorDetailId }, "Establishment","deletecontractordetails").pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((data: GenericServiceResultTemplate)=>{
              this.getInitialData(this.paramInfo.id);
              this.Establishment_ContractorDetail_Form.reset();
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
    this.router.navigate([this.appFormStepsList.find(x=>x.stepCode=='CD').uiNextPageComponentPath],{queryParams: { info: this.parmamEncodedinfo }});
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}