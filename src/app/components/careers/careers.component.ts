import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthServiceService } from 'src/app/guards/auth-service.service';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  standalone: true,
  selector: 'app-careers',
  imports: [
    NavbarComponent,
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './careers.component.html',
  styleUrl: './careers.component.css'
})
export class CAREERSComponent {
  selectedColor:any;

  constructor(public authService: AuthServiceService, private router: Router, private ApiService:ApiServiceService) {}

  

  ngOnInit(): void {
    const colorTop = sessionStorage.getItem('selectedTopColor');
    if (colorTop) {
      document.documentElement.style.setProperty('--theme-top', colorTop);
    }
  
    const gradient = sessionStorage.getItem('selectedColor');
    if (gradient) {
      document.documentElement.style.setProperty('--theme-gradient', gradient);
    }
  }

}
