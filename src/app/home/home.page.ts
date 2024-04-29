import { Component } from '@angular/core';
import { NavService } from '../services/nav.service';
import { AuthenticationService } from '../services/authentication.service';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements ViewWillEnter {
  loading = false;

  constructor(
    private nav: NavService,
    public authService: AuthenticationService
  ) {}

  ionViewWillEnter(): void {
    // this.initialize();
  }

  // async initialize() {
  //   var self = this;
  //   self.loading = true;

  //   const isLogin = await this.authService.checkGoogleAuthentication();
  //   self.loading = false;
  //   if (isLogin) {
  //     this.nav.push('tabs');
  //   }

  // setTimeout(async () => {
  //   self.loading = false;
  //   console.log('WWE');
  // }, 5000);
  // }

  gotoDashboard() {
    this.nav.push('tabs');
  }
  async continueWithGoogle() {
    const res = await this.authService.googleAuth();
    this.nav.push('tabs');
  }
}
