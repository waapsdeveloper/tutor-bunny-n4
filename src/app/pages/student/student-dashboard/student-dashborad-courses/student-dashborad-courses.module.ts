import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StudentDashboradCoursesPageRoutingModule } from './student-dashborad-courses-routing.module';
import { StudentDashboradCoursesPage } from './student-dashborad-courses.page';
import { GenericCourseCardModule } from './../../components/generic-course-card/generic-course-card.module';
import { GlobalListViewModule } from 'src/app/components/global-list-view/global-list-view.module';

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
