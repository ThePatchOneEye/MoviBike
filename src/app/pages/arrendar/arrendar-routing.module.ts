import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArrendarPage } from './arrendar.page';

const routes: Routes = [
  {
    path: '',
    component: ArrendarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArrendarPageRoutingModule {}
