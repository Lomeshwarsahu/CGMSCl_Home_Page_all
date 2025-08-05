import { NgFor, NgStyle, CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NgxSpinnerService } from 'ngx-spinner';
import { MaterialModule } from 'src/app/material-module';
import { CategoryData, Data_model, DeptCategory, Employee, Employee_dpt, SchemeData, TenderData } from 'src/app/model/model';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-valid-rc',
  imports: [NavbarComponent, MaterialModule, MatSortModule, MatPaginatorModule, MatTableModule, NgSelectModule, FormsModule,
    MatTableExporterModule, CommonModule,TranslateModule],
  templateUrl: './valid-rc.component.html',
  styleUrl: './valid-rc.component.css'
})
export class ValidRcComponent {

  dataSource!: MatTableDataSource<DeptCategory>;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('sort') sort!: MatSort;
  dispatchData: DeptCategory[] = [];
  displayedColumns: string[] = [
    "sno",
    //"contract_item_id",
    "item_codeE",
    "item_nameE",
    "basic_rate",
    "percentage",
    "single_unit_price",
    "model",
    "contract_date",
    "contract_duration",
    "contract_end_date",
    "name",
    "tender_no",
    //"tender_id",
    //"webSiteUploadID",
    "file_name",
    "upload_folder_name",
    //"item_id",
    "is_extended",
    "contract_new_end_date",
    "action"
  ];

  selectedColor: any;
  tenderId = '0';
  coreTenderId: any = '0';
  tenderData: TenderData[] = []; 

  constructor(public Service: ApiServiceService, private cdr: ChangeDetectorRef, private router: Router
    , private spinner: NgxSpinnerService,private translate: TranslateService,) {
        const lang = sessionStorage.getItem('language') || 'en';
        this.translate.use(lang);
    this.dataSource = new MatTableDataSource<DeptCategory>([]);
  }

  ngOnInit(): void {
    this.selectedColor = sessionStorage.getItem('selectedColor');
    document.documentElement.style.setProperty('--theme-gradient', this.selectedColor);
    this.spinner.show();
    this.GetEquipmentTender();
    this.GetEquipRC(this.tenderId);
  }

  GetEquipmentTender() {
    try {
      this.spinner.show();
    
      this.Service.getEquipTender()
        // this.Service.get('GetDrugTenderList?n=0')
        .subscribe(
          (res) => {
            this.tenderData = [{ tender_No: 'All Tender', tender_Id: '0' }, ...res];
            this.coreTenderId = '0'; // Set default value
            console.log(' this.scheme =', this.tenderData);
            this.spinner.hide();
          },
          (error) => {
            this.spinner.hide();
            console.error(`Error fetching `, error);
            // alert(`Error fetching data: ${JSON.stringify(error.message)}`);
          }
        );
    }
    catch (err: any) {
      this.spinner.hide();

      console.log(err);
      // throw err;
    }
    
  }
  
  GetEquipRC(tender_id: any = '0') {
    try {
      if (tender_id == '0') {
        tender_id = 0;
      }
     
      tender_id = 557;

      this.spinner.show();
      this.Service.getEquipmentRC(tender_id)
        // this.Service.get('GetDrugTenderList?n=0')
        .subscribe(
          (res) => {
            this.dispatchData = res.map(
              (item: Data_model, index: number) => ({
                ...item,
                sno: index + 1,
              })
            );
            console.log('GetTenderData=:', this.dispatchData);
            this.dataSource.data = this.dispatchData;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.cdr.detectChanges();
            this.spinner.hide();
          },
          (error) => {

            this.spinner.hide();
            console.error(`Error fetching `, error);
          }
        );
    }
    catch (err: any) {
      this.spinner.hide();

      console.log(err);
      // throw err;
    }
  }


   onselectScheme(event: Event): void {

    const selectedData = this.tenderData.find((user: { tender_Id: any }) => user.tender_Id === this.coreTenderId);

    if (selectedData) {
      var tendId = selectedData?.tender_Id;
      // if (name == 'All') {
      //   this.GetEmployeeList(0);

      // }else{this.GetEmployeeList(name); }
      this.GetEquipRC(tendId);
    } else {
      alert('Selected districT_ID not found in the list.');
    }

  }

   applyTextFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  exportToPDF() {

  }

   onButtonClick(folderName: string, fileName: string) {
    const baseUrl = 'https://cgmsc.gov.in/EMSR/';
    const fullUrl = `${baseUrl}${folderName}/${fileName}`;
    window.open(fullUrl, '_blank');
  }

}
