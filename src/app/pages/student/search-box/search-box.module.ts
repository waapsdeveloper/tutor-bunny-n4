import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchBoxPageRoutingModule } from './search-box-routing.module';

import { SearchBoxPage } from './search-box.page';
import { EmptySearchViewModule } from './views/empty-search-view/empty-search-view.module';
import { FilterSearchViewModule } from './views/filter-search-view/filter-search-view.module';
import { ListSearchViewModule } from './views/list-search-view/list-search-view.module';
import { TagSearchViewModule } from './views/tag-search-view/tag-search-view.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchBoxPageRoutingModule,

    // section modules
    EmptySearchViewModule,
    FilterSearchViewModule,
    ListSearchViewModule,
    TagSearchViewModule

  ],
  declarations: [SearchBoxPage]
})
export class SearchBoxPageModule {}
