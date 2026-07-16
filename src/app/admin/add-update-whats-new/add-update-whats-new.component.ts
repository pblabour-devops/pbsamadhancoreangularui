import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { IWhatsNewInPortal } from 'src/app/dashboard/dashboard-typed-models';
import { TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-add-update-whats-new',
    templateUrl: './add-update-whats-new.component.html',
    styleUrls: ['./add-update-whats-new.component.css'],
    standalone: false
})
export class AddUpdateWhatsNewComponent implements OnInit {
  addUpdateForm: UntypedFormGroup;
  public allRoles: any[] = [];
    selectedRoles: number[] = [];
  private ngUnsubscribe = new Subject<void>();
  constructor(
    private fb: UntypedFormBuilder,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService
  ) {}

  Input_Form: TForm<IWhatsNewInPortal> = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      modifiedDate: ['', Validators.required],
      expiryDate: ['', Validators.required],
      usageType: ['', Validators.required],
      role: ['', Validators.required],
    }) as TForm<IWhatsNewInPortal>;
    get formControls() { return this.Input_Form.controls; }

  ngOnInit() {
    this.appHttpRequestHandlerService.httpGet({}, 'Auth', 'getAllOfficialRoles').pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: any) => {
        console.log(data);
        this.allRoles = data.responseDataModel;
      });

  }
  onSubmit(): void {
    
    if (!this.Input_Form.invalid){

      const formValue = { ...this.Input_Form.value };

    if (Array.isArray(formValue.role)) {
      formValue.role = formValue.role.join(',');
    }
    console.log(formValue,'daaaaa');
       this.appHttpRequestHandlerService.httpPost(formValue,'pbsamadhannetcoreapi.Models.WhatsNewInPortal','CommonApis','addUpdateWhatsNewInPortalDetails').pipe(takeUntil(this.ngUnsubscribe))
        .subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'Notification information has been updated..!',
              confirmButtonColor: '#3085d6'
            });
            this.addUpdateForm.reset();
          },
          error: err => {
            console.error('Failed to add notification', err);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Failed to add notification. Please try again.',
              confirmButtonColor: '#d33'
            });
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }



onRoleChange(event: any, roleId: number) {
  if (event.target.checked) {
    this.selectedRoles.push(roleId);
  } else {
    this.selectedRoles = this.selectedRoles.filter(id => id !== roleId);
  }

  this.Input_Form.get('role')?.setValue(this.selectedRoles);
}

storeSelectedRoleNames(): void {
  const selectedNames = this.allRoles
    .filter(role => this.selectedRoles.includes(role.id))
    .map(role => role.name);

  // Set the 'role' form control value to the names array
  this.Input_Form.get('role')?.setValue(selectedNames);

  // Optionally, you can join names as a comma-separated string if needed
  // this.Input_Form.get('role')?.setValue(selectedNames.join(','));
}
selectedRolesNames(): string {
  return this.allRoles
             .filter(role => this.selectedRoles.includes(role.id))
             .map(role => role.name)
             .join(', ');
}
}
