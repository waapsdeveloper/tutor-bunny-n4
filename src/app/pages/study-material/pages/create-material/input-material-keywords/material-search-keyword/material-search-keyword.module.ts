import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialSearchKeywordComponent } from './material-search-keyword.component';
import { IonicModule } from '@ionic/angular';
import { KeywordListModule } from './keyword-list/keyword-list.module';



@NgModule({
  declarations: [MaterialSearchKeywordComponent],
  imports: [
    CommonModule,
    IonicModule,
    KeywordListModule
  ],
  exports: [MaterialSearchKeywordComponent]
})
export class MaterialSearchKeywordModule { }
