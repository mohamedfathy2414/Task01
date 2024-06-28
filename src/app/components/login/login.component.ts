import { Component, OnDestroy } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnDestroy {
  authenticatedUser!: Subscription;
  isLoading: boolean = false;
  apiError: string = '';
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[a-z]{3,9}$/),
    ]),
  });

  handelLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.authenticatedUser = this._AuthService
      .login(this.loginForm.value)
      .subscribe({
        next: (response) => {
          console.log(response);

          if (response.token !== '') {
            localStorage.setItem('userToken', response.token);
            this._AuthService.UserData();
            this.isLoading = false;
            this._Router.navigate(['/users']);
          }
        },
        error: (err) => {
          console.log(err.error.error);
          this.apiError = err.error.error;
          this.isLoading = false;

          setTimeout(() => {
            this._Router.navigate(['/register']);
          }, 1000);
        },
      });
  }

  ngOnDestroy(): void {
    this.authenticatedUser.unsubscribe();
  }
}
