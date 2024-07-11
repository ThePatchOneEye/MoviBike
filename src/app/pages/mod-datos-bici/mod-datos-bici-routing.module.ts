import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModDatosBiciPage } from './mod-datos-bici.page';

const routes: Routes = [
  {
    path: '',
    component: ModDatosBiciPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModDatosBiciPageRoutingModule {}
