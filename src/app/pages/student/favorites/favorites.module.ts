import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoritesPageRoutingModule } from './favorites-routing.module';

import { FavoritesPage } from './favorites.page';
import { SdHeaderTopModule } from 'src/app/components/sd-header-top/sd-header-top.module';
import { SwiperModule } from 'swiper/angular';
import { FavCoursesPageModule } from './fav-courses/fav-courses.module';
import { FavMaterialPageModule } from './fav-material/fav-material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoritesPageRoutingModule,
    SdHeaderTopModule,
    SwiperModule,

    // pages import
    FavCoursesPageModule,
    FavMaterialPageModule
  ],
  declarations: [FavoritesPage]
})
export class FavoritesPageModule {}
