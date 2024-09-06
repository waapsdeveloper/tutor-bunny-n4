import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchCourseBoxComponent } from './search-course-box.component';
import { CourseListModule } from './course-list/course-list.module';



@NgModule({
  declarations: [SearchCourseBoxComponent],
  imports: [
    CommonModule,
    CourseListModule
  ],
  exports:[SearchCourseBoxComponent]
})
export class SearchCourseBoxModule { }
