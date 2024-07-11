import { Component } from '@angular/core';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { ServicioBDService } from 'src/app/services/servicio-bd.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {

  usuario: string;

  /* Variable para mostrar mensaje de validación */
  field: string = "";

  /* Modelo register/formulario que permite obtener y setear información para el registro */
  data:any={
    rut:"",
    dvRut: "",
    nombre:"",
    apellido:"",
    nacimiento:"",
    comuna:"",
    nroTarjetaCredito:"",
    nroTarjetaMuni:"",
    correo:"",
    contrasena:"",
    estadoCuenta:"Habilitado"
  };

  comuna: any[] = [
    {id: 1, nombreComuna: "La Reina"},
    {id: 2, nombreComuna: "Providencia"},
    {id: 3, nombreComuna: "Nuñoa"}
  ]

  constructor(public alertController: AlertController, private activedRoute: ActivatedRoute, private router: Router, public toastController: ToastController, private servicioBD: ServicioBDService) {
    this.activedRoute.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation().extras.state){
        this.usuario = this.router.getCurrentNavigation().extras.state.textoEnviado;
      }
    });
  }

  borrar(){
    for (var [key, value] of Object.entries(this.data)) {
      Object.defineProperty(this.data,key,{value:""})
    }
  }

  /* Validacion de formulario */
 
  crear(){
    /* Verificación: se ingresaron datos a los campos */
    if(this.validateModel(this.data)){
      /* Verificación: se ingresaron los datos correctos */
      this.servicioBD.addCliente(this.data.rut, this.data.dvRut, this.data.nombre, this.data.apellido, this.data.nacimiento, this.data.comuna, this.data.nroTarjetaCredito, this.data.nroTarjetaMuni, this.data.correo, this.data.contrasena, this.data.estadoCuenta);
      this.servicioBD.presentAlert("¡Cuenta creada! Bienvenido "+ this.data.nombre+ " " +this.data.apellido + " a MoviBike, esperamos que tenga un buen recorrido");
      this.router.navigate(['/login']);
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

  async presentAlert(titulo:string,message:string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: message,
      buttons: ['¡Ok!']
    });

    await alert.present();
  }

}
