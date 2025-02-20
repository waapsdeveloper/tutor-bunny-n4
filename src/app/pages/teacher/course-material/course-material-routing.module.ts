import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseMaterialPage } from './course-material.page';

const routes: Routes = [
  {
    path: '',
    component: CourseMaterialPage,
    // children: [
    //   {
    //     path: '',
    //     redirectTo: 'courses',
    //     pathMatch: 'full'
    //   },
    //   {
    //     path:'courses',
    //     loadChildren:() => import('./courses/courses.module').then( m => m.CoursesPageModule)
    //   },
    //   {
    //     path:'notes',
    //     loadChildren:() => import('./notes/notes.module').then( m => m.NotesPageModule)
    //   },
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseMaterialPageRoutingModule {}
