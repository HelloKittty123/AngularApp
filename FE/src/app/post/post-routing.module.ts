import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './post.component';
import { CommentsComponent } from './comments/comments.component';
import { DeActiveGuard } from 'src/service/canLeave/can-leave-service.service';

const routes: Routes = [
  {
    path: ':id/comments',
    component: CommentsComponent,
    canDeactivate: [DeActiveGuard],
  },
  { path: '', component: PostComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
