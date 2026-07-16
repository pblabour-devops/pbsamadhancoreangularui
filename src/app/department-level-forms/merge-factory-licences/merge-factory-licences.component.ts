
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { IMergeFactoryLicenceDetails } from '../department-level-forms-typed-models';
import { GenericResponseTemplateModel } from 'src/app/generic-implementation/generic-service-result-template';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import Swal from 'sweetalert2';
import { ToastService } from 'src/app/shared/global-toast/toast-service';

@Component({
    selector: 'app-merge-factory-licences',
    templateUrl: './merge-factory-licences.component.html',
    styleUrls: ['./merge-factory-licences.component.css'],
    standalone: false
})
export class MergeFactoryLicencesComponent implements OnInit, OnDestroy {

  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  public selectedLicence: any;
  public licences: IMergeFactoryLicenceDetails[] = [];
  public factoryDetails: IMergeFactoryLicenceDetails[] = [];
  public allSelected = false;
  public alreadyMergedLicences: any[] = [];
  public isLicenseExist: boolean = true;
  mergeRemarks: string = '';

  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private authService: AuthService,
    private toastService: ToastService
  ) {}  

  ngOnInit() {
    this.licences = [];
    this.mergeRemarks = '';
  this.appHttpRequestHandlerService
    .httpGet(
      { userRefId: this.authService.getUserJwtDecodedInfo().UserId },
      'Dashboard',
      'getAlreadyMergedLicences'
    )
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: any) => {

      console.log('Already merged licences response:', data);

      const result = data?.responseDataModel;

      if (result && result.length > 0) {

        const grouped = result.reduce((acc: any, curr: any) => {

          if (!acc[curr.appMergeMasterId]) {
            acc[curr.appMergeMasterId] = {
              appMergeMasterId: curr.appMergeMasterId,
              mergedDate: curr.mergedDate,
              remarks: curr.remarks,
              officerName: curr.officerName,
              userName: curr.userName,
              licences: []
            };
          }

          acc[curr.appMergeMasterId].licences.push({
            licenceNumber: curr.licenceNumber,
            isPrimary: curr.isPrimary,
            establishmentName: curr.establishmentName,
            establishmentAddress: curr.establishmentAddress,
            employees: curr.employees,
            powerUsed: curr.powerUsed
          });

          return acc;

        }, {});

        this.alreadyMergedLicences = Object.values(grouped);
        this.isLicenseExist = true;

      } else {
        this.alreadyMergedLicences = [];
        this.isLicenseExist = false;
      }
    });
}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

 onCheckboxChange(selectedLicence: any) {
 this.licences.forEach(licence => {
     licence.isPrimary = licence === selectedLicence ? 1 : 0;
  }); 
  console.log(this.licences);
}

removeLicenceNumber(selectedLicence: any) {
  this.licences = this.licences.filter(
    licence => licence !== selectedLicence
  );
  if(this.licences.length > 1){
          this.allSelected = true;
        } else {
          this.allSelected = false; 
        }
  console.log(this.licences);
}


  openMergeFactoryLicence(content: any) {
    this.modalService.open(content, {
      scrollable: true,
      backdrop: 'static',
      keyboard: true,
      size: 'md'
    });
    this.factoryDetails = [];
  }

  onMergeFactoryLicence() {
    const primaryLicence = this.licences.find(x => x.isPrimary === 1);

      if (!primaryLicence) {
        this.toastService.show('Please set a primary licence first.', { classname: 'toast-warning text-light', delay: 2000 });
      }
      else
      {   
        if(this.mergeRemarks.trim() === ''){
          this.toastService.show('Please enter remarks.', { classname: 'toast-warning text-light', delay: 2000 });
        }
        else{ 
          const matchedLicences = this.alreadyMergedLicences
            .filter(x => this.licences.some(y => y.licenceNumber === x.licences.find((lic: any) => lic.licenceNumber === y.licenceNumber)?.licenceNumber))
            .map(x => x.licences.find((lic: any) => this.licences.some(y => y.licenceNumber === lic.licenceNumber))?.licenceNumber);
            
          if (matchedLicences.length > 0) {     
              this.toastService.show('Licence number ' + matchedLicences[0] + ' has already been merged. Please remove it from the list to proceed.', { classname: 'toast-failed text-light', delay: 2000 });
          }
          else{
            this.appHttpRequestHandlerService.httpPost({ licences: this.licences, userRefId : this.authService.getUserJwtDecodedInfo().UserId, profileRefId : this.authService.getUserJwtDecodedInfo().UserProfileId,remarks :this.mergeRemarks },'MergeFactoryLicenceRequestViewModel','Dashboard','mergeFactoryLicence' ).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
            (data: any) => {
              if(!data.hasException)
              {
                setTimeout(() => {
                    this.ngOnInit();
                  }, 1000);
              }
            }
          );
          }
        }
    }
    }

  onLicenceNoSearchClick(licenceNoInput: string) {
    this.appHttpRequestHandlerService
      .httpGet(
        { licenceNo: licenceNoInput , userRefId : this.authService.getUserJwtDecodedInfo().UserId },'Dashboard','getMergeFactoryLicenceDetailsByLicenceNo').pipe(takeUntil(this.ngUnsubscribe)).subscribe(
          (data: GenericResponseTemplateModel<IMergeFactoryLicenceDetails>) => {
          if (data?.responseDataModel!= null) {
            this.factoryDetails = [data.responseDataModel];
              this.isLicenseExist = true;
          } else {
            console.log('No details found for the entered licence number.');
            this.factoryDetails = [];
            this.isLicenseExist = false;
          }
        }
      );
  }

  addLicenceToMainTable() {
    if (this.factoryDetails.length > 0) {
      const licencesToAdd = this.factoryDetails.map(l => ({
        ...l,
        selected: 0
      }));
        this.licences.push(...licencesToAdd);
        this.dismissAllModals();
        if(this.licences.length > 1){
          this.allSelected = true;
        }
    }
  }


  dismissAllModals() {
    this.modalService.dismissAll();
  }

  mergeDuplicateLicence() {
    const selectedLicences = this.licences.filter(l => l.isPrimary === 1);
    console.log('Merging duplicate licences...', selectedLicences);
  }
  getColor(i:number){

  const colors = [
    '#30d279',
    // '#dc3545',
    // '#ECEFF4',
    // '#007bff',
    // '#28a745',
    // '#ffc107',
    // '#BFA181',
    // '#6f42c1',
    // '#17a2b8',
    // '#A3B18A',
    // '#555555'
  ];

  return colors[i % colors.length];
}

}