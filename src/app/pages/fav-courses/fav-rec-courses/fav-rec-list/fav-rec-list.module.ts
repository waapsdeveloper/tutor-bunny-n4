import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavRecListComponent } from './fav-rec-list.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [FavRecListComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [FavRecListComponent]
})
export class FavRecListModule { }
