import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearnRoutingModule } from './learn-routing.module';
import { SingleQuestionModeComponent } from './single-question-mode/single-question-mode.component';
import { QuestionsListModeComponent } from './questions-list-mode/questions-list-mode.component';

@NgModule({
  declarations: [SingleQuestionModeComponent, QuestionsListModeComponent],
  imports: [CommonModule, LearnRoutingModule],
})
export class LearnModule {}
