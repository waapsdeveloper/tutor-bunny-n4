import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base-page/base-page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage extends BasePage implements OnInit {

  step = 'login';
  formData: any = {
    email: null,
    password: null,
  };

  constructor(injector: Injector) {
    super(injector)
  }

  ngOnInit() {
  }

  result(value, key) {
    this.formData[key] = value;
    console.log(this.formData[key]);

  }
  async submit() {
    console.log(this.formData);

    if (!this.formData.email || !this.formData.password) {
      console.log("fdsdfs");

      return
    }
    let obj = {
      email: this.formData.email,
      password: this.formData.password
    }
    const res = await this.network.loginViaEmail(obj) as any;
    console.log(res);
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
    this.modals.dismiss()

  }


  signUp() {
    this.step = "SignUp"
  }

  SignUpWithEmail() {
    console.log(this.formData);

    if (!this.formData.email || !this.formData.password || !this.formData.name) {
      console.log("fdsdfs");

      return
    }
    let key = localStorage.getItem('role');
    let obj = {
      email: this.formData.email,
      password: this.formData.password,
      name: this.formData.name,
      login_type: "email",
      role_id: key
    }
    let res = this.network.signUpviaEmail(obj);
    console.log(res);
  }

  back() {
    this.modals.dismiss()
  }

}
