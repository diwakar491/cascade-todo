import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { SignupRequest } from '../../models/auth.model';

@Component({
  selector: 'app-register',
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

    .register-card {
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      overflow: hidden;
      max-width: 450px;
      width: 100%;
    }

    .register-header {
      background: #4f46e5;
      padding: 2rem 1.5rem;
      text-align: center;
    }

    .register-header h2 {
      color: white;
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0;
    }

    .register-header .subtitle {
      color: rgba(255,255,255,0.9);
      margin-top: 0.5rem;
      font-size: 0.875rem;
    }

    .register-body {
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
      padding: 0.75rem;
      border-radius: 6px;
      margin-bottom: 1.25rem;
      font-size: 0.875rem;
      border: 1px solid;
    }

    .alert-error {
      background: #fef2f2;
      border-color: #fecaca;
      color: #dc2626;
    }

    .alert-success {
      background: #f0fdf4;
      border-color: #bbf7d0;
      color: #10b981;
    }

    .register-footer {
      text-align: center;
      padding-top: 1.5rem;
      color: #6b7280;
      font-size: 0.875rem;
    }

    .register-footer a {
      color: #4f46e5;
      text-decoration: none;
      font-weight: 500;
    }

    .register-footer a:hover {
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
      
      .register-body {
        padding: 1.5rem;
      }
      
      .register-header {
        padding: 1.5rem;
      }
      
      .register-header h2 {
        font-size: 1.25rem;
      }
    }
  `],
  template: `
    <div class="container">
      <div class="register-card">
        <div class="register-header">
          <h2>Create Account</h2>
          <div class="subtitle">Join us today and get organized</div>
        </div>
        
        <div class="register-body">
          <div *ngIf="error" class="alert alert-error">
            {{ error }}
          </div>
          
          <div *ngIf="success" class="alert alert-success">
            {{ success }}
          </div>
          
          <form (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label for="username">Username</label>
              <input
                type="text"
                id="username"
                class="form-control"
                [(ngModel)]="user.username"
                name="username"
                placeholder="Choose a username"
                required
              />
            </div>
            
            <div class="form-group">
              <label for="email">Email Address</label>
              <input
                type="email"
                id="email"
                class="form-control"
                [(ngModel)]="user.email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                id="password"
                class="form-control"
                [(ngModel)]="user.password"
                name="password"
                placeholder="Create a strong password"
                required
                minlength="6"
              />
            </div>
            
            <button type="submit" class="btn-primary" [disabled]="loading">
              <span *ngIf="loading" class="loading-spinner"></span>
              {{ loading ? 'Creating Account...' : 'Create Account' }}
            </button>
          </form>
          
          <div class="register-footer">
            Already have an account? <a routerLink="/login">Sign In</a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {
  user: SignupRequest = {
    username: '',
    email: '',
    password: ''
  };
  error: string = '';
  success: string = '';
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (!this.user.username || !this.user.email || !this.user.password) {
      this.error = 'Please fill in all fields';
      return;
    }

    if (this.user.password.length < 6) {
      this.error = 'Password must be at least 6 characters';
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    this.authService.register(this.user).subscribe({
      next: (message) => {
        this.loading = false;
        this.success = message || 'Registration successful!';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error || 'Registration failed. Please try again.';
      }
    });
  }
}
