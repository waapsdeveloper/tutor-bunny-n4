import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherDashboardPageRoutingModule } from './teacher-dashboard-routing.module';

import { TeacherDashboardPage } from './teacher-dashboard.page';
import { OptionBbBoxModule } from 'src/app/components/option-bb-box/option-bb-box.module';
import { StatisticBoxModule } from 'src/app/components/statistic-box/statistic-box.module';
import { StudentsBoxModule } from 'src/app/components/students-box/students-box.module';
import { TrialBoxModule } from 'src/app/components/trial-box/trial-box.module';
import { YoutubeBoxModule } from 'src/app/components/youtube-box/youtube-box.module';
import { RatingStarsModule } from 'src/app/components/rating-stars/rating-stars.module';
import { MessageBoxdModule } from 'src/app/components/message-boxd/message-boxd.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatisticBoxModule,
    OptionBbBoxModule,
    StudentsBoxModule,
    TrialBoxModule,
    TeacherDashboardPageRoutingModule,
    YoutubeBoxModule,
    RatingStarsModule,
    MessageBoxdModule

  ],
  declarations: [TeacherDashboardPage]
})
export class TeacherDashboardPageModule {}
