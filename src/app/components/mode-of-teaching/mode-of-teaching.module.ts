import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModeOfTeachingComponent } from './mode-of-teaching.component';
import { SdErrorInputInfoModule } from '../sd-error-input-info/sd-error-input-info.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ModeOfTeachingComponent],
  imports: [
    CommonModule,
    SdErrorInputInfoModule,
    FormsModule
  ],
  exports:[ModeOfTeachingComponent]
})
export class ModeOfTeachingModule { }
