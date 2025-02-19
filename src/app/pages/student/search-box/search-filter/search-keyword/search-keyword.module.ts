import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchKeywordComponent } from './search-keyword.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { KeywordListModule } from './keyword-list/keyword-list.module';



@NgModule({
  declarations: [SearchKeywordComponent],
  imports: [
    CommonModule, FormsModule, IonicModule, KeywordListModule
  ],
  exports: [SearchKeywordComponent]
})
export class SearchKeywordModule { }
