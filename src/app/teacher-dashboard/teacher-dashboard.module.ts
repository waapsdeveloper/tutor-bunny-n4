import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherDashboardPageRoutingModule } from './teacher-dashboard-routing.module';

import { TeacherDashboardPage } from './teacher-dashboard.page';
import { OptionBbBoxModule } from '../components/option-bb-box/option-bb-box.module';
import { StatisticBoxModule } from '../components/statistic-box/statistic-box.module';
import { StudentsBoxModule } from '../components/students-box/students-box.module';
import { TrialBoxModule } from '../components/trial-box/trial-box.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatisticBoxModule,
    OptionBbBoxModule,
    StudentsBoxModule,
    TrialBoxModule,
    TeacherDashboardPageRoutingModule
  ],
  declarations: [TeacherDashboardPage]
})
export class TeacherDashboardPageModule {}
