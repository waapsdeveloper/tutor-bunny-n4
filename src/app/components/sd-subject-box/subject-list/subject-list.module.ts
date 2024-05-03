import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SubjectListComponent } from './subject-list.component';
import { SdHeaderTopModule } from '../../sd-header-top/sd-header-top.module';
import { SdButtonGrayModule } from '../../sd-button-gray/sd-button-gray.module';

@NgModule({
  declarations: [SubjectListComponent],
  imports: [CommonModule, IonicModule, FormsModule, SdHeaderTopModule, SdButtonGrayModule],
  exports: [SubjectListComponent],
})
export class SubjectListeModule {}
