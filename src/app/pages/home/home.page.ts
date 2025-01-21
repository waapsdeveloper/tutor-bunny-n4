import { Component, Injector } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ViewWillEnter } from '@ionic/angular';
import { BasePage } from '../../base-page/base-page';
import { LoginPage } from '../login/login.page';
import { SignUpPage } from '../sign-up/sign-up.page';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';

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
  dynamic_year: number;

  step = 1;

  constructor(injector: Injector, public authService: AuthenticationService) {
    super(injector);

    this.dynamic_year = new Date().getFullYear();
  }

  ionViewWillEnter(): void {
    this.step = 1;
    this.params = this.nav.getQueryParams();
    if (this.params.role) {
      this.role_Id = this.params.role;
    }
  }

  setStep(step) {
    this.step = step;
  }

  stepChange($event){

    this.step = $event.step;
  }

  async formAction(type, $event){

    if(type == 'login'){
      this.step = 1;

      let d = Object.assign({}, $event);
      localStorage.setItem('token', d.token);
      await this.users.setUser(d.user);
      this.nav.push('pre-splash');
      return;
    }else if(type == 'signup'){
      this.step = 2;

      let d = Object.assign({}, $event);
      localStorage.setItem('token', d.token);
      await this.users.setUser(d.user);
      this.nav.push('pre-splash');
      return;

    }else if(type == 'forget'){
      this.step = 1;

    }

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
        await this.users.setUser(res.user);
        this.nav.push('pre-splash');
      }
    }
  }

  async gotoEmailDashboard() {
    this.initiateLogin();
  }

  async initiateLogin() {
    const res = await this.showUpLogin();


    if (res && res.data) {
      if (res.data.step == 2) {
        const res2 = await this.showUpSignup();
        if (res2.data) {
          this.initiateLogin();
        }
        return;
      }
      if (res.data.step == 3) {
        const res3 = await this.showUpForgetPassword();
        if (res3.data) {
          this.initiateLogin();
        }
        return;
      }
      if (res.data.step == 1 && res.data.user) {
        let d = res.data;
        localStorage.setItem('token', d.token);
        await this.users.setUser(d.user);
        this.nav.push('pre-splash');
        return;
      }
    }
  }

  async showUpLogin(): Promise<any> {
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

    return res;
  }

  async showUpSignup(): Promise<any> {
    let res = await this.modals.present(
      SignUpPage,
      {
        role: this.params.role,
      },
      '',
      0.75,
      [0, 0.5, 0.75, 1]
    );

    return res;
  }

  async showUpForgetPassword(): Promise<any> {
    let res = await this.modals.present(
      ForgetPasswordComponent,
      {
        role: this.params.role,
      },
      '',
      0.75,
      [0, 0.5, 0.75, 1]
    );

    return res;
  }

  back() {
    this.nav.pop('/role-base');
  }
}
