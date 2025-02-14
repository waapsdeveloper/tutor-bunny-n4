import { Component, OnInit, Input } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-tag-search-view',
  templateUrl: './tag-search-view.component.html',
  styleUrls: ['./tag-search-view.component.scss'],
})
export class TagSearchViewComponent  implements OnInit {

  

  page = 1;
  last_page = -1
  list: any[] = [];
  total = 0;
  search: "";

  debounceTimer: any; // Debounce timer property



  private _data;
  @Input() set data(value) {
    this._data = value;
    this.updateViewDetails(value);
  }
  get data() {
    return this._data;
  }


  constructor(private network: NetworkService, private events: EventsService) { }

  ngOnInit() {
    this.events.subscribe('text-input-search-triggered', (data) =>  {
      // keyword: event.target.value,
      console.log(data.keyword);
      this.updateViewDetails({
        search: data.keyword,
      })
    });
  }

  updateViewDetails(value: any) {
    console.log(value);
    this.search = value.search;

    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(async () => {
      let res = await this.callAPiOnSerch(this.search);
      console.log(res)

    }, 500);

  }

  
  callAPiOnSerch(search) {
    return new Promise(async (resolve) => {
      let obj = {
        search: search,
        page: 1,
        liked: false,
      };
      let res = (await this.network.searchFromKeywords(obj)) as any;
      console.log(res);

      const data = res.result;
      this.page = data.current_page
      this.total = data.total;
      this.list = data.data;




      
      // this.searchList = res.keywords;
      // this.searchCourses = res.result.data;

      resolve(true);
    });
  }

  async setRecentSeach(item, type) {
    
    const params = {
      search: item.name // type == 'keyword' ? (item.keyword_name ?? '') : (item.title ?? ''),
    };

    console.log(params);


    // this.nav.push('search-result', params);
  }

}
