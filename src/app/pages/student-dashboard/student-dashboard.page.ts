import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

import * as moment from 'moment';
import { StudentWelcomeComponent } from './student-welcome/student-welcome.component';
import { GlobalCoursesService } from 'src/app/services/global-courses.service';
import { GlobalTrialsService } from 'src/app/services/global-trials.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.page.html',
  styleUrls: ['./student-dashboard.page.scss'],
})
export class StudentDashboardPage extends BasePage implements OnInit {

  user;
  displayName: string = '';
  country;
  showWarning = false;
  utcTime
  showFav = false;
  flag;
  isProfileComplete;
  showLiked = false;
  view = 'course';

  constructor(injector: Injector, public globalCourses: GlobalCoursesService, public globalTrials: GlobalTrialsService) {
    super(injector)
    this.initialize();
    this.getlists();



  }

  ngOnInit() {
    this.events.subscribe('update-course-list', () => {
      this.getlists();

    });
    this.events.subscribe('show-fav-dot', (showFav) => {
      this.showFav = showFav;

    });

    this.events.subscribe('get-user-after-submit-form', (data) => {
      this.initialize()
    });

  }

  getlists() {

    this.globalCourses.getCoursesFromApi();
    // this.globalCourses.getFavToApi();

  }

  ionViewWillEnter() {
  }
  gotoNotification() {
    this.nav.push('notifications', {
      backUrl: '/tabs/student-dashboard', showBack: true
    })
  }

  async initialize() {

    this.user = this.users.getUser();
    this.displayName = this.utility.splitName(this.user.name).first_name;

    let obj = {
      email: this.user.email,
    };


    let res = await this.network.getUserByEmail(obj);
    if (res) {
      this.users.setUser(res.user);
      this.user = this.users.getUser();
      this.flag = this.getFlag();
    }



    this.utcTime = moment().utcOffset();
    let time = {
      timezone_offset: this.utcTime,
    };

    let data = await this.network.getTimeZone(time, this.user.id);

    if (this.user && this.user.student && this.user.student.country && this.user.student.country.name) {
      this.country = this.user.student.country.name;
    }

    const isProfileCompleted = await this.profiles.isProfileCompleted(this.user) as any;
    this.showWarning = isProfileCompleted;


    this.events.publish('is-student-profile-completed', this.showWarning);


  }
  getFlag() {
    if (this.user && this.user.student && this.user.student.country) {
      const flag = this.user.student.country.iso2;
      if (flag) {
        return flag.toLowerCase();
      } else {
        return ""
      }
    } else {
      return ""
    }
  }



  updateProfile() {
    this.nav.push('/student-profile/student-profile-edit', {
      backUrl: '/tabs/student-dashboard', showBack: true
    });
  }



  private isThrottled: boolean = false;
  onScrollEnd(event: any) {
    if (this.isThrottled) {
      return;
    }

    this.isThrottled = true;
    this.events.publish('page-scroll-event-end', {
      showTabs: false
    });

    setTimeout(() => {
      this.isThrottled = false;
    }, 800); // 2 seconds
  }


  async showFavCourse() {
    this.nav.push('/fav-courses')
  }

  toogleView(view) {
    this.view = view;
    if (view == 'course') {
      this.nav.push('/tabs/student-dashboard/student-dashborad-courses')
    }

    if (view == 'teacher') {
      this.nav.push('/tabs/student-dashboard/student-dashborad-teachers')
    }

  }


}
