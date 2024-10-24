import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { BasePage } from 'src/app/base-page/base-page';
import { ChatService } from 'src/app/services/chat.service';
import { ProfileService } from 'src/app/services/profile.service';
import { InitializeAppService } from 'src/app/services/sqlite/initialize.app.service';
import { UsersService } from 'src/app/services/users.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage extends BasePage implements OnInit {
  loading = false;
  constructor(
    injector: Injector,
    private usersService: UsersService,
    private iap: InitializeAppService,
    private router: Router,
    private profilesService: ProfileService,
    private utilityService: UtilityService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.initialize();
  }

  async initialize() {
    this.loading = true;
    await this.iap.initializeApp();
    await this.iap.initializeGenericTables();

    let res = await this.usersService.getLoginUser();

    if (res) {
      this.redirectDependsOnRole(res);
    } else {
      this.router.navigate(['/role-base']); // Redirect to role-base if no user is logged in
    }

    this.loading = false;
  }

  // Helper function for redirection based on user role
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
          this.router.navigate(['/teacher-profile/teacher-profile-edit'], {
            queryParams: { backUrl: '/home' },
          });
        } else {
          this.router.navigate(['/tabs/teacher-dashboard'], {
            queryParams: { backUrl: '/home' },
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
        this.utilityService.presentFailureToast(message); // Display a toast for error
      }
      if (roleId === 2) {
        const message = 'This account is already logged in as a student.';
        this.utilityService.presentFailureToast(message); // Display a toast for error
      }
    }
  }
}
