import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchKeywordComponent } from './search-keyword.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SdErrorInputInfoModule } from '../sd-error-input-info/sd-error-input-info.module';
import { KeywordListModule } from './keyword-list/keyword-list.module';



@NgModule({
  declarations: [SearchKeywordComponent],
  imports: [
    CommonModule, FormsModule, IonicModule, SdErrorInputInfoModule, KeywordListModule
  ],
  exports: [SearchKeywordComponent]
})
export class SearchKeywordModule { }
