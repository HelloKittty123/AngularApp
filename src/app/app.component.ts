import { Component, OnInit } from '@angular/core';
import { RoutePath } from './type';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { CacheServiceService } from 'src/service/cache/cache-service.service';
import { UserService } from 'src/service/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angularApp';
  loadingStatus: boolean = false;
  links: RoutePath[] = [
    { title: 'Post', path: 'post' },
    { title: 'Album', path: 'album' },
    { title: 'User', path: 'user' },
  ];
  activeLink!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cacheService: CacheServiceService,
    private userService: UserService
  ) {}

  isLogin(): boolean {
    return this.userService.isLogin();
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.activeLink = this.links.filter((link) =>
          event.urlAfterRedirects.includes(link.path)
        )[0]?.path;
      }
    });
  }

  logout = (): void => {
    this.cacheService.clearCookie();
    this.router.navigate(['login']);
  };
}
