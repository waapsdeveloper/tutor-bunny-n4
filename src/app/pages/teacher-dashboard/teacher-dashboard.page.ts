import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { CreateCoursePage } from './create-course/create-course.page';

import { FirebaseService } from 'src/app/services/firebase.service';
import { GlobalCoursesService } from 'src/app/services/global-courses.service';
import { GlobalTrialsService } from 'src/app/services/global-trials.service';
import { ChatService } from 'src/app/services/chat.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { UserSqService } from 'src/app/services/sqlite/user-sq.service';
import { PendingTrialsService } from 'src/app/services/pending-trials.service';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.page.html',
  styleUrls: ['./teacher-dashboard.page.scss'],
})
export class TeacherDashboardPage extends BasePage implements OnInit {
  user;
  displayName = '';
  flag;
  shownoti = true;
  status;
  total_rating;
  state
  showNoti =false;
  travel_policy;
  rating;

  pendingTrialsCoubt$ = 0;


  constructor(
    injector: Injector,
    private pendingTrialsService: PendingTrialsService,
    public globalCourses: GlobalCoursesService,
    public globalTrials: GlobalTrialsService,
    public chats: ChatService,
    public notification: NotificationsService,
    private userSq: UserSqService
  ) {
    super(injector);

    this.userSq.loadUsers().then( res => {

    });

    this.pendingTrialsService.getCount().subscribe((data) => {
      this.pendingTrialsCoubt$ = data ?? 0;
    });





  }

  ngOnInit() {
    // this.events.subscribe('update-notifications', () => {
    //   this.notification.getNotificationsFromApi()
    // });

    this.events.subscribe('user-update-via-pusher', () => {
      this.initialize();
    });
    // this.events.subscribe('show-noti-dot', (shownoti) =>{
    //   this.showNoti  = shownoti;
    // });

  }

  ionViewWillEnter() {
    this.initialize();
  }

  async initialize() {
    this.loadResolvers();
    this.user = this.dataR.user;


    let obj = {
      email: this.user.email,
    };
    let res = await this.network.getUserByEmail(obj);
    if (res) {
      this.users.setUser(res.user);
      this.user = this.users.getUser();
      this.flag = this.getFlag();
      this.displayName = this.utility.getAmericanName(this.user.name);
      this.status = res.user.teacher.status;
      this.total_rating = this.user.teacher.total_rating;
      this.rating = this.user.teacher.avg_rating
    }
  }

  getFlag() {
    if (this.user && this.user.teacher && this.user.teacher.country) {
      const flag = this.user.teacher.country.iso2;
      if (flag) {
        return flag.toLowerCase();
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  openProfile() {
    const params = { user_id: this.user.id, showBack: true };
    this.nav.push('/teacher-profile', params);
  }

  async createCourse() {
    let res = await this.modals.present(CreateCoursePage, {}, '', 0.7);

    if (res.data.title) {

      const params = {
        backUrl: '/tabs/teacher-dashboard',
        title: res.data.title,
        type: res.data.type,
      };

      this.nav.push('/course-form', params);
    }
  }
  gotoNotification() {

    this.nav.push('notifications', {
      backUrl: '/tabs/teacher-dashboard',
      showBack: true,
    });
  }
}
