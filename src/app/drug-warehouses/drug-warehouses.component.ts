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
import {drugWarehouseInfo } from '../model/model';
import { ApiServiceService } from '../service/api-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-drug-warehouses',
  standalone: true,
    
  imports: [ NgFor,NgStyle,NavbarComponent,MaterialModule, MatSortModule, MatPaginatorModule,MatTableModule,NgSelectModule,FormsModule,
    MatTableExporterModule,CommonModule
  ],
  templateUrl: './drug-warehouses.component.html',
  styleUrl: './drug-warehouses.component.css'
})
export class DrugWarehousesComponent {
  // https://dpdmis.in/CGMSCHO_API2/api/HOTender/WhMangerSSODetail
  // https://cgmsc.gov.in/Doc/WareHouseLocation.pdf
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
    private router: Router,private spinner: NgxSpinnerService,private toastr:ToastrService
  ) {
    this.dataSource = new MatTableDataSource<drugWarehouseInfo>([]);
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
}
