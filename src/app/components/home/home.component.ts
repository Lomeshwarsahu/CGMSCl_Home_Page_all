import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // ngClass ke liye ye bhi
import { AuthServiceService } from 'src/app/guards/auth-service.service';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { Data_model, WarehouseInfo } from 'src/app/model/model';
import { RouterModule } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import * as AOS from 'aos';
import { GoogleMapsModule } from '@angular/google-maps';
declare var bootstrap: any;
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';
import { WarehouseLocationComponent } from '../warehouse-location/warehouse-location.component';
import { DivisionOfficeLocationComponent } from '../division-office-location/division-office-location.component';
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
    WarehouseLocationComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  isCollapsed = false;
  selectedColor = '#563d7c';
  data_model: Data_model[] = [];
  DrugTenderList: Data_model[] = [];
  EquipmentList: Data_model[] = [];
  CivilTenderList: Data_model[] = [];
  OtherTenderList: Data_model[] = [];
  VisitedContentList: Data_model[] = [];
  warehouseInfo: WarehouseInfo[] = [];
  // pauseScroll: boolean = false;
  card1Pause = false;
  card2Pause = false;
  card3Pause = false;
  card4Pause = false;
  zoom = 20;
  center: google.maps.LatLngLiteral = {
    // lat: 21.136663,
    // lng: 81.78665921
    lat: 21.136478,
    lng: 81.78643421,
  };

  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
  };
  @ViewChild(MapInfoWindow, { static: false }) infoWindow!: MapInfoWindow;
  constructor(
    public authService: AuthServiceService,
    private router: Router,
    private ApiService: ApiServiceService,
    private cdRef: ChangeDetectorRef
  ) {
    // this.router.events.subscribe(() => {
    //   const current = this.router.url;
    //   this.isDefaultDashboardRoute = current === '/dashboard';
    // });
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
    } else if (index == 2) {
      this.card3Pause = true;
      this.cdRef.detectChanges();
      return;
    } else {
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
    } else if (index == 2) {
      this.card3Pause = false;
      this.cdRef.detectChanges();
      return;
    } else {
      this.card4Pause = false;
      this.cdRef.detectChanges();
    }
    // this.card2Pause = false;
    // this.cdRef.detectChanges();
  }

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

          console.log(endpoint, res);
        } else if (assignTo == 'EquipmentList') {
          this.EquipmentList = res;
          console.log(endpoint, res);
        } else if (assignTo == 'CivilTenderList') {
          this.CivilTenderList = res;
          console.log(endpoint, res);
        } else if (assignTo == 'OtherTenderList') {
          this.OtherTenderList = res;
          // console.log(endpoint, res);
        }
        // else if (assignTo=='VisitedContentList') {
        //   this.VisitedContentList = res;
        //   console.log(endpoint, res);
        // }
        else {
          this.VisitedContentList = res;
          console.log(endpoint, res);
        }
        // assignTo = res;
        //   console.log(endpoint, res);
      },
      (err: Error) => {
        console.error(`Error fetching ${endpoint}:`, err);
      }
    );
  }

  onButtonClick(attachment_Id: any, name: string) {
    // alert('hi')
    // console.log(attachment_Id);
    // this.router.navigate(['/AttachmentList']);
    this.router.navigate(['/AttachmentList'], {
      // queryParams: {Id: attachment_Id}
      queryParams: { Id: attachment_Id, name: name },
    });
  }

  GetDrugTenderList() {
    // debugger;
    try {
      this.ApiService.get('GetDrugTenderList?n=2').subscribe(
        (res: any) => {
          this.data_model = res;
          this.DrugTenderList = this.data_model;
          console.log(this.DrugTenderList);
          // console.log(JSON.stringify(res.user.role[0].roleName));
          // console.log(JSON.stringify(res.user.userName));
          // console.log(JSON.stringify(res.user))
        },
        (err: Error) => {
          //  debugger
          //  throw err;
          console.log(err);
          // this.toastr.error("Please Check userId and password!",'Error');
          //  alert(err.message)
        }
      );
      this.ApiService.get('GetEquipmentList?n=2').subscribe(
        (res: any) => {
          this.data_model = res;
          this.EquipmentList = this.data_model;
          console.log('GetEquipmentList?n=2', this.EquipmentList);
          // console.log(JSON.stringify(res.user.role[0].roleName));
          // console.log(JSON.stringify(res.user.userName));
          // console.log(JSON.stringify(res.user))
        },
        (err: Error) => {
          //  debugger
          //  throw err;
          console.log(err);
          // this.toastr.error("Please Check userId and password!",'Error');
          //  alert(err.message)
        }
      );

      this.ApiService.get('GetCivilTenderList?n=2').subscribe(
        (res: any) => {
          this.data_model = res;
          this.CivilTenderList = this.data_model;
          console.log('GetCivilTenderList?n=2', this.CivilTenderList);
          // console.log(JSON.stringify(res.user.role[0].roleName));
          // console.log(JSON.stringify(res.user.userName));
          // console.log(JSON.stringify(res.user))
        },
        (err: Error) => {
          //  debugger
          //  throw err;
          console.log(err);
          // this.toastr.error("Please Check userId and password!",'Error');
          //  alert(err.message)
        }
      );
      this.ApiService.get('GetOtherTenderList?n=2').subscribe(
        (res: any) => {
          this.data_model = res;
          this.OtherTenderList = this.data_model;
          console.log('GetOtherTenderList?n=2', this.OtherTenderList);
          // console.log(JSON.stringify(res.user.role[0].roleName));
          // console.log(JSON.stringify(res.user.userName));
          // console.log(JSON.stringify(res.user))
        },
        (err: Error) => {
          //  debugger
          //  throw err;
          console.log(err);
          // this.toastr.error("Please Check userId and password!",'Error');
          //  alert(err.message)
        }
      );
      this.ApiService.get('GetMostVisitedContentList?n=2').subscribe(
        (res: any) => {
          this.data_model = res;
          this.VisitedContentList = this.data_model;
          console.log('GetMostVisitedContentList?n=2', this.VisitedContentList);
          // console.log(JSON.stringify(res.user.role[0].roleName));
          // console.log(JSON.stringify(res.user.userName));
          // console.log(JSON.stringify(res.user))
        },
        (err: Error) => {
          //  debugger
          //  throw err;
          console.log(err);
          // this.toastr.error("Please Check userId and password!",'Error');
          //  alert(err.message)
        }
      );
    } catch (err: any) {
      console.log(err);
      // throw err;
    }
  }

  isNewContent(publishingDate: string): boolean {
    // debugger
    // publishingDate="2025-05-05T00:00:00";
    const published = new Date(publishingDate);
    // console.log('published=',published );
    const today = new Date();
    // console.log('today=',today );

    // Difference in milliseconds
    const diffInMs = today.getTime() - published.getTime();
    // console.log('diffInMs=',diffInMs );

    // Convert to days
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    // Show "New" if published within last 7 days
    // console.log('diffInDays=',diffInDays );
    return diffInDays <= 7;
  }

  images3: string[] = [
    './assets/cgmsc imgs/WhatsApp Image 2025-05-06 at 2.20.37 AM.jpeg',
    './assets/cgmsc imgs/photo_1.jpg',
    './assets/cgmsc imgs/WhatsApp Image 2025-05-06 at 2.20.37 AM (1).jpeg',
    './assets/cgmsc imgs/photo_2.jpg',
    './assets/cgmsc imgs/WhatsApp Image 2025-05-06 at 2.20.37 AM.jpeg',
    './assets/cgmsc imgs/photo_3.jpg',
    './assets/cgmsc imgs/photo_5.jpg',
    './assets/cgmsc imgs/photo_6.jpg',
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
  images1: string[] = [
    './assets/images/News/news.JPG',
    './assets/images/News/Capture.JPG',
    './assets/images/News/img1.jpg.jfif',
    './assets/images/News/ba0ed618-ec63-4f2b-b977-786fbe807576.jfif',
    './assets/images/News/b2bdb353-f7ed-484b-9d12-f53e2c8cfe85.jfif',
    './assets/cgmsc imgs/ai-generated-8659507_640.jpg',
    './assets/cgmsc imgs/leaves-7590923_640.jpg',
    './assets/cgmsc imgs/butterfly-7632646_640.jpg',
    './assets/cgmsc imgs/bird-8442508_640.webp',
    // '/assets/cgmsc imgs/blue-8186653_640.webp',
    // '/assets/cgmsc imgs/bird-8469368_640.jpg',
    // '/assets/cgmsc imgs/bird-8788491_640.jpg'
  ];

  selectedIndex = 0;

  get selectedImage(): string {
    return this.images1[this.selectedIndex];
  }

  openModal(index: number) {
    this.selectedIndex = index;
    const modal = new bootstrap.Modal(document.getElementById('imageModal'));
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
    // <a href="https://cghealth.nic.in/public/#/" target="_blank" >
    //             <img alt="Natural" class="m-2  border rounded card-hover " src="https://cghealth.nic.in/public/assets/images/health-logo-67x67.png"></a>
    //             <!-- <img alt="Natural" class="m-2  border rounded card-hover " src="https://cghealth.nic.in/cghealth/api/files/other-health-portal/india1_gov_in.jpg"></a> -->
    //           <a href="https://eproc.cgstate.gov.in/CHEPS/security/getSignInAction.do" target="_blank" class="">
    //             <img alt="Natural" class="m-2 border rounded card-hover" src="assets\cgmsc imgs\CHEPS2.jfif"></a>
    //             <!-- <img alt="Natural" class="m-2 border rounded card-hover" src="https://eproc.cgstate.gov.in/CHEPS/img/chips-logo.png?OWASP_CSRFTOKEN=Q8AA-WA3Q-YJKR-PBJQ-E45O-E2YU-X2J3-QC37"></a> -->
    //             <!-- <img alt="Natural" class="m-2 border rounded card-hover" src="https://cghealth.nic.in/cghealth/api/files/other-health-portal/meraAspatal.jpg"></a> -->
    //           <a href="https://gem.gov.in/" target="_blank">
    //             <img alt="Natural" class="m-2 border rounded card-hover" src="assets\cgmsc imgs\gem-logo.png"></a>
    //             <!-- <img alt="Natural" class="m-2 border rounded card-hover" src="https://cghealth.nic.in/cghealth/api/files/other-health-portal/mygov.jpg"></a> -->
    //           <a href="https://cgstate.gov.in/" target="_blank">
    //             <img alt="Natural" class="m-2 border rounded card-hover" src="assets\cgmsc imgs\cg-govt1.png"></a>
    //             <!-- <img alt="Natural" class="m-2 border rounded card-hover" src="https://cghealth.nic.in/cghealth/api/files/other-health-portal/datagov.jpg"></a> -->
    //           <a href="https://dvdms.mohfw.gov.in/" target="_blank">
    //             <img alt="Natural" class="m-2 border rounded card-hover"
    //               src="assets\cgmsc imgs\dvdms logo.JPG"></a>
    //               <!-- src="https://cghealth.nic.in/cghealth/api/files/other-health-portal/quittobaco.jpg"></a> -->
 

}
