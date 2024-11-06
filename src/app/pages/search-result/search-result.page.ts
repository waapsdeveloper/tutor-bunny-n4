import { Component, Injector, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { BasePage } from 'src/app/base-page/base-page';
import { SearchFilterService } from 'src/app/services/search-filter.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.page.html',
  styleUrls: ['./search-result.page.scss'],
})
export class SearchResultPage extends BasePage implements OnInit {
  params;
  search;
  searchCourses: any[] = [];
  page = 1;
  last_page = -1;

  debounceTimer: any; // Debounce timer property

  constructor(injector: Injector, public filter: SearchFilterService) {
    super(injector);
  }

  ngOnInit() {
    this.params = this.nav.getQueryParams();
    if (this.params.search) {
      this.search = this.params.search;
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(async () => {
        let res = this.callAPiOnSerch(this.search, this.page);
      }, 500);
    }
  }

  callAPiOnSerch(search, page) {
    return new Promise(async (resolve) => {
      let obj = {
        search: search,
        page: page,
        liked: false,
      };
      let res = (await this.network.searchFromKeywords(obj)) as any;
      let d = res.result;
      this.page = d.current_page;
      if (this.page == 1) {
        this.searchCourses = d['data'];
      } else {
        this.searchCourses = [...this.searchCourses, ...d['data']];
      }
      resolve(true);
    });
  }

  async onIonInfinite(ev) {
    if (this.page <= this.last_page) {
      this.page = this.page + 1;
      await this.callAPiOnSerch(this.search, this.page);
    }
    (ev as InfiniteScrollCustomEvent).target.complete();
  }
}
