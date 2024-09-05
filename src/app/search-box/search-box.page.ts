import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base-page/base-page';
import { initializeApp } from 'firebase/app';
import { SearchFilterService } from '../services/search-filter.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.page.html',
  styleUrls: ['./search-box.page.scss'],
})
export class SearchBoxPage extends BasePage implements OnInit {
  search;
  searchList;
  user;
  recentSearch;

  constructor(injector: Injector, public filter : SearchFilterService) {
    super(injector);
    this.user = this.users.getUser();

    this.initialize();
  }

  ngOnInit() {}

  async initialize() {
    let obj = {
      user_id: this.user.id,
    };
    let res = await this.network.getRecentSearchs(obj);
    console.log(res);
    this.recentSearch = res.result;
  }

  back() {
    this.nav.pop();
  }

  gotoFilter() {
    this.nav.push('search-filter');
  }

  async onKeyUp(event: any) {
    this.search = event.target.value;

    let res =  this.filter.onKeyUp(this.search)
    console.log(res);

  }

  async setRecentSeach(item) {
    console.log(item);
    let obj = {
      user_id: this.user.id,
      course_title: item.title,
      course_id: item.id,
    };
    console.log(obj);
    let res = await this.network.setRecentSeach(obj);
    console.log(res);
    const params = {
      id: item.id,
      backUrl: '/tabs/student-dashboard',
    };
    this.nav.push('student-course-detail', params);
  }

  async onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement.value;
    console.log('Search Term:', searchTerm);
    let obj = {
      user_id: this.user.id,
      course_title: searchTerm,
      course_id: null,
    };
    console.log(obj);
    let res = await this.network.setRecentSeach(obj);
    console.log(res);
    const params = {
      title: searchTerm,
    };
    this.nav.push('search-result', params);
  }

  async openFromRecentSearch(item) {
    if (!item.course_id) {
      this.search = item.course_title;
      let obj = {
        search: this.search,
        page: 1,
        liked: false,
      };
      const res = (await this.network.getAllCourses(obj)) as any;
      console.log(res);

      const data = res.result;
      this.searchList = data.data;
    } else {
      const params = {
        id: item.id,
        backUrl: '/tabs/student-dashboard',
      };
      this.nav.push('student-course-detail', params);
    }
  }
}
