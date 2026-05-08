import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  styles: [`
    .navbar {
      background: #4f46e5;
      padding: 1rem 1.5rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .navbar-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .navbar-brand {
      color: white;
      text-decoration: none;
      font-size: 1.25rem;
      font-weight: 600;
      display: flex;
      align-items: center;
    }

    .navbar-brand:hover {
      color: white;
    }

    .navbar-brand::before {
      content: '✓';
      display: inline-block;
      width: 28px;
      height: 28px;
      background: rgba(255,255,255,0.2);
      border-radius: 50%;
      margin-right: 8px;
      text-align: center;
      line-height: 28px;
      font-size: 1rem;
    }

    .navbar-nav {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: 0.5rem;
    }

    .navbar-nav a {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      transition: background-color 0.2s;
      font-weight: 400;
    }

    .navbar-nav a:hover {
      background: rgba(255,255,255,0.1);
      color: white;
    }

    .navbar-nav a.active {
      background: rgba(255,255,255,0.15);
    }

    @media (max-width: 768px) {
      .navbar {
        padding: 1rem;
      }
      
      .navbar-content {
        flex-direction: column;
        gap: 1rem;
      }
      
      .navbar-nav {
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.5rem;
      }
      
      .navbar-nav a {
        padding: 0.5rem 0.75rem;
        font-size: 0.875rem;
      }
    }
  `],
  template: `
    <nav class="navbar">
      <div class="navbar-content">
        <a routerLink="/" class="navbar-brand">Todo App</a>
        <ul class="navbar-nav">
          <li *ngIf="!isLoggedIn()">
            <a routerLink="/login">Login</a>
          </li>
          <li *ngIf="!isLoggedIn()">
            <a routerLink="/register">Register</a>
          </li>
          <li *ngIf="isLoggedIn()">
            <a routerLink="/todos">My Todos</a>
          </li>
          <li *ngIf="isLoggedIn()">
            <a routerLink="/profile">My Profile</a>
          </li>
          <li *ngIf="isLoggedIn()">
            <a href="#" (click)="logout($event)">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(event: Event): void {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
