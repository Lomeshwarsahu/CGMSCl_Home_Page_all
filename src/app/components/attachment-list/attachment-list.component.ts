import { NgFor, NgStyle, CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MaterialModule } from 'src/app/material-module';
import { ContentAttachment, ContentHeader, Data_model } from 'src/app/model/model';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { ApiServiceService } from 'src/app/service/api-service.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { NgxSpinnerService } from 'ngx-spinner';
// import { NgxSpinnerModule } from 'ngx-spinner';
@Component({
  standalone: true,
  selector: 'app-attachment-list',
  imports: [
    NavbarComponent,
    NgFor,
    NgStyle,
    MaterialModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatTableExporterModule,
    CommonModule
  ],
  templateUrl: './attachment-list.component.html',
  styleUrl: './attachment-list.component.css',
})
export class AttachmentListComponent {
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('sort') sort!: MatSort;
  dataSource!: MatTableDataSource<ContentAttachment>;
  dispatchData: ContentAttachment[] = [];
  ContentHeader_data: ContentHeader[] = [];
  selectedColor:any;
  // displayedColumns: string[] = ['sno','caption','action'];
  displayedColumns: string[] = [
    'sno',

    
    'caption',
    'action',
  ];
  name:any;
  // sno:number;
  // fileName: string;
  // filePath: string;
  // caption: string;
  // displayNew: string;
  constructor(
    public Service: ApiServiceService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,private spinner: NgxSpinnerService
  ) {
    this.dataSource = new MatTableDataSource<ContentAttachment>([]);
  }

  ngOnInit(): void {
    this.selectedColor = sessionStorage.getItem('selectedColor');
    document.documentElement.style.setProperty('--theme-gradient', this.selectedColor );
    // this.Service.selectedColor$.subscribe(color => {
    //   // document.documentElement.style.setProperty('--theme-gradient', this.selectedColor);
    //   // this.selectedColor = color;
    // });
    this.route.queryParams.subscribe((params: { [key: string]: any }) => {
      // console.log(params['Id']);
      //  var attachment_Id=params['Id'];
      // console.log(attachment_Id);
      // name: 'Drug-Technical' 
    this.name=params['name'];
    this.GetContentHeader(params['Id']);
    // this.GetContentAttachment(params['Id']);
  });
  this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 3000); // hides after 3 seconds
    //   this.selectedColor = sessionStorage.getItem('selectedColor');
    // this.ApiService.selectedColor$.subscribe(color => {
    //   this.selectedColor = color;
    // });
  }
  // https://cgmsc.gov.in/Home/AttachmentList.aspx?a=202505000001
  // https://www.cgmsc.gov.in/himis_apin/api/WebCgmsc/GetContentAttachment?contentRegId=201408000001
  // https://www.cgmsc.gov.in/himis_apin/api/WebCgmsc/GetContentHeader?contentRegId=201408000001
  GetContentHeader(attachment_Id:any){
    try{
      this.spinner.show();

      this.Service.get(
        `GetContentHeader?contentRegId=${attachment_Id}`
      ).subscribe(
        (res) => {
          this.ContentHeader_data=res;
        this.spinner.hide();
        this.GetContentAttachment(attachment_Id);
          // this.ContentHeader_data=res[0]
          // console.log('GetContentHeader=:',res);
          // console.log('GetContentHeader2=:',this.ContentHeader_data);
        },
        (error) => {
          alert(`Error fetching data: ${JSON.stringify(error.message)}`);
        }
      );
    } catch (err: any) {
      this.spinner.hide();

      console.log(err);
      // throw err;
    }
  }

  GetContentAttachment(attachment_Id: any) {
    this.spinner.show();

    // console.log(attachment_Id);
    if (!attachment_Id) {
      console.error('Attachment Id is missing!');
      return;
    }
    try {
      // return
      this.Service.get(
        `GetContentAttachment?contentRegId=${attachment_Id}`
      ).subscribe(
        (res) => {
          this.dispatchData = res.map((item: Data_model, index: number) => ({
            ...item,
            sno: index + 1,
          }));
          // console.log('GetContentAttachment=:', this.dispatchData);
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
    } catch (err: any) {
      this.spinner.hide();

      console.log(err);
      // throw err;
    }
  }
  applyTextFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  exportToPDF() {}
  onButtonClick(fileName: any, URL: any) {
    if (fileName && URL) {
      // Remove '~' from the start of the URL
      const cleanedUrl = 'https://cgmsc.gov.in/' + URL.replace(/^~\//, '');
      console.log('Opening:', cleanedUrl);
      window.open(cleanedUrl, '_blank');
    } else {
      alert(
        '⚠️ Alert: Attachment File Not Found!\n\nThe requested document is missing.\nPlease try again later or contact support.'
      );
    }
  }
  // exportAsPDF() {
  //   const element = document.getElementById('workdetails');
  //   if (element) {
  //     // Check if the element is not null
  //     html2canvas(element, { scale: 2 }).then((canvas) => {
  //       const imgData = canvas.toDataURL('image/png');
  //       const pdf = new jsPDF({
  //         orientation: 'landscape',
  //       });
  //       pdf.addImage(imgData, 'PNG', 10, 10, 280, 190); // Adjust dimensions as needed
  //       pdf.save('work_details.pdf');
  //     });
  //   } else {
  //     console.error("Element with ID 'workdetails' not found.");
  //   }
  // }
}
