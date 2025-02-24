import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { SearchFilterService } from 'src/app/pages/student/search-box/search-filter.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.page.html',
  styleUrls: ['./search-box.page.scss'],
})
export class SearchBoxPage extends BasePage implements OnInit{

  showFilterStep = false;
  step = 1;
  search = '';
  user;

  loading = false;
  searchSubject = new Subject<string>();
  

  constructor(injector: Injector, public filter: SearchFilterService) {
    super(injector);

    this.searchSubject.pipe(debounceTime(1500)).subscribe(value => {
      this.executeSearch(value);
    });

  }
  async ngOnInit(){
    this.step = 1;    
    // this.search = '';
    this.user = await this.users.getUser();
    this.filter.reset();

    this.events.subscribe('filter-result', this.getResultsByFilter.bind(this));
    this.events.subscribe('restart-search-with-text', this.restartSearchWithText.bind(this));
    

  }

  searchKeyword($event){
    console.log($event);
    let keyword = Object.assign({}, $event);

    let v = $event.name;
    this.filter.setKeywords([keyword])
    this.filter.setSearch('');

    if(v){
      this.search = v;
      this.step = 3;

      setTimeout( () => {
        this.events.publish('tag-input-search-triggered', keyword);
      }, 500)
      

    }

    
  }

  getResultsByFilter(formData){
    console.log(formData)
    this.step = 3;

    setTimeout( () => {
      this.events.publish('tag-filter-result-triggered', formData);
    }, 500)
  }

  restartSearchWithText(formData){
    this.step = 3;

    setTimeout( () => {
      this.events.publish('tag-filter-result-triggered', formData);
    }, 500)
  }


  gotoFilter() {
    // this.showFilterStep = !this.showFilterStep;
    this.nav.push('search-filter');
  }

  // Debounced onKeyUp method
  async onKeyUp(event: any) {

    this.loading = true;

    let v = event.target.value;
    console.log(v);
    if(!v || !v.length || v == ''){
      
      this.step = 1;      
    } else {
      this.step = 2;
    }

    this.filter.setSearch(event.target.value);
    this.filter.setKeywords([]);

    // Emit search event with debounce
    this.searchSubject.next(v);
   
  }

  private executeSearch(value: string) {

    this.loading = false;
    this.events.publish('text-input-search-triggered', {
      text: value,
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
