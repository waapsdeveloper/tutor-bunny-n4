import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialSearchKeywordComponent } from './material-search-keyword.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MaterialSearchKeywordComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [MaterialSearchKeywordComponent]
})
export class MaterialSearchKeywordModule { }
