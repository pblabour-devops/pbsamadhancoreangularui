import { Component, Input } from '@angular/core';
import { Tab } from '../../dashboard/dashboard-typed-models';
import { AppFormStepsInfo } from 'src/app/generic-implementation/generic-form-builder.type';
import { CommonOpsService } from '../common-ops-service';

@Component({
  selector: 'app-formtab',
  standalone: false,
  templateUrl: './formtab.component.html',
  styleUrl: './formtab.component.css',
})
export class FormtabComponent {

   @Input() appSteps: any[];
  public encodedUrl: string = '';

  constructor(public commonOpsService: CommonOpsService) { }

  get activeStep(): any | undefined {
    return this.appSteps?.find(s => s.isCurrentStep);
  }

  ngOnChanges(){
    console.log('appsteps', this.appSteps)
  }

  ngOnInit(): void {
    if (this.appSteps?.length && !this.appSteps.some(s => s.isCurrentStep)) {
      this.appSteps[0].isCurrentStep = true;
    }
  }

  getEncodedUrl(parmInfo) {
    this.encodedUrl = this.commonOpsService.encodeQueryParamsInBase64(parmInfo);
  }

  // setActiveTab(tab: any): void {
  //   if (tab.isLink) { return; } // navigation handled by routerLink itself

  //   this.appSteps.forEach(s => s.isCurrentStep = false);
  //   tab.isCurrentStep = true;
  // }

  removeTab(tab: any, event: Event): void {
    event.stopPropagation();

    const wasActive = tab.isCurrentStep;
    this.appSteps = this.appSteps.filter(s => s !== tab);

    if (wasActive && this.appSteps.length) {
      this.appSteps[0].isCurrentStep = true;
    }
  }

  logroute(tab){
  console.log('tab', tab.uiPageComponentPath)
  }
}
