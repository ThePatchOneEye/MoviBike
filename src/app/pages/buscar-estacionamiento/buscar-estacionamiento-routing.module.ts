import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuscarEstacionamientoPage } from './buscar-estacionamiento.page';

const routes: Routes = [
  {
    path: '',
    component: BuscarEstacionamientoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuscarEstacionamientoPageRoutingModule {}
