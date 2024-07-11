import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ServicioBDService } from 'src/app/services/servicio-bd.service';

@Component({
  selector: 'app-mod-datos-cliente',
  templateUrl: './mod-datos-cliente.page.html',
  styleUrls: ['./mod-datos-cliente.page.scss'],
})
export class ModDatosClientePage implements OnInit {

  cliente: any [] = []

  constructor(private router: Router, private servicioBD: ServicioBDService) { }

  ngOnInit() {
    //this.servicioBD.presentAlert("1"); 
    this.servicioBD.dbState().subscribe((res) => {
      //this.servicioBD.presentAlert("2"); 
      if (res) {
        //this.servicioBD.presentAlert("3"); 
        this.servicioBD.fetchCliente().subscribe(item => {
          this.cliente = item;
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
    state: { cadenaTexto1: item.nroRut, cadenaTexto2: item.nombre, cadenaTexto3: item.apellido, cadenaTexto4: item.email, cadenaTexto5: item.estadoCuenta} 
    } 
      this.router.navigate(['/modificar-cliente'], navigationExtras); 
  } 
  
  eliminar(item) {
    this.servicioBD.deleteCliente(item.nroRut);
    this.servicioBD.presentAlert("Cuenta Eliminada");
    
  }

}
