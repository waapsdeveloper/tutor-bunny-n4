import { Component, Injector, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { BasePage } from 'src/app/base-page/base-page';
import { SearchFilterService } from 'src/app/services/search-filter.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.page.html',
  styleUrls: ['./search-result.page.scss'],
})
export class SearchResultPage extends BasePage {

  constructor(injector:Injector, public filter: SearchFilterService) {
    super(injector)
   }



  async onIonInfinite(ev) {
    if (this.filter.page <= this.filter.last_page) {
      const np = this.filter.page + 1;
      await this.filter.submitFormData(np);
    }
    (ev as InfiniteScrollCustomEvent).target.complete();
  }

}
