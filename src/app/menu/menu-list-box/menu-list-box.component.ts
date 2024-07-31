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
  constructor(injector: Injector) {
    super(injector)

    this.initialize()
  }

  initialize() {
    this.role = localStorage.getItem('role')

  }

  ngOnInit() { }

  gotoProfile() {
    this.nav.push('/tabs/teacher-profile');
  }

  async logout() {
    await FirebaseAuthentication.signOut();
    console.log('====================================');
    console.log("Dsadas");
    console.log('====================================');
    localStorage.removeItem('token');
    this.nav.push('splash')
  }

}
