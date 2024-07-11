import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReporteProblemaPage } from './reporte-problema.page';

const routes: Routes = [
  {
    path: '',
    component: ReporteProblemaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReporteProblemaPageRoutingModule {}
