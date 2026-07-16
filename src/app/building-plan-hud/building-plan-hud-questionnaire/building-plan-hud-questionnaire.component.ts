import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { TForm } from 'src/app/generic-implementation/generic-form-builder.type';
import { Building_Plan_Hud_Questionnaire } from '../building-plan-hud-typed-models';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonOpsService } from 'src/app/shared/common-ops-service';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-building-plan-hud-questionnaire',
    templateUrl: './building-plan-hud-questionnaire.component.html',
    styleUrls: ['./building-plan-hud-questionnaire.component.css'],
    standalone: false
})
export class BuildingPlanHudQuestionnaireComponent implements OnInit {
  submitted:boolean=false;
  public paramInfo:any;
  public parmamEncodedinfo:string;
  defaultReturnPath: string = environment.thirdPartyIntegrationConfigs.investPunjab.defaultReturnPath;
  checkboxFlag: any=false;
  constructor(private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    public commonOpsService: CommonOpsService,
    private router: Router,
    private modalService: NgbModal) { }

  Building_Plan_Hud_Questionnaire_Form: TForm<Building_Plan_Hud_Questionnaire> = this.fb.group({
    isSiteFallUnderMC: ['', Validators.required],
    isSiteFallUnderPSIEC: ['', Validators.required],
    isApprovedFromMC: ['', Validators.required],
    isApprovedFromPSIEC: ['', Validators.required],
    isCLUAvailedFromAuthority: ['', Validators.required],
  }) as TForm<Building_Plan_Hud_Questionnaire>;
  get formControls() { return this.Building_Plan_Hud_Questionnaire_Form.controls; }
  
  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.route.queryParams
      .subscribe(params => {
        this.parmamEncodedinfo=params.info;
        this.commonOpsService.decodeQueryParamsFromBase64ToModel(params.info, (info)=>{
          this.paramInfo = info;
          if(this.paramInfo.appRefId>0){
            this.onSubmit();
          }
        });
      });
  }
  MCSiteChange(){
    this.Building_Plan_Hud_Questionnaire_Form.controls.isSiteFallUnderPSIEC.patchValue('');
    this.Building_Plan_Hud_Questionnaire_Form.controls.isApprovedFromMC.patchValue('');
  }
  PSIECSiteChange(){
    //this.Building_Plan_Hud_Questionnaire_Form.controls.isSiteFallUnderPSIEC.patchValue('');
    this.Building_Plan_Hud_Questionnaire_Form.controls.isApprovedFromMC.patchValue('');
  }
  onSubmit(): void {}

  openScrollableContent(longContent) {
    this.modalService.open(longContent, { scrollable: true });
    this.checkboxFlag=false;
  }
  openApplicationForm(){
    this.submitted=true;
    this.modalService.dismissAll();
    this.router.navigate(['/building-plan-hud/addupdategeneraldetail'],{ queryParams:{info: this.parmamEncodedinfo}});
  }
  checkBoxFlagChanged(){
    //console.log(this.checkboxFlag)
  }
}
