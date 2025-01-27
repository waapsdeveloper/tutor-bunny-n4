import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrialBoxComponent } from './trial-box.component';
import { IonicModule } from '@ionic/angular';
import { TrailListModule } from './trail-list/trail-list.module';
import { SwiperModule } from 'swiper/angular';
import { FilterPendingPipe } from 'src/app/pipes/filter-pending.pipe';

@NgModule({
  declarations: [TrialBoxComponent],
  imports: [
    CommonModule,
    IonicModule,
    TrailListModule,
    SwiperModule,
    FilterPendingPipe
  ],
  exports: [
    TrialBoxComponent
  ]
})
export class TrialBoxModule { }
