import { Component } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { initializeApp } from 'firebase/app';

// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import { FirebaseService } from './services/firebase.service';
// register Swiper custom elements
register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  constructor(
    private fcm : FirebaseService
  ) {
    this.Initialize();
    
  }

  Initialize(){
    if(Capacitor.getPlatform() != 'web'){
      this.fcm.setupFMC();
    }
  }

}
