import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { notificationCountResolver } from 'src/app/resolvers/notificationCount.resolver';
import { cartListResolver } from 'src/app/resolvers/student/cartList.resolver';
import { favoritesCountResolver } from 'src/app/resolvers/student/favoritesCount.resolver';

import { StudentDashboardPage } from './student-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: StudentDashboardPage,

    resolve: {
      cart: cartListResolver,
      notificationCount: notificationCountResolver,
      favorites: favoritesCountResolver 
    },

    children: [
      {
        path: '',
        redirectTo: 'student-dashborad-courses',
        pathMatch: 'full',
      },
      {
        path: 'student-dashborad-courses',
        loadChildren: () => import('./student-dashborad-courses/student-dashborad-courses.module').then(m => m.StudentDashboradCoursesPageModule)
      },
      {
        path: 'student-dashborad-teachers',
        loadChildren: () => import('./student-dashborad-teachers/student-dashborad-teachers.module').then(m => m.StudentDashboradTeachersPageModule)
      },
      
      {
        path: 'student-dashboard-study-material',
        loadChildren: () => import('./student-dashboard-study-material/student-dashboard-study-material.module').then( m => m.StudentDashboardStudyMaterialPageModule)
      },
    ]
  },
  {
    path: 'student-menu',
    loadChildren: () => import('./student-menu/student-menu.module').then(m => m.StudentMenuPageModule)
  },
  {
    path: 'student-profile-edit',
    loadChildren: () => import('./student-profile-edit/student-profile-edit.module').then(m => m.StudentProfileEditPageModule)
  },
  





];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentDashboardPageRoutingModule { }
