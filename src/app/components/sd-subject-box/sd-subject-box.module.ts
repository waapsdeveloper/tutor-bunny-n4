import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SdSubjectBoxComponent } from './sd-subject-box.component';
import { SubjectListeModule } from './subject-list/subject-list.module';

@NgModule({
  declarations: [SdSubjectBoxComponent],
  imports: [CommonModule, FormsModule, IonicModule,SubjectListeModule],
  exports: [SdSubjectBoxComponent],
})
export class SdSubjectBoxModule {}
