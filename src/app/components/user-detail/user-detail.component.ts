import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserRequestService } from '../../services/user-request.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';

UserRequestService;
@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css',
})
export class UserDetailComponent implements OnInit, OnDestroy {
  updatedUser!: Subscription;
  user: User = {} as User;
  constructor(
    private _UserRequestService: UserRequestService,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe((data) => {
      let receivedId: number = Number(data.get('id'));
      console.log(data.get('id'));
      this._UserRequestService.getOneUser(receivedId).subscribe((data) => {
        console.log(data);

        this.user = data.data;
      });
    });
  }

  update(id: number, user: User) {
    this.updatedUser = this._UserRequestService
      .editOneUser(id, user)
      .subscribe((data) => {
        console.log(data);

        console.log(user);
        this._Router.navigate(['/users'], { queryParams: user });
      });
  }
  ngOnDestroy(): void {
    this.updatedUser.unsubscribe();
  }
}
