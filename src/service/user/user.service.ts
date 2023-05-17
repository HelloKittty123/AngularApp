import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, delay, map } from 'rxjs';
import * as CryptoJS from 'crypto-js';

import { Role, User } from 'src/app/type';
import { environment } from 'src/environments/environment';
import { CacheServiceService } from '../cache/cache-service.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User | null = null;
  private authenticationState = new ReplaySubject<User | null>(1);

  constructor(
    private http: HttpClient,
    private cacheService: CacheServiceService
  ) {}

  getAuthenticationState = (): Observable<User | null> => {
    return this.authenticationState.asObservable();
  };

  authenticate = (user: User | null): void => {
    this.user = user;
    this.authenticationState.next(this.user);
  };

  hasAuthority = (authority: Role): boolean => {
    return this.user?.role === authority;
  };

  getIdentity = (): void => {
    var token: string = this.cacheService.getCookie('token');
    if (token) {
      this.authenticate(
        JSON.parse(
          CryptoJS.AES.decrypt(token.trim(), environment.key.trim()).toString(
            CryptoJS.enc.Utf8
          )
        )
      );
    }
  };

  getUserByPaging = (pageIndex: number): Observable<HttpResponse<User[]>> => {
    return this.http
      .get<User[]>(`${environment.apiURL}users?_page=${pageIndex}`, {
        params: {
          role: 2,
        },
        observe: 'response',
      })
      .pipe(delay(700));
  };

  login = (loginUser: {
    email: string;
    password: string;
  }): Observable<User[]> => {
    return this.http
      .get<User[]>(`${environment.apiURL}users`, {
        params: {
          email: loginUser.email,
          username: loginUser.password,
        },
      })
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
