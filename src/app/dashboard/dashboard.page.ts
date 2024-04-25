import { Component } from '@angular/core';
import { NavService } from '../services/nav.service';

@Component({
  selector: 'app-home',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
})
export class DashboardPage {

  footerlist = [
    {
      icon: 'assets/icon/home/home-icon.svg',
      label: 'Home',
      active: 0
    },
    {
      icon: 'assets/icon/home/chat-icon.svg',
      label: 'Chat',
      active: 0
    },
    {
      icon: 'assets/icon/home/calendar-icon.svg',
      label: 'Calendar',
      active: 0
    },
    {
      icon: 'assets/icon/home/box-icon.svg',
      label: 'My Courses',
      active: 0
    },
    {
      icon: 'assets/icon/home/menu-icon.svg',
      label: 'Menu',
      active: 0
    }

  ]
  constructor(private nav: NavService) {}

  openProfile(){
    this.nav.push('/tabs/profile')
  }

}
