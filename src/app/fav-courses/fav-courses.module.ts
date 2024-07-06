import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavCoursesPageRoutingModule } from './fav-courses-routing.module';

import { FavCoursesPage } from './fav-courses.page';
import { SdHeaderTopModule } from '../components/sd-header-top/sd-header-top.module';
import { FavRecCoursesModule } from './fav-rec-courses/fav-rec-courses.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavCoursesPageRoutingModule,
    SdHeaderTopModule,
    FavRecCoursesModule
  ],
  declarations: [FavCoursesPage]
})
export class FavCoursesPageModule { }
