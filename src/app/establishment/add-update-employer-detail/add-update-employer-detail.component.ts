import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { GenericFormModel, TForm } from '../../generic-implementation/generic-form-builder.type';
import { EstablishmentService } from '../establishment-service';
import { Establishment_EmployerDetail } from '../establishment-typed-models';
import { CommonOpsService } from '../../shared/common-ops-service';
@Component({
    selector: 'app-add-update-employer-detail',
    templateUrl: './add-update-employer-detail.component.html',
    styleUrls: ['./add-update-employer-detail.component.css'],
    standalone: false
})
export class AddUpdateEmployerDetailComponent implements OnInit {
  genericFormData: GenericFormModel<Establishment_EmployerDetail>;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  public appFormStepsList: any[];
  public tehsilsList:any;
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
  Establishment_EmployerDetails_Form: TForm<Establishment_EmployerDetail> = this.fb.group({
    establishment_EmployerDetailId: [0, Validators.required],
    employer_Name: ['', [Validators.required, Validators.maxLength(500)]],
    employer_Address: ['', Validators.required],
    employer_VillageOrTown: ['', Validators.required],
    employer_DistrictRefId: ['', Validators.required],
    employer_TehsilRefId: ['', [Validators.required]],
    employer_PinCode: ['', [Validators.required, Validators.maxLength(6)]],

    employer_Email: ['', Validators.required],
    employer_Phone: ['', Validators.required],

    maxEmployeesToBeEmployedAnyDay: ['', Validators.required],
    maxEmployeesWereEmployedAnyDay: ['', Validators.required],
    dateOfCommencementOfActivityInEstb: ['', Validators.required],

    establishmentRefId: [0, Validators.required],
  }) as TForm<Establishment_EmployerDetail>;

  ngOnInit(): void { 
   
  }
  ngAfterViewInit() {
    this.route.queryParams
    .subscribe(params => {
      this.parmamEncodedinfo=params.info;
      this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info)=>{
        this.paramInfo = info;
        if (this.paramInfo.identityKey != 0) {
          this.Establishment_EmployerDetails_Form.patchValue({ establishmentRefId: this.paramInfo.identityKey });
          this.appHttpRequestHandlerService.httpGet({ id: this.paramInfo.identityKey }, "Establishment", "getemployerdetail").pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: GenericFormModel<Establishment_EmployerDetail>) => {
            this.initFormData(data);
          });
        }
      });
    });
    //this.cdr.detectChanges();
  }
  initFormData(genericFormData: GenericFormModel<Establishment_EmployerDetail>) {
    this.genericFormData = genericFormData;
    this.appFormStepsList = this.genericFormData.appFormStepsList;
    if (genericFormData.formModel != null && genericFormData.formModel.EstablishmentRefId != 0) {
      this.Establishment_EmployerDetails_Form.patchValue(genericFormData.formModel);
      this.tehsilsList= this.filterListTemplate('Tehsils');
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
  onSubmit(): void {
    this.appHttpRequestHandlerService.httpPost(this.Establishment_EmployerDetails_Form.value, "pbsamadhannetcoreapi.Models.Establishment_EmployerDetail", "Establishment", "addupdate_employerdetails").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericServiceResultTemplate) => {
        this.router.navigate(['/establishment/addupdatecontractordetail'], { queryParams: { info: this.parmamEncodedinfo } });
    });
  }
  public getTehsilsByDistrictRefId(districtRefId, targetTehsilCtrlName){
    this.Establishment_EmployerDetails_Form.controls.employer_TehsilRefId.patchValue('');
    if(districtRefId!=''){
      this.appHttpRequestHandlerService.httpGet({ id: districtRefId }, "CommonApis", "gettehsilsbydistrictrefid").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data) => { 
        this.tehsilsList = data; 
      });
    }
  }
  btnBackClick(){
    this.router.navigate(['/establishment/addupdategeneraldetail']);
 }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
