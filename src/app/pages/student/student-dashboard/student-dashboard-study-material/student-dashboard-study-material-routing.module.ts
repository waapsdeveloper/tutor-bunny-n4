import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { materialListResolver } from 'src/app/resolvers/student/materialList.resolver';
import { StudentDashboardStudyMaterialPage } from './student-dashboard-study-material.page';

const routes: Routes = [
  {
    path: '',
    component: StudentDashboardStudyMaterialPage,
    resolve: {
      materialList: materialListResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentDashboardStudyMaterialPageRoutingModule {}
