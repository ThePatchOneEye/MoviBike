import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ServicioBDService } from 'src/app/services/servicio-bd.service';

@Component({
  selector: 'app-datos-cliente',
  templateUrl: './datos-cliente.page.html',
  styleUrls: ['./datos-cliente.page.scss'],
})
export class DatosClientePage implements OnInit {

  // Modelo que recibe los parametros habilitados 
  datosCliente: any = 
    {
      comunaEditada: '',
      creditoEditada: '',
      municipalidadEditada: '',
      emailEditada: '',
      rutEditada: ''
    };

  cliente: any [] = []

  field: string = "";

  constructor(private router: Router, private servicioBD: ServicioBDService, public toastController: ToastController) { }

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

  actualizarDatosCliente(){
    this.servicioBD.updateCliente(this.datosCliente.comunaEditada, this.datosCliente.creditoEditada, this.datosCliente.municipalidadEditada, this.datosCliente.emailEditada, this.datosCliente.rutEditada);
    this.servicioBD.presentAlert("Los datos fueron actualizados con éxito");
    this.router.navigate(['/home']);
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
