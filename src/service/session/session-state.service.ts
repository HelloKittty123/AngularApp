import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStateService {
  private url: string = '';

  constructor() {}

  storeUrl = (path: string): void => {
    this.url = path;
  };

  getUrl = (): string => {
    return this.url;
  };

  clearUrl = (): void => {
    this.url = '';
  };
}
