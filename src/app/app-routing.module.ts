import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{LoginComponent} from 'src/app/authentication/login/login.component';
import { authGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { AboutCGMSCComponent } from './components/about-cgmsc/about-cgmsc.component';
import { AttachmentListComponent } from './components/attachment-list/attachment-list.component';
import { TenderDrugComponent } from './components/tender-drug/tender-drug.component';
import { TenderEquipmentComponent } from './components/tender-equipment/tender-equipment.component';
import { TenderOtherTenderComponent } from './components/tender-other-tender/tender-other-tender.component';
import { TenderCivilComponent } from './components/tender-civil/tender-civil.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ProcurementPolicyComponent } from './components/procurement-policy/procurement-policy.component';
import { OrganogramComponent } from './components/organogram/organogram.component';
import { OurTeamComponent } from './components/our-team/our-team.component';
import { DrugWarehousesComponent } from './drug-warehouses/drug-warehouses.component';
import { NoticeCircularComponent } from './components/notice-circular/notice-circular.component';
import { BlacklistedFirmComponent } from './components/blacklisted-firm/blacklisted-firm.component';
import { OtherDeptRecruitmentComponent } from './components/other-dept-recruitment/other-dept-recruitment.component';
import { ProcurementPolicyDrugsComponent } from './components/procurement-policy-drugs/procurement-policy-drugs.component';
import { ProcurementPolicyEquipmentsComponent } from './components/procurement-policy-equipments/procurement-policy-equipments.component';

import { ValidRcComponent } from './components/valid-rc/valid-rc.component';
import { DrugProductBlacklistedComponent } from './components/drug-product-blacklisted/drug-product-blacklisted.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { RTIComponent } from './components/rti/rti.component';
import { CAREERSComponent } from './components/careers/careers.component';
import { ResultsNoticeRecruitmentComponent } from './components/results-notice-recruitment/results-notice-recruitment.component';
import { RecruitmentArchiveComponent } from './components/recruitment-archive/recruitment-archive.component';



const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  // {path:'dashboard',component:LoginComponent},
  // {path: '', redirectTo: 'login', pathMatch: 'full'},
  // {path:'login',component:LoginComponent},

  { path: 'dashboard', component: HomeComponent },
  {path: 'AboutCGMSC', component: AboutCGMSCComponent, },
  { path: 'AttachmentList', component: AttachmentListComponent },
  { path: 'TenderDrug', component: TenderDrugComponent },
  { path: 'TenderEquip', component: TenderEquipmentComponent },
  { path: 'TenderOther', component: TenderOtherTenderComponent },
  { path: 'TenderCivil', component: TenderCivilComponent },
  { path: 'ContactUs', component: ContactUsComponent },
  { path: 'ProcurementPolicy', component: ProcurementPolicyComponent },
  { path: 'Organogram', component: OrganogramComponent },
  { path: 'OurTeam', component: OurTeamComponent },
  { path: 'DrugWarehouses', component: DrugWarehousesComponent },
  { path: 'NoticeCircular', component: NoticeCircularComponent },
  { path: 'EquipmentBlacklisting', component: BlacklistedFirmComponent },
   { path: 'otherDeptRecruitment', component: OtherDeptRecruitmentComponent },
  { path: 'OperationalPolicyDrugs', component: ProcurementPolicyDrugsComponent },
  { path: 'OperationalPolicyEquipments', component: ProcurementPolicyEquipmentsComponent },
  { path: 'DrugBlacklisting', component: DrugProductBlacklistedComponent },
  { path: 'Feedback', component: FeedbackComponent },
  { path: 'Gallery', component: GalleryComponent },
  { path: 'RTI', component: RTIComponent },
  { path: 'CAREERS', component: CAREERSComponent },
  { path: 'ResultsNoticeRecruitment', component: ResultsNoticeRecruitmentComponent },
  { path: 'RecruitmentArchive', component: RecruitmentArchiveComponent },
  
  { path: 'login', component: LoginComponent },
  { path: 'validRC', component: ValidRcComponent },
 
  // { path: 'dashboard', component: HomeComponent, canActivate: [authGuard] }, 

  // {
  //   path: 'dashboard',
  //   component: HomeComponent,
  //   children: [
  //     { path: '', component: HomeComponent }, // default content
  //     { path: 'AboutCGMSC', component: AboutCGMSCComponent },
  //     { path: 'AttachmentList', component: AttachmentListComponent },
  //     { path: 'TenderDrug', component: TenderDrugComponent }
  //   ]
  // }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


