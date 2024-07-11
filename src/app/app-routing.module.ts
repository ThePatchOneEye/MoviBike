import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'arrendar',
    loadChildren: () => import('./pages/arrendar/arrendar.module').then( m => m.ArrendarPageModule)
  },
  {
    path: 'buscar-estacionamiento',
    loadChildren: () => import('./pages/buscar-estacionamiento/buscar-estacionamiento.module').then( m => m.BuscarEstacionamientoPageModule)
  },
  {
    path: 'contrasena',
    loadChildren: () => import('./pages/contrasena/contrasena.module').then( m => m.ContrasenaPageModule)
  },
  {
    path: 'home2',
    loadChildren: () => import('./pages/home2/home2.module').then( m => m.Home2PageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'login-secundario',
    loadChildren: () => import('./pages/login-secundario/login-secundario.module').then( m => m.LoginSecundarioPageModule)
  },
  {
    path: 'home-admin',
    loadChildren: () => import('./pages/home-admin/home-admin.module').then( m => m.HomeAdminPageModule)
  },
  {
    path: 'home-func',
    loadChildren: () => import('./pages/home-func/home-func.module').then( m => m.HomeFuncPageModule)
  },
  {
    path: 'terminar-arriendo',
    loadChildren: () => import('./pages/terminar-arriendo/terminar-arriendo.module').then( m => m.TerminarArriendoPageModule)
  },
  {
    path: 'mod-datos-cliente',
    loadChildren: () => import('./pages/mod-datos-cliente/mod-datos-cliente.module').then( m => m.ModDatosClientePageModule)
  },
  {
    path: 'mod-datos-bici',
    loadChildren: () => import('./pages/mod-datos-bici/mod-datos-bici.module').then( m => m.ModDatosBiciPageModule)
  },
  {
    path: 'modificar-cliente',
    loadChildren: () => import('./pages/modificar-cliente/modificar-cliente.module').then( m => m.ModificarClientePageModule)
  },
  {
    path: 'eliminar-cliente',
    loadChildren: () => import('./pages/eliminar-cliente/eliminar-cliente.module').then( m => m.EliminarClientePageModule)
  },
  {
    path: 'modificar-bici',
    loadChildren: () => import('./pages/modificar-bici/modificar-bici.module').then( m => m.ModificarBiciPageModule)
  },
  {
    path: 'eliminar-bici',
    loadChildren: () => import('./pages/eliminar-bici/eliminar-bici.module').then( m => m.EliminarBiciPageModule)
  },
  {
    path: 'agregar-bici',
    loadChildren: () => import('./pages/agregar-bici/agregar-bici.module').then( m => m.AgregarBiciPageModule)
  },
  {
    path: 'datos-cliente',
    loadChildren: () => import('./pages/datos-cliente/datos-cliente.module').then( m => m.DatosClientePageModule)
  },
  {
    path: 'reporte-problema',
    loadChildren: () => import('./pages/reporte-problema/reporte-problema.module').then( m => m.ReporteProblemaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
