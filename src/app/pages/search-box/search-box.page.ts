import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { initializeApp } from 'firebase/app';
import { SearchFilterService } from 'src/app/services/search-filter.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.page.html',
  styleUrls: ['./search-box.page.scss'],
})
export class SearchBoxPage extends BasePage {

  searchList: any[] = [];
  recentSearch: any[] = [];
  searchCourses: any[] = [];

  search = '';
  user;

  debounceTimer: any; // Debounce timer property

  constructor(injector: Injector, public filter: SearchFilterService) {
    super(injector);


  }

  ionViewWillEnter(){
    this.initialize();
  }

  async initialize() {

    this.loadResolvers();
    this.user = this.dataR.user;
    let obj = {
      user_id: this.user.id,
    };
    let res = await this.network.getRecentSearchs(obj);

    if(res && res.result){
      this.recentSearch = res.result;
    }

  }

  async getSearchFromKeywordName(item){

    this.search = item.keyword_name;

    if(!this.search){
      return;
    }
    let obj = {
      search: this.search,
      page: 1,
      liked: false,
    };
    const res = (await this.network.getAllCourses(obj)) as any;
    const data = res.result;
    this.searchCourses = data.data;

    // console.log(this.searchCourses)

  }

  // click on recent search
  async openFromRecentSearch(item) {

    console.log(item);

    if (!item.course_id) {

    } else {
      const params = {
        id: item.id,
        backUrl: '/tabs/student-dashboard',
      };
      this.nav.push('student-course-detail', params);
    }
  }







  gotoFilter() {
    this.nav.push('search-filter');
  }

  // Debounced onKeyUp method
  async onKeyUp(event: any) {
    this.search = event.target.value;
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(async () => {
      let res = this.callAPiOnSerch(this.search);
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
      this.searchList = res.keywords;
      this.searchCourses = res.result.data;

      resolve(true);
    });
  }

  async onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement.value;
    let obj = {
      user_id: this.user.id,
      keyword_name: searchTerm,
      keyword_id: null,
    };
    let res = await this.network.setRecentSeach(obj);
    const params = {
      title: searchTerm,
    };
    this.nav.push('search-result', params);
  }

  async setRecentSeach(item) {
    let obj = {
      user_id: this.user.id,
      keyword_name: item.name,
      keyword_id: item.id,
    };
    let res = await this.network.setRecentSeach(obj);
    const params = {
      id: item.id,
      backUrl: '/tabs/student-dashboard',
    };
    this.nav.push('search-result', params);
  }









  back() {
    this.nav.pop();
  }
}
