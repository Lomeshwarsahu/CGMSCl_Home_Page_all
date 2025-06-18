import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material-module';
import { CommonModule, NgFor, NgStyle } from '@angular/common';
import { Data_model } from 'src/app/model/model';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { MatTableExporterModule } from 'mat-table-exporter';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService,ToastrModule } from 'ngx-toastr';

// import { MaterialModule } from './material-module';
// import { MatTableExporterModule } from 'mat-table-exporter';
@Component({
  standalone: true,
    selector: 'app-tender-drug',
    imports: [ NgFor,NgStyle,NavbarComponent,MaterialModule, MatSortModule, MatPaginatorModule,MatTableModule, 
      MatTableExporterModule,CommonModule,ToastrModule
    ],
  templateUrl: './tender-other-tender.component.html',
  styleUrl: './tender-other-tender.component.css'
})
export class TenderOtherTenderComponent {
 dataSource!: MatTableDataSource<Data_model>;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('sort') sort!: MatSort;
  dispatchData: Data_model[] = [];
  // DrugTenderList: Data_model []=[];
  displayedColumns: string[] = [
    'sno','subject','caption','content_Publising_Date','action'
  ];
  selectedColor: any;
  // displayedColumns: string[] = [
  //   'sno', 'url', 'content_Registration_Id', 'attachment_Id', 'caption',
  //   'content_Discription', 'subject', 'content_Subject', 'content_Publising_Date',
  //   'expiry_Date_of', 'expiry_DateOnNotice_Board', 'displayNew'
  // ];
  constructor(public Service: ApiServiceService, private cdr: ChangeDetectorRef, private router: Router,
     private toastr: ToastrService,private spinner: NgxSpinnerService) {
    this.dataSource = new MatTableDataSource<Data_model>([]);
    }
  

    ngOnInit(): void {
        this.selectedColor = sessionStorage.getItem('selectedColor');
      document.documentElement.style.setProperty('--theme-gradient', this.selectedColor );
      // this.Service.selectedColor$.subscribe(color => {
      //   this.selectedColor = sessionStorage.getItem('selectedColor');
      //   document.documentElement.style.setProperty('--theme-gradient', this.selectedColor);
      //   // this.selectedColor = color;
      // });
      this.GetDrugTenderList();
    }
// https://www.cgmsc.gov.in/himis_apin/api/WebCgmsc/GetDrugTenderListAll
// https://www.cgmsc.gov.in/himis_apin/api/WebCgmsc/',
    GetDrugTenderList() {
      try{
        this.spinner.show();

      this.Service.get('GetOtherTenderListAll')
      // this.Service.get('GetDrugTenderList?n=0')
        .subscribe(
          (res) => {
            this.dispatchData = res.map(
              (item: Data_model, index: number) => ({
                ...item,
                sno: index + 1,
              })
            );
            // console.log('GetDrugTenderList=:', this.dispatchData);
            this.dataSource.data = this.dispatchData;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.cdr.detectChanges();
            this.spinner.hide();
          },
          (error) => {
            this.spinner.hide();
            // alert(`Error fetching data: ${JSON.stringify(error.message)}`);
            this.toastr.error(`Error fetching data: ${error}`, 'Error');

          }
        );
        }
        catch(err:any){
          this.spinner.hide();
          this.toastr.error(`Error fetching data: ${err.message}`, 'Error');

          // console.log(err);
          // throw err;
        }
      }
      applyTextFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
      }
      exportToPDF(){

      }

      onButtonClick(attachment_Id:any){
        // console.log(attachment_Id);
        // this.router.navigate(['/AttachmentList']);
        this.router.navigate(['/AttachmentList'], { 
          queryParams: {Id: attachment_Id, name: 'Other Tender (Technical)' } 
        });

      }

            // Example: convert "30/05/2025" to Date object
convertToDate(d: string): Date | null {
  const parts = d.split('/');
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Months are 0-based
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }
  return null;
}
}

