import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalListViewComponent } from './global-list-view.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [GlobalListViewComponent],
  imports: [CommonModule, IonicModule],
  exports: [GlobalListViewComponent],
})
export class GlobalListViewModule {}
