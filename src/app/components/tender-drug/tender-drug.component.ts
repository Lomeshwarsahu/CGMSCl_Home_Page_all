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
import { NgxSpinnerService } from "ngx-spinner";
// import { MaterialModule } from './material-module';
// import { MatTableExporterModule } from 'mat-table-exporter';
import { ToastrService,ToastrModule } from 'ngx-toastr';
import { map } from 'rxjs';
interface UiRow extends Data_model {

  rowSpan: number;   
  groupIndex: number;       
}
//  interface AttachmentFile {
//   fileName:  string;
//   filePath:  string;
//   caption:   string;
//   displayNew:string;
//   entryDT:   string;
// }
@Component({
  standalone: true,
  selector: 'app-tender-drug',

  imports: [
    NavbarComponent,
    MaterialModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatTableExporterModule,
    CommonModule,
    ToastrModule,
  ],
  templateUrl: './tender-drug.component.html',
  styleUrl: './tender-drug.component.css',
})

export class TenderDrugComponent {

  dataSource!: MatTableDataSource<Data_model>;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('sort') sort!: MatSort;
  @ViewChild('paginator1') paginator1!: MatPaginator;
  @ViewChild('sort1') sort1!: MatSort;
  dispatchData: Data_model[] = [];
  // DrugTenderList: Data_model []=[];
  displayedColumns: string[] = [
    'sno',
    'subject',
    'caption',
    'content_Publising_Date',
    'action',
  ];
  selectedColor: any;
  // displayedColumns: string[] = [
  //   'sno', 'url', 'content_Registration_Id', 'attachment_Id', 'caption',
  //   'content_Discription', 'subject', 'content_Subject', 'content_Publising_Date',
  //   'expiry_Date_of', 'expiry_DateOnNotice_Board', 'displayNew'
  // ];
  constructor(
    public Service: ApiServiceService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.dataSource = new MatTableDataSource<Data_model>([]);
  }


  ngOnInit(): void {
    this.selectedColor = sessionStorage.getItem('selectedColor');
    document.documentElement.style.setProperty(
      '--theme-gradient',
      this.selectedColor
    );
    // this.Service.selectedColor$.subscribe(color => {
    //   this.selectedColor = sessionStorage.getItem('selectedColor');
    //   document.documentElement.style.setProperty('--theme-gradient', this.selectedColor);
    //   // this.selectedColor = color;
    // });

    this.GetDrugTenderList();
  }
  // https://www.cgmsc.gov.in/himis_apin/api/WebCgmsc/GetDrugTenderListAll
  // https://www.cgmsc.gov.in/himis_apin/api/WebCgmsc/',
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
  // https://www.cgmsc.gov.in/himis_apin/api/WebCgmsc/GetDrugTenderListAll
  // https://www.cgmsc.gov.in/himis_apin/api/WebCgmsc/',
  GetDrugTenderList() {
    try {
      this.spinner.show();
      this.Service.get('GetDrugTenderListAll').subscribe(
        (res: any) => {
          // console.log(JSON.stringify('res',res));
          const finalList = this.prepareRows(res);
          this.dispatchData = finalList;
          this.dataSource.data = finalList;
          this.dataSource.paginator = this.paginator1;
          this.dataSource.sort = this.sort1;
          this.cdr.detectChanges();
          this.spinner.hide();
        },
        (err: any) => {
          this.spinner.hide();
          this.toastr.error(`Error fetching data: ${err.message}`, 'Error!');
        }
      );
    } catch (err: any) {
      this.spinner.hide();
      this.toastr.error(`Error fetching data: ${err.message}`, 'Error!');
      // console.log(err);
      // throw err;
    }
  }

  // nfjsdnfks

  // GetDrugTenderList() {
  //   // debugger;
  //   try{
  //     this.spinner.show();
  //   this.Service.get('GetDrugTenderListAll')
  //   // this.Service.get('GetDrugTenderList?n=0')
  //     .subscribe(
  //       (res) => {
  //         this.dispatchData = res.map(
  //           (item: Data_model, index: number) => ({
  //             ...item,
  //             sno: index + 1,
  //           })
  //         );
  //         // console.log('GetDrugTenderList=:', this.dispatchData);
  //         this.dataSource.data = this.dispatchData;
  //         this.dataSource.paginator = this.paginator1;
  //         this.dataSource.sort = this.sort1;
  //         this.cdr.detectChanges();
  //         this.spinner.hide();
  //       },
  //       (error) => {
  //         this.spinner.hide();

  //         this.toastr.error(`Error fetching data: ${error.message}`, 'Error!');
  //         // alert(`Error fetching data: ${JSON.stringify(error.message)}`);
  //       }
  //     );
  //     }
  //     catch(err:any){
  //       this.spinner.hide();
  //       this.toastr.error(`Error fetching data: ${err.message}`, 'Error!');
  //       // console.log(err);
  //       // throw err;
  //     }
  //   }
  applyTextFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  exportToPDF() {}

  onButtonClick(attachment_Id: any) {
    // console.log(attachment_Id);
    // this.router.navigate(['/AttachmentList']);
    this.router.navigate(['/AttachmentList'], {
      queryParams: { Id: attachment_Id, name: 'Drug-Technical' },
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
            const cleanedUrl = 'https://cgmsc.gov.in/' + filePath.replace(/^~\//, '');
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
