import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-empty-search-view',
  templateUrl: './empty-search-view.component.html',
  styleUrls: ['./empty-search-view.component.scss'],
})
export class EmptySearchViewComponent  implements OnInit {

  recentSearch: any[] = [];
  user: any;
  @Output() searchKeyword = new EventEmitter<any>();

  constructor(private network: NetworkService, private users: UsersService) { }

  ngOnInit() {
    this.initialize()
  }

  async initialize() {
    
    this.user = this.users.getUser();
    let obj = {
      user_id: this.user.id,
    };
    let res = await this.network.getRecentSearchs(obj);

    if(res && res.result){
      this.recentSearch = res.result;
    }

  }

  async getSearchFromKeywordName(item){

    let obj = {
      keyword: item.keyword_name,
    };
    // emit keyword search to parent object
    this.searchKeyword.emit(obj);


    // Fetch recent search history from server
    // let res = await this.network.getRecentSearchs(obj);





    // const res = (await this.network.getAllCourses(obj)) as any;
    // const data = res.result;
    // this.searchCourses = data.data;

    //

  }

}
