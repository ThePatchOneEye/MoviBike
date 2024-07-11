import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModDatosBiciPageRoutingModule } from './mod-datos-bici-routing.module';

import { ModDatosBiciPage } from './mod-datos-bici.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModDatosBiciPageRoutingModule
  ],
  declarations: [ModDatosBiciPage]
})
export class ModDatosBiciPageModule {}
