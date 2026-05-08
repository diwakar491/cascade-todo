import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { ProfileService, UserProfile, UsernameUpdateRequest, EmailUpdateRequest, PasswordUpdateRequest } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, DatePipe],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile: UserProfile | null = null;
  loading = false;
  error: string | null = null;
  success: string | null = null;

  // Forms
  profileForm: FormGroup;
  emailForm: FormGroup;
  passwordForm: FormGroup;

  constructor(
    private profileService: ProfileService,
    private fb: FormBuilder
  ) {
    this.profileForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]]
    });

    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.loading = true;
    this.error = null;
    
    this.profileService.getUserProfile().subscribe({
      next: (profile) => {
        this.userProfile = profile;
        this.profileForm.patchValue({
          username: profile.username
        });
        this.emailForm.patchValue({
          email: profile.email
        });
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load profile: ' + err.message;
        this.loading = false;
      }
    });
  }

  updateUsername(): void {
    if (this.profileForm.invalid) return;

    this.loading = true;
    this.error = null;
    this.success = null;

    const request: UsernameUpdateRequest = {
      username: this.profileForm.value.username
    };

    this.profileService.updateUsername(request).subscribe({
      next: (response) => {
        this.success = response.message;
        if (this.userProfile) {
          this.userProfile.username = response.username;
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to update username: ' + err.error;
        this.loading = false;
      }
    });
  }

  updateEmail(): void {
    if (this.emailForm.invalid) return;

    this.loading = true;
    this.error = null;
    this.success = null;

    const request: EmailUpdateRequest = {
      email: this.emailForm.value.email
    };

    this.profileService.updateEmail(request).subscribe({
      next: (response) => {
        this.success = response.message;
        if (this.userProfile) {
          this.userProfile.email = response.email;
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to update email: ' + err.error;
        this.loading = false;
      }
    });
  }

  updatePassword(): void {
    if (this.passwordForm.invalid) return;

    this.loading = true;
    this.error = null;
    this.success = null;

    const request: PasswordUpdateRequest = {
      currentPassword: this.passwordForm.value.currentPassword,
      newPassword: this.passwordForm.value.newPassword
    };

    this.profileService.updatePassword(request).subscribe({
      next: (response) => {
        this.success = response.message;
        this.passwordForm.reset();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to update password: ' + err.error;
        this.loading = false;
      }
    });
  }

  clearMessages(): void {
    this.error = null;
    this.success = null;
  }
}
