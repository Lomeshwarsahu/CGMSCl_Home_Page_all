import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthServiceService } from 'src/app/guards/auth-service.service';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-procurement-policy-drugs',
   standalone: true,
    imports: [NavbarComponent,TranslateModule,CommonModule],
  templateUrl: './procurement-policy-drugs.component.html',
  styleUrl: './procurement-policy-drugs.component.css'
})
export class ProcurementPolicyDrugsComponent {

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
