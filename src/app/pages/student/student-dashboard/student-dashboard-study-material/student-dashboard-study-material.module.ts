import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StudentDashboardStudyMaterialPageRoutingModule } from './student-dashboard-study-material-routing.module';
import { StudentDashboardStudyMaterialPage } from './student-dashboard-study-material.page';
import { GenericStudyMaterialCardModule } from 'src/app/components/generic-study-material-card/generic-study-material-card.module';
import { GlobalListViewModule } from 'src/app/components/global-list-view/global-list-view.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentDashboardStudyMaterialPageRoutingModule,
    GlobalListViewModule,
    GenericStudyMaterialCardModule,

  ],
  declarations: [StudentDashboardStudyMaterialPage]
})
export class StudentDashboardStudyMaterialPageModule {}
