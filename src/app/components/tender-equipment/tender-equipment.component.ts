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
@Component({
  standalone: true,
  selector: 'app-tender-equipment',
  imports: [ NgFor,NgStyle,NavbarComponent,MaterialModule, MatSortModule, MatPaginatorModule,MatTableModule, 
    MatTableExporterModule,CommonModule
  ],
  templateUrl: './tender-equipment.component.html',
  styleUrl: './tender-equipment.component.css'
})
export class TenderEquipmentComponent {
  // TenderEquip

 dataSource!: MatTableDataSource<Data_model>;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('sort') sort!: MatSort;
  dispatchData: Data_model[] = [];
  // DrugTenderList: Data_model []=[];
  displayedColumns: string[] = [
    'sno','subject','caption','content_Publising_Date','action'
  ];
  selectedColor:any;
  // displayedColumns: string[] = [
  //   'sno', 'url', 'content_Registration_Id', 'attachment_Id', 'caption',
  //   'content_Discription', 'subject', 'content_Subject', 'content_Publising_Date',
  //   'expiry_Date_of', 'expiry_DateOnNotice_Board', 'displayNew'
  // ];
 
  constructor(public Service: ApiServiceService, private cdr: ChangeDetectorRef, private router: Router,private spinner: NgxSpinnerService) {
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
      this.spinner.show();

      setTimeout(() => {
        this.spinner.hide();
      }, 3000); // hides after 3 seconds
      this.GetEquipmentListAll();
    }
// https://www.cgmsc.gov.in/himis_apin/api/WebCgmsc/GetEquipmentListAll
GetEquipmentListAll() {
      try{
        this.spinner.show();

      this.Service.get('GetEquipmentListAll')
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
            alert(`Error fetching data: ${JSON.stringify(error.message)}`);
          }
        );
      // debugger;
     
        
        //   this.Service.get('GetDrugTenderList?n=0').subscribe((res: any) => {
        //     //  this.data_model=res;
        //     //  this.DrugTenderList = this.data_model
        //     //   console.log(this.DrugTenderList);
        //       // console.log(JSON.stringify(res.user.role[0].roleName));
        //       // console.log(JSON.stringify(res.user.userName));
        //       // console.log(JSON.stringify(res.user))
    
        //   } ,
        //     (err: Error) => {
        //     //  debugger
        //     //  throw err;
        //     console.log(err);
        //     // this.toastr.error("Please Check userId and password!",'Error');
        //     //  alert(err.message)
        //    }
        //  );
        }
        catch(err:any){
          console.log(err);
          this.spinner.hide();

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
          queryParams: {Id: attachment_Id, name: 'Equipment-Technical' } 
        });

      }
}
