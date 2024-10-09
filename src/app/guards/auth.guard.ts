import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core'; // Adjust the path to your user service
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { ProfileService } from '../services/profile.service';
import { UtilityService } from '../services/utility.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const usersService = inject(UsersService); // Inject UsersService
  const profilesService = inject(ProfileService); // Inject UsersService
  const utilityService = inject(UtilityService); // Inject UsersService
  const router = inject(Router); // Inject Router

  let res = await usersService.getLoginUser();

  if (res) {
    redirectDependsOnRole(res, router, profilesService, utilityService);
    return false; // Prevent access to the current route as a redirection occurs
  } else {
    router.navigate(['/role-base']); // Redirect to role-base if no user is logged in
    return false;
  }
};

// Helper function for redirection based on user role
async function redirectDependsOnRole(
  user: any,
  router: Router,
  profilesService: ProfileService,
  utilityService: UtilityService
): Promise<void> {
  const isProfileCompleted = await profilesService.isProfileCompleted(user); // Check if the profile is completed
  const roleId = parseInt(user.role_id, 10);
  const storedRoleId = parseInt(localStorage.getItem('role') || '', 10);

  // Check if the role in localStorage matches the user's role
  if (storedRoleId === roleId) {
    // Handle Teacher (roleId = 3)
    if (roleId === 3) {
      if (!isProfileCompleted) {
        router.navigate(['/teacher-profile/teacher-profile-edit'], {
          queryParams: { backUrl: '/home' },
        });
      } else {
        router.navigate(['/tabs/teacher-dashboard'], {
          queryParams: { backUrl: '/home' },
        });
      }
    }
    if (roleId === 2) {
      router.navigate(['/tabs/student-dashboard'], {
        queryParams: { backUrl: '/home' },
      });
    }
  } else {
    if (roleId === 3) {
      const message = 'This account is already logged in as a teacher.';
      utilityService.presentFailureToast(message); // Display a toast for error
    }
    if (roleId === 2) {
      const message = 'This account is already logged in as a student.';
      utilityService.presentFailureToast(message); // Display a toast for error
    }
  }
}
