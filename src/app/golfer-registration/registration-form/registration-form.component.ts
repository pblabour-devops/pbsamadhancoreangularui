import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { GenericResponseTemplateModel } from 'src/app/generic-implementation/generic-service-result-template';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { IUserArchitectAdditionalInfoMapping } from 'src/app/shared/shared-typed-models';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-registration-form',
    templateUrl: './registration-form.component.html',
    styleUrls: ['./registration-form.component.css'],
    standalone: false
})
export class RegistrationFormComponent implements OnInit {
protected ngUnsubscribe: Subject<void> = new Subject<void>();
  constructor(private fb: UntypedFormBuilder,
                private appHttpRequestHandlerService: AppHttpRequestHandlerService,
                private modalService: NgbModal,
                private router: Router,
              public commonOpsService: CommonOpsService) {}

  InputForm: TForm<IUserArchitectAdditionalInfoMapping> = this.fb.group({
    id: [0],
    nameOfTheParticipants: ['', Validators.required],
    address: ['', Validators.required],
    mobileNo: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],

    areYouMemberOfChdClub: ['', Validators.required],
    membershipType: ['', Validators.required],
    membershipNumber: ['', Validators.required],

    handicap: ['', Validators.required],
    isFeePaid: ['', Validators.required],
    registrationDate: ['', Validators.required],
    signature: ['', Validators.required]
  }) as TForm<IUserArchitectAdditionalInfoMapping>;

  get formControls() {
    return this.InputForm.controls;
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if(this.InputForm.controls.areYouMemberOfChdClub.value != 'YES'){
      this.InputForm.controls.membershipType.patchValue('NA');
      this.InputForm.controls.membershipNumber.patchValue('NA');
    }

    if(this.InputForm.valid){
      this.appHttpRequestHandlerService.httpGet({mobileNo: this.InputForm.controls.mobileNo.value},"GolferRegistration","checkMobileNo").pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((data: GenericResponseTemplateModel<boolean>) => {
              if(!data.responseDataModel){
                this.appHttpRequestHandlerService.httpPost(this.InputForm.value,"pbsamadhannetcoreapi.Models.GolferRegistration","GolferRegistration","addGolferRegistrationDetails").pipe(takeUntil(this.ngUnsubscribe))
                  .subscribe((data: GenericResponseTemplateModel<string>) => {
                    this.InputForm.reset();
                  });
              }
              else{
                Swal.fire('Mobile number already exists.', 'Registration with entered mobile number is already exists...!', 'warning');
              }
            });
          }
    }
}
