import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericFormModel, TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { BusinessEntity } from '../business-entity-typed-models';
import { BusinessEntityService } from '../business-entity.service';

@Component({
    selector: 'app-business-entity-form',
    templateUrl: './business-entity-form.component.html',
    styleUrls: ['./business-entity-form.component.css'],
    standalone: false
})
export class BusinessEntityFormComponent implements OnInit {
  genericFormData: GenericFormModel<BusinessEntity>;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
 
  
  constructor(private fb: UntypedFormBuilder,
    private businessEntityService: BusinessEntityService,
    private route: ActivatedRoute,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private cdr: ChangeDetectorRef,
    private router: Router) { }

    //initialization of form
    BusinessEntity_Form: TForm<BusinessEntity> = this.fb.group({
      businessEntityId: [0,Validators.required],
      businessEntityName: ['', [Validators.required, Validators.maxLength(100)]],
      contactPersonFirstName: ['', Validators.required],
      contactPersonMiddleName: ['', Validators.required],
      contactPersonLastName: ['', Validators.required],
      mobileNo: ['', [Validators.required,Validators.maxLength(10)]],
      email: ['', Validators.required],
      userid: ['1', Validators.required]

    }) as TForm<BusinessEntity>;

    ngOnInit(): void {}
    ngAfterViewInit(){
      this.route.queryParams
      .subscribe(params => {
        this.appHttpRequestHandlerService.httpGet({id:params.id}, "BusinessEntity", "getbusinessentity").pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data: GenericFormModel<BusinessEntity>)=>{this.initFormData(data)}
        );
      });
    }
    
    initFormData(genericFormData: GenericFormModel<BusinessEntity>){
      this.genericFormData = genericFormData;
      if(genericFormData.formModel!=null && genericFormData.formModel.businessEntityId!=0){
        this.BusinessEntity_Form.patchValue(genericFormData.formModel);
      }
    }
  
    onSubmit(): void {
      this.appHttpRequestHandlerService.httpPost(this.BusinessEntity_Form.value,"", "BusinessEntity","addupdate_businessentitydetails").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericServiceResultTemplate)=>{
      });
    }
    
    ngOnDestroy() {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
   } 
  }