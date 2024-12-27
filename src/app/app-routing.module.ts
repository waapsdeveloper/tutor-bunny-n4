import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { userResolver } from './resolvers/user.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',

  },
  {
    path: 'splash',
    loadChildren: () =>
      import('./pages/splash/splash.module').then((m) => m.SplashPageModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'pre-splash',
    loadChildren: () => import('./pages/pre-splash/pre-splash.module').then( m => m.PreSplashPageModule),
    resolve: {
      user: userResolver
    },
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
      import('./pages/profile-details/profile-details.module').then(
        (m) => m.ProfileDetailsPageModule
      ),
  },
  {
    path: 'role-base',
    loadChildren: () => import('./pages/role-base/role-base.module').then( m => m.RoleBasePageModule)
  },
  {
    path: 'teacher-profile',
    loadChildren: () => import('./pages/teacher-profile/teacher-profile.module').then( m => m.TeacherProfilePageModule)
  },
  {
    path: 'student-profile',
    loadChildren: () => import('./pages/student-profile/student-profile.module').then( m => m.StudentProfilePageModule)
  },
  {
    path: 'blocked',
    loadChildren: () => import('./pages/blocked/blocked.module').then( m => m.BlockedPageModule)
  },
  {
    path: 'email-login',
    loadChildren: () => import('./pages/email-login/email-login.module').then( m => m.EmailLoginPageModule)
  },
  {
    path: 'email-signup',
    loadChildren: () => import('./pages/email-signup/email-signup.module').then( m => m.EmailSignupPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'course-form',
    loadChildren: () => import('./pages/course-form/course-form.module').then( m => m.CourseFormPageModule),
  },
  // {
  //   path: 'study-form',
  //   loadChildren: () => import('./pages/study-material/create-material/create-material.module').then( m => m.CreateMaterialPageModule),
  // },
  {
    path: 'add-dates',
    loadChildren: () => import('./pages/add-dates/add-dates.module').then( m => m.AddDatesPageModule)
  },
  {
    path: 'courses',
    loadChildren: () => import('./pages/courses/courses.module').then( m => m.CoursesPageModule)
  },
  {
    path: 'other-courses',
    loadChildren: () => import('./pages/courses/courses.module').then( m => m.CoursesPageModule)
  },
  {
    path: 'course-detail',
    loadChildren: () => import('./pages/course-detail/course-detail.module').then( m => m.CourseDetailPageModule)
  },
  {
    path: 'student-course-detail',
    loadChildren: () => import('./pages/student-course-detail/student-course-detail.module').then( m => m.StudentCourseDetailPageModule)
  },
  {
    path: 'student-study-material-detail',
    loadChildren: () => import('./pages/student-study-material-detail/student-study-material-detail.module').then( m => m.StudentStudyMaterialDetailPageModule)
  },

  {
    path: 'my-teachers',
    loadChildren: () => import('./pages/my-teachers/my-teachers.module').then( m => m.MyTeachersPageModule)
  },
  {
    path: 'trail-requests',
    loadChildren: () => import('./pages/trail-requests/trail-requests.module').then( m => m.TrailRequestsPageModule)
  },
  {
    path: 'my-students',
    loadChildren: () => import('./pages/my-students/my-students.module').then( m => m.MyStudentsPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./pages/notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./pages/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./pages/messages/messages.module').then( m => m.MessagesPageModule)
  },
  {
    path: 'fav-courses',
    loadChildren: () => import('./pages/fav-courses/fav-courses.module').then( m => m.FavCoursesPageModule),
    resolve: {
      user: userResolver
    },
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'requests',
    loadChildren: () => import('./pages/requests/requests.module').then( m => m.RequestsPageModule)
  },
  {
    path: 'teacher-course-list',
    loadChildren: () => import('./pages/teacher-course-list/teacher-course-list.module').then( m => m.TeacherCourseListPageModule)
  },
  {
    path: 'search-box',
    loadChildren: () => import('./pages/search-box/search-box.module').then( m => m.SearchBoxPageModule)
  },
  {
    path: 'search-filter',
    loadChildren: () => import('./pages/search-filter/search-filter.module').then( m => m.SearchFilterPageModule)
  },
  {
    path: 'chat-requests',
    loadChildren: () => import('./pages/chat-requests/chat-requests.module').then( m => m.ChatRequestsPageModule)
  },
  {
    path: 'reviews-by-student',
    loadChildren: () => import('./pages/reviews-by-student/reviews-by-student.module').then( m => m.ReviewsByStudentPageModule)
  },
  {
    path: 'search-result',
    loadChildren: () => import('./pages/search-result/search-result.module').then( m => m.SearchResultPageModule)
  },
  {
    path: 'teacher-welcome',
    loadChildren: () => import('./pages/teacher-welcome/teacher-welcome.module').then( m => m.TeacherWelcomePageModule)
  },
  {
    path: 'course-photoss',
    loadChildren: () => import('./pages/course-photoss/course-photoss.module').then( m => m.CoursePhotossPageModule)
  },

  {
    path: 'upload-certificate',
    loadChildren: () => import('./pages/upload-certificate/upload-certificate.module').then( m => m.UploadCertificatePageModule)
  },
  {
    path: 'teacher-profile-complete',
    loadChildren: () => import('./pages/teacher-profile-complete/teacher-profile-complete.module').then( m => m.TeacherProfileCompletePageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },


  {
    path: 'create-material',
    loadChildren: () => import('./pages/study-material/pages/create-material/create-material.module').then( m => m.CreateMaterialPageModule)
  },
  {
    path: 'material-photoss',
    redirectTo: 'course-photoss'
  },


  // {
  //   path: 'list-material',
  //   loadChildren: () => import('./pages/study-material/list-material/list-material.module').then( m => m.ListMaterialPageModule)
  // },
  // {
  //   path: 'detail-material',
  //   loadChildren: () => import('./pages/study-material/detail-material/detail-material.module').then( m => m.DetailMaterialPageModule)
  // },
  // {
  //   path: 'student-study-material-detail',
  //   loadChildren: () => import('./components/student-study-material-detail/student-study-material-detail.module').then( m => m.StudentStudyMaterialDetailPageModule)
  // },






];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
