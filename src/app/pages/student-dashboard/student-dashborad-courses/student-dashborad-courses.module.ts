import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StudentDashboradCoursesPageRoutingModule } from './student-dashborad-courses-routing.module';
import { StudentDashboradCoursesPage } from './student-dashborad-courses.page';
import { GenericCourseCardModule } from 'src/app/components/generic-course-card/generic-course-card.module';
import { CourseTeacherStudyCardModule } from 'src/app/components/course-teacher-study-card/course-teacher-study-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentDashboradCoursesPageRoutingModule,
    GenericCourseCardModule,
    CourseTeacherStudyCardModule

  ],
  declarations: [StudentDashboradCoursesPage]
})
export class StudentDashboradCoursesPageModule {}
