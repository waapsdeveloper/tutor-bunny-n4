import { Component, Injector, Input, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { SearchFilterService } from 'src/app/services/search-filter.service';

@Component({
  selector: 'app-search-course-box',
  templateUrl: './search-course-box.component.html',
  styleUrls: ['./search-course-box.component.scss'],
})
export class SearchCourseBoxComponent extends BasePage implements OnInit {
  private _search: any;
  searchList;

  // search;

  @Input('search')
  public get search() {
    return this._search;
  }

  public set search(value: any) {
    this._search = value;
    this.callApi(value);
  }

  constructor(injector: Injector, public filter: SearchFilterService) {
    super(injector);
  }

  async callApi(value) {
    let obj = {
      search: value,
      page: 1,
      liked: false,
    };
    const res = await this.network.getAllCourses(obj);
    const data = res.result;
    this.searchList = data.data;
  }

  ngOnInit() {
    this.events.subscribe('set-search-title', (title) => {
      this.search = title;
      this.callApi(this.search)
    })
  }
}
