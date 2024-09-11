import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoursesPageRoutingModule } from './courses-routing.module';

import { CoursesPage } from './courses.page';
import { SdHeaderTopModule } from 'src/app/components/sd-header-top/sd-header-top.module';
import { CourseCardModule } from './course-card/course-card.module';
import { ProfileSearchBoxModule } from '../profile-details/profile-search-box/profile-search-box.module';

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
