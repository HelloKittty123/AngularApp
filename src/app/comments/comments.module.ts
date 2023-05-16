import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { CommentsComponent } from './comments.component';
import { ConfirmLeaveDialogComponent } from '../confirm-leave-dialog/confirm-leave-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CommentsComponent, ConfirmLeaveDialogComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
})
export class CommentsModule {}
export { CommentsComponent };
