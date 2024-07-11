import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscarEstacionamientoPageRoutingModule } from './buscar-estacionamiento-routing.module';

import { BuscarEstacionamientoPage } from './buscar-estacionamiento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscarEstacionamientoPageRoutingModule
  ],
  declarations: [BuscarEstacionamientoPage]
})
export class BuscarEstacionamientoPageModule {}
