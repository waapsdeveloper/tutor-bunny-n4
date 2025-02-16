import { Component, OnInit, Input, Injector, Output, EventEmitter } from '@angular/core';
import { ListPage } from 'src/app/base-page/list-page';
import { EventsService } from 'src/app/services/events.service';
import { NetworkService } from 'src/app/services/network.service';
import { SearchFilterService } from '../../search-filter.service';

@Component({
  selector: 'app-tag-search-view',
  templateUrl: './tag-search-view.component.html',
  styleUrls: ['./tag-search-view.component.scss'],
})
export class TagSearchViewComponent extends ListPage implements OnInit {
  

  @Output() selectKeyword: EventEmitter<any> = new EventEmitter<any>();


  constructor(
    injector: Injector,
    public filter: SearchFilterService
  ) {
    super(injector);

    this.events.subscribe(
      'text-input-search-triggered',
      this.triggerSearchWithParams.bind(this)
    );
  }

  triggerSearchWithParams(data: any) {
    console.log('triggerSearch', data);
    this.search = data.text;
    this.resetAndFetch();
    // this.fetchList(1, data.text, '');
  }


  async fetchList(page: number, search: string, status: string): Promise<any> {
   
    let obj = {
      search: search,
      page: page,
      perpage: 20
    };

    let res = await this.network.getKeywords(obj);
    console.log(res)
    return {
      list: res.data,
      page: res.current_page,
      last_page: res.last_page,
      total: res.total,
    };
  }

  ngOnInit() {
    this.resetAndFetch();
  }

  openDetails(item: any) {
    console.log('openDetails', item);
    this.selectKeyword.emit(item);
    // this.nav.push('student-course-detail', { course_id: item.id });

  }



  // page = 1;
  // last_page = -1
  // list: any[] = [];
  // total = 0;
  // search: "";

  // debounceTimer: any; // Debounce timer property



  // private _data;
  // @Input() set data(value) {
  //   this._data = value;
  //   this.updateViewDetails(value);
  // }
  // get data() {
  //   return this._data;
  // }


  // constructor(private network: NetworkService, private events: EventsService) { }

  // ngOnInit() {
  //   this.events.subscribe('text-input-search-triggered', (data) =>  {
  //     // keyword: event.target.value,
  //     console.log(data.text);
  //     this.updateViewDetails({
  //       search: data.text,
  //     })
  //   });
  // }

  // updateViewDetails(value: any) {
  //   console.log(value);
  //   this.search = value.search;

  //   clearTimeout(this.debounceTimer);
  //   this.debounceTimer = setTimeout(async () => {
  //     let res = await this.callAPiOnSerch(this.search);
  //     console.log(res)

  //   }, 500);

  // }

  
  // callAPiOnSerch(search) {
  //   return new Promise(async (resolve) => {
  //     let obj = {
  //       search: search,
  //       page: 1,
  //       liked: false,
  //     };
  //     let res = (await this.network.searchFromKeywords(obj)) as any;
  //     console.log(res);

  //     const data = res.result;
  //     this.page = data.current_page
  //     this.total = data.total;
  //     this.list = data.data;




      
  //     // this.searchList = res.keywords;
  //     // this.searchCourses = res.result.data;

  //     resolve(true);
  //   });
  // }

  // async setRecentSeach(item, type) {
    
  //   const params = {
  //     search: item.name // type == 'keyword' ? (item.keyword_name ?? '') : (item.title ?? ''),
  //   };

  //   console.log(params);


  //   // this.nav.push('search-result', params);
  // }

  // loadMore(

}
