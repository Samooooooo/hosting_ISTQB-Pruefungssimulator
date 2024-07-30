/* eslint-disable prettier/prettier */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsListModeComponent } from './questions-list-mode/questions-list-mode.component';
import { SingleQuestionModeComponent } from './single-question-mode/single-question-mode.component';

const routes: Routes = [
  { path: '', component: QuestionsListModeComponent },
  { path: ':index', component: SingleQuestionModeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearnRoutingModule {}
