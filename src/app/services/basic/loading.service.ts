import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loading!: HTMLIonLoadingElement;
  constructor(public loadingController: LoadingController) { }


  async showLoader(message = '') {


    this.loading = await this.loadingController.create({
      cssClass: 'my-loader-class',
      spinner: "circles", // Round spinner
      translucent: false,
      backdropDismiss: false
    });

    await this.loading.present();



  }

  async hideLoader() {
    if (this.loading) {
      this.loading.dismiss();
    }

  }

}
