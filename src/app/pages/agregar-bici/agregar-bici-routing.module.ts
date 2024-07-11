import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarBiciPage } from './agregar-bici.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarBiciPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarBiciPageRoutingModule {}
