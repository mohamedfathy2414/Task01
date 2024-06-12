import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { UserRequestService } from '../../services/user-request.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit, OnDestroy {
  isNextButtonDisabled: boolean = false;
  currentPage = 1;
  allUsers!: Subscription;
  users!: User[];
  constructor(
    private _UserRequestService: UserRequestService,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.displayUsers();
  }

  displayUsers() {
    this.allUsers = this._UserRequestService
      .getAllUsers(this.currentPage)
      .subscribe((data) => {
        console.log(data.data);

        this.users = data.data;

        this._ActivatedRoute.queryParams.subscribe((data) => {
          console.log(data);
          let user = this.users.find((user) => user.id == data['id']);
          if (!user) {
            this.users.push(data as User);

            return;
          }
          this.users.splice(this.users.indexOf(user), 1, data as User);
        });
      });
  }

  deleteUser(deletedId: number) {
    this._UserRequestService.deleteUser(deletedId).subscribe({
      next: (data) => {
        console.log(data);

        this.users = this.users.filter((user) => {
          console.log(user.id);

          return user.id !== deletedId;
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  nextPage() {
    if (this.currentPage < 2) {
      this.currentPage++;
      this._UserRequestService.getAllUsers(this.currentPage).subscribe({
        next: (response) => {
          console.log(response);

          this.users = response.data;
        },
      });
    } else {
      this.isNextButtonDisabled = true;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this._UserRequestService.getAllUsers(this.currentPage).subscribe({
        next: (response) => {
          console.log(response);

          this.users = response.data;
        },
      });
    } else {
      this.isNextButtonDisabled = true;
    }
  }

  ngOnDestroy(): void {
    this.allUsers.unsubscribe();
  }
}
