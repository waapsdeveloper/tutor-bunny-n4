import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavRecCoursesComponent } from './fav-rec-courses.component';
// import { FavRecListModule } from './fav-rec-list/fav-rec-list.module';
import { CourseListModule } from 'src/app/student-dashboard/rec-courses/course-list/course-list.module';



@NgModule({
  declarations: [FavRecCoursesComponent],
  imports: [
    CommonModule,
    // FavRecListModule
    CourseListModule
  ],
  exports:[FavRecCoursesComponent]
})
export class FavRecCoursesModule { }
