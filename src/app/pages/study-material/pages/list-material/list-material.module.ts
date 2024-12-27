import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListMaterialPageRoutingModule } from './list-material-routing.module';

import { ListMaterialPage } from './list-material.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListMaterialPageRoutingModule
  ],
  declarations: [ListMaterialPage]
})
export class ListMaterialPageModule {}
