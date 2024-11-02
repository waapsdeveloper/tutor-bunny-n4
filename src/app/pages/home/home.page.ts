import { Component, Injector } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ViewWillEnter } from '@ionic/angular';
import { FakeAccountsComponent } from './fake-accounts/fake-accounts.component';
import { BasePage } from '../../base-page/base-page';
import { LoginPage } from '../login/login.page';
import { TeacherWelcomePage } from '../teacher-welcome/teacher-welcome.page';
import { log } from 'node:console';
import { SignUpPage } from '../sign-up/sign-up.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage extends BasePage implements ViewWillEnter {
  loading = false;
  googleauth;
  params: any;
  user;
  role_Id;
  constructor(injector: Injector, public authService: AuthenticationService) {
    super(injector);
  }

  ionViewWillEnter(): void {
    this.params = this.nav.getQueryParams();
    if (this.params.role) {
      this.role_Id = this.params.role;
    }
  }

  gotoDashboard() {
    this.nav.push('tabs');
  }
  async continueWithGoogle() {
    this.googleauth = await this.authService.googleAuth();
    if (
      this.googleauth &&
      this.googleauth.user &&
      this.googleauth.user.providerData
    ) {
      let key = localStorage.getItem('role');
      const data = {
        name: this.googleauth.user.displayName,
        email: this.googleauth.user.email,
        password: this.googleauth.credential.accessToken,
        login_type: this.googleauth.user.providerData[0].providerId,
        role_id: key,
        image: this.googleauth.user.photoUrl,
      };

      const res = (await this.network.login(data)) as any;
      if (res.user) {
        localStorage.setItem('token', res.token);
        let user = res.user;
        this.users.setUser(user);
        this.redirectDependsOnRole(user);
      }
    }
  }

  async gotoEmailDashboard() {
    let res = await this.modals.present(
      LoginPage,
      {
        role: this.params.role,
      },
      'auto-height-modal',
      1,
      [0, 1],
      true
    );
    console.log(res);
    if(res && res.data &&res.data.back == true){
      return
    }
    if (res && res.data.step) {
      let res = await this.modals.present(
        SignUpPage,
        {
          role: this.params.role,
        },
        '',
        0.75,
        [0, 0.5, 0.75, 1]
      );
      if (res.data) {
        let res = await this.modals.present(
          LoginPage,
          {
            role: this.params.role,
          },
          'auto-height-modal',
          1,
          [0, 1],
          true
        );

      }
    }

    this.user = this.users.getUser();
    if (this.user) {
      let user = this.user;
      this.users.setUser(user);
      this.redirectDependsOnRole(user);
    }
  }

  async redirectDependsOnRole(user) {
    const isProfileCompleted = await this.profiles.isProfileCompleted(user);
    const roleId = parseInt(user.role_id);
    let role_Id = localStorage.getItem('role');
    if (parseInt(role_Id) === roleId) {
      if (roleId === 3) {
        if (!isProfileCompleted) {
          let res = await this.modals.present(
            TeacherWelcomePage,
            {},
            'auto-height-modal',
            1,
            [0, 1],
            true
          );
          this.nav.push('/teacher-profile/teacher-profile-edit', {
            backUrl: '/home',
          });
        } else {
          this.nav.push('/tabs/teacher-dashboard', {
            backUrl: '/home',
          });
        }
      }
      if (roleId === 2) {
        if (!isProfileCompleted) {
          this.nav.push('/tabs/student-dashboard', {
            backUrl: '/home',
          });
        } else {
          this.nav.push('/tabs/student-dashboard', {
            backUrl: '/home',
          });
        }
      }
    } else {
      if (roleId === 3) {
        const message = 'This account is alredy login as a teacher';
        this.utility.presentFailureToast(message);
        this.nav.pop();

        return;
      }
      if (roleId === 2) {
        const message = 'This account is alredy login as a Student';
        this.utility.presentFailureToast(message);
        this.nav.pop();

        return;
      }
    }
  }

  back() {
    this.nav.pop('/role-base');
  }
}
