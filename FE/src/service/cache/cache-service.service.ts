import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CacheServiceService {
  constructor(private cookieService: CookieService) {}

  setCookie = (name: string, value: string): void => {
    this.cookieService.set(name, value);
  };

  getCookie = (name: string): string => {
    return this.cookieService.get(name);
  };

  clearCookie = (): void => {
    this.cookieService.deleteAll();
  };
}
