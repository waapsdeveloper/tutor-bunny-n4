import {
  Component,
  EventEmitter,
  Injector,
  Input,
  Output,
} from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage extends BasePage {
  @Input() role_id: any = '';
  @Output() formAction = new EventEmitter<any>();

  formData: any = {
    email: null,
    password: null,
    name: null,
    confirm_password: null,
  };
  showLoader = false;

  constructor(injector: Injector) {
    super(injector);
  }

  result(value, key) {
    this.formData[key] = value;
  }


  async SignUpWithEmail() {
    this.events.publish(
      'teacher-profile-first-screen-submit-call',
      this.formData
    );
    if (
      !this.formData.email ||
      !this.formData.password ||
      !this.formData.name ||
      !this.formData.confirm_password
    ) {
      return;
    }

    let obj = {
      email: this.formData.email,
      password: this.formData.password,
      name: this.formData.name,
      confirm_password: this.formData.confirm_password,
      login_type: 'email',
      role_id: this.role_id,
    };
    let res = (await this.network.signUpviaEmail(obj)) as any;

    if (res) {
      this.utility.presentSuccessToast('the user account is registered.');

      if (res) {
        let obj = {
          step: 2,
          user: res.user,
          token: res.token,
        };
        // this.modals.dismiss(obj);
        this.formAction.emit(obj);
      }
    }
  }
  async submit() {
    this.events.publish(
      'teacher-profile-first-screen-submit-call',
      this.formData
    );
    if (!this.formData.email || !this.formData.password) {
      return;
    }
    this.showLoader = true;
    let d = {
      email: this.formData.email,
      password: this.formData.password,
      role_id: this.role_id,
    };
    const res = (await this.network.loginViaEmail(d)) as any;

    this.showLoader = false;



    if (res) {
      let obj = {
        step: 1,
        user: res.user,
        token: res.token
      };
      // this.modals.dismiss(obj);
      this.formAction.emit(obj);
    }
  }

  back() {
    let obj = {
      step: 1,
    };
    this.modals.dismiss(obj);
  }
}
