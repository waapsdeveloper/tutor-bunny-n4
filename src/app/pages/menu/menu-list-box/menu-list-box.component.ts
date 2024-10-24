import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
@Component({
  selector: 'app-menu-list-box',
  templateUrl: './menu-list-box.component.html',
  styleUrls: ['./menu-list-box.component.scss'],
})
export class MenuListBoxComponent extends BasePage implements OnInit {
  role;
  user;
  constructor(injector: Injector) {
    super(injector);
    this.initialize();
  }
  initialize() {
    this.role = localStorage.getItem('role');
  }
  ngOnInit() {
    console.log('dfgg');
  }

  gotoProfile() {
    this.user = this.users.getUser();
    if (this.user.role_id == 2) {
      // this.nav.push('/teacher-profile');
    } else {
      this.nav.push('/teacher-profile');
    }
  }

  async logout() {

    this.events.publish('clear-all-services-data');
    localStorage.clear();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    this.nav.pop('splash');
    await FirebaseAuthentication.signOut();
  }
}
