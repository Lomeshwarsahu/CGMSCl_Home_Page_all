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
import { results_notice_recruitment } from 'src/app/model/model';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-results-notice-recruitment',
  standalone: true, 
  imports: [NavbarComponent, MaterialModule, MatSortModule, MatPaginatorModule, MatTableModule, NgSelectModule, FormsModule,
    MatTableExporterModule, CommonModule,TranslateModule],
  templateUrl: './results-notice-recruitment.component.html',
  styleUrl: './results-notice-recruitment.component.css'
})
export class ResultsNoticeRecruitmentComponent {

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
    // "action"
  ];
  // sno:number;
  // countATT: string
  // categoryCodeMaster: string
  // categoryCodeContent: string
  // contentRegistrationId: string
  // contentSubject: string
  // displayNew: string
  // expiryYear: string
  // currentYear: string
  // department: any
  // contentDescription: string
  // contentPublishingDate: string
  // expiryDateOnNoticeBoard: string
  // expiryDateOnDepartmentBoard: string
  // status: string
  // dateTimeStamp: string
  // ip: any
  // systemInfo: any
  // createrUserName: string
  // contentCategoryName: string
  selectedColor: any;
  base:any;
  constructor(public Service: ApiServiceService, private cdr: ChangeDetectorRef, private router: Router
    , private spinner: NgxSpinnerService,private toastr: ToastrService,private translate: TranslateService,) {
      this.base=Base;
        const lang = sessionStorage.getItem('language') || 'en';
        this.translate.use(lang);
    this.dataSource = new MatTableDataSource<results_notice_recruitment>([]);
  }

  ngOnInit(): void {
    
    this.selectedColor = sessionStorage.getItem('selectedColor');
    document.documentElement.style.setProperty('--theme-gradient', this.selectedColor);    this.spinner.show();
    this.GetResultsNoticeRecruitment();
    
  }
  // https://www.cgmsc.gov.in/himis_apin/api/WebCgmsc/GetHRarchiveParticular
  GetResultsNoticeRecruitment(){
    try {
      this.spinner.show();
      this.Service.get(`GetHRarchiveParticular`)
        .subscribe(
          (res) => {
            this.dispatchData = res.map(
              (item: results_notice_recruitment, index: number) => ({
                ...item,
                sno: index + 1,
              })
            );
            // console.log('GetResultsNoticeRecruitment=:', this.dispatchData);
             
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

}
