import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginSecundarioPage } from './login-secundario.page';

const routes: Routes = [
  {
    path: '',
    component: LoginSecundarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginSecundarioPageRoutingModule {}
