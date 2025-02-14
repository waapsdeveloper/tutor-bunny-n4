import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherDashboardPage } from './teacher-dashboard.page';
import { userResolver } from 'src/app/resolvers/user.resolver';
import { listTrialsResolver } from 'src/app/resolvers/teacher/trialList.resolver';
import { requestListResolver } from 'src/app/resolvers/teacher/requestList.resolver';

const routes: Routes = [
  {
    path: '',
    component: TeacherDashboardPage,
    resolve: {
      user: userResolver,
      requestList: requestListResolver
    },
  },
  {
    path: 'create-course',
    loadChildren: () => import('./create-course/create-course.module').then(m => m.CreateCoursePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherDashboardPageRoutingModule { }
