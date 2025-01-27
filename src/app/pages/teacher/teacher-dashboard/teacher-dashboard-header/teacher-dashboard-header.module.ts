import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherDashboardHeaderComponent } from './teacher-dashboard-header.component';
import { RatingStarsModule } from 'src/app/components/rating-stars/rating-stars.module';
import { NotificationDotCountComponent } from '../notification-dot-count/notification-dot-count.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [TeacherDashboardHeaderComponent, NotificationDotCountComponent],
  imports: [
    CommonModule,
    IonicModule,
    RatingStarsModule,
  ],
  exports: [
    TeacherDashboardHeaderComponent
  ]
})
export class TeacherDashboardHeaderModule { }
