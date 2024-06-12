import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLogin: boolean = false;
  constructor(private _AuthService: AuthService) {}
  userLogin!: Subscription;
  ngOnInit(): void {
    this.userLogin = this._AuthService.userDat.subscribe({
      next: (data) => {
        console.log(data);
        if (this._AuthService.userDat.getValue() !== null) {
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
      },
    });
  }

  logOut(): void {
    this._AuthService.logout();
  }

  ngOnDestroy(): void {
    this.userLogin.unsubscribe();
  }
}
