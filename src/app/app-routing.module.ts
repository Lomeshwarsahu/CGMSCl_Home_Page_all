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
const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  // {path:'dashboard',component:LoginComponent},
  // {path: '', redirectTo: 'login', pathMatch: 'full'},
  // {path:'login',component:LoginComponent},

  { path: 'dashboard', component: HomeComponent },
  // { path: 'AboutCGMSC', component: AboutCGMSCComponent },
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
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: HomeComponent, canActivate: [authGuard] }, // ✅ Protected Route

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


// const routes: Routes = [
//   { path: '', redirectTo: 'login', pathMatch: 'full' },

//   { path: 'login', component: LoginComponent },

//   {
//     path: 'dashboard',
//     component: HomeComponent,
//     children: [
//       { path: 'AboutCGMSC', component: AboutCGMSCComponent },
//       { path: 'AttachmentList', component: AttachmentListComponent },
//       { path: 'TenderDrug', component: TenderDrugComponent }
//     ]
//   }
// ];