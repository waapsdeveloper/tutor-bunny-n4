import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavMaterialPageRoutingModule } from './fav-material-routing.module';

import { FavMaterialPage } from './fav-material.page';
import { GlobalListViewModule } from 'src/app/components/global-list-view/global-list-view.module';
import { GenericStudyMaterialCardModule } from 'src/app/components/generic-study-material-card/generic-study-material-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavMaterialPageRoutingModule,
    GlobalListViewModule,
    GenericStudyMaterialCardModule
  ],
  declarations: [FavMaterialPage],
  exports: [FavMaterialPage]
})
export class FavMaterialPageModule {}
