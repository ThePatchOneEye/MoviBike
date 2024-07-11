import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ServicioBDService } from 'src/app/services/servicio-bd.service';

@Component({
  selector: 'app-modificar-bici',
  templateUrl: './modificar-bici.page.html',
  styleUrls: ['./modificar-bici.page.scss'],
})
export class ModificarBiciPage implements OnInit {

  bicicleta: any = 
    {
      idBicicleta: '',
      patente: '',
      estado: '',
      fechaIngreso: ''
    };

  estadoxd: any[] = [
    {id: 1, tipoEstado: "Disponible"},
    {id: 2, tipoEstado: "No Disponible"}
  ]

  field: string = "";

  constructor(private router: Router, private activeroute: ActivatedRoute, private servicioBD: ServicioBDService, public toastController: ToastController) {
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.bicicleta.idBicicleta = this.router.getCurrentNavigation().extras.state.cadenaTexto1;
        this.bicicleta.patente = this.router.getCurrentNavigation().extras.state.cadenaTexto2;
        this.bicicleta.estado = this.router.getCurrentNavigation().extras.state.cadenaTexto3;
        this.bicicleta.fechaIngreso = this.router.getCurrentNavigation().extras.state.cadenaTexto4;
      }
    });
  }

  ngOnInit() {
  }

  editar() {
    this.servicioBD.updateBicicleta(this.bicicleta.idBicicleta, this.bicicleta.patente, this.bicicleta.estado, this.bicicleta.fechaIngreso);
    this.servicioBD.presentAlert("Los datos de la bicicleta fueron editados con éxito");
    this.router.navigate(['/mod-datos-bici']);
  }

  /* Uso de validateModel para verificar el ingreso de datos */
  validateModel(model:any){
    for (var [key, value] of Object.entries(model)) {
      if (value=="") {
        this.field=key;
        return false;
      }
    }
    return true;
  }

  /* Mensaje de error */
  async presentToast(message:string, duration?:number){
    const toast = await this.toastController.create(
      {
        message:message,
        duration:duration?duration:2000
      }
    );
    toast.present();
  }
}
