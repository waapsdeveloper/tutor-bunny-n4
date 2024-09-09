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
  },
  {
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
  {
    path: 'add-dates',
    loadChildren: () => import('./add-dates/add-dates.module').then( m => m.AddDatesPageModule)
  },
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.module').then( m => m.CoursesPageModule)
  },
  {
    path: 'other-courses',
    loadChildren: () => import('./courses/courses.module').then( m => m.CoursesPageModule)
  },
  {
    path: 'course-detail',
    loadChildren: () => import('./course-detail/course-detail.module').then( m => m.CourseDetailPageModule)
  },
  {
    path: 'student-course-detail',
    loadChildren: () => import('./student-course-detail/student-course-detail.module').then( m => m.StudentCourseDetailPageModule)
  },
  {
    path: 'my-teachers',
    loadChildren: () => import('./my-teachers/my-teachers.module').then( m => m.MyTeachersPageModule)
  },
  {
    path: 'trail-requests',
    loadChildren: () => import('./trail-requests/trail-requests.module').then( m => m.TrailRequestsPageModule)
  },
  {
    path: 'my-students',
    loadChildren: () => import('./my-students/my-students.module').then( m => m.MyStudentsPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./messages/messages.module').then( m => m.MessagesPageModule)
  },
  {
    path: 'fav-courses',
    loadChildren: () => import('./fav-courses/fav-courses.module').then( m => m.FavCoursesPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'requests',
    loadChildren: () => import('./requests/requests.module').then( m => m.RequestsPageModule)
  },
  {
    path: 'teacher-course-list',
    loadChildren: () => import('./teacher-course-list/teacher-course-list.module').then( m => m.TeacherCourseListPageModule)
  },
  {
    path: 'search-box',
    loadChildren: () => import('./search-box/search-box.module').then( m => m.SearchBoxPageModule)
  },
  {
    path: 'search-filter',
    loadChildren: () => import('./search-filter/search-filter.module').then( m => m.SearchFilterPageModule)
  },
  {
    path: 'chat-requests',
    loadChildren: () => import('./chat-requests/chat-requests.module').then( m => m.ChatRequestsPageModule)
  },

  {
    path: 'reviews-by-student',
    loadChildren: () => import('./reviews-by-student/reviews-by-student.module').then( m => m.ReviewsByStudentPageModule)
  },
  {
    path: 'search-result',
    loadChildren: () => import('./search-result/search-result.module').then( m => m.SearchResultPageModule)
  },  {
    path: 'teacher-welcome',
    loadChildren: () => import('./teacher-welcome/teacher-welcome.module').then( m => m.TeacherWelcomePageModule)
  },
  {
    path: 'course-photoss',
    loadChildren: () => import('./course-photoss/course-photoss.module').then( m => m.CoursePhotossPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
