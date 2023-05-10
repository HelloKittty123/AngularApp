import { Component, DoCheck, OnInit } from '@angular/core';
import { RoutePath } from './type';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements DoCheck {
  title = 'angularApp';
  links: RoutePath[] = [
    { title: 'Post', path: 'post' },
    { title: 'Album', path: 'album' },
    { title: 'User', path: 'user' },
  ];
  activeLink!: string;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngDoCheck(): void {
    if (this.router.url !== '/')
      this.activeLink = this.links.filter((link) =>
        this.router.url.includes(link.path)
      )[0].path;
  }
}
