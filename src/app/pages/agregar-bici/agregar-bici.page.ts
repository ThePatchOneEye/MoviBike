import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ServicioBDService } from 'src/app/services/servicio-bd.service';

@Component({
  selector: 'app-agregar-bici',
  templateUrl: './agregar-bici.page.html',
  styleUrls: ['./agregar-bici.page.scss'],
})
export class AgregarBiciPage implements OnInit {

  bicicleta: any = 
    {
      patente: '',
      estado: '',
      fechaIngreso: ''
    }

  estadoxd: any[] = [
    {id: 1, tipoEstado: "Disponible"},
    {id: 2, tipoEstado: "No Disponible"}
  ]

  field: string = "";

  constructor(private router: Router, private servicioBD: ServicioBDService, public toastController: ToastController) { }

  ngOnInit() {
  }

  guardar(){
    /* Verificación: se ingresaron datos a los campos */
    if(this.validateModel(this.bicicleta)){
      /* Verificación: se ingresaron los datos correctos */
      this.servicioBD.addBicicleta(this.bicicleta.patente, this.bicicleta.estado, this.bicicleta.fechaIngreso);
      this.servicioBD.presentAlert("Bicicleta agregada con éxito");
      this.router.navigate(['/mod-datos-bici']);
    }
    else{
      this.presentToast("Debe ingresar " + this.field);
    }
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
