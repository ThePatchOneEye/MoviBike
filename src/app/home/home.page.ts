import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private menu: MenuController) { }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  openAlterno() {
    this.menu.enable(true, 'alterno');
    this.menu.open('alterno');    
  }

  closeCustom() {
    this.menu.close('custom');
  }

  closeAlterno() {
    this.menu.close('alterno');
  }
  
}
