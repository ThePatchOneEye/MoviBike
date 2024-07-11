import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarBiciPageRoutingModule } from './agregar-bici-routing.module';

import { AgregarBiciPage } from './agregar-bici.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarBiciPageRoutingModule
  ],
  declarations: [AgregarBiciPage]
})
export class AgregarBiciPageModule {}
