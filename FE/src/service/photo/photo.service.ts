import { Observable, delay } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PhotoItem } from 'src/app/type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  constructor(private http: HttpClient) {}

  getPhotoByAlbumId = (albumId: number): Observable<PhotoItem[]> => {
    return this.http
      .get<PhotoItem[]>(`${environment.apiURL}albums/${albumId}/photos`)
      .pipe(delay(700));
  };
}
