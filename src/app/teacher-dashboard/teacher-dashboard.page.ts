import { Component, OnInit } from '@angular/core';
import { NavService } from '../services/nav.service';
import { AuthenticationService } from '../services/authentication.service';
import { NetworkService } from '../services/network.service';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.page.html',
  styleUrls: ['./teacher-dashboard.page.scss'],
})
export class TeacherDashboardPage implements OnInit {
  user;
  item;
  image;
  footerlist = [
    {
      icon: 'assets/icon/home/home-icon.svg',
      label: 'Home',
      active: 0,
    },
    {
      icon: 'assets/icon/home/chat-icon.svg',
      label: 'Chat',
      active: 0,
    },
    {
      icon: 'assets/icon/home/calendar-icon.svg',
      label: 'Calendar',
      active: 0,
    },
    {
      icon: 'assets/icon/home/box-icon.svg',
      label: 'My Courses',
      active: 0,
    },
    {
      icon: 'assets/icon/home/menu-icon.svg',
      label: 'Menu',
      active: 0,
    },
  ];
  constructor(
    private nav: NavService,
    public authService: AuthenticationService,
    private network: NetworkService
  ) {
    this.initialize()
  }
  ngOnInit() {

  }

  async initialize() {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
    this.image = this.user.teacher.photo_id;

  }

  openProfile() {
    this.nav.push('/tabs/profile');
  }
  async logout() {
    const res = await this.authService.logout();
    this.nav.push('home');
  }
}
