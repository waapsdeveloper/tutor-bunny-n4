import { Component, Injector, OnInit } from '@angular/core';
import { NavService } from '../services/nav.service';
import { ViewWillEnter } from '@ionic/angular';
import { UsersService } from '../services/users.service';
import { initializeApp } from 'firebase/app';
import { BasePage } from '../base-page/base-page';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage extends BasePage implements OnInit, ViewWillEnter {
  constructor(injector: Injector) {
    super(injector)
  }

  ngOnInit() {
  }
  ionViewWillEnter(): void {
    this.initialize();
  }

  async initialize() {
    let res = await this.users.getLoginUser();

    if (res) {
      this.redirectDependsOnRole(res)
    } else {
      this.nav.push('/role-base');
    }
  }
  async redirectDependsOnRole(user) {
    const isProfileCompleted = await this.profiles.isProfileCompleted(user);
    const roleId = parseInt(user.role_id);
    let role_Id = localStorage.getItem('role')
    if (parseInt(role_Id) === roleId) {

      if (roleId === 3) {
        if (!isProfileCompleted) {
          this.nav.push('/teacher-profile/teacher-profile-edit', {
            backUrl: '/home',
          });
        } else {
          this.nav.push('/tabs/teacher-dashboard', {
            backUrl: '/home'
          });
        }

      }
      if (roleId === 2) {

        if (!isProfileCompleted) {
          this.nav.push('/tabs/student-dashboard', {
            backUrl: '/home'
          });
        } else {
          this.nav.push('/tabs/student-dashboard', {
            backUrl: '/home'
          });
        }

      }
    } else {
      if (roleId === 3) {
        const message = "This account is alredy login as a teacher";
        this.utility.presentFailureToast(message);
        return;
      }
      if (roleId === 2) {
        const message = "This account is alredy login as a Student";
        this.utility.presentFailureToast(message);
        return;
      }
    }
  }
}
