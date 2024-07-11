import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModDatosClientePage } from './mod-datos-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: ModDatosClientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModDatosClientePageRoutingModule {}
