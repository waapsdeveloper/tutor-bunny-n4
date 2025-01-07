import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialCardComponent } from './material-card.component';
import { IonicModule } from '@ionic/angular';
import { RatingStarsModule } from 'src/app/components/rating-stars/rating-stars.module';



@NgModule({
  declarations: [MaterialCardComponent],
  imports: [
    CommonModule,
    IonicModule,
    RatingStarsModule
  ],
  exports: [MaterialCardComponent]
})
export class MaterialCardModule { }
