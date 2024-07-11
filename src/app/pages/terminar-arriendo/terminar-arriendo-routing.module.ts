import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TerminarArriendoPage } from './terminar-arriendo.page';

const routes: Routes = [
  {
    path: '',
    component: TerminarArriendoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TerminarArriendoPageRoutingModule {}
