import { CommonModule } from '@angular/common';
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
import { Base } from 'src/app/helper/base';
import { MaterialModule } from 'src/app/material-module';
import { ContentCategory, results_notice_recruitment } from 'src/app/model/model';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-recruitment-archive',
  standalone: true,
  imports: [
    NavbarComponent,
    MaterialModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    NgSelectModule,
    FormsModule,
    MatTableExporterModule,
    CommonModule,
    TranslateModule,
  ],
  templateUrl: './recruitment-archive.component.html',
  styleUrl: './recruitment-archive.component.css',
})
export class RecruitmentArchiveComponent {
  dataSource!: MatTableDataSource<results_notice_recruitment>;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('sort') sort!: MatSort;
  dispatchData: results_notice_recruitment[] = [];
  displayedColumns: string[] = [
    "sno",
    "contentSubject",
    "contentCategoryName",
    "createrUserName",
    "contentPublishingDate",
    "countATT",
    "status",
    "action"
  ];
  ContentCategoryname: any[] = [
    {
      "contentCategoryCode": "1",
      "contentCategoryName": "Archive"
    },
    {
      "contentCategoryCode": "2",
      "contentCategoryName": "DMAdmin"
    },
    {
      "contentCategoryCode": "4",
      "contentCategoryName": "SE"
    },
    {
      "contentCategoryCode": "5",
      "contentCategoryName": "GMFinance"
    },
    {
      "contentCategoryCode": "6",
      "contentCategoryName": "GMTechnical"
    },
    {
      "contentCategoryCode": "7",
      "contentCategoryName": "Dept"
    }
    
  ];
  selectedColor: any;
  corename: any = 'Archive';
  coreCategory=0;
  categoryData: ContentCategory[] = [];
  base: any;
  constructor(
    public Service: ApiServiceService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {
    this.base = Base;
    const lang = sessionStorage.getItem('language') || 'en';
    this.translate.use(lang);
    this.dataSource = new MatTableDataSource<results_notice_recruitment>([]);
  }

  ngOnInit(): void {
    this.selectedColor = sessionStorage.getItem('selectedColor');
    document.documentElement.style.setProperty(
      '--theme-gradient',
      this.selectedColor
    );
    this.spinner.show();
    this.GetContentCategory(this.corename);
    this.GetRecruitmentArchive(this.coreCategory);
  }
  
  // https://www.cgmsc.gov.in/himis_apin/api/WebCgmsc/GetContentCategory?s1=DMAdmin
  // https://www.cgmsc.gov.in/himis_apin/api/WebCgmsc/GetHRarchiveParticular?contentCategoryCode=1

  

  GetContentCategory(contentCategoryName:any) {
    try {
      this.spinner.show();
      this.Service.get(`GetContentCategory?s1=${contentCategoryName}`)
        
        .subscribe(
          (res) => {
            this.categoryData = [{ contentCategoryCode: 0, contentCategoryName: 'All Category' }, ...res];
            this.coreCategory = 0; 
            // console.log(' this.category = ', this.categoryData);
            this.spinner.hide();
          },
          (error) => {
            this.spinner.hide();
            alert(`Error fetching data: ${JSON.stringify(error.message)}`);
          }
        );
    }
    catch (err: any) {
      this.spinner.hide();

      console.log(err);
      // throw err;
    }
  }

  GetRecruitmentArchive(contCatCode:any) {
    try {
      if (contCatCode == 0) {
        contCatCode = 0;
      }
      this.spinner.show();
      this.Service.get(`GetHRarchiveParticular?contentCategoryCode=${contCatCode}`)
        
        .subscribe(
          (res) => {
            this.dispatchData = res.map(
              (item: results_notice_recruitment, index: number) => ({
                ...item,
                sno: index + 1,
              })
            );
            // console.log('GetHRarchiveParticular=:', this.dispatchData);

            this.dataSource.data = this.dispatchData;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.cdr.detectChanges();
            this.spinner.hide();
          },
          (error) => {
            this.spinner.hide();
           // alert(`Error fetching data: ${JSON.stringify(error.message)}`);
              this.toastr.error(`Error fetching data: ${error.message}`, 'Error!');
          }
        );
    }
    catch (err: any) {
      this.spinner.hide();

      console.log(err);
      // this.toastr.error(`Error fetching data: ${err.message}`, 'Error!');
      // throw err;
    }
  }

  applyTextFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  exportToPDF() {

  }

  onselectname(event: Event): void {

    const selectedData = this.ContentCategoryname.find((user: { contentCategoryName: any }) => user.contentCategoryName === this.corename);

    if (selectedData) {
      var contentCategoryName = selectedData?.contentCategoryName;
      this.GetContentCategory(contentCategoryName) ;
    } else {
      alert('Selected Category Name not found in the list.');
    }

  }

  onselectCategory(event: Event): void {

    const selectedData = this.categoryData.find((user: { contentCategoryCode: any }) => user.contentCategoryCode === this.coreCategory);

    if (selectedData) {
      var contCatCode = selectedData?.contentCategoryCode;
      this.GetRecruitmentArchive(contCatCode);
    } else {
      alert('Selected Category ID not found in the list.');
    }

  }

    onButtonClick(attachment_Id:any){
        // console.log(attachment_Id);
        // this.router.navigate(['/AttachmentList']);
        // alert('file not found')
        // return;
        // this.router.navigate(['/AttachmentList'], {
        //   queryParams: {Id: attachment_Id, name: 'Recruitment Notice' }
        // });
        const encryptedId = this.base.encryptUsingAES256(attachment_Id);

        this.router.navigate(['/AttachmentList'], {
          queryParams: { Id: encryptedId, name: 'Recruitment Notice(HRA)' },
        });

      }
}
