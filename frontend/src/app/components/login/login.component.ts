import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  styles: [`
    .container {
      min-height: 100vh;
      background: #f9fafb;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .login-card {
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      overflow: hidden;
      max-width: 400px;
      width: 100%;
    }

    .login-header {
      background: #4f46e5;
      padding: 2rem 1.5rem;
      text-align: center;
    }

    .login-header h2 {
      color: white;
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0;
    }

    .login-header .subtitle {
      color: rgba(255,255,255,0.9);
      margin-top: 0.5rem;
      font-size: 0.875rem;
    }

    .login-body {
      padding: 2rem 1.5rem;
    }

    .form-group {
      margin-bottom: 1.25rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #374151;
      font-size: 0.875rem;
    }

    .form-control {
      width: 100%;
      padding: 0.75rem 0.875rem;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 0.875rem;
      transition: border-color 0.2s, box-shadow 0.2s;
      background: white;
    }

    .form-control:focus {
      outline: none;
      border-color: #4f46e5;
      box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
    }

    .form-control::placeholder {
      color: #9ca3af;
    }

    .btn-primary {
      width: 100%;
      padding: 0.75rem;
      background: #4f46e5;
      color: white;
      border: 1px solid #4f46e5;
      border-radius: 6px;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .btn-primary:hover:not(:disabled) {
      background: #4338ca;
      border-color: #4338ca;
    }

    .btn-primary:disabled {
      background: #9ca3af;
      border-color: #9ca3af;
      cursor: not-allowed;
      opacity: 0.6;
    }

    .alert {
      background: #fef2f2;
      border: 1px solid #fecaca;
      color: #dc2626;
      padding: 0.75rem;
      border-radius: 6px;
      margin-bottom: 1.25rem;
      font-size: 0.875rem;
    }

    .login-footer {
      text-align: center;
      padding-top: 1.5rem;
      color: #6b7280;
      font-size: 0.875rem;
    }

    .login-footer a {
      color: #4f46e5;
      text-decoration: none;
      font-weight: 500;
    }

    .login-footer a:hover {
      color: #4338ca;
      text-decoration: underline;
    }

    .loading-spinner {
      display: inline-block;
      width: 14px;
      height: 14px;
      border: 2px solid rgba(255,255,255,0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 1s linear infinite;
      margin-right: 0.5rem;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @media (max-width: 480px) {
      .container {
        padding: 1rem;
      }
      
      .login-body {
        padding: 1.5rem;
      }
      
      .login-header {
        padding: 1.5rem;
      }
      
      .login-header h2 {
        font-size: 1.25rem;
      }
    }
  `],
  template: `
    <div class="container">
      <div class="login-card">
        <div class="login-header">
          <h2>Welcome Back</h2>
          <div class="subtitle">Sign in to your account</div>
        </div>
        
        <div class="login-body">
          <div *ngIf="error" class="alert">
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
                placeholder="Enter your username"
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
                placeholder="Enter your password"
                required
              />
            </div>
            
            <button type="submit" class="btn-primary" [disabled]="loading">
              <span *ngIf="loading" class="loading-spinner"></span>
              {{ loading ? 'Signing in...' : 'Sign In' }}
            </button>
          </form>
          
          <div class="login-footer">
            Don't have an account? <a routerLink="/register">Create Account</a>
          </div>
        </div>
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
