import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarBiciPageRoutingModule } from './modificar-bici-routing.module';

import { ModificarBiciPage } from './modificar-bici.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarBiciPageRoutingModule
  ],
  declarations: [ModificarBiciPage]
})
export class ModificarBiciPageModule {}
