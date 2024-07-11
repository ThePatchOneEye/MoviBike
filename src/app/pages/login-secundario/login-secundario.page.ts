import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router'; /* Librerias para redireccion */
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login-secundario',
  templateUrl: './login-secundario.page.html',
  styleUrls: ['./login-secundario.page.scss'],
})
export class LoginSecundarioPage implements OnInit {

  /* Modelo login que permite obtener y setear información para el login */
  login:any = {
    Usuario: "",
    Rut: "",
    Contrasena: ""
  }

  /* Variable para mostrar mensaje de validación */
  field: string = "";
  
  /* Usuario autorizado para logearse */
  rutAdmin = "11111111";
  passwordAdmin = "admin";

  rutFunc = "22222222";
  passwordFunc = "func";

  /* Arreglo para las opciones del menú */
  categoria: any[] = [
    {id: 1, tipoUser: "Administrador"},
    {id: 2, tipoUser: "Funcionario"}
  ]

  /* Seleccionamos o iniciamos el valor '0' del <select> */
  opcionSeleccionado: string = '0';
  verSeleccion: string = '';

  constructor(private router: Router, public toastController: ToastController) { }

  ngOnInit() {
  }

  /* Validacion de usuario */
  ingresar(){
    /* Verificación: se ingresaron datos a los campos */
    if(this.validateModel(this.login)){
      /* Usuario Administrador */
      if(this.login.Usuario == "Administrador") {
        /* Verificación Administrador: se ingresaron los datos correctos */
        if(this.login.Rut == this.rutAdmin && this.login.Contrasena == this.passwordAdmin){
          let navigationExtras: NavigationExtras = {
            state: { adminEnviado: this.login.Email}    
          }
          this.router.navigate(['/home-admin'], navigationExtras);
        }
      } 
  
      /* Usuario Funcionario */
      else if(this.login.Usuario == "Funcionario") {
        /* Verificación Funcionario: se ingresaron los datos correctos */
        if(this.login.Rut == this.rutFunc && this.login.Contrasena == this.passwordFunc){
          let navigationExtras: NavigationExtras = {
            state: { funcEnviado: this.login.Email}
          }
          this.router.navigate(['/home-func'], navigationExtras);
        }
      }
    }
    
    /* Mensaje en caso de no seleccionar un tipo de usuario */
    else if(this.login.Usuario == "") {
      this.presentToast("Debe seleccionar un tipo de usuario");
    }

    /* Mensaje en caso de no no llenar los campos */
    else{
      this.presentToast("El usuario y/o contraseña son incorrectos");
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
