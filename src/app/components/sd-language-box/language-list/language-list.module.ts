import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LanguageListComponent } from './language-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LanguageListComponent],
  imports: [CommonModule, IonicModule, FormsModule],
  exports: [LanguageListComponent],
})
export class LanguagListeModule {}
