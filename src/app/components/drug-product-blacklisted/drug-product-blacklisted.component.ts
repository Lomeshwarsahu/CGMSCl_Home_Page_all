import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NgxSpinnerService } from 'ngx-spinner';
import { MaterialModule } from 'src/app/material-module';
import { BlacklistedFirm, drugProBlacklisted } from 'src/app/model/model';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-drug-product-blacklisted',
  standalone:true,
  imports: [NavbarComponent, MaterialModule, MatSortModule, MatPaginatorModule, 
  MatTableModule, NgSelectModule,FormsModule,MatTableExporterModule,CommonModule,TranslateModule
],

  templateUrl: './drug-product-blacklisted.component.html',
  styleUrl: './drug-product-blacklisted.component.css'
})
export class DrugProductBlacklistedComponent {
  dataSource!: MatTableDataSource<drugProBlacklisted>;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('sort') sort!: MatSort;
  dispatchData: drugProBlacklisted[]=[];
  displayedColumns: string[] = [
    'sno','nameofProduct','nameOfFirm','address','fromdate','upto','reasonOfBlacklisting'

  //   sno:number;
  // nameofProduct: string;
  // nameOfFirm: string;
  // address: string;
  // fromdate: string;
  // upto: string;
  // reasonOfBlacklisting: string;
  // spremarks: string;
  ];
  selectedColor:any;


   constructor(public Service: ApiServiceService, private cdr: ChangeDetectorRef, private router: Router,
    private spinner: NgxSpinnerService,private toastr: ToastrService,private translate: TranslateService,) {
        const lang = sessionStorage.getItem('language') || 'en';
        this.translate.use(lang);
    this.dataSource = new MatTableDataSource<drugProBlacklisted>([]);
    }

     ngOnInit(): void {
      // this.toastr.success('Toastr is working!', 'Success');
      this.selectedColor = sessionStorage.getItem('selectedColor');
      document.documentElement.style.setProperty('--theme-gradient', this.selectedColor );

      this.GetProductBlacklisted();

     }
     GetProductBlacklisted(){
     try{  this.spinner.show();
           this.Service.get(`GetProductBlacklisted`)
             .subscribe(
               (res) => {
                 this.dispatchData = res.map(
                   (item: drugProBlacklisted, index: number) => ({
                     ...item,
                     sno: index + 1,
                   })
                 );
                console.log('Get drug Pro Blacklisted =:', this.dispatchData);
                 this.dataSource.data = this.dispatchData;
                 this.dataSource.paginator = this.paginator;
                 this.dataSource.sort = this.sort;
                 this.cdr.detectChanges();
                 this.spinner.hide();
               },
               (error) => {
                this.spinner.hide();
                this.toastr.error(`Error fetching data: ${error.message}`, 'Error');
                //  alert(`Error fetching data: ${JSON.stringify(error)}`);
               }
             );
             }
             catch(err:any){
               this.spinner.hide();
               this.toastr.error(`Error fetching data: ${err.message}`, 'Error!');
               // throw err;
             }
         }
   
          applyTextFilter(event: Event) {
           const filterValue = (event.target as HTMLInputElement).value;
           this.dataSource.filter = filterValue.trim().toLowerCase();
         }
}
