import { Component, NgZone } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { FirebaseService } from './services/firebase.service';
import { ModalController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { UtilityService } from './services/utility.service';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { InitializeAppService } from './services/sqlite/initialize.app.service';
// register Swiper custom elements

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public isWeb: boolean = false;

  isModalOpen: any;
  constructor(
    private fcm: FirebaseService,
    public platform: Platform,
    private router: Router,
    public utility: UtilityService,
    private modalController: ModalController,
    private zone: NgZone,
    private iap: InitializeAppService,
  ) {

    platform.ready().then(async () => {
      this.Initialize();
    });
  }



  async Initialize() {

    if( Capacitor.getPlatform() === "web") {
      this.isWeb = true;
    }

    await this.iap.initializeApp();

    if (Capacitor.getPlatform() != 'web') {
      this.fcm.setupFMC();
    }

    this.deepLinkRegister();
    this.registerBackButtonEvent();

    this.router.navigate(['/splash']);

  }

  registerBackButtonEvent() {
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

  deepLinkRegister() {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      this.zone.run(() => {
        // Example url: https://beerswift.app/tabs/tab2
        // slug = /tabs/tab2
        const slug = event.url.split('.app').pop();
        if (slug) {
          this.router.navigateByUrl(slug);
        }
        // If no match, do nothing - let regular routing
        // logic take over
      });
    });
  }


  async createBackRoutingLogics(url) {

    if (
      url.includes('splash') ||
      url.includes('role-base') ||
      url.includes('tabs/teacher-dashbaord') ||
      url.includes('tabs/student-dashboard')
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
