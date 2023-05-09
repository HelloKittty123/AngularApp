import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './post.component';
import { CommentsComponent } from '../comments/comments.component';

const routes: Routes = [
  { path: ':id/comments', component: CommentsComponent },
  { path: '', component: PostComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
