import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss'],
})
export class ForbiddenComponent {
  constructor(private location: Location) {}

  back = (): void => {
    this.location.back();
  };
}
