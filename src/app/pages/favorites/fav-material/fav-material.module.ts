import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavMaterialPageRoutingModule } from './fav-material-routing.module';

import { FavMaterialPage } from './fav-material.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavMaterialPageRoutingModule
  ],
  declarations: [FavMaterialPage]
})
export class FavMaterialPageModule {}
