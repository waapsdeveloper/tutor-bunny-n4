import { Component, OnInit, Injector } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { BasePage } from 'src/app/base-page/base-page';
import { FirebaseService } from 'src/app/services/firebase.service';
import { GlobalCoursesService } from 'src/app/services/global-courses.service';
// import { GlobalTrialsService } from 'src/app/services/global-trials.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { ProfileService } from 'src/app/services/profile.service';
// import { InitializeAppService } from 'src/app/services/sqlite/initialize.app.service';
import { ViewWillEnter } from '@ionic/angular';
import { PusherSingleService } from 'src/app/services/pusher-single.service';
// import { listTrialsService } from 'src/app/services/teacher/pending-trials.service';
// import { GlobalStudyMaterialService } from 'src/app/services/global-study-material.service';
// import { GlobalFavCoursesService } from 'src/app/services/student/global-fav-courses.service';
// import { GlobalFavMaterialService } from 'src/app/services/global-fav-material.service';

@Component({
  selector: 'app-pre-splash',
  templateUrl: './pre-splash.page.html',
  styleUrls: ['./pre-splash.page.scss'],
})
export class PreSplashPage extends BasePage implements ViewWillEnter {
  user;
  loading = false;

  processNote = '';

  constructor(
    injector: Injector,

    private pusherService: PusherSingleService,

    private profilesService: ProfileService,
    private router: Router,
    // private iap: InitializeAppService,

    public notificationService: NotificationsService,
    private fcm: FirebaseService
  ) // subscription APIs
  // private listTrialsService: listTrialsService,
  // private globalStudyMaterialService: GlobalStudyMaterialService,
  // private globalFavCoursesService: GlobalFavCoursesService,
  // private globalFavMaterialService: GlobalFavMaterialService,

  // new services

  {
    super(injector);
  }

  ionViewWillEnter() {
    this.initialize();
  }

  async initialize() {
    this.pusherService.initialize();
    this.loading = true;

    this.loadResolvers();
    this.user = this.dataR.user;
    this.fcm.setTokenToServer();

    const utcTime = moment().utcOffset();
    let time = {
      timezone_offset: utcTime,
    };

    this.network.getTimeZone(time, this.user.id);

    // subscription APIs
    // this.listTrialsService.getPendingTrialsFromApi('', 1);
    // this.globalStudyMaterialService.getGlobalStudyMaterialFromApi('', 1);
    // // this.globalCourses.getGlobalCoursesFromApi('', 1);
    // this.globalFavCoursesService.getGlobalFavCoursesFromApi();
    // this.globalFavMaterialService.getGlobalFavMaterialFromApi();

    // this.iap.initializeUserTables(this.user);

    this.redirectDependsOnRole(this.user);
    this.loading = false;
  }

  async redirectDependsOnRole(user: any): Promise<void> {
    const isProfileCompleted = await this.profilesService.isProfileCompleted(
      user
    ); // Check if the profile is completed
    const roleId = parseInt(user.role_id, 10);
    const storedRoleId = parseInt(localStorage.getItem('role') || '', 10);

    // Check if the role in localStorage matches the user's role
    if (storedRoleId === roleId) {
      // Handle Teacher (roleId = 3)
      if (roleId === 3) {
        if (!isProfileCompleted) {
          this.nav.push('/teacher-welcome');
          // let res = await this.modals.present(
          //   TeacherWelcomePage,
          //   {},
          //   'auto-height-modal',
          //   1,
          //   [0, 1],
          //   true
          // );
          // this.nav.push('/teacher-profile/teacher-profile-edit', {
          //   backUrl: '/home',
          // });
        } else {
          this.nav.push('/tabs/teacher-dashboard', {
            backUrl: '/home',
          });
        }
      }
      if (roleId === 2) {
        this.router.navigate(['/tabs/student-dashboard'], {
          queryParams: { backUrl: '/home' },
        });
      }
    } else {
      if (roleId === 3) {
        const message = 'This account is already logged in as a teacher.';
        this.utility.presentFailureToast(message); // Display a toast for error
      }
      if (roleId === 2) {
        const message = 'This account is already logged in as a student.';
        this.utility.presentFailureToast(message); // Display a toast for error
      }
    }
  }
}
