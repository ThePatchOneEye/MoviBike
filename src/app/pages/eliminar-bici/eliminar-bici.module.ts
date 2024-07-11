import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EliminarBiciPageRoutingModule } from './eliminar-bici-routing.module';

import { EliminarBiciPage } from './eliminar-bici.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EliminarBiciPageRoutingModule
  ],
  declarations: [EliminarBiciPage]
})
export class EliminarBiciPageModule {}
