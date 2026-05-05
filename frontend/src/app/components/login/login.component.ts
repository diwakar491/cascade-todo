import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  template: `
    <div class="container">
      <div class="card" style="max-width: 400px; margin: 40px auto;">
        <h2 class="text-center">Login</h2>
        
        <div *ngIf="error" class="alert alert-error">
          {{ error }}
        </div>
        
        <form (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              class="form-control"
              [(ngModel)]="credentials.username"
              name="username"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              class="form-control"
              [(ngModel)]="credentials.password"
              name="password"
              required
            />
          </div>
          
          <button type="submit" class="btn btn-primary" style="width: 100%;" [disabled]="loading">
            {{ loading ? 'Logging in...' : 'Login' }}
          </button>
        </form>
        
        <p class="text-center mt-3">
          Don't have an account? <a routerLink="/register" class="link">Register</a>
        </p>
      </div>
    </div>
  `
})
export class LoginComponent {
  credentials: LoginRequest = {
    username: '',
    password: ''
  };
  error: string = '';
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (!this.credentials.username || !this.credentials.password) {
      this.error = 'Please enter both username and password';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.router.navigate(['/todos']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Invalid username or password';
      }
    });
  }
}
