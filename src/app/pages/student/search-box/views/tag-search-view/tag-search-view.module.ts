import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagSearchViewComponent } from './tag-search-view.component';
import { IonicModule } from '@ionic/angular';
import { GlobalListViewModule } from "../../../../../components/global-list-view/global-list-view.module";



@NgModule({
  declarations: [TagSearchViewComponent],
  imports: [
    CommonModule,
    IonicModule,
    GlobalListViewModule
],
  exports: [TagSearchViewComponent]
})
export class TagSearchViewModule { }
