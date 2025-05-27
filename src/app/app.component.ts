import { Component } from '@angular/core';
import { AuthServiceService } from './guards/auth-service.service';
import { Router } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import Swal from 'sweetalert2';
@Component({
  standalone: false,
    selector: 'app-root',
    // imports: [NavbarComponent,],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'CGMSCL';
  isOnline: boolean = navigator.onLine;
  constructor(public authService: AuthServiceService, private router: Router) {}

  // logout() {
  //   this.authService.logout();
  //   this.router.navigate(['/']);
  // }

// ngOnInit() {
//   window.addEventListener('online', () => {
//     this.isOnline = true;
//   });

//   window.addEventListener('offline', () => {
//     this.isOnline = false;
//   });
// }

ngOnInit() {
  window.addEventListener('offline', () => {
    this.isOnline = false;
    this.showOfflineAlert();
  });

  window.addEventListener('online', () => {
    this.isOnline = true;
    this.showOnlineToast();
  });
}

showOfflineAlert() {
  Swal.fire({
    icon: 'error',
    title: 'No Internet Connection',
    text: 'Please check your network connection.',
    allowOutsideClick: false,
    allowEscapeKey: false,
    confirmButtonText: 'Retry'
  }).then(() => {
    if (!navigator.onLine) {
      this.showOfflineAlert(); // Repeat alert until connection is restored
    }
  });
}

showOnlineToast() {
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'success',
    title: 'Connected to Internet',
    showConfirmButton: false,
    timer: 2000
  });
}
}
