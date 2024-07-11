import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { ServicioBDService } from 'src/app/services/servicio-bd.service';

@Component({
  selector: 'app-arrendar',
  templateUrl: './arrendar.page.html',
  styleUrls: ['./arrendar.page.scss'],
})
export class ArrendarPage implements OnInit {

  constructor(private menu: MenuController, private router: Router, public toastController: ToastController, private servicioBD: ServicioBDService) { }

  ngOnInit() {
  }

  arrendar: any = {
    Patente: "",
  }

  field: string = "";

  patente = "BCT 32";

  /* Validacion de usuario */
  arrendarBici() {
    /* Verificación: se ingresaron datos a los campos */
    if (this.validateModel(this.arrendar)) {
      /* Verificación: se ingresaron los datos correctos */
      this.servicioBD.arriendoPatente(this.arrendar.Patente);
      let navigationExtras: NavigationExtras = {
        state: { patenteEnviada: this.arrendar.Patente }
      }
    }
    else {
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
