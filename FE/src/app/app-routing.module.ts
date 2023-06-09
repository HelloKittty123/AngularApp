import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {
  ActiveGuard,
  ActiveLoginGuard,
} from 'src/service/canActive/can-active.service';
import { Role } from './type';

const routes: Routes = [
  {
    path: 'post',
    canActivate: [ActiveGuard],
    loadChildren: () => import('./post/post.module').then((m) => m.PostModule),
  },
  {
    path: 'album',
    canActivate: [ActiveGuard],

    loadChildren: () =>
      import('./album/album.module').then((m) => m.AlbumModule),
  },
  {
    path: 'user',
    canActivate: [ActiveGuard],
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
    data: { authority: Role.Admin },
  },
  {
    path: '',
    redirectTo: 'post',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
    canActivate: [ActiveLoginGuard],
  },
  {
    path: 'forbidden',
    loadChildren: () =>
      import('./forbidden/forbidden.module').then((m) => m.ForbiddenModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
