import { NgModule } from '@angular/core';

import { ForbiddenRoutingModule } from './forbidden-routing.module';
import { ForbiddenComponent } from './forbidden.component';
import { ShareModule } from '../share/share.module';

@NgModule({
  declarations: [ForbiddenComponent],
  imports: [ForbiddenRoutingModule, ShareModule],
})
export class ForbiddenModule {}
