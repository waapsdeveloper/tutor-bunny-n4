import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSearchViewComponent } from './list-search-view.component';
import { SwiperModule } from 'swiper/angular';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StudentDashboardStudyMaterialPageModule } from '../../pages/student-dashboard-study-material/student-dashboard-study-material.module';
import { StudentDashboradTeachersPageModule } from '../../pages/student-dashborad-teachers/student-dashborad-teachers.module';
import { StudentDashboradCoursesPageModule } from '../../pages/student-dashborad-courses/student-dashborad-courses.module';


@NgModule({
  declarations: [ListSearchViewComponent],
  imports: [
    CommonModule,
    SwiperModule,
    FormsModule,
    IonicModule,
    StudentDashboardStudyMaterialPageModule,
    StudentDashboradTeachersPageModule,
    StudentDashboradCoursesPageModule,
  ],
  exports: [
    ListSearchViewComponent
  ]
})
export class ListSearchViewModule { }
