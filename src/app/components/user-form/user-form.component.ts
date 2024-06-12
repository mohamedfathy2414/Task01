import { Component, OnDestroy } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserRequestService } from '../../services/user-request.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent implements OnDestroy {
  createdUser!: Subscription;
  newUser: User = {} as User;
  constructor(
    private _UserRequestService: UserRequestService,
    private _Router: Router
  ) {}
  UserForm: FormGroup = new FormGroup({
    first_name: new FormControl(null, [Validators.required]),
    last_name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  add() {
    if (this.UserForm.invalid) {
      this.UserForm.markAllAsTouched();
      return;
    }

    console.log(this.UserForm.value);

    this.createdUser = this._UserRequestService
      .addNewUser(this.newUser)
      .subscribe({
        next: (data) => {
          console.log(data);
          this._Router.navigate(['/users'], {
            queryParams: this.UserForm.value,
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  ngOnDestroy(): void {
    this.createdUser.unsubscribe();
  }
}
