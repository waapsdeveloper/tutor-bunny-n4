import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavCoursesPageRoutingModule } from './fav-courses-routing.module';

import { FavCoursesPage } from './fav-courses.page';
import { SdHeaderTopModule } from 'src/app/components/sd-header-top/sd-header-top.module';
import { FavRecCoursesModule } from './fav-rec-courses/fav-rec-courses.module';
import { CourseListModule } from '../student-dashboard/rec-courses/course-list/course-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavCoursesPageRoutingModule,
    SdHeaderTopModule,
    FavRecCoursesModule,
    CourseListModule
  ],
  declarations: [FavCoursesPage]
})
export class FavCoursesPageModule { }
