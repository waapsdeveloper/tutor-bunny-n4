import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StudentDashboradCoursesPageRoutingModule } from './student-dashborad-courses-routing.module';
import { StudentDashboradCoursesPage } from './student-dashborad-courses.page';
import { GlobalListViewModule } from 'src/app/components/global-list-view/global-list-view.module';
import { GenericCourseCardModule } from 'src/app/components/generic-course-card/generic-course-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentDashboradCoursesPageRoutingModule,
    GlobalListViewModule,
    GenericCourseCardModule

  ],
  declarations: [StudentDashboradCoursesPage],
  exports: [StudentDashboradCoursesPage]
})
export class StudentDashboradCoursesPageModule {}
