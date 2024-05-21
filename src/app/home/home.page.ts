import { Component, Injector } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ViewWillEnter } from '@ionic/angular';
import { FakeAccountsComponent } from './fake-accounts/fake-accounts.component';
import { BasePage } from '../base-page/base-page';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage extends BasePage implements ViewWillEnter {
  loading = false;
  googleauth;
  params: any;

  constructor(
    injector: Injector,
    public authService: AuthenticationService,
  ) {
    super(injector)
  }

  ionViewWillEnter(): void {
    this.params = this.nav.getQueryParams();
    console.log(this.params)
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

      const res = await this.network.login(data) as any;
      this.users.setUser(res.user)

      const flag = await this.profiles.isProfileCompleted(res.user);
      console.log(flag);


      let roleId = this.users.getUserRole();
      console.log(roleId, "sadad");


      if (!flag) {

        if (roleId == 2) {
          this.nav.push('/student-dashboard/student-profile-edit', {
            backUrl: '/home',
          });
        }
        if (roleId == 3) {
          console.log("fdgcbv nbvcb fv");

          this.nav.push('/teacher-profile/teacher-profile-edit', {
            backUrl: '/home', showBack: false, title: 'Create Profile'
          });
        }

      } else {

        if (roleId == 2) {
          this.nav.push('/tabs/student-dashboard', {
            backUrl: '/home',
          });
        }
        if (roleId == 3) {
          console.log("sdsdfdsfs");

          this.nav.push('/tabs/teacher-dashboard', {
            backUrl: '/home',
          });
        }
      }
    }
  }

  async continueWithFake() {
    const res = await this.modals.present(FakeAccountsComponent, {
      role: this.params.role
    }, '', 0.5);
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
            backUrl: '/home',
          });
        }
        else {
          this.nav.push('/tabs/teacher-dashboard', {
            backUrl: '/home'
          });
        }
      }
      else {
        if (!isProfileCompleted) {
          this.nav.push('/tabs/student-dashboard', {
            backUrl: '/home'
          });
        } else if (roleId === 2) {
          this.nav.push('/tabs/student-dashboard', {
            backUrl: '/home'
          });
        }
      }
    }
  }

  async gotoEmailDashboard() {
    let res = await this.modals.present(LoginPage, {}, "", 0.7);

    if (res.data) {
      let user = res.data

      const isProfileCompleted = await this.profiles.isProfileCompleted(user);
      console.log(isProfileCompleted);
      const roleId = parseInt(user.role_id);
      if (roleId === 3) {
        if (!isProfileCompleted) {
          this.nav.push('/teacher-profile/teacher-profile-edit', {
            backUrl: '/home',
          });
        }
        else {
          this.nav.push('/tabs/teacher-dashboard', {
            backUrl: '/home'
          });
        }
      }
      else {
        if (!isProfileCompleted) {
          this.nav.push('/tabs/student-dashboard', {
            backUrl: '/home'
          });
        } else if (roleId === 2) {
          this.nav.push('/tabs/student-dashboard', {
            backUrl: '/home'
          });
        }
      }
    }
  }


  back() {
    this.nav.pop('/role-base');
  }
}
