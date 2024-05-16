import { Component } from '@angular/core';
import { NavService } from '../services/nav.service';
import { AuthenticationService } from '../services/authentication.service';
import { ViewWillEnter } from '@ionic/angular';
import { ModalService } from '../services/basic/modal.service';
import { FakeAccountsComponent } from './fake-accounts/fake-accounts.component';
import { ProfileService } from '../services/profile.service';
import { NetworkService } from '../services/network.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements ViewWillEnter {
  loading = false;
  googleauth;
  user;
  constructor(
    private nav: NavService,
    public authService: AuthenticationService,
    private modals: ModalService,
    private profiles: ProfileService,
    private network: NetworkService
  ) { }

  ionViewWillEnter(): void {
  }


  gotoDashboard() {
    this.nav.push('tabs');
  }
  async continueWithGoogle() {
    this.googleauth = await this.authService.googleAuth();
    if (this.googleauth && this.googleauth.user && this.googleauth.user.providerData) {
      let key = localStorage.getItem('role');
      const data = {
        name: this.googleauth.user.displayName,
        email: this.googleauth.user.email,
        password: this.googleauth.credential.accessToken,
        login_type: this.googleauth.user.providerData[0].providerId,
        role_id: key,
        image: this.googleauth.user.photoUrl
      }
      console.log(data);
      // return

      this.user = await this.network.login(data) as any[];
      let user = this.user.user;
      localStorage.setItem("user", JSON.stringify(user));
      const profile = await this.profiles.isProfileCompleted(user);
      console.log(profile);

      let roleId = parseInt(user.role_id);
      if (!profile) {
        console.log(roleId);

        if (roleId == 2) {
          this.nav.push('/student-profile/student-profile-edit', {
            backUrl: '/home',
          });
        }
        if (roleId == 3) {
          this.nav.push('/teacher-profile/teacher-profile-edit', {
            backUrl: '/home',
          });
        }

      } else {
        console.log(roleId);

        if (roleId == 2) {
          this.nav.push('/tabs/student-dashboard', {
            backUrl: '/home',
          });
        }
        if (roleId == 3) {
          this.nav.push('/tabs/teacher-dashboard', {
            backUrl: '/home',
          });
        }
      }
    }
  }

  async continueWithFake() {
    const res = await this.modals.present(FakeAccountsComponent, {}, '', 0.5);
    console.log(res.data);
    // return

    console.log(res);
    if (res.data) {
      const user = res.data;

      console.log(user);

      const isProfileCompleted = await this.profiles.isProfileCompleted(user);
      console.log(isProfileCompleted);
      const roleId = parseInt(user.role_id);
      if (roleId === 3) {
        if (!isProfileCompleted) {
          this.nav.push('/teacher-profile/teacher-profile-edit', {
            queryParams: { backUrl: '/home',  }
          });
        }
        else{
          this.nav.push('/tabs/teacher-dashboard', {
            queryParams: { backUrl: '/home' }
          });
        }
      }
      else {
        if (!isProfileCompleted) {
          this.nav.push('/student-profile/student-profile-edit', {
            queryParams: { backUrl: '/home' }
          });
        } else if (roleId === 2) {
          this.nav.push('/tabs/student-dashboard', {
            queryParams: { backUrl: '/home' }
          });
        }
      }
    }
  }


  back() {
    this.nav.pop('/role-base');
  }
}
