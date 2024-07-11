import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Bicicleta } from './bicicleta';
import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root'
})
export class ServicioBDService {

  public database: SQLiteObject;

  nomxxx: string;

  nomx: string;

  nomxx: string;
  /* Sentencia CREAR tablas */

  tablaTarjetaMuni: string = "CREATE TABLE IF NOT EXISTS tarjetaMuni(nroTarjetaMuni INTEGER PRIMARY KEY, fechaInicio TEXT NOT NULL, saldo NUMERIC NOT NULL);";

  tablaComuna: string = "CREATE TABLE IF NOT EXISTS comuna(idComuna INTEGER PRIMARY KEY autoincrement, nombreComuna TEXT NOT NULL);"

  tablaTipoUsuario: string = "CREATE TABLE IF NOT EXISTS tipoUsuario(idTipoUsuario INTEGER PRIMARY KEY autoincrement, nombreUsuario TEXT NOT NULL);";

  //tablaCliente: string = "CREATE TABLE IF NOT EXISTS cliente(nroRut INTEGER PRIMARY KEY, dvRut VARCHAR(1) NOT NULL, contrasena VARCHAR(8) NOT NULL, nombre TEXT NOT NULL, apellido TEXT NOT NULL, fechaNacimiento TEXT NOT NULL, email TEXT NOT NULL, nroTarjetaCredito NUMERIC NOT NULL, estadoCuenta TEXT NOT NULL, nroTarjetaMuni INTEGER, idComuna INTEGER, idTipoUsuario INTEGER, FOREIGN KEY(nroTarjetaMuni) REFERENCES tarjetaMuni(nroTarjetaMuni), FOREIGN KEY(idComuna) REFERENCES comuna(idComuna), FOREIGN KEY(idTipoUsuario) REFERENCES tipoUsuario(idTipoUsuario));";
  

  tablaCliente: string = "CREATE TABLE IF NOT EXISTS cliente(nroRut INTEGER PRIMARY KEY, dvRut VARCHAR(1) NOT NULL, nombre TEXT NOT NULL, apellido TEXT NOT NULL, fechaNacimiento TEXT NOT NULL, comuna TEXT NOT NULL, nroTarjetaCredito NUMERIC NOT NULL, nroTarjetaMuni INTEGER NOT NULL, email TEXT NOT NULL, contrasena VARCHAR(8) NOT NULL, estadoCuenta TEXT NOT NULL);";

  tablaBicicleta: string = "CREATE TABLE IF NOT EXISTS bicicleta(idBicicleta INTEGER PRIMARY KEY autoincrement, patente TEXT NOT NULL, estado TEXT NOT NULL, fechaIngreso TEXT NOT NULL);";

  tablaArriendo: string = "CREATE TABLE IF NOT EXISTS arriendo(idArriendo INTEGER PRIMARY KEY autoincrement, fechaInicio TEXT NOT NULL, fechaTermino TEXT NOT NULL, montoTotal NUMERIC NOT NULL, patente VARCHAR(8), nroRut INTEGER, FOREIGN KEY(patente) REFERENCES bicicleta(patente), FOREIGN KEY(nroRut) REFERENCES cliente(nroRut));";

  tablaMontos: string = "CREATE TABLE IF NOT EXISTS montos(idMonto INTEGER PRIMARY KEY autoincrement, montoInicial NUMERIC NOT NULL, montoHora NUMERIC NOT NULL);";

  tablaAdministrador: string = "CREATE TABLE IF NOT EXISTS administrador(nroRut INTEGER PRIMARY KEY, contrasena VARCHAR(8) NOT NULL, nombre TEXT NOT NULL, apellido TEXT NOT NULL, idTipoUsuario INTEGER, FOREIGN KEY(idTipoUsuario) REFERENCES tipoUsuario(idTipoUsuario));";

  /* Variable para mostrar mensaje de validación */
  field: string = "";

  //estadoObtenido: any [] = []

  listaBicicletas = new BehaviorSubject([]);

  listaClientes = new BehaviorSubject([]);

  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, public alertController: AlertController, private router: Router, public toastController: ToastController) {
    this.crearBD();
    //this.buscarNoticias(); 
    //this.presentAlert("todo listo"); 
  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  crearBD() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'movibike2.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        //this.presentAlert("BD Creada"); 
        //llamamos a la creación de tablas 
        this.crearTablas();
      }).catch(e => this.presentAlert(e));
    })
  }

  async crearTablas() {
    try {
      //await this.database.executeSql(this.tablaTarjetaMuni, []);
    //  await this.database.executeSql(this.tablaComuna, []);
  //    await this.database.executeSql(this.tablaTipoUsuario, []);
      await this.database.executeSql(this.tablaCliente, []);
      await this.database.executeSql(this.tablaBicicleta, []);
//      await this.database.executeSql(this.tablaArriendo, []);
//      await this.database.executeSql(this.tablaMontos, []);
//      await this.database.executeSql(this.tablaAdministrador, []);
//      await this.database.executeSql(this.registroBicicleta, []);
      //this.presentAlert("Creo la Tabla"); 
      this.buscarBicicletas();
      this.buscarClientes();
      this.isDbReady.next(true);
    } catch (e) {
      this.presentAlert("error creartabla " + e);
    }
  }

  buscarBicicletas() {
    //this.presentAlert("a"); 
    return this.database.executeSql('SELECT * FROM bicicleta', []).then(res => {
      let items: Bicicleta[] = [];
      //this.presentAlert("b"); 
      if (res.rows.length > 0) {
        //this.presentAlert("c"); 
        for (var i = 0; i < res.rows.length; i++) {
          //this.presentAlert("d"); 
          items.push({
            idBicicleta: res.rows.item(i).idBicicleta,
            patente: res.rows.item(i).patente,
            estado: res.rows.item(i).estado,
            fechaIngreso: res.rows.item(i).fechaIngreso
          });
        }
      }
      //this.presentAlert("d"); 
      this.listaBicicletas.next(items);
    });
  }

  fetchBicicleta(): Observable<Bicicleta[]> {
    return this.listaBicicletas.asObservable();
  }

  addBicicleta(patente, estado, fechaIngreso) {
    let data = [patente, estado, fechaIngreso];
    return this.database.executeSql('INSERT INTO bicicleta (patente, estado, fechaIngreso) VALUES (?, ?, ?)', data)
      .then(res => {
        this.buscarBicicletas();
      });
  }

  updateBicicleta(idBicicleta, patente, estado, fechaIngreso) {
    let data = [patente, estado, fechaIngreso, idBicicleta];
    return this.database.executeSql('UPDATE bicicleta SET patente = ?, estado = ?, fechaIngreso = ? WHERE idBicicleta = ?', data)
      .then(data2 => {
        this.buscarBicicletas();
      })
  }

  deleteBicicleta(patente) {
    return this.database.executeSql('DELETE FROM bicicleta WHERE patente = ?', [patente])
      .then(_ => {
        this.buscarBicicletas();
      });
  }

  async presentAlert(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Notificación',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }
  

  /* CRUD: Cliente */
  buscarClientes() {
    //this.presentAlert("a"); 
    return this.database.executeSql('SELECT * FROM cliente', []).then(res => {
      let items: Cliente[] = [];
      //this.presentAlert("b"); 
      if (res.rows.length > 0) {
        //this.presentAlert("c"); 
        for (var i = 0; i < res.rows.length; i++) {
          //this.presentAlert("d"); 
          items.push({
            nroRut: res.rows.item(i).nroRut,
            dvRut: res.rows.item(i).dvRut,
            contrasena: res.rows.item(i).contrasena,
            nombre: res.rows.item(i).nombre,
            apellido: res.rows.item(i).apellido,
            fechaNacimiento: res.rows.item(i).fechaNacimiento,
            email: res.rows.item(i).email,
            nroTarjetaCredito: res.rows.item(i).nroTarjetaCredito,
            estadoCuenta: res.rows.item(i).estadoCuenta,
            nroTarjetaMuni: res.rows.item(i).nroTarjetaMuni,
            comuna: res.rows.item(i).comuna,
          });
        }
      }
      //this.presentAlert("d"); 
      this.listaClientes.next(items);
    });
  }

  fetchCliente(): Observable<Cliente[]> {
    return this.listaClientes.asObservable();
  }

  addCliente(nroRut, dvRut, nombre, apellido, fechaNacimiento, comuna, nroTarjetaCredito, nroTarjetaMuni, email, contrasena, estadoCuenta) {
    let data = [nroRut, dvRut, nombre, apellido, fechaNacimiento, comuna, nroTarjetaCredito, nroTarjetaMuni, email, contrasena, estadoCuenta];
    return this.database.executeSql('INSERT INTO cliente (nroRut, dvRut, nombre, apellido, fechaNacimiento, comuna, nroTarjetaCredito, nroTarjetaMuni, email, contrasena, estadoCuenta) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', data)
      .then(res => {
        this.buscarClientes();
      });
  }

  updateCliente(comuna, nroTarjetaCredito, nroTarjetaMuni, email,  nroRut) {
    let data = [comuna, nroTarjetaCredito, nroTarjetaMuni, email, nroRut];
    return this.database.executeSql('UPDATE cliente SET comuna = ?, nroTarjetaCredito = ?, nroTarjetaMuni = ?, email = ? WHERE nroRut = ?', data)
      .then(data2 => {
        this.buscarClientes();
      })
  }

  deleteCliente(nroRut) {
    return this.database.executeSql('DELETE FROM cliente WHERE nroRut = ?', [nroRut])
      .then(_ => {
        this.buscarClientes();
      });
  }
  
  /* Funciones para el Cliente */
  loginCliente(nroRut, contrasena){
    return this.database.executeSql('SELECT * FROM cliente WHERE nroRut = ? AND contrasena = ?', [nroRut, contrasena]).then(res => {
      let items: Cliente[] = [];
      
      //this.presentAlert("b"); 
      if (res.rows.length > 0) {

        for (var i = 0; i < res.rows.length; i++) { 
          //this.presentAlert("d");
          items.push({ 
            nroRut: res.rows.item(i).nroRut,
            dvRut: res.rows.item(i).dvRut,
            nombre: res.rows.item(i).nombre,
            apellido: res.rows.item(i).apellido,
            fechaNacimiento: res.rows.item(i).fechaNacimiento,
            comuna: res.rows.item(i).comuna,
            nroTarjetaCredito: res.rows.item(i).nroTarjetaCredito,
            nroTarjetaMuni: res.rows.item(i).nroTarjetaMuni,
            email: res.rows.item(i).email,
            contrasena: res.rows.item(i).contrasena,
            estadoCuenta: res.rows.item(i).estadoCuenta
           });
           this.nomxxx = res.rows.item(i).estadoCuenta;


        }
        //this.presentAlert(this.nomxxx);
        if (this.nomxxx == "Habilitado"){
          this.router.navigate(['/home']);
        }
        else {
          this.presentAlert2("Su cuenta está deshabilitada");

        }
      }
      else{
        this.presentToast("El usuario y/o contraseña son incorrectos " + this.field);
      }
      //this.presentAlert("d"); 
      this.listaClientes.next(items);
    });
  }


  mandarDatos(nroRut, contrasena){
    return this.database.executeSql('SELECT * FROM cliente WHERE nroRut = ? AND contrasena = ?', [nroRut, contrasena]).then(res => {
      let items: Cliente[] = [];
      //this.presentAlert("b"); 
      if (res.rows.length > 0) {
        //this.estadoObtenido = items;
        //this.presentToast(this.estadoObtenido);
        this.router.navigate(['/datos-clientes']);
      }
      else{
        this.presentToast("El usuario y/o contraseña son incorrectos " + this.field);
      }
      //this.presentAlert("d"); 
      this.listaClientes.next(items);
    });
  }
  

  buscarPatente(patente){
    return this.database.executeSql('SELECT * FROM bicicleta WHERE patente = ?', [patente]).then(res => {
      let items: Cliente[] = [];
      //this.presentAlert("b"); 
      if (res.rows.length > 0) {
        this.router.navigate(['/home']);
      }
      else{
        this.presentToast("La patente  " + this.field + " no está registrada");
      }
      //this.presentAlert("d"); 
      this.listaBicicletas.next(items);
    });
  }

  arriendoPatente(patente){
    return this.database.executeSql('SELECT * FROM bicicleta WHERE patente = ?', [patente]).then(res => {
      let items: Bicicleta[] = [];
      
      //this.presentAlert("b"); 
      if (res.rows.length > 0) {

        for (var i = 0; i < res.rows.length; i++) { 
          //this.presentAlert("d");
          items.push({ 
            idBicicleta: res.rows.item(i).idBicicleta,
            patente: res.rows.item(i).patente,
            estado: res.rows.item(i).estado,
            fechaIngreso: res.rows.item(i).fechaIngreso
           });
           this.nomx = res.rows.item(i).estado;
           this.nomxx = res.rows.item(i).patente;


        }
        //this.presentAlert(this.nomxxx);
        if (this.nomx == "Disponible"){
          let navigationExtras: NavigationExtras = {
            state: { patenteEnviada: this.nomxx }
          }
          this.router.navigate(['/home2'], navigationExtras);
        }
        else {
          this.presentAlert2("La bicicleta no se encuentra disponible");

        }
      }
      else{
        this.presentToast("La patente ingresada no es correcta " + this.field);
      }
      //this.presentAlert("d"); 
      this.listaClientes.next(items);
    });
  }
  

  
  /* Funciones para el Administrador */
  updateClienteadmin(estadoCuenta, nroRut) {
    let data = [estadoCuenta, nroRut];
    return this.database.executeSql('UPDATE cliente SET estadoCuenta = ? WHERE nroRut = ?', data)
      .then(data2 => {
        this.buscarClientes();
      })
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

  async presentAlert2(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'ATENCIÓN',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

}
