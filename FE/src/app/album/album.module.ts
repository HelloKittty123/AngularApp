import { NgModule } from '@angular/core';

import { AlbumRoutingModule } from './album-routing.module';
import { AlbumComponent } from './album.component';
import { ShareModule } from '../share/share.module';

@NgModule({
  declarations: [AlbumComponent],
  imports: [ShareModule, AlbumRoutingModule],
})
export class AlbumModule {}
