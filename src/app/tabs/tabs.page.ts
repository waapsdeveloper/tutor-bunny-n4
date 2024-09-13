import { Component, Injector, OnInit } from '@angular/core';
import { EventsService } from '../services/events.service';
import { UsersService } from '../services/users.service';
import { BasePage } from 'src/app/base-page/base-page';
import { CreateCoursePage } from '../pages/teacher-dashboard/create-course/create-course.page';
import { CreateCourseService } from '../services/create-course.service';
import { ChatService } from '../services/chat.service';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage extends BasePage {

  loading = false;
  user: any;

  showTabs = true;
  roleId;
  showHome = true;
  showChat = false;
  showSearch = false;
  showCourses = false;
  showMore = false;

  constructor(injector: Injector, public createCourseService: CreateCourseService, public chatService: ChatService) {
    super(injector)
    // this.initialize()
    // this.chatService.getchatList()

  }

  ionViewWillEnter() {
    this.initialize();
  }

  // ngOnInit() {


  //   // this.events.subscribe('page-scroll-event-end', this.pageScrollConditionEnd.bind(this))
  // }

  async initialize() {

    this.loading = true;

    this.loadResolvers();
    this.user = this.dataR.user;
    this.roleId = this.user.role_id;
    await this.chatService.getchatList()
    this.loading = false;

  }


  goToChat() {
    this.showHome = false;
    this.showSearch = false;
    this.showChat = true;
    this.showCourses = false;
    this.showMore = false;
    let params = {
      student_id: null,
      other_user_id: null,
      user: null,
      chat_room_id: null
    };

    // Navigate to the chat page without any parameters
    this.nav.push('/tabs/chat', params);
  }
  goToHome() {
    this.showHome = true;
    this.showSearch = false;
    this.showChat = false;
    this.showMore = false;
    this.showCourses = false;
  }
  goToSearch() {
    this.showSearch = true;
    this.showChat = false;
    this.showHome = false;
    this.showCourses = false;
    this.showMore = false;
  }

  goToCourses() {
    this.showCourses = true;
    this.showSearch = false;
    this.showChat = false;
    this.showMore = false;
    this.showHome = false;
    this.nav.push('/tabs/courses');
  }
  goToMore() {
    this.showMore = true;
    this.showCourses = false;
    this.showSearch = false;
    this.showChat = false;
    this.showHome = false;
  }

  async createCourse() {
    let res = await this.modals.present(CreateCoursePage, {}, "", 0.6)

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
