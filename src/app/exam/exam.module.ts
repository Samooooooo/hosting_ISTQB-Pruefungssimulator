import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamRoutingModule } from './exam-routing.module';
import { ExamModeComponent } from './exam-mode/exam-mode.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ExamModeComponent],
  imports: [CommonModule, ExamRoutingModule, FormsModule],
})
export class ExamModule {}
