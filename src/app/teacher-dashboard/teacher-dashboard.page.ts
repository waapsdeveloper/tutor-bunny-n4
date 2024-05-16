import { Component, OnInit } from '@angular/core';
import { NavService } from '../services/nav.service';
import { AuthenticationService } from '../services/authentication.service';
import { NetworkService } from '../services/network.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.page.html',
  styleUrls: ['./teacher-dashboard.page.scss'],
})
export class TeacherDashboardPage implements OnInit {
  user;
  item;
  image;
  flag
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
    private network: NetworkService,
    private fcm : FirebaseService
  ) {
    this.initialize()
  }
  ngOnInit() {
  }


  async initialize() {

    this.fcm.setTokenToServer();

    this.user = JSON.parse(localStorage.getItem('user'));
    let obj = {
      email: this.user.email,
    };
    let item = await this.network.getUserByEmail(obj);
    this.item = item.user;
    // console.log(item);

    localStorage.setItem("user", JSON.stringify(this.item) );
    this.image = this.item.image;


  }
  getFlag(){
    if(this.item && this.item.teacher && this.item.teacher.country){
      // console.log(this.item.teacher);

      const flag = this.item.teacher.country.iso2;
      // console.log(flag);

      return flag.toLowerCase();
    }
    else{
      return ""
    }
  }

  openProfile() {
    const params = { user_id: this.item.id };
    this.nav.push('teacher-profile', params );
    this.initialize()

  }
  async logout() {
    const res = await this.authService.logout();
    this.nav.push('home');
  }
}
