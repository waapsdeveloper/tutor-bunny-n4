import { Injectable, NgZone } from '@angular/core';
import { User } from '../shared/user';
import { Router } from '@angular/router';
import { NavService } from './nav.service';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userData: any;
  constructor() {}

  // Auth providers
  AuthLogin(provider: any) {
    return new Promise((resolve) => {});
  }
}
