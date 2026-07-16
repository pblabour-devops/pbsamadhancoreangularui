import { Component, HostListener, Inject, OnInit, DOCUMENT } from '@angular/core';
import * as jsonData from '../../../../assets/MPR_Format.json';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { takeUntil } from 'rxjs/operators';
import { AppHttpRequestHandlerService } from 'src/app/shared/app-http-request-handler.service';
import { Subject } from 'rxjs';
import { GenericResponseTemplateModel, GenericServiceResultTemplate } from 'src/app/generic-implementation/generic-service-result-template';
import { IMPR_Factory, IMPR_Factory_Accident, IMPR_Factory_AdminDuty, IMPR_Factory_CourtCase, IMPR_Factory_Training } from '../../department-level-forms-typed-models';
import { TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import html2pdf from 'html2pdf.js';
@Component({
    selector: 'app-mpr-factory-wing',
    templateUrl: './mpr-factory-wing.component.html',
    styleUrls: ['./mpr-factory-wing.component.css'],
    standalone: false
})
export class MprFactoryWingComponent implements OnInit {  

  data: any = (jsonData as any).default;
  formData: any = [];
  public parmamEncodedinfo: string;
  public paramInfo: any;
  public isReadOnly: boolean = false;
  //public mprDataForm: IMPR_Factory;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  submitted: boolean = false;
  submittedAccidentForm: boolean = false;
  submittedCourtCaseForm: boolean = false;
  submittedAdminDutyForm: boolean = false;
  submittedTrainingForm: boolean = false;

  accidenInfoList: IMPR_Factory_Accident[] = [];
  courtCaseInfoList: IMPR_Factory_CourtCase[] = [];
  adminDutyInfoList: IMPR_Factory_AdminDuty[] = [];
  trainingInfoList: IMPR_Factory_Training[] = [];
  month_bkup: number = 0;
  year_bkup: number = 0;
  windowScrolled: boolean;
  allowedMonth: number;
  allowedYear: number;
  isLoading: boolean = false;
  constructor(private httpClient: HttpClient,
    private route: ActivatedRoute,
    public commonOpsService: CommonOpsService,
    private appHttpRequestHandlerService: AppHttpRequestHandlerService,
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    private modalService: NgbModal) { }
  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
    }
    else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }
  scrollToTop() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 8));
      }
    })();
  }


  ngOnInit() {

  }
  ngAfterViewInit() {
    this.route.queryParams
      .subscribe(params => {
        this.parmamEncodedinfo = params.info;
        this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info) => {
          this.paramInfo = info;
          this.Input_Form.controls.id.patchValue(this.paramInfo.id);
          this.isReadOnly = this.paramInfo.isReadOnly;
          if (this.paramInfo.id > 0) {
            this.appHttpRequestHandlerService.httpGet({ id: this.paramInfo.id, userId: this.authService.getUserJwtDecodedInfo().UserId }, "MPR", "getMprFactoryDetail").pipe(takeUntil(this.ngUnsubscribe))
              .subscribe((formdata: GenericResponseTemplateModel<IMPR_Factory>) => {
                this.Input_Form.patchValue(formdata.responseDataModel);
                //console.log(formdata.responseDataModel?.jsonData== null)
                //this.mprDataForm = formdata.responseDataModel?.jsonData == null ? this.mprDataForm: formdata.responseDataModel;
                //if (formdata.responseDataModel.jsonData.length > 0) {
                this.allowedYear = this.Input_Form.controls.year.value;
                this.allowedMonth = this.Input_Form.controls.month.value;
                this.Input_Form.controls.factoryCircleRefId.patchValue(formdata.responseDataModel.factoryCircleRefId);
                debugger;
                this.data = formdata.responseDataModel?.jsonData == null ? this.data : JSON.parse(formdata.responseDataModel.jsonData);

                this.Input_Form.controls.month.patchValue(formdata.responseDataModel.month == 0 ? '' : formdata.responseDataModel.month);
                this.Input_Form.controls.year.patchValue(formdata.responseDataModel.year == 0 ? '' : formdata.responseDataModel.year);

                this.accidenInfoList = JSON.parse(this.Input_Form.controls.accidenInfoListJson.value);
                if (this.accidenInfoList == null) {
                  this.accidenInfoList = [];
                }
                this.courtCaseInfoList = JSON.parse(this.Input_Form.controls.courtCaseInfoListJson.value);
                if (this.courtCaseInfoList == null) {
                  this.courtCaseInfoList = [];
                }
                this.adminDutyInfoList = JSON.parse(this.Input_Form.controls.adminDutyInfoListJson.value);
                if (this.adminDutyInfoList == null) {
                  this.adminDutyInfoList = [];
                }
                this.trainingInfoList = JSON.parse(this.Input_Form.controls.trainingInfoListJson.value);
                if (this.trainingInfoList == null) {
                  this.trainingInfoList = [];
                }


                this.month_bkup = this.Input_Form.controls.month.value;
                this.year_bkup = this.Input_Form.controls.year.value;
                //}
                //console.log(this.Input_Form.controls.month,'month')
              });
          }
          else {

            var currDate = new Date();
            this.allowedYear = currDate.getFullYear();
            this.allowedMonth = currDate.getMonth();
            if (this.allowedMonth == 0) {
              this.allowedYear = this.allowedYear - 1;
              this.allowedMonth = 12;
            }
            this.Input_Form.controls.month.patchValue(this.allowedMonth);
          }
        });
      });
  }

  Input_Form: TForm<IMPR_Factory> = this.fb.group({
    id: ['', Validators.required],
    month: ['', Validators.required],
    year: ['', Validators.required],
    jsonData: ['', Validators.required],
    isLocked: ['', Validators.required],
    lastModifiedOn: ['', Validators.required],
    submittedBy_UserRefId: ['', Validators.required],
    submittedBy_ProfileRefId: ['', Validators.required],
    submittedBy_RoleRefId: ['', Validators.required],
    factoryCircleRefId: [0, Validators.required],
    accidenInfoListJson: ['', Validators.required],
    courtCaseInfoListJson: ['', Validators.required],
    adminDutyInfoListJson: ['', Validators.required],
    trainingInfoListJson: ['', Validators.required],
  }) as TForm<IMPR_Factory>;
  get formControls() { return this.Input_Form.controls; };


  Input_Form_Accident: TForm<IMPR_Factory_Accident> = this.fb.group({
    accidentType: ['', Validators.required],
    nameOfWorker: ['', Validators.required],
    noOfWorkersAffected: ['', Validators.required],
    nameAndAddressOfEstb: ['', Validators.required],
    dateAndTimeOfAccident: ['', Validators.required],
    dateOfInquiryReportSubmitted: ['', Validators.required],
    briefofAccident: ['', Validators.required],

  }) as TForm<IMPR_Factory_Accident>;
  get formControlsAccident() { return this.Input_Form_Accident.controls; };

  Input_Form_CourtCase: TForm<IMPR_Factory_CourtCase> = this.fb.group({
    courtType: ['', Validators.required],
    titleOfCase: ['', Validators.required],
    status: ['', Validators.required],

  }) as TForm<IMPR_Factory_CourtCase>;
  get formControlsCourtCase() { return this.Input_Form_CourtCase.controls; };


  Input_Form_AdminDuty: TForm<IMPR_Factory_AdminDuty> = this.fb.group({
    nameOfDuty: ['', Validators.required],
    periodOfDuty: ['', Validators.required],
    remarks: ['', Validators.required],

  }) as TForm<IMPR_Factory_AdminDuty>;
  get formControlsAdminDuty() { return this.Input_Form_AdminDuty.controls; };


  Input_Form_Training: TForm<IMPR_Factory_Training> = this.fb.group({
    nameOfTraining: ['', Validators.required],
    period: ['', Validators.required],
    remarks: ['', Validators.required],

  }) as TForm<IMPR_Factory_Training>;
  get formControlsTraining() { return this.Input_Form_Training.controls; };

  setOnChange(sectionSortId: number, subSectionSortId: number, lableSortId: number, subLableSortId: number, infoType: string, event: any) {
    this.getObjects(this.data, 'Id', event.target.id, event.target.value);
  }

  getObjects(obj: any, key: string, val: string, newVal: string) {
    var newValue = newVal;
    var objects: any[] = [];
    for (var i in obj) {
      if (!obj.hasOwnProperty(i)) continue;
      if (typeof obj[i] == 'object') {
        objects = objects.concat(this.getObjects(obj[i], key, val, newValue));
      } else if (i == key && obj[key] == val) {
        obj['Value'] = newValue;
      }
    }
    return obj;
  }
  onSubmit(submitType): void {
    this.submitted = true;
    this.Input_Form.controls.jsonData.patchValue(JSON.stringify(this.data));
    this.Input_Form.controls.isLocked.patchValue((submitType == 0));
    this.Input_Form.controls.submittedBy_UserRefId.patchValue(this.authService.getUserJwtDecodedInfo().UserId);
    this.Input_Form.controls.submittedBy_ProfileRefId.patchValue(this.authService.getUserJwtDecodedInfo().UserProfileId);
    this.Input_Form.controls.submittedBy_RoleRefId.patchValue('na');




    this.Input_Form.controls.accidenInfoListJson.patchValue(JSON.stringify(this.accidenInfoList));

    this.Input_Form.controls.courtCaseInfoListJson.patchValue(JSON.stringify(this.courtCaseInfoList));
    this.Input_Form.controls.adminDutyInfoListJson.patchValue(JSON.stringify(this.adminDutyInfoList));
    this.Input_Form.controls.trainingInfoListJson.patchValue(JSON.stringify(this.trainingInfoList));

    this.Input_Form.controls.lastModifiedOn.patchValue(new Date());
    if (this.Input_Form.valid) {
      this.appHttpRequestHandlerService.httpPost(this.Input_Form.value, "pbsamadhannetcoreapi.Models.MPR_Factory", "MPR", "addupdate_mprFactoryDetail").pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data: GenericServiceResultTemplate) => {
          this.backToDashboard();
        });
    }
  }
  value(sectionObj: any) {
    //console.log(sectionObj.formData.lableObj.LableValueInfo.value)
  }
  backToDashboard() {
    this.router.navigate(['/dashboard/mpr_factories']);
  }

  openAddAccidentModal(addAccidentModal) {
    this.submittedAccidentForm = false;
    this.modalService.open(addAccidentModal, { size: 'lg', scrollable: true, backdrop: 'static', keyboard: false });
  }
  onSubmitAccidentRecord() {
    this.submittedAccidentForm = true;
    if (this.Input_Form_Accident.valid) {
      this.accidenInfoList.push(this.Input_Form_Accident.value);
      this.Input_Form_Accident.reset();
      this.Input_Form_Accident.controls.accidentType.patchValue('');
      this.modalService.dismissAll();
    }
  }
  removeAccidentItem(i) {
    this.accidenInfoList.splice(i, 1);
  }


  openAddCourtCaseModal(addCourtCaseModal) {
    this.submittedCourtCaseForm = false;
    this.modalService.open(addCourtCaseModal, { size: 'lg', scrollable: true, backdrop: 'static', keyboard: false });
  }
  onSubmitCourtCaseRecord() {
    this.submittedCourtCaseForm = true;
    if (this.Input_Form_CourtCase.valid) {
      this.courtCaseInfoList.push(this.Input_Form_CourtCase.value);
      this.Input_Form_CourtCase.reset();
      this.Input_Form_CourtCase.controls.courtType.patchValue('');
      this.modalService.dismissAll();
    }
  }
  removeCourtCaseItem(i) {
    this.courtCaseInfoList.splice(i, 1);
  }

  openAddAdminDutyModal(addAdminDutyModal) {
    this.submittedAdminDutyForm = false;
    this.modalService.open(addAdminDutyModal, { size: 'lg', scrollable: true, backdrop: 'static', keyboard: false });
  }
  onSubmitAdminDutyRecord() {
    this.submittedAdminDutyForm = true;
    if (this.Input_Form_AdminDuty.valid) {
      this.adminDutyInfoList.push(this.Input_Form_AdminDuty.value);
      this.Input_Form_AdminDuty.reset();
      this.modalService.dismissAll();
    }
  }
  removeAdminDutyItem(i) {
    this.adminDutyInfoList.splice(i, 1);
  }


  openAddTrainingModal(addTrainingModal) {
    this.submittedTrainingForm = false;
    this.modalService.open(addTrainingModal, { size: 'lg', scrollable: true, backdrop: 'static', keyboard: false });
  }
  onSubmitTrainingRecord() {
    //console.log(this.Input_Form_Training)
    this.submittedTrainingForm = true;
    if (this.Input_Form_Training.valid) {
      this.trainingInfoList.push(this.Input_Form_Training.value);
      this.Input_Form_Training.reset();
      this.modalService.dismissAll();
    }
  }
  removeTrainingItem(i) {
    this.trainingInfoList.splice(i, 1);
  }


  dismissModal() {
    this.Input_Form_Accident.reset();
    this.Input_Form_Accident.controls.accidentType.patchValue('');

    this.Input_Form_CourtCase.reset();
    this.Input_Form_CourtCase.controls.courtType.patchValue('');

    this.Input_Form_AdminDuty.reset();

    this.Input_Form_Training.reset();

    this.modalService.dismissAll();
  }
  checkDuplicateMonthYear() {
    if (this.Input_Form.controls.id.value >= 0 && this.Input_Form.controls.month.value > 0 && this.Input_Form.controls.year.value > 0 && this.Input_Form.controls.factoryCircleRefId.value >= 0) {
      this.appHttpRequestHandlerService.httpGet(
        {
          id: this.Input_Form.controls.id.value,
          month: this.Input_Form.controls.month.value,
          year: this.Input_Form.controls.year.value,
          factoryCircleRefId: this.Input_Form.controls.factoryCircleRefId.value,
          userId: this.authService.getUserJwtDecodedInfo().UserId
        }, "MPR", "checkDuplicateMonthYear").pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data: GenericResponseTemplateModel<boolean>) => {
          //console.log(data)
          if (data.responseDataModel) {
            Swal.fire({
              icon: 'warning',
              text: 'This Month and Year is already in use..!',
            });
            this.Input_Form.controls.month.patchValue(this.month_bkup == 0 ? '' : this.month_bkup);
            this.Input_Form.controls.year.patchValue(this.year_bkup == 0 ? '' : this.year_bkup);
          }
        });
    }
  }
  getMonthNameByCode(code: number): string {

    if (code == 1) {
      return "January"
    }
    else if (code == 2) {
      return "February"
    }
    else if (code == 3) {
      return "March"
    }
    else if (code == 4) {
      return "April"
    }
    else if (code == 5) {
      return "May"
    }
    else if (code == 6) {
      return "June"
    }
    else if (code == 7) {
      return "July"
    }
    else if (code == 8) {
      return "August"
    }
    else if (code == 9) {
      return "September"
    }
    else if (code == 10) {
      return "October"
    }
    else if (code == 11) {
      return "November"
    }
    else if (code == 12) {
      return "December"
    }
    return "";
  }

  getYearRange() {
    var currDate = new Date();
    return [currDate.getFullYear() - 1, currDate.getFullYear()]
  }

  generatePDFFromJSON() {
    this.isLoading = true; 
    setTimeout(() => {
      const captureElement = document.getElementById('content-to-capture');

      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
    
      const month = this.Input_Form.controls.month.value;
      const year = this.Input_Form.controls.year.value;
    
      const monthName = monthNames[month - 1];
      const fileName = `MPR_${monthName}_${year}.pdf`;
    
      const opt = {
        margin: [0.2, 0.2, 0.2, 0.2],
        filename: fileName,
        image: { type: 'jpeg', quality: 0.7 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: [25, 15], orientation: 'portrait' }
      };
    
      html2pdf()
        .from(captureElement)
        .set(opt)
        .toPdf()
        .get('pdf')
        .then((pdf) => {
          const totalPages = pdf.internal.getNumberOfPages();
          const pageWidth = pdf.internal.pageSize.getWidth();
          const pageHeight = pdf.internal.pageSize.getHeight();
          for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i);
            pdf.setFontSize(9);
            pdf.text(
              `Page ${i} of ${totalPages}`,
              pageWidth / 2,  
              pageHeight - 0.1, 
              { align: 'center' }
            );
          }

          pdf.save(fileName);
          this.isLoading = false; 
        })
        .catch((error) => {
          console.error('Error generating PDF:', error);
          this.isLoading = false; 
        });
    }, 100); 
  }
  
}
