import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonService } from 'src/app/common/common.service';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import Swal from 'sweetalert2';
import { ProjectSite, ProjectSites } from '../project-site-typed-module';
import { ProjectSiteService } from '../project-site.service';

@Component({
    selector: 'app-project-site-form',
    templateUrl: './project-site-form.component.html',
    styleUrls: ['./project-site-form.component.css'],
    standalone: false
})
export class ProjectSiteFormComponent implements OnInit {
  genericFormData: GenericFormModel<ProjectSite>;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  circleOptions: any;
  districtRefId: 0;
  allDistricts:any=[];
  allTehsil:any=[];
  constructor(private fb: UntypedFormBuilder,
    private businessEntityService: ProjectSiteService,
    private route: ActivatedRoute,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private common:CommonService,
    public commonOpsService: CommonOpsService) { }
     //initialization of form
     ProjectSite_Form: TForm<ProjectSites> = this.fb.group({
      projectSiteId: [0,Validators.required],
      establishmentName: ['', [Validators.required, Validators.maxLength(100)]],
      address: ['', Validators.required],
      tehsilRefId: ['', Validators.required],
      districtRefId: ['', [Validators.required]],
      pinCode: ['', [Validators.required,Validators.maxLength(6)]],
      factoryCircleRefId : ['1000', Validators.required],
      labourCircleRefId : ['10000', Validators.required],
      UserRefId:[0, Validators.required],
      villageOrTown:['', Validators.required],
      alcCircleRefId : ['0', Validators.required],
      contactPersonFirstName:['', Validators.required],
      contactPersonMiddleName:[''],
      contactPersonLastName:['', Validators.required],
      contactPersonMobileNo:['', Validators.required],
      contactPersonEmail:['', Validators.required],
      projectSiteVersion:['1', Validators.required],
      projectPurpose:['', Validators.required],
      alternateEmail:['', Validators.required],
      alternateMobileNo:['', Validators.required],
     
    }) as TForm<ProjectSites>;

    ngOnInit(): void {}
    ngAfterViewInit(){
      // Get District Details
      this.route.queryParams
      .subscribe(params => {
        this.appHttpRequestHandlerService.httpGet(null, "CommonApis", "getalldistrict").pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: GenericFormModel<ProjectSite>) => { this.allDistricts=data.formModel
           }
          );
      });
    }
    public getTehsilsByDistrictRefId(districtRefId, targetTehsilCtrlName){
        this.districtRefId = districtRefId;
        this.ProjectSite_Form.controls.factoryCircleRefId.patchValue('10000');
        this.ProjectSite_Form.controls.labourCircleRefId.patchValue('10000');
        this.appHttpRequestHandlerService.httpGet({ id: districtRefId }, "CommonApis", "gettehsilsbydistrictrefid").pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data) => { this.allTehsil= data;
        }
      );
    }

    initFormData(genericFormData: GenericFormModel<ProjectSite>){
      this.genericFormData = genericFormData;
      if(genericFormData.formModel!=null && genericFormData.formModel.projectSiteId!=0){
        this.ProjectSite_Form.patchValue(genericFormData.formModel);
      }
    }
  
    onSubmit(): void {
      this.ProjectSite_Form.controls.alternateMobileNo.patchValue(this.ProjectSite_Form.controls.contactPersonMobileNo.value);
      this.ProjectSite_Form.controls.alternateEmail.patchValue(this.ProjectSite_Form.controls.contactPersonEmail.value);
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, create a new project site!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.appHttpRequestHandlerService.httpPost(this.ProjectSite_Form.value, "pbsamadhannetcoreapi.Models.ProjectSite", "ProjectSite","addupdate_projectsitedetails").pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: GenericServiceResultTemplate)=>{
            this.router.navigate(['/project/sites']);
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
    CancelButtonClick(){
      this.router.navigate(['/project/sites']);
   }
    ngOnDestroy() {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
   } 
   onCircleOptionChange(circleData: any){
    this.ProjectSite_Form.controls.alcCircleRefId.patchValue(circleData.alcCircleId);
    }
    onLabourCircleOptionChange(circleData: any){
      this.ProjectSite_Form.controls.labourCircleRefId.patchValue(circleData.labourCircleId);
    }
  }