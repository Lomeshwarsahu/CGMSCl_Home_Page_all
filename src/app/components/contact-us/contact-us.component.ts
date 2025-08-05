import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Router, RouterModule } from '@angular/router';
import { AuthServiceService } from 'src/app/guards/auth-service.service';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { DivisionOfficeLocationComponent } from '../division-office-location/division-office-location.component';
import { WarehouseLocationComponent } from '../warehouse-location/warehouse-location.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-contact-us',
  imports: [
    NavbarComponent,
    FormsModule,
    CommonModule,
    RouterModule,
    GoogleMapsModule,
    DivisionOfficeLocationComponent,
    WarehouseLocationComponent,TranslateModule
  ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  selectedColor:any;
  zoom = 20;
  center: google.maps.LatLngLiteral = {
    // lat: 21.136663,
    // lng: 81.78665921
    lat: 21.136499,
    lng: 81.78643548,
  };

  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
  };
  isOnline: boolean = navigator.onLine;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow!: MapInfoWindow;
  constructor(public authService: AuthServiceService, private router: Router, private ApiService:ApiServiceService,private translate: TranslateService) {
    const lang = sessionStorage.getItem('language') || 'en';
    this.translate.use(lang);
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
}
