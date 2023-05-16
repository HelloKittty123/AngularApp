import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { CommentItem } from 'src/app/type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  getComment = (idPost: number): Observable<CommentItem[]> => {
    return this.http
      .get<CommentItem[]>(`${environment.apiURL}post/${idPost}/comments`)
      .pipe(delay(700));
  };

  postComment = (comment: CommentItem): Observable<CommentItem> => {
    return this.http
      .post<CommentItem>(`${environment.apiURL}comments`, comment)
      .pipe(delay(700));
  };
}
