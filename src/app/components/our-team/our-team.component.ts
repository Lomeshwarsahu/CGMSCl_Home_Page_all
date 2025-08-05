import { NgFor, NgStyle, CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NgxSpinnerService } from 'ngx-spinner';
import { MaterialModule } from 'src/app/material-module';
import { Data_model, Employee, Employee_dpt } from 'src/app/model/model';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-our-team',
  standalone: true,
    
    imports: [NavbarComponent,MaterialModule, MatSortModule, MatPaginatorModule,MatTableModule,NgSelectModule,FormsModule,
      MatTableExporterModule,CommonModule,TranslateModule
    ],
  templateUrl: './our-team.component.html',
  styleUrl: './our-team.component.css'
})
export class OurTeamComponent {
  dataSource!: MatTableDataSource<Employee>;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('sort') sort!: MatSort;
  dispatchData: Employee[] = [];
  displayedColumns: string[] = [
    'sno','fullName','designation','department','emailId','contactNo'
  //   sno:number;
  // fullName: string;
  // designation: string;
  // department: number;
  // emailId: number;
  // contactNo: number;
  ];
  selectedColor:any;
  // department:any;
  DPT_Name = 'All';
  coreDepts: any  = 'All';
  department:Employee_dpt[]=[];
  // Employee:Employee[]=[];
  constructor(public Service: ApiServiceService, private cdr: ChangeDetectorRef, private router: Router,private spinner: NgxSpinnerService,private translate: TranslateService,) {
    this.dataSource = new MatTableDataSource<Employee>([]);
    const lang = sessionStorage.getItem('language') || 'en';
    this.translate.use(lang);
    }
  

    ngOnInit(): void {
      this.selectedColor = sessionStorage.getItem('selectedColor');
      document.documentElement.style.setProperty('--theme-gradient', this.selectedColor );
      // this.Service.selectedColor$.subscribe(color => {
      //   this.selectedColor = sessionStorage.getItem('selectedColor');
      //   document.documentElement.style.setProperty('--theme-gradient', this.selectedColor);
      //   // this.selectedColor = color;
      // });
  this.GetEmployeeList(this.DPT_Name);
      this.GetDept();
      this.spinner.show();

      setTimeout(() => {
        this.spinner.hide();
      }, 3000); // hides after 3 seconds
    }


    GetDept() {
      try{
        this.spinner.show();
      this.Service.get('GetDept')
      // this.Service.get('GetDrugTenderList?n=0')
        .subscribe(
          (res) => {
            this.department = [{ coreDept: 'All' }, ...res];
            // this.department=res
          //  var data =res;
           console.log(' this.department=',  this.department);
            this.spinner.hide();
          },
          (error) => {

            alert(`Error fetching data: ${JSON.stringify(error.message)}`);
          }
        );
        }
        catch(err:any){
          this.spinner.hide();

          console.log(err);
          // throw err;
        }
      }

      GetEmployeeList(DPT_Name:any ){
        try{
          if(DPT_Name == 'All'){
            DPT_Name=0;
          }
          this.spinner.show();
        this.Service.get(`GetEmployee?coreDept=${DPT_Name}`)
        // this.Service.get('GetDrugTenderList?n=0')
          .subscribe(
            (res) => {
              this.dispatchData = res.map(
                (item: Data_model, index: number) => ({
                  ...item,
                  sno: index + 1,
                })
              );
              // console.log('GetEmployeeList=:', this.dispatchData);
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
          }
          catch(err:any){
            this.spinner.hide();
  
            console.log(err);
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
          queryParams: {Id: attachment_Id, name: 'Drug-Technical' } 
        });

      }
      // getmain_scheme() {
      //   try {
      //     // 
      //     this.api.getMainScheme(this.isall).subscribe((res:any)=>{
      //       if (res && res.length > 0) {
      //       this.mainscheme = res.map((item: { mainSchemeID: any; name: any; }) => ({
      //         mainSchemeID: item.mainSchemeID, // Adjust key names if needed
      //         name : item.name,  
      //       }));
      //       // console.log('mainscheme :', this.mainscheme);
      //       } else {
      //         console.error('No name found or incorrect structure:', res);
      //       }
      //     }); 
      //      // this.api.getMainScheme(this.isall).subscribe(
      //     //   (res: any) => {
      //     //     this.mainscheme = res;
      //     //   },
    
      //     //   // mainSchemeID!: number;
      //     //   // name: any;
            
      //     //   (error) => {
      //     //     alert(JSON.stringify(error));
      //     //   }
      //     // );
       
      //   } catch (ex: any) {
      //     // alert(ex.message);
      //     alert(`API Error: ${JSON.stringify(ex.message)}`);
      //   }
      // }
      onselectGetDept(event: Event): void {

  const selectedUser =  this.department.find((user: { coreDept: any }) => user.coreDept === this.coreDepts); 

  if (selectedUser) {
  var name  = selectedUser?.coreDept ;
  // if (name == 'All') {
  //   this.GetEmployeeList(0);

  // }else{this.GetEmployeeList(name); }
  this.GetEmployeeList(name);
  } else {
    alert('Selected districT_ID not found in the list.');
  }

      }
      
//   onselect_mainscheme_data(event: Event): void {
//     // 
//   const selectedUser = this.mainscheme.find((user: { mainSchemeID: any }) => user.mainSchemeID === this.mainSchemeID); 
  
//   if (selectedUser) {
//     //  const MID  =selectedUser.mainSchemeID || null;
//     this.mainSchemeID = selectedUser?.mainSchemeID ;
//     this.hide=true;
//     const selectedName = selectedUser?.name; 
//     this.selectedName=selectedName;
//     //  this.mainSchemeID = mainSchemeID;
//      // this.divisionid = 0;
//      this.distid = 0;
//      this.showCards = true;
//      if(this.name||this.distname ==null){
//        this.show=false;
//      }else{
//        this.show=true;
//      }
//      this.DashProgressCount();
// // alert(this.mainSchemeID);
// // alert(selectedName);
//   } else {
//     alert('Selected districT_ID not found in the list.');
//   }
// }
}
