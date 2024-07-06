import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavCoursesPage } from './fav-courses.page';

const routes: Routes = [
  {
    path: '',
    component: FavCoursesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavCoursesPageRoutingModule {}
