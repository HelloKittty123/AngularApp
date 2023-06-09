import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { ShareLibsModule } from './share-libs/share-libs.module';
import { PhotoComponent } from '../album/photo/photo.component';
import { CommentsComponent } from '../post/comments/comments.component';
import { ConfirmLeaveDialogComponent } from '../dialog/confirm-leave-dialog/confirm-leave-dialog.component';

@NgModule({
  imports: [ShareLibsModule, MaterialModule],
  declarations: [
    PhotoComponent,
    CommentsComponent,
    ConfirmLeaveDialogComponent,
  ],
  exports: [MaterialModule, ShareLibsModule],
})
export class ShareModule {}
