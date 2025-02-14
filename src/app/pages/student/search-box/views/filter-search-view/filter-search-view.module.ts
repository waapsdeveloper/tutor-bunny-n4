import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterSearchViewComponent } from './filter-search-view.component';
import { SwiperModule } from 'swiper/angular';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StudentDashboardStudyMaterialPageModule } from '../../pages/student-dashboard-study-material/student-dashboard-study-material.module';
import { StudentDashboradTeachersPageModule } from '../../pages/student-dashborad-teachers/student-dashborad-teachers.module';
import { StudentDashboradCoursesPageModule } from '../../pages/student-dashborad-courses/student-dashborad-courses.module';

@NgModule({
  declarations: [FilterSearchViewComponent],
  imports: [
    CommonModule,
    SwiperModule,
    FormsModule,
    IonicModule,
    StudentDashboardStudyMaterialPageModule,
    StudentDashboradTeachersPageModule,
    StudentDashboradCoursesPageModule,
  ],
  exports: [FilterSearchViewComponent],
})
export class FilterSearchViewModule {}