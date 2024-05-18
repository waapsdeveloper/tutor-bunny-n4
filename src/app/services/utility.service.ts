import { StringsService } from './basic/strings.service';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AlertsService } from './basic/alerts.service';
import { LoadingService } from './basic/loading.service';
import { StorageService } from './basic/storage.service';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {

  constructor(
    public loading: LoadingService,
    public plt: Platform,
    public alerts: AlertsService,
    public strings: StringsService,
    public storage: StorageService,
  ) {}

  showLoader(msg = '') {
    return this.loading.showLoader(msg);
  }

  splitName(name) {
    const nameParts = name.trim().split(' ');

    let obj = {
      first_name: nameParts[0] || '',
      last_name: nameParts.length > 1 ? nameParts.slice(1).join(' ') : ''
    }

    return obj;

  }

  hideLoader() {
    return this.loading.hideLoader();
  }

  showAlert(msg: any, title = 'Alert') {
    return this.alerts.showAlert(msg, title);
  }

  presentToast(msg: any) {
    return this.alerts.presentToast(msg);
  }

  presentSuccessToast(msg: any) {
    return this.alerts.presentSuccessToast(msg);
  }

  presentFailureToast(msg: string) {
    return this.alerts.presentFailureToast(msg);
  }

  presentConfirm(
    okText = 'OK',
    cancelText = 'Cancel',
    title = 'Are You Sure?',
    message = '',
    okClass = '',
    cancelClass = ''
  ): Promise<boolean> {
    return this.alerts.presentConfirm(
      (okText = okText),
      (cancelText = cancelText),
      (title = title),
      (message = message),
      (okClass = okClass),
      (cancelClass = cancelClass)
    );
  }

  /** Storage Service **/
  setKey(key: any, value: any) {
    return this.storage.set(key, value);
  }

  getKey(key: any) {
    return this.storage.get(key);
  }

  /** Strings Service */
  capitalizeEachFirst(str: any) {
    return this.strings.capitalizeEachFirst(str);
  }

  capitalizeAllLetters(str: string) {
    return this.strings.capitalizeAllLetters(str);
  }

  isPhoneNumberValid(number: any) {
    return this.strings.isPhoneNumberValid(number);
  }

  checkIfMatchingPasswords(passwordKey: any, passwordConfirmationKey: any) {
    return this.strings.checkIfMatchingPasswords(
      passwordKey,
      passwordConfirmationKey
    );
  }

  validateEmail(email: any) {
    return this.strings.validateEmail(email);
  }

}
