import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileDetailsPageRoutingModule } from './profile-details-routing.module';

import { ProfileDetailsPage } from './profile-details.page';
import { ProfileSearchBoxModule } from './profile-search-box/profile-search-box.module';
import { RecTeachersModule } from './rec-teachers/rec-teachers.module';
import { RecCoursesModule } from './rec-courses/rec-courses.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileDetailsPageRoutingModule,
    ProfileSearchBoxModule,
    RecTeachersModule,
    RecCoursesModule
  ],
  declarations: [ProfileDetailsPage]
})
export class ProfileDetailsPageModule {}
