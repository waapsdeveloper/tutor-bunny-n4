import { Component, OnInit, Input, Injector } from '@angular/core';
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

  
  constructor(
    injector: Injector,
    public filter: SearchFilterService
  ) {
    super(injector);
  }

  async fetchList(page: number, search: string, status: string): Promise<any> {
    const data = await this.filter.getSelectedKeyword();
    const courseids = (data as any[]).map((item) => item.course_id);

    let obj = {
      ids: courseids,
      page: page,
    };

    let res = await this.network.favCourseByIds(obj);
    console.log(res)
    return {
      list: res.result.data,
      page: res.result.current_page,
      last_page: res.result.last_page,
      total: res.result.total,
    };
  }

  ngOnInit() {
    this.resetAndFetch();
  }

  openDetails(item: any) {
    this.nav.push('student-course-detail', { course_id: item.id });
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
