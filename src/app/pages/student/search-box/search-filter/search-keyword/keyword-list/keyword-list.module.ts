import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeywordListComponent } from './keyword-list.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [KeywordListComponent],
  imports: [
    CommonModule,IonicModule, FormsModule
  ],
  exports:[KeywordListComponent]
})
export class KeywordListModule { }
