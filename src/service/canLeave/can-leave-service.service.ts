import { Observable } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivateFn,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { CommentsComponent } from 'src/app/comments/comments.component';

@Injectable({
  providedIn: 'root',
})
export class CanLeaveServiceService {
  constructor() {}

  canDeactivate<CommentsComponent>(
    component: CommentsComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return component.isEdit();
  }
}

export interface CheckDeactivate {
  checkDeactivate(
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree;
}

export const DeActiveGuard: CanDeactivateFn<CommentsComponent> = (
  component: CommentsComponent,
  currentRoute: ActivatedRouteSnapshot,
  currentState: RouterStateSnapshot,
  nextState: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  return inject(CanLeaveServiceService).canDeactivate(
    component,
    currentRoute,
    currentState,
    nextState
  );
};
