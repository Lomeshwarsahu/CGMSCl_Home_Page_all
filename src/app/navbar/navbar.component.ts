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
import { TranslateModule } from '@ngx-translate/core'; // ✅ Import this
@Component({
    selector: 'app-navbar',
    standalone: true, // ✅ Make it a standalone component
    imports: [NgFor,CommonModule, NgStyle,NgbCollapseModule,FormsModule, RouterModule,TranslateModule],
    // 
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
  // selectedColor = '#563d7c'; 
  // selectedColor = 'linear-gradient(to right, #FF6F00, #ffbf88, #2a7a2e )'; 
  // selectedColor = 'linear-gradient(1deg, rgb(18, 166, 210) 15%, rgb(49, 65, 252) 100%)'; 
  selectedColor :any; 
  // Default color [style.background]="selectedColor" style="transition: background 0.5s;"
  userName:any;
  constructor(public authService: AuthServiceService, private router: Router,private API:ApiServiceService,private translate: TranslateService) {
     // Load initial color
    //  const storedColor = sessionStorage.getItem('selectedColor');
    //  if (storedColor) {
    //    this.selectedColor = storedColor;
    //  }
     var base = Base.baseUrl
     this.translate.setDefaultLang(this.currentLanguage);
     this.translate.use(this.currentLanguage);
    //  if(this.currentLanguage != 'en'){
    //   alert( this.currentLanguage)
    //    sessionStorage.setItem('language', this.currentLanguage);
    //  }
  }

  ngOnInit() {
    this.selectedColor = sessionStorage.getItem('selectedColor');
    // var languages = sessionStorage.getItem('language');
    // this.translate.use(languages);
    const lang = sessionStorage.getItem('language') || 'en';
    this.translate.use(lang);
    // this.currentLanguage = this.currentLanguage === 'en' ? 'hi' : 'lang';
    // this.translate.use(lang as 'en' | 'hi');
this.currentLanguage = lang === 'hi' ? 'hi' : 'en';
console.log('lang=',lang);
console.log('currentLanguage:', this.currentLanguage);
    if(this.selectedColor != 'linear-gradient(1deg, rgb(18, 166, 210) 15%, rgb(49, 65, 252) 100%)'){
      document.documentElement.style.setProperty('--theme-gradient', this.selectedColor );
    }
    //  sessionStorage.setItem('selectedColor',this.selectedColor);
    // var User = JSON.parse(localStorage.getItem('currentUser') || '{}')
    this.userName = localStorage.getItem('userName');
    // var User=res.user;
    // {"user":{"userName
    // console.log(userName);
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



  // toggleCollapse(selectedColor :any) {
  //   // debugger
  //   // console.log(selectedColor)
  //   if(selectedColor!='#563d7c'){

  //     sessionStorage.setItem('selectedColor',selectedColor);
  //   }
  //   this.isCollapsed = !this.isCollapsed;

  // }

  // selectedColor: string = '#FF6F00';
// gradientStyle: string = '';

// updateGradient() {

//   this.gradientStyle = `linear-gradient(to right, ${this.selectedColor},#ffbf88, #2E7D32)`;
// }
  toggleCollapse(color: string) {
    // debugger;
//  this.selectedColor  = `linear-gradient(to right,#FF6F00 ,#ffbf88,${color})`;

// if (color !== 'linear-gradient(1deg, rgb(18, 166, 210) 15%, rgb(49, 65, 252) 100%)') {
//       this.API.setColor(color);
//     }
    // this.isCollapsed = !this.isCollapsed;
  }

  gradients: string[] = [
    'linear-gradient(1deg, rgb(18, 166, 210) 15%, rgb(49, 65, 252) 100%)',
    'linear-gradient(180deg, #FF6000 11%, #FFA559 100%)',
    'linear-gradient(rgb(93, 18, 210) 11%, rgb(184, 49, 252) 100%)'
  ];

  setTheme(gradient: string) {
    sessionStorage.setItem('selectedColor',gradient);
    document.documentElement.style.setProperty('--theme-gradient', gradient);
    
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

  // handleLinkClick(event: MouseEvent) {
  //   event.preventDefault(); // prevent default anchor behavior
  //   const offcanvasElement = document.querySelector('.offcanvas.show');
  //   if (offcanvasElement) {
  //     const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
  //     bsOffcanvas?.hide();
  
  //     // open link after small delay
  //     setTimeout(() => {
  //       window.open("https://govthealth.cg.gov.in/hrmis/", '_blank');
  //     }, 300); // delay matches offcanvas animation time
  //   } else {
  //     window.open("https://govthealth.cg.gov.in/hrmis/", '_blank');
  //   }
  // }
  // handleLinkClick(event: MouseEvent) {
  //   event.preventDefault();
  //   const offcanvasDismissBtn = document.querySelector('[data-bs-dismiss="offcanvas"]') as HTMLElement;
  //   if (offcanvasDismissBtn) {
  //     // Click the offcanvas dismiss button programmatically
  //     offcanvasDismissBtn.click();
  //   }
  //   // Wait for the animation to complete before opening link
  //   setTimeout(() => {
  //     window.open("https://govthealth.cg.gov.in/hrmis/", '_blank');
  //   }, 300); // Bootstrap's default transition duration
  // }
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
  // isCGMSCLActive(string:any): any {
  //   if(string == 'CGMSCL'){
  //     const childRoutes = [
  //       '/AboutCGMSC',
  //       '/ContactUs',
  //       '/ProcurementPolicy',
  //       '/Organogram',
  //       '/infrastructure'
  //     ];
  //     return childRoutes.some(route => this.router.url.startsWith(route));
  //   }
  //   if(string == 'Drug'){
  //     const childRoutes = [
  //       '/drug',
  //       '/equipment',
  //       '/infrastructure',
  //       '/infrastructure'
  //     ];
  //     return childRoutes.some(route => this.router.url.startsWith(route));
  //   }
 
 
  //   // return childRoutes.some(route => this.router.url.startsWith(route));
  // }
  isCGMSCLActive(section: any): boolean {
    if (section === 'CGMSCL') {
      const childRoutes = [
        '/AboutCGMSC',
        '/ContactUs',
        '/ProcurementPolicy',
        '/Organogram',
        '/OurTeam',
        '/DrugWarehouses',
      ];
      return childRoutes.some(route => this.router.url.startsWith(route));
    } else if (section === 'DRUG') {
      const childRoutes = [
        '/TenderDrug',
      ];
      return childRoutes.some(route => this.router.url.startsWith(route));
    }else if (section === 'EQUIPMENT') {
      const childRoutes = [
        '/TenderEquip',
      ];
      return childRoutes.some(route => this.router.url.startsWith(route));
    }else if (section === 'INFRASTRUCTURE') {
      const childRoutes = [
        '/TenderCivil',
      ];
      return childRoutes.some(route => this.router.url.startsWith(route));
    }else if (section === 'RECRUITMENT') {
      const childRoutes = [
        '/TenderDrugr',
        '/equipmentr',
        '/infrastructurer'
      ];
      return childRoutes.some(route => this.router.url.startsWith(route));
    }else if (section === 'TENDERS') {
      const childRoutes = [
        '/TenderDrug',
        '/equipment',
        '/infrastructure'
      ];
      return childRoutes.some(route => this.router.url.startsWith(route));
    }else if (section === 'GALLERY') {
      const childRoutes = [
        '/TenderDrugr',
        '/equipmentr',
        '/infrastructurer'
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
        '/TenderDrugr',
        '/equipmentr',
        '/infrastructurer'
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
  console.log('Language switched to:', this.currentLanguage);
}
}