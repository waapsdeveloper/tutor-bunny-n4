import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GenericCourseCardModule } from 'src/app/components/generic-course-card/generic-course-card.module';
import { StudentDashboardStudyMaterialPageRoutingModule } from './student-dashboard-study-material-routing.module';
import { StudentDashboardStudyMaterialPage } from './student-dashboard-study-material.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentDashboardStudyMaterialPageRoutingModule,
    GenericCourseCardModule

  ],
  declarations: [StudentDashboardStudyMaterialPage]
})
export class StudentDashboardStudyMaterialPageModule {}
