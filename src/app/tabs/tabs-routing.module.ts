import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      // {
      //   path: '',
      //   redirectTo: 'dashboard',
      //   pathMatch: 'full',
      // },
      {
        path: 'dashboard',
        loadChildren: () => import('./../dashboard/dashboard.module').then( m => m.DashboardPageModule)
      },
      {
        path: 'student-dashboard',
        loadChildren: () => import('./../student-dashboard/student-dashboard.module').then( m => m.StudentDashboardPageModule)
      },
      {
        path: 'teacher-dashboard',
        loadChildren: () => import('./../teacher-dashboard/teacher-dashboard.module').then( m => m.TeacherDashboardPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../pages/profile-details/profile-details.module').then( m => m.ProfileDetailsPageModule)
      },

      {
        path:'courses',
        loadChildren:() => import('../courses/courses.module').then( m => m.CoursesPageModule)
      },
      {
        path: 'other-courses',
        loadChildren: () => import('../courses/courses.module').then( m => m.CoursesPageModule)
      },
      {
        path: 'course-detail',
        loadChildren: () => import('../course-detail/course-detail.module').then( m => m.CourseDetailPageModule)
      },
      {
        path: 'my-teachers',
        loadChildren: () => import('../pages/my-teachers/my-teachers.module').then( m => m.MyTeachersPageModule)
      },
      {
        path: 'chat',
        loadChildren: () => import('../chat/chat.module').then( m => m.ChatPageModule)
      },
      {
        path: 'fav-courses',
        loadChildren: () => import('../fav-courses/fav-courses.module').then( m => m.FavCoursesPageModule)
      },
      {
        path: 'menu',
        loadChildren: () => import('../menu/menu.module').then( m => m.MenuPageModule)
      },
      {
        path: 'requests',
        loadChildren: () => import('../pages/requests/requests.module').then( m => m.RequestsPageModule)
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
