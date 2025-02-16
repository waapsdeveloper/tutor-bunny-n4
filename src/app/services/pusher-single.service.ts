import { Injectable } from '@angular/core';
import { ListChatsService } from './list-chats.service';
import { GlobalTrialCoursesService } from './student/global-trial-courses.service';
import { ListTrialsService } from './teacher/list-trials.service';

import Pusher from 'pusher-js';
import { TeacherService } from './teacher/teacher.service';

@Injectable({
  providedIn: 'root',
})
export class PusherSingleService {
  
  private pusher: Pusher;

  constructor(
    // common services
    // private listChatsService: ListChatsService,

    // teacher service
    public listTrialsService: ListTrialsService,
    public teacher: TeacherService,

    // student service
    private globalTrialCoursesService: GlobalTrialCoursesService
  ) {
    const options = {
      cluster: 'ap2',
      forceTLS: true,
    };

    this.pusher = new Pusher('a45efbe1a2e731b6dbfb', options);
  }

  getUser(): Promise<any> {
    let user = null;
    const res = localStorage.getItem('user');
    if (res) {
      user = JSON.parse(res);
    }

    return user;
  }

  async initialize() {
    let user = await this.getUser();

    

    if (!user) {
      return;
    }
    
    if (!this.pusher) {
      return;
    }
    console.log("W8965468465", this.pusher)

    if (user.role_id == 3) {
      this.teacher.registerPusherEvent(this.pusher, user.id);
      this.listTrialsService.registerPusherEvent(this.pusher, user.id);
    }

    if (user.role_id == 2) {
      this.globalTrialCoursesService.registerPusherEvent(this.pusher, user.id);
    }
  }
}
