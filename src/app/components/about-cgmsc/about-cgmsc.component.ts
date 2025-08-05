import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/guards/auth-service.service';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { TranslateService , TranslateModule} from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  selector: 'app-about-cgmsc',
  imports: [NavbarComponent,TranslateModule,CommonModule],
  templateUrl: './about-cgmsc.component.html',
  styleUrl: './about-cgmsc.component.css'
})
export class AboutCGMSCComponent {
  selectedColor:any;
  constructor(public authService: AuthServiceService, private router: Router,private ApiService:ApiServiceService,private translate: TranslateService,) {
    const lang = sessionStorage.getItem('language') || 'en';
    this.translate.use(lang);
  }

  ngOnInit(): void {
    // this.ApiService.selectedColor$.subscribe(color => {
    //   // this.selectedColor = color;
    //   document.documentElement.style.setProperty('--theme-gradient', color);
    // });
    this.selectedColor = sessionStorage.getItem('selectedColor');
    document.documentElement.style.setProperty('--theme-gradient', this.selectedColor );
  }
}
