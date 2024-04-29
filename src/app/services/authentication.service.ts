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
      console.log(result);
      resolve(true);
    });
  }

  checkGoogleAuthentication() {
    return new Promise(async (resolve) => {
      try {
        const result = await FirebaseAuthentication.signInWithGoogle();
        console.log(result);
        const user = result.user;
        if (user) {
          console.log('User is already authenticated:', user);
          resolve(true);
        } else {
          console.log('User is not authenticated.');
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
      console.log(result);
      resolve(false);
    });
  }
}
