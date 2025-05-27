import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/guards/auth-service.service';
import { Base } from 'src/app/helper/base';
import { ApiServiceService } from 'src/app/service/api-service.service';
import {Model} from 'src/app/model/model';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {CommonModule, NgFor, NgStyle } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,ToastrModule, NgFor,CommonModule, NgStyle,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
  
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  base: any;
  // model: Model[]=[];
  loginData: Model = new Model();
  // loginData: model_authentication = new model_authentication();
  constructor(private AuthService: AuthServiceService, private router: Router,private formBuilder: FormBuilder,
    private ApiService: ApiServiceService,private http: HttpClient,private toastr: ToastrService,
  ) {
    this.base = Base;
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      userPassword: ['', [Validators.required]]
    })
  }
  ngOnInit(): void {
    // var User: tbl_varifyied_response = JSON.parse(localStorage.getItem('currentUser') || '{}')
  }

  get formControl() {
    return this.loginForm.controls;
  }


  login() {
    // dashboard
    this.router.navigate(['/dashboard']);
    return
    try{
      // debugger;
      this.submitted = true;
      this.loginData = this.loginForm.value;
      if (this.loginForm.valid == true) {
        this.ApiService.post('authenticate',this.loginData).subscribe((res: any) => {
          if (res.jwtToken) {
            // const fakeToken = '1234567890abcdef'; // Replace with actual token from API
            this.AuthService.login(res.jwtToken);
            localStorage.setItem("currentUser", JSON.stringify(res));
            localStorage.setItem("roleName",res.user.role[0].roleName);
            localStorage.setItem("userName",res.user.userName);

            // console.log(JSON.stringify(res.jwtToken));
            // console.log(JSON.stringify(res.user.role[0].roleName));
            // console.log(JSON.stringify(res.user.userName));
            // console.log(JSON.stringify(res.user))
           
          
            // localStorage.setItem("ltn", JSON.stringify(res.token));
            switch (res.user.role[0].roleName) {
              case 'Admin': {
                this.router.navigate(['/dashboard']);
                // this.router.navigate(['/admin']);
                break;
              }
              // case 'Generator': {
              //   this.router.navigate(['/list-qr']);
              //   break;
              // }
              case "User": {
                this.router.navigate(['/dashboard']);
                break;
              }
            }
          } 

          else
            alert("Please Check userId and password")
  
        } ,
          (err: Error) => {
          //  debugger
          //  throw err;
          console.log(err);
          this.toastr.error("Please Check userId and password!",'Error');
          //  alert(err.message)
         }
       );
      } else 
      //alert('Something went wrong, please try again')
       this.toastr.error('Something went wrong, please try again!', 'Error!');
    }
    catch(err:any){
      throw err;
    }
  }
}
