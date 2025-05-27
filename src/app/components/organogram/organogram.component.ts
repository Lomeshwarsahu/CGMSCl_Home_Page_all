import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/guards/auth-service.service';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { ApiServiceService } from 'src/app/service/api-service.service';
@Component({
  selector: 'app-organogram',
  standalone: true,
  imports: [NavbarComponent,CommonModule],
  templateUrl: './organogram.component.html',
  styleUrl: './organogram.component.css'
})
export class OrganogramComponent {
  selectedColor:any;
  constructor(public authService: AuthServiceService, private router: Router,private ApiService:ApiServiceService) {}

  ngOnInit(): void {
    // this.ApiService.selectedColor$.subscribe(color => {
    //   // this.selectedColor = color;
    //   document.documentElement.style.setProperty('--theme-gradient', color);
    // });
    this.selectedColor = sessionStorage.getItem('selectedColor');
    document.documentElement.style.setProperty('--theme-gradient', this.selectedColor );
  }

  isAccordionOpen = false;
currentHeight = 0;

@ViewChild('accordionContent') accordionContent!: ElementRef;
@ViewChild('contentWrapper') contentWrapper!: ElementRef;

ngAfterViewInit(): void {
  // Initially, the height is calculated
  this.setHeight();
}

toggleAccordion() {
  const content = this.contentWrapper.nativeElement;
  this.isAccordionOpen = !this.isAccordionOpen;

  // If accordion is opening, calculate the height
  if (this.isAccordionOpen) {
    this.setHeight();
  }
}

setHeight() {
  // We wait for the content to be rendered before measuring its height
  setTimeout(() => {
    if (this.contentWrapper) {
      this.currentHeight = this.contentWrapper.nativeElement.scrollHeight;
    }
  });
}

onTransitionEnd() {
  if (!this.isAccordionOpen) {
    this.currentHeight = 0; // Reset height when collapsed
  }
}
}
