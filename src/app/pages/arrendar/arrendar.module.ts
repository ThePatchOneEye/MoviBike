import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArrendarPageRoutingModule } from './arrendar-routing.module';

import { ArrendarPage } from './arrendar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArrendarPageRoutingModule
  ],
  declarations: [ArrendarPage]
})
export class ArrendarPageModule {}
