import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Makes it available app-wide
})
export class TimeCheckService {
  private readonly APP_USE_TIME_KEY = 'appusetime';
  private readonly TIME_INTERVAL = 15 * 60 * 1000; // 15 minutes in milliseconds

  constructor() {}

  /**
   * Check if 15 minutes have passed since the last recorded time.
   * @returns {boolean} True if 15 minutes have passed, otherwise false.
   */
  hasTimeIntervalPassed(): boolean {
    const appUseTime = localStorage.getItem(this.APP_USE_TIME_KEY);
    const currentTime = new Date().getTime();

    if (appUseTime) {
      const timePassed = currentTime - parseInt(appUseTime, 10);
      if (timePassed > this.TIME_INTERVAL) {
        localStorage.setItem(this.APP_USE_TIME_KEY, currentTime.toString());
        return true;
      } else {
        return false;
      }
    } else {
      localStorage.setItem(this.APP_USE_TIME_KEY, currentTime.toString());
      return true; // Treat it as first-time usage.
    }
  }
}
