import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from 'src/app/guards/auth-service.service';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { AllCateDrugTenderList, Data_model, GetMediaResponse, NoticCircular, WarehouseInfo } from 'src/app/model/model';
import { RouterModule } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import * as AOS from 'aos';
import { GoogleMapsModule } from '@angular/google-maps';
declare var bootstrap: any;
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';
import { WarehouseLocationComponent } from '../warehouse-location/warehouse-location.component';
import { DivisionOfficeLocationComponent } from '../division-office-location/division-office-location.component';
import { TranslateService , TranslateModule} from '@ngx-translate/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';
import { E } from '@angular/material/error-options.d-CGdTZUYk';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// import {  } from '@ngx-translate/core'; 
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    FormsModule,
    CommonModule,
    RouterModule,
    GoogleMapsModule,
    DivisionOfficeLocationComponent,
    WarehouseLocationComponent,TranslateModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  isCollapsed = false;
  selectedColor = '#563d7c';
  data_model: Data_model[] = [];
  dispatchData: NoticCircular[] = [];
  MediaResponse: GetMediaResponse[] = [];
  DrugTenderList: Data_model[] = [];
  EquipmentList: Data_model[] = [];
  CivilTenderList: Data_model[] = [];
  OtherTenderList: Data_model[] = [];
  VisitedContentList: Data_model[] = [];
  AllTenderListNotification: AllCateDrugTenderList[] = [];
  warehouseInfo: WarehouseInfo[] = [];
  publishingDates: any[]=[];
  sanitizedPdfUrl!: SafeResourceUrl;
  // pauseScroll: boolean = false;
  crrenterdatetosevendate:any;
  card20Pause = false;
  card1Pause = false;
  card2Pause = false;
  card3Pause = false;
  card4Pause = false;
  zoom = 20;
  center: google.maps.LatLngLiteral = {
    // lat: 21.136663,
    // lng: 81.78665921
    lat: 21.136499,
    lng: 81.78643548,
    // lat: 21.136478,
    // lng: 81.78643421,
    // lat: 21.136647,
    // lng: 81.7864520,
  };
  // currentLanguage: 'en' | 'hi' = 'en';
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
  };
  isOnline: boolean = navigator.onLine;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow!: MapInfoWindow;
  constructor(
    public authService: AuthServiceService,private sanitizer: DomSanitizer,
    private router: Router,
    private ApiService: ApiServiceService,
    private cdRef: ChangeDetectorRef, private translate: TranslateService,private toastr:ToastrService
  ) {
    const lang = sessionStorage.getItem('language') || 'en';
    this.translate.use(lang);
    // this.currentLanguage = lang === 'hi' ? 'hi' : 'en';
    // sessionStorage.setItem('language', this.currentLanguage);
    // sessionStorage.setItem('language', this.currentLanguage);
    // this.translate.use(this.currentLanguage);
    // this.router.events.subscribe(() => {
    //   const current = this.router.url;
    //   this.isDefaultDashboardRoute = current === '/dashboard';
    // });
    // https://dpdmis.in/cdn/Videos/presentation/BloodCTScan.mp4

  }
  ngOnInit(): void {
    const colorTop = sessionStorage.getItem('selectedTopColor');
    if (colorTop) {
      document.documentElement.style.setProperty('--theme-top', colorTop);
    }

    const gradient = sessionStorage.getItem('selectedColor');
    if (gradient) {
      document.documentElement.style.setProperty('--theme-gradient', gradient);
    }
    // AOS.init();
    // //   this.selectedColor = sessionStorage.getItem('selectedColor');
    // this.ApiService.selectedColor$.subscribe((color) => {
    //   // this.selectedColor = color;
    //   document.documentElement.style.setProperty('--theme-gradient', color);
    // });
    // this.GetDrugTenderList();
    this.GetAllTenderLists();
    this.GetAllCateDrugTenderList();
    // this.Getnewimage();

    window.addEventListener('offline', () => {
      this.isOnline = false;
 
    });
  
    window.addEventListener('online', () => {
      this.isOnline = true;
    
    });
  }
  openInfo(marker: MapMarker) {
   

      this.infoWindow.open(marker);
    
  }
  onPauseStart(index: any) {
    // debugger;
    if (index == 1) {
      this.card1Pause = true;
      this.cdRef.detectChanges();
      return;
    } else if (index == 2) {
      this.card2Pause = true;
      this.cdRef.detectChanges();
      return;
    } else if (index == 3) {
      this.card3Pause = true;
      this.cdRef.detectChanges();
      return;
    }  else if (index == 4) {
      this.card20Pause = true;
      this.cdRef.detectChanges();
      return;
    } 
    else {
      this.card4Pause = true;
      this.cdRef.detectChanges();
    }
  }

  onPauseEnd(index: any) {
    // debugger;
    if (index == 1) {
      this.card1Pause = false;
      this.cdRef.detectChanges();
      return;
    } else if (index == 2) {
      this.card2Pause = false;
      this.cdRef.detectChanges();
      return;
    } else if (index == 3) {
      this.card3Pause = false;
      this.cdRef.detectChanges();
      return;
    } else if (index == 4) {
      this.card20Pause = false;
      this.cdRef.detectChanges();
      return;
    } 
    else {
      this.card4Pause = false;
      this.cdRef.detectChanges();
    }
    // this.card2Pause = false;
    // this.cdRef.detectChanges();
  }


//   https://www.cgmsc.gov.in/himis_apin/api/WebCgmsc/GetDrugTenderList?n=2
// https://www.cgmsc.gov.in/himis_apin/api/WebCgmsc/GetEquipmentList?n=2
// https://www.cgmsc.gov.in/himis_apin/api/WebCgmsc/GetCivilTenderList?n=2
// https://www.cgmsc.gov.in/himis_apin/api/WebCgmsc/GetOtherTenderList?n=2
// https://www.cgmsc.gov.in/himis_apin/api/WebCgmsc/GetMostVisitedContentList?n=2
// https://www.cgmsc.gov.in/himis_apin/api/WebCgmsc/GetAllCateDrugTenderList?n=15 for popup
  GetAllTenderLists() {
    // debugger
    const apis = [
      { url: 'GetDrugTenderList?n=2', assignTo: 'DrugTenderList' },
      { url: 'GetEquipmentList?n=2', assignTo: 'EquipmentList' },
      { url: 'GetCivilTenderList?n=2', assignTo: 'CivilTenderList' },
      { url: 'GetOtherTenderList?n=2', assignTo: 'OtherTenderList' },
      { url: 'GetMostVisitedContentList?n=2', assignTo: 'VisitedContentList' },
    ];

    apis.forEach((api) => this.fetchData(api.url, api.assignTo));
  }

  fetchData(endpoint: string, assignTo: string) {
    // debugger
    this.ApiService.get(endpoint).subscribe(
      (res: any) => {
        if (assignTo == 'DrugTenderList') {
          this.DrugTenderList = res;
        //  this.publishingDates = res.map((item: { content_Publising_Date: any; }) => item.content_Publising_Date);
        //   this.getnewtentar(this.publishingDates);
        } else if (assignTo == 'EquipmentList') {
          this.EquipmentList = res;
          // this.publishingDates = res.map((item: { content_Publising_Date: any; }) => item.content_Publising_Date);
          // console.log('All Publishing Dates:', this.publishingDates);
          // this.getnewtentar(this.publishingDates);
        } else if (assignTo == 'CivilTenderList') {
          this.CivilTenderList = res;
        } else if (assignTo == 'OtherTenderList') {
          this.OtherTenderList = res;
        }
        // else if (assignTo=='VisitedContentList') {
        //   this.VisitedContentList = res;
        //   console.log(endpoint, res);
        // }
        else {
          return;
          this.VisitedContentList = res;
          // this.toastr.error(`Error fetching=${endpoint}`,'Error!')
          console.log(endpoint, res);
        }
        // assignTo = res;
        //   console.log(endpoint, res);
      },
      (err: Error) => {
        // this.toastr.error(`Error fetching=${err.message}`,'Error!');
        console.error(`Error fetching ${endpoint}:`, err);
      }
    );
  }

  onButtonClick(attachment_Id: any, name: string) {
     const modalElement = document.getElementById('newModaltender');
      const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
      modal.hide();
      this.router.navigate(['/AttachmentList'], {
        queryParams: { Id: attachment_Id, name: name },
      });
  }
  // https://www.cgmsc.gov.in/himis_apin/api/WebCgmsc/GetAllCateDrugTenderList?n=2
  // GetAllCateDrugTenderList(){
  //   try {
  //     this.ApiService.get('GetAllCateDrugTenderList?n=15').subscribe(
  //       (res: any) => {
         
  //         this.AllTenderListNotification =  res;
  //         console.log('AllTenderListNotification=', res)
  //         this.publishingDates = res.map((item: { content_Publising_Date: any; }) => item.content_Publising_Date);
  //         this.getnewtentar(this.publishingDates);
  //         // console.log('AllTenderListNotification=',this.AllTenderListNotification);
  //         // console.log(JSON.stringify(res.user.role[0].roleName));
  //         // console.log(JSON.stringify(res.user.userName));
  //       },
  //       (err: Error) => {
  //         //  debugger
  //          throw err;
  //         // this.toastr.error(`Error fetching=${err.message}`,'Error!');
  //       }
  //     );
  //   } catch (err: any) {
  //     // this.toastr.error(`Error fetching=${err.message }`,'Error!');
  //     throw err;
  //   }
  // }

  // wwwwwwwwwwwww
  // GetAllCateDrugTenderList() {
   
  //   try {
  //     this.ApiService.get('GetAllCateDrugTenderList?n=15').subscribe(
  //       (res: any) => {
  //         // First sort the response
  //         const sortedRes = res.sort((a: any, b: any) => {
  //           const aIsNew = this.isNewContent(a.content_Publising_Date);
  //           const bIsNew = this.isNewContent(b.content_Publising_Date);  
  
  //           // Show new content first
  //           if (aIsNew && !bIsNew) return -1;
  //           if (!aIsNew && bIsNew) return 1;
  
  //           // If both are same (new or not), sort by publish date descending
  //           return new Date(b.content_Publising_Date).getTime() - new Date(a.content_Publising_Date).getTime();
  //         });
  
  //         this.AllTenderListNotification = sortedRes;
  //         // console.log('Sorted Tender List:', sortedRes);
  
  //         this.publishingDates = sortedRes.map((item: { content_Publising_Date: any; }) => item.content_Publising_Date);
  //         this.getnewtentar(this.publishingDates);
  //       },
  //       (err: Error) => {
  //         throw err;
  //       }
  //     );
  //   } catch (err: any) {
  //     throw err;
  //   }
  // }
  GetAllCateDrugTenderList() {
    try {
      this.ApiService.get('GetAllCateDrugTenderList?n=15').subscribe(
        (res: any) => {
          // Filter only "new" items within last 15 days
          const filteredRes = res.filter((item: any) =>
            this.isNewContent(item.content_Publising_Date)
          );
  
          // Sort new items by publish date descending
          const sortedFilteredRes = filteredRes.sort((a: any, b: any) =>
            new Date(b.content_Publising_Date).getTime() - new Date(a.content_Publising_Date).getTime()
          );
  
          this.AllTenderListNotification = sortedFilteredRes;
          this.publishingDates = sortedFilteredRes.map(
            (item: { content_Publising_Date: any }) => item.content_Publising_Date
          );
          this.getnewtentar(this.publishingDates);
        },
        (err: Error) => {
          throw err;
        }
      );
    } catch (err: any) {
      throw err;
    }
  }
  
  //wwwwwwwwwwwwwwwwwww
  isNewContent(publishDateStr: string): boolean {
    if (!publishDateStr) return false;
  
    const today = new Date();
    const publishDate = new Date(publishDateStr);
  
    if (isNaN(publishDate.getTime())) return false;
  
    const diffInMs = today.getTime() - publishDate.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  
    return diffInDays >= 0 && diffInDays <= 15;
    // return diffInDays >= -2 && diffInDays <= 15; 
  }
  


  // isNewContenttt(publishingDate: string): boolean {
 

    
  //   const published = new Date(publishingDate);
  //   const today = new Date();
   

  //   const diffInMs = today.getTime() - published.getTime();

  //   const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  //   return diffInDays <= 7;
  // }
getnewtentar(publishingDates: string[]) {
  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0] + "T00:00:00";
  const todayDateObj = new Date(formattedToday);

  for (let publishingDate of publishingDates) {
    const publishDateObj = new Date(publishingDate);
    if (isNaN(publishDateObj.getTime())) {
      this.toastr.warning(`Invalid publish date=${publishingDate}`,'Warning!')
      // console.warn("Invalid publish date:", publishingDate);
      continue;
    }

    const diffInMs = todayDateObj.getTime() - publishDateObj.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    // console.log("Publish:", publishingDate, "| Diff Days:", diffInDays);

    if (diffInDays >= 0 && diffInDays <= 20) {
      const modal = new bootstrap.Modal(document.getElementById('newModaltender'));
      modal.show();
      setTimeout(() => {
        document.body.style.paddingRight = '0px';
      }, 100);
      break; // show once only
    }
  
  }
}


  carousel_img: string[] = [
    'https://dpdmis.in/cdn/carousel/FirstImg.JPG',
    'https://dpdmis.in/cdn/carousel/DSC_2865.JPG',
    'https://dpdmis.in/cdn/carousel/DSC_4797.JPG',
    'https://dpdmis.in/cdn/carousel/DSC_2804.JPG',
    'https://dpdmis.in/cdn/carousel/DSC_2677.JPG',
    'https://dpdmis.in/cdn/carousel/DSC_4670.JPG',
    'https://dpdmis.in/cdn/carousel/DSC_4649.JPG',
    'https://dpdmis.in/cdn/carousel/DSC_4610.JPG',
  ];

  images: string[] = [
    './assets/cgmsc imgs/img1.jfif',
    './assets/cgmsc imgs/img2.jfif',
    './assets/cgmsc imgs/ai-generated-8659507_640.jpg',
    './assets/cgmsc imgs/leaves-7590923_640.jpg',
    './assets/cgmsc imgs/butterfly-7632646_640.jpg',
    './assets/cgmsc imgs/bird-8442508_640.webp',
    './assets/cgmsc imgs/blue-8186653_640.webp',
    './assets/cgmsc imgs/bird-8469368_640.jpg',
    './assets/cgmsc imgs/bird-8788491_640.jpg',
  ];
  drugs: string[] = [
    'https://dpdmis.in/cdn/drugs/2.jpg',
    'https://dpdmis.in/cdn/drugs/4.jpeg',
    'https://dpdmis.in/cdn/drugs/8.jpeg',
    'https://dpdmis.in/cdn/drugs/9.jpeg',
    'https://dpdmis.in/cdn/drugs/3.jpeg',
    'https://dpdmis.in/cdn/drugs/19.jpeg',
    'https://dpdmis.in/cdn/drugs/37.jpeg',
    'https://dpdmis.in/cdn/drugs/27.jpeg',
    'https://dpdmis.in/cdn/drugs/40.jpeg',
  ];
  Infrastructure: string[] = [
'https://dpdmis.in/cdn/Infrastructure/Picture4.png',
'https://dpdmis.in/cdn/Infrastructure/Picture2.png',
'https://dpdmis.in/cdn/Infrastructure/Picture1.png',
'https://dpdmis.in/cdn/Infrastructure/Picture5.png',
'https://dpdmis.in/cdn/Infrastructure/Picture3.png',
'https://dpdmis.in/cdn/Infrastructure/Picture6.jfif',
'https://dpdmis.in/cdn/Infrastructure/picture7.jfif',
'https://dpdmis.in/cdn/Infrastructure/Picture10.png',
'https://dpdmis.in/cdn/Infrastructure/Picture11.png',

    // 'https://dpdmis.in/cdn/Event/DSC_2677.JPG',
    // 'https://dpdmis.in/cdn/Event/photo_5.jpg',
    // 'https://dpdmis.in/cdn/Event/DSC_2865.JPG',
    // 'https://dpdmis.in/cdn/Event/DSC_2581.JPG',
    // 'https://dpdmis.in/cdn/Event/DSC_2674.JPG',
    // 'https://dpdmis.in/cdn/Event/DSC_2804.JPG',
    // 'https://dpdmis.in/cdn/Event/DSC_2873.JPG',
    // 'https://dpdmis.in/cdn/Event/DSC_2883.JPG',
    // 'https://dpdmis.in/cdn/Event/DSC_4610.JPG',
  ];

  equipment:string[]=[
    'https://dpdmis.in/cdn/equipment/32%20slice%20CT%20scan.jfif',
    'https://dpdmis.in/cdn/equipment/CT%20SCAN.jpeg',
    'https://dpdmis.in/cdn/equipment/Multipara%20monitor.jpeg',
    'https://dpdmis.in/cdn/equipment/VENTILATOR.jpeg',
  ];
  events: string[] = [
    'https://dpdmis.in/cdn/Event/DSC_2677.JPG',
    'https://dpdmis.in/cdn/Event/photo_5.jpg',
    'https://dpdmis.in/cdn/Event/DSC_2865.JPG',
    'https://dpdmis.in/cdn/Event/DSC_2581.JPG',
    'https://dpdmis.in/cdn/Event/DSC_2674.JPG',
    'https://dpdmis.in/cdn/Event/DSC_2804.JPG',
    'https://dpdmis.in/cdn/Event/DSC_2873.JPG',
    'https://dpdmis.in/cdn/Event/DSC_2883.JPG',
    'https://dpdmis.in/cdn/Event/DSC_4610.JPG',
  ];
  News: string[] = [
'https://dpdmis.in/cdn/News/WhatsApp%20Image%202025-07-30%20at%2011.25.44%20(1).jpeg',
'https://dpdmis.in/cdn/News/WhatsApp%20Image%202025-07-30%20at%2011.25.44.jpeg',
'https://dpdmis.in/cdn/News/WhatsApp%20Image%202025-07-30%20at%2011.25.45.jpeg',
'https://dpdmis.in/cdn/News/WhatsApp%20Image%202025-07-30%20at%2011.25.46%20(1).jpeg',
'https://dpdmis.in/cdn/News/WhatsApp%20Image%202025-07-30%20at%2011.25.46.jpeg',
'https://dpdmis.in/cdn/News/WhatsApp%20Image%202025-07-30%20at%2011.25.47.jpeg',




    // 'https://dpdmis.in/cdn/News/48385277-51e6-4dcb-a2ff-5beb3b1f8528.jfif',
    // 'https://dpdmis.in/cdn/News/b2bdb353-f7ed-484b-9d12-f53e2c8cfe85.jfif',
    // 'https://dpdmis.in/cdn/News/ba0ed618-ec63-4f2b-b977-786fbe807576.jfif',
    // 'https://dpdmis.in/cdn/News/Capture.JPG',
    // 'https://dpdmis.in/cdn/News/cd01d37c-4a6c-486b-b3f6-bc94fb650a96.jfif',
    // 'https://dpdmis.in/cdn/News/img1.jpg.jfif',
    'https://dpdmis.in/cdn/News/news.JPG',
    'https://dpdmis.in/cdn/News/WhatsApp%20Image%202025-05-19%20at%209.42.17%20PM.jpeg',
    'https://dpdmis.in/cdn/News/img1.jpg.jfif',
  ];

  selectedIndex = 0;

  get selectedImage(): string {
    return this.News[this.selectedIndex];
  }
  get selectedImage1(): string {
    return this.events[this.selectedIndex];
  }
  get selectedImagedrug(): string {
    return this.drugs[this.selectedIndex];
  }
  get selectedImagequp(): string {
    return this.equipment[this.selectedIndex];
  }
  get selectedImagecivil(): string {
    return this.Infrastructure[this.selectedIndex];
  }

  openModal(index: number) {
    this.selectedIndex = index;
    const modal = new bootstrap.Modal(document.getElementById('imageModal'));
    modal.show();
  }
  openModaldcivil(index: number) {
    this.selectedIndex = index;
    const modal = new bootstrap.Modal(document.getElementById('imageModalcivil'));
    modal.show();
  }
  openModaldrug(index: number) {
    this.selectedIndex = index;
    const modal = new bootstrap.Modal(
      document.getElementById('imageModaldrug')
    );
    modal.show();
  }
  openModalequp(index: number) {
    this.selectedIndex = index;
    const modal = new bootstrap.Modal(
      document.getElementById('imageModalequp')
    );
    modal.show();
  }
  openModal1(index: number) {
    this.selectedIndex = index;
    const modal = new bootstrap.Modal(document.getElementById('imageModal1'));
    modal.show();
  }


  prevImage() {
    this.selectedIndex =
      (this.selectedIndex - 1 + this.images.length) % this.images.length;
  }

  nextImage() {
    this.selectedIndex = (this.selectedIndex + 1) % this.images.length;
  }

  isOpen = false;
  height = 300; // or dynamically calculate it

  toggle() {
    this.isOpen = !this.isOpen;
  }

  onEnd() {
    // handle post-transition logic
  }

  // https://dpdmis.in/cdn/Event/
  // https://dpdmis.in/cdn/News/


  sharePage() {
    if (navigator.share) {
      navigator
        .share({
          title: document.title,
          text: 'Check out this page!',
          url: window.location.href,
        })
        .then(() => console.log('Successfully shared'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      alert('Web Share API is not supported in your browser.');
    }
  }



  GetNoticCircular() {
    try {
      this.ApiService.get('GetNoticCircular').subscribe(
        (res) => {
          this.dispatchData = res;
          // console.log('NoticCircular =:', this.dispatchData);
        },
        (error) => {
          // alert(`Error fetching data: ${JSON.stringify(error.message)}`);
          console.log(`Error fetching data:,${JSON.stringify(error.message)}`);
        }
      );
    } catch (err: any) {
      console.log(err);
      // throw err;
    }
  }
  // https://cgmsc.gov.in/HIMIS_APIN/api/WebCgmsc/GetMediaResponse?n=0 for new GetMediaResponse
  GetMediaResponse() {
    try {
      this.ApiService.get('GetMediaResponse?n=0').subscribe(
        (res) => {
          this.MediaResponse = res;
          // console.log('NoticCircular =:', this.dispatchData);
        },
        (error) => {
          // alert(`Error fetching data: ${JSON.stringify(error.message)}`);
          console.log(`Error fetching data:,${JSON.stringify(error.message)}`);
        }
      );
    } catch (err: any) {
      console.log(err);
      // throw err;
    }
  }
  openmarqModal(pdfUrl: string):void  {
    // const modal = new bootstrap.Modal(document.getElementById('marqModal'));
    // modal.show();
   // Remove '~' from the start of the URL
  //  const cleanedUrl = 'https://cgmsc.gov.in/Upload/Tender%20Document%20-243(R)202507000001.pdf';
  //  // console.log('Opening:', cleanedUrl);
  //  window.open(cleanedUrl);
   // window.open(cleanedUrl, '_blank');

   this.sanitizedPdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);

  
   const modalElement = document.getElementById('pdfModal');
   const modal = new bootstrap.Modal(modalElement!);
   modal.show();

  }

  // GetDrugTenderList() {
  //   // debugger;
  //   try {
  //     this.ApiService.get('GetDrugTenderList?n=2').subscribe(
  //       (res: any) => {
  //         this.data_model = res;
  //         this.DrugTenderList = this.data_model;
  //         // console.log(this.DrugTenderList);
  //         // console.log(JSON.stringify(res.user.role[0].roleName));
  //         // console.log(JSON.stringify(res.user.userName));
  //         // console.log(JSON.stringify(res.user))
  //       },
  //       (err: Error) => {
  //         //  debugger
  //         //  throw err;
  //         console.log(err);
  //         // this.toastr.error("Please Check userId and password!",'Error');
  //         //  alert(err.message)
  //       }
  //     );
  //     this.ApiService.get('GetEquipmentList?n=2').subscribe(
  //       (res: any) => {
  //         this.data_model = res;
  //         this.EquipmentList = this.data_model;
  //         // console.log('GetEquipmentList?n=2', this.EquipmentList);
  //         // console.log(JSON.stringify(res.user.role[0].roleName));
  //         // console.log(JSON.stringify(res.user.userName));
  //         // console.log(JSON.stringify(res.user))
  //       },
  //       (err: Error) => {
  //         //  debugger
  //         //  throw err;
  //         console.log(err);
  //         // this.toastr.error("Please Check userId and password!",'Error');
  //         //  alert(err.message)
  //       }
  //     );

  //     this.ApiService.get('GetCivilTenderList?n=2').subscribe(
  //       (res: any) => {
  //         this.data_model = res;
  //         this.CivilTenderList = this.data_model;
  //         // console.log('GetCivilTenderList?n=2', this.CivilTenderList);
  //         // console.log(JSON.stringify(res.user.role[0].roleName));
  //         // console.log(JSON.stringify(res.user.userName));
  //         // console.log(JSON.stringify(res.user))
  //       },
  //       (err: Error) => {
  //         //  debugger
  //         //  throw err;
  //         console.log(err);
  //         // this.toastr.error("Please Check userId and password!",'Error');
  //         //  alert(err.message)
  //       }
  //     );
  //     this.ApiService.get('GetOtherTenderList?n=2').subscribe(
  //       (res: any) => {
  //         this.data_model = res;
  //         this.OtherTenderList = this.data_model;
  //         // console.log('GetOtherTenderList?n=2', this.OtherTenderList);
  //         // console.log(JSON.stringify(res.user.role[0].roleName));
  //         // console.log(JSON.stringify(res.user.userName));
  //         // console.log(JSON.stringify(res.user))
  //       },
  //       (err: Error) => {
  //         //  debugger
  //         //  throw err;
  //         console.log(err);
  //         // this.toastr.error("Please Check userId and password!",'Error');
  //         //  alert(err.message)
  //       }
  //     );
  //     this.ApiService.get('GetMostVisitedContentList?n=2').subscribe(
  //       (res: any) => {
  //         this.data_model = res;
  //         this.VisitedContentList = this.data_model;
  //         // console.log('GetMostVisitedContentList?n=2', this.VisitedContentList);
  //         // console.log(JSON.stringify(res.user.role[0].roleName));
  //         // console.log(JSON.stringify(res.user.userName));
  //         // console.log(JSON.stringify(res.user))
  //       },
  //       (err: Error) => {
  //         //  debugger
  //         //  throw err;
  //         console.log(err);
  //         // this.toastr.error("Please Check userId and password!",'Error');
  //         //  alert(err.message)
  //       }
  //     );
  //   } catch (err: any) {
  //     console.log(err);
  //     // throw err;
  //   }
  // }
}
