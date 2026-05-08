import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  role: string;
}

export interface UsernameUpdateRequest {
  username: string;
}

export interface EmailUpdateRequest {
  email: string;
}

export interface PasswordUpdateRequest {
  currentPassword: string;
  newPassword: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:8080/api/profile';

  constructor(private http: HttpClient) { }

  getUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.apiUrl);
  }

  updateUsername(request: UsernameUpdateRequest): Observable<{ message: string; username: string }> {
    return this.http.put<{ message: string; username: string }>(`${this.apiUrl}/username`, request);
  }

  updateEmail(request: EmailUpdateRequest): Observable<{ message: string; email: string }> {
    return this.http.put<{ message: string; email: string }>(`${this.apiUrl}/email`, request);
  }

  updatePassword(request: PasswordUpdateRequest): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.apiUrl}/password`, request);
  }
}
