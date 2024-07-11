import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginSecundarioPageRoutingModule } from './login-secundario-routing.module';

import { LoginSecundarioPage } from './login-secundario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginSecundarioPageRoutingModule
  ],
  declarations: [LoginSecundarioPage]
})
export class LoginSecundarioPageModule {}
