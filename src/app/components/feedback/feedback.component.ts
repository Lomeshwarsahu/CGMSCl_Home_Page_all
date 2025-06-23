import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MaterialModule } from 'src/app/material-module';
import { Data_model } from 'src/app/model/model';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-feedback',
  imports: [    NavbarComponent,
    MaterialModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatTableExporterModule,
    CommonModule,
    ToastrModule,],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {
  selectedColor: any;
  constructor(
    public Service: ApiServiceService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
 
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
  }
}
