import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { SearchFilterService } from 'src/app/pages/student/search-box/search-filter.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.page.html',
  styleUrls: ['./search-box.page.scss'],
})
export class SearchBoxPage extends BasePage implements OnInit{


  tagSearchData = {
    search: '',
    tags: [],
  }


  step = 1;





  searchList: any[] = [];
  
  searchCourses: any[] = [];

  search = '';
  user;

  

  constructor(injector: Injector, public filter: SearchFilterService) {
    super(injector);

  }
  ngOnInit(): void {
    this.events.subscribe('filter-result',(data)=>{
      console.log(data);
      this.step = 3;
      
    })
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

    let id = $event.id;
    let v = $event.keyword;
    if(v){
      this.search = v;
      this.step = 3;

      setTimeout( () => {
        this.events.publish('tag-input-search-triggered', {
          id: id,
          keyword: v,
        });
      }, 1000)
      
      

    }

    
  }





  gotoFilter() {
    this.nav.push('search-filter');
  }

  // Debounced onKeyUp method
  async onKeyUp(event: any) {

    this.search = event.target.value;

    if(this.step === 2){
      this.events.publish('text-input-search-triggered', {
        text: event.target.value,
      });
    } else {
      this.step = 2;

      setTimeout( () => {
        this.events.publish('text-input-search-triggered', {
          text: event.target.value,
        });
      }, 500)
    }
   
  }


  async onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement.value;
    let obj = {
      user_id: this.user.id,
      keyword_name: searchTerm,
      keyword_id: null,
    };
    // let res = await this.network.setRecentSeach(obj);
    // const params = {
    //   title: searchTerm,
    // };
    // this.nav.push('search-result', params);
  }

  

  back() {
    this.nav.pop();
  }
}
