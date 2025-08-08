import { NgFor, NgStyle, CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NgxSpinnerService } from 'ngx-spinner';
import { MaterialModule } from 'src/app/material-module';
import { CategoryData, Data_model, DeptCategory, Employee, Employee_dpt, SchemeData } from 'src/app/model/model';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import {  ToastrService } from 'ngx-toastr';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Base } from 'src/app/helper/base';

@Component({
  selector: 'app-other-dept-recruitment',
  standalone: true, 
  imports: [NavbarComponent, MaterialModule, MatSortModule, MatPaginatorModule, MatTableModule, NgSelectModule, FormsModule,
    MatTableExporterModule, CommonModule,TranslateModule],
  templateUrl: './other-dept-recruitment.component.html',
  styleUrl: './other-dept-recruitment.component.css'
})
export class OtherDeptRecruitmentComponent {

  dataSource!: MatTableDataSource<DeptCategory>;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('sort') sort!: MatSort;
  dispatchData: DeptCategory[] = [];
  displayedColumns: string[] = [
    "sno",
    "content_Subject",
    "contentCategoryName",
    "content_Publising_Date",
    "expiry_Date_of",
    "countATT",
    "recruitmentScheme",
    "action"
  ];
  selectedColor: any;
  Scheme_Name = '0';
  coreScheme: any = '0';
  schemeData: SchemeData[] = [];

  Category_Name = '0';
  coreCategory: any = '0';
  categoryData: CategoryData[] = [];
base:any;
  constructor(public Service: ApiServiceService, private cdr: ChangeDetectorRef, private router: Router
    , private spinner: NgxSpinnerService,private toastr: ToastrService,private translate: TranslateService,) {
      this.base=Base;
        const lang = sessionStorage.getItem('language') || 'en';
        this.translate.use(lang);
    this.dataSource = new MatTableDataSource<DeptCategory>([]);
  }

  ngOnInit(): void {
    
    this.selectedColor = sessionStorage.getItem('selectedColor');
    document.documentElement.style.setProperty('--theme-gradient', this.selectedColor);    this.spinner.show();
    this.GetScheme();
    this.GetCategory();
    this.GetDeptCategory(this.Scheme_Name, this.Category_Name);
  }

  GetScheme() {
    try {
      this.spinner.show();
      this.Service.get('GetRecruitmentDepartments')
        // this.Service.get('GetDrugTenderList?n=0')
        .subscribe(
          (res) => {
            this.schemeData = [{ recruitmentId: '0', recruitmentScheme: 'All Scheme' }, ...res];
            this.coreScheme = '0'; // Set default value
            // console.log(' this.scheme =', this.schemeData);
            this.spinner.hide();
          },
          (error) => {
            this.spinner.hide();
            //alert(`Error fetching data: ${JSON.stringify(error.message)}`);
             this.toastr.error(`Error fetching data: ${error.message}`, 'Error!');
          }
        );
    }
    catch (err: any) {
      this.spinner.hide();

      console.log(err);
      // throw err;
    }
  }


  GetCategory() {
    try {
      this.spinner.show();
      this.Service.get('GetContentCategory?s1=Dept')
        // this.Service.get('GetDrugTenderList?n=0')
        .subscribe(
          (res) => {
            this.categoryData = [{ contentCategoryCode: '0', contentCategoryName: 'All Category' }, ...res];
            this.coreCategory = '0'; // Set default value
            // console.log(' this.category = ', this.categoryData);
            this.spinner.hide();
          },
          (error) => {

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

  GetDeptCategory(Scheme_Name0: any, Category_Name0: any) {
    try {
      if (Scheme_Name0 == 'All') {
        Scheme_Name0 = 0;
      }
      if (Category_Name0 == 'All') {
        Category_Name0 = 0;
      }

      this.spinner.show();
      this.Service.get(`GetHRPartDeptCatParticular?s1=${Scheme_Name0}&s2=${Category_Name0}`)
        // this.Service.get('GetDrugTenderList?n=0')
        .subscribe(
          (res) => {
            this.dispatchData = res.map(
              (item: Data_model, index: number) => ({
                ...item,
                sno: index + 1,
              })
            );
            // console.log('GetDeptCategory=:', this.dispatchData);
             
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

      //console.log(err);
      this.toastr.error(`Error fetching data: ${err.message}`, 'Error!');
      // throw err;
    }
  }

  applyTextFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  exportToPDF() {

  }

  onselectScheme(event: Event): void {

    const selectedData = this.schemeData.find((user: { recruitmentId: any }) => user.recruitmentId === this.coreScheme);

    if (selectedData) {
      var recruId = selectedData?.recruitmentId;
      // if (name == 'All') {
      //   this.GetEmployeeList(0);

      // }else{this.GetEmployeeList(name); }
      this.GetDeptCategory(recruId, this.coreCategory);
    } else {
      alert('Selected districT_ID not found in the list.');
    }

  }

  onselectCategory(event: Event): void {

    const selectedData = this.categoryData.find((user: { contentCategoryCode: any }) => user.contentCategoryCode === this.coreCategory);

    if (selectedData) {
      var contCatCode = selectedData?.contentCategoryCode;
      // if (name == 'All') {
      //   this.GetEmployeeList(0);

      // }else{this.GetEmployeeList(name); }
      this.GetDeptCategory(this.coreScheme, contCatCode);
    } else {
      alert('Selected districT_ID not found in the list.');
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
          queryParams: { Id: encryptedId, name: 'Other Department Recruitment' },
        });

      }

}
