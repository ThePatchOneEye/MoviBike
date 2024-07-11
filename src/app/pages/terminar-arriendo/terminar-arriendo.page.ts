import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-terminar-arriendo',
  templateUrl: './terminar-arriendo.page.html',
  styleUrls: ['./terminar-arriendo.page.scss'],
})
export class TerminarArriendoPage implements OnInit {

  /* Variable que recibe como parámetro la patente arrendada */
  patente: string;

  /* Variable / Estructura para la muestra de información */
  patenteInfo = "BCT 32";
  fechaInicio = "03/11/2021 14:55";
  fechaTermino ="03/11/2021 16:50";
  monto = "800";

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { 
    /* Función para recibir los parámetros enviados desde otra página */
    this.activatedRoute.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation().extras.state) {
        /* Se instancia con 'this.patente' lo que se envía desde login 'patenteEnviada' */
        this.patente = this.router.getCurrentNavigation().extras.state.patenteEnviada;
      }
    });
  }

  ngOnInit() {
  }


}
