import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SubjectListComponent } from './subject-list.component';

@NgModule({
  declarations: [SubjectListComponent],
  imports: [CommonModule, IonicModule, FormsModule],
  exports: [SubjectListComponent],
})
export class SubjectListeModule {}
