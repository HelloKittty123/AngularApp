import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { User } from 'src/app/type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserByPaging = (pageIndex: number): Observable<User[]> => {
    return this.http
      .get<User[]>(`${environment.apiURL}users?_page=${pageIndex}`)
      .pipe(delay(700));
  };

  getUserDetail = (userId: number): Observable<User> => {
    return this.http
      .get<User>(`${environment.apiURL}users/${userId}`)
      .pipe(delay(700));
  };

  createUser = (user: User): Observable<User> => {
    return this.http
      .post<User>(`${environment.apiURL}users`, user)
      .pipe(delay(700));
  };

  updateUser = (user: User): Observable<User> => {
    return this.http
      .put<User>(`${environment.apiURL}users/${user.id}`, user)
      .pipe(delay(700));
  };

  deleteUser = (userId: number): Observable<User> => {
    return this.http
      .delete<User>(`${environment.apiURL}users/${userId}`)
      .pipe(delay(700));
  };
}
