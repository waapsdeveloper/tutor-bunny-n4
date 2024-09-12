import { Component, NgZone } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { initializeApp } from 'firebase/app';

// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import { FirebaseService } from './services/firebase.service';
import { ModalController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { UtilityService } from './services/utility.service';
import { App, URLOpenListenerEvent } from '@capacitor/app';
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
    private fcm: FirebaseService,
    public platform: Platform,
    private router: Router,
    public utility: UtilityService,
    private modalController: ModalController,
    private zone: NgZone
  ) {
    this.initializeApp();

    this.Initialize();
    platform.ready().then(async () => {
      // menuCtrl.enable(false, 'main'
      // set default url from app side
      this.beInitialize();
    });
  }

  initializeApp() {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
        this.zone.run(() => {
            // Example url: https://beerswift.app/tabs/tab2
            // slug = /tabs/tab2
            const slug = event.url.split(".app").pop();
            if (slug) {
                this.router.navigateByUrl(slug);
            }
            // If no match, do nothing - let regular routing
            // logic take over
        });
    });
}

  Initialize() {
    if (Capacitor.getPlatform() != 'web') {
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
