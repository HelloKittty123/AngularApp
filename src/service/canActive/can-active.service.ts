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
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CanActiveService {
  constructor(
    private cacheService: CacheServiceService,
    private router: Router,
    private stateStateService: SessionStateService,
    private location: Location
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      this.cacheService.getCookie('email') &&
      this.cacheService.getCookie('userName')
    ) {
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
    if (
      this.cacheService.getCookie('email') &&
      this.cacheService.getCookie('userName')
    ) {
      this.location.back();
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
