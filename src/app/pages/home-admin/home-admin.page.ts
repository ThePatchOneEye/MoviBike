import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.page.html',
  styleUrls: ['./home-admin.page.scss'],
})
export class HomeAdminPage implements OnInit {

  constructor(private menu: MenuController) { }

  ngOnInit() {
  }

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
