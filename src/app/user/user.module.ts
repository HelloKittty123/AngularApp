import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserDetailDialogComponent } from '../user-detail-dialog/user-detail-dialog.component';
import { UserUpdateDialogComponent } from '../user-update-dialog/user-update-dialog.component';

@NgModule({
  declarations: [
    UserComponent,
    UserDetailDialogComponent,
    UserUpdateDialogComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatDialogModule,
    MatGridListModule,
    MatButtonModule,
  ],
})
export class UserModule {}
