import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ServicioBDService } from 'src/app/services/servicio-bd.service';

@Component({
  selector: 'app-modificar-cliente',
  templateUrl: './modificar-cliente.page.html',
  styleUrls: ['./modificar-cliente.page.scss'],
})
export class ModificarClientePage implements OnInit {

  cliente: any = 
    {
      nroRut: '',
      nombre: '',
      apellido: '',
      email: '',
      estadoCuenta: ''
    };

  estadoxd: any[] = [
    {id: 1, tipoEstadocuenta: "Habilitado"},
    {id: 2, tipoEstadocuenta: "No Habilitado"}
  ]

  field: string = "";

  constructor(private router: Router, private activeroute: ActivatedRoute, private servicioBD: ServicioBDService, public toastController: ToastController) {
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.cliente.nroRut = this.router.getCurrentNavigation().extras.state.cadenaTexto1;
        this.cliente.nombre = this.router.getCurrentNavigation().extras.state.cadenaTexto2;
        this.cliente.apellido = this.router.getCurrentNavigation().extras.state.cadenaTexto3;
        this.cliente.email = this.router.getCurrentNavigation().extras.state.cadenaTexto4;
        this.cliente.estadoCuenta = this.router.getCurrentNavigation().extras.state.cadenaTexto5;
      }
    });
  }

  ngOnInit() {
  }

  editar() {
    this.servicioBD.updateClienteadmin(this.cliente.estadoCuenta, this.cliente.nroRut);
    this.servicioBD.presentAlert("El estado de la cuenta del cliente fue editado con éxito");
    this.router.navigate(['/mod-datos-cliente']);
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
