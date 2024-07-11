import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EliminarBiciPage } from './eliminar-bici.page';

const routes: Routes = [
  {
    path: '',
    component: EliminarBiciPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EliminarBiciPageRoutingModule {}
