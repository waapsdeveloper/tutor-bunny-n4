import { Injectable } from '@angular/core';
import { ModalController, AnimationController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(
    public modal: ModalController,
    private animationCtrl: AnimationController
  ) {}

  private enterFromLeftAnimation(baseEl: HTMLElement): any {
    const root = baseEl.shadowRoot;
    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root?.querySelector('ion-backdrop')!)
      .fromTo('opacity', 0.01, 0.4);

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root?.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, transform: 'translateX(-100%)' },
        { offset: 1, transform: 'translateX(0)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  }

  present(
    component: any,
    data = {},
    cssClass = '',
    initialBreakpoint = 1,
    animationType: string = ''
  ): Promise<any> {
    return new Promise(async (resolve) => {
      const modal = await this.modal.create({
        component,
        cssClass,
        componentProps: data,
        initialBreakpoint: initialBreakpoint,
        breakpoints: [0, 0.25, 0.5, 0.75, 1],
        ...(animationType === 'left-to-right' && {
          enterAnimation: this.enterFromLeftAnimation.bind(this),
        }),
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
