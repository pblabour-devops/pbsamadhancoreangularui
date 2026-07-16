import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PasswordResetModel, IOfficerTransferDetails } from 'src/app/dashboard/dashboard-typed-models';
import { TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-manage-users',
    templateUrl: './manage-users.component.html',
    styleUrls: ['./manage-users.component.css'],
    standalone: false
})
export class ManageUsersComponent implements OnInit {
protected ngUnsubscribe: Subject<void> = new Subject<void>();
selectedFile: File | null = null;
base64_String : any;
 error_messages = {
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ],
  };
  public roles = [
    { code: 'LBIN', description: 'Labour Inspactor' },
    { code: 'ADRF', description: 'Assistant Director of Factories' },
    { code: 'DDRF', description: 'Deputy Director of Factories' },
    { code: 'DLHF', description: 'Dealing Hand Factory' },
    { code: 'ALLC', description: 'Assistance Labour Commissioner' },
    { code: 'DLHL', description: 'Dealing Hand Labour' },
    { code: 'DLHL', description: 'Dealing Hand Labour' },
    { code: 'BWDH', description: 'BOCW Dealing Hand' },
    { code: 'BACO', description: 'BOCW ACO' }
   ,{ code: 'INDL', description: 'Industry Users' }
  ];

  departmentOfficialDetails: any[] = [];
  departmentOfficialList: any[] = [];
  filteredData: any[] = [];
  displayedData: any[] = [];

  selectedRole = '';
  searchTerm = '';

  pageSize = 10;
  currentPage = 1;
  totalPages = 0;
  selectedUser: any = {};
  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  serialNumber = (this.currentPage - 1) * this.pageSize + 1;

  submitted:boolean=false;
  currentOfficial: any;
  selectedOfficial: any;

  constructor(private fb: UntypedFormBuilder,private appHttpRequestHandlerService: AppHttpRequestHandlerService,private modalService: NgbModal) {}

   InputFormPassword: TForm<PasswordResetModel> = this.fb.group({
        username: ['', Validators.required],
        password: new UntypedFormControl('', Validators.compose([Validators.minLength(8),Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9!@#$&()]+$')])),
        cofrmPassword: ['', [Validators.required]],
      },
      {
        validators: this.passwordMatchValidator
      }) as TForm<PasswordResetModel>;

   InputForm: TForm<IOfficerTransferDetails> = this.fb.group({
        username: ['', Validators.required],
        currentProfileId : ['', Validators.required],
        currentofficerName : ['', Validators.required],
        currentofficerMobileNo: ['', [Validators.required]],
        tranferofficerProfileId: ['', [Validators.required]],
        transferofficerName: ['', [Validators.required]],
        transferofficerMobileNo: ['', [Validators.required]],
        trasnferDate: ['', Validators.required],
        role: ['', Validators.required],
        remarks : ['', [Validators.required]],
        base64: ['', Validators.required],
      }) as TForm<IOfficerTransferDetails>;
      get formControls() { return this.InputForm.controls; }

  ngOnInit(): void {}

  getUserDetails(role: string, username : string) {
    this.appHttpRequestHandlerService
      .httpGet({ roleName: role, username : username }, 'Auth', 'userInfo2050').pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: any) => {
        this.departmentOfficialDetails = data.listData || [];
        this.applyFilters();
      });
  }

 passwordMatchValidator(group: UntypedFormGroup) {
    const pass = group.get('password').value;
    const confirmPass = group.get('cofrmPassword').value;
    return pass === confirmPass ? null : { notSame: true };
  }

  onRoleChange(role: string) {
    this.selectedRole = role;
    if (role) {
      this.getUserDetails(role, null);
    } else {
      this.departmentOfficialDetails = [];
      this.applyFilters();
    }
  }

  onSearchButtonClick(username: string) {
    this.selectedRole = username;
    if (username) {
      this.getUserDetails(null,username);
    } else {
      this.departmentOfficialDetails = [];
      this.applyFilters();
    }
  }

  onSearchChange() {
    this.applyFilters();
  }

  applyFilters() {
    let data = [...this.departmentOfficialDetails];
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      data = data.filter(item =>
        (item.username?.toLowerCase().includes(term) || item.userProfileName?.toLowerCase().includes(term) || item.contactNo?.toLowerCase().includes(term))
      );
    }

    // Sort
    if (this.sortColumn) {
      data.sort((a, b) => {
        const aVal = (a[this.sortColumn] || '').toString().toLowerCase();
        const bVal = (b[this.sortColumn] || '').toString().toLowerCase();

        if (aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    this.filteredData = data;
    this.totalPages = Math.ceil(this.filteredData.length / this.pageSize);
    this.currentPage = 1;
    this.updateDisplayedData();
  }

  updateDisplayedData() {
    const start = (this.currentPage - 1) * this.pageSize;
    this.displayedData = this.filteredData.slice(start, start + this.pageSize);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updateDisplayedData();
  }

  sortBy(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applyFilters();
}

onTransferClick(transferContent, item : any) {
  this.getOfficerList(this.selectedRole);
  this.currentOfficial = item;
  this.InputForm.patchValue({
    username: this.currentOfficial.username,
    currentProfileId : this.currentOfficial.userProfileId,
    currentofficerName : this.currentOfficial.userProfileName,
    currentofficerMobileNo : this.currentOfficial.contactNo
  })
  this.modalService.open(transferContent, { scrollable: true });
}


getOfficerList(role: string) {
    this.appHttpRequestHandlerService
      .httpGet({ roleName: role }, 'Admin', 'getDepartmentOfficialList').pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: any) => {
        this.departmentOfficialList = data.listData || [];
      });
  }
openScrollableContent(longContent) {
  this.modalService.open(longContent, { scrollable: true });
}

onSubmitEmployeeData() : void {
  alert('Add Form Is Opening')
    this.modalService.dismissAll();
  }

onOfficialChange(event: any) {
  const selectedId = event.target.value;
  this.selectedOfficial = this.departmentOfficialList.find(
    o => o.userProfileId == selectedId
  );
   this.InputForm.patchValue({
    tranferofficerProfileId: this.selectedOfficial.userProfileId,
    transferofficerName : this.selectedOfficial.officerName,
    transferofficerMobileNo : this.selectedOfficial.mobileNo,
  })
}


ngOnDestroy() {
  this.ngUnsubscribe.next();
  this.ngUnsubscribe.complete();
}

onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

onTransferOfficialClick(): void {
 Swal.fire({
      title: 'Are you sure want to Officer Profile Transfer?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Transfer!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        debugger
        if (this.selectedFile) {
          const formData = new FormData();
          formData.append('file', this.selectedFile);
          const reader = new FileReader();
          reader.readAsDataURL(this.selectedFile);
          reader.onload = () => {
              const base64String = reader.result as string;
              this.base64_String = base64String.replace(/^data:application\/pdf;base64,/, '');   
              this.InputForm.controls.base64.patchValue(this.base64_String);
              this.InputForm.controls.trasnferDate.patchValue(new Date());
              this.InputForm.controls.role.patchValue(this.selectedRole);
              debugger;
                  if (this.InputForm.valid && this.selectedFile) {
                  this.appHttpRequestHandlerService.httpPost(this.InputForm.value,"pbsamadhannetcoreapi.ViewModels.UpdateOfficerTransferViewModel", "Admin", "officerTransfer")
                      .pipe(takeUntil(this.ngUnsubscribe))
                      .subscribe((data: GenericServiceResultTemplate) => {
                          Swal.fire('Officer Transfered!', 'Your changes have been submitted.', 'success');
                          this.modalService.dismissAll();
                           window.location.reload(); 
                      }, error => {
                          console.error('Error submitting form:', error);
                      });
                    }          
          };
      
          reader.onerror = function (error) {
          };
          
          reader.readAsDataURL(this.selectedFile);
      }
      window.location.reload(); 
      }  
    });
  
  }


  // onResetPasswordClick(passwordContent, item : any) {
  // this.InputFormPassword.controls.username.patchValue(item.username);
  // this.modalService.open(passwordContent, { scrollable: true ,  size: 'lg' });
  // }

  onPasswordFocusOut(){
      // if(this.InputFormPassword.controls.password.value.trim().length>0){
      // this.InputFormPassword.controls.password.patchValue(shajs('sha256').update(Md5.hashStr(this.InputFormPassword.controls.password.value)).digest('hex'));
      // }
      // if(this.InputFormPassword.controls.cofrmPassword.value.trim().length>0){
      // this.InputFormPassword.controls.cofrmPassword.patchValue(shajs('sha256').update(Md5.hashStr(this.InputFormPassword.controls.cofrmPassword.value)).digest('hex'));
      // }
  }
   onSubmit() {
    if (this.InputFormPassword.invalid) {
      this.InputFormPassword.get('password').markAsTouched();
      return;
    }
   
   if (this.InputFormPassword.valid) {
    this.onPasswordFocusOut();
    const param ={
      username : this.InputFormPassword.controls.username.value,
      password : this.InputFormPassword.controls.password.value
    }
    // this.appHttpRequestHandlerService.httpPost(param,"pbsamadhannetcoreapi.ViewModels.ResetPasswordViewModel", "Admin", "resetPasswordbyAdmin")
    //     .pipe(takeUntil(this.ngUnsubscribe))
    //     .subscribe((data: GenericServiceResultTemplate) => {
    //         Swal.fire('Password Changes!', 'Your password hase been changed.', 'success');
    //         this.modalService.dismissAll();
    //           //window.location.reload(); 
    //     }, error => {
    //         console.error('Error submitting form:', error);
    //     });
      }      
  }
onEditClick(editModel,item: any) {
  console.log(item,'mast')
  this.selectedUser = { ...item };
  this.modalService.open(editModel, { scrollable: true });
}
onUpdateProfileDetailClick(item: any, modal: any) {
  Swal.fire({
    title: 'Are you sure?',
    text: `Do you want to update the details?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, update it!',
    cancelButtonText: 'No, cancel',
    confirmButtonColor: '#28a745'
  }).then((result) => {
    if (result.isConfirmed) {
      this.appHttpRequestHandlerService.httpPost(item,'pbsamadhannetcoreapi.ViewModels.UpdateProfileDetailsViewModel','Auth','updateProfileDetails').pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (res: any) => {
          Swal.fire('Updated!', 'The profile has been updated.', 'success').then(() => {
            modal.close();
          });
        },
        error: (err) => {
          Swal.fire('Error', 'Failed to update profile.', 'error');
          console.error('Update error:', err);
        }
      });
    }
  });
}
}
