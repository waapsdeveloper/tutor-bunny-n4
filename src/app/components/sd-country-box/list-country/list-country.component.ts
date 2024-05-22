import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/basic/modal.service';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-list-country',
  templateUrl: './list-country.component.html',
  styleUrls: ['./list-country.component.scss'],
})
export class ListCountryComponent implements OnInit {
  list = [];
  country
  search: "";
  page = 1;
  constructor(private modals: ModalService, private network: NetworkService, private utility: UtilityService) {
    this.initialize();
  }

  ngOnInit() { }

  selection(item) {
    this.modals.dismiss(item);
  }

  async initialize() {
    this.search = "";
    this.page = 1;
    this.callApi();
  }
  callApi() {
    return new Promise(async resolve => {

      let obj = {
        search: this.search,
        page: this.page
      }


      this.country = await this.network.getCountries(obj) as any[];
      this.page = this.country["current_page"];
      if (this.page == 1) {
        this.list = this.country["data"];

      } else {
        this.list = [...this.list, ...this.country["data"]]
      }
      resolve(true);
    })
  }
  async loadMore($event) {
    this.page = this.country.current_page + 1;
    await this.callApi();
    $event.target.complete();
  }

  handleInput(event) {
    const query = event.target.value.toLowerCase();
    this.search = query;
    this.page = 1;
    this.callApi();

    // this.results = this.data.filter((d) => d.toLowerCase().indexOf(query) > -1);
  }

  capitalizeFirst(string){
    return this.utility.capitalizeEachFirst(string)
  }
}
