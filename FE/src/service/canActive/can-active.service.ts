import { Observable } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { CacheServiceService } from '../cache/cache-service.service';
import { SessionStateService } from '../session/session-state.service';
import { UserService } from '../user/user.service';
import { Role } from 'src/app/type';

@Injectable({
  providedIn: 'root',
})
export class CanActiveService {
  constructor(
    private cacheService: CacheServiceService,
    private router: Router,
    private stateStateService: SessionStateService,
    private userService: UserService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.cacheService.getCookie('token')) {
      const authority: Role = route.data['authority'];
      if (authority && !this.userService.hasAuthority(authority)) {
        this.router.navigate(['forbidden'], { replaceUrl: true });
        return false;
      }
      return true;
    } else {
      this.stateStateService.storeUrl(state.url);
      this.router.navigate(['login']);
      return false;
    }
  }

  canActiveLogin(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.cacheService.getCookie('token')) {
      this.router.navigate(['']);

      return false;
    }
    return true;
  }
}
export const ActiveGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  return inject(CanActiveService).canActivate(route, state);
};

export const ActiveLoginGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  return inject(CanActiveService).canActiveLogin(route, state);
};
