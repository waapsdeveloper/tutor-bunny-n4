import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { CreateCoursePage } from './create-course/create-course.page';

import { GlobalCoursesService } from 'src/app/services/global-courses.service';
import { ChatService } from 'src/app/services/chat.service';
import { UserSqService } from 'src/app/services/sqlite/user-sq.service';
import { ListTrialsService } from 'src/app/services/teacher/list-trials.service';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.page.html',
  styleUrls: ['./teacher-dashboard.page.scss'],
})
export class TeacherDashboardPage extends BasePage {
  user;
  pendingTrialsCoubt$ = 0;

  constructor(
    injector: Injector,
    private listTrialsService: ListTrialsService,
    public globalCourses: GlobalCoursesService,
    public chats: ChatService,
    private userSq: UserSqService
  ) {
    super(injector);
    this.initialize();
    
  }

  async initialize(){

    await this.listTrialsService.getGlobalTeacherTrialFromApi('', 1, 500);
    this.listTrialsService.getList().subscribe((data) => {
      this.checkNumberOfPendings(data);
    });

  }

  checkNumberOfPendings(data) {
    console.log(data);
    this.pendingTrialsCoubt$ = data.filter(
      (element) => element.status === 'Pending'
    ).length;
    console.log("all " , this.pendingTrialsCoubt$)
  }

  openProfile() {
    const user = this.users.getUser();
    const params = { email: user.email, showBack: true };
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
