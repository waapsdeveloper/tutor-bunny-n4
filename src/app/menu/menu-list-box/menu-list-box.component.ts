import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-menu-list-box',
  templateUrl: './menu-list-box.component.html',
  styleUrls: ['./menu-list-box.component.scss'],
})
export class MenuListBoxComponent extends BasePage implements OnInit {


  constructor(injector: Injector) {
    super(injector)
  }

  ngOnInit() { }

  gotoProfile(){
    this.nav.push('/tabs/teacher-profile');
  }

  logout(){
    localStorage.removeItem('token');
    this.nav.push('splash')
  }

}
