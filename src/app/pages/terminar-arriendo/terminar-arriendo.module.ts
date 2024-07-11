import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TerminarArriendoPageRoutingModule } from './terminar-arriendo-routing.module';

import { TerminarArriendoPage } from './terminar-arriendo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TerminarArriendoPageRoutingModule
  ],
  declarations: [TerminarArriendoPage]
})
export class TerminarArriendoPageModule {}
