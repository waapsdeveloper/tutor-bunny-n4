import { Component } from '@angular/core';
import { NavService } from '../services/nav.service';
import { AuthenticationService } from '../services/authentication.service';
import { ViewWillEnter } from '@ionic/angular';
import { ModalService } from '../services/basic/modal.service';
import { FakeAccountsComponent } from './fake-accounts/fake-accounts.component';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements ViewWillEnter {
  loading = false;

  constructor(
    private nav: NavService,
    public authService: AuthenticationService,
    private modals: ModalService,
    private profiles: ProfileService
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

  async continueWithFake() {
    const res = await this.modals.present(FakeAccountsComponent, {}, '', 0.5);
    console.log(res);
    if (res.data) {
      let user = res.data;
      const isf = await this.profiles.isProfileCompleted(user);

      if (!isf) {
        if (parseInt(user.role_id) == 2) {
          this.nav.push('/student-profile/student-profile-edit', {
            backUrl: '/home',
          });
        }
        if (parseInt(user.role_id) == 3) {
          this.nav.push('/teacher-profile/teacher-profile-edit', {
            backUrl: '/home',
          });
        }
      } else {
        this.nav.push('/tabs');
      }
    }
    // face objects
  }

  back() {
    this.nav.pop('/role-base');
  }
}
