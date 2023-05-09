import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { PostItem } from 'src/app/type';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getPost = (): Observable<PostItem[]> => {
    return this.http.get<PostItem[]>(`${environment.apiURL}posts`);
  };

  getPostPaging = (pageIndex: number): Observable<PostItem[]> => {
    return this.http
      .get<PostItem[]>(`${environment.apiURL}posts?_page=${pageIndex + 1}`)
      .pipe(delay(700));
  };

  getPostItem = (id: number): Observable<PostItem> => {
    return this.http
      .get<PostItem>(`${environment.apiURL}posts/${id}`)
      .pipe(delay(700));
  };
}
