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
        loadChildren: () => import('./../profile-details/profile-details.module').then( m => m.ProfileDetailsPageModule)
      },
      {
        path:'teacher-profile',
        loadChildren:() => import('../teacher-profile/teacher-profile.module').then( m => m.TeacherProfilePageModule)
      },
      {
        path:'courses',
        loadChildren:() => import('../courses/courses.module').then( m => m.CoursesPageModule)
      },
      {
        path: 'course-detail',
        loadChildren: () => import('../course-detail/course-detail.module').then( m => m.CourseDetailPageModule)
      },
      {
        path: 'my-teachers',
        loadChildren: () => import('../my-teachers/my-teachers.module').then( m => m.MyTeachersPageModule)
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
