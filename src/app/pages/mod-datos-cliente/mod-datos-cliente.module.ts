import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModDatosClientePageRoutingModule } from './mod-datos-cliente-routing.module';

import { ModDatosClientePage } from './mod-datos-cliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModDatosClientePageRoutingModule
  ],
  declarations: [ModDatosClientePage]
})
export class ModDatosClientePageModule {}
