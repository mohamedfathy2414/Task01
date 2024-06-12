import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiResponse, User } from '../models/user';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserRequestService {
  constructor(private httpClient: HttpClient) {}

  getAllUsers(page: number): Observable<ApiResponse<User[]>> {
    return this.httpClient.get<ApiResponse<User[]>>(
      `${environment.baseApiUrl}/users?page=${page}`
    );
  }

  getOneUser(id: number): Observable<{ data: User }> {
    return this.httpClient.get<{ data: User }>(
      `${environment.baseApiUrl}/users/${id}`
    );
  }

  editOneUser(id: number, updates: User): Observable<User> {
    console.log(updates);

    return this.httpClient.put<User>(
      `${environment.baseApiUrl}/users/${id}`,
      JSON.stringify(updates)
    );
  }

  addNewUser(user: User): Observable<User> {
    return this.httpClient.post<User>(
      `${environment.baseApiUrl}/users`,
      JSON.stringify(user)
    );
  }

  deleteUser(id: number) {
    var user = `${environment.baseApiUrl}/users/${id}`;
    return this.httpClient.delete(user);
  }
}
