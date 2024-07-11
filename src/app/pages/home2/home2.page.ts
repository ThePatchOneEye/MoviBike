import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.page.html',
  styleUrls: ['./home2.page.scss'],
})
export class Home2Page implements OnInit {

  patenteRecibida: string;

  constructor(private menu: MenuController, private activatedRoute: ActivatedRoute, private router: Router) {
    /* Función para recibir los parámetros enviados desde otra página */
    this.activatedRoute.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation().extras.state) {
        /* Se instancia con 'this.patente' lo que se envía desde login 'patenteEnviada' */
        this.patenteRecibida = this.router.getCurrentNavigation().extras.state.patenteEnviada;
      }
    });
  }
  
  ngOnInit() {
  }

  terminar(){
    let navigationExtras: NavigationExtras = {
      state: { patenteEnviada: this.patenteRecibida }
    }
    this.router.navigate(['/terminar-arriendo'], navigationExtras);
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  openAlterno() {
    this.menu.enable(true, 'alterno');
    this.menu.open('alterno');
  }

  closeCustom() {
    this.menu.close('custom');
  }

  closeAlterno() {
    this.menu.close('alterno');
  }

}
