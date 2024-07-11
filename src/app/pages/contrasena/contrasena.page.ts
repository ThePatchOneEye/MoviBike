import { Component, OnInit } from '@angular/core';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-contrasena',
  templateUrl: './contrasena.page.html',
  styleUrls: ['./contrasena.page.scss'],
})
export class ContrasenaPage implements OnInit {

  email: string;
  password: string;

  /* Modelo recuperar contraseña/formulario que permite obtener y setear información para la recuperación */
  data:any={
    email:"",
    contrasena1:"",
    contrasena2:""
  };

  /* Variable para mostrar mensaje de validación */
  field: string = "";

  constructor(public alertController: AlertController, private activedRoute: ActivatedRoute, private router: Router, public toastController: ToastController) {
    this.activedRoute.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation().extras.state){
        this.email = this.router.getCurrentNavigation().extras.state.textoEnviado;
      }
    });
  }

  ngOnInit() {
  }

  borrar2(){
    for (var [key, value] of Object.entries(this.data)) {
      Object.defineProperty(this.data,key,{value:""})
    }
  }

  /* Validacion de formulario */
  cambiar(){
    /* Verificación: se ingresaron datos a los campos */
    if(this.validateModel(this.data)){
      if(this.data.contrasena1 == this.data.contrasena2) {
        /* Mensaje de recuperación exitosa */
        this.presentAlert("¡Contraseña cambiada!","");
        /* Redirección */
        let navigationExtras: NavigationExtras = {
          state: { textoEnviado: this.data.email}
        }
        this.router.navigate(['/login'], navigationExtras);
      }
      else{
        this.presentToast("Las contraseñas no coinciden");
      }
    }
    else{
      this.presentToast("Debe ingresar " + this.field + " válido");
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

  async presentAlert(titulo:string,message:string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: message,
      buttons: ['¡Ok!']
    });

    await alert.present();
  }

}
