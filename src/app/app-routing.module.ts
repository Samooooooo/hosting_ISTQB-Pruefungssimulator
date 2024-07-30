/* eslint-disable prettier/prettier */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ScoreComponent } from './shared/score/score.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'homepage',
    pathMatch: 'full',
  },
  {
    path: 'homepage',
    component: HomepageComponent,
  },
  {
    path: 'learn',
    loadChildren: () =>
      import('./learn/learn.module').then((m) => m.LearnModule),
  },
  {
    path: 'check',
    loadChildren: () =>
      import('./check/check.module').then((m) => m.CheckModule),
  },
  {
    path: 'exam',
    loadChildren: () => import('./exam/exam.module').then((m) => m.ExamModule),
  },
  {
    path: 'scores',
    component: ScoreComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
