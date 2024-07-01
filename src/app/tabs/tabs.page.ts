import { Component, Injector, OnInit } from '@angular/core';
import { EventsService } from '../services/events.service';
import { UsersService } from '../services/users.service';
import { BasePage } from '../base-page/base-page';
import { CreateCoursePage } from '../teacher-dashboard/create-course/create-course.page';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage extends BasePage implements OnInit {

  showTabs = true;
  roleId;
  showHome= true;
  showChat= false;
  user;
  constructor(injector:Injector) {
    super(injector)
    this.initialize()
  }

  ionViewWillEnter() {
    this.user = this.users.getUser()

    this.roleId = this.user.role_id

  }

  ngOnInit() {
    this.events.subscribe('page-scroll-event-end', this.pageScrollConditionEnd.bind(this))
  }

  pageScrollConditionEnd(data) {
    const efr = localStorage.getItem('efr');
    if (efr) {
      this.showTabs = efr == 'show'// this.efr;
    }

  }


  goToChat(){
    this.showHome = false;
    this.showChat = true;
  }
  goToHome(){
    this.showHome = true;
    this.showChat = false;
  }

  initialize() {
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
