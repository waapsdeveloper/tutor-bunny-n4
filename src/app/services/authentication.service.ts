import { Injectable, NgZone } from '@angular/core';

import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { obj } from './../interfaces/google-user';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userData: any;
  constructor() {}

  // Auth providers
  googleAuth() {
    return new Promise(async (resolve) => {
      const result = await FirebaseAuthentication.signInWithGoogle();
      resolve(result);
    });
  }

  checkGoogleAuthentication() {
    return new Promise(async (resolve) => {
      try {
        const result = await FirebaseAuthentication.signInWithGoogle();
        const user = result.user;
        if (user) {
          resolve(true);
        } else {
          resolve(false);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        resolve(false);
      }
    });
  }

  logout() {
    return new Promise(async (resolve) => {
      const result = await FirebaseAuthentication.signOut();
      resolve(false);
    });
  }
}
