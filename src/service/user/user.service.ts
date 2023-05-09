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
}
