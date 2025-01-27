import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherTrialListPageRoutingModule } from './teacher-trial-list-routing.module';

import { TeacherTrialListPage } from './teacher-trial-list.page';
import { SdHeaderTopModule } from "../../../components/sd-header-top/sd-header-top.module";
import { TrailCardModule } from "./trail-card/trail-card.module";
import { FilterStatusPipe } from './filter-status.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherTrialListPageRoutingModule,
    SdHeaderTopModule,
    TrailCardModule
],
  declarations: [TeacherTrialListPage, FilterStatusPipe]
})
export class TeacherTrialListPageModule {}
