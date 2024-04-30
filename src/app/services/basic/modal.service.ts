import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(public modal: ModalController) {}

  present(
    component: any,
    data = {},
    cssClass = '',
    initialBreakpoint = 1
  ): Promise<any> {
    return new Promise(async (resolve) => {
      const modal = await this.modal.create({
        component,
        cssClass,
        componentProps: data,
        initialBreakpoint: initialBreakpoint,
        breakpoints: [0, 0.25, 0.5, 0.75, 1],
      });
      modal.onDidDismiss().then((res) => {
        resolve(res);
      });
      await modal.present();
    });
  }

  dismiss(data: any | string = {}): Promise<any> {
    return new Promise((resolve) => {
      if (typeof data === 'string') {
        data = { result: data };
      }
      data.dismiss = true;
      this.modal.dismiss(data).then((v) => resolve(true));
    });
  }
}
