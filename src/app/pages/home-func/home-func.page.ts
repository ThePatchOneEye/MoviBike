import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home-func',
  templateUrl: './home-func.page.html',
  styleUrls: ['./home-func.page.scss'],
})
export class HomeFuncPage implements OnInit {

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

