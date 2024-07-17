import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  //
  constructor(
    public location: Location,
    public router: Router,
    private navc: NavController,
    //  private nativePageTransitions: NativePageTransitions
    public activatedRoute: ActivatedRoute
  ) {}

  async setRoot(page: any, param = {}) {
    // await this.nativePageTransitions.fade(null);
    const extras: NavigationExtras = {
      queryParams: param,
    };
    this.navigateTo(page, extras);
  }

  async push(page: any, param = {}) {
    // this.options.direction = 'left';
    // await this.nativePageTransitions.slide(this.options);
    const extras: NavigationExtras = {
      queryParams: param,
    };
    this.navigateTo(page, extras);
  }

  async pop1(data: any) {
    return new Promise<void>(async (resolve) => {
      this.location.back();
      resolve(data);
    });
  }

  async pop(link = '') {
    return new Promise<void>(async (resolve) => {
      // ;
      if(link){
        this.navc.navigateBack(link);
      } else {
        this.location.back()
      }

      resolve();
    });
  }

  navigateTo(link: any, data?: NavigationExtras) {
    this.router.navigate([link], data);
  }

  navigateToChild(link: any, data?: NavigationExtras) {
    this.router.navigate([link], data);
  }

  getParams() {
    return this.activatedRoute.snapshot.params;
  }

  getQueryParams() {
    return this.activatedRoute.snapshot.queryParams;
  }
}
