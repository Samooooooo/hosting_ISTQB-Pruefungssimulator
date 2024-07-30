/* eslint-disable prettier/prettier */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckModeComponent } from './check-mode/check-mode.component';

const routes: Routes = [
  { path: '', redirectTo: '0', pathMatch: 'full' },
  { path: ':index', component: CheckModeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckRoutingModule {}
