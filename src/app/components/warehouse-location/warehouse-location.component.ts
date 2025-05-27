import { CommonModule } from '@angular/common';
import { GoogleMapsModule, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Router, RouterModule } from '@angular/router';
import { AuthServiceService } from 'src/app/guards/auth-service.service';
import { WarehouseInfo } from 'src/app/model/model';
import { ApiServiceService } from 'src/app/service/api-service.service';

import { Component, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-warehouse-location',
  standalone: true,
    
    imports: [CommonModule,RouterModule,GoogleMapsModule,],
  templateUrl: './warehouse-location.component.html',
  styleUrl: './warehouse-location.component.css'
})
export class WarehouseLocationComponent {
  @ViewChild('map', { static: false }) map!: GoogleMap;
  center = { lat: 21.2951, lng: 81.8282 }; // Approx center of CG
  zoom = 7;

  selectedWarehouse: any = null;
  warehouseInfo: WarehouseInfo[] = [];
  @ViewChild(MapInfoWindow, { static: false }) infoWindow!: MapInfoWindow;
  constructor(public authService: AuthServiceService, private router: Router,private ApiService:ApiServiceService,private cdRef: ChangeDetectorRef) {

 }
    ngOnInit(): void {
     this.GetWarehouse_Location();
    }
    GetWarehouse_Location() {
      this.ApiService.getWarehouseInfo(0).subscribe((res) => {
        console.info('res=',res);
        this.warehouseInfo = res.map((item: any) => ({
          ...item,
          position: {
            lat: parseFloat(item.latitude),
            lng: parseFloat(item.longitude),
          },
        }));
      });
    }
    onMarkerClick(warehouse: any, marker: MapMarker) {
      this.selectedWarehouse = warehouse; // Update the selected warehouse details
      if (this.infoWindow) {
        this.infoWindow.open(marker); // Open the InfoWindow at the clicked marker
      } else {
        console.error('InfoWindow instance not found');
      }
    }








}
