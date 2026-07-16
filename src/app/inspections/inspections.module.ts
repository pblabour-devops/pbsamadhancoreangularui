import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule, NgbTimepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxPaginationModule } from "ngx-pagination";
import { SharedModule } from "../shared/shared.module";
import { InspectionsRoutingModule } from "./inspections.routing.module";
import { PartIiiDangerousOperationComponent } from './factory-wing/part-iii-dangerous-operation/part-iii-dangerous-operation.component';
import { PartIiiMajorAccidentComponent } from './factory-wing/part-iii-major-accident/part-iii-major-accident.component';
import { PartIiiGeneralComponent } from './factory-wing/part-iii-general/part-iii-general.component';
import { PartIiiWelfareComponent } from './factory-wing/part-iii-welfare/part-iii-welfare.component';
import { PartIiiSaftyComponent } from './factory-wing/part-iii-safty/part-iii-safty.component';
import { PartIiiHealthComponent } from './factory-wing/part-iii-health/part-iii-health.component';
import { PartIiiWorkerDetailInspectionComponent } from './factory-wing/part-iii-worker-detail-inspection/part-iii-worker-detail-inspection.component';
import { PartIiiInspectionReportMainComponent } from './factory-wing/part-iii-inspection-report-main/part-iii-inspection-report-main.component';
import { PartIiFactoryDetailComponent } from './factory-wing/part-ii-factory-detail/part-ii-factory-detail.component';
import { PartIGeneralDetailComponent } from './factory-wing/part-i-general-detail/part-i-general-detail.component';
import { PartIiiWorkerDetailMusterRollComponent } from './factory-wing/part-iii-worker-detail-muster-roll/part-iii-worker-detail-muster-roll.component';
import { InspectionConfirmationComponent } from './factory-wing/inspection-confirmation/inspection-confirmation.component';
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { ConfirmLockComponent } from './factory-wing/confirm-lock/confirm-lock.component';

import { LabourPartIGeneralDetailComponent } from './labour-wing/labour-part-i-general-detail/labour-part-i-general-detail.component';
import { LabourPartIIFactoryDetailComponent } from './labour-wing/labour-part-ii-factory-detail/labour-part-ii-factory-detail.component';
import { LabourPartIIIWorkerDetailMustorRollComponent } from './labour-wing/labour-part-iii-worker-detail-mustor-roll/labour-part-iii-worker-detail-mustor-roll.component';
import { LabourPartIiiEqualEnumerationActComponent } from './labour-wing/labour-part-iii-equal-enumeration-act/labour-part-iii-equal-enumeration-act.component';
import { LabourPartIiiMinimumWageActComponent } from './labour-wing/labour-part-iii-minimum-wage-act/labour-part-iii-minimum-wage-act.component';
import { LabourPartIiiPaymentBonusActStatutoryReportComponent } from './labour-wing/labour-part-iii-payment-bonus-act-statutory-report/labour-part-iii-payment-bonus-act-statutory-report.component';
import { LabourPartIiiChildAdolescentLabourActComponent } from './labour-wing/labour-part-iii-child-adolescent-labour-act/labour-part-iii-child-adolescent-labour-act.component';
import { LabourPartIiiNationalHolidaysComponent } from './labour-wing/labour-part-iii-national-holidays/labour-part-iii-national-holidays.component';
import { LabourPartIiiMaternityBenefitActComponent } from './labour-wing/labour-part-iii-maternity-benefit-act/labour-part-iii-maternity-benefit-act.component';
import { LabourPartIiiContractLabourActComponent } from './labour-wing/labour-part-iii-contract-labour-act/labour-part-iii-contract-labour-act.component';
import { LabourPartIiiInterStateMigrantWorkmenActComponent } from './labour-wing/labour-part-iii-inter-state-migrant-workmen-act/labour-part-iii-inter-state-migrant-workmen-act.component';
import { LabourPartIiiLwfActComponent } from './labour-wing/labour-part-iii-lwf-act/labour-part-iii-lwf-act.component';
import { LabourPartIiiGratuityActComponent } from './labour-wing/labour-part-iii-gratuity-act/labour-part-iii-gratuity-act.component';
import { LabourPartIiiIndustrialEmploymentActComponent } from './labour-wing/labour-part-iii-industrial-employment-act/labour-part-iii-industrial-employment-act.component';
import { LabourPartIiiBocwActComponent } from './labour-wing/labour-part-iii-bocw-act/labour-part-iii-bocw-act.component';
import { LabourPartIiiShopActComponent } from './labour-wing/labour-part-iii-shop-act/labour-part-iii-shop-act.component';
import { LabourPartIiiObservationsComponent } from './labour-wing/labour-part-iii-observations/labour-part-iii-observations.component';
import { LabourPartIiiPaymentWageActComponent } from './labour-wing/labour-part-iii-payment-wage-act/labour-part-iii-payment-wage-act.component';
import { LabourConfirmLockComponent } from './labour-wing/labour-confirm-lock/labour-confirm-lock.component';
import { InspectionOperationalStatusComponent } from './inspection-operational-status/inspection-operational-status.component';
import { RandomizationDashboardComponent } from './randomization-dashboard/randomization-dashboard.component';
import { InspectionsDashboardComponent } from './inspections-dashboard/inspections-dashboard.component';
import { LicencewiseInspectionDashboardComponent } from './licencewise-inspection-dashboard/licencewise-inspection-dashboard.component';
import { InspectionsComplianceManagerComponent } from './inspections-compliance-manager/inspections-compliance-manager.component';
import { SafePipeModule } from "safe-pipe";
import { RandomizationInitializationComponent } from "./randomization-initialization/randomization-initialization.component";

@NgModule({ declarations: [
        PartIiiDangerousOperationComponent,
        PartIiiMajorAccidentComponent,
        PartIiiGeneralComponent,
        PartIiiWelfareComponent,
        PartIiiSaftyComponent,
        PartIiiHealthComponent,
        PartIiiWorkerDetailInspectionComponent,
        PartIiiInspectionReportMainComponent,
        PartIiFactoryDetailComponent,
        PartIGeneralDetailComponent,
        PartIGeneralDetailComponent,
        PartIiiWorkerDetailMusterRollComponent,
        RandomizationDashboardComponent,
        InspectionConfirmationComponent,
        ConfirmLockComponent,
        LabourPartIGeneralDetailComponent,
        LabourPartIIFactoryDetailComponent,
        LabourPartIIIWorkerDetailMustorRollComponent,
        LabourPartIiiEqualEnumerationActComponent,
        LabourPartIiiMinimumWageActComponent,
        LabourPartIiiPaymentBonusActStatutoryReportComponent,
        LabourPartIiiChildAdolescentLabourActComponent,
        LabourPartIiiNationalHolidaysComponent,
        LabourPartIiiMaternityBenefitActComponent,
        LabourPartIiiContractLabourActComponent,
        LabourPartIiiInterStateMigrantWorkmenActComponent,
        LabourPartIiiLwfActComponent,
        LabourPartIiiGratuityActComponent,
        LabourPartIiiIndustrialEmploymentActComponent,
        LabourPartIiiBocwActComponent,
        LabourPartIiiShopActComponent,
        LabourPartIiiObservationsComponent,
        LabourPartIiiPaymentWageActComponent,
        LabourConfirmLockComponent,
        InspectionOperationalStatusComponent,
        InspectionsDashboardComponent,
        ConfirmLockComponent,
        RandomizationDashboardComponent,
        InspectionsDashboardComponent,
        InspectionsDashboardComponent,
        LicencewiseInspectionDashboardComponent,
        InspectionsComplianceManagerComponent,
        RandomizationInitializationComponent
    ], imports: [RouterModule,
        CommonModule,
        InspectionsRoutingModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        NgbTimepickerModule,
        NgxPaginationModule,
        SafePipeModule], providers: [UntypedFormBuilder, provideHttpClient(withInterceptorsFromDi())] })
export class InspectionsModule{}
