import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.page.html',
  styleUrls: ['./student-dashboard.page.scss'],
})
export class StudentDashboardPage {

  user$;  
  view = 'course';
  lastSegment: string;


  constructor(private nav: NavService) {}

  toogleView(view) {
    this.view = view;
    if (view == 'course') {
      this.nav.pop('/tabs/student-dashboard/student-dashborad-courses');
    }
    if (view == 'teacher') {
      this.nav.push('/tabs/student-dashboard/student-dashborad-teachers');
    }
    if (view == 'notes'){
      this.nav.push('/tabs/student-dashboard/student-dashboard-study-material');
    }
    if (view == 'cart'){
      this.nav.push('/cart');
    }

  }

  updateProfile($event) {
    this.nav.push('/student-profile/student-profile-edit', {
      backUrl: '/tabs/student-dashboard',
      showBack: true,
    });
  }
  
  gotoNotification() {
    this.nav.push('notifications', {
      backUrl: '',
      showBack: true,
    });
  }

  
}
