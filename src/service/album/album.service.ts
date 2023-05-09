import { AlbumItem } from './../../app/type';
import { Observable, delay } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  constructor(private http: HttpClient) {}

  getAlbumsByUserId = (userId: number): Observable<AlbumItem[]> => {
    return this.http
      .get<AlbumItem[]>(`${environment.apiURL}users/${userId}/albums`)
      .pipe(delay(700));
  };

  getAlbumById = (albumId: number): Observable<AlbumItem> => {
    return this.http
      .get<AlbumItem>(`${environment.apiURL}albums/${albumId}`)
      .pipe(delay(700));
  };
}
