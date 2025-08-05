import { NgFor, NgStyle, CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MaterialModule } from '../material-module';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {drugWarehouseInfo, WarehouseInfo } from '../model/model';
import { ApiServiceService } from '../service/api-service.service';
import { ToastrService } from 'ngx-toastr';
import { GoogleMap, GoogleMapsModule, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
declare var bootstrap: any;
@Component({
  selector: 'app-drug-warehouses',
  standalone: true,
    
  imports: [ NavbarComponent,MaterialModule, MatSortModule, MatPaginatorModule,MatTableModule,NgSelectModule,FormsModule,GoogleMapsModule,
    MatTableExporterModule,CommonModule,TranslateModule
  ],
  templateUrl: './drug-warehouses.component.html',
  styleUrl: './drug-warehouses.component.css'
})
export class DrugWarehousesComponent {
  // https://dpdmis.in/CGMSCHO_API2/api/HOTender/WhMangerSSODetail
  // https://cgmsc.gov.in/Doc/WareHouseLocation.pdf
  @ViewChild('map', { static: false }) map!: GoogleMap;
  // center = { lat: 21.2951, lng: 81.8282 }; 
  zoom = 12;
  // center: LatLngLiteral = { lat: 21.136478, lng: 81.78643421 };
  center: google.maps.LatLngLiteral = {
    lat: 21.136478,
    lng: 81.78643421
  };
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
  };
  // center: google.maps.LatLngLiteral = {
  
  //   // lat: 21.136663,
  //   // lng: 81.78665921
  //   lat: 21.136478,
  //   lng: 81.78643421,
  // };
  // markerOptions: MarkerOptions = { draggable: false };
  markerPos: google.maps.LatLngLiteral = this.center;
  // markerPos: LatLngLiteral = this.center;
  selectedWarehouse: any = null;
  warehouseInfo: WarehouseInfo[] = [];
  @ViewChild(MapInfoWindow, { static: false }) infoWindow!: MapInfoWindow;
  dataSource!: MatTableDataSource<drugWarehouseInfo>;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('sort') sort!: MatSort;
  dispatchData: drugWarehouseInfo[] = [];
  displayedColumns: string[] = [
    'sno','warehousename','address','amName','amMobileNo','soName','soMobileNo',
    // 'sno','warehouseId','warehousename','address','amId','amName','amMobileNo','soMobileNo','soId','soName'
   
  ];
  selectedColor:any;
  constructor(public Service: ApiServiceService, private cdr: ChangeDetectorRef, 
    private router: Router,private spinner: NgxSpinnerService,private toastr:ToastrService,private translate:TranslateService
  ) {
    this.dataSource = new MatTableDataSource<drugWarehouseInfo>([]);
    const lang = sessionStorage.getItem('language') || 'en';
    this.translate.use(lang);
    }
  

    ngOnInit(): void {
      this.selectedColor = sessionStorage.getItem('selectedColor');
      document.documentElement.style.setProperty('--theme-gradient', this.selectedColor );

      this.GetEmployeeList();
      this.spinner.show();
    }

      GetEmployeeList( ){
        try{
          this.spinner.show();
        this.Service.getWarehouse()
        // this.Service.get('GetDrugTenderList?n=0')
          .subscribe(
            (res) => {
              this.dispatchData = res.map(
                (item: drugWarehouseInfo, index: number) => ({
                  ...item,
                  sno: index + 1,
                })
              );
              // console.log('drugWarehouseInfo =:', this.dispatchData);
              this.dataSource.data = this.dispatchData;
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              this.cdr.detectChanges();
              this.spinner.hide();
            },
            (error) => {
              this.spinner.hide();
              this.toastr.error(`Error fetching data: ${error.message}`, 'Error!');
              // alert(`Error fetching data: ${JSON.stringify(error.message)}`);
            }
          );
          }
          catch(err:any){
            this.spinner.hide();
            this.toastr.error(`Error fetching data: ${err.message}`, 'Error!');
            // console.log(err);
            // throw err;
          }
      }
      applyTextFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
      }
      exportToPDF(){
        const filePath ='https://cgmsc.gov.in/Doc/WareHouseLocation.pdf';
        window.open(filePath, '_blank');
      }

      onButtonClick(attachment_Id:any){
        // console.log(attachment_Id);
        // this.router.navigate(['/AttachmentList']);
        this.router.navigate(['/AttachmentList'], { 
          queryParams: {Id: attachment_Id, name: 'Drug-Technical' } 
        });

      }

    
      onButtonClick1(lat: any, lng: any){
        const modal = new bootstrap.Modal(document.getElementById('imageModal1'));
        modal.show();
       
          const latNum = +lat;          
          const lngNum = +lng;
      
       
          this.center = { lat: latNum, lng: lngNum };
          // this.markerPos = { lat: latNum, lng: lngNum };
      }
      openInfo( marker: MapMarker) {
        // this.selectedWarehouse = warehouse; // Update the selected warehouse details
        if (this.infoWindow) {
          this.infoWindow.open(marker); // Open the InfoWindow at the clicked marker
        } else {
          console.error('InfoWindow instance not found');
        }
      }

      shareLocation(lat: number, lng: number) {
       
        const url = `https://www.google.com/maps?q=${lat},${lng}`;
        if (navigator.share) {
          navigator
            .share({
              title: '📍 Location',
              text: 'Check out this place on Google Maps!',
              url: url,
            })
            .then(() => this.toastr.success('Successfully shared', 'Success'))//alert('Successfully shared'))
            .catch((error) =>   this.toastr.error('Error sharing:', 'Error!')); //console.error('Error sharing:', error));
        } else {
          this.toastr.error('Web Share API is not supported in your browser.', 'Error!');
          // alert('Web Share API is not supported in your browser.');
        }
      
        // // Copy to clipboard
        // navigator.clipboard.writeText(url).then(() => {
        //   alert('Location link copied to clipboard:\n' + url);
        // }).catch(err => {
        //   console.error('Clipboard copy failed', err);
        // });
        // window.open(`https://wa.me/?text=Check this location: ${url}`, '_blank');
        // Optional: Open WhatsApp directly (mobile/desktop supported)
        // window.open(`https://wa.me/?text=${encodeURIComponent('Check this location: ' + url)}`, '_blank');

      
          
      
      }
      
}
