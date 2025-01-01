import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherDashboardPage } from './teacher-dashboard.page';
import { userResolver } from 'src/app/resolvers/user.resolver';
import { pendingTrialsResolver } from 'src/app/resolvers/pending-trials.resolver';

const routes: Routes = [
  {
    path: '',
    component: TeacherDashboardPage,
    resolve: {
      user: userResolver,
      pendingTrials: pendingTrialsResolver
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
