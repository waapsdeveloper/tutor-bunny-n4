import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TeacherDashboardPageRoutingModule } from './teacher-dashboard-routing.module';
import { TeacherDashboardPage } from './teacher-dashboard.page';
import { StatisticBoxModule } from 'src/app/components/statistic-box/statistic-box.module';
import { StudentsBoxModule } from 'src/app/components/students-box/students-box.module';
import { YoutubeBoxModule } from 'src/app/components/youtube-box/youtube-box.module';
import { TeacherDashboardHeaderModule } from './teacher-dashboard-header/teacher-dashboard-header.module';
import { TrialBoxModule } from './trial-box/trial-box.module';
import { MessageBoxdModule } from './message-boxd/message-boxd.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatisticBoxModule,
    StudentsBoxModule,
    TrialBoxModule,
    TeacherDashboardPageRoutingModule,
    TeacherDashboardHeaderModule,
    YoutubeBoxModule,
    MessageBoxdModule

  ],
  declarations: [TeacherDashboardPage]
})
export class TeacherDashboardPageModule {}
