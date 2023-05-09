import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';

import { PhotoRoutingModule } from './photo-routing.module';
import { PhotoComponent } from './photo.component';

@NgModule({
  declarations: [PhotoComponent],
  imports: [
    CommonModule,
    PhotoRoutingModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
})
export class PhotoModule {}
