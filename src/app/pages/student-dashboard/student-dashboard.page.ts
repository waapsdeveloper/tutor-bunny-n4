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
  user;
  displayName: string = '';
  country;
  showWarning = false;
  showFav = false;
  flag;
  isProfileComplete;
  showLiked = false;
  profileImage= '';
  showNoti = true;
  view = 'course';
  favCourses;


  constructor(
    injector: Injector,
    
    public globalCourses: GlobalCoursesService,
    public globalTrials: GlobalTrialsService,
    
  ) {
    super(injector);
    this.initialize();

  }

  ngOnInit() {
    this.events.subscribe('update-profile-image', (user) => {
      this.profileImage = user.image;

    });


  }

  async initialize() {

    this.user = this.users.getUser();
    






    this.profileImage = this.user.image;

    this.setupEvents();
    //

    if (
      this.user &&
      this.user.student &&
      this.user.student.country &&
      this.user.student.country.name
    ) {
      this.country = this.user.student.country.name;
    }

    this.displayName = this.utility.splitName(this.user.name).first_name;
    this.flag = this.getFlag();


    const isProfileCompleted = (await this.profiles.isProfileCompleted(
      this.user
    )) as any;
    this.showWarning = isProfileCompleted;

    this.events.publish('is-student-profile-completed', this.showWarning);
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
