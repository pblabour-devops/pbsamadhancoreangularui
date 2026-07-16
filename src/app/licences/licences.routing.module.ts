import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FactoryQuestionnaireComponent } from "./factory/factory-questionnaire/factory-questionnaire.component";
import { AddUpdateFactoryGeneralDetailComponent } from "./factory/add-update-factory-general-detail/add-update-factory-general-detail.component";
import { FactoryLicenceDetailComponent } from "./factory/detail/detail.component";
import { AddUpdateOccupierDetailComponent } from "./factory/add-update-occupier-detail/add-update-occupier-detail.component";

const appRoutes: Routes=[
    // { path:'shop_Blocked', component:AddUpdateShopGeneralDetailComponent },
    { path:'factory-questionnaire', component: FactoryQuestionnaireComponent },
    { path:'addupdatefactorygeneraldetail', component:AddUpdateFactoryGeneralDetailComponent },
    { path:'addupdateoccupierdetail', component:AddUpdateOccupierDetailComponent },
    { path:'factorylicencedetail', component: FactoryLicenceDetailComponent }
];
@NgModule({
   imports:[
       RouterModule.forChild(appRoutes)
   ],
   exports:[RouterModule]
})
export class LicenceRoutingModule{}
