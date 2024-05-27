import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
  {
    path: 'splash',
    loadChildren: () =>
      import('./splash/splash.module').then((m) => m.SplashPageModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  // {
  //   path: 'dashboard',
  //   loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  // },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'profile-details',
    loadChildren: () =>
      import('./profile-details/profile-details.module').then(
        (m) => m.ProfileDetailsPageModule
      ),
  },
  {
    path: 'role-base',
    loadChildren: () => import('./role-base/role-base.module').then( m => m.RoleBasePageModule)
  },
  {
    path: 'teacher-profile',
    loadChildren: () => import('./teacher-profile/teacher-profile.module').then( m => m.TeacherProfilePageModule)
  },
  {
    path: 'student-profile',
    loadChildren: () => import('./student-profile/student-profile.module').then( m => m.StudentProfilePageModule)
  },  {
    path: 'blocked',
    loadChildren: () => import('./blocked/blocked.module').then( m => m.BlockedPageModule)
  },
  {
    path: 'email-login',
    loadChildren: () => import('./email-login/email-login.module').then( m => m.EmailLoginPageModule)
  },
  {
    path: 'email-signup',
    loadChildren: () => import('./email-signup/email-signup.module').then( m => m.EmailSignupPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'course-form',
    loadChildren: () => import('./course-form/course-form.module').then( m => m.CourseFormPageModule)
  },

  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
