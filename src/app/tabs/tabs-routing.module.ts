import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { userResolver } from '../resolvers/user.resolver';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    resolve: {
      user: userResolver
    },
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
        loadChildren: () => import('./../pages/student-dashboard/student-dashboard.module').then( m => m.StudentDashboardPageModule),
        resolve: {
          user: userResolver
        },
      },
      {
        path: 'teacher-dashboard',
        loadChildren: () => import('./../pages/teacher-dashboard/teacher-dashboard.module').then( m => m.TeacherDashboardPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../pages/profile-details/profile-details.module').then( m => m.ProfileDetailsPageModule)
      },

      // {
      //   path:'courses',
      //   loadChildren:() => import('../pages/courses/courses.module').then( m => m.CoursesPageModule)
      // },
      {
        path: 'course-material',
        loadChildren: () => import('../pages/course-material/course-material.module').then( m => m.CourseMaterialPageModule)
      },
      {
        path: 'other-courses',
        loadChildren: () => import('../pages/courses/courses.module').then( m => m.CoursesPageModule)
      },
      // {
      //   path: 'course-detail',
      //   loadChildren: () => import('../pages/course-detail/course-detail.module').then( m => m.CourseDetailPageModule)
      // },
      {
        path: 'my-teachers',
        loadChildren: () => import('../pages/my-teachers/my-teachers.module').then( m => m.MyTeachersPageModule)
      },
      {
        path: 'chat',
        loadChildren: () => import('../pages/chat/chat.module').then( m => m.ChatPageModule)
      },
      {
        path: 'menu',
        loadChildren: () => import('../pages/menu/menu.module').then( m => m.MenuPageModule)
      },
      {
        path: 'requests',
        loadChildren: () => import('../pages/requests/requests.module').then( m => m.RequestsPageModule)
      },
      {
        path: 'search-box',
        loadChildren: () => import('../pages/search-box/search-box.module').then( m => m.SearchBoxPageModule)
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
