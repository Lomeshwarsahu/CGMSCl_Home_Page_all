import { NgFor, NgStyle, CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NgxSpinnerService } from 'ngx-spinner';
import { MaterialModule } from 'src/app/material-module';
import { BlacklistedFirm, Data_model, Employee, Employee_dpt } from 'src/app/model/model';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blacklisted-firm',
  imports: [ NgFor, NgStyle, NavbarComponent, MaterialModule, MatSortModule, MatPaginatorModule, MatTableModule, NgSelectModule, FormsModule,MatTableExporterModule,CommonModule],
  templateUrl: './blacklisted-firm.component.html',
  styleUrl: './blacklisted-firm.component.css'
})
export class BlacklistedFirmComponent {
dataSource!: MatTableDataSource<BlacklistedFirm>;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('sort') sort!: MatSort;
  dispatchData: BlacklistedFirm[] = [];
  displayedColumns: string[] = [
    'sno','nameOfFirm','address','fromdate','upto','reasonOfBlacklisting'
  //   sno:number;
  // fullName: string;
  // designation: string;
  // department: number;
  // emailId: number;
  // contactNo: number;
  ];
  selectedColor:any;


   constructor(public Service: ApiServiceService, private cdr: ChangeDetectorRef, private router: Router,private spinner: NgxSpinnerService) {
    this.dataSource = new MatTableDataSource<BlacklistedFirm>([]);
    }

     ngOnInit(): void {
      this.selectedColor = sessionStorage.getItem('selectedColor');
      document.documentElement.style.setProperty('--theme-gradient', this.selectedColor );

      this.GetBlackListedFirmList();
      
      this.spinner.show();

      setTimeout(() => {
        this.spinner.hide();
      }, 3000); // hides after 3 seconds
      

     }

      GetBlackListedFirmList( ){
        try{
          
          this.spinner.show();
        this.Service.get(`GetEqpBlacklistedFirms`)
        // this.Service.get('GetDrugTenderList?n=0')
          .subscribe(
            (res) => {
              this.dispatchData = res.map(
                (item: Data_model, index: number) => ({
                  ...item,
                  sno: index + 1,
                })
              );
             // console.log('Get Black Listed Firm =:', this.dispatchData);
              this.dataSource.data = this.dispatchData;
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              this.cdr.detectChanges();
              this.spinner.hide();
            },
            (error) => {
  
              alert(`Error fetching data: ${JSON.stringify(error.message)}`);
            }
          );
          }
          catch(err:any){
            this.spinner.hide();
  
            console.log(err);
            // throw err;
          }
      }

       applyTextFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
      }

      exportToPDF(){

      }

}
