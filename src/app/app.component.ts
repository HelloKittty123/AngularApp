import { Component, OnInit } from '@angular/core';
import { Role, RoutePath, User } from './type';
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
  user: User | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cacheService: CacheServiceService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getAuthenticationState().subscribe((user) => {
      this.user = user;
    });

    this.userService.getIdentity();

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
    this.userService.authenticate(null);
    this.router.navigate(['login']);
  };
}
