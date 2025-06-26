import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }
  
 
  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken'); // Returns true if token exists
  }

 
  login(token: string) {
    localStorage.setItem('authToken', token);
  }


  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('roleName');
    localStorage.removeItem('userName');
  }
}
