import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoursesPageRoutingModule } from './courses-routing.module';

import { CoursesPage } from './courses.page';
import { SdHeaderTopModule } from '../components/sd-header-top/sd-header-top.module';
import { ProfileSearchBoxModule } from '../student-dashboard/profile-search-box/profile-search-box.module';
import { CourseCardModule } from './course-card/course-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoursesPageRoutingModule,
    SdHeaderTopModule,
    ProfileSearchBoxModule,
    CourseCardModule
  ],
  declarations: [CoursesPage]
})
export class CoursesPageModule {}
