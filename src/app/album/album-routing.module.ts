import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from './album.component';
import { PhotoComponent } from './photo/photo.component';

const routes: Routes = [
  { path: ':id/photo', component: PhotoComponent },
  { path: '', component: AlbumComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlbumRoutingModule {}
