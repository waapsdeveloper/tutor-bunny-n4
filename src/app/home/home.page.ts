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
  }


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

        if (parseInt(user.role_id) == 2) {
          this.nav.push('/tabs/student-dashboard', {
            backUrl: '/home',
          });
        }
        if (parseInt(user.role_id) == 3) {
          this.nav.push('/tabs/teacher-dashboard', {
            backUrl: '/home',
          });
        }

      }
    }
    // face objects
  }

  back() {
    this.nav.pop('/role-base');
  }
}
