import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckRoutingModule } from './check-routing.module';
import { CheckModeComponent } from './check-mode/check-mode.component';

@NgModule({
  declarations: [CheckModeComponent],
  imports: [CommonModule, CheckRoutingModule],
})
export class CheckModule {}
