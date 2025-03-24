import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  email: string | null;
}

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}


  isAuthenticated(): boolean {
    return !!localStorage.getItem('uid')
  }

  getUid(): string | null {
    return localStorage.getItem('uid')
  }

  logout() {
    localStorage.removeItem('auth');
    this.router.navigate(['/login']);
  }
}
