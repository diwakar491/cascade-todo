import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <nav class="navbar">
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
          <a href="#" (click)="logout($event)">Logout</a>
        </li>
      </ul>
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
