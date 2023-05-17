import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserDetailDialogComponent } from '../dialog/user-detail-dialog/user-detail-dialog.component';
import { UserUpdateDialogComponent } from '../dialog/user-update-dialog/user-update-dialog.component';
import { ShareModule } from '../share/share.module';

@NgModule({
  declarations: [
    UserComponent,
    UserDetailDialogComponent,
    UserUpdateDialogComponent,
  ],
  imports: [UserRoutingModule, ShareModule],
})
export class UserModule {}
