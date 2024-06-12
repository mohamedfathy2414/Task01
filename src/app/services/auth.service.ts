import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userDat: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (localStorage.getItem('userToken') !== null) {
      this.UserData();
    }
  }

  register(userData: object): Observable<any> {
    {
      return this._HttpClient.post(
        `${environment.baseApiUrl}/register`,
        userData
      );
    }
  }
  login(userData: object): Observable<any> {
    {
      return this._HttpClient.post(`${environment.baseApiUrl}/login`, userData);
    }
  }
  UserData() {
    let token: string = JSON.stringify(localStorage.getItem('userToken'));
    console.log(token);
    this.userDat.next(token);
  }

  logout() {
    localStorage.removeItem('userToken');
    this.userDat.next(null);
    this._Router.navigate(['/login']);
  }
}
