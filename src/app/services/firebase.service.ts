import { Injectable } from '@angular/core';
import { EventsService } from './events.service';
import { NetworkService } from './network.service';

import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(
    public events: EventsService,
    public network: NetworkService,
  ) {
    this.assignEvents();
  }

  assignEvents() {
    this.events.subscribe(
      'user:settokentoserver',
      this.setTokenToServer.bind(this)
    );
  }

  async setTokenToServer() {

    if (Capacitor.getPlatform() != 'web') {

      const token = await this.getFCMToken();
      if (!token) {
        return;
      }

      let user = JSON.parse(localStorage.getItem('user'));
      const obj = {
        email: user.email,
        token: token
      };
      if (obj) {
        this.network.saveFcmToken(obj).then(
          (dats) => { },
          (err) => {
            console.error(err);
          }
        );
      }

    }

  }

  async setupFMC() {

    return new Promise(async resolve => {

      if (Capacitor.getPlatform() !== 'web') {
        await this.setupNativePush();
      }

      resolve(true);

    })


    //   this.fcm.subscribeToTopic('all');
    //   this.fcm.onNotification().subscribe(data => {
    //     if (!data.wasTapped) {
    //       this.audio.play("");
    //       if (data['showalert'] != null) {
    //         this.events.publish('user:shownotificationalert', data);
    //       } else {
    //         this.events.publish('user:shownotification', data);
    //       }
    //     };
    //   })
    //   this.fcm.onTokenRefresh().subscribe(token => {
    //     this.sqlite.setFcmToken(token);
    //     this.events.publish('user:settokentoserver');
    //   });
  }

  setupNativePush() {
    return new Promise<void>((resolve) => {

      PushNotifications.requestPermissions().then((result) => {

        if (result.receive === 'granted') {
          PushNotifications.register();
          resolve();
        } else {
          // Show some error
          resolve();
        }

      });

      // On success, we should be able to receive notifications
      PushNotifications.addListener('registration', (token: Token) => {

        localStorage.setItem('fcm_token', token.value);
      });

      PushNotifications.addListener('registrationError', (error: any) => {
        console.error('Error on registration: ' + JSON.stringify(error));
      });

      PushNotifications.addListener(
        'pushNotificationReceived',
        (notification: PushNotificationSchema) => {
          this.events.publish('dashboard:notificationReceived');
          this.events.publish('dashboard:refreshpage');
        }
      );

      PushNotifications.addListener(
        'pushNotificationActionPerformed',
        (notification: ActionPerformed) => {
          this.events.publish('dashboard:refreshpage');

          localStorage.setItem('is_move_to_notifications', 'yes');

          this.events.publish('dashboard:redirecttonotificationspage');
        }
      );

      resolve();
    });
  }

  async getFCMToken() {
    return new Promise((resolve) => {
      const token = localStorage.getItem('fcm_token');
      if (token) {
        resolve(token);
      }

      resolve(null);

    });
  }
}
