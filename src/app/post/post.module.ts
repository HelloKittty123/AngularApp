import { NgModule } from '@angular/core';

import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './post.component';
import { ShareModule } from '../share/share.module';

@NgModule({
  declarations: [PostComponent],
  imports: [ShareModule, PostRoutingModule],
})
export class PostModule {}
