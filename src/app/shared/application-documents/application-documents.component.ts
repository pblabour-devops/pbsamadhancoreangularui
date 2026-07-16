import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonService } from 'src/app/common/common.service';
import { GenericFormModel } from 'src/app/generic-implementation/generic-form-builder.type';
import { AppHttpRequestHandlerService } from '../app-http-request-handler.service';
import { CommonOpsService } from '../common-ops-service';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-application-documents',
    templateUrl: './application-documents.component.html',
    styleUrls: ['./application-documents.component.css'],
    standalone: false
})
export class ApplicationDocumentsComponent implements OnInit {
  public appRefId : number;
  //public entityPrimaryid : number;
  //public applicationType: number;
  public appFormStepsList: any[];
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  public headerText:any={text_1:'',text_2:''};
  @ViewChild(FileUploadComponent) child:FileUploadComponent;
  public parmamEncodedinfo:string;
  public paramInfo:any;

  constructor(private common:CommonService, 
    private route: ActivatedRoute, 
    private appHttpRequestHandlerService: AppHttpRequestHandlerService, 
    public commonOpsService: CommonOpsService,
    private router: Router,) { }
  isFormLocked:boolean=true;
  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      this.parmamEncodedinfo=params.info;
      this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info)=>{
      this.paramInfo = info;
      this.appRefId =  this.paramInfo.appRefId;
      this.appHttpRequestHandlerService.httpGet({ entityParentKeyId: this.paramInfo.identityKey, appId: this.paramInfo.appRefId, ApplicationType: this.paramInfo.applicationType }, "CommonApis", "getapplicationstepper").pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data: GenericFormModel<any>) => {  
          this.appFormStepsList = data.appFormStepsList;            
          if(this.appFormStepsList.length!=0){
            var lockStep = this.appFormStepsList.filter(object => {
              return object['stepCode'] == "LOCK";
            });
            if(lockStep){
              this.isFormLocked =  lockStep[0].isFilled;
            }
          }

          if(this.paramInfo.applicationType==1){
            this.headerText.text_1='FORM-04';
            this.headerText.text_2='Application for Registration of an Establishment';
          }
         
          else if(this.paramInfo.applicationType==5){
            this.headerText.text_1='';
            this.headerText.text_2='Combined Proposed Approval of Building Plans (HUD and Factories)';
          }
          else if(this.paramInfo.applicationType==6){
            this.headerText.text_1='';
            this.headerText.text_2='The Punjab Shop & Commercial Establishment Act, 1958';
          }
          else if(this.paramInfo.applicationType==71){
            this.headerText.text_1='';
            this.headerText.text_2='Application for Approval of Proposed Building Plans Under The Factory Act - 1948 (Fresh)';
          }
          else if(this.paramInfo.applicationType==70){
            this.headerText.text_1='';
            this.headerText.text_2='Factory License under Punjab Factory Rules 1952. <br> The Factories Act, 1948';
          }
          else if(this.paramInfo.applicationType==61){
            this.headerText.text_1='';
            this.headerText.text_2='Grant of permission for Women to work in Night Shift (Shop & Commercial Establishmment)';
          }
          else if(this.paramInfo.applicationType==35){
            this.headerText.text_1='';
            this.headerText.text_2='Registration of Establishment Employing Workers under BOCW';
          }
          else if(this.paramInfo.applicationType==62){
            this.headerText.text_1='';
            this.headerText.text_2='Grant of permission for Women to work in Night Shift Under the Factory Act - 1948 (Fresh)';
          }
          else if(this.paramInfo.applicationType==71){
            this.headerText.text_1='';
            this.headerText.text_2='Application for Approval of Proposed Building Plans Under The Factory Act - 1948';
          }
          else if(this.paramInfo.applicationType==72){
            this.headerText.text_1='';
            this.headerText.text_2='Application for Approval of Existing Building Plans Under The Factory Act - 1948';
          }
          else if(this.paramInfo.applicationType==73){
            this.headerText.text_1='';
            this.headerText.text_2='Approval of Building Plan of Existing Building with Stability Certificate (Addition/Amendment)';
          }
          else if(this.paramInfo.applicationType==37){
            this.headerText.text_1='';
            this.headerText.text_2='Registration of Establishment Employing Workers under Contract Labour (Principal Employer)';
          }
          else if(this.paramInfo.applicationType==38){
            this.headerText.text_1='';
            this.headerText.text_2='Registration of establishment employing workers under Contract Labour';
          }
          else if(this.paramInfo.applicationType==36){
            this.headerText.text_1='';
            this.headerText.text_2='Registration of grant of licence under the motor transport workers act, 1961';
          }
          else if(this.paramInfo.applicationType==81){
            this.headerText.text_1='';
            this.headerText.text_2='Application for Approval of Combined Building Plan For PSIEC And Factories';
          }
          else if(this.paramInfo.applicationType==39){
            this.headerText.text_1='';
            this.headerText.text_2='Registration of Establishment Employing Migrant Workman';
          }
          else if(this.paramInfo.applicationType==40){
            this.headerText.text_1='';
            this.headerText.text_2='Application for Licence for Employment of Migrant Workmen (Contractor)" under the Inter-State Migrant Workmen (Regulation of Employment and Conditions of Service) Act, 1979';
          }
          else if(this.paramInfo.applicationType==101){
            this.headerText.text_1='';
            this.headerText.text_2='Registration under OSH & CoSS Code 2020';
          }
          else{
            this.headerText.text_1='';
            this.headerText.text_2='';
          }

        });
      });
    });
  }
  ngAfterViewInit() {
  }
  
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  onSubmit(): void {
    this.child.LockUploadFiles();
  }
  btnHomeClick(applicationType){
    if(applicationType == 36 ||applicationType == 8)
      {
        this.router.navigate(['/project/sites']);
      }
      else
      {
        window.location.href= environment.thirdPartyIntegrationConfigs.investPunjab.investPunjabReturnPath;
      }
  }
}
