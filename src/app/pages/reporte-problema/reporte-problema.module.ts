import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReporteProblemaPageRoutingModule } from './reporte-problema-routing.module';

import { ReporteProblemaPage } from './reporte-problema.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReporteProblemaPageRoutingModule
  ],
  declarations: [ReporteProblemaPage]
})
export class ReporteProblemaPageModule {}
