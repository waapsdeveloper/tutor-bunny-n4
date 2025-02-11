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


  page = 1;
  last_page = -1
  list: any[] = [];
  total = 0;

  step = 1;





  searchList: any[] = [];
  
  searchCourses: any[] = [];

  search = '';
  user;

  debounceTimer: any; // Debounce timer property

  constructor(injector: Injector, public filter: SearchFilterService) {
    super(injector);

  }

  // click on recent search
  async openFromRecentSearch(item) {

    if (!item.course_id) {

    } else {
      const params = {
        id: item.id,
        backUrl: '/tabs/student-dashboard',
      };
      this.nav.push('student-course-detail', params);
    }
  }

  searchKeyword($event){
    console.log($event);

    
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

  async setRecentSeach(item, type) {
    // let obj = {
    //   user_id: this.user.id,
    //   keyword_name: item.name,
    //   keyword_id: item.id,
    // };
    // let res = await this.network.setRecentSeach(obj);
    const params = {
      search: item.name // type == 'keyword' ? (item.keyword_name ?? '') : (item.title ?? ''),
    };
    this.nav.push('search-result', params);
  }

  back() {
    this.nav.pop();
  }
}
