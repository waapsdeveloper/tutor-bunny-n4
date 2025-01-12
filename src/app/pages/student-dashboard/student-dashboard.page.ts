import {
  Component,
  Injector,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { GlobalCoursesService } from 'src/app/services/global-courses.service';
import { GlobalTrialsService } from 'src/app/services/global-trials.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.page.html',
  styleUrls: ['./student-dashboard.page.scss'],
})
export class StudentDashboardPage
  extends BasePage
  implements OnInit
{
  user$;  
  
  
  view = 'course';

  constructor(
    injector: Injector,
    
    public globalCourses: GlobalCoursesService,
    public globalTrials: GlobalTrialsService,
    
  ) {
    super(injector);
    this.initialize();

  }

  ngOnInit() {

  }

 


  getFlag() {
    if (this.user && this.user.student && this.user.student.country) {
      const flag = this.user.student.country.iso2;
      if (flag) {
        return flag.toLowerCase();
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  updateProfile() {
    this.nav.push('/student-profile/student-profile-edit', {
      backUrl: '/tabs/student-dashboard',
      showBack: true,
    });
  }

  private isThrottled: boolean = false;
  onScrollEnd(event: any) {
    if (this.isThrottled) {
      return;
    }

    this.isThrottled = true;
    this.events.publish('page-scroll-event-end', {
      showTabs: false,
    });

    setTimeout(() => {
      this.isThrottled = false;
    }, 800); // 2 seconds
  }

  

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

  setupEvents() {

    this.events.subscribe('get-user-after-submit-form', (data) => {
      this.initialize();
    });
  }

  
}
