import { CommonModule, NgFor, NgStyle } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/guards/auth-service.service';
import { Base } from 'src/app/helper/base';
import { MaterialModule } from 'src/app/material-module';
import { drugWarehouseInfo, NoticCircular } from 'src/app/model/model';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-notice-circular',
  standalone: true,
    
  imports: [ NavbarComponent,MaterialModule, MatSortModule, MatPaginatorModule,MatTableModule,NgSelectModule,FormsModule,
    MatTableExporterModule,CommonModule,TranslateModule
  ],
  templateUrl: './notice-circular.component.html',
  styleUrl: './notice-circular.component.css'
})
export class NoticeCircularComponent {
  selectedColor:any;
  dataSource!: MatTableDataSource<NoticCircular>;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('sort') sort!: MatSort;
  dispatchData: NoticCircular[] = [];
  base:any;
  displayedColumns: string[] = [
    'sno','content_Subject','content_Publising_Date','countATT','department','content_Discription','action'
   
  ];
  constructor(public Service: ApiServiceService, private cdr: ChangeDetectorRef, 
    private router: Router,private spinner: NgxSpinnerService,private toastr:ToastrService,private translate: TranslateService
  ) {
    this.dataSource = new MatTableDataSource<NoticCircular>([]);
this.base=Base;
const lang = sessionStorage.getItem('language') || 'en';
this.translate.use(lang);
  }

  ngOnInit(): void {
    this.selectedColor = sessionStorage.getItem('selectedColor');
    document.documentElement.style.setProperty('--theme-gradient', this.selectedColor );
    this.GetNoticCircular();
  }
  // https://www.cgmsc.gov.in/himis_apin/api/WebCgmsc/GetNoticCircular

  GetNoticCircular(){
        try{
          this.spinner.show();
        this.Service.get('GetNoticCircular')
          .subscribe(
            (res) => {
              this.dispatchData = res.map(
                (item: NoticCircular, index: number) => ({
                  ...item,
                  sno: index + 1,
                })
              );
              // console.log('NoticCircular =:', this.dispatchData);
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
        // const filePath ='https://cgmsc.gov.in/Doc/WareHouseLocation.pdf';
        // window.open(filePath, '_blank');
      }

      onButtonClick(attachment_Id:any){
        // console.log(attachment_Id);
        // this.router.navigate(['/AttachmentList']);
        // alert('file not found')
        // return;
        // this.router.navigate(['/AttachmentList'], { 
        //   queryParams: {Id: attachment_Id, name: 'Notice/Circular' } 
        // });
        const encryptedId = this.base.encryptUsingAES256(attachment_Id);
    
        this.router.navigate(['/AttachmentList'], {
          queryParams: { Id: encryptedId, name: 'Notice/Circular' },
        });
      }

      // isNewContent(publishingDate: string): boolean {
      //   console.log('Raw input:', publishingDate);
      
      //   if (!publishingDate) return false;
      
      //   // Split and convert MM/DD/YYYY to a Date object
      //   const parts = publishingDate.split('/');
      //   if (parts.length !== 3) {
      //     console.warn('Invalid date format:', publishingDate);
      //     return false;
      //   }
      
      //   const [month, day, year] = parts.map(part => parseInt(part, 10));
      //   const published = new Date(year, month - 1, day); // JS month is 0-indexed
      
      //   if (isNaN(published.getTime())) {
      //     console.error('Parsed date is invalid:', published);
      //     return false;
      //   }
      
      //   const today = new Date();
      //   published.setHours(0, 0, 0, 0);
      //   today.setHours(0, 0, 0, 0);
      
      //   const diffInMs = today.getTime() - published.getTime();
      //   const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      
      //   console.log('Published:', published, 'Today:', today, 'DiffInDays:', diffInDays);
      
      //   return diffInDays <= 7;
      // }
      
      // isNewContent(publishingDate: string): boolean {
      //   if (!publishingDate) {
      //     console.warn('Missing date:', publishingDate);
      //     return false;
      //   }
      
      //   const published = new Date(publishingDate);
      //   if (isNaN(published.getTime())) {
      //     console.error('Invalid date format:', publishingDate);
      //     return false;
      //   }
      
      //   const today = new Date();
      //   published.setHours(0, 0, 0, 0);
      //   today.setHours(0, 0, 0, 0);
      
      //   const diffInMs = today.getTime() - published.getTime();
      //   const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      
      //   console.log('Published:', published, 'Today:', today, 'DiffInDays:', diffInDays);
      
      //   return diffInDays <= 7;
      // }
      
      // isNewContent(publishingDate: string): boolean {
      //   console.log('Checking date:', publishingDate);
      
      //   const published = new Date(publishingDate);
      //   const today = new Date();
      
      //   published.setHours(0, 0, 0, 0);
      //   today.setHours(0, 0, 0, 0);
      
      //   const diffInMs = today.getTime() - published.getTime();
      //   const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      
      //   console.log('Published:', published, 'Today:', today, 'DiffInDays:', diffInDays);
      
      //   return diffInDays <= 7;
      // }
      
      
  // isNewContent(publishingDate: string): boolean {
  //   // alert(publishingDate);
  //   // debugger
  //   // publishingDate="2025-05-05T00:00:00";
  //   const published = new Date(publishingDate);
  //   console.log('published=',published );
  //   const today = new Date();
  //   // console.log('today=',today );

  //   // Difference in milliseconds
  //   const diffInMs = today.getTime() - published.getTime();
  //   // console.log('diffInMs=',diffInMs );

  //   // Convert to days
  //   const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  //   // Show "New" if published within last 7 days
  //   // console.log('diffInDays=',diffInDays );
  //   return diffInDays <= 7;
  // }
  isNewContent(publishingDate: string): boolean {
    if (!publishingDate) return false;
  
    // Safe parse from 'DD/MM/YYYY'
    const parts = publishingDate.split('/');
    if (parts.length !== 3) return false;
  
    const [day, month, year] = parts.map(part => parseInt(part, 10));
    const published = new Date(year, month - 1, day); // month is 0-based
  
    if (isNaN(published.getTime())) {
      console.error('Invalid publishing date:', publishingDate);
      return false;
    }
  
    const today = new Date();
    published.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
  
    const diffInMs = today.getTime() - published.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  
    return diffInDays <= 7;
  }
  
}
