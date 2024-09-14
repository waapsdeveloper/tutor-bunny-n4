import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { CreateCoursePage } from '../pages/teacher-dashboard/create-course/create-course.page';
import { CreateCourseService } from '../services/create-course.service';
import { ChatService } from '../services/chat.service';
import { FirebaseService } from '../services/firebase.service';
import { GlobalCoursesService } from '../services/global-courses.service';
import { GlobalTrialsService } from '../services/global-trials.service';
import * as moment from 'moment';
import { IonTabs } from '@ionic/angular';
import { NotificationsService } from '../services/notifications.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage extends BasePage implements OnInit {

  @ViewChild('tabs', { static: false }) tabs: IonTabs;
  selectedTab = '';
  loading = false;
  user: any;

  showTabs = true;
  roleId; 

  constructor(injector: Injector,
    public createCourseService: CreateCourseService,
    public chatService: ChatService,
    private fcm: FirebaseService,
    public globalCourses: GlobalCoursesService,
    public globalTrials: GlobalTrialsService,
    public notificationService: NotificationsService
  ) {
    super(injector)

    // this.chatService.getchatList()

  }

  ionViewWillEnter() {

  }

  ngOnInit() {
    this.initialize()

  //   // this.events.subscribe('page-scroll-event-end', this.pageScrollConditionEnd.bind(this))
  }

  setCurrentTab() {
    this.selectedTab = this.tabs.getSelected();
    console.log(this.selectedTab)
  }

  async initialize() {

    this.loading = true;

    this.loadResolvers();
    this.user = this.dataR.user;
    this.roleId = this.user.role_id;
    this.events.registerPusherEvent(this.user.id);
    this.globalTrials.registerPusherEvent();
    this.globalCourses.registerPusherEvent();
    await this.chatService.getchatList();
    await this.notificationService.getNotificationsFromApi();
    this.fcm.setTokenToServer();



    const utcTime = moment().utcOffset();
    let time = {
      timezone_offset: utcTime,
    };

    await this.network.getTimeZone(time, this.user.id);

    this.globalTrials.getPendingTrialsFromApi();
    this.globalCourses.getCoursesFromApi();

    setTimeout( () => {
      this.loading = false;
    }, 3000)
    

  }


  goToChat() {

    let params = {
      student_id: null,
      other_user_id: null,
      user: null,
      chat_room_id: null
    };

    // Navigate to the chat page without any parameters
    this.nav.push('/tabs/chat', params);
  }


  async createCourse() {
    let res = await this.modals.present(CreateCoursePage, {}, "", 0.75)

    if (res.data.title) {
      this.createCourseService.resetFormData()
      const params = {
        backUrl: '/tabs/teacher-dashboard',
        title: res.data.title,
        type: res.data.type,
      };

      this.nav.push('/course-form', params)
    }
  }

  returnDashboardLink() {
    if (!this.user) {
      return '';
    }

    if (!this.user.role_id) {
      return '';
    }

    const roleId = parseInt(this.user.role_id);

    if (roleId == 2) {
      return 'student-dashboard'
    }

    if (roleId == 3) {
      return 'teacher-dashboard'
    }

    return ''

  }



}
