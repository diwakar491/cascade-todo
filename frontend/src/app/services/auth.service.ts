import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, timer, switchMap, catchError, of } from 'rxjs';
import { LoginRequest, SignupRequest, AuthResponse } from '../models/auth.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private baseUrl = 'http://localhost:8080';
  private tokenKey = 'auth_token';
  private currentUserSubject = new BehaviorSubject<AuthResponse | null>(this.getStoredUser());
  public currentUser$ = this.currentUserSubject.asObservable();
  private healthCheckInterval: any;

  constructor(private http: HttpClient, private router: Router) {
    // Don't auto-start health check here - wait for login
  }

  // Periodically check if server is still running
  private startHealthCheck(): void {
    // Stop any existing check first
    this.stopHealthCheck();
    
    // Wait 10 seconds before first check, then check every 5 seconds
    this.healthCheckInterval = timer(10000, 5000).pipe(
      switchMap(() => {
        // Only check if still logged in
        if (!this.isLoggedIn()) {
          return of('not_logged_in');
        }
        return this.http.get(`${this.baseUrl}/actuator/health`, { observe: 'response' }).pipe(
          catchError(() => of(null))
        );
      })
    ).subscribe(response => {
      if (response === null && this.isLoggedIn()) {
        console.log('Server is down. Auto-logging out...');
        this.logout();
        this.router.navigate(['/login']);
      }
    });
  }

  private stopHealthCheck(): void {
    if (this.healthCheckInterval) {
      this.healthCheckInterval.unsubscribe();
    }
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, request).pipe(
      tap(response => {
        this.setToken(response.token);
        this.currentUserSubject.next(response);
        this.startHealthCheck(); // Start monitoring server health after login
      })
    );
  }

  register(request: SignupRequest): Observable<string> {
    return this.http.post(`${this.apiUrl}/register`, request, { responseType: 'text' });
  }

  logout(): void {
    this.stopHealthCheck(); // Stop health check on logout
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private getStoredUser(): AuthResponse | null {
    const token = this.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return {
          token,
          type: 'Bearer',
          id: payload.sub,
          username: payload.sub,
          email: ''
        };
      } catch {
        return null;
      }
    }
    return null;
  }
}
