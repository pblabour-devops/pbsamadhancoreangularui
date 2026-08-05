import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormValidationErrorComponent } from './form-validation-error/form-validation-error.component';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { SideNavBarComponent } from '../shared/side-nav-bar/side-nav-bar.component';
import { HttpLoaderService } from './http-loader.service';
import { HttpLoaderComponent } from './http-loader/http-loader.component';
import { ApplicationFileUploadComponent } from './application-file-upload/application-file-upload.component';
import {SharedRoutingModule} from './shared.routing.module';
import { ApplicationDocumentsComponent } from './application-documents/application-documents.component';
import { AppCircleSelectionComponent } from './app-circle-selection/app-circle-selection.component';
import { FactoryCircleSelectionComponent } from './factory-circle-selection/factory-circle-selection.component';
import { CommonOpsService } from './common-ops-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberToWordPipe } from '../pipes/number-to-word.pipe';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { SafePipeModule } from "safe-pipe";
import { GoToHomeButtonComponent } from './go-to-home-button/go-to-home-button.component';
import { AddendumComponent } from './addendum/addendum.component';
import { ExcelUploadComponent } from './excel-upload/excel-upload.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RaisedFeeDetailsComponent } from '../payments/raised-fee-details/raised-fee-details.component';
import { AlcCircleSelectionComponent } from './alc-circle-selection/alc-circle-selection.component';
import { AppRaisedFeeDetailsComponent } from '../payments/app-raised-fee-details/app-raised-fee-details.component';
import { ToastsContainer } from './global-toast/toasts-container.component';
import { NgbToastModule } from "@ng-bootstrap/ng-bootstrap";
import { WorkerDetailsComponent } from './complaint-forms/worker-details/worker-details.component';
import { EmployerDetailsComponent } from './complaint-forms/employer-details/employer-details.component';
import { FormtabComponent } from './formtab/formtab.component';
import { CommonAppformDetailPageComponent } from './application-forms-detail-pages/common-appform-detail-page/common-appform-detail-page.component';
import { SamadhaanComplaintsDetailsComponent } from './application-forms-detail-pages/samadhaan-complaints-details/samadhaan-complaints-details.component';

    
 @NgModule({
   declarations: [
    FormValidationErrorComponent,
    HeaderComponent,
    FooterComponent,
    SideNavBarComponent,
    HttpLoaderComponent,
    ApplicationFileUploadComponent,
    ApplicationDocumentsComponent,
    AppCircleSelectionComponent,
    FactoryCircleSelectionComponent,
    NumberToWordPipe,
    FileUploadComponent,
    GoToHomeButtonComponent,
    AddendumComponent,
    ExcelUploadComponent,
    RaisedFeeDetailsComponent,
    AlcCircleSelectionComponent,
    AppRaisedFeeDetailsComponent,
    ToastsContainer,
    WorkerDetailsComponent,
    EmployerDetailsComponent,
    FormtabComponent,
    CommonAppformDetailPageComponent,
    SamadhaanComplaintsDetailsComponent
  ],
   imports: [
    RouterModule,
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SafePipeModule,
    NgxPaginationModule,
    NgbToastModule
],
   exports: [
    FormValidationErrorComponent,
    HeaderComponent,
    FooterComponent,
    SideNavBarComponent,
    HttpLoaderComponent,
    ApplicationFileUploadComponent,
    AppCircleSelectionComponent,
    FactoryCircleSelectionComponent,
    NumberToWordPipe,
    FileUploadComponent,
    GoToHomeButtonComponent,
    AddendumComponent,
    ExcelUploadComponent,
    RaisedFeeDetailsComponent,
    AlcCircleSelectionComponent,
    AppRaisedFeeDetailsComponent,
    ToastsContainer,
    WorkerDetailsComponent,
    EmployerDetailsComponent,
    FormtabComponent,
    CommonAppformDetailPageComponent
   ],
   providers: [HttpLoaderService, CommonOpsService]
 })
 export class SharedModule { }