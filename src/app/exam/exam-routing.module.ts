/* eslint-disable prettier/prettier */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamModeComponent } from './exam-mode/exam-mode.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: ExamModeComponent },
  { path: ':index', component: ExamModeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamRoutingModule {}
