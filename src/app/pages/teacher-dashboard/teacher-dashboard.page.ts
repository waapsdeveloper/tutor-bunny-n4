import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { CreateCoursePage } from './create-course/create-course.page';

import { FirebaseService } from 'src/app/services/firebase.service';
import { GlobalCoursesService } from 'src/app/services/global-courses.service';
import { GlobalTrialsService } from 'src/app/services/global-trials.service';
import { ChatService } from 'src/app/services/chat.service';
import { UserSqService } from 'src/app/services/sqlite/user-sq.service';
import { PendingTrialsService } from 'src/app/services/teacher/pending-trials.service';

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
    private pendingTrialsService: PendingTrialsService,
    public globalCourses: GlobalCoursesService,
    public globalTrials: GlobalTrialsService,
    public chats: ChatService,
    private userSq: UserSqService
  ) {
    super(injector);
    this.pendingTrialsService.getCount().subscribe((data) => {
      this.pendingTrialsCoubt$ = data ?? 0;
    });

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
