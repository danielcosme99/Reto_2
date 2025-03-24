import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export interface User {
  email: string | null;
}

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}


  logout() {
    localStorage.removeItem('auth');
    this.router.navigate(['/login']);
  }
}
