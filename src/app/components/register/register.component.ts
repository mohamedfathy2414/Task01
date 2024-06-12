import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
HttpClientModule;

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnDestroy {
  registeredUser!: Subscription;
  isLoading: boolean = false;
  apiError: string = '';
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  registerForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[a-z]{3,9}$/),
    ]),
  });

  handelRegister() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    this.registeredUser = this._AuthService
      .register(this.registerForm.value)
      .subscribe({
        next: (response) => {
          console.log(response.id);
          this.isLoading = false;
          if (response.id !== null) {
            this._Router.navigate(['/login']);
          }
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
          this.apiError = err.error.error;
        },
      });
  }

  ngOnDestroy(): void {
    this.registeredUser.unsubscribe();
  }
}
