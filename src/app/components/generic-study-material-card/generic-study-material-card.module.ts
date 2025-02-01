import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TrailMessageModule } from '../trail-message/trail-message.module';
import { RatingStarsModule } from '../rating-stars/rating-stars.module';
import { GenericStudyMaterialCardComponent } from './generic-study-material-card.component';


@NgModule({
  declarations: [GenericStudyMaterialCardComponent],
  imports: [
    CommonModule,
    IonicModule,
    TrailMessageModule,
    RatingStarsModule,
  ],
  exports: [GenericStudyMaterialCardComponent]
})
export class GenericStudyMaterialCardModule { }
