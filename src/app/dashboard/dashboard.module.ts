import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DashboardPageRoutingModule,  } from './dashboard-routing.module';
import { DashboardPage } from './dashboard.page';
import { StatisticBoxModule } from './components/statistic-box/statistic-box.module';
import { OptionBbBoxModule } from './components/option-bb-box/option-bb-box.module';
import { StudentsBoxModule } from './components/students-box/students-box.module';
import { TrialBoxModule } from './components/trial-box/trial-box.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    StatisticBoxModule,
    OptionBbBoxModule,
    StudentsBoxModule,
    TrialBoxModule
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
