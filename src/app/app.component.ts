import { Component } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { initializeApp } from 'firebase/app';

// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import { FirebaseService } from './services/firebase.service';
import { ModalController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { UtilityService } from './services/utility.service';
// register Swiper custom elements
register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  isModalOpen: any;
  constructor(
    private fcm : FirebaseService, public platform: Platform,  private router: Router, public utility: UtilityService,     private modalController: ModalController

  ) {
    this.Initialize();
    platform.ready().then( async () => {
      // menuCtrl.enable(false, 'main'
      // set default url from app side
      this.beInitialize();
    })

  }

  Initialize(){
    if(Capacitor.getPlatform() != 'web'){
      this.fcm.setupFMC();
    }
  }
  async beInitialize() {

    document.addEventListener(
      'backbutton',
      (event) => {
        event.preventDefault();
        event.stopPropagation();
        const url = this.router.url;
        console.log(url);
        this.createBackRoutingLogics(url);
      },
      false
    );
  }

  async createBackRoutingLogics(url) {
    if (
      url.includes('splash') ||
      url.includes('role-base') ||
      url.includes('home')
    ) {
      this.utility.hideLoader();

      const isModalOpen = await this.modalController.getTop();
      if (isModalOpen) {
        this.modalController.dismiss({ data: 'A' });
      } else {
        this.exitApp();
      }
    } else {
      if (this.isModalOpen) {
      }
    }
  }

  exitApp() {
    navigator['app'].exitApp();
  }

}
