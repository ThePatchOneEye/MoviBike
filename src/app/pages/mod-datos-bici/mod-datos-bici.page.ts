import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ServicioBDService } from 'src/app/services/servicio-bd.service';
import { Bicicleta} from 'src/app/services/bicicleta';


@Component({
  selector: 'app-mod-datos-bici',
  templateUrl: './mod-datos-bici.page.html',
  styleUrls: ['./mod-datos-bici.page.scss'],
})
export class ModDatosBiciPage implements OnInit {

/*  bicicleta: any = [
    {
      patente: '',
      estado: '',
      fechaIngreso: ''
    }
  ]*/

  bicicleta: any [] = []
  
  constructor(private router: Router, private servicioBD: ServicioBDService) {
    //this.servicioBD.buscarBicicletas();
    /*    this.activedRouter.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.bicicleta.patente = this.router.getCurrentNavigation().extras.state.patenteenviado;
        this.bicicleta.estado = this.router.getCurrentNavigation().extras.state.estadoenviado;
        this.bicicleta.fechaIngreso = this.router.getCurrentNavigation().extras.state.fechaingresoenviado;
      }
    }) */
  }

  ngOnInit() {
    //this.servicioBD.presentAlert("1"); 
    this.servicioBD.dbState().subscribe((res) => {
      //this.servicioBD.presentAlert("2"); 
      if (res) {
        //this.servicioBD.presentAlert("3"); 
        this.servicioBD.fetchBicicleta().subscribe(item => {
          this.bicicleta = item;
        })
      }
      //this.servicioBD.presentAlert("4"); 
    });
  }

  getItem($event) {
    const valor = $event.target.value;
    console.log('valor del control: ' + valor);
  }


  editar(item) { 
    console.log(item); 
    let navigationExtras: NavigationExtras = { 
    state: { cadenaTexto1: item.idBicicleta, cadenaTexto2: item.patente, cadenaTexto3: item.estado, cadenaTexto4: item.fechaIngreso} 
    } 
      this.router.navigate(['/modificar-bici'], navigationExtras); 
  } 
  
  eliminar(item) {
    this.servicioBD.deleteBicicleta(item.patente);
    this.servicioBD.presentAlert("Registro Eliminado");
    
  }

}
