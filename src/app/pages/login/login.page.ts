import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router'; /* Librerias para redireccion */
import { ToastController } from '@ionic/angular';
import { ServicioBDService } from 'src/app/services/servicio-bd.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  /* Modelo user que permite obtener y setear información para el login */
  login:any = {
    Rut: "",
    Contrasena: ""
  }

  /* Variable para mostrar mensaje de validación */
  field: string = "";
  
  /* Usuario autorizado para logearse */
  rut = "33333333";
  password = "123";

  constructor(private router: Router, public toastController: ToastController, private servicioBD: ServicioBDService) { }

  ngOnInit() {
  }

  /* Validacion de usuario */
  ingresar(){
    /* Verificación: se ingresaron datos a los campos */
    if(this.validateModel(this.login)){
      /* Verificación: se ingresaron los datos correctos */
      this.servicioBD.loginCliente(this.login.Rut, this.login.Contrasena);
      //this.servicioBD.mandarDatos(this.login.Rut, this.login.Contrasena);





      
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
