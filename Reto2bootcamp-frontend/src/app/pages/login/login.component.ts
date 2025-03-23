import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  username = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);
  errorMessage: string | null = null;

  constructor(private router: Router) {}

  login() {
    if (this.username.value === 'admin' && this.password.value === 'admin123') {
      localStorage.setItem('auth', 'true');
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Credenciales incorrectas';
    }
  }
}