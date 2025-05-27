import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { GoogleMap, GoogleMapsModule, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Router, RouterModule } from '@angular/router';
import { AuthServiceService } from 'src/app/guards/auth-service.service';
import { WarehouseInfo } from 'src/app/model/model';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-division-office-location',
  standalone: true,
  imports: [CommonModule,RouterModule,GoogleMapsModule],  
  templateUrl: './division-office-location.component.html',
  styleUrl: './division-office-location.component.css'
})
export class DivisionOfficeLocationComponent {
  @ViewChild('map', { static: false }) map!: GoogleMap;
  center: google.maps.LatLngLiteral = { lat: 21.2787, lng: 81.8661 };
  zoom = 8;
  
  selectedWarehouse: any = null;
  warehouseInfo: WarehouseInfo[] = [];
  @ViewChild(MapInfoWindow, { static: false }) infoWindow!: MapInfoWindow;
  constructor(public authService: AuthServiceService, private router: Router,private ApiService:ApiServiceService,private cdRef: ChangeDetectorRef) {

 }
    ngOnInit(): void {
     this.GetWarehouse_Location();
    }
    // divisions = [
    //   { id: 'D1004', name: 'Raipur ', color: '#2196F3' },
    //   { id: 'D1017', name: 'Saruguja ', color: '#4CAF50' },
    //   { id: 'D1024', name: 'Bilaspur ', color: '#FFC107' },
    //   { id: 'D1001', name: 'Durg ', color: '#F44336' },
    //   { id: 'D1031', name: 'Baster ', color: '#9C27B0' },
    // ];
    // GetWarehouse_Location() {
    //   this.ApiService.getWarehouseInfo(0).subscribe((res) => {
    //     console.info('res=',res);
    //     this.warehouseInfo = res.map((item: any) => ({
    //       ...item,
    //       position: {
    //         lat: parseFloat(item.latitude),
    //         lng: parseFloat(item.longitude),
    //       },
    //     }));
    //   });
    // }
    GetWarehouse_Location() {
      const allowedNames = ['Bilaspur', 'Raipur', 'Durg', 'Kanker', 'Ambikapur']; // <- Sirf ye naam chahiye
    
      this.ApiService.getWarehouseInfo(0).subscribe((res) => {
        console.info('res=', res);
    
        this.warehouseInfo = res
          .filter((item: any) => allowedNames.includes(item.warehousename))
          .map((item: any) => ({
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
