import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import Swal from 'sweetalert2';
import { IUserArchitectAdditionalInfoMapping } from '../admin-type-models';
import { GenericResponseTemplateModel } from 'src/app/generic-implementation/generic-service-result-template';
import { Router } from '@angular/router';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { ISelectedFiles } from 'src/app/shared/shared-typed-models';

@Component({
    selector: 'app-add-update-empanelled-person',
    templateUrl: './add-update-empanelled-person.component.html',
    styleUrls: ['./add-update-empanelled-person.component.css'],
    standalone: false
})
export class AddUpdateEmpanelledPersonComponent implements OnInit {
protected ngUnsubscribe: Subject<void> = new Subject<void>();

  public roles = [
    { code: 'CPPR', description: 'Competent Person' },
    { code: 'ARCH', description: 'Empanelled Architect' },
    { code: 'ENGR', description: 'Empanelled Engineer' }
  ];

  competentPersonData: any[] = [];
  filteredData: any[] = [];
  displayedData: any[] = [];

  selectedRole = '';
  searchTerm = '';

  pageSize = 10;
  currentPage = 1;
  totalPages = 0;

  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  serialNumber = (this.currentPage - 1) * this.pageSize + 1;

  submitted:boolean=false;

  signatureImageUrl: string | null = null;
  pdfFileUrl: string | null = null;
  public registrationNumber : any;
  public parmamEncodedinfo:string;
  public selectedFiles : ISelectedFiles[] = [];
  selectedUser: any = {};

  constructor(private fb: UntypedFormBuilder,
              private appHttpRequestHandlerService: AppHttpRequestHandlerService,
              private modalService: NgbModal,
              private router: Router,
              public commonOpsService: CommonOpsService
  ) {}

   InputForm: TForm<IUserArchitectAdditionalInfoMapping> = this.fb.group({
        empanelledType : [''],
        userRefId : ['NA'],
        registrationNumber_DOF : ['NA'],
        architectName: ['', Validators.required],
        architectfatherName : ['', Validators.required],
        communicationAddress : ['', Validators.required],
        contactNumber: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.required]],
        registrationNumber_COA: ['', [Validators.required, Validators.required]],
        registrationIssuedOn_COA: ['', [Validators.required, Validators.required]],
        registrationValidUpto_COA: ['', Validators.required],
        termAndCondition1: [false, Validators.requiredTrue],
        termAndCondition2: [false, Validators.requiredTrue],
        councilOfArchitectApproval: [null, Validators.required],
        specimenSignature: [null, Validators.required]
      }) as TForm<IUserArchitectAdditionalInfoMapping>;
      get formControls() { return this.InputForm.controls; }

  ngOnInit(): void {}

  getCompetentPersonDetails(role: string) {
    this.appHttpRequestHandlerService.httpGet({ roleName: role }, 'Dashboard', 'getEmpanelledPersonDetailsByRoleName').pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: any) => {
        this.competentPersonData = data.listData || [];
        this.applyFilters();
      });
  }

  onRoleChange(role: string) {
    this.selectedRole = role;
    if (role) {
      this.getCompetentPersonDetails(role);
    } else {
      this.competentPersonData = [];
      this.applyFilters();
    }
  }

  onSearchChange() {
    this.applyFilters();
  }

  applyFilters() {
    let data = [...this.competentPersonData];
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      data = data.filter(item =>
        (item.officerFullName?.toLowerCase().includes(term) || item.email?.toLowerCase().includes(term) || item.contactNo?.toLowerCase().includes(term))
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


  onStatusClick(item: any) {
  const currentStatus = item.status?.toLowerCase();
  let newStatusText = 'Active';

  if (currentStatus === 'active') {
    newStatusText = 'In-Active';
  } else {
    newStatusText = 'Active';
  }

  Swal.fire({
    title: 'Are you sure?',
    text: `Do you want to change status from ${item.status} to ${newStatusText}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, update it!',
    cancelButtonText: 'No, cancel',
    confirmButtonColor: '#28a745'
  }).then((result) => {
    if (result.isConfirmed) {
      const requestData = {
        ...item,
        Status: newStatusText
      };

      this.appHttpRequestHandlerService.httpPost(
        requestData,
        'pbsamadhannetcoreapi.ViewModels.EmpanelledPersonDetailsByRoleNameViewModel','Dashboard','updateEmpanelledPersonStatus').pipe(takeUntil(this.ngUnsubscribe))
        .subscribe({
          next: (res: any) => {
            item.status = newStatusText;
            Swal.fire('Updated!', 'The status has been updated.', 'success');
          },
          error: (err) => {
            Swal.fire('Error', 'Failed to update status.', 'error');
          }
        });
      }
  });
}


onEditClick(editModel,item: any) {
  this.selectedUser = { ...item };
  this.modalService.open(editModel, { scrollable: true });
}

openScrollableContent(longContent) {
  this.modalService.open(longContent, { scrollable: true });
}

  onPdfFileChange(event: any) {
    const file = event.target.files[0];
    this.commonOpsService.toFilesBase64([file], this.selectedFiles).subscribe((convertedFiles: ISelectedFiles[]) => {
      if (convertedFiles && convertedFiles.length > 0) {
        const base64 = convertedFiles[0].base64;
        const pureBase64 = base64.split(',')[1];
        this.InputForm.controls.councilOfArchitectApproval.setValue(pureBase64);
      }
    });
  }
  onSignatureImageChange(event: any) {
    const file = event.target.files[0];
     this.commonOpsService.toFilesBase64([file], this.selectedFiles).subscribe((convertedFiles: ISelectedFiles[]) => {
      if (convertedFiles && convertedFiles.length > 0) {
        const base64 = convertedFiles[0].base64;
        const pureBase64 = base64.split(',')[1];
        this.InputForm.controls.specimenSignature.setValue(pureBase64);
      }
    });
  }

onSubmit(): void {
  this.submitted = true;
  this.InputForm.markAllAsTouched();
  if (this.InputForm.invalid) {
    const invalidFields: string[] = [];
    Object.keys(this.formControls).forEach((key) => {
      const control = this.formControls[key];
      if (control.invalid) {
        const formattedField = key
          .replace(/_/g, ' ')
          .replace(/([a-z])([A-Z])/g, '$1 $2')
          .replace(/\b([A-Z]{2,})\b/g, match => match)
          .replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
        invalidFields.push(formattedField);
      }
    });

    Swal.fire({
      icon: 'info',
      title: 'Please ensure the following fields are filled in (all are mandatory)',
      html: `<ul style="text-align: left;">${invalidFields.map(f => `<li>${f}</li>`).join('')}</ul>`,
      confirmButtonText: 'OK'
    });
    return;
  }

  else {
    this.appHttpRequestHandlerService.httpPost(this.InputForm.value,"pbsamadhannetcoreapi.Models.UserArchitectAdditionalInfoMapping","Admin","registerEmpanelledPerson").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: GenericResponseTemplateModel<string>) => {
      this.registrationNumber = data.responseDataModel;
      Swal.fire({
        icon: 'success',
        title: 'Empanelled person registered successfully..!',
        html: `
          <strong>Registration No:</strong> <strong>${this.registrationNumber}</strong><br><br>
          <i>Please note this registration number for future reference.</i>`,
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/Admin/add-empanelled-person'], {
            queryParams: { info: this.parmamEncodedinfo }
          });
        }
      });

      this.InputForm.reset();
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'There was a problem registering the empanelled person.',
          confirmButtonText: 'OK'
        });
      });
    }
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
      this.appHttpRequestHandlerService.httpPost(item,'pbsamadhannetcoreapi.ViewModels.UpdateEmpanelledPersonProfileDetailsViewModel','Admin','updateEmpanelledPersonProfileDetails').pipe(takeUntil(this.ngUnsubscribe))
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



ngOnDestroy() {
  this.ngUnsubscribe.next();
  this.ngUnsubscribe.complete();
}
}