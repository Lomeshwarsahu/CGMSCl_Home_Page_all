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
import { MaterialModule } from 'src/app/material-module';

import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { ApiServiceService } from 'src/app/service/api-service.service';
export interface RTI {
  DocumentDetails: string;
  PublishedDate: string;
  filePath: string;
}
@Component({
   standalone: true,
   selector: 'app-rti',
   imports: [ NavbarComponent,MaterialModule, MatSortModule, MatPaginatorModule,MatTableModule,NgSelectModule,FormsModule,
    MatTableExporterModule,TranslateModule,CommonModule],
  templateUrl: './rti.component.html',
  styleUrl: './rti.component.css'
})
export class RTIComponent {
  selectedColor:any;
  dataSource = new MatTableDataSource<RTI>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dispatchData: RTI[] = [];
  displayedColumns: string[] = [
    'sno','DocumentDetails','PublishedDate','action'
   
  ];
  constructor(public Service: ApiServiceService, private cdr: ChangeDetectorRef, 
    private router: Router,private spinner: NgxSpinnerService,private toastr:ToastrService
,private translate: TranslateService,) {
    const lang = sessionStorage.getItem('language') || 'en';
    this.translate.use(lang);
 
  }

  ngOnInit(): void {
    this.selectedColor = sessionStorage.getItem('selectedColor');
    document.documentElement.style.setProperty('--theme-gradient', this.selectedColor );
    this.dataSource.data = this.rti;
  }
  rti: RTI[] = [
    {
      "DocumentDetails": "RTI Application Status",
      "PublishedDate": "04/11/2016",
      "filePath": "https://dpdmis.in/cdn/RTI/RTI%20Formats%20Year%202017_App_Status.pdf",
    },
    {
      "DocumentDetails": "RTI Board",
      "PublishedDate": "09/04/2014",
      "filePath": "https://dpdmis.in/cdn/RTI/RTI%20PIO%20APR%2017_RTI_BOARD.pdf",
    },
    {
      "DocumentDetails": "RTI Act",
      "PublishedDate": "09/04/2014",
      "filePath": "https://dpdmis.in/cdn/RTI/RTI_Act.pdf",
    },
    {
      "DocumentDetails": "RTI Manual",
      "PublishedDate": "05/01/2014",
      "filePath": "https://dpdmis.in/cdn/RTI/RTI%20Manual.pdf",
    }
  ];
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openFile(filePath: string) {
    window.open(filePath, '_blank');
  }
  applyTextFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
