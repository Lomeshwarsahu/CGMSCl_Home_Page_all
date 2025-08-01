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
interface UiRow extends Data_model {
  rowSpan: number;   
  groupIndex: number;       
}
@Component({
  standalone: true,
  selector: 'app-tender-equipment',
  imports: [NavbarComponent,MaterialModule, MatSortModule, MatPaginatorModule,MatTableModule, 
    MatTableExporterModule,CommonModule,ToastrModule
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
 
  constructor(public Service: ApiServiceService, private cdr: ChangeDetectorRef, private router: Router,private spinner: NgxSpinnerService,private toastr: ToastrService) {
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
      // this.spinner.show();
      this.GetEquipmentListAll();
    }
// https://www.cgmsc.gov.in/himis_apin/api/WebCgmsc/GetEquipmentListAll
GetEquipmentListAll() {
      try{
        this.spinner.show();

      this.Service.get('GetEquipmentListAll')
      // this.Service.get('GetDrugTenderList?n=0')
        .subscribe(
          // (res) => {
          //   this.dispatchData = res.map(
          //     (item: Data_model, index: number) => ({
          //       ...item,
          //       sno: index + 1,
          //     })
          //   );
          //   console.log('GetEquipmentListAll=:', this.dispatchData);
          //   this.dataSource.data = this.dispatchData;
          //   this.dataSource.paginator = this.paginator;
          //   this.dataSource.sort = this.sort;
          //   this.cdr.detectChanges();
          //   this.spinner.hide();
          // },
          (res: any) => {
            // const finalList = this.dedupeSubjectAndSnoVisually(res);
            const finalList = this.prepareRows(res);
            this.dispatchData = finalList;
            this.dataSource.data = finalList;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.cdr.detectChanges();
            this.spinner.hide();
          },
         
          (error) => {
            this.spinner.hide();
            // this.toastr.error('Something went wrong!', 'Error');
            // alert(`Error fetching data: ${JSON.stringify(error.message)}`);
            this.toastr.error(`Error fetching data: ${error.message}`, 'Error');

          }
        );
        }
        catch(err:any){
          // console.log(err);
          this.spinner.hide();
          this.toastr.error(`Error fetching data: ${err.message}`, 'Error');
          // throw err;
        }
      }

      isNewContent(publishingDate: string): boolean {
        const parts = publishingDate.split('/');
        if (parts.length === 3) {
          const day = parseInt(parts[0], 10);
          const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
          const year = parseInt(parts[2], 10);
      
          const published = new Date(year, month, day);
          const today = new Date();
      
          // Reset time portion to midnight for both
          published.setHours(0, 0, 0, 0);
          today.setHours(0, 0, 0, 0);
      
          const diffInMs = today.getTime() - published.getTime();
          const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      
          return diffInDays >= 0 && diffInDays <= 7; // Only within past 7 days
        }
      
        return false; // If invalid format
      }

  prepareRows(data: Data_model[]): UiRow[] {
    const out: UiRow[] = [];
    let sno = 1, group = 0;
  
    for (let i = 0; i < data.length;) {
      const key = (data[i].subject || '').trim().toLowerCase();
      let span = 1;
      while (i + span < data.length &&
        (data[i + span].subject || '').trim().toLowerCase() === key) {
        span++;
      }
  
      group++;
      out.push({ ...data[i], sno: sno++, rowSpan: span, groupIndex: group });
  
      for (let k = 1; k < span; k++) {
        out.push({
          ...data[i + k],
          sno: '' as any,
          subject: '',
          rowSpan: 0,
          groupIndex: group
        });
      }
  
      i += span;
    }
  
    return out;
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

GetContentAttachment(attachment_Id: string) {
  // debugger
  if (!attachment_Id) {
    this.toastr.error('Attachment Id is missing!', 'Error!');
    return;
  }
  this.spinner.show();
  this.Service.get(`GetContentAttachment?contentRegId=${attachment_Id}`)
    .subscribe({
      next: (res) => {
        const first = res[0];
        if (first) {
          const { fileName, filePath } = first;
          // console.log('FileName:', fileName);
          // console.log('FilePath:', filePath);
          if (fileName && filePath) {
            // Remove '~' from the start of the URL
            const cleanedUrl = 'https://cgmsc.gov.in/cgmscl/' + filePath.replace(/^~\//, '');
            console.log('Opening:', cleanedUrl);
            window.open(cleanedUrl, '_blank');
          } else {
            this.toastr.error('⚠️ Alert: Attachment File Not Found!\n\nThe requested document is missing.\nPlease try again later or contact support.', 'Error!');
            // alert(
            //   '⚠️ Alert: Attachment File Not Found!\n\nThe requested document is missing.\nPlease try again later or contact support.'
            // );
          }
          /* Example: direct download / open
             window.open(filePath, '_blank');
          */

        } else {
          this.toastr.warning('No attachment data returned!', 'Warning');
        }
        this.spinner.hide();
      },
      error: (err) => {
        this.spinner.hide();
        this.toastr.error(`Error fetching data: ${err.message}`, 'Error!');
      }
    });
}
}
