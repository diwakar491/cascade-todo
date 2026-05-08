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
  template: `
    <div class="container">
      <div class="card" style="max-width: 400px; margin: 40px auto;">
        <h2 class="text-center">Register</h2>
        
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
              required
            />
          </div>
          
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              class="form-control"
              [(ngModel)]="user.email"
              name="email"
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
              required
              minlength="6"
            />
          </div>
          
          <button type="submit" class="btn btn-primary" style="width: 100%;" [disabled]="loading">
            {{ loading ? 'Registering...' : 'Register' }}
          </button>
        </form>
        
        <p class="text-center mt-3">
          Already have an account? <a routerLink="/login" class="link">Login</a>
        </p>
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
