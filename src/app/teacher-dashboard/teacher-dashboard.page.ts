import { Component, Injector, OnInit } from '@angular/core';
import { NavService } from '../services/nav.service';
import { AuthenticationService } from '../services/authentication.service';
import { NetworkService } from '../services/network.service';
import { FirebaseService } from '../services/firebase.service';
import { BasePage } from '../base-page/base-page';
import { CreateCoursePage } from './create-course/create-course.page';
import { GlobalCoursesService } from '../services/global-courses.service';
import { GlobalTrialsService } from '../services/global-trials.service';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.page.html',
  styleUrls: ['./teacher-dashboard.page.scss'],
})
export class TeacherDashboardPage extends BasePage  { // implements OnInit
  user;
  displayName = ''
  flag
  status;
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
  constructor(injector: Injector, private fcm: FirebaseService, public globalCourses: GlobalCoursesService, public globalTrials: GlobalTrialsService) {
    super(injector);

    // this.initialize();
    this.fcm.setTokenToServer();
    this.globalTrials.getPendingTrialsFromApi()
    // this.events.subscribe('dashboard:refreshpage', () => {
    // });

  }

  // ngOnInit() {


  // }


  ionViewWillEnter() {
    this.initialize()
  }


  async initialize() {
    this.user = this.users.getUser();
    let obj = {
      email: this.user.email,
    };
    let res = await this.network.getUserByEmail(obj);

    if (res) {
      this.users.setUser(res.user);
      this.user = this.users.getUser();
      this.flag = this.getFlag()
      this.displayName = this.utility.getAmericanName(this.user.name)
      this.status = res.user.teacher.status;
    }
  }


  getFlag() {
    if (this.user && this.user.teacher && this.user.teacher.country) {
      const flag = this.user.teacher.country.iso2;
      if (flag) {
        return flag.toLowerCase();
      } else {
        return ""
      }
    } else {
      return ""
    }
  }

  openProfile() {
    const params = { user_id: this.user.id, showBack: true };
    this.nav.push('/tabs/teacher-profile', params);
  }

  async createCourse() {
    let res = await this.modals.present(CreateCoursePage, {}, "", 0.7)

    if (res.data.title) {


      const params = {
        backUrl: '/tabs/teacher-dashboard',
        title: res.data.title,
        type: res.data.type,


      };

      this.nav.push('/course-form', params)
    }
  }
  gotoNotification(){
    this.nav.push('notifications', {
      backUrl: '/tabs/teacher-dashboard', showBack: true
    })
  }

}
