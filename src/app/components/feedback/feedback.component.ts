import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { ApplicationRef, ChangeDetectorRef, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Base } from 'src/app/helper/base';
import { MaterialModule } from 'src/app/material-module';
import { FeedbackDTO, Model } from 'src/app/model/model';
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
    ToastrModule,FormsModule,ReactiveFormsModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {
  selectedColor: any;
  captcha='7G5K2';
  FeedbackForm: FormGroup ;
  submitted = false;
  base: any;
 FeedbackTypeslist:any;
  Topicslist:any;
  // FeedbackDTO: FeedbackDTO[]=[];
  FeedbackData: FeedbackDTO = new FeedbackDTO();

  // loginData: Model = new Model();
  constructor(
    public Service: ApiServiceService, private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef, 
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.base = Base;
      // this.FeedbackForm = this.formBuilder.group({
      //   // userName: ['', [Validators.required]],
      //   // userPassword: ['', [Validators.required]],
      //   firstName:  ['', [Validators.required]],
      //   lastName:  ['', [Validators.required]],
      //   email:  ['', [Validators.required]],
      //   address:  ['', [Validators.required]],
      //   mobileNumber:  ['', [Validators.required]],
      //   city:  ['', [Validators.required]],
      //   subject:  ['', [Validators.required]],
      //   feedbackTypeId:  ['', [Validators.required]],
      //   comments:  ['', [Validators.required]],
      //   topicId:  ['', [Validators.required]],
      // })
      this.FeedbackForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        address: ['', Validators.required],
        mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
        city: ['', Validators.required],
        subject: ['', Validators.required],
        comments: ['', Validators.required],
        feedbackTypeId: [2, Validators.required],
        topicId: [6, Validators.required],
        captchaInput: ['', Validators.required]
      });
 
  }


  ngOnInit(): void {
    this.selectedColor = sessionStorage.getItem('selectedColor');
    document.documentElement.style.setProperty(
      '--theme-gradient',
      this.selectedColor
    );
    this.GetActiveFeedbackTypes();
    this.GetActiveTopics();
 
  }

  generateCaptcha(): void {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    this.captcha = Array.from({ length: 6 }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join('');
  }

  get formControl() {
    return this.FeedbackForm.controls;
  }

  // https://www.cgmsc.gov.in/himis_apin/api/Feedback/SubmitFeedbackSimple

  OnSubmit() {
    try {
     
      this.submitted = true;
      this.FeedbackData = this.FeedbackForm.value;
      this.FeedbackData.mobileNumber = this.FeedbackData.mobileNumber.toString();
      // if (this.FeedbackForm.value.captchaInput !== this.captcha) {
      //   this.toastr.error('Invalid Captcha', 'Error');
      //   // this.generateCaptcha(); // refresh captcha
      //   return;
      // }
      if (
        this.FeedbackForm.value.captchaInput.toLowerCase() !==
        this.captcha.toLowerCase()
      ) {
      
        this.toastr.error('Invalid Captcha', 'Error!', {
         
          positionClass: 'toast-center' 
        });
        this.generateCaptcha(); 
        return;
      }
      if (this.FeedbackForm.valid) {
        const Feedbackdata = this.FeedbackData; 
  
        this.Service.post1('Feedback/SubmitFeedbackSimple', Feedbackdata).subscribe(
          (res: any) => {
            this.toastr.success(res.message, 'Success', {
               positionClass: 'toast-center'
              
            });
            this.FeedbackForm.reset();
            this.FeedbackForm.markAsPristine();
            this.FeedbackForm.markAsUntouched();
            this.submitted = false;
            // console.log('res:=', res);
          },
          (err: HttpErrorResponse) => {
            // console.error('HTTP Error:', err);
            console.error('Backend Error Message:', err.error);
       
            // this.toastr.error(err.error?.message || 'Submission failed', 'Error', {
            //   positionClass: 'toast-center'
            // });
          }
        );
      } else {
       
        this.toastr.error('Something went wrong, please try again!', 'Error!', {
          positionClass: 'toast-center'
        });
      }
    } catch (err: any) {
      console.log('error:=', err.message);
      // throw err;
    }
  }
  
  // https://www.cgmsc.gov.in/himis_apin/api/Feedback/GetActiveFeedbackTypes
    GetActiveFeedbackTypes(){
        try{
  
          
          this.spinner.show();
        this.Service.get1(`Feedback/GetActiveFeedbackTypes`)
      
          .subscribe(
            (res) => {
              this.FeedbackTypeslist=res;
            //  console.log('ActiveFeedbackTypes =:', this.FeedbackTypeslist);   
              this.spinner.hide();
            },
            (error) => {
              this.spinner.hide();
              // alert(`Error fetching data: ${JSON.stringify(error.message)}`);
              console.error(`Error fetching `, error);
            }
          );
          }
          catch(err:any){
            this.spinner.hide();
  
            console.log(err);
            // throw err;
          }
      }
      // https://www.cgmsc.gov.in/himis_apin/api/Feedback/GetActiveTopics
      GetActiveTopics(){
        try{
          
          this.spinner.show();
        this.Service.get1(`Feedback/GetActiveTopics`)
      
          .subscribe(
            (res) => {
              this.Topicslist=res;
            //  console.log('GActiveTopics =:', this.Topicslist);   
              this.spinner.hide();
            },
            (error) => {
              this.spinner.hide();
              // alert(`Error fetching data: ${JSON.stringify(error.message)}`);
              console.error(`Error fetching `, error);
            }
          );
          }
          catch(err:any){
            this.spinner.hide();
  
            console.log(err);
            // throw err;
          }
      }
}
