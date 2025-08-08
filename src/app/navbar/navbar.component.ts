import { Component } from '@angular/core';
import { AuthServiceService } from '../guards/auth-service.service';
import { Router, RouterModule } from '@angular/router';
import { NgFor, CommonModule, NgStyle } from '@angular/common';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ApiServiceService } from '../service/api-service.service';
import { Base } from '../helper/base';
import { closest } from '@ng-bootstrap/ng-bootstrap/util/util';
import { TranslateService } from '@ngx-translate/core';
declare const bootstrap: any;
import { TranslateModule } from '@ngx-translate/core'; 
@Component({
    selector: 'app-navbar',
    standalone: true, 
    imports: [CommonModule,NgbCollapseModule,FormsModule, RouterModule,TranslateModule],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isDarkMode = false;
 isEquipmentOpen = false;
  isDrugOpen = false;
  isCGMSCLOpen  = false;
  isInfrastructureOpen = false;
  isRecruitmentOpen = false;
  isTendersOpen = false;
  isGalleryOpen = false;
  isDownloadsOpen = false;
  isDownloadsOpen_eq = false;
  isLOGINOpen = false;
  isDruggOpen = false;
  isEquipmenttOpen = false;
  isInfrastructureeOpen = false;
  isAdminOpen = false;
  isCareersOpen = false;
  activeNav = 'home';
  currentLanguage: 'en' | 'hi' = 'en';
  isCollapsed = false;
 
  selectedColor :any; 
  userName:any;
  constructor(public authService: AuthServiceService, private router: Router,private API:ApiServiceService,private translate: TranslateService) {
   
     var base = Base.baseUrl
     this.translate.setDefaultLang(this.currentLanguage);
     this.translate.use(this.currentLanguage);
   
  }

  ngOnInit() {
    const colorTop = sessionStorage.getItem('selectedTopColor');
    if (colorTop) {
      document.documentElement.style.setProperty('--theme-top', colorTop);
    }
  
    const gradient = sessionStorage.getItem('selectedColor');
    if (gradient) {
      document.documentElement.style.setProperty('--theme-gradient', gradient);
    }


    // var color_top = sessionStorage.getItem('selectedTopColor');
    // // sessionStorage.setItem('selectedTopColor',colors);
    // // document.documentElement.style.setProperty('--theme-top', colors);
    // if(color_top != 'rgb(49, 65, 252);'){
    //   document.documentElement.style.setProperty('--theme-top', color_top);
    // }
    // this.selectedColor = sessionStorage.getItem('selectedColor');
    // console.log('lang=',lang);
    // if(this.selectedColor != 'linear-gradient(1deg, rgb(18, 166, 210) 15%, rgb(49, 65, 252) 100%)'){
    //   document.documentElement.style.setProperty('--theme-gradient', this.selectedColor );
    // }
    const lang = sessionStorage.getItem('language') || 'en';
    this.translate.use(lang);
    this.currentLanguage = lang === 'hi' ? 'hi' : 'en';
    this.userName = localStorage.getItem('userName');
    const childRoutes = [
      '/AboutCGMSC',
      '/ContactUs',
      '/ProcurementPolicy',
      '/Organogram',
      '/infrastructure'
    ];
    this.isCGMSCLOpen = childRoutes.some(route => this.router.url.startsWith(route));
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  themeClass: string = 'btn-primary';  // Default theme

  // Method to change theme
  changeTheme(theme: string) {
    this.themeClass = `btn-${theme}`;
  }



  gradients: string[] = [
    'linear-gradient(1deg, rgb(18, 166, 210) 15%, rgb(49, 65, 252) 100%)',
    'linear-gradient(180deg, #FF6000 11%, #FFA559 100%)',
    'linear-gradient(rgb(93, 18, 210) 11%, rgb(184, 49, 252) 100%)',
    // 'linear-gradient(180deg,rgb(255, 0, 221) 11%,rgb(210, 108, 238) 100%)',
  ];

  setTheme(gradient: string,index:number) {
    const topColors = [
      'rgb(49, 65, 252)',
      '#ff6000',
      'rgb(93, 18, 210)'
    ];
  
    // Set gradient
    sessionStorage.setItem('selectedColor', gradient);
    document.documentElement.style.setProperty('--theme-gradient', gradient);
  
    // Set top color
    const topColor = topColors[index] || topColors[0]; // fallback to index 0 if invalid
    sessionStorage.setItem('selectedTopColor', topColor);
    document.documentElement.style.setProperty('--theme-top', topColor);
    // // debugger
    // sessionStorage.setItem('selectedColor', gradient);
    // document.documentElement.style.setProperty('--theme-gradient', gradient);
    // if(index==0){
    //   var colors =' rgb(49, 65, 252)';
    //   sessionStorage.setItem('selectedTopColor',colors);
    //   document.documentElement.style.setProperty('--theme-top', colors);
    // }else if(index==1){
    //   var colors =' #ff6000';
    //   sessionStorage.setItem('selectedTopColor',colors);
    //   document.documentElement.style.setProperty('--theme-top', colors);
    // }else if(index==2){
    //   var colors =' rgb(93, 18, 210)';
    //   sessionStorage.setItem('selectedTopColor',colors);
    //   document.documentElement.style.setProperty('--theme-top', colors);
    // }

//  background-color: #ff6000; background-color: rgb(49, 65, 252);     background-color: rgb(93, 18, 210);

 
    
  }

  onButtonClick(URL: any) {
    if (URL) {
      // Remove '~' from the start of the URL
      // const cleanedUrl = 'https://cgmsc.gov.in/' + URL.replace(/^~\//, '');
      // console.log('Opening:', URL);
      window.open(URL, '_blank');
    } else {
      alert(
        '⚠️ Alert: Attachment File Not Found!\n\nThe requested document is missing.\nPlease try again later or contact support.'
      );
    }
  }

  handleLinkClick(event: MouseEvent, url: string) {
    event.preventDefault();
  
    const offcanvasDismissBtn = document.querySelector('[data-bs-dismiss="offcanvas"]') as HTMLElement;
    if (offcanvasDismissBtn) {
      // Trigger Bootstrap's native dismissal
      offcanvasDismissBtn.click();
    }
  
    // Wait until offcanvas animation completes
    setTimeout(() => {
      window.open(url, '_blank');
    }, 300); // Bootstrap default transition duration
  }
  ngAfterViewInit() {
    // this.isSubmenuActive();
  }
  isCGMSCLActive(section: any): boolean {
    if (section === 'CGMSCL') {
      const childRoutes = [
        '/AboutCGMSC',
        '/ContactUs',
        '/ProcurementPolicy',
        '/NoticeCircular',
        '/Organogram',
        '/OurTeam',
        '/DrugWarehouses',
      ];
      return childRoutes.some(route => this.router.url.startsWith(route));
    } else if (section === 'DRUG') {
      const childRoutes = [
        '/TenderDrug',
        '/OperationalPolicyDrugs',
        '/DrugBlacklisting',
      
      ];
      return childRoutes.some(route => this.router.url.startsWith(route));
    }else if (section === 'EQUIPMENT') {
      const childRoutes = [
        '/TenderEquip',
        '/OperationalPolicyEquipments',
        '/EquipmentBlacklisting',
        '/validRC',
      ];
      return childRoutes.some(route => this.router.url.startsWith(route));
    }else if (section === 'INFRASTRUCTURE') {
      const childRoutes = [
        '/TenderCivil',
      ];
      return childRoutes.some(route => this.router.url.startsWith(route));
    }else if (section === 'RECRUITMENT') {
      const childRoutes = [
        '/otherDeptRecruitment',
        '/RecruitmentArchive',
        '/ResultsNoticeRecruitment'
      ];
      return childRoutes.some(route => this.router.url.startsWith(route));
    }else if (section === 'TENDERS') {
      const childRoutes = [
        '/TenderDrug',
        '/TenderEquip',
        '/TenderCivil',
        '/TenderOther'
      ];
      return childRoutes.some(route => this.router.url.startsWith(route));
    }else if (section === 'GALLERY') {
      const childRoutes = [
        '/Gallery',
      ];
      return childRoutes.some(route => this.router.url.startsWith(route));
    }else if (section === 'Downloads') {
      const childRoutes = [
        '/TenderDrugr',
        '/equipmentr',
        '/infrastructurer'
      ];
      return childRoutes.some(route => this.router.url.startsWith(route));
    }else if (section === 'Careers') {
      const childRoutes = [
        '/CAREERS'
      ];
      return childRoutes.some(route => this.router.url.startsWith(route));
    }else if (section === 'LOGIN TO ANOTHER') {
      const childRoutes = [
        '/TenderDrugr',
        '/equipmentr',
        '/infrastructurer'
      ];
      return childRoutes.some(route => this.router.url.startsWith(route));
    }
  
    // Default return to satisfy all code paths
    return false;
  }


toggleLanguage(): void {
  this.currentLanguage = this.currentLanguage === 'en' ? 'hi' : 'en';
    this.translate.use(this.currentLanguage);
    sessionStorage.setItem('language', this.currentLanguage);
  // this.currentLanguage = this.currentLanguage === 'en' ? 'hi' : 'en';

  // Yahan aap translation logic ya i18n service use kar sakte hain
  // Example: this.translateService.use(this.currentLanguage);
  // console.log('Language switched to:', this.currentLanguage);
}
}