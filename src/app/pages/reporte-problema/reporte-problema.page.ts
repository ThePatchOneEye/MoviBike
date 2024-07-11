import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';





import { Camera, CameraOptions } from '@ionic-native/camera/ngx';




import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reporte-problema',
  templateUrl: './reporte-problema.page.html',
  styleUrls: ['./reporte-problema.page.scss'],
})
export class ReporteProblemaPage implements OnInit {

  /* Variable para mostrar mensaje de validación */
  field: string = "";

  image: any;

  /* Arreglo para las opciones del menú */
  tipoProblema: any[] = [
    {id: 1, tipoNombre: "Sistema"},
    {id: 2, tipoNombre: "Bicicleta"},
    {id: 3, tipoNombre: "Otro"},
  ]

  /* Modelo login que permite obtener y setear información para el login */
  reporte:any = {
    tipoProblema: "",
    comentario: "",
    //fotoReporte: ""
  }

  constructor(
    private camera: Camera, private router: Router, public alertController: AlertController, public toastController: ToastController
  ) { }

  ngOnInit() {
  }

  takePicture(){
    const options:CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    this.camera.getPicture(options)
    .then((imageData) => {
      this.image = 'data:image/jpeg:base64,' + imageData;
    }, (err) => {
      console.log(err);
    });
  }





  
  enviarReporte(){
    if(this.validateModel(this.reporte)){
      this.presentAlert("Su reporte a sido enviado con éxito");
      this.router.navigate(['/home']);
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

  async presentAlert(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'ATENCIÓN',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

}
