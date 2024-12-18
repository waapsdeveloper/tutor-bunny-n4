import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GenericStudyMaterialCardModule } from 'src/app/components/generic-study-material-card/generic-study-material-card.module';
import { StudentDashboardStudyMaterialPageRoutingModule } from './student-dashboard-study-material-routing.module';
import { StudentDashboardStudyMaterialPage } from './student-dashboard-study-material.page';
import { GenericCourseCardModule } from 'src/app/components/generic-course-card/generic-course-card.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentDashboardStudyMaterialPageRoutingModule,
    GenericStudyMaterialCardModule,
    GenericCourseCardModule

  ],
  declarations: [StudentDashboardStudyMaterialPage]
})
export class StudentDashboardStudyMaterialPageModule {}
