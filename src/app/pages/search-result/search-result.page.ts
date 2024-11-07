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
  filterObj = null;
  loading = false;


  debounceTimer: any; // Debounce timer property

  constructor(injector: Injector, public filter: SearchFilterService) {
    super(injector);
  }
  ngOnInit(): void {
    console.log("run once")
  }

  ionViewWillEnter() {
    this.params = this.nav.getQueryParams();
    if (this.params.search) {
      this.search = this.params.search;
      this.callAPiOnSerch(this.search, this.page);
    }

    if(this.params.filter){
      this.filterObj = JSON.parse(this.params.filter);
      this.callAPiOnSerch(this.search, this.page);
    }
  }

  async callAPiOnSerch(search, page): Promise<any> {
      let obj = {
        search: search,
        page: page,
        liked: false,
      };

      if(this.filterObj){
        obj = this.filterObj;
        obj['page'] = page;
        obj['search'] = search;
        obj['liked'] = false
      }

      let res = (await this.network.getAllCourses(obj)) as any;
      console.log(res)
      let d = Object.assign({}, res.result);

      this.page = d.current_page;
      this.last_page = d.last_page;

      console.log(this.page);


      if (this.page == 1) {
        this.searchCourses = d['data'];
      } else {
        this.searchCourses = [...this.searchCourses, ...d['data']];
      }


      return true;
  }

  async onIonInfinite($event) {

    if(this.loading == true){
      $event.target.complete();
      return;
    }

    if (this.page >= this.last_page) {
      $event.target.disabled = true;
    }

    this.loading = true;
    if (this.page < this.last_page) {
      const n = this.page + 1;
      await this.callAPiOnSerch(this.search, n);
    }
    this.loading = false;
    $event.target.complete();

  }
}
