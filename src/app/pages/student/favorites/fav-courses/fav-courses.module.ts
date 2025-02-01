import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavCoursesPageRoutingModule } from './fav-courses-routing.module';

import { FavCoursesPage } from './fav-courses.page';
import { SdHeaderTopModule } from 'src/app/components/sd-header-top/sd-header-top.module';
import { GenericCourseCardModule } from 'src/app/components/generic-course-card/generic-course-card.module';
import { GlobalListViewModule } from 'src/app/components/global-list-view/global-list-view.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavCoursesPageRoutingModule,
    SdHeaderTopModule,
    GlobalListViewModule,
    GenericCourseCardModule

  ],
  declarations: [FavCoursesPage]
})
export class FavCoursesPageModule { }
