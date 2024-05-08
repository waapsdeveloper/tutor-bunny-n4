import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor() {}

  isProfileCompleted(user) {
    return new Promise((resolve) => {
      resolve(true);
    });
  }
}
